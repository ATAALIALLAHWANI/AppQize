import React from 'react';
import { View, Text, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
import { FontAwesome5, MaterialCommunityIcons, AntDesign, Feather, Ionicons } from '@expo/vector-icons';
import colors from '../data/colors'; // Assuming you have a colors file for your theme
import { useNavigation } from '@react-navigation/native';

const { width } = Dimensions.get('window');
const scale = (size) => (width / 375) * size;

function QuizList() {
    const quizData = [
        {
            name: 'Syntax Mastery',
            icon: <FontAwesome5 name="code" size={18} color={colors.icon} />,
            color: '#F0C7A5', // Darkened from #FFDEB4
        },
        {

            name: 'Data Structures',
            icon: <MaterialCommunityIcons name="database-outline" size={18} color={colors.icon} />,
            color: '#F0A6A0', // Darkened from #FECACA
        },
        {
            name: 'Algorithms Complexity',
            icon: <AntDesign name="setting" size={18} color={colors.icon} />,
            color: '#8DA5E4', // Darkened from #A5C8FF
        },
        {
            name: 'Cloud Computing',
            icon: <Feather name="cloud" size={18} color={colors.icon} />,
            color: '#8AB9D5', // Darkened from #B4E4FF
        },
        {
            name: 'Problem Solving',
            icon: <Ionicons name="bulb-outline" size={18} color={colors.icon} />,
            color: '#9BBF9E', // Darkened from #C4F0C5
        },
    ];

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
