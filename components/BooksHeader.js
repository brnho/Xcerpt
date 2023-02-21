import { Text, View, TextInput, StyleSheet, Modal, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { Entypo, FontAwesome5, FontAwesome } from "@expo/vector-icons";
import InsetShadow from "react-native-inset-shadow";
import BookSearch from "./BookSearch";

const GREY1 = "hsl(0, 0%, 60%)";
const GREY2 = "hsl(0, 0%, 70%)";
const GREY3 = "hsl(0, 0%, 40%)";
const BLUE1 = "hsl(180, 61%, 90%)";
const BLUE2 = "hsl(180, 61%, 85%)";

export default BooksHeader = ({ getBooks }) => {
    const [modalVisible, setModalVisible] = useState(false);
    return (
        <>
            <View style={styles.header}>
                <Entypo name="plus" size={32} color={GREY1} style={{ opacity: 0 }} />
                <Text style={styles.headerText}>Books</Text>
                <TouchableOpacity itSlop={30} onPress={() => { setModalVisible(!modalVisible) }}>
                    <Entypo name="plus" size={32} color={GREY1} />
                </TouchableOpacity>
            </View>



            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
            >
                <BookSearch getBooks={getBooks} modalVisible={modalVisible} setModalVisible={setModalVisible} />
            </Modal>
        </>
    );
};

const styles = StyleSheet.create({
    header: {
        marginTop: 45,
        width: "100%",
        paddingHorizontal: 20,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingBottom: 10,
    },
    headerText: {
        color: "black",
        fontFamily: "DMSerif",
        //fontFamily: "LibreBaskervilleBold",
        fontSize: 34,
    },
    searchBarContainer: {
        marginHorizontal: 20,
        height: 40,
        marginVertical: 15,
        borderRadius: 10,
        backgroundColor: BLUE1,
        fontFamily: "Quicksand",
    },
    searchBarContainer2: {
        width: "100%",
        height: "100%",
        borderRadius: 10,
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: 10,
    },
    infoContainer: {
        paddingHorizontal: 20,
        marginBottom: 15,
        flexDirection: "row",
        justifyContent: "space-between",
    },
    numBooksWrapper: {
        borderRadius: 10,
        backgroundColor: BLUE2,
        padding: 5,
        width: "24%",
        alignItems: "center",
        flexDirection: "row",
        justifyContent: "space-around",
    },
    numBooksText: {
        fontFamily: "QuicksandBold",
        color: GREY3,
        fontSize: 12,
    },
    sortText: {
        fontFamily: "Quicksand",
        color: GREY1,
        fontSize: 14,
        marginRight: 5,
    },
});
