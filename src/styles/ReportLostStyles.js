import { StyleSheet } from "react-native";
import COLORS from "../constants/colors";

const styles = StyleSheet.create( {
    container: {
        flex: 1,
        backgroundColor: "COLORS.background",
        padding: 25,
    },

    header: {
        marginTop: 40,
    },

    content: {
        flex: 1,
    },

    inputBox: {
        height: 100,
        borderWidth: 2,
        borderRadius: 10,
        paddingHorizontal: 15,
        //fontSize: 16,
        backgroundColor: '#ffffff',  
        borderColor: "#0F766E",     
        color: '#1f2937',
    },

    footer: {
        alignItems: "flex-end",
        paddingBottom: 20,
    },

    progressBar: {
        height: 8,
        backgroundColor: "#E2E8F0",
        borderRadius: 10,
        marginTop: 12,
    },

    progressFill: {
        //width: "20%", later will be calculated according to which question the use is on
        height: "100%",
        backgroundColor: "#0F766E",
        borderRadius: 10,
    },

    question: {
        fontSize: 28,
        fontWeight: "600",
        color: "#1E293B",
        marginBottom: 30,
    },

    nextButton: {
        backgroundColor: "#0F766E",
        paddingVertical: 14,
        paddingHorizontal: 28,
        borderRadius: 12,
    },

    nextText: {
        color: "white",
        fontSize: 16,
        fontWeight: "600",
    },

})

export default styles;

