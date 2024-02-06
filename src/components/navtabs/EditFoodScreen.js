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


  const saveItemDetails = async () => {
    try {
      const storedData = await AsyncStorage.getItem('categorizedItems');
      if (storedData !== null) {
        let categories = JSON.parse(storedData);

        // Loop through each category to find the item and update its name
        Object.keys(categories).forEach(category => {
          categories[category] = categories[category].map(item => {
            if (item.id === itemId) {
              return { ...item, item: name, freshness_duration_min: parseInt(minFreshness, 10), freshness_duration_max: parseInt(maxFreshness, 10) };
            }
            return item;
          });
        });

        // Save the updated categories back to AsyncStorage
        await AsyncStorage.setItem('categorizedItems', JSON.stringify(categories));

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

    //   <Button
    //     title="Save"
    //     onPress={saveName}
    //   />
    // </View>
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
