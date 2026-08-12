import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    input: {
        borderWidth: 1,
        borderColor: "#ccc",
        borderTopWidth: 0,
        maxHeight: 200,
        backgroundColor: "white",
        width: 350,
        maxHeight: 200,
    },

    dropdownContainer: {
        position: "absolute", //makes it float
        top: 55,
        width: 350,
        maxHeight: 200,
        borderWidth: 1,
        borderColor: "#ccc",
        borderRadius: 8,
        backgroundColor: "white",
        zIndex: 1000,
        elevation: 5,
    },

    option: {
        padding: 12,
        borderBottomWidth: 1,
        borderBottomColor: "#eee",
    }
});

export default styles;