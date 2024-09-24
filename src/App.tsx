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
import Statistics from './Screen/Statistics';
import QuizList from './Screen/QuizList';
import DrawerNavigator from './Navigation/DrawerNavigator';
import Challenge from './Screen/Challenge';
import colors from './data/colors';
import QuestionChallenge from './Screen/QuestionChallenge';
import ResultChallenge from './Screen/ResultChallenge';


export type rootStackPramList = {
  Welcome: undefined;
  Login: undefined;
  Register: undefined;
  Interesting: undefined;
  Question: undefined;
  HomeTabs: undefined;
  QuizList: undefined;
  main: undefined;
  Challenge: undefined;
  QuestionChallenge: undefined;
  ResultChallenge: undefined;
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

          <Stack.Screen name="Welcome" component={Welcome} options={{ headerShown: false }} />
          <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
          <Stack.Screen name="Register" component={Register} options={{ headerShown: false }} />
          <Stack.Screen name="Interesting" component={Interesting} options={{ headerShown: false }} />
          <Stack.Screen name="Question" component={Question} options={{ headerShown: false }} />
          <Stack.Screen name="main" component={DrawerNavigator} options={{ headerShown: false }} />
          <Stack.Screen
            name="Challenge"
            component={Challenge}
            options={{
              title: 'Challenge Friends', // Set the header title
              headerStyle: {
                backgroundColor: colors.primary, // Set the background color of the header
              },
              headerTintColor: '#fff', // Set the text/icon color
              headerTitleStyle: {
                fontWeight: 'bold', // Bold title font
                fontSize: 22, // Custom font size
              },
              headerTitleAlign: 'center', // Center the title
            }}
          />
          <Stack.Screen name='QuestionChallenge' component={QuestionChallenge} options={{ headerShown: false }} />
          <Stack.Screen name='ResultChallenge' component={ResultChallenge} options={{ headerShown: false }} />

        </Stack.Navigator>
      </NavigationContainer>
    </UserProvider>
  );
};

export default App;
