// EditFoodScreen.js
import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const EditFoodScreen = ({ route, navigation }) => {
  const { itemId, currentName } = route.params;
  const [name, setName] = useState(currentName);

  const saveName = async () => {
    try {
      const storedData = await AsyncStorage.getItem('categorizedItems');
      if (storedData !== null) {
        let categories = JSON.parse(storedData);

        // Loop through each category to find the item and update its name
        Object.keys(categories).forEach(category => {
          categories[category] = categories[category].map(item => {
            if (item.id === itemId) {
              return { ...item, item: name }; // Update the name of the item
            }
            return item;
          });
        });

        // Save the updated categories back to AsyncStorage
        await AsyncStorage.setItem('categorizedItems', JSON.stringify(categories));

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
      <Button
        title="Save"
        onPress={saveName}
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
