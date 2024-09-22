import React, { useContext, useEffect, useState } from 'react';
import { Text, StyleSheet, View } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import axios from 'axios';
import { Config } from '../apiService';
import LoadingOverlay from '../components/LoadingOverlay';
import { getToken } from '../type/storeToken';
import QuestionComponent from '../components/QuestionComponent';
import { UserContext } from '../Context/UserContext';

const QuestionChallenge = () => {
    const navigation = useNavigation();
    const route = useRoute();
    const category = route.params?.category; // Access the passed category
    const [data, setData] = useState([]); // Initialize data state as an empty array
    const [isLoading, setIsLoading] = useState(false); // State to show/hide the loading spinner
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [correctAnswers, setCorrectAnswers] = useState(0);
    const [completed, setCompleted] = useState(false);
    const [selectedOption, setSelectedOption] = useState(null);

    const { challengeId } = useContext(UserContext);

    // Fetch questions from API
    useEffect(() => {
        const fetchQuestions = async () => {
            setIsLoading(true);
            try {
                console.log("Category  ", category);
                const response = await axios.get(`${Config.API_URL1}question/category/${category}`);
                if (response.status === 200 && response.data.length > 0) {
                    const shuffledQuestions = shuffleArray(response.data).slice(0, 10); // Shuffle and slice the questions
                    setData(shuffledQuestions);
                } else {
                    setData([]); // If no data or empty response, set data to empty array
                }
            } catch (error) {
                console.error('Error fetching questions:', error);
                setData([]); // Set data to empty array on error
            } finally {
                setIsLoading(false);
            }
        };

        fetchQuestions();
    }, [category]);

    // Shuffle questions
    const shuffleArray = (array) => {
        let shuffled = array.slice();
        for (let i = shuffled.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
        }
        return shuffled;
    };

    // Handle answer selection
    const handleAnswer = () => {
        if (data[currentQuestion] && data[currentQuestion].rightAnswer === selectedOption) {
            setCorrectAnswers(prev => prev + 1);
        }
        setSelectedOption(null); // Reset selected option for the next question
        if (currentQuestion === data.length - 1) {
            setCompleted(true); // Complete the quiz if it's the last question
        } else {
            setCurrentQuestion(prev => prev + 1);
        }
    };

    // Get current date for statistics
    const getCurrentDate = () => {
        const date = new Date();
        const year = date.getFullYear().toString().slice(-2); // Last two digits of the year
        const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Months are zero-based
        const day = date.getDate().toString().padStart(2, '0'); // Pad day with leading zero
        return `${year}-${month}-${day}`;
    };

    const handlePress = async () => {
        let participan = await getToken();
        const participantId = parseInt(participan); // Convert participantId to an integer
        const score = parseInt(correctAnswers);  // Convert score to an integer
        const status = "ACCEPTED"; // Set the status to ACCEPTED
        setIsLoading(true); // Show loading indicator
        console.log(participantId);

        try {
            const response = await axios.post(`${Config.API_URL1}challenges/${challengeId}/result`, {
                participantId: participantId,  // These are part of the body, not params
                score: score,
                status: status
            });

            if (response.status === 200) {
                navigation.navigate('Statistics'); // Navigate to Statistics if the request is successful
            }
        } catch (error) {
            console.error("Error posting data:", error.message);
        } finally {
            setIsLoading(false); // Hide loading indicator
        }
    };


    // Check if data is loading
    if (isLoading) {
        return <LoadingOverlay isVisible={true} />;
    }

    // If no questions are available
    if (!data || data.length === 0) {
        return <Text>No questions available for this category.</Text>;
    }

    return (
        <QuestionComponent
            data={data}
            totalQuestions={data.length}
            currentQuestion={currentQuestion}
            selectedOption={selectedOption}
            setSelectedOption={setSelectedOption}
            handleAnswer={handleAnswer}
            completed={completed}
            correctAnswers={correctAnswers}
            handlePress={handlePress}
            isLoading={isLoading}
        />
    );
}

export default QuestionChallenge;
