import { View, Text, Image, ScrollView } from "react-native";

import styles from "../styles/ItemDisplayStyles";

export default function ItemDisplayScreen({ route }) {

    const {matches} = route.params; //matches is an array of all items

    return(
        <ScrollView>
            <View>

                <Text style={styles.title}>
                    Possible Matches
                </Text>

                {matches.map((match) => ( //going through e/ match and creating a UI for it
                    <View key={match.item_id}>
                        <Image
                            source={{
                                uri: `https://richness-rundown-postbox.ngrok-free.dev/uploads/images/${match.image}`
                            }}
                            style={{
                                width: 300,
                                hegiht: 300,
                            }}
                        />

                        <Text>
                            Location: {match.location}
                        </Text>

                        <Text>
                            Similarity: {(match.similarity * 100).toFixed(1)}%
                        </Text>
                    </View>
                ))}
            </View>
        </ScrollView>
    );
}