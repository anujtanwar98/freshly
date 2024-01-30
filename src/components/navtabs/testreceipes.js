import React, { useState, useEffect } from 'react';
import { View, Text, SafeAreaView, StyleSheet, TouchableOpacity, ScrollView, ActivityIndicator } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Image } from 'react-native';
import axios from 'axios';
import GenRec from './genRecipeSvg';

const Recipes = () => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [recipe, setRecipe] = useState('');

  const foodCategories = ['Breakfast', 'Lunch', 'Dinner', 'Snack', 'Dessert'];

  const fetchRecipe = async (category) => {
    setIsLoading(true);
    setSelectedCategory(category);
    setRecipe(''); // Clear previous recipe
    try {
      const response = await axios.post('http://127.0.0.1:5000/generate-recipe', {
        category: category
      });
      setRecipe(response.data.recipe);
    } catch (error) {
      console.error('Error fetching recipe:', error);
      // Handle the error (e.g., show an alert or a message)
    } finally {
      setIsLoading(false);
    }
  };
    return (
    <SafeAreaView>
      <ScrollView>
        <View style={styles.mainWrapper}>
          <View style={styles.container}>
            <Text style={styles.text}>What do you want to eat?</Text>
          </View>
          <View style={styles.brocContainer}>
            <Text style={styles.brocTextContainer}>Select a meal type and tap generate to see what Broc can make from your food inventory!</Text>
            <Image style={styles.brocImage} source={require('./../../../assets/broc.png')}/>
          </View>
          <View style={styles.mainCard}>
            <View style={styles.allCardContain}>
              <TouchableOpacity style={[ styles.breakfastButton, styles.foodButton, selectedCategory === 'Breakfast' && styles.selectedCategoryButton ]} onPress={() => fetchRecipe('Breakfast')}>
                <Text style={styles.buttonEmojiText}>🍳</Text>
                <Text style={styles.buttonText}>Breakfast</Text>
              </TouchableOpacity>
              <TouchableOpacity style={[ styles.lunchButton, styles.foodButton, selectedCategory === 'Lunch' && styles.selectedCategoryButton ]} onPress={() => fetchRecipe('Lunch')} >
                <Text style={styles.buttonEmojiText}>🥪</Text>
                <Text style={styles.buttonText}>Lunch</Text>
              </TouchableOpacity>
              <TouchableOpacity style={[styles.dinnerButton , styles.foodButton, selectedCategory === 'dinner' && styles.selectedCategoryButton ]} onPress={() => fetchRecipe('Dinner')} >
                <Text style={styles.buttonEmojiText}>🍝</Text>
                <Text style={styles.buttonText}>Dinner</Text>
              </TouchableOpacity>
              <TouchableOpacity style={[styles.snackButton, styles.foodButton, selectedCategory === 'Snack' && styles.selectedCategoryButton ]} onPress={() => fetchRecipe('Snack')} >
                <Text style={styles.buttonEmojiText}>🥨</Text>
                <Text style={styles.buttonText}>Snack</Text>
              </TouchableOpacity>
              <TouchableOpacity style={[styles.DessertButton, styles.foodButton, selectedCategory === 'Dessert' && styles.selectedCategoryButton ]} onPress={() => fetchRecipe('Dessert')} >
                <Text style={styles.buttonEmojiText}>🍰</Text>
                <Text style={styles.buttonText}>Dessert</Text>
              </TouchableOpacity>
            </View>
            <TouchableOpacity style={[ styles.generateButton, selectedCategory ? styles.generateButtonActive : styles.generateButtonInactive ]} onPress={() => {
            if (selectedCategory) {
              fetchRecipe(selectedCategory);
            } else {
              // Show an error message if no category is selected
              alert('Please select a category first.');
            } 
            }} 
            >
              <Text style={styles.generateButtonText}><GenRec size={24} color="black" /> Generate Recipes</Text>
            </TouchableOpacity>
          </View>
        </View>
        {/* {isLoading && <ActivityIndicator size="large" color="#0000ff" />}
        {!isLoading && recipe && (
          <View style={styles.recipeContainer}>
            <Text style={styles.recipeText}>{recipe}</Text>
          </View>
        )} */}
        <View style={styles.recipeContainer}>
            <Text style={styles.recipeText}>{recipe}</Text>
          </View>
      </ScrollView>
    </SafeAreaView>
);
}

const styles = StyleSheet.create({
  mainWrapper: {
    flex: 1,
  },
  container: {
    flex: 1,
    backgroundColor: '#F3F3F3',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    paddingHorizontal: 20,
  },
  text: {
    color: '#7CC106',
    fontSize: 24,
    fontWeight: 'bold',
  },
  icon: {
    color: '#000',
    fontSize: 26,
    alignItems: 'center',
  },
  brocContainer: {
    flex: 1,
    backgroundColor: '#D9F2AF',
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginLeft: 20,
    marginTop: 20,
    borderTopLeftRadius: 20,
    borderBottomLeftRadius: 20,
    // height: 120,
  },
  brocTextContainer: {
    color: '#000000',
    fontSize: 14,
    fontWeight: '500',
    marginLeft: 20,
    alignItems: 'center',
    justifyContent: 'center',
    maxWidth: 300,
  },
  mainCard: {
    height: 800,
  },
  allCardContain: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    alignItems: 'flex-start',
    paddingHorizontal: 8,
    marginHorizontal: 10,
    marginTop: 20,
    marginBottom: 20,
    marginLeft: 20,
    marginRight: 20,
    gap: 20,
  },
  foodButton: {
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 20,
    flexDirection: 'column',
    justifyContent: 'space-around',
    alignItems: 'center',
    width: 170,
    height: 150,
  },
  buttonEmojiText: {
    fontSize: 50,
  },
  buttonText: {
    fontSize: 20,
    fontWeight: '500',
  },
  generateButton: {
    // backgroundColor: '#E0E0E0',
    padding: 10,
    borderRadius: 50,
    flexDirection: 'column',
    justifyContent: 'space-around',
    alignItems: 'center',
    width: 300,
    height: 50,
    alignSelf: 'center',
  },
  generateButtonText: {
    fontSize: 20,
    fontWeight: '500',
    color: '#fff',
  },
  selectedCategoryButton: {
    borderColor: '#7CC106',
    borderWidth: 2,
    backgroundColor: '#D9F2AF',
  },
  generateButtonActive: {
    backgroundColor: '#7CC106', // Active color when a category is selected
  },
  generateButtonInactive: {
    backgroundColor: '#E0E0E0',
  },
})

export default Recipes;