import React, { useContext, useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, ActivityIndicator, Button, BackHandler, Alert, TouchableOpacity } from 'react-native';
import axios from 'axios';
import Icon from 'react-native-vector-icons/FontAwesome';
import * as Animatable from 'react-native-animatable';
import { Config } from '../apiService';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import colors from '../data/colors';
import { UserContext } from '../Context/UserContext';
import { useNavigation, useRoute } from '@react-navigation/native';
import Ionicons from '@expo/vector-icons/Ionicons';

const ResultChallenge = () => {
    const [results, setResults] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const route = useRoute();
    const { challengeId } = route.params;
    const navigation = useNavigation();
    useEffect(() => {
        fetchResults();
    }, []);


    useEffect(() => {
        const backAction = () => {
            Alert.alert('Hold on!', 'Are you sure you want to go back?', [
                {
                    text: 'Cancel',
                    onPress: () => null,
                    style: 'cancel',
                },
                { text: 'YES', onPress: () => navigation.navigate('main') },
            ]);
            return true;
        };

        const backHandler = BackHandler.addEventListener(
            'hardwareBackPress',
            backAction,
        );

        return () => backHandler.remove();
    }, []);


    const fetchResults = async () => {
        setIsLoading(false);

        try {
            const response = await axios.get(`${Config.API_URL1}challenges/${challengeId}/results`);
            const data = response.data;
            console.log(data);
            setResults(data);
        } catch (error) {
            console.error('Error fetching results:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const renderResult = ({ item, index }) => {
        const isTopScore = item.score === Math.max(...results.map(result => result.score));
        const isLowScore = item.score === Math.min(...results.map(result => result.score));

        const animation = index % 2 === 0 ? 'bounceInLeft' : 'bounceInRight'; // Alternating animations

        return (
            <Animatable.View animation={animation} duration={1000} style={[
                styles.resultContainer,
                isTopScore ? styles.topScore : isLowScore ? styles.lowScore : {}
            ]}>
                <View style={styles.playerDetails}>
                    <MaterialIcons name="person-outline" size={24} color={colors.icon} />
                    <Text style={styles.playerName}>{item.playerName}</Text>
                </View>
                <View style={styles.playerDetails}>
                    <Text style={styles.playerScore}>
                        <Icon name="star" size={20} color="gold" /> {item.score}/10
                    </Text>
                    <Icon
                        name={item.status === "ACCEPTED" ? "check-circle" : "times-circle"}
                        size={20}
                        color={item.status === "ACCEPTED" ? colors.primary : "red"}
                        style={styles.statusIcon}
                    />
                </View>
            </Animatable.View>
        );
    };

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Icon name="trophy" size={30} color="gold" />
                <Text style={styles.headerText}>Challenge Results</Text>
            </View>
            <TouchableOpacity style={{ alignItems: 'flex-end' }} onPress={fetchResults} >
                <Ionicons name="logo-firefox" size={24} color={colors.icon} />
            </TouchableOpacity>
            {isLoading ? (
                <ActivityIndicator size="large" color="#0000ff" />
            ) : (
                <FlatList
                    data={results}
                    renderItem={renderResult}
                    keyExtractor={(item) => item.id.toString()}
                    contentContainerStyle={styles.list}
                />
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: colors.background,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 20,
        backgroundColor: '#fff',
        padding: 15,
        borderRadius: 10,
        elevation: 4,
    },
    headerText: {
        fontSize: 24,
        fontWeight: 'bold',
        marginLeft: 10,
        color: '#333',
    },
    list: {
        paddingBottom: 20,
    },
    resultContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 15,
        marginVertical: 10,
        borderRadius: 10,
        backgroundColor: '#fff',
        elevation: 5,
    },
    playerDetails: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    playerName: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333',
        marginLeft: 10,
    },
    playerScore: {
        fontSize: 18,
        color: '#333',
        marginRight: 10,
    },
    playerStatus: {
        fontSize: 14,
        color: 'gray',
    },
    topScore: {
        borderColor: colors.primary,
        borderWidth: 2,
    },
    lowScore: {
        borderColor: 'red',
        borderWidth: 2,
    },
    icon: {
        marginRight: 10,
    },
    statusIcon: {
        marginLeft: 10,
    },
});

export default ResultChallenge;
