// EditFoodScreen.js
import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert, TouchableOpacity, SafeAreaView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import RNPickerSelect from 'react-native-picker-select';
import { useFonts, PlusJakartaSans_500Medium, PlusJakartaSans_400Regular, PlusJakartaSans_600SemiBold } from '@expo-google-fonts/plus-jakarta-sans';
import { Entypo } from '@expo/vector-icons';
import EmojiSelector, { Categories } from 'react-native-emoji-selector';

const EditFoodScreen = ({ route, navigation }) => {
  const { itemId, currentName, currentCategory, currentMinFreshness, currentMaxFreshness, currentEmoji } = route.params;
  const [name, setName] = useState(currentName);
  const [minFreshness, setMinFreshness] = useState(currentMinFreshness ? currentMinFreshness.toString() : '');
  const [maxFreshness, setMaxFreshness] = useState(currentMaxFreshness ? currentMaxFreshness.toString() : '');
  const [category, setCategory] = useState(currentCategory);
  const [emojiSelectorVisible, setEmojiSelectorVisible] = useState(false);
  const [emoji, setEmoji] = useState(currentEmoji);

  const categories = ["Fruits", "Vegetables", "Meat", "Seafood", "Dairy", "Bakery","Dry Goods and Pasta", "Snacks", "Sweets", "Beverages" ];

  const saveItemDetails = async () => {
    if (!category) {
      // Display an error alert to the user
      Alert.alert("Error", "Please select a category");
      return; // Exit the function to prevent further execution
    }
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
                itemUpdated = { ...item, item: name, category: category, emoji: emoji, freshness_duration_min: parseInt(minFreshness, 10), freshness_duration_max: parseInt(maxFreshness, 10) };
                return itemUpdated; // Update item with new values
              } else {
                return { ...item, item: name, freshness_duration_min: parseInt(minFreshness, 10), freshness_duration_max: parseInt(maxFreshness, 10), emoji: emoji };
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

  const deleteItem = async () => {
    try {
      const storedData = await AsyncStorage.getItem('categorizedItems');
      if (storedData !== null) {
        let allCategories = JSON.parse(storedData);

        // Loop through each category to find the item and remove it
        Object.keys(allCategories).forEach(catKey => {
          allCategories[catKey] = allCategories[catKey].filter(item => item.id !== itemId);
        });

        // Save the updated categories back to AsyncStorage
        await AsyncStorage.setItem('categorizedItems', JSON.stringify(allCategories));

        navigation.navigate('DetailScreen', { updatedItemId: itemId, updatedItemName: name });

        // Optionally, show a success message or navigate back
        Alert.alert("Success", "Item name updated successfully");
        navigation.goBack(); // Go back to the previous screen
      }
    } catch (error) {
      console.error('Error deleting the item:', error);
      Alert.alert("Error", "Failed to delete the item");
    }
  };

  let [fontsLoaded] = useFonts({
    PlusJakartaSans_500Medium,
    PlusJakartaSans_400Regular,
    PlusJakartaSans_600SemiBold,
  });
  
  if (!fontsLoaded) {
    return null;
  }

  return (
    <SafeAreaView style={[styles.safeView,{ flex: 1 }]}>
      <View style={styles.container}>
        <View style={styles.editEmojiContainer}>
          <View style={styles.editEmojiBox}>
            {/* <Text style={styles.emojiStyle}>{currentEmoji}</Text> */}
            <Text style={styles.emojiStyle}>{emoji}</Text>
          </View>
          <View style={styles.editEmojiButton}>
          <TouchableOpacity onPress={() => setEmojiSelectorVisible(!emojiSelectorVisible)}>
            <Text style={styles.editEmojiText}>Change Emoji</Text>
          </TouchableOpacity>
          {emojiSelectorVisible && (
          <EmojiSelector
            onEmojiSelected={emoji => {
              setEmoji(emoji);
              setEmojiSelectorVisible(false);
            }}
            // showSearchBar={false}
            category={Categories.food}
          />
            )}
          </View>
        </View>
        <View style={styles.editNameBox}>
          <Text style={[styles.label, { fontFamily: 'PlusJakartaSans_600SemiBold' }]}>Item Name:</Text>
          <TextInput
            style={styles.input}
            onChangeText={setName}
            value={name}
          />
        </View>
        <View style={styles.editNameBox}>
          <Text style={[styles.label, { fontFamily: 'PlusJakartaSans_600SemiBold' }]}>Category:</Text>
          <RNPickerSelect
              onValueChange={(value) => setCategory(value)}
              items={categories.map(cat => ({ label: cat, value: cat }))}
              placeholder={{ label: 'Select a category...', value: null }}
              style={pickerSelectStyles}
              value={category} 
            />
        </View>
        <View style={styles.editFreshBox}>
          <Text style={[styles.label, { fontFamily: 'PlusJakartaSans_600SemiBold' }]}>Days Fresh For:</Text>
            <View style={styles.freshBoxWrapper}>
              <View style={styles.editMinBox}>
                <TextInput
                    style={styles.freshForInput}
                    onChangeText={setMinFreshness}
                    value={minFreshness}
                    keyboardType="numeric"
                  />
              </View>
              <View style={styles.editMaxBox}>
                <TextInput
                  style={styles.freshForInput}
                  onChangeText={setMaxFreshness}
                  value={maxFreshness}
                  keyboardType="numeric"
                />
              </View>
            </View>
        </View>
        {/* <Button
          title="Save"
          onPress={saveItemDetails}
        /> */}
        <TouchableOpacity style={styles.saveButton} onPress={saveItemDetails} >
          <Text style={styles.saveButtonText}>Save</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={deleteItem}>
          <Text style={styles.deleteButtonText}>Delete</Text>
        </TouchableOpacity>
        {/* <Button
          title="Delete"
          onPress={deleteItem}
        /> */}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeView: {
    backgroundColor: '#FBFBFB',
    flex: 1,
  },
  container: {
    flex: 1,
    // justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  editNameBox: {
    width: '100%',
    marginBottom: 12,
  },
  freshBoxWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  editFreshBox: {
    width: '100%',
    // maxWidth: 180,
    marginBottom: 12,
  },
  editMinBox: {
    width: '100%',
    maxWidth: 180,
  },
  editMaxBox: {
    width: '100%',
    maxWidth: 180,
  },
  freshForInput: {
    height: 40,
    width: '100%',
    borderWidth: 1,
    marginBottom: 12,
    paddingHorizontal: 8,
    fontFamily: 'PlusJakartaSans_500Medium',
    backgroundColor: '#ffffff',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#e9e9e9',
    fontSize: 18,
    color: '#163C16',
    textAlign: 'center',
  },
  label: {
    marginBottom: 8,
    color: '#163C16',
    fontSize: 14,
  },
  input: {
    height: 40,
    width: '100%',
    borderWidth: 1,
    marginBottom: 12,
    paddingHorizontal: 8,
    fontFamily: 'PlusJakartaSans_500Medium',
    backgroundColor: '#ffffff',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#e9e9e9',
    fontSize: 18,
    color: '#163C16',
  },
  picker: {
    height: 50, // Make sure this height is enough
    width: '100%',
    backgroundColor: 'lightblue',
    marginBottom: 12,
  },
  saveButton: {
    padding: 15,
    marginBottom: 12,
    width: '100%',
    borderRadius: 44,
    borderWidth: 1,
    borderColor: '#168715',
    backgroundColor: '#168715',
    shadowColor: '#171717',
    shadowOffset: {width: -2, height: 4},
    shadowOpacity: 0.2,
    shadowRadius: 3,
    maxWidth: 300,
  },
  saveButtonText: {
    color: '#ffffff',
    fontFamily: 'PlusJakartaSans_600SemiBold',
    textAlign: 'center',
    fontSize: 20,
  },
  deleteButtonText: {
    color: '#FF0000',
    padding: 10,
    borderRadius: 5,
    fontFamily: 'PlusJakartaSans_600SemiBold',
    textAlign: 'center',
    fontSize: 14,
  },
  editEmojiContainer: {
    alignItems: 'center',
  },
  editEmojiBox: {
    // width: '100%',
    marginBottom: 12,
    backgroundColor: '#ffffff',
    borderRadius: '50%',
    borderWidth: 1,
    borderColor: '#e9e9e9',
    padding: 10,
    height: 100,
    width: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emojiStyle: {
    fontSize: 60,
    textAlign: 'center',
    // margin: 10,
  },
  editEmojiText: {
    marginBottom: 8,
    color: '#007AFF',
    fontSize: 14,
    textAlign: 'center',
    fontFamily: 'PlusJakartaSans_600SemiBold',
  },
  emojiSelector: {
    height: 100,
  },
});
const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
      height: 40,
      width: '100%',
      borderWidth: 1,
      marginBottom: 12,
      paddingHorizontal: 8,
      fontFamily: 'PlusJakartaSans_500Medium',
      backgroundColor: '#ffffff',
      borderRadius: 10,
      borderWidth: 1,
      borderColor: '#e9e9e9',
      fontSize: 18,
      color: '#163C16',
  },
  inputAndroid: {
      fontSize: 16,
      paddingHorizontal: 10,
      paddingVertical: 8,
      borderWidth: 0.5,
      borderColor: 'purple',
      borderRadius: 8,
      color: 'black',
      paddingRight: 30, // to ensure the text is never behind the icon
  },
  RNPickerSelect: {
    height: 40,
    width: '100%',
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 12,
    paddingHorizontal: 8,
    fontFamily: 'PlusJakartaSans_500Medium',
    backgroundColor: '#ffffff',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#e9e9e9',
  },
});

export default EditFoodScreen;
