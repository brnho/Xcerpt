import {
    StyleSheet,
    SafeAreaView,
    View,
    Text,
    Pressable,
    Modal,
    TextInput
} from "react-native";
import { FlatList, TouchableOpacity } from "react-native-gesture-handler";
import { AntDesign, Feather, Ionicons, Entypo } from "@expo/vector-icons";
import { Themes } from "../Themes";
import { useState, useEffect } from 'react';
import { BlurView } from 'expo-blur';
import Book from "./Book";
import SeedStorage from "../utils/SeedStorage";
import AsyncStorage from '@react-native-async-storage/async-storage';
import uuid from 'react-native-uuid';
import { LinearGradient } from 'expo-linear-gradient';
//import { MMKV } from 'react-native-mmkv'

//export const storage = new MMKV();

export default function Books({ navigation }) {
    const [BookData, setBookData] = useState(null);
    const [modalVisible, setModalVisible] = useState(false);
    const [title, setTitle] = useState('');
    const [author, setAuthor] = useState('');


    const getData = async () => {
        try {
            const data = await AsyncStorage.getItem('BookData');
            setBookData(JSON.parse(data));
        } catch (e) {
            console.log(e);
        }
    }
    useEffect(() => {
        (async () => {
            await SeedStorage();
            await getData();
        })();
    }, []);

    const addBook = async () => {
        //const newBookData = { ...}
        await AsyncStorage.setItem(uuid.v4())
    }

    return (
        <SafeAreaView style={styles.container}>
            <LinearGradient
                // Background Linear Gradient
                colors={['rgba(0,0,0,0.8)', 'transparent']}
                style={styles.background}
            />
            <View style={styles.header}>
                <Text style={styles.headerText}>Books</Text>
                <Pressable onPress={() => { setModalVisible(!modalVisible) }}>
                    <AntDesign name="plus" size={24} color={Themes.dark.lightText} />
                </Pressable>
            </View>
            <TextInput 
                style={styles.searchBar}
                placeholder="Search Books"
            />
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
            >
                <BlurView style={styles.bookForm} intensity={15} tint={'light'}>
                    <Text style={styles.inputTitleHeader}>Title</Text>
                    <TextInput
                        style={styles.inputTitle}
                        value={title}
                        onChangeText={setTitle}
                    />
                    <Text style={styles.inputTitleHeader}>Author</Text>
                    <TextInput
                        style={styles.inputAuthor}
                        value={author}
                        onChangeText={setAuthor}
                    />
                    <View style={styles.formIcons}>
                        <Pressable onPress={() => { setModalVisible(!modalVisible) }} >
                            <Feather name="x" size={30} color={Themes.dark.lightText} />
                        </Pressable>
                        <Ionicons name="checkmark" size={30} color={Themes.dark.lightText} />
                    </View>
                </BlurView>
            </Modal>
            <FlatList
                data={BookData}
                numColumns={2}
                renderItem={({ item }) => <Book item={item} navigation={navigation} />}
                keyExtractor={(_, index) => index}
            />
            <View style={styles.footer}>
                <AntDesign name="home" size={32} color={Themes.dark.lightText} />
                <TouchableOpacity onPress={() => { navigation.navigate('BookSearch') }}>
                    <Entypo name="magnifying-glass" size={28} color={Themes.dark.lightText} />
                </TouchableOpacity>
                <Ionicons
                    name="people-outline"
                    size={32}
                    color={Themes.dark.lightText}
                />
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: "100%",
        backgroundColor: '#1f004d',
        alignItems: "center",
        justifyContent: "center",
    },
    header: {
        width: "100%",
        textAlign: "left",
        paddingHorizontal: "3%",
        paddingVertical: "2%",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    headerText: {
        color: Themes.dark.lightText,
        fontFamily: "QuicksandBold",
        fontSize: 35,
    },
    searchBar: {
        width: '100%',
        backgroundColor: '#29293d',
        padding: 10,
        borderRadius: 10,
        marginHorizontal: 30,
    },
    footer: {
        width: "100%",
        height: "7%",
        flexDirection: "row",
        justifyContent: "space-around",
        alignItems: "center",
    },
    bookForm: {
        height: '100%',
        justifyContent: 'center',
        paddingHorizontal: '10%',
    },
    inputTitleHeader: {
        fontFamily: 'Quicksand',
        color: Themes.dark.lightText,
        fontSize: 24,
        marginBottom: 10,
    },
    inputTitle: {
        backgroundColor: Themes.dark.lightText,
        opacity: 0.7,
        height: '6%',
        width: '100%',
        borderRadius: 10,
        paddingHorizontal: 10,
        marginBottom: 40,
        fontFamily: 'Quicksand',
    },
    inputAuthor: {
        backgroundColor: Themes.dark.lightText,
        opacity: 0.7,
        width: '100%',
        height: '6%',
        paddingHorizontal: 10,
        borderRadius: 10,
        fontFamily: 'Quicksand',
    },
    formIcons: {
        marginTop: 20,
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    background: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        height: '100%',
    }
});
