// DetailScreen.js
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { FontAwesome } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { Octicons } from '@expo/vector-icons';

const DetailScreen = ({ route }) => {
  const { itemId, category} = route.params;
  const [itemData, setItemData] = useState(null);

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
            onPress={() => navigation.navigate('EditFoodScreen', { itemId: itemData.id, currentName: itemData.item, currentCategory: itemData.category, currentMinFreshness: itemData.freshness_duration_min, currentMaxFreshness: itemData.freshness_duration_max })}
            style={{ flexDirection: 'row', alignItems: 'center', paddingRight: 10 }}
          >
            <Octicons name="pencil" size={24} color="#168715" />
            <Text style={{ marginLeft: 5, color: '#168715', fontSize: 16 }}>Edit</Text>
          </TouchableOpacity>
        ),
      });
    }
  }, [navigation, itemData]);

  const getCarbonImpactColor = (carbonImpact) => {
    switch (carbonImpact.toLowerCase()) {
      case 'low':
        return '#7CC106';
      case 'medium':
        return '#FF8A00';
      case 'high':
        return '#F00000';
    }
  };

  if (!itemData) {
    return (
      <View style={styles.loadingContainer}>
        <Text>Loading...</Text>
      </View>
    );
  }
  const carbonImpactColor = getCarbonImpactColor(itemData.carbon_impact);

  return (
    <ScrollView>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.emoji}>{itemData.emoji}</Text>
            <View style={styles.nameCategory}>
              <Text style={styles.title}>{itemData.item}</Text>
              <Text style={styles.category}>{category}</Text>
            </View>
        </View>
        <View style={styles.details}>
          <View style={styles.freshness}>
            <Text style={styles.freshFor}>Fresh For: </Text>
            <Text style={styles.freshForDays}>{itemData.freshness_duration_min} - {itemData.freshness_duration_max} days</Text>
          </View>
          <View style={styles.impact}>
            <Text style={styles.carbonText}>Carbon Impact: </Text>
            <Text style={[styles.carbonImpact, { color: carbonImpactColor }]}>{itemData.carbon_impact}</Text>
          </View>
        </View>
        <View style={styles.storageTips}>
          <Text style={styles.storageTipsTitle}>Storage Tips</Text>
          <View style={styles.storageTipsFridge}>
            <Text style={styles.storageTipsFridgeTitle}>
            <MaterialCommunityIcons name="fridge-outline" size={24} color="black" /> Fridge
            </Text>
            <Text style={styles.storageTipsFridgeText}>
              lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
            </Text>
          </View>
          <View style={styles.storageTipsFreezer}>
            <Text style={styles.storageTipsFreezerTitle}>
            <FontAwesome name="thermometer-quarter" size={24} color="black" /> Freezer
            </Text>
            <Text style={styles.storageTipsFreezerText}>
              lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
            </Text>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: 'center',
    // alignItems: 'center',
  },
  header: {
    alignItems: 'center',
    padding: 20,
  },
  nameCategory: {
    backgroundColor: '#fff',
    alignItems: 'center',
    width: 400,
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
    fontWeight: 'bold',
  },
  category: {
    color: 'green',
    backgroundColor: '#fff',
    borderColor: 'green',
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
    marginTop: 10,
    fontSize: 14,
  },
  freshness: {
    backgroundColor: '#fff',
    alignItems: 'flex-start',
    width: 180,
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
    alignItems: 'flex-start',
    width: 180,
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
    fontSize: 18,
    fontWeight: '600',
    paddingBottom: 10,
  },
  freshForDays: {
    fontSize: 22,
    fontWeight: '600',
    color: '#7CC106',
  },
  carbonText: {
    fontSize: 18,
    fontWeight: '600',
    paddingBottom: 10,
  },
  carbonImpact: {
    fontSize: 22,
    fontWeight: '600',
    color: '#7CC106',
  },
  storageTips: {
    padding: 20,
  },
  storageTipsTitle: {
    fontSize: 18,
    fontWeight: 'semi-bold',
  },
  storageTipsFridge: {
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 20,
    marginTop: 10,
  },
  storageTipsFridgeTitle: {
    fontSize: 18,
    fontWeight: 'semi-bold',
    paddingBottom: 10,
  },
  storageTipsFridgeText: {
    fontSize: 16,
  },
  storageTipsFreezer: {
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 20,
    marginTop: 10,
  },
  storageTipsFreezerTitle: {
    fontSize: 18,
    fontWeight: 'semi-bold',
    paddingBottom: 10,
  },
  storageTipsFreezerText: {
    fontSize: 16,
  },
});

export default DetailScreen;
