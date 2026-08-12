import { StyleSheet } from "react-native";
import COLORS from "../constants/colors";

const styles = StyleSheet.create({
    container: {
        backgroundColor: COLORS.primary,
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        padding: 20,
    },

    title: {
        fontFamily: "Sora Bold",
        color: "black",
        fontSize: 30,
        fontWeight: "bold",
        marginBottom: 50,
    },

    button:{
        backgroundColor: "#b4d6ef",
        width: "80%",
        padding: 20,
        marginVertical: 10,
        borderRadius: 12,
        alignItems: "center",
    },

    buttonText: {
        color: "black",
        fontSize: 18,
        fontWeight: "600",
    }

});

export default styles;
