
import { StyleSheet, View, Text, Pressable } from "react-native";
import { useState, useCallback } from 'react';
import { Themes } from "../../Themes";
import { MaterialIcons } from '@expo/vector-icons';
import { ContextMenuContainer } from "@brnho/react-native-context-menu";
import * as SQLite from 'expo-sqlite';
import _ from 'lodash';

const db = SQLite.openDatabase("db.db");
const GREY1 = "hsl(0, 0%, 60%)";
const BACK_BLUE = "hsl(209, 100%, 50%)";

export default Excerpt = ({ item, setEditExcerpt, setEditModalVisible, setDeleteModalVisible, setDeleteExcerptId }) => {
    const { text, chapter, page, id, starred } = item;
    const handleEditPress = () => {
        setEditExcerpt({ text, chapter, page, id });
        setEditModalVisible(true);
    };
    const [highlight, setHighlight] = useState(false);
    const [fill, setFill] = useState(starred == 1);

    const handlePress = () => {
        //console.log('handling star press');
        const starValue = fill ? 0 : 1
        setFill(!fill);
        throt_test(starValue);
        /*
        db.transaction((tx) => {
            tx.executeSql(
                `update excerpts set starred = ? where id = ?`,
                [starValue, id],
                () => {
                    // todo: update supabase
                }
            );
        }, (err) => console.log('error', err));
        */
    }

    const test = (starValue) => console.log('throt', starValue);

    const throt_test = useCallback(_.throttle(test, 3000), []);

    const menuItems = [
        { text: "Action", isTitle: true },
        {
            text: "Edit",
            icon: {
                type: "Feather",
                name: "edit",
                size: 18,
            },
            onPress: handleEditPress,
        },
        {
            text: "Delete",
            icon: {
                type: "Feather",
                name: "trash",
                size: 18,
            },
            withSeparator: true,
            isDestructive: true,
            onPress: () => {
                setDeleteExcerptId(id);
                setDeleteModalVisible(true);
            },
        },
    ];

    const starIcon = () => {
        if (fill) {
            if (highlight) {
                return (<View style={{ backgroundColor: 'rgba(255, 0, 0, 0.1)', borderRadius: 99, transform: [{ scale: 1.5 }] }}>
                    <MaterialIcons name="star" size={24} color='rgba(255, 0, 0, 0.6)' style={{ transform: [{ scale: 1 / 1.5 }] }} />
                </View>);
            } else {
                return <MaterialIcons name="star" size={24} color='red' />;
            }
        } else {
            if (highlight) {
                return (<View style={{ backgroundColor: 'rgba(255, 0, 0, 0.1)', borderRadius: 99, transform: [{ scale: 1.5 }] }}>
                    <MaterialIcons name="star-border" size={24} color='rgba(255, 0, 0, 0.6)' style={{ transform: [{ scale: 1 / 1.5 }] }} />
                </View>);
            } else {
                return <MaterialIcons name="star-border" size={24} color={GREY1} />;
            }
        }
    }

    return (
        <>
            <View style={styles.divider}></View>
            <ContextMenuContainer
                menuItems={menuItems}
            >
                <View style={styles.container}>
                    <Text style={styles.excerptText} numberOfLines={15}>
                        {text}
                    </Text>
                    <View style={styles.excerptInfoContainer}>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            {chapter ? <Text style={styles.excerptInfo}>ch. {chapter}</Text> : null}
                            {page ? <Text style={styles.excerptInfo}>p. {page}</Text> : null}
                        </View>
                        <Pressable
                            hitSlop={40}
                            onPressIn={() => setHighlight(true)}
                            onPressOut={() => setHighlight(false)}
                            onPress={handlePress}
                        >
                           {starIcon()}
                        </Pressable>
                    </View>
                </View>
            </ContextMenuContainer>
        </>
    );
};

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 15,
        paddingVertical: 10,
        /*borderRadius: 10,
        shadowColor: "black",
        shadowRadius: 4,
        shadowOffset: Themes.dark.shadow.shadowOffset.dark,
        shadowOpacity: 0.1,*/
        backgroundColor: "hsl(180, 61%, 97%)",
        borderRadius: 5
    },
    excerptText: {
        fontFamily: "Georgia",
        //fontFamily: "DMSerif",
        fontSize: 16,
        lineHeight: 19,
    },
    excerptInfoContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 15,
    },
    excerptInfo: {
        marginRight: 5,
        color: GREY1,
        fontWeight: 'bold'
    },
    divider: {
        width: '100%',
        height: 1,
        backgroundColor: 'hsl(0, 0%, 90%)',
        //marginVertical: 10,
    },
    dropdown: {
        position: 'absolute',
        top: 20,
        right: 0,
        backgroundColor: "hsl(0, 0%, 97%)",
        borderRadius: 10,
        justifyContent: "space-between",
        width: 200,
    },
    dropdownItem: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        padding: 10,
        height: 40,
    },
    itemText: {
        fontSize: 15
    }
});