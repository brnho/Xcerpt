import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { AntDesign, MaterialIcons } from '@expo/vector-icons';

export default function ExcerptTopHeader({ navigation, setModalVisible }) {
    return (
        <>
            <View style={styles.coverTop}></View>
            <View style={styles.header}>
                <TouchableOpacity style={styles.backContainer} onPress={() => navigation.navigate('Back')}>
                    <MaterialIcons name="arrow-back-ios" size={24} color="hsl(203, 100%, 45%)" />
                    <Text style={styles.headerTextBack}>Back</Text>
                </TouchableOpacity>

                <Text style={styles.headerText}>Excerpts</Text>

                <TouchableOpacity style={styles.plusContainer} onPress={() => setModalVisible(true)} hitSlop={20}>
                    <AntDesign name="plus" size={24} color="hsl(203, 100%, 45%)" />
                </TouchableOpacity>
            </View>
            <View style={styles.divider}></View>
        </>
    );
}

const styles = StyleSheet.create({
    coverTop: {
        height: 35,
        width: '100%',
        backgroundColor: 'white',
    },
    header: {
        height: 60,
        width: '100%',
        backgroundColor: 'white',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    plusContainer: {
        position: 'absolute',
        right: 15,
    },
    backContainer: {
        position: 'absolute',
        left: 15,
        flexDirection: 'row',
        alignItems: 'center'
    },
    headerText: {
        fontSize: 18,
        fontWeight: '500'
    },
    headerTextBack: {
        fontSize: 17,
        color: 'hsl(203, 100%, 45%)',
        marginLeft: -5,
    },
    divider: {
        width: '100%',
        height: 0.4,
        backgroundColor: 'hsl(0, 0%, 90%)'
    }
});
