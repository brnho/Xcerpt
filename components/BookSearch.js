import { StyleSheet, Text, View, TextInput, SafeAreaView, FlatList, Image, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { Entypo } from '@expo/vector-icons';

const GOOGLE_API = 'https://www.googleapis.com/books/v1/volumes?';
const API_KEY = 'AIzaSyADRN5e9ZW61-sHZm0f-XKkQluTI4kvOI8';
const MAX_RESULTS = 10;

const Book = ({ item }) => {
    console.log(item.volumeInfo?.title, item.volumeInfo?.authors.join(', '), item.volumeInfo?.imageLinks?.smallThumbnail)
    return (
        <>
        <View style={styles.bookContainer}>
            <View style={{ width: '14%', height: '100%' }}>
                <Image
                    style={styles.bookImage}
                    source={{uri: item.volumeInfo?.imageLinks?.smallThumbnail}}
                />
            </View>
            <View style={styles.bookInfo}>
                <Text style={styles.title} numberOfLines={2}>{item.volumeInfo?.title}</Text>
                <Text style={styles.author} numberOfLines={1}>{item.volumeInfo?.authors.join(', ')}</Text>
            </View>
        </View>
        <View style={styles.divider} />
        </>
    )
}

const BookSearch = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [books, setBooks] = useState([]);

    const getBooks = async () => {
        try {
            const response = await fetch(GOOGLE_API + new URLSearchParams({
                q: searchTerm,
                key: API_KEY,
                maxResults: MAX_RESULTS,
            }));
            const result = await response.json()
            setBooks(result.items)
        } catch (err) {
            console.error(err);
        }
    }
    

    return (
        <SafeAreaView>
            <View style={{paddingHorizontal: 20}}>
                <View style={styles.searchContainer}>
                    <TextInput
                        style={styles.searchBar}
                        placeholder="Search"
                        value={searchTerm}
                        onChangeText={setSearchTerm}
                    />
                    <TouchableOpacity onPress={getBooks}>
                        <Entypo name="magnifying-glass" size={24} color="#1E90FF" />
                    </TouchableOpacity>
                </View>
                <FlatList
                    data={books}
                    renderItem={({ item }) => <Book item={item} />}
                    keyExtractor={(_, index) => index}
                />
            </View>
        </SafeAreaView>
    );
};

export default BookSearch;

const styles = StyleSheet.create({
    searchContainer: {
        flexDirection: 'row',
        marginVertical: 20,
        alignItems: 'center',
        justifyContent: 'center'
    },  
    searchBar: {
        width: '90%',
        borderWidth: 1,
        borderColor: 'gainsboro',
        padding: 10,
        borderRadius: 10,
        marginRight: 10,
    },
    bookContainer: {
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
        fontFamily: 'QuicksandBold',
        marginBottom: 5,
    },
    author: {
        fontFamily: 'Quicksand',
    },
    divider: {
        width: '100%',
        height: 1,
        backgroundColor: 'gainsboro',
        margin: 10,
    },
});
