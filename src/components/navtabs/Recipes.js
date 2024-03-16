import React, { useState, useEffect } from 'react';
import { View, Text, SafeAreaView, StyleSheet, TouchableOpacity, ScrollView} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import MyGen from '../../../assets/genicon';
import { useFonts, PlusJakartaSans_500Medium, PlusJakartaSans_400Regular, PlusJakartaSans_600SemiBold, PlusJakartaSans_700Bold, PlusJakartaSans_800ExtraBold } from '@expo-google-fonts/plus-jakarta-sans';


const Recipes = ({ navigation }) => {
  const [selectedCategory, setSelectedCategory] = useState(null);

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

    return (
    <SafeAreaView style={styles.SafeAreaViewMain}>
      <ScrollView style={styles.scrollViewBox}>
        <View style={styles.mainWrapper}>
          <View style={styles.container}>
            <Text style={styles.text}>What do you want to eat?</Text>
          </View>
          <View style={styles.brocContainer}>
            <Text style={styles.brocTextContainer}>Select a meal type and tap generate to see what Broc can make from your fridge items!</Text>
            <Image style={styles.brocImage} source={require('./../../../assets/broc.png')}/>
          </View>
          <View style={styles.mainCard}>
            <View style={styles.allCardContain}>
              <TouchableOpacity style={[ styles.breakfastButton, styles.foodButton, selectedCategory === 'Breakfast' && styles.selectedCategoryButton ]} onPress={() => setSelectedCategory('Breakfast')}>
                <Text style={styles.buttonEmojiText}>🍳</Text>
                <Text style={styles.buttonText}>Breakfast</Text>
              </TouchableOpacity>
              <TouchableOpacity style={[ styles.lunchButton, styles.foodButton, selectedCategory === 'Lunch' && styles.selectedCategoryButton ]} onPress={() => setSelectedCategory('Lunch')}>
                <Text style={styles.buttonEmojiText}>🥪</Text>
                <Text style={styles.buttonText}>Lunch</Text>
              </TouchableOpacity>
              <TouchableOpacity style={[styles.dinnerButton , styles.foodButton, selectedCategory === 'Dinner' && styles.selectedCategoryButton ]} onPress={() => setSelectedCategory('Dinner')} >
                <Text style={styles.buttonEmojiText}>🍝</Text>
                <Text style={styles.buttonText}>Dinner</Text>
              </TouchableOpacity>
              <TouchableOpacity style={[styles.snackButton, styles.foodButton, selectedCategory === 'Snack' && styles.selectedCategoryButton ]} onPress={() => setSelectedCategory('Snack')} >
                <Text style={styles.buttonEmojiText}>🥨</Text>
                <Text style={styles.buttonText}>Snack</Text>
              </TouchableOpacity>
              <TouchableOpacity style={[styles.DessertButton, styles.foodButton, selectedCategory === 'Dessert' && styles.selectedCategoryButton ]} onPress={() => setSelectedCategory('Dessert')} >
                <Text style={styles.buttonEmojiText}>🍰</Text>
                <Text style={styles.buttonText}>Dessert</Text>
              </TouchableOpacity>
            </View>
            <TouchableOpacity style={[ styles.generateButton, selectedCategory ? styles.generateButtonActive : styles.generateButtonInactive ]} onPress={() => { 
              if (selectedCategory) { 
                navigation.navigate('RecipeIdeas');
              } else { 
                alert ('Please select a category first.'); 
            }}} >
              <MyGen focused={!!selectedCategory} style={styles.generateIcon} />
              <Text style={[styles.generateButtonText, { color: selectedCategory ? '#FFFFFF' : '#616774' }]}>Generate recipes!</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
);
}

const styles = StyleSheet.create({
  SafeAreaViewMain: {
    flex: 1,
    backgroundColor: '#FBFBFB',
  },
  scrollViewBox: {
    backgroundColor: '#FBFBFB',
  },
  mainWrapper: {
    flex: 1,
  },
  container: {
    flex: 1,
    backgroundColor: '#FBFBFB',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    paddingHorizontal: 20,
  },
  text: {
    color: '#168715',
    fontSize: 24,
    fontFamily: 'PlusJakartaSans_800ExtraBold',
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
    justifyContent: 'space-between',
    marginLeft: 24,
    marginTop: 20,
    borderTopLeftRadius: 20,
    borderBottomLeftRadius: 20,
  },
  brocTextContainer: {
    color: '#163C16',
    fontSize: 16,
    fontFamily: 'PlusJakartaSans_500Medium',
    lineHeight: 20.8,
    marginLeft: 24,
    alignItems: 'center',
    justifyContent: 'center',
    maxWidth: 256,
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
    paddingHorizontal: 12,
    marginHorizontal: 12,
    marginTop: 20,
    marginBottom: 20,
    gap: 14,
  },
  foodButton: {
    backgroundColor: '#fff',
    padding: 24,
    borderRadius: 20,
    flexDirection: 'column',
    justifyContent: 'space-around',
    alignItems: 'center',
    width: 163,
    height: 141,
    borderColor: '#f0f0f0',
    borderWidth: 2,
    shadowColor: '#000000',
    shadowOffset: {width: 0, height: 4.02},
    shadowOpacity: .05,
    shadowRadius: 5.36,
  },
  buttonEmojiText: {
    fontSize: 48,
  },
  buttonText: {
    fontSize: 16,
    fontFamily: 'PlusJakartaSans_600SemiBold',
    color: '#163c16'
  },
  generateButton: {
    backgroundColor: '#168715',
    padding: 10,
    borderRadius: 50,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: 300,
    height: 50,
    alignSelf: 'center',
  },
  generateIcon: {
    width: 33.76,
    height: 30.14,
  },
  generateButtonText: {
    fontSize: 16,
    lineHeight: 18,
    fontFamily: 'PlusJakartaSans_600SemiBold',
    color: '#fff',
    paddingLeft: 5.24,
  },
  selectedCategoryButton: {
    borderColor: '#168715',
    borderWidth: 2,
    backgroundColor: '#D9F2AF',
  },
  generateButtonActive: {
    backgroundColor: '#168715', // Active color when a category is selected
  },
  generateButtonInactive: {
    backgroundColor: '#E0E0E0',
  },
})

export default Recipes;