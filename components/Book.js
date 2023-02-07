import { StyleSheet, Text, View, Image } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { MaterialIcons } from "@expo/vector-icons";
import { Themes } from "../Themes";
import BookData from "../utils/BookData";
import { TouchableOpacity } from "react-native-gesture-handler";
import * as FileSystem from 'expo-file-system';

const GREY1 = "hsl(0, 0%, 60%)";

const Book = ({ item, navigation }) => {
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
                        <Image style={styles.bookImage} source={{ uri: item?.image }} />
                    </View>
                    <View style={styles.bookInfo}>
                        <Text style={styles.title} numberOfLines={2}>
                            {item?.title}
                        </Text>
                        <Text style={styles.author} numberOfLines={1}>
                            {item?.author}
                        </Text>
                    </View>
                </View>
                <TouchableOpacity
                    onPress={() => {
                        navigation.navigate("Excerpts", {
                            /*key: BookData[0].key,
                            title: BookData[0].title,
                            author: BookData[0].author,
                            excerpts: BookData[0].excerpts,*/
                            title: item.title,
                            author: item.author,
                            image: item.image,
                            book_uuid:  item.uuid,
                        });
                    }}
                    hitSlop={20}
                >
                    <MaterialIcons name="arrow-forward-ios" size={18} color={GREY1} />
                </TouchableOpacity>
            </LinearGradient>
        </View>
    );
};

export default Book;

const styles = StyleSheet.create({
    bookContainer: {
        height: 90,
        borderRadius: 15,
        //paddingHorizontal: 20,
        //marginBottom: 10,
        shadowColor: "black",
        shadowRadius: 4,
        shadowOffset: Themes.dark.shadow.shadowOffset.dark,
        shadowOpacity: 0.06,
    },
    bookContainerNoShadow: {
        height: 90,
        borderRadius: 15,
        //paddingHorizontal: 20,
        //marginBottom: 10,
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
    // PopupMenu Styles
    menu: {
        width: "48%",
        backgroundColor: "hsl(0, 0%, 97%)",
        borderRadius: 10,
        justifyContent: "space-between",
    },
    menuItem: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        //marginHorizontal: 10,
        padding: 10,
        height: 40,
    },
    menuText: {
        //fontWeight: 'bold'
        fontSize: 15,
    },
    divider: {
        height: 1,
        backgroundColor: "hsl(0, 0%, 90%)",
    },
});
