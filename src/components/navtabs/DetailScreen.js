// DetailScreen.js
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Modal, Image } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { FontAwesome } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { Octicons } from '@expo/vector-icons';
import { useFonts, PlusJakartaSans_500Medium, PlusJakartaSans_400Regular, PlusJakartaSans_600SemiBold, PlusJakartaSans_700Bold, PlusJakartaSans_800ExtraBold } from '@expo-google-fonts/plus-jakarta-sans';
import { AntDesign } from '@expo/vector-icons';

const DetailScreen = ({ route }) => {
  const { itemId, category} = route.params;
  const [itemData, setItemData] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);

  useEffect(() => {
    console.log(itemData);
    const fetchItemData = async () => {
      try {
        const storedData = await AsyncStorage.getItem('categorizedItems');
        if (storedData) {
          const categories = JSON.parse(storedData);
          // Assuming 'categories' is an object where each key is a category that contains an array of items
          let foundItem = null;
          for (const key in categories) {
            foundItem = categories[key].find(item => item.id === itemId);
            if (foundItem) {
              break; // Found the item, no need to continue searching
            }
          }
          setItemData(foundItem);
          console.log(itemData);
        }
      } catch (error) {
        console.error('Error fetching item data:', error);
        // Handle errors, perhaps set some state to show an error message
      }
    };

    fetchItemData();
  }, [itemId]);

  const navigation = useNavigation();
  useEffect(() => {
    if (itemData) {
      navigation.setOptions({
        headerRight: () => (
          <TouchableOpacity
            onPress={() => navigation.navigate('EditFoodScreen', { itemId: itemData.id, currentName: itemData.item, currentCategory: itemData.category, currentMinFreshness: itemData.freshness_duration_min, currentMaxFreshness: itemData.freshness_duration_max, currentEmoji: itemData.emoji })}
            style={{ flexDirection: 'row', alignItems: 'center', paddingRight: 10 }}
          >
            <Octicons name="pencil" size={24} color="#168715" />
            <Text style={{ marginLeft: 5, color: '#168715', fontSize: 16 }}>Edit</Text>
          </TouchableOpacity>
        ),
      });
    }
  }, [navigation, itemData]);

  const toggleModal = () => {
    setIsModalVisible(!isModalVisible);
  };  

  const getCarbonImpactColor = (carbonImpact) => {
    switch (carbonImpact.toLowerCase()) {
      case 'low':
        return '#168715';
      case 'medium':
        return '#FF8A00';
      case 'high':
        return '#F00000';
    }
  };

  const getFreshnessColor = (minDays, maxDays) => {
    // Assuming you want to base the color on the minimum freshness duration
    if (maxDays <= 3) {
        return '#E41C1C'; // Red for 0-3 days
    } else if (maxDays <= 5) {
        return '#F78908'; // Orange for 3-5 days
    } else {
        return '#168715'; // DarkGreen for above 5 days
    }
  };   

  let [fontsLoaded] = useFonts({
    PlusJakartaSans_500Medium,
    PlusJakartaSans_400Regular,
    PlusJakartaSans_600SemiBold,
    PlusJakartaSans_700Bold,
    PlusJakartaSans_800ExtraBold,
  });

  if (!fontsLoaded) {
      return null;
  }

  if (!itemData) {
    return (
      <View style={styles.loadingContainer}>
        <Text>Loading...</Text>
      </View>
    );
  }
  const carbonImpactColor = getCarbonImpactColor(itemData.carbon_impact);

  return (
    <ScrollView style={styles.mainContainer}>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.emoji}>{itemData.emoji}</Text>
            <View style={styles.nameCategory}>
              <Text style={styles.title}>{itemData.item}</Text>
              <Text style={styles.category}>{itemData.category}</Text>
            </View>
        </View>
        {itemData.freshness_duration_max <= 3 && (
        <View style={styles.brocContainer}>
          <Image style={styles.brocImage} source={require('./../../../assets/brocRight.png')}/>
          <View style={styles.brocTextBox}>
            <Text style={styles.brocText}>⚠️ Check before you eat!</Text>
            <Text style={styles.brocTextContainer}>Based on Broc's calculation of average freshness ranges, this item may not be fresh any longer.</Text>
          </View>
        </View>
        )}
        <View style={styles.details}>
          <View style={styles.freshness}>
            <Text style={styles.freshFor}>Fresh For: </Text>
            <Text style={[styles.freshForDays, { color: getFreshnessColor(itemData.freshness_duration_min, itemData.freshness_duration_max) }]}>{itemData.freshness_duration_min} - {itemData.freshness_duration_max} days</Text>
            {/* <Text style={[styles.freshnessText, { color: getFreshnessColor(item.freshness_duration_min, item.freshness_duration_max) }]}></Text> */}
          </View>
          <View style={styles.impact}>
            <Text style={styles.carbonText}>Carbon Impact: </Text>
            <View style={styles.carbonIcon}>
              <Text style={[styles.carbonImpact, { color: carbonImpactColor }]}>{itemData.carbon_impact}</Text>
              <TouchableOpacity style={styles.impactIcon} onPress={toggleModal}>
                <AntDesign name="questioncircleo" size={20} color="#616774" />
              </TouchableOpacity>
            </View>
            <Modal animationType="slide" transparent={true} visible={isModalVisible} onRequestClose={toggleModal}>
              <View style={styles.centeredView}>
                <View style={styles.modalView}>
                  <View style={styles.paraG}>
                    <Text style={styles.modalTextTitle}>What is Carbon Impact?</Text>
                    <Text style={styles.modalText}>Some foods, like red meat, produce more greenhouse gases. We've simplified it: 
                    <Text style={[styles.coloredText, {color: getCarbonImpactColor('low')}]}> Low</Text>,
                    <Text style={[styles.coloredText, {color: getCarbonImpactColor('medium')}]}> Medium</Text>, or
                    <Text style={[styles.coloredText, {color: getCarbonImpactColor('high')}]}> High</Text> - so you can make better food choices for the planet! 🌍 </Text>
                  </View>
                  <Text style={styles.modalTextTitle}>What Can I Do?</Text>
                  <Text style={styles.modalText}>Take note of your food's carbon impact and choose more “
                  <Text style={[styles.coloredText, {color: getCarbonImpactColor('low')}]}>Low</Text>” options like veggies and chicken, or go organic for a chemical-free sustainable impact. Your plate has power - make it a force for good! 🍽️✨</Text>
                  <TouchableOpacity style={[styles.button, styles.buttonClose]} onPress={toggleModal}>
                    <Text style={styles.textStyle}>Ok, thanks!</Text>
                  </TouchableOpacity>
                  <Text style={styles.learnText}>Learn More</Text>
                </View>
              </View>
            </Modal>
          </View>
        </View>
        <View style={styles.storageTips}>
          <Text style={styles.storageTipsTitle}>Storage Tips</Text>
          <View style={styles.storageTipsFridge}>
            <Text style={styles.storageTipsFridgeTitle}>
            <MaterialCommunityIcons name="fridge-outline" size={24} color="black" /> Fridge
            </Text>
            <Text style={styles.storageTipsFridgeText}>
              {`1. lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud\n2. lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud `}
            </Text>
          </View>
          <View style={styles.storageTipsFreezer}>
            <Text style={styles.storageTipsFreezerTitle}>
            <FontAwesome name="thermometer-quarter" size={24} color="black" /> Freezer
            </Text>
            <Text style={styles.storageTipsFreezerText}>
            {`1. lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud\n2. lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud `}
            </Text>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    backgroundColor: '#FBFBFB',
  },
  container: {
    flex: 1,
    // justifyContent: 'center',
    // alignItems: 'center',
    backgroundColor: '#FBFBFB',
  },
  header: {
    alignItems: 'center',
    padding: 20,
  },
  nameCategory: {
    backgroundColor: '#fff',
    alignItems: 'center',
    width: 350,
    height: 150,
    display: 'flex',
    justifyContent: 'center',
    borderRadius: 20,
    shadowColor: '#171717',
    shadowOffset: {width: -2, height: 4},
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  emoji: {
    fontSize: 50,
    marginBottom: -25,
    zIndex: 1,
  },
  title: {
    fontSize: 24,
    fontFamily: 'PlusJakartaSans_600SemiBold',
  },
  category: {
    color: '#616774',
    backgroundColor: '#fff',
    borderColor: '#616774',
    borderWidth: 1,
    borderRadius: 20,
    padding: 10,
    marginTop: 10,
    fontSize: 12,
    fontFamily: 'PlusJakartaSans_700Bold',
  },
  freshness: {
    backgroundColor: '#fff',
    alignItems: 'flex-start',
    width: 160,
    height: 100,
    borderRadius: 20,
    shadowColor: '#171717',
    shadowOffset: {width: -2, height: 4},
    shadowOpacity: 0.2,
    shadowRadius: 3,
    display: 'flex',
    justifyContent: 'center',
    paddingLeft: 20,
  },
  impact: {
    backgroundColor: '#fff',
    // alignItems: 'flex-start',
    width: 160,
    height: 100,
    borderRadius: 20,
    shadowColor: '#171717',
    shadowOffset: {width: -2, height: 4},
    shadowOpacity: 0.2,
    shadowRadius: 3,
    display: 'flex',
    justifyContent: 'center',
    paddingLeft: 20,
  },
  details: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  freshFor: {
    fontSize: 14,
    fontFamily: 'PlusJakartaSans_600SemiBold',
    paddingBottom: 10,
    color: '#163C16',
  },
  freshForDays: {
    fontSize: 22,
    fontWeight: '600',
    color: '#168715',
  },
  carbonText: {
    fontSize: 14,
    fontFamily: 'PlusJakartaSans_600SemiBold',
    paddingBottom: 10,
    color: '#163C16',
  },
  carbonImpact: {
    fontSize: 22,
    fontFamily: 'PlusJakartaSans_600SemiBold',
    color: '#168715',
  },
  storageTips: {
    padding: 20,
  },
  storageTipsTitle: {
    fontSize: 18,
    fontFamily: 'PlusJakartaSans_600SemiBold',
  },
  storageTipsFridge: {
    backgroundColor: '#ffffff',
    borderRadius: 20,
    padding: 20,
    marginTop: 10,
    borderWidth: 1,
    borderColor: '#F0F0F0',
    shadowColor: '#171717',
    shadowOffset: {width: -2, height: 4},
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  storageTipsFridgeTitle: {
    fontSize: 16,
    fontFamily: 'PlusJakartaSans_600SemiBold',
    paddingBottom: 10,
  },
  storageTipsFridgeText: {
    fontSize: 14,
    fontFamily: 'PlusJakartaSans_400Regular',
  },
  storageTipsFreezer: {
    backgroundColor: '#ffffff',
    borderRadius: 20,
    padding: 20,
    marginTop: 10,
    borderWidth: 1,
    borderColor: '#F0F0F0',
    shadowColor: '#171717',
    shadowOffset: {width: -2, height: 4},
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  storageTipsFreezerTitle: {
    fontSize: 16,
    fontFamily: 'PlusJakartaSans_600SemiBold',
    paddingBottom: 10,
  },
  storageTipsFreezerText: {
    fontSize: 14,
    fontFamily: 'PlusJakartaSans_400Regular',
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalView: {
    margin: 20,
    backgroundColor: "#ffffff",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.55,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 50,
    padding: 10,
    elevation: 2,
    width: 200,
  },
  buttonClose: {
    backgroundColor: "#168715",
  },
  textStyle: {
    color: "#ffffff",
    fontFamily: 'PlusJakartaSans_600SemiBold',
    fontSize: 16,
    textAlign: "center"
  },
  modalTextTitle: {
    marginBottom: 15,
    textAlign: "center",
    fontFamily: 'PlusJakartaSans_700Bold',
    fontSize: 16,
    color: '#163C16',
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
    color: '#163C16',
    fontFamily: 'PlusJakartaSans_400Regular',
    fontSize: 14,
  },
  learnText: {
    color: '#616774',
    fontFamily: 'PlusJakartaSans_500Medium',
    fontSize: 14,
    marginTop: 10,
  },
  coloredText: {
    fontFamily: 'PlusJakartaSans_700Bold',
  },
  carbonIcon: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  impactIcon: {
    marginRight: 15,
  },
  paraG: {
    marginBottom: 20,
  },
  brocContainer: {
    backgroundColor: '#ffffff',
    padding: 10,
    borderRadius: 20,
    marginLeft: 20,
    marginRight: 20,
    flexDirection: 'row',
    alignItems: 'center',
    paddingBottom: 20,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#F0F0F0',
    shadowColor: '#171717',
    shadowOffset: {width: -2, height: 4},
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  brocImage: {
    width: 50,
    marginLeft: -10,
  },
  brocText: {
    color: '#163C16',
    fontSize: 12,
    fontFamily: 'PlusJakartaSans_700Bold',
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 20,
  },
  brocTextContainer: {
    color: '#163C16',
    fontSize: 10,
    fontFamily: 'PlusJakartaSans_500Medium',
    alignItems: 'center',
    justifyContent: 'center',
    maxWidth: 260,
    marginLeft: 20,
    marginTop: 10,
  },
});

export default DetailScreen;
