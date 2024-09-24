import React, { useEffect, useState, useContext } from 'react';
import { StyleSheet, Text, View, FlatList, TouchableOpacity, Image, Alert } from 'react-native';
import axios from 'axios';
import colors from '../data/colors';
import styles from '../data/ChalleangeStyle';
import { Config } from '../apiService';
import { getToken } from '../type/storeToken';
import { AntDesign } from '@expo/vector-icons';
import quizData from '../data/QuzeData';
import LoadingOverlay from '../components/LoadingOverlay';
import { UserContext } from '../Context/UserContext';
import { useNavigation } from '@react-navigation/native';

function Challenge() {
    const [friendIdsArray, setFriendIdsArray] = useState([]); // Initialize as empty array
    const [friends, setFriends] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const { setChallengeID } = useContext(UserContext);
    const navigation = useNavigation();

    const terms = "One-minute challenge: If you lose, you will prepare dinner for your friends.";

    useEffect(() => {
        const fetchFriends = async () => {
            setIsLoading(true);
            let userId = await getToken();
            try {
                const response = await axios.get(`${Config.API_URL1}friends/all/${userId}`);
                setFriends(response.data);
            } catch (e) {
                console.log(e.message + " - Error fetching friends");
            } finally {
                setIsLoading(false);

            }
        };
        fetchFriends();
    }, []);

    const handleSendChallenge = (id) => {
        setFriendIdsArray((prevChallenges) => [...prevChallenges, id]);
    };

    const handlePress = (name) => {
        setSelectedCategory(name);
    };

    const handleCreateChall = async () => {
        try {
            if (friendIdsArray.length !== 0 && selectedCategory !== null) {
                setIsLoading(true);
                let creatorId = await getToken();
                creatorId = parseInt(creatorId, 10);

                const updatedFriendIdsArray = [...friendIdsArray, creatorId];

                const friendIdsParam = updatedFriendIdsArray.join(',');

                const response = await axios.post(`${Config.API_URL1}challenges/create`, null, {
                    params: {
                        creatorId: creatorId,
                        friendIds: friendIdsParam,
                        category: selectedCategory
                    }
                });

                if (response.status === 200) {
                    setChallengeID(response.data);
                    navigation.navigate('QuestionChallenge', { category: selectedCategory, challengeId: response.data });
                }
            } else {
                Alert.alert("Input not correct", "Please select both friends and a category.");
            }
        } catch (e) {
            console.error(e.message + " - Error creating challenge");
        } finally {
            setIsLoading(false);
        }
    };

    const renderFriendItem = ({ item }) => (
        <View style={styles.friendItem}>
            <AntDesign name="user" size={24} color={colors.icon} />
            <View style={styles.friendInfo}>
                <Text style={styles.friendName}>{item.username}</Text>
                <TouchableOpacity
                    style={[
                        styles.sendButton,
                        friendIdsArray.includes(item.id) ? styles.buttonDisabled : null
                    ]}
                    disabled={friendIdsArray.includes(item.id)}
                    onPress={() => handleSendChallenge(item.id)}
                >
                    <Text style={[
                        styles.sendButtonText,
                        friendIdsArray.includes(item.id) ? styles.buttonTextDisabled : null
                    ]}>
                        {friendIdsArray.includes(item.id) ? 'Challenge Sent' : 'Send Challenge'}
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
    );

    const renderCategoryItem = ({ item }) => (
        <TouchableOpacity
            onPress={() => handlePress(item.name)}
            style={[
                styles.quizItem,
                { backgroundColor: item.color },
                selectedCategory === item.name ? styles.selectedCategory : null
            ]}
        >
            <View style={styles.iconContainer}>{item.icon}</View>
            <Text style={styles.quizText}>{item.name}</Text>
        </TouchableOpacity>
    );

    if (isLoading) {
        return <LoadingOverlay />;
    } else {
        return (
            <View style={styles.container}>
                <FlatList
                    ListHeaderComponent={
                        <>
                            {/* Illustration at the top */}
                            <View style={styles.illustrationContainer}>
                                <Image
                                    source={require('../data/image/challnge1.jpg')}
                                    style={styles.illustration}
                                />
                            </View>

                            {/* Welcome text and instructions */}
                            <Text style={styles.welcomeText}>Welcome back!</Text>
                            <Text style={styles.instructions}>
                                Pick up where you left off - challenge your friends to a fun game! Select friends below and check the terms.
                            </Text>

                            {/* Friend list section */}
                            <Text style={styles.sectionTitle}>Select Friends</Text>
                        </>
                    }
                    data={friends}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={renderFriendItem}
                    ListFooterComponent={
                        <>
                            {/* Category selection */}
                            <Text style={styles.sectionTitle}>Select Category</Text>
                            <FlatList
                                data={quizData}
                                keyExtractor={(item) => item.id.toString()}
                                renderItem={renderCategoryItem}
                                horizontal
                                contentContainerStyle={styles.categoryList}
                            />

                            {/* Challenge Terms and Conditions */}
                            <View style={styles.termsContainer}>
                                <Text style={styles.termsTitle}>Challenge Terms and Conditions:</Text>
                                <Text style={styles.termsText}>{terms}</Text>
                            </View>

                            {/* Footer button */}
                            <TouchableOpacity style={styles.footerButton} onPress={handleCreateChall}>
                                <Text style={styles.footerButtonText}>Open Challenge</Text>
                            </TouchableOpacity>
                        </>
                    }
                />
            </View>);
    }



}

export default Challenge;
