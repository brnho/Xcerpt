import {
    StyleSheet,
    Text,
    View,
    SafeAreaView,
    FlatList,
    Image,
} from "react-native";
import React from "react";
import { LinearGradient } from "expo-linear-gradient";
import { MaterialIcons } from "@expo/vector-icons";
import sampleData from "../Sample";
import { Themes } from "../Themes";
import BooksHeader from "./BooksHeader";
import BooksFooter from "./BooksFooter";

const GREY1 = "hsl(0, 0%, 60%)";
const BLUE3 = "hsl(180, 61%, 87%)";

const Book = ({ item }) => {
    return (
        <View style={styles.bookContainer}>
            <LinearGradient
                start={{ x: 0, y: 0.75 }}
                end={{ x: 1, y: 0.25 }}
                colors={["hsl(180, 61%, 98%)", "hsl(180, 61%, 92%)"]}
                style={styles.bookContainerGradient}
            >
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                    <View style={styles.imageContainer}>
                        <Image style={styles.bookImage} source={{ uri: item.imageUrl }} />
                    </View>
                    <View style={styles.bookInfo}>
                        <Text style={styles.title} numberOfLines={2}>
                            {item.title}
                        </Text>
                        <Text style={styles.author} numberOfLines={1}>
                            {item.author}
                        </Text>
                    </View>
                </View>
                <MaterialIcons
                    name="arrow-forward-ios"
                    size={18}
                    color={GREY1}
                />
            </LinearGradient>
        </View>
    );
};

const Books2 = () => {
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: BLUE3 }}>
            <LinearGradient
                colors={["hsl(0, 0%, 100%)", BLUE3]}
                style={styles.background}
            />
            <View style={styles.container}>
                <FlatList
                    ListHeaderComponent={BooksHeader}
                    style={{ overflow: "visible" }}
                    data={sampleData}
                    renderItem={({ item }) => <Book item={item} />}
                    keyExtractor={(_, index) => index}
                />
            </View>
            <BooksFooter />
        </SafeAreaView>
    );
};

export default Books2;

const styles = StyleSheet.create({
    // padding cannot be set on a SafeAreaView, hence the need for an inner View container
    container: {
        flex: 1,
        paddingTop: 20,
        paddingHorizontal: 20,
    },
    background: {
        position: "absolute",
        left: 0,
        right: 0,
        top: 0,
        height: "100%",
    },
    bookContainer: {
        height: 90,
        borderRadius: 15,
        marginVertical: 6,
        shadowColor: "black",
        shadowRadius: 4,
        shadowOffset: Themes.dark.shadow.shadowOffset.dark,
        shadowOpacity: 0.06,
    },
    bookContainerGradient: {
        height: "100%",
        borderRadius: 15,
        paddingHorizontal: 15,
        padding: 10,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-around",
    },
    imageContainer: {
        width: "14%",
        height: "100%",
        shadowColor: "black",
        shadowRadius: 2,
        shadowOffset: Themes.dark.shadow.shadowOffset.dark,
        shadowOpacity: 0.15,
    },
    bookImage: {
        width: "100%",
        height: "100%",
        resizeMode: "cover",
    },
    bookInfo: {
        paddingHorizontal: 10,
        width: "86%",
    },
    title: {
        fontFamily: "DMSerif",
        fontSize: 16,
        marginBottom: 5,
    },
    author: {
        fontFamily: "Quicksand",
        color: Themes.dark.lightTextSecondary,
        fontSize: 13,
    },
});
