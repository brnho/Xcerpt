import { View, StyleSheet, Modal, Text, TouchableOpacity } from "react-native";
import { Feather } from "@expo/vector-icons";
import { supabase } from "../supabase";

export default function DeleteConfirm({ modalVisible, setModalVisible, deleteBook }) {
    const handleDeletePress = () => {
        deleteBook();
        setModalVisible(false);
    }
    return (
        <Modal animationType="slide" transparent={true} visible={modalVisible}>
            <View style={{ flex: 1, alignItems: "center" }}>
                <View style={styles.container}>
                    <View
                        style={{
                            backgroundColor: "rgba(100, 100, 100, 0.90)",
                            width: "100%",
                            borderRadius: 10,
                        }}
                    >
                        <View style={{ alignItems: "center", padding: 10 }}>
                            <Text
                                style={{
                                    color: "hsl(0, 0%, 90%)",
                                    fontWeight: "bold",
                                    marginBottom: 7,
                                }}
                            >
                                Are you sure?
                            </Text>
                            <Text
                                numberOfLines={1}
                                adjustsFontSizeToFit
                                style={{ color: "hsl(0, 0%, 80%)" }}
                            >
                                This will permanently delete the book and all of its excerpts
                            </Text>
                        </View>
                        <View
                            style={{
                                backgroundColor: "hsl(0, 0%, 90%)",
                                width: "100%",
                                height: 0.5,
                            }}
                        />
                        <TouchableOpacity
                            style={{
                                alignItems: "center",
                                padding: 15,
                                width: "100%",
                                alignItems: "center",
                                justifyContent: "center",
                            }}
                            onPress={handleDeletePress}
                        >
                            <Feather
                                name="trash-2"
                                size={24}
                                color="hsl(0, 100%, 65%)"
                                style={{ position: "absolute", left: 10 }}
                            />
                            <Text style={{ color: "hsl(0, 100%, 65%)", fontSize: 18 }}>
                                Delete
                            </Text>
                        </TouchableOpacity>
                    </View>

                    <TouchableOpacity
                        style={{
                            alignItems: "center",
                            padding: 15,
                            width: "100%",
                            alignItems: "center",
                            justifyContent: "center",
                            backgroundColor: "rgba(100, 100, 100, 0.90)",
                            borderRadius: 10,
                            marginTop: 10,
                        }}
                        onPress={() => setModalVisible(false)}
                    >
                        <Text style={{ color: "white", fontSize: 18, fontWeight: "bold" }}>
                            Cancel
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    );
}

const styles = StyleSheet.create({
    container: {
        position: "absolute",
        bottom: "5%",
        width: "90%",
        alignItems: "center",
    },
});
