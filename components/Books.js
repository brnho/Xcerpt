import {
    StyleSheet,
    View,
    FlatList,
    ActivityIndicator,
    Animated,
    StatusBar,
    Text
} from "react-native";
import React, { useContext, useState, useEffect, useRef } from "react";
import { LinearGradient } from "expo-linear-gradient";
import BooksHeader from "./BooksHeader";
import BooksFooter from "./BooksFooter";
import UserContext from "../UserContext";
import { supabase } from "../supabase";
import { PortalProvider } from "@gorhom/portal";
import BooksHeader2 from "./BooksHeader2";
import PortalBook from "./PortalBook";

const BLUE3 = "hsl(180, 61%, 87%)";

const SHRINK_FACTOR = 0.98;
const FADE_SPEED = 200;

const Books = ({ navigation }) => {
    const { email } = useContext(UserContext);
    const [bookData, setBookData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [scrollEnabled, setScrollEnabled] = useState(true);

    const scaleAnim = useRef(new Animated.Value(1)).current;

    const expandScreenAnimation = Animated.spring(scaleAnim, {
        toValue: SHRINK_FACTOR,
        duration: 150,
        useNativeDriver: true,
    });
    const restoreScreenAnimation = Animated.timing(scaleAnim, {
        toValue: 1,
        duration: FADE_SPEED,
        useNativeDriver: true,
    });

    const getBooks = async () => {
        try {
            const { data } = await supabase
                .from("books")
                .select("id, title, author, image")
                .eq("email", email);
            setBookData(data);
            setLoading(false);
        } catch (err) {
            console.error(err);
        }
    };

    useEffect(() => {
        getBooks();
    }, []);

    return (
        <PortalProvider>
            <LinearGradient
                colors={["hsl(0, 0%, 100%)", BLUE3]}
                style={{ ...StyleSheet.absoluteFill }}
            >
                <StatusBar barStyle="dark-content" />
                <Animated.View style={{ flex: 1, transform: [{ scale: scaleAnim }] }} onLayout={(evt) => { console.log('View Height', evt.nativeEvent.layout.height) }}>
                    <View style={styles.container}>
                        <BooksHeader getBooks={getBooks} />
                        {loading ? (<ActivityIndicator size="large" />) : (
                            <FlatList
                                scrollEnabled={scrollEnabled}
                                data={bookData}
                                ListHeaderComponent={<BooksHeader2 />}
                                renderItem={({ item }) => (
                                    <PortalBook
                                        item={item}
                                        navigation={navigation}
                                        expandScreenAnimation={expandScreenAnimation}
                                        restoreScreenAnimation={restoreScreenAnimation}
                                        setScrollEnabled={setScrollEnabled}
                                        getBooks={getBooks}
                                    />
                                )}
                                keyExtractor={(_, index) => index}
                            />
                        )}
                    </View>
                    <View style={styles.bottom} />
                    <BooksFooter navigation={navigation} />
                </Animated.View>
            </LinearGradient>
        </PortalProvider>
    );
};

export default Books;

const styles = StyleSheet.create({
    container: {
        //flex: 1,
        height: '91%',
    },
    bottom: {
        backgroundColor: "hsl(180, 61%, 96%)",
        position: "absolute",
        bottom: "0%",
        height: "5%",
        width: "100%",
        //zIndex: 1,
    },
});
