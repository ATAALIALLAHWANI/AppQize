import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ActivityIndicator, StyleSheet } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import axios from 'axios';
import { getToken } from '../type/storeToken';
import { Config } from '../apiService';
import colors from '../data/colors';
import { useNavigation } from '@react-navigation/native';

const RenderNotification = ({ type, message, timestamp, receiveId, visit, challengeId, notificationId, fetchNotifications }) => {
    const [loading, setLoading] = useState(false); // Handle loading state
    const [error, setError] = useState(null); // Handle errors
    const [isAccepted, setIsAccepted] = useState(false); // Track if the request is accepted
    const navigation = useNavigation();


    let icon = 'alert';
    let color = colors.error;

    // Set icon and color based on notification type
    if (isAccepted || visit === 'yes') {
        if (type === 'INVITATION' || type === 'Creator') {
            icon = 'trophy';
            color = colors.success;

        } else {
            icon = 'account-check';
            color = colors.success;
        }

    } else if (type === 'friend_request') {
        icon = 'account-plus';
        color = colors.primary;
    } else if (type === 'INVITATION' || type === 'Creator') {
        icon = 'trophy';
        color = colors.primary;
    }

    // Function to handle accepting friend requests
    const handleAddFriends = async () => {
        if (visit === 'no') {
            setLoading(true);  // Set loading state
            setError(null);    // Clear previous error messages

            try {
                let requestId = await getToken();  // Get request ID (user ID)
                requestId = parseInt(requestId);
                if (type === 'friend_request') {
                    // Post request to the API to accept the friend request
                    const response = await axios.post(`${Config.API_URL1}friends/accept/${requestId}/${receiveId}`);

                    if (response.status === 200) {
                        console.log("Friend request accepted!");
                        setIsAccepted(true); // Update the state to reflect acceptance
                    } else {
                        throw new Error('Failed to accept friend request');
                    }
                } else {

                }

            } catch (error) {
                console.error('Error accepting friend request:', error);
                setError('Failed to accept friend request. Please try again later.');
            } finally {
                setLoading(false);  // Stop loading state
            }
        }

    };
    const handlChallenge = async () => {
        if (type === 'Creator' || visit === 'yes') {
            navigation.navigate('ResultChallenge', { challengeId })
        } else if (visit === 'no') {
            setLoading(true);  // Set loading state
            setError(null);    // Clear previous error messages

            try {
                let requestId = await getToken();  // Get request ID (user ID)
                requestId = parseInt(requestId);

                // get challenge 
                const response = await axios.get(`${Config.API_URL1}challenges/${challengeId}`)
                console.log(response.data)

                await updateVisitStatus();
                fetchNotifications()

                navigation.navigate('QuestionChallenge', { category: response.data.category, challengeId: challengeId })

            } catch (error) {
                console.error('Error handle Challenge request:', error);
                setError('Failed to accept  challenge request. Please try again later.');
            } finally {
                setLoading(false);  // Stop loading state
            }
        }

    }
    const updateVisitStatus = async () => {
        try {
            // Check if notificationId is defined and is a number
            if (typeof notificationId !== 'number') {
                console.log(notificationId)
                throw new Error('Invalid notification ID');
            }

            const response = await axios.put(`${Config.API_URL1}notifications/${notificationId}/visit`);
            console.log(response.data);

        } catch (error) {
            console.error("Error updating visit status:", error.message);
        }
    };
    return (
        <TouchableOpacity style={styles.container} onPress={type === 'friend_request' ? handleAddFriends : handlChallenge} disabled={loading || isAccepted}>
            {loading ? (
                <ActivityIndicator size="small" color={colors.primary} />
            ) : (
                <MaterialCommunityIcons name={icon} size={30} color={color} />
            )}

            <View style={styles.textContainer}>
                <Text style={styles.message}>{message}</Text>
                <Text style={styles.timestamp}>{new Date(timestamp).toLocaleString()}</Text>
            </View>

        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 15,
        paddingHorizontal: 20,
        backgroundColor: colors.backgroundLight,
        borderBottomWidth: 1,
        borderBottomColor: colors.border,
        borderRadius: 8,
        marginVertical: 5,
    },
    textContainer: {
        marginLeft: 15,
        flex: 1,
    },
    message: {
        fontSize: 16,
        fontWeight: 'bold',
        color: colors.primaryText,
    },
    timestamp: {
        fontSize: 12,
        color: colors.secondaryText,
        marginTop: 4,
    },
});

export default RenderNotification;
