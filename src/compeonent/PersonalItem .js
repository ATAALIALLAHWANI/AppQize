import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const PersonalItem = ({ item }) => {
    return (
        <View style={[styles.container, { backgroundColor: item.color }]}>
            <View style={styles.iconContainer}>
                {item.icon}
            </View>
            <View style={styles.textContainer}>
                <Text style={styles.title}>{item.name}</Text>
                <Text style={styles.result}>Result: {item.result}</Text>

            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        padding: 15,
        marginVertical: 8,
        marginHorizontal: 5,
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 6,
        elevation: 3,
    },
    iconContainer: {
        marginRight: 15,
        justifyContent: 'center',
        alignItems: 'center',
    },
    textContainer: {
        justifyContent: 'center',
    },
    title: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#333',
    },
    result: {
        fontSize: 14,
        color: '#555',
    },
});

export default PersonalItem;
