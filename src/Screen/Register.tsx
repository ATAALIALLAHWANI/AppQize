import React, { useState, useContext } from 'react';
import { View, TextInput, Image, Button, Alert } from 'react-native';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
import styles2 from '../data/styles';
import colors from '../data/colors';
import { UserContext } from '../Context/UserContext';
import { Config } from '../apiService';
import CustomInput from '../components/CustomInput';
import LoadingOverlay from '../components/LoadingOverlay';

const Register = () => {
    const { setUsername, setEmail, setPassword } = useContext(UserContext);
    const [username, setLocalUsername] = useState('');
    const [email, setLocalEmail] = useState('');
    const [password, setLocalPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const navigation = useNavigation();

    const validateInputs = () => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            Alert.alert("Invalid Email", "Please enter a valid email address.");
            return false;
        }

        if (password.length < 6 || password.length > 8) {
            Alert.alert("Invalid Password", "Password must be between 6 and 8 characters.");
            return false;
        }

        const usernameRegex = /^[A-Z][A-Za-z0-9]{5,}$/;
        if (!usernameRegex.test(username)) {
            Alert.alert("Invalid Username", "Username should start with an uppercase letter and be at least 6 characters long.");
            return false;
        }

        return true;
    };

    const checkUsernameAvailability = async () => {
        if (validateInputs()) {
            setIsLoading(true);
            try {
                const response = await axios.get(`${Config.API_URL1}profile/exist`, {
                    params: { username },
                });

                if (response.data) {
                    setUsername(username);
                    setEmail(email);
                    setPassword(password);

                    navigation.navigate('Interesting');
                } else {
                    Alert.alert("Username Taken", `The username ${username} is already in use.`);
                }
            } catch (error) {
                console.error("Error checking username:", error);

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
};

export default Register;
