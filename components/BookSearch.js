import { StyleSheet, Text, View, TextInput, SafeAreaView, FlatList, Image, TouchableOpacity, ActivityIndicator } from "react-native";
import React, { useState, useContext } from "react";
import { Entypo, Feather } from '@expo/vector-icons';
import { LinearGradient } from "expo-linear-gradient";
import InsetShadow from "react-native-inset-shadow";
import { supabase } from "../supabase";
import UserContext from '../UserContext';
import storage from "../storage";
import uuid from 'react-native-uuid';
import * as FileSystem from 'expo-file-system';
import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabase("db.db");

const GOOGLE_API = 'https://www.googleapis.com/books/v1/volumes?';
const API_KEY = 'AIzaSyADRN5e9ZW61-sHZm0f-XKkQluTI4kvOI8';
const MAX_RESULTS = 10;
const BLUE3 = "hsl(180, 61%, 87%)";
const BLUE1 = "hsl(180, 61%, 90%)";
const GREY1 = "hsl(0, 0%, 60%)";

const Book = ({ item, setModalVisible, modalVisible, getBooks }) => {
    const { email } = useContext(UserContext);

    const addBook = async () => {
        const localId = uuid.v4();
        const bookObj = {
            uuid: localId,
            title: item.volumeInfo?.title,
            author: item.volumeInfo?.authors?.join(','),
            imageLocal: FileSystem.documentDirectory + localId,
            imageWeb: item.volumeInfo?.imageLinks?.smallThumbnail,
            email: email,
            timestamp: new Date().getTime()
        };
        try {
            // download image to local file system
            await FileSystem.downloadAsync(bookObj.imageWeb, bookObj.imageLocal);
            // add book to sqlite
            db.transaction((tx) => {
                tx.executeSql(
                    "insert into books (uuid, title, author, image, timestamp) values(?, ?, ?, ?, ?)",
                    [bookObj.uuid, bookObj.title, bookObj.author, bookObj.imageLocal, bookObj.timestamp],
                    (_, result) => {
                        getBooks();
                        setModalVisible(!modalVisible);
                        addBookSupabase(bookObj);
                    }
                );
            }, (error) => console.error(error));
        } catch (e) {
            console.log(e);
        }
    }

    const addBookSupabase = async (bookObj) => {
        const supabaseBook = {
            uuid: bookObj.uuid,
            title: bookObj.title,
            author: bookObj.author,
            image: bookObj.imageWeb,
            timestamp: bookObj.timestamp,
            email: email,
        }
        try {
            const { _, error } = await supabase.from("books").insert(supabaseBook);
            if (error !== null) {
                throw error;
            }
        } catch (err) {
            console.error(err);
            // add book to local storage
            const books = JSON.parse(storage.getString('addBooks'));
            books.push(supabaseBook);
            storage.set('addBooks', JSON.stringify(books));
        }
    }

    return (
        <>
            <TouchableOpacity style={styles.bookContainer} hitSlop={20} onPress={addBook}>
                <View style={{ width: '14%', height: '100%' }}>
                    <Image
                        style={styles.bookImage}
                        source={{ uri: item.volumeInfo?.imageLinks?.smallThumbnail }}
                    />
                </View>
                <View style={styles.bookInfo}>
                    <Text style={styles.title} numberOfLines={2}>{item.volumeInfo?.title}</Text>
                    <Text style={styles.author} numberOfLines={1}>{item.volumeInfo?.authors?.join(', ')}</Text>
                </View>
            </TouchableOpacity>
            <View style={styles.divider} />
        </>
    )
}

const BookSearch = ({ modalVisible, setModalVisible, getBooks }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [books, setBooks] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    const getBookResults = async () => {
        try {
            setIsLoading(true);
            const response = await fetch(GOOGLE_API + new URLSearchParams({
                q: searchTerm,
                key: API_KEY,
                maxResults: MAX_RESULTS,
            }));
            const result = await response.json()
            setBooks(result.items)
            setIsLoading(false);
        } catch (err) {
            console.error(err);
        }
    }

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <LinearGradient
                colors={["hsl(0, 0%, 100%)", "hsl(0, 0%, 100%)"]}
                style={styles.background}
            />
            <View style={{ paddingHorizontal: 20 }}>
                <View style={styles.modalHeader}>
                    <Text style={styles.addBookText}>Add Book</Text>
                    <TouchableOpacity style={styles.x} onPress={() => { setModalVisible(!modalVisible) }}>
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
                                placeholder="Search for books"
                                value={searchTerm}
                                onChangeText={setSearchTerm}
                                returnKeyType='search'
                                onSubmitEditing={getBookResults}
                                style={styles.textInput}
                            />
                        </View>
                    </InsetShadow>
                </View>
            </View>
            {isLoading ? <ActivityIndicator size='large' /> :
                <FlatList
                    data={books}
                    renderItem={({ item }) => <Book item={item} modalVisible={modalVisible} setModalVisible={setModalVisible} getBooks={getBooks} />}
                    keyExtractor={(_, index) => index}
                />
            }
        </SafeAreaView>
    );
};

export default BookSearch;

const styles = StyleSheet.create({
    background: {
        position: "absolute",
        left: 0,
        right: 0,
        top: 0,
        height: "110%",
    },
    modalHeader: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    addBookText: {
        fontFamily: 'DMSerif',
        fontSize: 34
    },
    x: {
        position: 'absolute',
        right: 0
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
        width: '100%',
    },
    bookContainer: {
        paddingHorizontal: 20,
        height: 80,
        flexDirection: 'row',
        alignItems: 'center',
    },
    bookImage: {
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
    },
    bookInfo: {
        paddingLeft: 10,
        width: '86%',
    },
    title: {
        fontFamily: 'DMSerif',
        marginBottom: 5,
    },
    author: {
        fontFamily: 'Quicksand',
    },
    divider: {
        width: '100%',
        height: 0.5,
        backgroundColor: 'hsl(0, 0%, 90%)',
        marginVertical: 10,
    },
});
