import React, { useEffect, useState } from 'react';
import { Text, StyleSheet } from 'react-native';
import { useRoute } from '@react-navigation/native';
import axios from 'axios';
import { Config } from '../apiService';
import styles2 from '../data/style2'; // Import your styles and colors
import colors from '../data/colors';
import { useNavigation } from '@react-navigation/native';
import LoadingOverlay from '../components/LoadingOverlay';
import { getToken } from '../type/storeToken';
import QuestionComponent from '../components/QuestionComponent';

function Question() {
    const navigation = useNavigation();
    const route = useRoute();
    const { category } = route.params; // Access the passed category
    const [data, setData] = useState(null); // Initialize data state
    const [isLoading, setIsLoading] = useState(false); // State to show/hide the loading spinner
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [correctAnswers, setCorrectAnswers] = useState(0);
    const [completed, setCompleted] = useState(false);
    const [selectedOption, setSelectedOption] = useState(null);

    // Fetch questions from API
    useEffect(() => {
        const fetchQuestions = async () => {
            setIsLoading(true);
            try {
                const response = await axios.get(`${Config.API_URL1}question/category/${category}`);
                if (response.status === 200) {
                    const shuffledQuestions = shuffleArray(response.data).slice(0, 10);
                    setData(shuffledQuestions);
                }
            } catch (error) {
                console.error('Error fetching questions:', error);
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
        if (data[currentQuestion].rightAnswer === selectedOption) {
            setCorrectAnswers(prev => prev + 1);
        }
        setSelectedOption(null); // Reset selected option for next question
        if (currentQuestion === data.length - 1) {
            setCompleted(true); // Complete the quiz if it's the last question
        } else {
            setCurrentQuestion(prev => prev + 1);
        }
    };

    // Check if data is available
    if (!data) {
        return <Text>Loading...</Text>;
    }

    // Get current date for statistics
    const getCurrentDate = () => {
        const date = new Date();
        const year = date.getFullYear().toString().slice(-2); // Last two digits of the year
        const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Months are zero-based
        const day = date.getDate().toString().padStart(2, '0'); // Pad day with leading zero
        return `${year}-${month}-${day}`;
    };

    const handlePress = async () => {
        let id = await getToken();
        const currentDate = getCurrentDate();
        setIsLoading(true); // Show loading spinner

        try {
            const response = await axios.post(`${Config.API_URL1}statistice`, {
                result: correctAnswers,
                field: category,
                date: currentDate,
                idUser: id
            });

            if (response.status === 200) {
                console.log("Successfully posted statistics, navigating to Statistics screen");
                navigation.navigate('Statistics'); // Navigate only if the response is successful
            }
        } catch (error) {
            console.error("Error posting data:", error.message);
        } finally {
            setIsLoading(false);
        }
    };

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

// Styles can be defined here if needed
const styles = StyleSheet.create({});

export default Question;
