import {
    StyleSheet,
    View,
    Text,
    Pressable,
    Image,
} from "react-native";
import { Themes } from "../../Themes";
import { AntDesign, MaterialIcons } from "@expo/vector-icons";

const GREY1 = "hsl(0, 0%, 60%)";
const BACK_BLUE = "hsl(209, 100%, 50%)";

const ExcerptHeader = ({ title, author, setModalVisible, modalVisible }) => {
    return (
        <View style={styles.bookInfoContainer}>
            <Pressable style={styles.back}>
                <MaterialIcons name="arrow-back-ios" size={24} color={BACK_BLUE} />
                <Text style={styles.backText}>Back</Text>
            </Pressable>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
                <View style={styles.imageContainer}>
                    <Image
                        style={styles.bookImage}
                        source={{
                            uri: "http://books.google.com/books/content?id=6nsmEAAAQBAJ&printsec=frontcover&img=1&zoom=5&edge=curl&source=gbs_api",
                        }}
                    />
                </View>
                <View>
                    <Text style={styles.bookTitle}>{title}</Text>
                    <Text style={styles.bookAuthor}>{author}</Text>
                </View>
            </View>
            <Pressable
                style={styles.addIcon}
                onPress={() => {
                    setModalVisible(!modalVisible);
                }}
            >
                <AntDesign name="plus" size={24} color={GREY1} />
            </Pressable>
        </View>
    );
};

export default ExcerptHeader;

const styles = StyleSheet.create({
    bookInfoContainer: {
        height: 60,
        //paddingHorizontal: 15,
        marginTop: 15,
        marginBottom: 5,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
    },
    back: {
        position: 'absolute',
        left: 8,
        flexDirection: 'row',
        alignItems: 'center'
    },
    backText: {
        color: BACK_BLUE,
        marginLeft: -5,
        fontSize: 16
    },
    imageContainer: {
        width: "22%",
        height: "100%",
        shadowColor: "black",
        shadowRadius: 2,
        shadowOffset: Themes.dark.shadow.shadowOffset.dark,
        shadowOpacity: 0.15,
        marginRight: 10,
    },
    bookImage: {
        width: "100%",
        height: "100%",
        resizeMode: "cover",
    },
    bookTitle: {
        fontFamily: "DMSerif",
        fontSize: 26,
    },
    bookAuthor: {
        fontFamily: "Quicksand",
        fontSize: 14,
        color: Themes.dark.lightTextSecondary,
    },
    addIcon: {
        position: 'absolute',
        right: 8
    }
});
