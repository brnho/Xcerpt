import React, { useState, useEffect, useRef } from "react";
import {
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    ImageBackground,
    TextInput,
    TouchableWithoutFeedback,
    Keyboard,
    ScrollView,
    Dimensions,
    Animated,
    ActivityIndicator
} from "react-native";
import MlkitOcr from 'react-native-mlkit-ocr';
import { BlurView } from "expo-blur";
import { Ionicons } from "@expo/vector-icons";
import { supabase } from "../../supabase";
import storage from "../../storage";
import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabase("db.db");

const WINDOW_HEIGHT = Dimensions.get('window').height;

export default CameraPreview = ({ photo, resetCamera, widthScale, heightScale, book_uuid, setModalVisible, loadExcerpts }) => {
    const { origPhoto, cropPhoto } = photo;
    const [imageText, setImageText] = useState(null);
    const [pageText, setPageText] = useState(null);
    const [chapterText, setChapterText] = useState(null);
    const [showLoading, setShowLoading] = useState(null);

    const getText = async () => {
        try {
            const resultFromUri = await MlkitOcr.detectFromUri(cropPhoto.uri);
            let text = '';
            resultFromUri.map((block) => {
                block.lines.map((line) => {
                    text = text + " " + line.text
                })
            })
            setImageText(text);
        } catch (err) {
            console.log('Error:', err);
        }
    }

    useEffect(() => {
        getText();
    }, []);

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

    const handleConfirm = async () => {
        const timestamp = new Date().getTime();
        db.transaction((tx) => {
            tx.executeSql(
                "insert into excerpts (book_uuid, text, page, chapter, timestamp) values(?, ?, ?, ?, ?)",
                [book_uuid, imageText, pageText, chapterText, timestamp],
                (_, { insertId }) => {
                    loadExcerpts();
                    setModalVisible(false);
                    addExcerptSupabase(insertId, book_uuid, imageText, pageText, chapterText, timestamp);
                }
            );
        }, (error) => console.error(error));
        /*
        // local storage (outdated)
        const excerpts = JSON.parse(storage.getString('excerpts_' + bookId));
        excerpts.push({
            bookId: bookId,
            text: imageText,
            page: pageText,
            chapter: chapterText
        });
        storage.set('excerpts_' + bookId, JSON.stringify(excerpts));
        setModalVisible(false);
        */
    }

    const addExcerptSupabase = async (insertId, book_uuid, imageText, pageText, chapterText, timestamp) => {
        const supabaseExcerpt = {
            local_id: insertId,
            book_uuid: book_uuid,
            text: imageText,
            page: pageText,
            chapter: chapterText,
            timestamp: timestamp,
        };
        try {
            const { _, error } = await supabase.from("excerpts").insert(supabaseExcerpt);
            if (error !== null) {
                throw error;
            }
        } catch (err) {
            console.error(err);
            // add excerpt to local storage
            const excerpts = JSON.parse(storage.getString('addExcerpts'));
            excerpts.push(supabaseExcerpt);
            storage.set('addExcerpts', JSON.stringify(excerpts));
        }
    }

    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }} ref={backgroundViewRef} onLayout={measureView}>
            <ImageBackground
                source={{ uri: origPhoto.uri }}
                style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: origPhoto.width / widthScale,
                    height: origPhoto.height / heightScale,
                }}
            />
            <BlurView intensity={70} style={{ ...StyleSheet.absoluteFill }} tint="dark" />
            <TouchableWithoutFeedback onPress={handleKeyboardDismiss} style={{ ...StyleSheet.absoluteFill }}>
                <View style={{ ...StyleSheet.absoluteFill }} />
            </TouchableWithoutFeedback>

            <View style={{ flex: 1 }}>
                <ScrollView ref={scrollViewRef} scrollEnabled={scrollEnabled}>

                    {/* Outer, screen-sized container for the text menu */}
                    <View style={{ height: viewHeight, alignItems: 'center', justifyContent: 'center' }}>
                        {imageText !== null && viewHeight !== null ?
                            <Animated.View ref={menuViewRef} style={[styles.imageTextContainer, { transform: [{ translateY: translateAnim }] }]} onLayout={measureMenuView}>
                                <View style={{ padding: 15 }}>
                                    <TextInput ref={textInputRef} value={imageText} multiline={true} style={styles.textInput} onFocus={() => handlePressIn(textInputRef)}
                                        onChangeText={setImageText} />
                                </View>
                                <View style={styles.inputContainer}>
                                    <Text style={styles.PageChText}>Page:</Text>
                                    <TextInput ref={pageInputRef} hitSlop={20} value={pageText} onChangeText={setPageText} style={styles.textInput2} keyboardType="numeric" onFocus={() => handlePressIn(pageInputRef)} />
                                </View>
                                <View style={styles.inputContainer}>
                                    <Text style={styles.PageChText}>Chapter:</Text>
                                    <TextInput ref={chInputRef} style={styles.textInput2} value={chapterText} onChangeText={setChapterText} keyboardType="numeric" onFocus={() => handlePressIn(chInputRef)} />
                                </View>
                                <View style={styles.options}>
                                    <TouchableOpacity style={styles.optionPressable} onPress={resetCamera}>
                                        <Ionicons name="md-arrow-undo-circle-outline" size={22} color="red" />
                                        <Text hitSlop={20} style={[styles.optionsText, { color: 'red' }]}>Retry</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity style={styles.optionPressable} onPress={handleConfirm}>
                                        <Ionicons name="checkmark-circle-outline" size={22} color="blue" />
                                        <Text style={[styles.optionsText, { color: 'blue' }]}>Confirm</Text>
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
