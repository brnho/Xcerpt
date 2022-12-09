import { StyleSheet, SafeAreaView, View, Text, FlatList, Pressable, Modal } from "react-native";
import { Themes } from "../Themes";
import { MaterialIcons, AntDesign, Feather } from '@expo/vector-icons';
import { useState } from 'react';
import Camera from "./ExcerptCamera";

const Excerpt = ({ item, navigation }) => {
    return (
        <View style={styles.excerptContainer}>
            <Text style={styles.excerptText} numberOfLines={10}>
                {item.text}
            </Text>
            <View style={styles.excerptInfoContainer}>
                <View style={{ flexDirection: 'row' }}>
                    <Text style={styles.excerptInfo}>Ch. {item.chapter}</Text>
                    <Text style={styles.excerptInfo}>p. {item.page}</Text>
                </View>
                <Pressable onPress={() => {
                    navigation.navigate('ExcerptDetail', { item: item })
                }}>
                    <MaterialIcons name="arrow-forward-ios" size={18} color={Themes.dark.lightText} />
                </Pressable>
            </View>
            <View style={styles.divider}></View>
        </View>
    );
};

export default function Excerpts({ route, navigation }) {
    const { key, title, author, excerpts } = route.params;
    const [modalVisible, setModalVisible] = useState(false);
    //return (<Camera />);
    return (
        <SafeAreaView style={styles.container}>
            <FlatList
                ListHeaderComponent={() => (
                    <View style={styles.bookInfo}>
                        <View>
                            <Text style={styles.bookTitle}>{title}</Text>
                            <Text style={styles.bookAuthor}>{author}</Text>
                        </View>
                        <View>
                            <Pressable onPress={() => { setModalVisible(!modalVisible) }}>
                                <AntDesign name="plus" size={24} color={Themes.dark.lightText} />
                            </Pressable>
                        </View>
                    </View>
                )}
                data={excerpts}
                renderItem={({ item }) => <Excerpt item={item} navigation={navigation} />}
                keyExtractor={(_, index) => index}
            />
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
            >
                <SafeAreaView style={styles.container}>
                    <View style={styles.cameraHeader}>
                        <Pressable onPress={() => { setModalVisible(!modalVisible) }}>
                            <Feather name="x" size={25} color={Themes.dark.lightText} />
                        </Pressable>
                    </View>
                    <Camera />
                </SafeAreaView>
            </Modal>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: "100%",
        backgroundColor: Themes.dark.bg,
    },
    bookInfo: {
        width: "100%",
        flexDirection: 'row',
        padding: 20,
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    bookTitle: {
        fontFamily: "Quicksand",
        fontSize: 30,
        color: Themes.dark.lightText,
    },
    bookAuthor: {
        fontFamily: "Quicksand",
        fontSize: 14,
        color: Themes.dark.lightTextSecondary,
    },
    excerptContainer: {
        paddingHorizontal: 20,
    },
    excerptText: {
        fontFamily: "Quicksand",
        fontSize: 18,
        color: Themes.dark.lightText,
    },
    excerptInfoContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 15,
    },
    excerptInfo: {
        marginRight: 5,
        color: Themes.dark.lightTextSecondary,
    },
    divider: {
        height: 0.5,
        backgroundColor: Themes.dark.lightTextSecondary,
        marginVertical: 14,
    },
    cameraHeader: {
        height: '4%',
        justifyContent: 'center',
        paddingLeft: 20,
    }
});
