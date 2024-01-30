import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const RecipeIdeas = () => {
  const navigation = useNavigation(); // Initialize the navigation hook

  return (
    <View>
      <View>
        <Text>Recipe Ideas Here</Text>
      </View>
      <TouchableOpacity
        style={styles.generateButton} onPress={() => navigation.navigate('NewRecipeScreen')} >
        <Text style={styles.generateButtonText}>Generate Recipes</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  generateButton: {
    backgroundColor: '#7CC106',
    padding: 10,
    borderRadius: 10,
    margin: 10,
  },
  generateButtonText: {
    color: 'white',
    textAlign: 'center',
    fontSize: 20,
  },
});

export default RecipeIdeas;
