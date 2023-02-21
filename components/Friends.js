import { StyleSheet, Text, View, Button } from "react-native";
import React from "react";

const Friends = ({ navigation }) => {
    return (
        <View>
            <Button onPress={() => navigation.navigate("SearchFriends")} title="Add Friend" />
        </View>
    );
};

export default Friends;

const styles = StyleSheet.create({});
