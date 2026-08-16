import {
    Pressable,
    Text,
    View,
    Image,
    KeyboardAvoidingView,
    Platform,
    ScrollView,
} from "react-native";
import { useState } from "react";

import Dropdown from "../components/Dropdown";
import styles from "../styles/ReportFoundStyles";

export default function ReportFoundScreen({ navigation, route }) {
    const { photoUri } = route.params; 
    const [selectedLocation, setSelectedLocation] = useState("");

    const locations = [
        "Butler Library",
        "Lerner Hall",
        "Pupin Hall",
        "Northwest Corner",
        "Dodge Hall",
        "John Jay Hall",
        "Carman Hall",
        "Hamilton Hall",
        "Low Library",
        "Mudd Building",
    ];

    const handleSubmit = async () => {
        if (!photoUri) {
            alert("Please take a picture first!");
            return;
        }

        //FormData is container to hold image and location that's going to be sent from frontend --> backend
        const formData = new FormData(); 

        formData.append( "image", { //"image" needs to match what Python endppint expect (parameter in function)
            uri: photoUri,
            name: "found-item.jpg",
            type: "image/jpeg",
        });

        formData.append( "location", selectedLocation);

        //fetch() is saying send a request to this address
        try {

            const response = await fetch( //where backend actually contacts Python server 
                "https://richness-rundown-postbox.ngrok-free.dev/report-found", //address
                { //package containing iamge and location
                    method: "POST",
                    body: formData,
                }
            ); //fetch() will return a Promise that we later resolve to a Reponse obj
            

            const data = await response.json(); //.json() is reading data and turning into usable programming object
            console.log(data);
            

        } catch(error) {
            console.error(error);
            alert("Something went wrong.");
        }
    };

    return (
        <KeyboardAvoidingView
            style={{ flex: 1 }}
            behavior={Platform.OS === "ios" ? "padding" : "height"}
        >
            <ScrollView
                contentContainerStyle={{
                    flexGrow: 1,
                    paddingBottom: 250,
                }}
                keyboardShouldPersistTaps="handled"
                keyboardDismissMode="interactive"
                showsVerticalScrollIndicator={false}
            >
                <View style={styles.container}>

                    <View style={styles.content}>

                        <Text style={styles.title}>
                            Report Found
                        </Text>

                        <Text style={styles.subtitle}>
                            Take a clear picture of the item in bright lighting.
                        </Text>

                        <View style={styles.imageContainer}>
                            <Image
                                source={{ uri: photoUri }} //uri is like the iamge address
                                style={styles.photo}
                            />
                        </View>

                        <Text style={styles.question}>
                            Where did you find it?
                        </Text>

                        <Dropdown
                            options={locations}
                            placeholder="Search for a location..."
                            onSelect={setSelectedLocation}
                        />

                    </View>

                    <View style={styles.bottomSection}>

                        {selectedLocation !== "" && (
                            <Text style={styles.selectedLocation}>
                                Selected: {selectedLocation}
                            </Text>
                        )}

                        <Pressable
                            style={({ pressed }) => [
                                styles.button,
                                {
                                    backgroundColor: pressed
                                        ? "#0F766E"
                                        : "#115E59",
                                },
                            ]}
                            onPress={handleSubmit}
                        >
                            <Text style={styles.buttonText}>
                                Submit
                            </Text>
                        </Pressable>

                    </View>

                </View>
            </ScrollView>
        </KeyboardAvoidingView>
    );
}