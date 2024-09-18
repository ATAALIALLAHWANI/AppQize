import React, { useState } from 'react';
import { StyleSheet, Text, View, FlatList, TouchableOpacity, ActivityIndicator } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import axios from 'axios';
import colors from '../data/colors';
import { Config } from '../apiService';
import { getToken } from '../type/storeToken';

const SliderFriends = ({ friends, isSearching }) => {
    const [loadingIds, setLoadingIds] = useState([]); // Track friends being added
    const [addedFriends, setAddedFriends] = useState(new Set()); // Track added friends

    // Handle add friend logic
    const handleAddFriend = async (friendId) => {
        setLoadingIds(prev => [...prev, friendId]); // Set loading state for the specific friend
        try {
            const id = parseInt(await getToken(), 10);
            const response = await axios.post(`${Config.API_URL1}friends/add`, null, {
                params: {
                    senderId: id,
                    receiverId: friendId,
                },
            });

            alert(response.data);
            setAddedFriends(prev => new Set([...prev, friendId])); // Update the list of added friends
        } catch (error) {
            console.error("Error adding friend:", error);
        } finally {
            setLoadingIds(prev => prev.filter(id => id !== friendId)); // Remove the loading state
        }
    };

    return (
        <View style={styles.friendsList}>
            {isSearching ? (
                <Text style={styles.searchingText}>Searching...</Text>
            ) : (
                <FlatList
                    data={friends}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={({ item }) => (
                        <View style={styles.friendItem}>
                            <AntDesign name="user" size={24} color={colors.icon} />

                            <View style={{ flex: 1, flexDirection: 'column', marginLeft: 10 }}>
                                <Text style={styles.friendName}>{item.username}</Text>
                                <Text style={styles.friendEmail}>{item.email}</Text>
                            </View>

                            {/* Conditionally render the button based on friendship status */}
                            {addedFriends.has(item.id) || item.friendshipStatus === "PENDING" ? (
                                <TouchableOpacity
                                    style={styles.disabledButton}
                                    disabled
                                >
                                    <Text style={styles.addButtonText}> Friend</Text>
                                </TouchableOpacity>
                            ) : loadingIds.includes(item.id) ? (
                                <ActivityIndicator size="small" color={colors.primary} />
                            ) : (
                                <TouchableOpacity
                                    style={styles.addButton}
                                    onPress={() => handleAddFriend(item.id)}
                                >
                                    <Text style={styles.addButtonText}>Add Friend</Text>
                                </TouchableOpacity>
                            )}
                        </View>
                    )}
                />
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    friendsList: {
        marginTop: 20,
        width: '100%',
        flex: 1,
    },
    searchingText: {
        fontSize: 18,
        color: colors.text,
        textAlign: 'center',
        marginTop: 20,
    },
    friendItem: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
        backgroundColor: '#fff',
        marginBottom: 10,
        borderRadius: 8,
        shadowColor: colors.shadowColor,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 5,
        elevation: 2,
    },
    friendName: {
        fontSize: 16,
        flex: 1,
    },
    friendEmail: {
        fontSize: 14,
        marginRight: 15,
    },
    addButton: {
        backgroundColor: colors.primary,
        paddingVertical: 5,
        paddingHorizontal: 10,
        borderRadius: 5,
    },
    addButtonText: {
        color: '#fff',
        fontSize: 14,
    },
    disabledButton: {
        backgroundColor: '#d3d3d3',
        paddingVertical: 5,
        paddingHorizontal: 10,
        borderRadius: 5,
    },
});

export default SliderFriends;
