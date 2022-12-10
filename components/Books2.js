import { StyleSheet, Text, View, SafeAreaView, TextInput, FlatList, Image, TouchableOpacity } from "react-native";
import React from "react";
import { LinearGradient } from 'expo-linear-gradient';
import { AntDesign, Entypo, Ionicons, MaterialIcons, FontAwesome5, FontAwesome } from "@expo/vector-icons";
import sampleData from "../Sample";
import { Themes } from "../Themes";
import InsetShadow from "react-native-inset-shadow";

const Book = ({ item }) => {
    return (
        <View
            style={styles.bookContainer}
        >
            <LinearGradient start={{ x: 0, y: 0.75 }} end={{ x: 1, y: 0.25 }} colors={['hsl(180, 61%, 98%)', 'hsl(180, 61%, 92%)']} style={styles.test}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
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
                </View>
                <View>
                    <MaterialIcons name="arrow-forward-ios" size={18} color='hsl(0, 0%, 60%)' />
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
                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                    <Text style={{ fontFamily: 'Quicksand', color: Themes.dark.lightTextSecondary }}>7 Excerpts</Text>
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
                    <Entypo name="plus" size={32} color={'hsl(0, 0%, 60%)'} />
                </View>

                <View style={styles.searchBarContainer}>
                    <InsetShadow
                        shadowColor="black"
                        shadowRadius={6}
                        shadowOpacity={0.3}
                        right={false}
                        bottom={false}
                        containerStyle={{ borderRadius: 10 }}
                    >

                        <View style={{
                            width: '100%',
                            height: '100%',
                            borderRadius: 10,
                            flexDirection: 'row',
                            alignItems: 'center',
                            paddingHorizontal: 10,
                        }}>
                            <Entypo name="magnifying-glass" size={24} color='hsl(0, 0%, 60%)' />
                            <TextInput
                                placeholder="Search Books"
                                style={styles.searchBar}
                            />
                        </View>

                    </InsetShadow>
                </View>

                <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10 }}>
                    <View style={{ borderRadius: 10, backgroundColor: 'hsl(180, 61%, 85%)', padding: 5, width: '24%', alignItems: 'center', flexDirection: 'row', justifyContent: 'space-around'}}>
                        <Text style={{ fontFamily: 'QuicksandBold', color: 'hsl(0, 0%, 40%)', fontSize: 12 }}>7 Books</Text>
                        <FontAwesome name="book" size={18} color="hsl(0, 0%, 60%)" />
                    </View>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Text style={{ fontFamily: 'Quicksand', color: 'hsl(0, 0%, 60%)', fontSize: 14, marginRight: 5 }}>Sort</Text>
                        <FontAwesome5 name="sort" size={18} color="hsl(0, 0%, 70%)" />
                    </View>
                </View>

                <FlatList
                    style={{ overflow: 'visible' }}
                    data={sampleData}
                    renderItem={({ item }) => <Book item={item} />}
                    keyExtractor={(_, index) => index}
                />
            </View>
            <View style={styles.footer}>
                <LinearGradient start={{ x: 0, y: 0.75 }} end={{ x: 1, y: 0.25 }}
                    colors={['hsl(180, 61%, 100%)', 'hsl(180, 61%, 94%)']}
                    style={styles.iconWrapper}
                >
                    <View style={[]}>
                        <AntDesign name="home" size={32} color='hsl(0, 0%, 30%)' />
                    </View>
                </LinearGradient>
                <View style={styles.iconWrapper}>
                    <TouchableOpacity onPress={() => { navigation.navigate('BookSearch') }}>
                        <Entypo name="magnifying-glass" size={28} color='hsl(0, 0%, 60%)' />
                    </TouchableOpacity>
                </View>
                <View style={styles.iconWrapper}>
                    <Ionicons
                        name="people-outline"
                        size={32}
                        color='hsl(0, 0%, 60%)'
                    />
                </View>
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

/*<View style={styles.test2}>
            <Entypo name="magnifying-glass" size={24} color='hsl(0, 0%, 60%)' />
            <TextInput
                placeholder="Search Books"
                style={styles.searchBar}
            />
        </View> */

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
    searchBarContainer: {
        //flexDirection: 'row',
        //alignItems: 'center',
        //borderWidth: 2,
        //padding: 10,
        borderRadius: 10,
        backgroundColor: 'hsl(180, 61%, 90%)',
        marginVertical: 15,
        height: 40,
        width: '100%',
        fontFamily: 'Quicksand',
    },
    insetShadow: {
        //width: 400,
    },
    test2: {
        flex: 1,
        //flexDirection: 'row',
        //width: '100%',
        backgroundColor: 'red',
        width: '10%',
    },
    searchBar: {
        marginLeft: 5,
        width: '100%',
    },
    infoContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    bookContainer: {
        height: 90,
        borderRadius: 50,
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
        flexDirection: 'row',
        alignItems: 'center',
    },
    test: {
        padding: 10,
        paddingHorizontal: 15,
        borderRadius: 15,

        height: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around',
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
        height: "10%",
        flexDirection: "row",
        justifyContent: "space-around",
        alignItems: "center",
        opacity: 1,
        backgroundColor: 'hsl(180, 61%, 87%)',

        shadowColor: 'black',
        shadowRadius: 3,
        shadowOffset: {height: -4},
        shadowOpacity: 0.1,
    },
    divider: {
        width: '100%',
        height: 0.3,
        backgroundColor: 'hsl(0, 0%, 80%)',
    },
    iconWrapper: {
        padding: 15,
        borderRadius: 20,
    },
    activeWrapper: {
        backgroundColor: 'white',
    }
});
