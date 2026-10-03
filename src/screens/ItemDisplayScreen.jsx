import { View, Text, Image, ScrollView, Pressable } from "react-native";

import styles from "../styles/ItemDisplayStyles";

export default function ItemDisplayScreen({ route }) {

    const {matches} = route.params; //matches is an array of all items

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Pressable
                    style={styles.backButton}
                    onPress={() => navigation.goBack()}
                >
                    <Text style={styles.backButtonText}>
                        ← Back
                    </Text>
                </Pressable>

                <Text style={styles.headerTitle}>
                    Possible Matches
                </Text>
            </View>

            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.content}
            >
                <Text style={styles.subtitle}>
                    We found {matches.length} item {matches.length !== 1 ? "s" : ""} that may match what you're looking for.
                </Text>

                {matches.length === 0 ? (
                    //No matches
                    <View style={styles.noMatchesContainer}>
                        <Text style={styles.noMatchesTitle}>
                            No matches found
                        </Text>

                        <Text style={styles.noMatchesText}>
                            We couldn't find any items that closely
                            match your description.
                        </Text>
                    </View>

                ) : (
                    matches.map((match) => {

                        const imageUrl =
                            `https://richness-rundown-postbox.ngrok-free.dev/uploads/images/${match.image}`;


                        return (

                            <View
                                key={match.item_id}
                                style={styles.card}
                            >

                                {/* LEFT: IMAGE */}
                                <View style={styles.imageContainer}>

                                    <Image
                                        source={{
                                            uri: imageUrl,
                                        }}
                                        style={styles.image}
                                        resizeMode="cover"
                                    />

                                </View>


                                {/* RIGHT: DETAILS */}
                                <View style={styles.details}>

                                    {/* Title + percentage */}
                                    <View style={styles.topRow}>

                                        <Text style={styles.possibleMatch}>
                                            Possible Match
                                        </Text>

                                        <Text style={styles.matchPercentage}>
                                            {(match.similarity * 100).toFixed(0)}%
                                        </Text>

                                    </View>


                                    {/* Location */}
                                    <View style={styles.infoRow}>

                                        <Text style={styles.icon}>
                                            📍
                                        </Text>

                                        <Text style={styles.infoText}>
                                            {match.location}
                                        </Text>

                                    </View>


                                    {/* Date */}
                                    {match.date_found && (
                                        <View style={styles.infoRow}>

                                            <Text style={styles.icon}>
                                                📅
                                            </Text>

                                            <Text style={styles.infoText}>
                                                Found on {match.date_found}
                                            </Text>

                                        </View>
                                    )}


                                    {/* Claim button */}
                                    <Pressable
                                        style={({ pressed }) => [
                                            styles.claimButton,
                                            pressed &&
                                                styles.claimButtonPressed,
                                        ]}
                                        onPress={() => {
                                            console.log(
                                                "Claiming item:",
                                                match.item_id
                                            );
                                        }}
                                    >

                                        <Text style={styles.claimButtonText}>
                                            Claim Item
                                        </Text>

                                    </Pressable>

                                </View>

                            </View>

                        );
                    })
                
                )}

    
            </ScrollView>


        </View>
    );

}



