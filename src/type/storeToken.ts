import AsyncStorage from '@react-native-async-storage/async-storage';

// Define a function to store the token with TypeScript typing
const storeToken = async (token: string): Promise<void> => {
    try {
        await AsyncStorage.setItem('@userToken', token);
        console.log("Token stored successfully.");
    } catch (error) {
        console.error("Error storing token", error);
    }
};

// Define a function to retrieve the token with TypeScript typing
const getToken = async (): Promise<string | null> => {
    try {
        const token = await AsyncStorage.getItem('@userToken');
        return token;
    } catch (error) {
        console.error("Error retrieving token", error);
        return null;
    }
};

// Define a function to remove the token
const removeToken = async (): Promise<void> => {
    try {
        await AsyncStorage.removeItem('@userToken');
        console.log("Token removed successfully.");
    } catch (error) {
        console.error("Error removing token", error);
    }
};

export { storeToken, getToken, removeToken };
