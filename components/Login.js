import { StyleSheet, Text, View, Button } from "react-native";
import React, {useContext} from "react";
import { supabase } from "../supabase";
import * as WebBrowser from 'expo-web-browser';
import { LinearGradient } from "expo-linear-gradient";
import qs from 'qs';
import UserContext from '../UserContext';

const RETURN_URI = 'exp+finalproject2://expo-development-client/?url=http%3A%2F%2F10.0.0.16%3A8081';

const BLUE3 = "hsl(180, 61%, 87%)";

export default Login = () => {
    const { setLoggedIn } = useContext(UserContext);

    const signInWithGoogle = async () => {
        try {
            const { data } = await supabase.auth.signInWithOAuth({ provider: 'google' });
            let result = await WebBrowser.openAuthSessionAsync(data.url);
            if (result?.type == 'success') {
                const params = qs.parse(result.url.replace(`${RETURN_URI}#`, ''));
                // store session in supabase local storage (is persistent)
                const { data: sessionData } = await supabase.auth.refreshSession({ refresh_token: params['refresh_token'] })
                if (sessionData.session !== null) {
                    // trigger refresh, app will then display <AppStack />
                    setLoggedIn(true);
                } else {
                    throw new Error('Failed to retrieve session')
                }
            }
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
