import {
    StyleSheet,
    View,
    Text,
    TouchableOpacity,
    Image,
} from "react-native";
import { Themes } from "../../Themes";
import { Entypo } from "@expo/vector-icons";

const GREY1 = "hsl(0, 0%, 60%)";
const BACK_BLUE = "hsl(209, 100%, 50%)";

const ExcerptHeader = ({ title, author, image, setMenuModalVisible }) => {
    return (
        <View style={styles.bookInfoContainer}>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
                <View style={styles.imageContainer}>
                    <Image style={styles.bookImage} source={{
                        uri: image,
                    }} />
                </View>
                <View style={styles.bookInfo}>
                    <Text style={styles.title} numberOfLines={2}>
                        {title}
                    </Text>
                    <Text style={styles.author} numberOfLines={1}>
                        {author}
                    </Text>
                </View>
            </View>
            <TouchableOpacity
                onPress={() => setMenuModalVisible(true)}
                style={{ position: 'absolute', right: 15 }}
                hitSlop={20}
            >
                <Entypo name="dots-three-horizontal" size={24} color={GREY1} />
            </TouchableOpacity>
        </View>
    );
};

export default ExcerptHeader;

const styles = StyleSheet.create({
    bookInfoContainer: {
        height: 80,
        paddingHorizontal: 15,
        marginTop: 15,
        marginBottom: 15,
        flexDirection: "row",
        alignItems: "center",
    }, 
    bookTitle: {
        fontFamily: "DMSerif",
        fontSize: 26,
        width: '60%',
        backgroundColor: 'red',
        flexWrap: 'wrap'
    },
    bookAuthor: {
        fontFamily: "Quicksand",
        fontSize: 14,
        color: Themes.dark.lightTextSecondary,
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
        width: "83%",
    },
    title: {
        fontFamily: "DMSerif",
        fontSize: 19,
        marginBottom: 5,
    },
    author: {
        fontFamily: "Quicksand",
        color: Themes.dark.lightTextSecondary,
        fontSize: 13,
    },
});
