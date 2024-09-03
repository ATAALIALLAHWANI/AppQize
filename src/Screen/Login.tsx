import axios from 'axios';
import React, { useState } from 'react';
import { Text, View, TextInput, StyleSheet, Image, Button, Alert } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { Config } from '../apiService'; // Adjust the path as needed
import { useNavigation } from '@react-navigation/native';
import styles2 from '../data/styles';
import colors from '../data/colors';
import CustomInput from '../compeonent/CustomInput';
function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const [result, setResult] = useState(null);
    const navigation = useNavigation();

    const handleLogin = async () => {
        if (username && password) {
            try {
                const response = await axios.get(`${Config.API_URL1}profile`, {
                    params: { username, password },
                });

                // If the request is successful (status code 2xx)
                setResult(response.data);
                Alert.alert("Login Successful", `Welcome back, ${response.data.username}!`);
                navigation.reset({
                    index: 1, // Focus on the second tab, which is 'Home'
                    routes: [{ name: 'HomeTabs', params: { screen: 'Home' } }],
                });
            } catch (error) {
                if (error.response) {


                    if (error.response.status === 400) {
                        setResult(null);
                        Alert.alert("Login Failed", "Unauthorized access. Please check your credentials.");
                    } else if (error.response.status === 401) {
                        setResult(null);
                        Alert.alert("Login Failed", "The username is not correct.");

                    } else {
                        setResult(null);
                        Alert.alert("Login Failed", "The login process encountered an issue.");
                    }
                } else if (error.request) {
                    console.error("No response received:", error.request);
                    Alert.alert("Error", "No response from the server. Please try again.");
                } else {
                    console.error("Error", error.message);
                    Alert.alert("Error", "An error occurred. Please try again.");
                }
            }
        } else {
            Alert.alert("Input not correct", "Please enter both a username and password.");
        }
    };

    const handleRegister = () => {
        navigation.navigate('Register');
    };

    return (
        <View style={styles2.container}>
            <View style={styles2.containerLogin}>


                <Image source={require('../data/image/logo3.png')} style={styles2.image} />

                <CustomInput
                    iconName="user"
                    placeholder="Username"
                    value={username}
                    onChangeText={setUsername}
                />
                <CustomInput
                    iconName="lock"
                    placeholder="Password"
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry={true}
                />


                <View style={styles2.buttonContainer}>
                    <View style={styles2.button}>
                        <Button title="Login" onPress={handleLogin} color={colors.primary} />
                    </View>
                    <View style={styles2.button}>
                        <Button title="Register" onPress={handleRegister} color={colors.primary} />
                    </View>
                </View>
            </View>
        </View>
    );
}


export default Login;
