import { StyleSheet, Text, View, Animated, TouchableOpacity } from "react-native";
import React, { useEffect, useRef } from "react";
import { MaterialIcons, Feather } from "@expo/vector-icons";
import { supabase } from "../supabase";

const FADE_SPEED = 200;
const APPEAR_SPEED = 200;

const PopupMenu = ({
    dimensions,
    setChildAnimation,
    translateAdjustment,
    expansionAdjustment,
    bookID,
    closeMenu
}) => {
    const scaleAnim = useRef(new Animated.Value(0)).current;
    const opacityAnim = useRef(new Animated.Value(0)).current;

    const expandAnimation = Animated.timing(scaleAnim, {
        toValue: 1,
        duration: APPEAR_SPEED,
        useNativeDriver: true,
    });
    const shrinkAnimation = Animated.timing(scaleAnim, {
        toValue: 0,
        duration: FADE_SPEED,
        useNativeDriver: true,
    });
    const opaqueAnimation = Animated.timing(opacityAnim, {
        toValue: 1,
        duration: APPEAR_SPEED,
        useNativeDriver: true,
    });
    const fadeAnimation = Animated.timing(opacityAnim, {
        toValue: 0,
        duration: FADE_SPEED,
        useNativeDriver: true,
    });

    const closeAndDelete = async () => {
        try {
            await supabase.from('books').delete().eq('id', bookID);
            closeMenu();
        } catch (err) {
            console.error(err);
        }
    }

    useEffect(() => {
        expandAnimation.start();
        opaqueAnimation.start();
        setChildAnimation({ shrinkAnimation, fadeAnimation });
    }, []);

    const positionStyle = {
        position: "absolute",
        left: dimensions.x + expansionAdjustment.x,
        top: dimensions.y + dimensions.height + 10,
        opacity: opacityAnim,
        transform: [
            { scale: scaleAnim },
            { translateY: translateAdjustment + expansionAdjustment.y },
        ],
    };
    

    return (
        <Animated.View style={[styles.menu, positionStyle]}>
            <TouchableOpacity style={styles.menuItem} onPress={closeMenu}>
                <Text style={styles.menuText}>Edit</Text>
                <Feather name="edit" size={20} color="black" />
            </TouchableOpacity>
            <View style={styles.divider} />
            <TouchableOpacity style={styles.menuItem} onPress={closeAndDelete}>
                <Text style={[styles.menuTextAlert, { color: "red" }]}>Delete</Text>
                <MaterialIcons name="delete-outline" size={24} color="red" />
            </TouchableOpacity>
        </Animated.View>
    );
};

export default PopupMenu;

const styles = StyleSheet.create({
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
