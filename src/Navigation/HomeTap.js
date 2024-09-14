import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialIcons } from '@expo/vector-icons';
import colors from '../data/colors'; // Assuming you have this file for your color definitions
import QuizList from '../Screen/QuizList';
import Home from '../Screen/Home';
import Statistics from '../Screen/Statistics';

const Tab = createBottomTabNavigator();

const HomeTabs = () => {
    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                initialRoute: Home,
                tabBarIcon: ({ focused, color, size }) => {
                    let iconName;

                    if (route.name === 'QuizList') {
                        iconName = 'list';
                    } else if (route.name === 'Home') {
                        iconName = 'home';
                    } else if (route.name === 'Statistics') {
                        iconName = 'bar-chart';
                    }

                    return (
                        <MaterialIcons
                            name={iconName}
                            size={focused ? size + 8 : size} // Increase icon size when focused
                            color={color}
                        />
                    );
                },
                tabBarActiveTintColor: colors.primary, // Active icon color
                tabBarInactiveTintColor: colors.inactive, // Inactive icon color
                tabBarStyle: {
                    backgroundColor: '#FFF', // Customize tab bar background color here
                    borderTopWidth: 0, // Remove top border for a clean look
                    paddingBottom: 10, // Add padding to space out the icons
                    paddingTop: 5, // Add padding to the top for spacing
                    height: 70, // Increase height for a more prominent tab bar
                    overflow: 'hidden', // Ensure the content respects the border radius
                },

                tabBarLabelStyle: {
                    fontSize: 14, // Slightly larger font for better readability
                    fontWeight: '500', // Medium weight text for labels
                },
            })}
        >
            <Tab.Screen name="QuizList" component={QuizList} options={{ headerShown: false }} />
            <Tab.Screen name="Home" component={Home} options={{ headerShown: false }} />
            <Tab.Screen name="Statistics" component={Statistics} options={{ headerShown: false }} />
        </Tab.Navigator>
    );
};

export default HomeTabs;
