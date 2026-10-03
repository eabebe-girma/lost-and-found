import { StyleSheet } from "react-native";

const styles = StyleSheet.create({

    // Entire screen
    container: {
        flex: 1,
        backgroundColor: "#F8FAFA",
    },

    // Header
    header: {
        backgroundColor: "#115E59",
        paddingTop: 55,
        paddingBottom: 20,
        paddingHorizontal: 20,
        flexDirection: "row",
        alignItems: "center",
    },

    backButton: {
        width: 40,
        height: 40,
        justifyContent: "center",
        alignItems: "center",
        marginRight: 10,
    },

    backButtonText: {
        color: "#FFFFFF",
        fontSize: 32,
        fontWeight: "300",
    },

    headerTitle: {
        flex: 1,
        color: "#FFFFFF",
        fontSize: 27,
        fontWeight: "700",
    },

    // Main content
    content: {
        padding: 18,
        paddingBottom: 40,
    },

    subtitle: {
        fontSize: 16,
        color: "#64748B",
        lineHeight: 23,
        marginBottom: 20,
    },

    // Individual match card
    card: {
        backgroundColor: "#FFFFFF",
        borderRadius: 18,
        marginBottom: 18,
        overflow: "hidden",

        flexDirection: "row",

        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.08,
        shadowRadius: 8,

        elevation: 3,
    },

    // Image on left
    imageContainer: {
        width: "43%",
        minHeight: 210,
        backgroundColor: "#E2E8F0",
    },

    image: {
        width: "100%",
        height: "100%",
    },

    // Information on right
    details: {
        flex: 1,
        padding: 14,
        justifyContent: "space-between",
    },

    topRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "flex-start",
        marginBottom: 10,
    },

    possibleMatch: {
        flex: 1,
        fontSize: 17,
        fontWeight: "700",
        color: "#1E293B",
        marginRight: 6,
    },

    // Orange percentage badge
    matchPercentage: {
        fontSize: 13,
        fontWeight: "700",
        color: "#EA580C",
        backgroundColor: "#FFF7ED",
        paddingHorizontal: 8,
        paddingVertical: 6,
        borderRadius: 14,
    },

    // Location
    infoRow: {
        flexDirection: "row",
        alignItems: "flex-start",
        marginBottom: 8,
    },

    icon: {
        fontSize: 15,
        marginRight: 6,
    },

    infoText: {
        flex: 1,
        fontSize: 14,
        color: "#475569",
        lineHeight: 20,
    },

    // Claim button
    claimButton: {
        backgroundColor: "#115E59",
        borderRadius: 10,
        paddingVertical: 11,
        paddingHorizontal: 8,
        alignItems: "center",
        justifyContent: "center",
        marginTop: 10,
    },

    claimButtonPressed: {
        backgroundColor: "#0F766E",
    },

    claimButtonText: {
        color: "#FFFFFF",
        fontSize: 15,
        fontWeight: "700",
    },

    // No matches
    noMatchesContainer: {
        alignItems: "center",
        marginTop: 60,
        paddingHorizontal: 20,
    },

    noMatchesTitle: {
        fontSize: 20,
        fontWeight: "700",
        color: "#1E293B",
        marginBottom: 8,
    },

    noMatchesText: {
        fontSize: 15,
        color: "#64748B",
        textAlign: "center",
        lineHeight: 22,
    },

});

export default styles;