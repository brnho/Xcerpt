import {
    StyleSheet,
    Text,
    View,
    TextInput,
    SafeAreaView,
    FlatList,
    TouchableOpacity,
    ActivityIndicator,
} from "react-native";
import React, { useState } from "react";
import { Entypo, Feather } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import InsetShadow from "react-native-inset-shadow";
import { supabase } from "../supabase";
import * as SQLite from "expo-sqlite";
import storage from "../storage";

const db = SQLite.openDatabase("db.db");

const MAX_RESULTS = 10;
const BLUE3 = "hsl(180, 61%, 87%)";
const BLUE1 = "hsl(180, 61%, 90%)";
const GREY1 = "hsl(0, 0%, 60%)";

const User = ({ item }) => {
    return (
        <>
            <TouchableOpacity style={styles.bookContainer} hitSlop={20}>
                <View style={styles.profilePhoto} />
                <View style={styles.bookInfo}>
                    <Text style={styles.title} numberOfLines={2}>
                        {item.name}
                    </Text>
                    <Text style={styles.author} numberOfLines={1}>
                        {item.username}
                    </Text>
                </View>
            </TouchableOpacity>
            <View style={styles.divider} />
        </>
    );
};

const SearchFriends = ({ navigation }) => {
    const [searchText, setSearchText] = useState("");
    const [users, setUsers] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    const search = async () => {
        try {
            setIsLoading(true);
            // make sure we don't return ourself
            const email = storage.getString('user');
            const { data, error } = await supabase
                .from("users")
                .select("name, username")
                .or(`email.neq${email},and(name.ilike.${searchText}%,username.ilike.${searchText}%)`);
            setUsers(data);
            setIsLoading(false);
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <LinearGradient
                colors={["hsl(0, 0%, 100%)", "hsl(0, 0%, 100%)"]}
                style={styles.background}
            />
            <View style={{ paddingHorizontal: 20 }}>
                <View style={styles.modalHeader}>
                    <Text style={styles.addBookText}>Add Friend</Text>
                    <TouchableOpacity
                        style={styles.x}
                        onPress={() => {
                            navigation.navigate("Friends");
                        }}
                    >
                        <Feather name="x" size={30} color={GREY1} />
                    </TouchableOpacity>
                </View>
                <View style={styles.searchBarContainer}>
                    <InsetShadow
                        shadowColor="hsl(180, 61%, 20%)"
                        shadowOpacity={0.3}
                        shadowRadius={6}
                        right={false}
                        bottom={false}
                        containerStyle={{ borderRadius: 10 }}
                    >
                        <View style={styles.searchBarContainer2}>
                            <Entypo name="magnifying-glass" size={24} color={GREY1} />
                            <TextInput
                                hitSlop={30}
                                placeholder="Search for friends"
                                value={searchText}
                                onChangeText={setSearchText}
                                returnKeyType="search"
                                onSubmitEditing={search}
                                style={styles.textInput}
                            />
                        </View>
                    </InsetShadow>
                </View>
            </View>
            {isLoading ? (
                <ActivityIndicator size="large" />
            ) : (
                <FlatList
                    data={users}
                    renderItem={({ item }) => <User item={item} />}
                    keyExtractor={(_, index) => index}
                />
            )}
        </SafeAreaView>
    );
};

export default SearchFriends;

const styles = StyleSheet.create({
    background: {
        position: "absolute",
        left: 0,
        right: 0,
        top: 0,
        height: "110%",
    },
    modalHeader: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
    },
    addBookText: {
        fontFamily: "DMSerif",
        fontSize: 34,
    },
    x: {
        position: "absolute",
        right: 0,
    },
    searchBarContainer: {
        width: "100%",
        height: 40,
        marginVertical: 15,
        borderRadius: 10,
        backgroundColor: "hsl(180, 61%, 95%)",
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
    textInput: {
        marginLeft: 7,
        width: "100%",
    },
    bookContainer: {
        paddingHorizontal: 20,
        height: 80,
        flexDirection: "row",
        alignItems: "center",
    },
    profilePhoto: {
        width: 40,
        height: 40,
        backgroundColor: 'red',
        borderRadius: 99
    },
    bookInfo: {
        paddingLeft: 10,
        width: "86%",
    },
    title: {
        fontFamily: "DMSerif",
        marginBottom: 5,
    },
    author: {
        fontFamily: "Quicksand",
    },
    divider: {
        width: "100%",
        height: 0.5,
        backgroundColor: "hsl(0, 0%, 90%)",
        marginVertical: 10,
    },
});
