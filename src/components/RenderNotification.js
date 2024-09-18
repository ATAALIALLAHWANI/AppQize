import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ActivityIndicator, StyleSheet } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import axios from 'axios';
import { getToken } from '../type/storeToken';
import { Config } from '../apiService';
import colors from '../data/colors';

const RenderNotification = ({ type, message, timestamp, receiveId, visit }) => {
    const [loading, setLoading] = useState(false); // Handle loading state
    const [error, setError] = useState(null); // Handle errors
    const [isAccepted, setIsAccepted] = useState(false); // Track if the request is accepted

    // Define icon and color variables (these won't change hook calls)
    let icon = 'alert';
    let color = colors.error;

    // Set icon and color based on notification type
    if (isAccepted || visit === 'yes') {
        icon = 'account-check';
        color = colors.success;
    } else if (type === 'friend_request') {
        icon = 'account-plus';
        color = colors.primary;
    } else if (type === 'challenge_acceptance') {
        icon = 'trophy';
        color = colors.success;
    }

    // Function to handle accepting friend requests
    const handleAddFriends = async () => {
        setLoading(true);  // Set loading state
        setError(null);    // Clear previous error messages

        try {
            let requestId = await getToken();  // Get request ID (user ID)
            requestId = parseInt(requestId);

            // Post request to the API to accept the friend request
            const response = await axios.post(`${Config.API_URL1}friends/accept/${requestId}/${receiveId}`);

            if (response.status === 200) {
                console.log("Friend request accepted!");
                setIsAccepted(true); // Update the state to reflect acceptance
            } else {
                throw new Error('Failed to accept friend request');
            }
        } catch (error) {
            console.error('Error accepting friend request:', error);
            setError('Failed to accept friend request. Please try again later.');
        } finally {
            setLoading(false);  // Stop loading state
        }
    };

    return (
        <TouchableOpacity style={styles.container} onPress={handleAddFriends} disabled={loading || isAccepted}>
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
