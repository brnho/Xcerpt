import { StyleSheet, Text, View, Pressable } from "react-native";
import React from "react";
import BooksFooter from "./BooksFooter";
import { LinearGradient } from "expo-linear-gradient";

const BLUE3 = "hsl(180, 61%, 87%)";

const Settings = ({ navigation }) => {
    return (
        <>
            <LinearGradient
                colors={["hsl(0, 0%, 100%)", BLUE3]}
                style={{ ...StyleSheet.absoluteFill }}
            />
            <View style={styles.header}>
                <Text style={styles.headerText}>Settings</Text>
            </View>
            <View style={styles.profilePhoto} />
            <Text style={styles.profilePhotoText}>Change Profile Photo</Text>

            <Pressable style={styles.infoContainer} onPress={() => navigation.navigate('EditName')}>
                <Text style={styles.infoType}>Name</Text>
				<View style={styles.infoValue}>
					<Text style={styles.infoValueText}>Bob</Text>
				</View>
            </Pressable>

			<Pressable style={styles.infoContainer} onPress={() => navigation.navigate('EditUsername')}>
                <Text style={styles.infoType}>Username</Text>
				<View style={styles.infoValue}>
					<Text style={styles.infoValueText}>{null}</Text>
				</View>
            </Pressable>
			<View style={styles.bottom} />
            <BooksFooter navigation={navigation} />
        </>
    );
};

export default Settings;

const styles = StyleSheet.create({
    header: {
        marginTop: 45,
        width: "100%",
        justifyContent: "center",
        alignItems: "center",
        paddingBottom: 10,
    },
    headerText: {
        color: "black",
        fontFamily: "DMSerif",
        fontSize: 34,
    },
    profilePhoto: {
        height: 150,
        width: 150,
        backgroundColor: "red",
        borderRadius: 99,
        alignSelf: "center",
        marginTop: "5%",
    },
    profilePhotoText: {
        alignSelf: "center",
        marginTop: 20,
        fontFamily: "Quicksand",
        fontSize: 18,
		marginBottom: 30
    },
	infoContainer: {
		flexDirection: 'row',
		width: '100%',
		paddingHorizontal: 15,
		marginBottom: 20,
	},
	infoType: {
        fontFamily: "Quicksand",
		width: '25%',
		fontSize: 16,
	},
	infoValue: {
		width: '75%',
		borderBottomColor: "hsl(0, 0%, 80%)",
		borderBottomWidth: 1,
	},
	infoValueText: {
        fontFamily: "DMSerif",
		fontSize: 16,
	},
	bottom: {
        backgroundColor: "hsl(180, 61%, 96%)",
        position: "absolute",
        bottom: "0%",
        height: "5%",
        width: "100%",
    },
});
