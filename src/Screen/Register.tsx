import React, { useState, useContext } from 'react';
import { View, TextInput, StyleSheet, Image, Button, Alert } from 'react-native';
import { AntDesign, MaterialIcons } from '@expo/vector-icons';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
import styles2 from '../data/styles';
import colors from '../data/colors';
import { UserContext } from '../Context/UserContext';
import { Config } from '../apiService';
import CustomInput from '../compeonent/CustomInput';
import LoadingOverlay from '../compeonent/LoadingOverlay';
function Register() {
    const { setUsername, setEmail, setPassword } = useContext(UserContext); // Access the context's set functions
    const [username, setLocalUsername] = useState(''); // Local state to hold input temporarily
    const [email, setLocalEmail] = useState(''); // Local state to hold input temporarily
    const [password, setLocalPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false); // State to show/hide the loading spinner


    const navigation = useNavigation();
    const checkUsernameAvailability = async () => {
        if (username && email && password) { // Ensure username, email, and password are provided
            setIsLoading(true);
            try {
                // Check if the username already exists
                const response = await axios.get(`${Config.API_URL1}profile/exist`, {
                    params: { username: username },
                });

                if (response.data) { // If true, the username is available
                    setUsername(username); // Save the username in context
                    setEmail(email); // Save the email in context
                    setPassword(password); // Save the password in context

                    navigation.navigate('Interesting');
                } else { // If false, the username already exists
                    Alert.alert("Username Taken", `The username ${username} is already in use.`);
                }
            } catch (error) {
                console.error("Error checking username:", error);

                // Check if the error is related to the network or server
                if (error.response) {
                    Alert.alert("Error", "Unable to check username availability. Please try again.");
                } else if (error.request) {
                    Alert.alert("Network Error", "No response from the server. Please check your connection.");
                } else {
                    Alert.alert("Error", "An error occurred. Please try again.");
                }
            } finally {
                setIsLoading(false);
            }
        } else {
            // Alert if username, email, or password is missing
            Alert.alert("Input not correct", "Please enter a username, email, and password.");
        }
    };

    return (
        <View style={styles2.container}>
            <View style={styles2.containerLogin}>
                <View>
                    <Image source={require('../data/image/logo3.png')} style={styles2.image} />
                </View>

                <CustomInput
                    iconName="user"
                    placeholder="Username"
                    value={username}
                    onChangeText={setLocalUsername}
                />
                <CustomInput
                    iconName="mail"
                    placeholder="Email"
                    value={email}
                    onChangeText={setLocalEmail}
                />
                <CustomInput
                    iconName="lock"
                    placeholder="Password"
                    value={password}
                    onChangeText={setLocalPassword}
                    secureTextEntry={true}
                />

                <View style={styles2.buttonContainer}>
                    <View style={styles2.button}>
                        <Button title="Register" onPress={checkUsernameAvailability} color={colors.primary} />
                    </View>
                </View>
            </View>
            <LoadingOverlay isVisible={isLoading} />

        </View>
    );
}
export default Register;
