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

export default BooksHeader2 = () => {
    return (
        <>
   

            <View style={styles.searchBarContainer}>
                <InsetShadow
                    shadowColor="black"
                    shadowRadius={6}
                    shadowOpacity={0.3}
                    right={false}
                    bottom={false}
                    containerStyle={{ borderRadius: 10 }}
                >
                    <View style={styles.searchBarContainer2}>
                        <Entypo name="magnifying-glass" size={24} color={GREY1} />
                        <TextInput placeholder="Search Books" />
                    </View>
                </InsetShadow>
            </View>
            <View style={styles.infoContainer}>
                <View style={styles.numBooksWrapper}>
                    <Text style={styles.numBooksText}>7 Books</Text>
                    <FontAwesome name="book" size={18} color={GREY1} />
                </View>
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                    <Text style={styles.sortText}>Sort</Text>
                    <FontAwesome5 name="sort" size={18} color={GREY2} />
                </View>
            </View>


   
        </>
    );
};

const styles = StyleSheet.create({
    header: {
        width: "100%",
        paddingHorizontal: 20,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
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
        marginBottom: 15,
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
