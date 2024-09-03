import React from 'react'
import ImageSlider from '../data/SliderData';
import { View, Text, Image, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
import AntDesign from '@expo/vector-icons/AntDesign';
import colors from '../data/colors';
type Props = {
    item: ImageSlider;
    index: Number;
}

const { width, height } = Dimensions.get('screen');
const SliderItem = ({ item, index }: Props) => {
    return (
        <View style={styles.ItemContainer}>
            <Image source={item.image} style={styles.image} />
            <View style={styles.background}>
                <View style={{ alignItems: 'flex-end' }}>
                    <TouchableOpacity>
                        <AntDesign name="hearto" size={24} color="white" />
                    </TouchableOpacity>
                </View>
                <View style={{ gap: 10 }}>
                    <Text style={styles.title}>{item.title}</Text>
                    <Text style={styles.description}>{item.description}</Text>
                </View>


            </View>
        </View>

    )
}
const styles = StyleSheet.create({
    ItemContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        gap: 20,
        width: width,
        shadowColor: colors.shadowColor,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.9,
        shadowRadius: 20,

        // Shadow for Android
        elevation: 5,
    },
    image: {
        width: 300,
        height: 300,
        borderRadius: 20,
    },
    background: {
        position: 'absolute',
        width: 300,
        height: 300,
        borderRadius: 20,
        padding: 20,
        justifyContent: 'space-between',

    },
    title: {
        color: 'white',
        fontSize: 15,
        fontWeight: '600',
    },
    description: {
        color: 'white',
        fontSize: 12,
    }
})

export default SliderItem