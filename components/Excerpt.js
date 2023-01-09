
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import { Themes } from "../Themes";
import { MaterialIcons } from '@expo/vector-icons';
import { LinearGradient } from "expo-linear-gradient";

const GREY1 = "hsl(0, 0%, 60%)";

export default Excerpt = ({ item, navigation }) => {
    return (
        <View style={styles.container}>
            <LinearGradient
                start={{ x: 0, y: 0.75 }}
                end={{ x: 1, y: 0.25 }}
                colors={["hsl(180, 61%, 98%)", "hsl(180, 61%, 92%)"]}
                style={styles.gradientContainer}
            >
                <Text style={styles.excerptText} numberOfLines={10}>
                    {item.text}
                </Text>
                <View style={styles.excerptInfoContainer}>
                    <View style={{ flexDirection: 'row' }}>
                        <Text style={styles.excerptInfo}>Ch. {item.chapter}</Text>
                        <Text style={styles.excerptInfo}>p. {item.page}</Text>
                    </View>
                    <TouchableOpacity onPress={() => {
                        navigation.navigate('ExcerptDetail', { item: item })
                    }}>
                        <MaterialIcons name="arrow-forward-ios" size={18} color={GREY1} />
                    </TouchableOpacity>
                </View>
            </LinearGradient>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 13,
        borderRadius: 10,
        marginVertical: 8,
        shadowColor: "black",
        shadowRadius: 4,
        shadowOffset: Themes.dark.shadow.shadowOffset.dark,
        shadowOpacity: 0.1,
    },
    gradientContainer: {
        borderRadius: 10,
        padding: 10,
    },
    excerptText: {
        fontFamily: "DMSerif",
        fontSize: 16,
    },
    excerptInfoContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 15,
    },
    excerptInfo: {
        marginRight: 5,
        color: GREY1
    },
});