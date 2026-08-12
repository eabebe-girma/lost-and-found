import { useState } from "react";
import { View, TextInput, FlatList, TouchableOpacity, Text, StyleSheet } from "react-native";
import styles from "../styles/DropdownStyles";

export default function Dropdown( {
        options, placeholder, onSelect, //prompts that'll be supplied by parent screen
    }) {

    //The dropdown should remember 3 things. 
    //Notice: text, filteredOPtions, and showDropdown belong to the dropdown because theyre about how it dbehvaes.
            //On the other hand, which location is chosen by the user belongs in ReportFoundScreen

    const [text, setText] = useState("");
    const [filteredOptions, setFilteredOptions] = useState(options); //filtered based on what teh user types in
    const [showDropdown, setShowDropdown] = useState(false);

    const handleSearch = (value) => {
        setText(value);

        const filtered = options.filter( (option) =>
            option.toLowerCase().includes(value.toLowerCase())
        );

        setFilteredOptions(filtered);
        setShowDropdown(true);
    };

    const handleSelect = (item) => {
        setText(item);
        setShowDropdown(false);
        onSelect(item);
    };

    return (
        <View>
            <TextInput
                placeholder={placeholder}
                value={text}
                onChangeText={handleSearch}
                onFocus={() => setShowDropdown(true)}
                style={styles.input}
            />

            {showDropdown && (
                <View style={styles.dropdownContainer}>
                    <FlatList
                        data={filteredOptions}
                        keyExtractor={(item) => item}
                        keyboardShouldPersistTaps="handled"
                        style={styles.input}
                        renderItem={({ item }) => (
                            <TouchableOpacity
                            onPress={() => handleSelect(item)}
                            style={styles.option}
                            >
                                <Text>{item}</Text>
                            </TouchableOpacity>
                        )}
                        keyboardShouldPersistTaps="handled"
                    />
                </View>
            )}
        </View>
    );


}

