//this code creates the navigation system for the app. think of it like a map that controls which
//screen the user sees and how they move between screens

import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack"; //a stack works like a pile of cards, where e/ card is a screen

import HomeScreen from "../screens/HomeScreen";
import ReportFoundScreen from "../screens/ReportFoundScreen";
import ReportLostScreen from "../screens/ReportLostScreen";

const Stack = createNativeStackNavigator(); //creating stack of screens

export default function AppNavigator() { //will later to be used in App.js to open other screens
    return ( 
        <NavigationContainer> 
            <Stack.Navigator initialRouteName="Home"> 

                <Stack.Screen 
                    name="Home"
                    component={HomeScreen}  //connecting it to HomeScreen.js            
                />

                <Stack.Screen 
                    name="ReportFound"
                    component={ReportFoundScreen}
                />

                <Stack.Screen 
                    name="ReportLost"
                    component={ReportLostScreen}
                />

            </Stack.Navigator>
        </NavigationContainer>
    );
}