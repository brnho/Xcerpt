import {
    StyleSheet,
    View,
    FlatList,
    ActivityIndicator,
    StatusBar,
    RefreshControl,
} from "react-native";
import React, { useContext, useState, useEffect } from "react";
import { LinearGradient } from "expo-linear-gradient";
import BooksHeader from "./BooksHeader";
import BooksFooter from "./BooksFooter";
import UserContext from "../UserContext";
import { supabase } from "../supabase";
import BooksHeader2 from "./BooksHeader2";
import Book from "./Book";
import {
    ContextMenuProvider,
    ContextMenuContainer,
} from "@brnho/react-native-context-menu";
import DeleteConfirm from "./DeleteConfirm";
import storage from "../storage";
import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabase("db.db");

const BLUE3 = "hsl(180, 61%, 87%)";

const getMenuItems = (setModalVisible, setDeleteBook_uuid, book_uuid) => {
    return (
        [
            { text: "Action", isTitle: true },
            {
                text: "Edit",
                icon: {
                    type: "Feather",
                    name: "edit",
                    size: 18,
                },
                onPress: () => {
                    alert("Edit pressed");
                },
            },
            {
                text: "Delete",
                icon: {
                    type: "Feather",
                    name: "trash",
                    size: 18,
                },
                withSeparator: true,
                isDestructive: true,
                onPress: () => {
                    setModalVisible(true);
                    setDeleteBook_uuid(book_uuid);
                },
            },
        ]
    )
}

