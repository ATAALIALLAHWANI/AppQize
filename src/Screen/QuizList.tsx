import React from 'react';
import { View, Text, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
import { FontAwesome5, MaterialCommunityIcons, AntDesign, Feather, Ionicons } from '@expo/vector-icons';
import colors from '../data/colors'; // Assuming you have a colors file for your theme
import { useNavigation } from '@react-navigation/native';
import quizData from '../data/QuzeData';

const { width } = Dimensions.get('window');
const scale = (size) => (width / 375) * size;

function QuizList() {

    const navigation = useNavigation();

    const handlePress = (category) => {

        console.log(category);
        navigation.navigate('Question', { category });
    };

    return (
        <View style={styles.container}>
            {quizData.map((quiz, index) => (
                <TouchableOpacity
                    key={index}
                    onPress={() => handlePress(quiz.name)}
                    style={styles.touchable}
                    activeOpacity={0.7} // Adjust the opacity level when pressed
                >
                    <View style={[styles.quizItem, { backgroundColor: quiz.color }]}>
                        <View style={styles.iconContainer}>{quiz.icon}</View>
                        <Text style={styles.quizText}>{quiz.name}</Text>
                    </View>
                </TouchableOpacity>
            ))}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.backgroundScreen,
        justifyContent: 'center',
        alignItems: 'center',
    },
    touchable: {
        width: '100%', // Make the TouchableOpacity take up the full width
        justifyContent: 'center',
        alignItems: 'center',
    },
    quizItem: {
        flexDirection: 'row',
        alignItems: 'center',
        width: '80%',
        padding: scale(15),
        borderRadius: scale(10),
        marginBottom: scale(15),
        // You can add a shadow here if needed
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: scale(10),
        elevation: 3,
    },
    iconContainer: {
        width: scale(40),
        height: scale(40),
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: scale(20),
    },
    quizText: {
        fontSize: scale(18),
        color: colors.text,
        fontWeight: 'bold',
    },
});

export default QuizList;
