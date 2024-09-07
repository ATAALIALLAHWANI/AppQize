import React, { useContext, useEffect, useState } from 'react';
import { Text, View, ScrollView, TouchableOpacity, Button, FlatList, StyleSheet } from 'react-native';
import { useRoute } from '@react-navigation/native';
import axios from 'axios';
import { Config } from '../apiService';
import styles2 from '../data/style2'; // Import your styles and colors
import colors from '../data/colors';
import { useNavigation } from '@react-navigation/native';
import { UserContext } from '../Context/UserContext';
import LoadingOverlay from '../components/LoadingOverlay';
function Question() {
    const navigation = useNavigation();
    const route = useRoute();
    const { category } = route.params; // Access the passed category
    const [data, setData] = useState(null); // Initialize data state
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [selectedOption, setSelectedOption] = useState(null);
    const [completed, setCompleted] = useState(false);
    const [correctAnswers, setCorrectAnswers] = useState(0);
    const [count, setCount] = useState(0);
    const [isLoading, setIsLoading] = useState(false); // State to show/hide the loading spinner

    const { id } = useContext(UserContext);
    useEffect(() => {
        const fetchQuestions = async () => {
            try {
                const response = await axios.get(`${Config.API_URL1}question/category/${category}`);
                if (response.status === 200) {
                    const allQuestions = response.data;
                    const shuffledQuestions = shuffleArray(allQuestions);
                    const selectedQuestions = shuffledQuestions.slice(0, 10);
                    setData(selectedQuestions);
                }
            } catch (error) {
                console.error('Error fetching questions:', error);
            }
        };

        fetchQuestions();
    }, [category]);

    const shuffleArray = (array) => {
        let shuffled = array.slice();
        for (let i = shuffled.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
        }
        return shuffled;
    };

    const handleAnswer = (selectedOption) => {
        setCount(count + 1);
        console.log(count)
        if (data[currentQuestion].rightAnswer === selectedOption) {
            setCorrectAnswers((prev) => prev + 1);
        }
        setCurrentQuestion((prev) => {
            if (prev === data.length - 1) {
                setCompleted(true);
                return prev;
            }
            return prev + 1;
        });
        setSelectedOption(null); // Reset selected option for next question
    };

    if (!data) {
        return <Text>Loading...</Text>;
    }

    const totalQuestions = data.length;
    const progress = totalQuestions > 0 ? (correctAnswers / totalQuestions) : 0;

    const getCurrentDate = () => {
        const date = new Date();


        const year = date.getFullYear().toString().slice(-2); // Get the last two digits of the year
        const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Months are zero-based, so add 1 and pad with leading zero
        const day = date.getDate().toString().padStart(2, '0'); // Pad the day with a leading zero

        return `${year}-${month}-${day}`;
    };

    const currentDate = getCurrentDate();

    const handlePress = async () => {
        console.log("id = ", id)
        const currentDate = getCurrentDate(); // Ensure this function returns the date in the format you need
        setIsLoading(true); // Show loading spinner

        try {
            const response = await axios.post(`${Config.API_URL1}statistice`, { // Corrected URL format
                result: correctAnswers,
                field: category, // Assuming 'category' is a valid field in your data
                date: currentDate.toString(), // Convert date to string if needed
                idUser: id
            });

            if (response.status === 200) {
                console.log("Successfully posted statistics, navigating to Statistics screen");
                navigation.navigate('Statistics'); // Navigate only if the response is successful
            }

        } catch (error) {
            console.error("Error posting data:", error.message); // Descriptive error message
        } finally {
            setIsLoading(false);
        }


    };



    return (
        <ScrollView contentContainerStyle={styles2.container}>

            <View style={styles2.questionContainer}>
                {!completed ? (
                    <>
                        <View style={styles.progressContainer}>
                            <Text style={styles.progressText}>{`${count}/${totalQuestions}`}</Text>
                        </View>
                        <Text style={styles2.questionText}>{data[currentQuestion].questionTitle}</Text>
                        {[
                            data[currentQuestion].option1,
                            data[currentQuestion].option2,
                            data[currentQuestion].option3,
                            data[currentQuestion].option4
                        ].map((option, index) => (
                            <TouchableOpacity
                                key={index}
                                style={[
                                    styles2.optionContainer,
                                    selectedOption === option && styles2.selectedOption
                                ]}
                                onPress={() => setSelectedOption(option)}
                            >
                                <Text style={styles2.text}>{option}</Text>
                            </TouchableOpacity>
                        ))}
                        <View style={styles2.buttonContainer}>
                            <View style={styles2.button}>
                                <Button
                                    title="Next"
                                    onPress={() => handleAnswer(selectedOption)}
                                    color={colors.primary}
                                />
                            </View>
                        </View>
                    </>
                ) : (
                    <View style={styles.container}>
                        <View style={styles.questionContainer}>
                            <Text style={styles2.text}>Congratulations!</Text>
                            <Text style={styles2.text}>You've completed this quiz.</Text>
                            <View style={styles.progressContainer}>
                                <View style={styles.progressBarBackground}>
                                    <View
                                        style={[
                                            styles.progressBar,
                                            {
                                                width: `${progress * 100}%`,
                                            }
                                        ]}
                                    />
                                </View>
                                <Text style={styles.progressText}>{`${correctAnswers}/${totalQuestions}`}</Text>
                            </View>
                        </View>
                        <View>
                            <Button title='Show Statistics ' color={colors.primary} onPress={handlePress} />
                        </View>
                        <LoadingOverlay isVisible={isLoading} />

                    </View>



                )}
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        padding: 16,
    },
    questionContainer: {
        marginBottom: 20,
    },

    progressContainer: {
        alignItems: 'center',
        marginVertical: 20,
    },
    progressBarBackground: {
        width: '100%',
        height: 20,
        backgroundColor: '#eee',
        borderRadius: 10,
        marginBottom: 10,
    },
    progressBar: {
        height: '100%',
        backgroundColor: colors.primary,
        borderRadius: 10,
    },
    progressText: {
        fontSize: 18,
        fontWeight: 'bold',
    },
});


export default Question;
