import React from 'react';
import { ScrollView, View, Text, TouchableOpacity, Button, StyleSheet } from 'react-native';
import styles2 from '../data/style2';  // Assuming you have your styles in this path
import colors from '../data/colors';
import LoadingOverlay from './LoadingOverlay'; // Assuming you have this component

const QuestionComponent = ({ data, totalQuestions, currentQuestion, selectedOption, setSelectedOption, handleAnswer, completed, correctAnswers, handlePress, isLoading }) => {
    const count = currentQuestion + 1; // Question count
    const progress = correctAnswers / totalQuestions; // Calculate progress percentage

    return (
        <ScrollView contentContainerStyle={styles2.container}>
            <View style={styles2.questionContainer}>
                {!completed ? (
                    <>
                        <View style={styles.progressContainer}>
                            <Text style={styles.progressText}>{`${count}/${totalQuestions}`}</Text>
                        </View>
                        <Text style={styles2.questionText}>{data[currentQuestion].questionTitle}</Text>
                        {[data[currentQuestion].option1, data[currentQuestion].option2, data[currentQuestion].option3, data[currentQuestion].option4].map((option, index) => (
                            <TouchableOpacity
                                key={index}
                                style={[styles2.optionContainer, selectedOption === option && styles2.selectedOption]}
                                onPress={() => setSelectedOption(option)}
                            >
                                <Text style={styles2.text}>{option}</Text>
                            </TouchableOpacity>
                        ))}
                        <View style={styles2.buttonContainer}>
                            <View style={styles2.button}>
                                <Button title="Next" onPress={handleAnswer} color={colors.primary} />
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
                                    <View style={[styles.progressBar, { width: `${(progress * 100).toFixed(0)}%` }]} />
                                </View>
                                <Text>{`${correctAnswers}/${totalQuestions} correct answers`}</Text>
                            </View>
                        </View>
                        <View>
                            <Button title='Show Statistics' color={colors.primary} onPress={handlePress} disabled={isLoading} />
                        </View>
                        <LoadingOverlay isVisible={isLoading} />
                    </View>
                )}
            </View>
        </ScrollView>
    );
};

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

export default QuestionComponent;
