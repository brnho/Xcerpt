import { StyleSheet, View, TouchableOpacity } from "react-native";
import React from "react";
import { LinearGradient } from 'expo-linear-gradient';
import { AntDesign, Entypo, Ionicons } from "@expo/vector-icons";

const GREY1 = "hsl(0, 0%, 60%)";
const GREY4 = "hsl(0, 0%, 30%)";
const BLUE3 = "hsl(180, 61%, 87%)";

export default BooksFooter = () => {
    return (
        <View style={styles.footer}>
            <LinearGradient start={{ x: 0, y: 0.75 }} end={{ x: 1, y: 0.25 }}
                colors={['hsl(180, 61%, 100%)', 'hsl(180, 61%, 94%)']}
                style={styles.iconWrapper}
            >
                <AntDesign name="home" size={28} color={GREY4} />
            </LinearGradient>
            <View style={styles.iconWrapper}>
                <TouchableOpacity onPress={() => { navigation.navigate('BookSearch') }}>
                    <Entypo name="magnifying-glass" size={24} color={GREY1} />
                </TouchableOpacity>
            </View>
            <View style={styles.iconWrapper}>
                <Ionicons
                    name="people-outline"
                    size={28}
                    color={GREY1}
                />
            </View>
        </View>

    )
}

const styles = StyleSheet.create({
    footer: {
        position: 'absolute',
        bottom: '3%',
        width: "100%",
        height: "8%",
        flexDirection: "row",
        justifyContent: "space-around",
        alignItems: "center",
        backgroundColor: BLUE3,
        shadowColor: 'black',
        shadowRadius: 3,
        shadowOffset: { height: -4 },
        shadowOpacity: 0.05,
    },
    iconWrapper: {
        padding: 9,
        borderRadius: 20,
    }
});
