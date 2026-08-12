import { View, Text, Pressable, TextInput, ScrollView, Keyboard} from "react-native";
import { useState } from "react";

import styles from "../styles/ReportLostStyles";
import lostQuestions from "../data/LostQuestions"; //importing array of question objects
import Dropdown from "../components/Dropdown";
import CheckboxList from "../components/CheckboxList";
//import navigation

export default function ReportLostScreen( {navigation} ) {
   
    const [ currentQuestionIndex, setCurrentQuestionIndex ] = useState(0); //keeps track of which question app is on
    const [ answers, setAnswer ] = useState({}); //stores answer

    const currentQuestion = lostQuestions[currentQuestionIndex]; //contains location obj
    const currentAnswer = answers[currentQuestion.key];

    const handleNext = () => {
        if (currentQuestionIndex < lostQuestions.length - 1) { //if not on last question, go the next one
            setCurrentQuestionIndex(currentQuestionIndex + 1);
        }
    }
   
    const handleBack = () => {
        if (currentQuestionIndex > 0) {
            setCurrentQuestionIndex(currentQuestionIndex - 1)

        } else {
            navigation.goBack(); //if already on question 1, leave questionnaire
        }
    }

    const progress = ( (currentQuestionIndex + 1) / lostQuestions.length * 100 );

    const saveAnswer = (value) => {
        setAnswer({
            ...answers,
            [currentQuestion.key]: value,
        });
    };

    return (
        <View style={styles.container}>
            
            <View style={styles.header}>
                <Pressable onPress={handleBack}>
                    <Text>
                        ← Back
                    </Text>
                </Pressable>

                <Text>
                    Question {currentQuestionIndex + 1} of 4
                </Text>
                

                <View style={styles.progressBar}>
                    <View style={[ styles.progressFill, {width: `${progress}%`} ]}>

                    </View>
                </View>

            </View>

            <View style={styles.content}>

                <Text style={styles.question}>
                    {currentQuestion.question} {/* extracting and displaying question attribute in object */}
                </Text>


                <View>
                    {currentQuestion.type === "dropdown" && ( 
                        <Dropdown 
                            options={currentQuestion.options} 
                            placeholder="Search.." 
                            onSelect={saveAnswer} /> 
                    )}
                    
                    {currentQuestion.type === "textbox" && (
                        <TextInput 
                            placeholder={currentQuestion.example}
                            placeholderTextColor = {"#8b8f97"}
                            value={answers[currentQuestion.key] || ""}
                            onChangeText={saveAnswer}
                            style={styles.inputBox}
                            multiline 
                            blurOnSubmit={true}
                            onSubmitEditing={Keyboard.dismiss}
                        />
                    )}
                    
                    {currentQuestion.type === "checkbox" && (
                        <CheckboxList
                            options={currentQuestion.options}
                            selectedValue={answers[currentQuestion.key]}
                            onSelect={saveAnswer}
                        />
                    )}
                </View>

            </View>


            <View style={styles.footer}>
                <Pressable style={styles.nextButton} onPress={handleNext} disabled={!currentAnswer}> {/* disabled makes button not work if report is incomplete*/}
                    <Text style={styles.buttonText}>
                        {currentQuestion.id === lostQuestions.length ? "Search Matches" : "Next →"}
                    </Text>
                </Pressable>
            </View>


        </View>
   );
   
}

