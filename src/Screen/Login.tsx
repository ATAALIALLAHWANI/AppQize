import axios from 'axios';
import React, { useContext, useState } from 'react';
import { Text, View, TextInput, StyleSheet, Image, Button, Alert } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { Config } from '../apiService'; // Adjust the path as needed
import { useNavigation } from '@react-navigation/native';
import styles2 from '../data/styles';
import colors from '../data/colors';
import CustomInput from '../components/CustomInput';
import { UserContext } from '../Context/UserContext';
import LoadingOverlay from '../components/LoadingOverlay';
import { getToken, storeToken } from '../type/storeToken';
function Login() {
    const [username, setLocalUsername] = useState('');
    const [password, setLocalPassword] = useState('');
    const { setUsername, setPassword } = useContext(UserContext); // Access the context's set functions
    const [isLoading, setIsLoading] = useState(false); // State to show/hide the loading spinner
    const navigation = useNavigation();
    const handleLogin = async () => {
        if (username && password) {
            setIsLoading(true); // Show loading spinner

            try {
                const response = await axios.get(`${Config.API_URL1}profile`, {
                    params: { username, password },
                });
                setUsername(username);
                setPassword(password);

                let id = String(response.data.id);
                console.log(typeof (id));

                await storeToken(id);
                console.log(await getToken())
                navigation.reset({
                    index: 1, // Focus on the second tab, which is 'Home'
                    routes: [{ name: 'main', params: { screen: 'Home2' } }],
                });
            } catch (error) {
                if (error.response) {


                    if (error.response.status === 400) {
                        Alert.alert("Login Failed", "Unauthorized access. Please check your credentials.");
                    } else if (error.response.status === 401) {
                        Alert.alert("Login Failed", "The username is not correct.");

                    } else {
                        Alert.alert("Login Failed", "The login process encountered an issue.");
                    }
                } else if (error.request) {
                    console.error("No response received:", error.request);
                    Alert.alert("Error", "No response from the server. Please try again.");
                } else {
                    console.error("Error", error.message);
                    Alert.alert("Error", "An error occurred. Please try again.");
                }
            } finally {
                setIsLoading(false); // Hide loading spinner when request is done
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
                    onChangeText={setLocalUsername}
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
                        <Button title="Login" onPress={handleLogin} color={colors.primary} />
                    </View>
                    <View style={styles2.button}>
                        <Button title="Register" onPress={handleRegister} color={colors.primary} />
                    </View>
                </View>
                <LoadingOverlay isVisible={isLoading} />

            </View>

        </View>
    );
}


export default Login;
