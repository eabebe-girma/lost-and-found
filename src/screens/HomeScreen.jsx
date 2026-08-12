import { Pressable, Text, View } from "react-native";
import * as ImagePicker from "expo-image-picker"; //importing everything in library into an obj called ImagePicker

import styles from "../styles/HomeScreenStyles";


export default function HomeScreen( {navigation} ) {
    
    const openCamera = async () => {
        //async becasue app has to ask persmission, wait for  user, then wait for picture
        //so Javascript must wait for the takss to finish

        const permission = await ImagePicker.requestCameraPermissionsAsync();
        //app will pause until user answer, and then store that in permission (which is a boolean)

        if (!permission.granted) { //user presses "Don't allow"
            alert("Camera permission is required");
            return;
        }

        const result = await ImagePicker.launchCameraAsync({ //result stores the picture taken
            mediaTypes: ["images"],
            quality: 0.8,
        });

        if (result.canceled) {
            return;
        }

        const photoUri = result.assets[0].uri;

        navigation.navigate("ReportFound", { //sending data to other screen
            photoUri: result.assets[0].uri, //passing an obj w pic to the next screen
        });
    }

    return (
        <View style={styles.container}>

            <Text style={styles.title}>
                Campus Lost & Found
            </Text>

            <Pressable style={styles.button} onPress={openCamera}> 
                <Text style={styles.buttonText}>
                    Report Found
                </Text>
            </Pressable>

            <Pressable style={styles.button} onPress={() => navigation.navigate("ReportLost")}>
                <Text style={styles.buttonText}>
                    Report Lost
                </Text>
            </Pressable>

        </View>
 
    );
}