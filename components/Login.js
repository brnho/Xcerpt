import { StyleSheet, Text, View, Button } from "react-native";
import React, {useContext} from "react";
import { supabase } from "../supabase";
import * as WebBrowser from 'expo-web-browser';
import { LinearGradient } from "expo-linear-gradient";
import qs from 'qs';

const RETURN_URI = 'exp://10.0.0.16:19000';
const BLUE3 = "hsl(180, 61%, 87%)";

export default Login = () => {
    const signInWithGoogle = async () => {
        try {
            let test = await WebBrowser.openBrowserAsync('http://google.com');
            const { data } = await supabase.auth.signInWithOAuth({ provider: 'google' });
            let result = await WebBrowser.openAuthSessionAsync(data.url);
            const params = qs.parse(result.url.replace(`${RETURN_URI}#`, ''));
            const { data: sessionData } = await supabase.auth.refreshSession({ refresh_token: params['refresh_token'] })
        } catch (err) {
            console.error(err);
        }
    }
    
    return (
        <View style={styles.container}>
            <LinearGradient
                colors={["hsl(0, 0%, 100%)", BLUE3]}
                style={styles.background}
            />
            <Button title='Sign In With Google' onPress={signInWithGoogle} />
        </View>
    );
};


const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    background: {
        position: "absolute",
        left: 0,
        right: 0,
        top: 0,
        height: "100%",
    },
});