const Books = ({ navigation }) => {
    const { email } = useContext(UserContext);
    const [bookData, setBookData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [scrollEnabled, setScrollEnabled] = useState(true);
    const [refreshing, setRefreshing] = useState(false);
    const [modalVisible, setModalVisible] = useState(false);
    /*error {"code": "", "details": "", "hint": "", "message": "FetchError: Network request failed"}*/
    const [deleteBook_uuid, setDeleteBook_uuid] = useState(null);

    const getBooks = async () => {
        console.log('getting books');
        db.transaction((tx) => {
            tx.executeSql(
                `select * from books`,
                [],
                (_, { rows: { _array } }) => {
                    for (const book of _array) {
                        book.menuItems = getMenuItems(setModalVisible, setDeleteBook_uuid, book.uuid);
                    }
                    setBookData(_array);
                    setLoading(false);
                }
            );
        }, (err) => console.log('error', err));
        /*
        try {
            const data = []
            if (storage.contains('bookIds')) {
                const bookIds = storage.getString('bookIds');
                for (const bookId of bookIds.split(',')) {
                    const book = JSON.parse(storage.getString(bookId));
                    book.menuItems = getMenuItems(setModalVisible, setDeleteBookId, bookId);
                    data.push(book);
                }
            }
            setBookData(data);
            setLoading(false);
        } catch (e) {
            console.error(e);
        }
        */
        /*
        try {
            const { data, error } = await supabase
                .from("books")
                .select("id, title, author, image")
                .eq("email", email);
            console.log("data", data);
            console.log('error', error);
            setBookData(data);
            setLoading(false);
        } catch (err) {
            console.error(err);
        }*/
    };

    const onRefresh = async () => {
        setRefreshing(true);
        await getBooks();
        setRefreshing(false);
    }

    const deleteBook = async (book_uuid) => {
        db.transaction((tx) => {
            tx.executeSql('delete from books where uuid = ?;', [book_uuid]);
            tx.executeSql('delete from excerpts where book_uuid = ?;', [book_uuid]);
        }, null, () => {
            getBooks();
            deleteBookSupabase(book_uuid);
        });
    }

    const deleteBookSupabase = async (book_uuid) => {
        try { 
            const { error: error1 } = await supabase.from('books').delete().eq('uuid', book_uuid);
            const { error: error2 } = await supabase.from('excerpts').delete().eq('book_uuid', book_uuid);
            if (error1 !== null || error2 !== null) {
                throw error1;
            }
        } catch (e) {
            console.error(e);
            // add book uuid to local storage
            const books = JSON.parse(storage.getString('deleteBooks'));
            books.push(book_uuid);
            storage.set('deleteBooks', JSON.stringify(books));
        }
    }

    // insert any books in local storage addBooks to supabase
    const syncInsertSupabase = async () => {
        const books = JSON.parse(storage.getString('addBooks'));
        const failedBooks = [];
        for (const book of books) {
            try {
                const {data, error} = await supabase.from("books").insert(book);
                if (error) {
                    throw error;
                }
            } catch (err) {
                failedBooks.push(book);
            }
        }
        storage.set('addBooks', JSON.stringify(failedBooks));
    }

    // delete any books in local storage deleteBooks from supabase
    const syncDeleteSupabase = async () => {
        const book_uuids = JSON.parse(storage.getString('deleteBooks'));
        const failedBooks = [];
        for (const book_uuid of book_uuids) {
            try { 
                const { error: error1 } = await supabase.from('books').delete().eq('uuid', book_uuid);
                const { error: error2 } = await supabase.from('excerpts').delete().eq('book_uuid', book_uuid);
                if (error1 !== null || error2 !== null) {
                    throw new Error('Supabase deletion error');
                } 
            } catch (e) {
                failedBooks.push(book_uuid);
            }
        }
        storage.set('deleteBooks', JSON.stringify(failedBooks));
    }

    // sync local database with supabase
    useEffect(() => {
        // first time opening app, fields not set yet
        if (!storage.contains('addBooks')) {
            storage.set('addBooks', JSON.stringify([]));
            storage.set('deleteBooks', JSON.stringify([])); 
            storage.set('addExcerpts', JSON.stringify([])); 
            return;
        }
        syncInsertSupabase();
        syncDeleteSupabase();
    }, [])

    // create new tables if they don't exist
    useEffect(() => {
        /*db.transaction((tx) => {
            tx.executeSql('drop table books');
            tx.executeSql('drop table excerpts');
        });*/
        db.transaction((tx) => {
            tx.executeSql(
                `create table if not exists books (id integer primary key not null, 
                      title text, author text, image text, timestamp integer, uuid text);`
            );
            tx.executeSql(
                `create table if not exists excerpts (id integer primary key not null, book_uuid text,
                      text text, page integer, chapter integer, timestamp integer, foreign key(book_uuid) references books(uuid));`
            );
        }, (error) => console.log('error', error));

    }, []);

    // load books
    useEffect(() => {
        getBooks();
    }, []);
    

    return (
        <ContextMenuProvider setScrollEnabled={setScrollEnabled}>
            <LinearGradient
                colors={["hsl(0, 0%, 100%)", BLUE3]}
                style={{ ...StyleSheet.absoluteFill }}
            >
                <StatusBar barStyle="dark-content" />
                <View style={styles.container}>
                    <BooksHeader getBooks={getBooks} />
                    {loading ? (
                        <ActivityIndicator size="large" />
                    ) : (
                        <FlatList
                            scrollEnabled={scrollEnabled}
                            data={bookData}
                            ListHeaderComponent={<BooksHeader2 />}
                            refreshControl={
                                <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
                            }
                            renderItem={({ item }) => (
                                <ContextMenuContainer
                                    menuItems={item.menuItems}
                                    marginBottom={10}
                                    marginLeft={20}
                                    marginRight={20}
                                    borderRadius={15}
                                >
                                    <Book item={item} navigation={navigation} />
                                </ContextMenuContainer>
                            )}
                            keyExtractor={(_, index) => index}
                        />
                    )}
                </View>
                <View style={styles.bottom} />
                <BooksFooter navigation={navigation} />
            </LinearGradient>
            <DeleteConfirm
                modalVisible={modalVisible}
                setModalVisible={setModalVisible}
                deleteBook={() => deleteBook(deleteBook_uuid)}
            />
        </ContextMenuProvider>
    );
};

export default Books;

const styles = StyleSheet.create({
    container: {
        height: "91%",
    },
    bottom: {
        backgroundColor: "hsl(180, 61%, 96%)",
        position: "absolute",
        bottom: "0%",
        height: "5%",
        width: "100%",
    },
});
