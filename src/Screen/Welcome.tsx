import React, { useEffect, useRef, useState } from 'react';
import { View, StyleSheet, Text, Image, Easing, Dimensions } from 'react-native';
import AntDesign from '@expo/vector-icons/AntDesign';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { useNavigation } from '@react-navigation/native';
import colors from '../data/colors'; // Assuming you have a colors file
import Animated, {
    useSharedValue,
    useAnimatedStyle,
    withTiming,
    withRepeat,
} from 'react-native-reanimated';

import { getToken } from '../type/storeToken';
import axios from 'axios';
import { Config } from '../apiService';
import LoadingOverlay from '../components/LoadingOverlay';

const { width } = Dimensions.get('window');
const scale = (size) => (width / 375) * size; // Scale function based on screen width

const Welcome = () => {
    const navigation = useNavigation();
    const offset = useSharedValue(0);
    const [containerWidth, setContainerWidth] = useState(0);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        offset.value = withRepeat(
            withTiming(-(containerWidth - width) / 2, { duration: 1750 }),
            -1,
            true
        );
    }, [containerWidth]);

    const animatedStyles = useAnimatedStyle(() => ({
        transform: [{ translateX: offset.value }],
    }));

    const pressHandler = async () => {
        try {
            setIsLoading(true);

            let token = await getToken();  // Retrieve token from AsyncStorage
            if (token !== null) {
                const response = await axios.get(`${Config.API_URL1}profile/GetByID`, {
                    params: { idUser: token },
                });

                if (response.status === 200) {
                    console.log("Token retrieved and valid:", token);
                    navigation.navigate('main');  // Navigate to HomeTabs on successful token
                } else {
                    console.log("Invalid token, navigating to login.");
                    navigation.navigate('Login');  // Navigate to Login if token is invalid
                }
            } else {
                console.log("No token found, navigating to login.");
                navigation.navigate('Login');  // Navigate to Login if no token is found
            }
        } catch (error) {
            console.error("Error during token validation or API request:", error);
            navigation.navigate('Login');  // Navigate to Login on error
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <View style={styles.container}>
            <Image source={require('../data/image/logo3.png')} style={styles.imageLogo} />
            <View
                style={styles.textContainer}
                onLayout={(event) => {
                    const { width } = event.nativeEvent.layout;
                    setContainerWidth(width);
                }}
            >
                <Animated.Text style={[styles.title, animatedStyles]} onPress={pressHandler}>
                    Let's start the IT Quiz                <AntDesign name="caretright" style={styles.icon} />

                </Animated.Text>
                <Text style={styles.description}>
                    Test your knowledge on the latest IT trends and technologies. Answer questions on various topics and improve your skills.
                </Text>
                <View style={styles.iconContainer}>
                    <MaterialIcons name="computer" style={styles.icon} />
                    <MaterialIcons name="event-note" style={styles.icon} />
                    <MaterialIcons name="code" style={styles.icon} />
                    <MaterialIcons name="security" style={styles.icon} />
                </View>
            </View>
            <LoadingOverlay isVisible={isLoading} />

        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: colors.background,
        padding: scale(20),
    },
    textContainer: {
        position: 'absolute',
        bottom: '15%',
        left: '5%',
        right: '5%',
        backgroundColor: colors.primary,
        paddingVertical: scale(25),
        paddingHorizontal: scale(25),
        borderRadius: scale(15),
        alignItems: 'center',
        shadowColor: colors.shadowColor,
        shadowOffset: { width: 0, height: scale(4) },
        shadowOpacity: 0.3,
        shadowRadius: scale(5),
        elevation: scale(10),
    },
    title: {
        fontWeight: 'bold',
        fontSize: scale(26),
        color: colors.text,
        textAlign: 'center',
        marginBottom: scale(15),
    },
    imageLogo: {
        width: scale(180),
        height: scale(180),
        resizeMode: 'contain',
        position: 'absolute',
        top: '25%',
    },
    icon: {
        paddingHorizontal: scale(10),
        color: colors.icon,
        fontSize: scale(25),
    },
    description: {
        fontSize: scale(18),
        color: colors.text,
        textAlign: 'center',
        marginBottom: scale(22),
        lineHeight: scale(22),
    },
    iconContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: '80%',
        marginTop: scale(10),
    },
});

export default Welcome;
