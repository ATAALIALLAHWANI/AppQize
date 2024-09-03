import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import styles from '../data/styles';
import colors from '../data/colors';

const QuizComponent = ({ questions, currentQuestion, selectedOption, setSelectedOption, handleAnswer, handleNextStep, completed }) => {
    return (
        <View style={styles.questionContainer}>
            {/* Conditionally render the question and options only if the quiz is not completed */}
            {!completed && (
                <>
                    <Text style={styles.questionText}>{questions[currentQuestion].question}</Text>
                    {questions[currentQuestion].options.map((option, index) => (
                        <TouchableOpacity
                            key={index}
                            style={[
                                styles.optionContainer,
                                selectedOption === option && styles.selectedOption
                            ]}
                            onPress={() => setSelectedOption(option)}
                        >
                            <Text style={styles.optionText}>
                                {selectedOption === option ? '• ' : '◦ '}
                                {option}
                            </Text>
                        </TouchableOpacity>
                    ))}

                    {/* Next button to move to the next question */}
                    <TouchableOpacity onPress={handleAnswer} style={styles.nextButtonContainer}>
                        <Text style={styles.nextButton}>Next</Text>
                    </TouchableOpacity>
                </>
            )}

            {/* Display the completed message and next step button if the quiz is completed */}
            {completed && (
                <View style={styles.completedContainer}>
                    <FontAwesome name="heart" size={50} color={colors.icon} />
                    <Text style={styles.completedText}>Congratulations!</Text>
                    <Text style={styles.completedText}>You've completed the quiz.</Text>
                    <TouchableOpacity onPress={handleNextStep} style={styles.nextStepButtonContainer}>
                        <Text style={styles.nextStepButton}>Next Step</Text>
                    </TouchableOpacity>
                </View>
            )}
        </View>
    );
};

export default QuizComponent;
