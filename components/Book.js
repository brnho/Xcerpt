import { View, Text, Pressable, StyleSheet } from "react-native";
import { Themes } from "../Themes";
import InsetShadow from "react-native-inset-shadow";

export default function Book({ item, navigation }) {
    const { title, author, color, numExcerpts, key, excerpts } = item;
    return (
        <Pressable
            style={styles.book}
            onPress={() => {
                navigation.navigate("Excerpts", {
                    key: key,
                    title: title,
                    author: author,
                    excerpts: excerpts,
                });
            }}
        >
            <View style={styles.book2}>
                <Text
                    style={[styles.title, { color: Themes.dark.pastelColors[color] }]}
                    numberOfLines={2}
                >
                    {title}
                </Text>
                <Text style={styles.author} numberOfLines={1}>
                    {author}
                </Text>
                <View style={styles.excerptsContainer}>
                    <InsetShadow
                        shadowColor="black"
                        shadowRadius={4}
                        shadowOpacity={0.7}
                        right={false}
                        bottom={false}
                    >
                        <InsetShadow
                            left={false}
                            top={false}
                            shadowColor="white"
                            shadowOpacity={0.15}
                        >
                            <View style={styles.excerptsContainer2}>
                                <Text style={styles.excerptsText}># Excerpts:</Text>
                                <Text style={styles.excerptsNumber}>{numExcerpts}</Text>
                            </View>
                        </InsetShadow>
                    </InsetShadow>
                </View>
            </View>
        </Pressable>
    );
};

const styles = StyleSheet.create({
    book: {
        height: 200,
        width: "42%",
        margin: "3%",
        borderRadius: 10,

        shadowColor: Themes.dark.shadow.shadowColor.dark,
        shadowRadius: Themes.dark.shadow.shadowRadius,
        shadowOffset: Themes.dark.shadow.shadowOffset.dark,
        shadowOpacity: Themes.dark.shadow.shadowOpacity.dark,
    },
    book2: {
        height: "100%",
        width: "100%",
        backgroundColor: Themes.dark.bgSecondary,
        borderRadius: 10,
        alignItems: "center",
        padding: 8,
        shadowColor: Themes.dark.shadow.shadowColor.light,
        shadowRadius: Themes.dark.shadow.shadowRadius,
        shadowOffset: Themes.dark.shadow.shadowOffset.light,
        shadowOpacity: Themes.dark.shadow.shadowOpacity.light,
    },
    title: {
        textAlign: "center",
        fontFamily: "Quicksand",
        fontSize: 18,
        marginTop: "25%",
        marginBottom: 7,
    },
    author: {
        fontFamily: "Quicksand",
        fontSize: 12,
        color: Themes.dark.lightText,
    },
    excerptsContainer: {
        position: "absolute",
        bottom: "10%",
    },
    excerptsContainer2: {
        flexDirection: "row",
        fontFamily: "Quicksand",
        width: "100%",
        paddingHorizontal: 16,
        paddingVertical: 8,
        justifyContent: "center",
    },
    excerptsText: {
        fontFamily: "Quicksand",
        color: Themes.dark.lightText,
        fontSize: 12,
        marginRight: 5,
    },
    excerptsNumber: {
        fontFamily: "QuicksandBold",
        color: Themes.dark.lightText,
        fontSize: 12,
        textAlign: "center",
    },
});
