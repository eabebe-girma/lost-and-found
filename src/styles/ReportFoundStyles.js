import { StyleSheet } from "react-native";
import COLORS from "../constants/colors";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.background,
        paddingHorizontal: 24,
        paddingTop: 40,
        paddingBottom: 24,
    },

    content: {
        flex: 1,
    },

    title: {
        color: COLORS.text,
        fontFamily: "Space Grotesk Bold",
        fontSize: 30,
        fontWeight: "bold",
        textAlign: "center",
        marginBottom: 10,
    },

    subtitle: {
        color: COLORS.secondaryText,
        fontSize: 16,
        textAlign: "center",
        marginBottom: 30,
    },

    imageContainer: {
        width: "100%",
        height: 300,
        backgroundColor: COLORS.photoBackground,
        borderRadius: 18,
        borderWidth: 1,
        borderColor: "#B7E4DD",
        overflow: "hidden",

        shadowColor: "#000",
        shadowOpacity: 0.08,
        shadowRadius: 8,
        shadowOffset: {
            width: 0,
            height: 4,
        },
        elevation: 3,

        marginBottom: 28,
    },

    photo: {
        width: "100%",
        height: "100%",
        resizeMode: "contain",
    },

    question: {
        color: COLORS.text,
        fontSize: 17,
        fontWeight: "600",
        marginBottom: 12,
    },

    selectedLocation: {
        marginBottom: 18,
        color: COLORS.primary,
        fontWeight: "700",
        textAlign: "center",
    },

    bottomSection: {
        marginTop: "auto",
        paddingTop: 20,
    },

    button: {
        width: "100%",
        backgroundColor: COLORS.primary,
        paddingVertical: 18,
        borderRadius: 14,
        alignItems: "center",

        shadowColor: "#000",
        shadowOpacity: 0.12,
        shadowRadius: 6,
        shadowOffset: {
            width: 0,
            height: 3,
        },
        elevation: 4,
    },

    buttonText: {
        color: COLORS.white,
        fontSize: 18,
        fontWeight: "600",
    },
});

export default styles;