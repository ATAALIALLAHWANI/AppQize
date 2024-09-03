import { Alert, StyleSheet, Text, View } from 'react-native';
import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { UserProvider } from './Context/UserContext';

import Welcome from './Screen/Welcome';
import Login from './Screen/Login';
import Register from './Screen/Register';
import Interesting from './Screen/Interesting';
import Question from './Screen/Question';

import NetInfo from '@react-native-community/netinfo';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeTabs from './Navigation/HomeTap';


export type rootStackPramList = {
  Welcome: undefined;
  Login: undefined;
  Register: undefined;
  Interesting: undefined;
  Question: undefined;
  HomeTabs: undefined;
};

const Stack = createStackNavigator<rootStackPramList>();
const Tab = createBottomTabNavigator();

const App = () => {

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener(state => {
      if (state.isConnected === false) {
        console.log("Not connected to internet");
        Alert.alert("No Internet Connection", "Please connect to the internet.");
      } else {
        console.log("Connected to internet");
      }
    });

    // Clean up the listener on component unmount
    return () => unsubscribe();
  }, []); // Empty dependency array ensures this runs only once on mount


  return (
    <UserProvider>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="HomeTabs" component={HomeTabs} options={{ headerShown: false }} />

          <Stack.Screen name="Welcome" component={Welcome} options={{ headerShown: false }} />
          <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
          <Stack.Screen name="Register" component={Register} options={{ headerShown: false }} />
          <Stack.Screen name="Interesting" component={Interesting} options={{ headerShown: false }} />
          <Stack.Screen name="Question" component={Question} options={{ headerShown: false }} />

        </Stack.Navigator>
      </NavigationContainer>
    </UserProvider>
  );
};

export default App;