import React, { useState, useEffect, useRef } from "react";
import {
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    TextInput,
    TouchableWithoutFeedback,
    Keyboard,
    ScrollView,
    Dimensions,
    Animated,
    ActivityIndicator,
    Modal
} from "react-native";
import { BlurView } from "expo-blur";
import { Ionicons, Feather } from "@expo/vector-icons";
import { supabase } from "../../supabase";
import storage from "../../storage";
import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabase("db.db");

const WINDOW_HEIGHT = Dimensions.get('window').height;

export default EditExcerptForm = ({ editModalVisible, setEditModalVisible, editExcerpt, loadFilteredExcerpts, book_uuid }) => {
    const { text: editText, chapter: editChapter, page: editPage, id } = editExcerpt;
    const [text, setText] = useState(editText);
    const [page, setPage] = useState(editPage);
    const [chapter, setChapter] = useState(editChapter);
    const [showLoading, setShowLoading] = useState(null);

    useEffect(() => {
        setText(editText);
    }, [editText]);

    useEffect(() => {
        setPage(editPage);
    }, [editPage]);

    useEffect(() => {
        setChapter(editChapter);
    }, [editChapter]);

    useEffect(() => {
        const showSubscription = Keyboard.addListener('keyboardDidShow', () => {
            setKeyboardIsOpen(true);
        });
        const hideSubscription = Keyboard.addListener('keyboardWillHide', () => {
            setKeyboardIsOpen(false);
            restorePosition();
        });
        return () => {
            showSubscription.remove();
            hideSubscription.remove();
        };
    }, []);

    const [viewHeight, setViewHeight] = useState(null);
    const [viewY, setViewY] = useState(null);
    const [menuViewY, setMenuViewY] = useState(null);
    const [keyboardIsOpen, setKeyboardIsOpen] = useState(false);
    const [scrollEnabled, setScrollEnabled] = useState(false);

    // used to measure dimensions of text inputs
    const textInputRef = useRef();
    const pageInputRef = useRef();
    const chInputRef = useRef();
    // used to reset scroll view scroll position
    const scrollViewRef = useRef();
    const backgroundViewRef = useRef();
    // used to measure y coordinate of text menu popup
    const menuViewRef = useRef();

    const translateAnim = useRef(new Animated.Value(0)).current;

    const measureView = (e) => {
        setViewHeight(e.nativeEvent.layout.height);
        backgroundViewRef.current.measure((fx, fy, width, height, px, py) => {
            setViewY(py);
        });
    }

    const measureMenuView = (e) => {
        menuViewRef.current.measure((fx, fy, width, height, px, py) => {
            setMenuViewY(py);
        });
    }

    const handlePressIn = (ref) => {
        // prevent translations while the keyboard is open and the user taps
        if (!keyboardIsOpen) {
            ref.current.measure((fx, fy, width, height, px, py) => {
                const keyboardTranslateY = -1 * Math.max(0, py + height - WINDOW_HEIGHT * .40);
                const maxTranslateY = viewY + 20 - menuViewY;
                const translateY = Math.max(keyboardTranslateY, maxTranslateY);
                setTimeout(() => Animated.timing(translateAnim, {
                    toValue: translateY,
                    duration: 400,
                    useNativeDriver: true,
                }).start(), 200)
            });
            setScrollEnabled(true);
        }
    }

    const restorePosition = () => {
        setTimeout(() => Animated.timing(translateAnim, {
            toValue: 0,
            duration: 400,
            useNativeDriver: true,
        }).start(), 100)
        scrollViewRef.current.scrollTo({ x: 0, y: 0, animated: true });
        setScrollEnabled(false);
    }

    const handleKeyboardDismiss = () => {
        Keyboard.dismiss();
    }

    // todo: error handling - close modal and display error message
    const handleConfirm = async () => {
        console.log('closing');
        db.transaction((tx) => {
            tx.executeSql(
                `update excerpts set text = ?, page = ?, chapter = ? where id = ?`,
                [text, page, chapter, id],
                () => {
                    loadFilteredExcerpts();
                    setEditModalVisible(false);
                    updateExcerptSupabase(text, page, chapter, id);
                }
            );
        }, (err) => console.log('error', err));
    }

    const updateExcerptSupabase = async (text, page, chapter, id) => {
        const excerpt = { text, page, chapter };
        try {
            const { error } = await supabase.from('excerpts').update(excerpt)
                .eq('book_uuid', book_uuid)
                .eq('local_id', id)
            console.log('supabase error', error);
            if (error !== null) {
                throw error;
            }
        } catch (err) {
            console.error(err);
            // todo: add excerpt to local storage
            /*
            const excerpts = JSON.parse(storage.getString('updateExcerpts'));
            excerpts.push(excerpt);
            storage.set('addExcerpts', JSON.stringify(excerpts));
            */
        }
    }

    return (
        <Modal animationType="slide" transparent={true} visible={editModalVisible}>
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }} ref={backgroundViewRef} onLayout={measureView}>

                <BlurView intensity={70} style={{ ...StyleSheet.absoluteFill }} tint="dark" />
                <TouchableWithoutFeedback onPress={handleKeyboardDismiss} style={{ ...StyleSheet.absoluteFill }}>
                    <View style={{ ...StyleSheet.absoluteFill }} />
                </TouchableWithoutFeedback>

                <View style={{ flex: 1 }}>
                    <ScrollView ref={scrollViewRef} scrollEnabled={scrollEnabled}>

                        {/* Outer, screen-sized container for the text menu */}
                        <View style={{ height: viewHeight, alignItems: 'center', justifyContent: 'center' }}>
                            {viewHeight !== null ?
                                <Animated.View ref={menuViewRef} style={[styles.imageTextContainer, { transform: [{ translateY: translateAnim }] }]} onLayout={measureMenuView}>
                                    <View style={{ padding: 15 }}>
                                        <TextInput ref={textInputRef} value={text} multiline={true} style={styles.textInput} onFocus={() => handlePressIn(textInputRef)}
                                            onChangeText={setText} />
                                    </View>
                                    <View style={styles.inputContainer}>
                                        <Text style={styles.PageChText}>Page:</Text>
                                        <TextInput ref={pageInputRef} hitSlop={20} value={page?.toString()} onChangeText={setPage} style={styles.textInput2} keyboardType="numeric" onFocus={() => handlePressIn(pageInputRef)} />
                                    </View>
                                    <View style={styles.inputContainer}>
                                        <Text style={styles.PageChText}>Chapter:</Text>
                                        <TextInput ref={chInputRef} style={styles.textInput2} value={chapter?.toString()} onChangeText={setChapter} keyboardType="numeric" onFocus={() => handlePressIn(chInputRef)} />
                                    </View>
                                    <View style={styles.options}>
                                        <TouchableOpacity style={styles.optionPressable} hitSlop={20} onPress={() => setEditModalVisible(false)}>
                                            <Feather name="x" size={22} color='red' />
                                        </TouchableOpacity>
                                        <TouchableOpacity style={styles.optionPressable} hitSlop={20} onPress={handleConfirm}>
                                            <Ionicons name="checkmark-circle-outline" size={22} color="blue" />
                                        </TouchableOpacity>
                                    </View>
                                </Animated.View>
                                : null
                            }
                        </View>

                        {/* Create additional space at the bottom of the ScrollView */}
                        <View style={{ height: 200 }} />

                    </ScrollView>
                </View>
                {showLoading ? <ActivityIndicator size="large" style={{ position: 'absolute', top: '50%' }} /> : null}
            </View >
        </Modal>
    );
};

const styles = StyleSheet.create({
    imageTextContainer: {
        width: '85%',
        backgroundColor: 'hsl(180, 61%, 97%)',
        borderRadius: 10,
        alignItems: 'center',
    },
    divider: {
        width: '100%',
        height: 1,
        backgroundColor: 'hsl(0, 0%, 80%)',
        marginBottom: 10,
    },
    options: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 13,
        width: '100%',
        paddingHorizontal: 15
    },
    optionPressable: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    optionsText: {
        fontSize: 16,
        marginLeft: 3,
    },
    textInput: {
        fontSize: 16,
        fontFamily: 'Georgia',
        maxHeight: 500
    },
    textInput2: {
        fontSize: 14,
        width: 50,
        color: 'hsl(0, 0%, 40%)',
        borderBottomWidth: 1,
        borderColor: 'hsl(0, 0%, 80%)',
        textAlign: 'center'
    },
    inputContainer: {
        width: '93%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 15
    },
    PageChText: {
        color: 'hsl(0, 0%, 50%)',
        marginRight: 5
    }
});
