import React, { useEffect, useContext, useState } from 'react';
import { Dimensions, StyleSheet, View, FlatList, Text, Image, Button, TouchableOpacity } from 'react-native';
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
import { getToken } from '../type/storeToken';
import EvilIcons from '@expo/vector-icons/EvilIcons';
import { ScrollView } from 'react-native-gesture-handler';

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
        const token = await getToken();  // Retrieve token from AsyncStorage
        const response = await axios.get(`${Config.API_URL1}profile/GetByID`, {
          params: { idUser: token },
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
    <ScrollView style={styles.container}>
      <View style={styles.list}>
        <TouchableOpacity onPress={() => navigation.openDrawer()}>
          <EvilIcons name="navicon" size={35} color={colors.icon} />
        </TouchableOpacity>
      </View>
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
        <TouchableOpacity onPress={handleNavigation}>
          <Text style={{ fontSize: 15, color: 'white' }}> Start Quize </Text>
        </TouchableOpacity>


      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  list: {
    padding: '3%',
    justifyContent: 'flex-start',
    alignSelf: 'flex-end'
  },
  itemContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  buttonContainer: {
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
    alignSelf: 'center'
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
    alignSelf: 'center'

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
