import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, ActivityIndicator, TouchableOpacity } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import axios from 'axios';
import colors from '../data/colors';
import { Config } from '../apiService';
import RenderNotification from '../components/RenderNotification'; // Adjust the path if needed
import { getToken } from '../type/storeToken';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import LoadingOverlay from '../components/LoadingOverlay';

const Notifications = () => {
    const [notifications, setNotifications] = useState([]);
    const [loading, setLoading] = useState(true);

    // Fetch notifications function
    const fetchNotifications = async () => {
        try {
            setLoading(true)
            const token = await getToken();
            const userId = parseInt(token, 10);

            const response = await axios.get(`${Config.API_URL1}notifications/${userId}`);
            console.log(response.data);
            setNotifications(response.data);
        } catch (error) {
            console.error('Error fetching notifications:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchNotifications(); // Call fetchNotifications inside useEffect
    }, []);

    if (loading) {
        return <LoadingOverlay />;
    }

    return (
        <View style={styles.container}>
            <Text style={styles.header}>Notifications</Text>
            <TouchableOpacity onPress={fetchNotifications}>
                <MaterialIcons name="notifications-none" size={24} color={colors.primary} />
            </TouchableOpacity>

            <FlatList
                data={notifications}
                keyExtractor={(item) => `$${item.createdAt}`} // Combine idFreinds and createdAt
                renderItem={({ item }) => (
                    <RenderNotification
                        type={item.type}
                        message={item.message}
                        timestamp={item.createdAt}
                        receiveId={item.idFreinds}
                        visit={item.visit}
                    />
                )}
            />

        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.background,
        padding: 20,
    },
    header: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        color: colors.primary,
    },
    loading: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default Notifications;
