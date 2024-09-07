import React from 'react';
import { View, Text, Image, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
import AntDesign from '@expo/vector-icons/AntDesign';
import colors from '../data/colors';

// Assuming ImageSlider is imported correctly
import { ImageSlider } from '../data/SliderData'; // Adjust the path if necessary

type Props = {
    item: ImageSlider;
    index: number;
};

const { width } = Dimensions.get('window');

// Function to scale sizes based on screen width
const scale = (size) => (width / 375) * size; // 375 is a base width (like iPhone 11)

const SliderItem = ({ item, index }: Props) => {
    return (
        <View style={styles.ItemContainer}>
            <Image source={item.image} style={styles.image} />
            <View style={styles.background}>
                <View style={{ alignItems: 'flex-end' }}>
                    <TouchableOpacity>
                        <AntDesign name="hearto" size={scale(24)} color="white" />
                    </TouchableOpacity>
                </View>
                <View style={{ gap: scale(10) }}>
                    <Text style={styles.title}>{item.title}</Text>
                    <Text style={styles.description}>{item.description}</Text>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    ItemContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        gap: scale(20),
        width: width,
        shadowColor: colors.shadowColor,
        shadowOffset: { width: 0, height: scale(2) },
        shadowOpacity: 0.9,
        shadowRadius: scale(20),
        elevation: scale(5), // For Android shadow
    },
    image: {
        width: scale(300),
        height: scale(300),
        borderRadius: scale(20),
    },
    background: {
        position: 'absolute',
        width: scale(300),
        height: scale(300),
        borderRadius: scale(20),
        padding: scale(20),
        justifyContent: 'space-between',
    },
    title: {
        color: 'white',
        fontSize: scale(15),
        fontWeight: '600',
    },
    description: {
        color: 'white',
        fontSize: scale(12),
    },
});

export default SliderItem;
