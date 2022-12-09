import { StyleSheet, View, Text, SafeAreaView, TextInput } from "react-native";
import { Themes } from "../Themes";
import { useState, useEffect } from "react";
import InsetShadow from "react-native-inset-shadow";
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function ExcerptDetail({ route }) {
    const { item } = route.params;
    const [text, setText] = useState("");
    const onChange = async (val) => {
        setText(val);
        try {
            await AsyncStorage.setItem(String(item.key), val);
        } catch (e) {
            console.log(e);
        }
    }

    const getData = async () => {
        try {
            const value = await AsyncStorage.getItem(String(item.key));
            setText(value);
        } catch (e) {
            console.log(e);
        }
    }

    useEffect(() => {
        getData();
    }, [])

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.excerptContainer}>
                <Text style={styles.excerptText}>{item.text}</Text>
                <View style={styles.excerptInfoContainer}>
                    <View style={{ flexDirection: "row" }}>
                        <Text style={styles.excerptInfo}>Ch. {item.chapter}</Text>
                        <Text style={styles.excerptInfo}>p. {item.page}</Text>
                    </View>
                </View>
            </View>
            <InsetShadow
                shadowColor="black"
                shadowRadius={10}
                shadowOpacity={0.9}
                right={false}
                left={false}
            >
                <View style={styles.inputContainer}>
                    <TextInput
                        style={styles.input}
                        value={text}
                        onChangeText={onChange}
                        multiline={true}
                    />
                </View>
            </InsetShadow>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: "100%",
        backgroundColor: Themes.dark.bg,
    },
    excerptContainer: {
        paddingTop: 20,
        paddingHorizontal: 20,
        marginBottom: 15,
    },
    excerptText: {
        fontFamily: "Quicksand",
        fontSize: 18,
        color: Themes.dark.lightText,
    },
    excerptInfoContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginTop: 15,
    },
    excerptInfo: {
        marginRight: 5,
        color: Themes.dark.lightTextSecondary,
    },
    divider: {
        height: 0.5,
        backgroundColor: Themes.dark.lightTextSecondary,
        marginVertical: 14,
    },
    inputContainer: {
        flex: 1,
        backgroundColor: Themes.dark.bgSecondary,
    },
    input: {
        marginTop: 20,
        marginHorizontal: 20,
        color: Themes.dark.lightText,
        fontFamily: "Quicksand",
    },
});
