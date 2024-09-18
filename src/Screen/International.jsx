import React, { useRef, useState } from 'react';
import { StyleSheet, Text, View, TextInput, FlatList, TouchableOpacity, Alert, Image } from 'react-native';
import EvilIcons from '@expo/vector-icons/EvilIcons';
import axios from 'axios';
import colors from '../data/colors';
import SliderFriends from '../components/SliderFriends';
import { Config } from '../apiService';
import { getToken } from '../type/storeToken';
const International = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [friends, setFriends] = useState([]);
    const [isSearching, setIsSearching] = useState(false);

    const searchInputRef = useRef(null);

    const handleSearch = async (name) => {
        setIsSearching(true);
        setSearchTerm(name);

        try {
            let id = await getToken();
            id = parseInt(id);

            const response = await axios.get(`${Config.API_URL1}profile/search`, {
                params: { name: name, currentUserId: id }
            });

            let tokenId = await getToken();
            tokenId = parseInt(tokenId);
            const filteredData = response.data.filter(friend => friend.id !== tokenId);
            console.log(filteredData);
            setFriends(filteredData);
        } catch (error) {
            Alert.alert('Error', 'Could not fetch friends.');
        } finally {
            setIsSearching(false);
        }
    };

    const focusSearchInput = () => {
        if (searchInputRef.current) {
            searchInputRef.current.focus();
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TextInput
                    ref={searchInputRef}
                    style={styles.searchInput}
                    placeholder="Search friends..."
                    value={searchTerm}
                    onChangeText={(name) => handleSearch(name)}
                />

                <TouchableOpacity style={styles.buttonChallenge}>
                    <View style={styles.buttonContent}>
                        <Text style={styles.buttonText}>Make Challenges</Text>
                        <EvilIcons name="trophy" size={20} color="#FFF" />
                    </View>
                </TouchableOpacity>
            </View>

            <View style={styles.middle}>
                <Image source={require('../data/image/challenge2.jpg')} style={styles.image} />
            </View>

            <View style={styles.friendsContainer}>
                <TouchableOpacity>
                    <EvilIcons name="search" size={20} color={colors.icon} />
                </TouchableOpacity>
                <Text style={styles.text}>Friends </Text>
            </View>

            <SliderFriends friends={friends} isSearching={isSearching} />

            <View style={styles.feed}>
                <TouchableOpacity onPress={focusSearchInput}>
                    <Text>Add Friends</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.background,
        alignItems: 'center',
        padding: 20,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
        marginBottom: 20,
    },
    searchInput: {
        flex: 1,
        height: 40,
        borderColor: colors.primary,
        borderWidth: 1,
        borderRadius: 8,
        paddingHorizontal: 10,
        marginRight: 10,
    },
    buttonContent: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonChallenge: {
        backgroundColor: colors.primary,
        paddingVertical: 10,
        paddingHorizontal: 15,
        borderRadius: 8,
        justifyContent: 'center',
        shadowColor: colors.shadowColor,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 5,
        elevation: 5,
    },
    friendsContainer: {
        width: '100%',
        justifyContent: 'space-between',
        backgroundColor: colors.primary,
        marginVertical: 15,
        padding: 10,
        flexDirection: 'row',
        alignItems: 'center',
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 6,
        elevation: 3,
    },
    buttonText: {
        color: '#fff',
        fontWeight: 'bold',
    },
    middle: {
        marginTop: 20,
        width: '100%',
        alignItems: 'center',
    },
    image: {
        width: '100%',
        height: 200,
        resizeMode: 'cover',
        borderRadius: 15,
    },
    text: {
        fontSize: 15,
        fontWeight: 'bold',
    },
    feed: {
        width: '50%',
        backgroundColor: colors.primary,
        paddingVertical: 10,
        paddingHorizontal: 15,
        borderRadius: 8,
        justifyContent: 'center',
        shadowColor: colors.shadowColor,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 5,
        elevation: 5,
        alignItems: 'center',

    },
});

export default International;
