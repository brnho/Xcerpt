import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    TextInput,
    TouchableWithoutFeedback,
    Keyboard,
} from "react-native";
import React, { useState } from "react";
import { MaterialIcons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { supabase } from "../supabase";
import storage from "../storage";

const BLUE3 = "hsl(180, 61%, 87%)";

const EditName = ({ navigation }) => {
    const [name, setName] = useState("");

    const updateUserSupabase = async () => {
        navigation.navigate('Settings');
        const email = storage.getString("user");
        try {
            const { error } = await supabase.from("users").update({ name }).eq("email", email);
            if (error !== null) {
                throw error;
            }
        } catch (err) {
            console.error(err);
            // todo: update local storage
        }
    };

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
            <View style={{ flex: 1 }}>
                <LinearGradient
                    colors={["hsl(0, 0%, 100%)", BLUE3]}
                    style={{ ...StyleSheet.absoluteFill }}
                />
                <View style={styles.coverTop}></View>
                <View style={styles.header}>
                    <TouchableOpacity
                        style={styles.backContainer}
                        onPress={() => navigation.navigate("Settings")}
                    >
                        <MaterialIcons
                            name="arrow-back-ios"
                            size={24}
                            color="hsl(203, 100%, 45%)"
                        />
                        <Text style={styles.headerTextBack}>Back</Text>
                    </TouchableOpacity>

                    <Text style={styles.headerText}>Name</Text>

                    <TouchableOpacity
                        style={styles.plusContainer}
                        hitSlop={20}
                        onPress={updateUserSupabase}
                    >
                        <Text style={styles.headerTextDone}>Done</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.divider}></View>

                <View style={styles.container}>
                    <Text style={styles.nameText}>Name</Text>
                    <TextInput style={styles.nameInput} value={name} onChangeText={setName} />
                </View>
            </View>
        </TouchableWithoutFeedback>
    );
};

export default EditName;

const styles = StyleSheet.create({
    coverTop: {
        height: 35,
        width: "100%",
        backgroundColor: "white",
    },
    header: {
        height: 60,
        width: "100%",
        backgroundColor: "white",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
    },
    plusContainer: {
        position: "absolute",
        right: 15,
    },
    backContainer: {
        position: "absolute",
        left: 15,
        flexDirection: "row",
        alignItems: "center",
    },
    headerText: {
        fontSize: 18,
        fontWeight: "500",
    },
    headerTextBack: {
        fontSize: 17,
        color: "hsl(203, 100%, 45%)",
        marginLeft: -5,
    },
    headerTextDone: {
        fontSize: 17,
        color: "hsl(203, 100%, 45%)",
    },
    divider: {
        width: "100%",
        height: 0.4,
        backgroundColor: "hsl(0, 0%, 90%)",
    },

    container: {
        marginHorizontal: 20,
    },
    nameText: {
        marginTop: 20,
        fontFamily: "Quicksand",
        fontSize: 20,
        marginBottom: 15,
    },
    nameInput: {
        width: "100%",
        //backgroundColor: 'red',
        borderBottomColor: "hsl(0, 0%, 80%)",
        borderBottomWidth: 1,
        padding: 5,
    },
});
