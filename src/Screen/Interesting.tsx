import React, { useState, useContext } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Dimensions, PixelRatio, Button } from 'react-native';
import { AntDesign, MaterialIcons, FontAwesome } from '@expo/vector-icons';
import axios from 'axios';
import styles2 from '../data/style2'; // Import the styles
import colors from '../data/colors'; // Import the colors
import { Config } from '../apiService'; // Adjust the path as needed
import { UserContext } from '../Context/UserContext';
import { useNavigation } from '@react-navigation/native';

const Interesting = () => {
    const navigation = useNavigation();

    const { username, email, password } = useContext(UserContext); // Access username and email from the context
    const [progress, setProgress] = React.useState(0); // Start progress at 0
    const [selectedOption, setSelectedOption] = React.useState(null);
    const [currentQuestion, setCurrentQuestion] = React.useState(0);
    const [completed, setCompleted] = React.useState(false);

    // State variables to hold selected options
    const [option1, setOption1] = React.useState(null);
    const [option2, setOption2] = React.useState(null);
    const [option3, setOption3] = React.useState(null);

    const questions = [
        {
            question: "What programming languages are you interested in?",
            options: ["JavaScript", "Python", "Java", "C#"]
        },
        {
            question: "What frameworks or libraries do you prefer?",
            options: ["React", "Angular", "Vue", "Spring"]
        },
        {
            question: "What types of projects do you enjoy working on?",
            options: ["Web Development", "Mobile Apps", "Data Science", "Game Development"]
        }
    ];

    const handleAnswer = () => {
        if (completed) return; // Don't do anything if already completed

        // Save the selected option based on the current question
        switch (currentQuestion) {
            case 0:
                setOption1(selectedOption);
                break;
            case 1:
                setOption2(selectedOption);
                break;
            case 2:
                setOption3(selectedOption);
                break;
            default:
                break;
        }

        // Increase progress
        setProgress(prev => {
            const newProgress = Math.min(prev + 1 / questions.length, 1);
            if (newProgress === 1) {
                setCompleted(true); // Mark as completed if progress is 100%
            }
            return newProgress;
        });

        // Move to next question
        setCurrentQuestion(prev => (prev + 1) % questions.length);
        setSelectedOption(null); // Reset selected option
    };

    const handleNextStep = async () => {
        try {
            const data = {
                username: username,
                email: email,
                password: password,
                programmingLanguages: option1,
                frameworksAndLibraries: option2,
                favoriteProjects: option3,
            };

            const response = await axios.post(`${Config.API_URL1}profile`, data);

            if (response.status === 201) {
                // Navigate to the next screen after successful API call
                navigation.reset({
                    index: 1, // Focus on the second tab, which is 'Home'
                    routes: [{ name: 'HomeTabs', params: { screen: 'Home' } }],
                });
            } else {
                console.error('Failed to save profile data:', response.status);
            }
        } catch (error) {
            console.error('Error while saving profile data:', error.message);
        }
    };
    return (
        <ScrollView contentContainerStyle={styles2.container}>


            <View style={styles2.questionContainer}>
                {!completed && (
                    <>
                        <Text style={styles2.questionText}>{questions[currentQuestion].question}</Text>
                        {questions[currentQuestion].options.map((option, index) => (
                            <TouchableOpacity
                                key={index}
                                style={[
                                    styles2.optionContainer,
                                    selectedOption === option && styles2.selectedOption
                                ]}
                                onPress={() => setSelectedOption(option)}
                            >
                                <Text style={styles2.text}>
                                    {option}
                                </Text>
                            </TouchableOpacity>
                        ))}
                        <View style={styles2.buttonContainer}>
                            <View style={styles2.button}>
                                <Button title="Next" onPress={handleAnswer} color={colors.primary} />
                            </View>
                        </View>
                    </>
                )}

                {completed && (
                    <View style={styles2.questionContainer}>
                        <FontAwesome name="heart" size={50} color={colors.icon} />
                        <Text style={styles2.text}>Congratulations!</Text>
                        <Text style={styles2.text}>You've completed this</Text>
                        <View style={styles2.buttonContainer}>
                            <View style={styles2.button}>
                                <Button title="Next Step" onPress={handleNextStep} color={colors.primary} />
                            </View>
                        </View>
                    </View>
                )}
            </View>

        </ScrollView>
    );
};
export default Interesting;
