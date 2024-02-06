// EditFoodScreen.js
import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const EditFoodScreen = ({ route, navigation }) => {
  const { itemId, currentName, currentCategory, currentMinFreshness, currentMaxFreshness } = route.params;
  const [name, setName] = useState(currentName);
  const [minFreshness, setMinFreshness] = useState(currentMinFreshness ? currentMinFreshness.toString() : '');
  const [maxFreshness, setMaxFreshness] = useState(currentMaxFreshness ? currentMaxFreshness.toString() : '');
  const [category, setCategory] = useState(currentCategory);

  // const categories = ["Fruits", "Vegetables", "Meat", "Seafood", "Dairy", "Bakery","Dry Goods and Pasta", "Snacks", "Sweets", "Beverages" ];

  const saveItemDetails = async () => {
    try {
      const storedData = await AsyncStorage.getItem('categorizedItems');
      if (storedData !== null) {
        let allCategories = JSON.parse(storedData);

        let itemUpdated = false;

        // Loop through each category to find the item and update its name
        Object.keys(allCategories).forEach(catKey => {
          allCategories[catKey] = allCategories[catKey].map(item => {
            if (item.id === itemId) {
              if (item.category !== category) {
                itemUpdated = { ...item, item: name, category: category, freshness_duration_min: parseInt(minFreshness, 10), freshness_duration_max: parseInt(maxFreshness, 10) };
                return itemUpdated; // Update item with new values
              } else {
                return { ...item, item: name, freshness_duration_min: parseInt(minFreshness, 10), freshness_duration_max: parseInt(maxFreshness, 10) };
              }
            }
            return item; // Keep other items as is
          });
        });

        // If the item was updated and removed from its original category, remove it from the old category
        if (itemUpdated) {
          Object.keys(allCategories).forEach(catKey => {
            allCategories[catKey] = allCategories[catKey].filter(item => item.id !== itemId);
          });
          if (!allCategories[category]) {
            allCategories[category] = []; // Create the category if it doesn't exist
          }
          allCategories[category].push(itemUpdated);
        }
        // Save the updated categories back to AsyncStorage
        await AsyncStorage.setItem('categorizedItems', JSON.stringify(allCategories));

        // navigation.goBack({
        //   updatedItemId: itemId,
        //   updatedItemName: name,
        // });
        navigation.navigate('DetailScreen', { updatedItemId: itemId, updatedItemName: name });

        // Optionally, show a success message or navigate back
        Alert.alert("Success", "Item name updated successfully");
        navigation.goBack(); // Go back to the previous screen
      }
    } catch (error) {
      console.error('Error saving the updated name:', error);
      Alert.alert("Error", "Failed to update the item name");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Edit Name:</Text>
      <TextInput
        style={styles.input}
        onChangeText={setName}
        value={name}
      />
      <Text style={styles.label}>Edit Category:</Text>
      <TextInput
        style={styles.input}
        onChangeText={setCategory}
        value={category}
      />
      <Text style={styles.label}>Edit Min Freshness Duration:</Text>
      <TextInput
        style={styles.input}
        onChangeText={setMinFreshness}
        value={minFreshness}
        keyboardType="numeric"
      />
      <Text style={styles.label}>Edit Max Freshness Duration:</Text>
      <TextInput
        style={styles.input}
        onChangeText={setMaxFreshness}
        value={maxFreshness}
        keyboardType="numeric"
      />
      <Button
        title="Save"
        onPress={saveItemDetails}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  label: {
    marginBottom: 8,
  },
  input: {
    height: 40,
    width: '100%',
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 12,
    paddingHorizontal: 8,
  },
});

export default EditFoodScreen;
