import {
    StyleSheet,
    SafeAreaView,
    View,
    Text,
    FlatList,
    Pressable,
    Modal,
    Image,
} from "react-native";
import { Themes } from "../Themes";
import { AntDesign, Feather } from "@expo/vector-icons";
import { useState } from "react";
import Camera from "./ExcerptCamera";
import { LinearGradient } from "expo-linear-gradient";
import Excerpt from "./Excerpt";

const BLUE3 = "hsl(180, 61%, 87%)";
const GREY1 = "hsl(0, 0%, 60%)";

const Header = ({ title, author, setModalVisible, modalVisible }) => {
    return (
        <View style={styles.bookInfoContainer}>
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
            <View>
                <Pressable
                    onPress={() => {
                        setModalVisible(!modalVisible);
                    }}
                >
                    <AntDesign name="plus" size={24} color={GREY1} />
                </Pressable>
            </View>
        </View>
    );
};

const ExcerptForm = ({ modalVisible, setModalVisible }) => {
    return (
        <Modal animationType="slide" transparent={true} visible={modalVisible}>
            <SafeAreaView style={styles.modal}>
                <View style={styles.cameraHeader}>
                    <Pressable
                        onPress={() => {
                            setModalVisible(!modalVisible);
                        }}
                    >
                        <Feather name="x" size={25} color={Themes.dark.lightText} />
                    </Pressable>
                </View>
                <Camera />
            </SafeAreaView>
        </Modal>
    );
};

export default function Excerpts2({ route, navigation }) {
    const { key, title, author, excerpts } = route.params;
    const [modalVisible, setModalVisible] = useState(false);
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: BLUE3 }}>
            <LinearGradient
                colors={["white", "white"]}
                //colors={["hsl(180, 61%, 100%)", BLUE3]}
                style={styles.background}
            />
            <FlatList
                ListHeaderComponent={() => (
                    <Header
                        title={title}
                        author={author}
                        modalVisible={modalVisible}
                        setModalVisible={setModalVisible}
                    />
                )}
                data={excerpts}
                renderItem={({ item }) => (
                    <Excerpt item={item} navigation={navigation} />
                )}
                keyExtractor={(_, index) => index}
            />
            <ExcerptForm
                modalVisible={modalVisible}
                setModalVisible={setModalVisible}
            />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    background: {
        position: "absolute",
        left: 0,
        right: 0,
        top: 0,
        height: "100%",
    },
    bookInfoContainer: {
        height: 60,
        paddingHorizontal: 15,
        marginTop: 15,
        marginBottom: 15,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
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
    modal: {
        flex: 1,
        //marginTop: 15,
    },
    cameraHeader: {
        height: "4%",
        justifyContent: "center",
        paddingLeft: 20,
    },
});
