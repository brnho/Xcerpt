
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import { Themes } from "../../Themes";
import { MaterialIcons } from '@expo/vector-icons';
import { LinearGradient } from "expo-linear-gradient";

const GREY1 = "hsl(0, 0%, 60%)";
const BACK_BLUE = "hsl(209, 100%, 50%)";

export default Excerpt = ({ item, navigation }) => {
    return (
        <View style={styles.container}>
            <View style={styles.divider}></View>

            <Text style={styles.excerptText} numberOfLines={15}>
                {item.text}
            </Text>
            <View style={styles.excerptInfoContainer}>
                <View style={{ flexDirection: 'row' }}>
                    {item.chapter ? <Text style={styles.excerptInfo}>ch {item.chapter}</Text> : null}
                    {item.page ? <Text style={styles.excerptInfo}>p {item.page}</Text> : null}
                </View>
                <TouchableOpacity onPress={() => {
                    navigation.navigate('ExcerptDetail', { item: item })
                }}>
                    <MaterialIcons name="arrow-forward-ios" size={18} color={GREY1} />
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 15,
        /*borderRadius: 10,
        shadowColor: "black",
        shadowRadius: 4,
        shadowOffset: Themes.dark.shadow.shadowOffset.dark,
        shadowOpacity: 0.1,*/
    },
    excerptText: {
        fontFamily: "Georgia",
        //fontFamily: "DMSerif",
        fontSize: 16,
        lineHeight: 19,
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
    divider: {
        width: '100%',
        height: 1,
        backgroundColor: 'hsl(0, 0%, 90%)',
        marginVertical: 10,
    },
});