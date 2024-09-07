import React, { useEffect, useContext, useState } from 'react';
import { Dimensions, StyleSheet, View, FlatList, Text, Image, Button } from 'react-native';
import colors from '../data/colors';
import { ImageSlider } from '../data/SliderData'; // Assuming you have a data source for images
import SliderItem from '../components/SliderItem';
const { width } = Dimensions.get('window');
import AntDesign from '@expo/vector-icons/AntDesign';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import axios from 'axios';
import { Config } from '../apiService';
import { UserContext } from '../Context/UserContext';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { useNavigation } from '@react-navigation/native';

// Function to scale sizes based on screen size
const scale = (size) => (width / 375) * size; // 375 is a base width (like iPhone 11)

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
          console.log(response.data.id);
          setId(response.data.id);
          setDataProfile(response.data);
        }
      } catch (error) {
        console.log("Error getting profile:", error.message);
      }
    };

    fetchProfile();
  }, [username, password]);
  const handlNavigation = () => {
    console.log("hi")
    navigation.navigate('QuizList');
  }
  return (
    <View style={styles.container}>
      <FlatList
        data={ImageSlider} // The array of objects from SliderData
        renderItem={({ item, index }) => (
          <SliderItem item={item} index={index} />
        )}
        keyExtractor={(item, index) => index.toString()}
        horizontal
        showsHorizontalScrollIndicator={false}
        pagingEnabled
        style={styles.slider}
      />

      <View style={styles.cardContainer}>
        <View style={styles.card}>
          <AntDesign name="barchart" size={40} color={colors.icon} />
          <Text style={styles.cardValue}>grow up</Text>
          <Text style={styles.cardTitle}> Embrace the journey of growth with open arms </Text>
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
          <Button title='Start Quiz' color={colors.primary} onPress={handlNavigation} />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: colors.background, // Dynamic background color
  },
  buttonContainer: {
    width: '100%',
    flex: 1,
    marginHorizontal: scale(10),
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
    marginBottom: scale(1),
  },
  cardContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: '90%',
    flexWrap: 'wrap', // Allow cards to wrap to the next line if needed
  },
  card: {
    width: width * 0.42, // Set the width of the card as a percentage of the screen width
    aspectRatio: 1, // Make the card a square
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
    borderColor: colors.icon, // Set the border color from the colors object
    borderWidth: 2, // Set the border width (adjust as needed)
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
    width: width * 0.42, // Set the width of the profile card as a percentage of the screen width
    aspectRatio: 1, // Make the card a square
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
