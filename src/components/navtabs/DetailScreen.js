// DetailScreen.js
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const DetailScreen = ({ route }) => {
  const { itemId } = route.params;
  const [itemData, setItemData] = useState(null);

  useEffect(() => {
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
        }
      } catch (error) {
        console.error('Error fetching item data:', error);
        // Handle errors, perhaps set some state to show an error message
      }
    };

    fetchItemData();
  }, [itemId]);

  return (
    <View style={styles.container}>
      {itemData ? (
        <Text>{itemData.item}</Text>
        // Render more details of itemData here
      ) : (
        <Text>Loading...</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default DetailScreen;
