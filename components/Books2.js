import { StyleSheet, Text, View, SafeAreaView, TextInput, FlatList, Image, TouchableOpacity } from "react-native";
import React from "react";
import { LinearGradient } from 'expo-linear-gradient';
import { AntDesign, Entypo, Ionicons, FontAwesome } from "@expo/vector-icons";
import sampleData from "../Sample";
import { Themes } from "../Themes";

const Book = ({ item }) => {
    return (
        <View
            style={styles.bookContainer}
        >
            <LinearGradient start={{x: 0, y: 0.75}} end={{x: 1, y: 0.25}} colors={['hsl(180, 61%, 98%)', 'hsl(180, 61%, 92%)']} style={styles.test}>
                <View style={{ width: '14%', height: '100%' }}>
                    <Image
                        style={styles.bookImage}
                        source={{ uri: item.imageUrl }}
                    />
                </View>
                <View style={styles.bookInfo}>
                    <Text style={styles.title} numberOfLines={2}>{item.title}</Text>
                    <Text style={styles.author} numberOfLines={1}>{item.author}</Text>
                </View>
            </LinearGradient>
        </View>
    )
}

const Book2 = ({ item }) => {
    return (
        <>
            <View style={styles.bookContainer2}>
                <View style={{ width: '80%', flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                    <View style={styles.imageContainer}>
                        <Image
                            style={styles.bookImage}
                            source={{ uri: item.imageUrl }}
                        />
                    </View>
                    <View style={styles.bookInfo}>
                        <Text style={styles.title} numberOfLines={2}>{item.title}</Text>
                        <Text style={styles.author} numberOfLines={1}>{item.author}</Text>
                    </View>
                </View>
                <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}>
                    <Text style={{fontFamily: 'Quicksand', color: Themes.dark.lightTextSecondary}}>7 Excerpts</Text>
                </View>
            </View>
            <View style={styles.divider} />
        </>
    )
}

const Books2 = () => {
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: 'hsl(180, 61%, 87%)' }}>
            <LinearGradient
                // Background Linear Gradient
                colors={['hsl(0, 0%, 100%)', 'hsl(180, 61%, 87%)']}
                //locations={[0.1, 0.9]}
                style={styles.background}
            />
            <View style={styles.container}>
                <View style={styles.header}>
                    <Text style={styles.headerText}>Books</Text>
                    <AntDesign name="plus" size={28} color={Themes.dark.lightText} />
                </View>
                <TextInput
                    placeholder="Search Books"
                    style={styles.searchBar}
                />
                <FlatList
                    style={{ overflow: 'visible' }}
                    data={sampleData}
                    renderItem={({ item }) => <Book item={item} />}
                    keyExtractor={(_, index) => index}
                />
            </View>
            <View style={styles.footer}>
                <AntDesign name="home" size={32} color='hsl(0, 0%, 60%)' />
                <TouchableOpacity onPress={() => { navigation.navigate('BookSearch') }}>
                    <Entypo name="magnifying-glass" size={28} color='hsl(0, 0%, 60%)' />
                </TouchableOpacity>
                <Ionicons
                    name="people-outline"
                    size={32}
                    color='hsl(0, 0%, 60%)'
                />
            </View>
        </SafeAreaView>
    );
};

/*
<View style={styles.infoContainer}>
                    <Text style={{fontFamily: 'QuicksandBold'}}>5 Books</Text>
                    <Text style={{fontFamily: 'QuicksandBold'}}>Sort</Text>
                </View>
                */

export default Books2;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 20,
        paddingHorizontal: 20,
    },
    background: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        height: '100%',
    },
    header: {
        width: "100%",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    headerText: {
        color: 'black',
        fontFamily: "DMSerif",
        //fontFamily: "LibreBaskervilleBold",
        fontSize: 34,
    },
    searchBar: {
        width: '100%',
        padding: 10,
        marginTop: 10,
        marginBottom: 20,
        borderRadius: 10,
        backgroundColor: 'hsl(180, 61%, 87%)',
    },
    infoContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    bookContainer: {
        height: 90,
        //borderRadius: 5,
        marginVertical: 6,
        
        shadowColor: 'black',
        shadowRadius: 4,
        shadowOffset: Themes.dark.shadow.shadowOffset.dark,
        shadowOpacity: 0.06,
    },
    bookContainer2: {
        height: 90,
        borderRadius: 7,
        marginVertical: 7,
        padding: 10,
        borderRadius: 7,
        flexDirection: 'row',
        alignItems: 'center',
    },
    test: {
        padding: 10,
        borderRadius: 5,

        height: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'white',
    },
    imageContainer: {
        width: '17%',
        height: '100%',

        shadowColor: 'black',
        shadowRadius: 4,
        shadowOffset: Themes.dark.shadow.shadowOffset.dark,
        shadowOpacity: 0.2,
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
        fontSize: 16,
        marginBottom: 5,
    },
    author: {
        fontFamily: 'Quicksand',
        color: Themes.dark.lightTextSecondary,
        fontSize: 13,
    },
    footer: {
        width: "100%",
        height: "7%",
        flexDirection: "row",
        justifyContent: "space-around",
        alignItems: "center",
    },
    divider: {
        width: '100%',
        height: 0.3,
        backgroundColor: 'hsl(0, 0%, 80%)',
    },
});
