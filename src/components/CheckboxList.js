import { View, Text, Pressable, ScrollView} from "react-native";
import styles from "../styles/CheckboxListStyles";

export default function CheckboxList( {
    options, selectedValue, onSelect,
}) {

    return(
        <View>
            <ScrollView
                style={styles.container}
                showsVerticalScrollIndicator={true}
            >
                {options.map((option) => ( //looping through each item in array and creating a Pressable for it
                    <Pressable 
                        style={[ //syntax basically says, always use styles.optoin and if selected, use styles.selectedoption too
                            styles.option,
                            selectedValue === option && 
                                styles.selectedOption,
                        ]}
                        key={option} 
                        onPress={() => onSelect(option)}> 
                            <Text style={styles.optionText}> 
                                {selectedValue === option ? "☑" : "☐"} {option}
                            </Text>
                    </Pressable>
                ))}
            </ScrollView>
        </View>
    );

}