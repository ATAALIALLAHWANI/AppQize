import React, { useEffect, useContext, useState } from 'react';
import { Dimensions, StyleSheet, View, FlatList, Text, Image, Button } from 'react-native';
import colors from '../data/colors';
import { ImageSlider } from '../data/SliderData';
import SliderItem from '../components/SliderItem';
import AntDesign from '@expo/vector-icons/AntDesign';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import axios from 'axios';
import { Config } from '../apiService';
import { UserContext } from '../Context/UserContext';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { useNavigation } from '@react-navigation/native';

const { width } = Dimensions.get('window');

const scale = (size) => (width / 375) * size;

function Home() {
  const [dataProfile, setDataProfile] = useState(null);
  const { username, password } = useContext(UserContext);
  const { setId } = useContext(UserContext);
  const navigation = useNavigation();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axios.get(`${Config.API_URL1}profile`, {
          params: { username, password },
        });
        if (response.status === 200) {
          setId(response.data.id);
          setDataProfile(response.data);
        }
      } catch (error) {
        console.log("Error getting profile:", error.message);
      }
    };

    fetchProfile();
  }, [username, password]);

  const handleNavigation = () => {
    navigation.navigate('QuizList');
  };

  return (
    <View style={styles.container}>
      <View style={styles.itemContainer}>
        <FlatList
          data={ImageSlider}
          renderItem={({ item, index }) => (
            <SliderItem item={item} index={index} />
          )}
          keyExtractor={(item, index) => index.toString()}
          horizontal
          showsHorizontalScrollIndicator={false}
          pagingEnabled
          style={styles.slider}
        />
      </View>

      <View style={styles.cardContainer}>
        <View style={styles.card}>
          <AntDesign name="barchart" size={40} color={colors.icon} />
          <Text style={styles.cardValue}>Grow Up</Text>
          <Text style={styles.cardTitle}>Embrace the journey of growth with open arms</Text>
        </View>

        <View style={styles.card}>
          <FontAwesome5 name="uncharted" size={40} color={colors.icon} />
          <Text style={styles.cardValue}>Doing</Text>
        </View>

        <View style={styles.profileCard}>
          <Image source={{ uri: 'https://example.com/profile.jpg' }} style={styles.profileImage} />
          {dataProfile ? (
            <>
              <MaterialIcons name="lock-person" size={40} color={colors.icon} />
              <Text style={styles.profileName}>{dataProfile.username}</Text>
              <Text style={styles.profileHandle}>{dataProfile.email}</Text>
            </>
          ) : (
            <Text style={styles.cardTitle}>Loading Profile...</Text>
          )}
        </View>
      </View>

      <View style={styles.buttonContainer}>
        <View style={styles.button}>
          <Button title='Start Quiz' color={colors.primary} onPress={handleNavigation} />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: colors.background,
  },
  itemContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  buttonContainer: {
    width: '100%',
    flex: 1,
    borderRadius: scale(5),
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    width: '50%',
    backgroundColor: colors.icon,
    justifyContent: 'center',
  },
  slider: {
    marginBottom: scale(10),
  },
  cardContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: '90%',
    flexWrap: 'wrap',
  },
  card: {
    width: width * 0.42,
    aspectRatio: 1,
    padding: scale(10),
    borderRadius: scale(10),
    backgroundColor: colors.background,
    justifyContent: 'center',
    alignItems: 'center',
    margin: scale(5),
    shadowColor: colors.shadowColor,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: scale(10),
    elevation: 2,
    borderColor: colors.icon,
    borderWidth: 2,
  },
  cardTitle: {
    fontSize: scale(14),
    color: '#888',
    textAlign: 'center',
  },
  cardValue: {
    fontSize: scale(20),
    fontWeight: 'bold',
    color: '#000',
    textAlign: 'center',
  },
  profileCard: {
    width: width * 0.42,
    aspectRatio: 1,
    padding: scale(10),
    borderRadius: scale(10),
    backgroundColor: '#f0f0f0',
    justifyContent: 'center',
    alignItems: 'center',
    margin: scale(5),
    shadowColor: colors.shadowColor,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: scale(10),
    elevation: 2,
  },
  profileImage: {
    width: scale(50),
    height: scale(50),
    borderRadius: scale(25),
    marginBottom: scale(10),
  },
  profileName: {
    fontSize: scale(16),
    fontWeight: 'bold',
  },
  profileHandle: {
    fontSize: scale(14),
    color: '#888',
  },
});

export default Home;
