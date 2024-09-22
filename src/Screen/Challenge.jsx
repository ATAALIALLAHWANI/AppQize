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

    const terms = "one-minute challenge: If you lose, you will prepare dinner for your friends.";

    useEffect(() => {
        const fetchFriends = async () => {
            let userId = await getToken();
            try {
                const response = await axios.get(`${Config.API_URL1}friends/all/${userId}`);
                setFriends(response.data);
            } catch (e) {
                console.log(e.message + " - Error fetching friends");
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
            console.log(friendIdsArray)
            if (friendIdsArray.length !== 0 && selectedCategory !== null) {
                setIsLoading(true);
                let creatorId = await getToken();
                creatorId = parseInt(creatorId, 10);

                // Add creatorId to friendIdsArray
                const updatedFriendIdsArray = [...friendIdsArray, creatorId];
                console.log('Friend IDs Array:', updatedFriendIdsArray);
                console.log('Selected Category:', selectedCategory);

                // Convert array to comma-separated string
                const friendIdsParam = updatedFriendIdsArray.join(',');
                console.log("friendIdsParam ", friendIdsParam)
                // Send data as query parameters
                const response = await axios.post(`${Config.API_URL1}challenges/create`, null, {
                    params: {
                        creatorId: creatorId,
                        friendIds: friendIdsParam,
                        category: selectedCategory
                    }
                });

                console.log(response.data); // Handle response data as needed
                if (response.status === 200) {
                    setChallengeID(response.data);
                    const category = selectedCategory;
                    navigation.navigate('QuestionChallenge', { category });
                }




            } else {
                Alert.alert("Input not correct", "Please enter both a friends and cateory.")
            }

        } catch (e) {
            console.error(e.message + " - Error creating challenge");
        } finally {
            setIsLoading(false);
        }
    };
    if (isLoading) {
        return <LoadingOverlay />;
    }


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

    return (
        <View style={styles.container}>
            <View style={styles.termsContainer}>
                {/* Illustration at the top */}
                <View style={styles.illustrationContainer}>
                    <Image
                        source={require('../data/image/challnge1.jpg')} // Add your image source here
                        style={styles.illustration}
                    />
                </View>

                {/* Welcome text */}
                <Text style={styles.welcomeText}>Welcome back!</Text>
                <Text style={styles.instructions}>
                    Pick up where you left off - challenge your friends to a fun game! Select friends below and check the terms.
                </Text>

                <FlatList
                    data={friends}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={renderFriendItem}
                    style={styles.friendList}
                    contentContainerStyle={styles.friendListContent}
                />

                <View>
                    <FlatList
                        data={quizData}
                        keyExtractor={(item) => item.id.toString()}
                        renderItem={({ item }) => (
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
                        )}
                        horizontal
                    />
                </View>

                {/* Challenge Terms and Conditions */}
                <View style={styles.termsContainer}>
                    <Text style={styles.termsTitle}>Challenge Terms and Conditions:</Text>
                    <Text style={styles.termsText}>{terms}</Text>
                </View>
            </View>

            {/* Footer button */}
            <TouchableOpacity style={styles.footerButton} onPress={handleCreateChall}>
                <Text style={styles.footerButtonText}>Open Challenge</Text>
            </TouchableOpacity>
        </View>
    );
}

export default Challenge;

