import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import React, { useContext } from "react";
import { LinearGradient } from 'expo-linear-gradient';
import { AntDesign, Entypo, Ionicons } from "@expo/vector-icons";
import UserContext from '../UserContext';
import { supabase } from '../supabase';

const GREY1 = "hsl(0, 0%, 60%)";
const GREY4 = "hsl(180, 61%, 35%)";
const BLUE3 = "hsl(180, 61%, 87%)";

export default BooksFooter = ({ navigation }) => {
    const { setLoggedIn } = useContext(UserContext);

    const signOut = async () => {
        try {
            await supabase.auth.signOut();
            setLoggedIn(false);
        } catch (err) {
            console.error(err);
        }
    }

    return (
        <View style={styles.footer}>
            <LinearGradient start={{ x: 0, y: 0.75 }} end={{ x: 1, y: 0.25 }}
                colors={['hsl(180, 61%, 92%)', 'hsl(180, 61%, 83%)']}
                style={styles.iconWrapper}
            >
                <AntDesign name="home" size={28} color={GREY4} />
            </LinearGradient>
            <View style={styles.iconWrapper}>
                <Ionicons
                    name="people-outline"
                    size={28}
                    color={GREY1}
                />
            </View>
            <View style={styles.iconWrapper}>
                <TouchableOpacity onPress={() => { navigation.navigate('Books3') }}>
                    <Text>Books</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.iconWrapper}>
                <TouchableOpacity onPress={signOut}>
                    <Text>Sign Out</Text>
                </TouchableOpacity>
            </View>
        </View>

    )
}

const styles = StyleSheet.create({
    footer: {
        
        position: 'absolute',
        bottom: '1%',
        width: "100%",
        height: "8%", 
        //flex: 0.08,
        flexDirection: "row",
        justifyContent: "space-around",
        alignItems: "center",
        backgroundColor: 'hsl(180, 61%, 96%)',
        shadowColor: 'black',
        shadowRadius: 3,
        shadowOffset: { height: -4 },
        shadowOpacity: 0.05,
        paddingBottom: 15,
        //transform: [{ translateY: -400 }],
        //zIndex: 1,
    },
    iconWrapper: {
        padding: 9,
        borderRadius: 20,
    }
});
