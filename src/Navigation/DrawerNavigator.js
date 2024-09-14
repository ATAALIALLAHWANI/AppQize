import React, { useState } from 'react';
import { Button, View, Text, StyleSheet, I18nManager, Alert, Modal, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { AntDesign, MaterialIcons } from '@expo/vector-icons';
import colors from '../data/colors'; // Adjust the path to your colors file
import { removeToken } from '../type/storeToken'; // Adjust the path to your token handling file
import HomeTabs from './HomeTap';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import Notifications from '../Screen/Notifications';
import { createDrawerNavigator, DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer';
import Octicons from '@expo/vector-icons/Octicons';

const Drawer = createDrawerNavigator();

const CustomDrawer = (props) => {
    const [language, setLanguage] = useState('English');
    const [modalVisible, setModalVisible] = useState(false); // Logout modal visibility
    const navigation = useNavigation(); // Correctly placed hook for navigation

    // Function to handle language toggle
    const toggleLanguage = () => {
        Alert.alert(
            'Change Language',
            `Current Language: ${language}\nSelect a language:`,
            [
                {
                    text: 'Arabic',
                    onPress: () => {
                        setLanguage('Arabic');
                        I18nManager.forceRTL(true); // Enable RTL for Arabic
                        Alert.alert('Language Changed', 'Restart the app to apply the changes.');
                    }
                },
                {
                    text: 'English',
                    onPress: () => {
                        setLanguage('English');
                        I18nManager.forceRTL(false); // Disable RTL for English
                        Alert.alert('Language Changed', 'Restart the app to apply the changes.');
                    }
                },
                { text: 'Cancel', style: 'cancel' }
            ],
            { cancelable: true }
        );
    };

    // Function to handle logout
    const handleLogout = async () => {
        setModalVisible(false); // Close modal
        await removeToken(); // Remove token (ensure this is implemented in your auth logic)
        navigation.replace('Login'); // Navigate to login screen
    };

    return (
        <View style={{ flex: 1 }}>
            <DrawerContentScrollView {...props}>
                <DrawerItemList {...props} />
            </DrawerContentScrollView>

            {/* Custom Footer Section */}
            <View style={styles.footer2}>
                {/* Language Toggle */}
                <TouchableOpacity style={{ paddingVertical: 15 }} onPress={toggleLanguage}>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <FontAwesome name="language" size={25} color={colors.icon} />
                        <Text style={styles.footerTextButton}>Language</Text>
                    </View>
                </TouchableOpacity>

                {/* Logout Button */}
                <TouchableOpacity style={{ paddingVertical: 15 }} onPress={() => setModalVisible(true)}>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <MaterialIcons name="logout" size={25} color={colors.icon} />
                        <Text style={styles.footerTextButton}>Logout</Text>
                    </View>
                </TouchableOpacity>
            </View>

            {/* Logout Confirmation Modal */}
            <Modal
                transparent={true}
                animationType="slide"
                visible={modalVisible}
                onRequestClose={() => setModalVisible(false)}
            >
                <View style={styles.modalContainer}>
                    <View style={styles.modalView}>
                        <Text style={styles.modalText}>Are you sure you want to log out?</Text>
                        <View style={styles.modalButtons}>
                            <TouchableOpacity
                                style={styles.modalButtonCancel}
                                onPress={() => setModalVisible(false)}
                            >
                                <Text style={styles.modalButtonText}>Cancel</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={styles.modalButtonLogout}
                                onPress={handleLogout}
                            >
                                <Text style={styles.modalButtonText}>Logout</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>

            {/* Footer */}
            <View style={styles.footer}>
                <Text style={styles.footerText}>
                    <Octicons name="ruby" size={18} color={colors.icon} /> Provided By ATAALI
                </Text>
            </View>
        </View>
    );
};


// Main Drawer Navigator
const DrawerNavigator = () => {
    return (
        <Drawer.Navigator
            drawerContent={(props) => <CustomDrawer {...props} />}
            screenOptions={{
                headerShown: false,
                drawerActiveTintColor: colors.primary, // Active item color
                drawerLabelStyle: styles.drawerLabel, // Drawer label style
                drawerStyle: { width: '60%' }, // Custom drawer width
            }}
        >
            <Drawer.Screen
                name="International"
                component={HomeTabs}
                options={{
                    drawerIcon: ({ color, size }) => (
                        <MaterialIcons name="language" size={size} color={color} />
                    ),
                }}
            />

            <Drawer.Screen
                name="Notifications"
                component={Notifications}
                options={{
                    drawerIcon: ({ color, size }) => (
                        <AntDesign name="notification" size={size} color={color} />
                    ),
                }}
            />




        </Drawer.Navigator>
    );
}; export default DrawerNavigator;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: colors.background,
    },
    text: {
        fontSize: 18,
        marginBottom: 20,
        color: colors.text,
    },
    drawerLabel: {
        fontSize: 16,
        fontWeight: 'bold',
        marginLeft: '-15%',
    },
    // Style for Logout Button
    logoutButton: {
        backgroundColor: colors.primary,
        padding: 10,
        borderRadius: 5,
    },
    logoutButtonText: {
        color: '#fff',
        fontSize: 16,
        textAlign: 'center',
    },
    // Modal Styling
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalView: {
        width: 300,
        backgroundColor: '#fff',
        borderRadius: 10,
        padding: 20,
        alignItems: 'center',
    },
    modalText: {
        fontSize: 18,
        marginBottom: 20,
        color: '#000',
    },
    modalButtons: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
    },
    modalButtonCancel: {
        backgroundColor: '#ccc',
        padding: 10,
        borderRadius: 5,
        flex: 1,
        marginRight: 5,
    },
    modalButtonLogout: {
        backgroundColor: colors.primary,
        padding: 10,
        borderRadius: 5,
        flex: 1,
        marginLeft: 5,
    },
    modalButtonText: {
        color: '#fff',
        textAlign: 'center',
    },
    footer2: {
        padding: 20,

    },
    footer: {
        padding: 20,
        borderTopWidth: 1,
        borderTopColor: '#ccc',
        alignItems: 'center',
    },
    footerTextButton: {
        fontSize: 15,
        fontWeight: 'bold',
        marginLeft: 5,
        color: colors.icon,
    },
    footerText: {
        fontSize: 16,
        color: '#555',
    },
});
