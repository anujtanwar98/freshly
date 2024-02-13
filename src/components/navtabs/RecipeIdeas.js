import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView, ScrollView, Image, ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const RecipeIdeas = () => {
  const navigation = useNavigation(); // Initialize the navigation hook

  const [isLoading, setIsLoading] = useState(true); // Initialize loading state

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color="#7CC106" />
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView>
        <View style={styles.mainWrapper}>
          <View style={styles.brocContainer}>
            <Text style={styles.brocTextContainer}>Here are a few recipe ideas to inspire your cooking and use up the ingredients in your fridge! </Text>
            <Image style={styles.brocImage} source={require('./../../../assets/broc.png')}/>
          </View>
          <View style={styles.mainCard}>
            <View style={styles.allCardContain}>
              <View style={styles.cardFood}>
                <TouchableOpacity style={styles.foodButton} onPress={() => navigation.navigate('DetailRecipeScreen')}>
                  <Image style={styles.foodImage} source={require('./../../../assets/foodimage1.png')}/>
                  <Text style={styles.foodText}>Honey Garlic Shrimp and Broccoli</Text>
                </TouchableOpacity>
              </View>
              <View style={styles.cardFood}>
                <TouchableOpacity style={styles.foodButton} onPress={() => navigation.navigate('DetailRecipeScreen')}>
                  <Image style={styles.foodImage} source={require('./../../../assets/foodimage2.png')}/>
                  <Text style={styles.foodText}>Vegetarian Quinoa Stuffed Bell Peppers</Text>
                </TouchableOpacity>
              </View>
              <View style={styles.cardFood}>
                <TouchableOpacity style={styles.foodButton} onPress={() => navigation.navigate('DetailRecipeScreen')}>
                  <Image style={styles.foodImage} source={require('./../../../assets/foodimage3.png')}/>
                  <Text style={styles.foodText}>Teriyaki Glazed Tofu Stir-Fry</Text>
                </TouchableOpacity>
              </View>
              <View style={styles.cardFood}>
                <TouchableOpacity style={styles.foodButton} onPress={() => navigation.navigate('DetailRecipeScreen')}>
                  <Image style={styles.foodImage} source={require('./../../../assets/foodimage4.png')}/>
                  <Text style={styles.foodText}>Mushroom Risotto with Parmesan Crisps</Text>
                </TouchableOpacity>
              </View>
              <TouchableOpacity style={[ styles.generateButton, styles.generateButtonActive ]} onPress={() => { 
              }} >
              <Text style={styles.generateButtonText}>Regenerate!</Text>
            </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  generateButton: {
    backgroundColor: '#E0E0E0',
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
    fontWeight: '500',
    lineHeight: 20.8,
    marginLeft: 24,
    alignItems: 'center',
    justifyContent: 'center',
    maxWidth: 256,
  },
  allCardContain: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    flexWrap: 'wrap',
    marginTop: 20,
  },
  cardFood: {
    backgroundColor: '#ffffff',
    borderRadius: 20,
    margin: 15,
    width: 180,
    shadowColor: '#171717',
    shadowOffset: {width: -2, height: 4},
    shadowOpacity: 0.2,
    shadowRadius: 3,
    marginBottom: 20,
    
  },
  foodImage: {
    width: '100%',
    height: 180,
    resizeMode: 'cover',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  foodText: {
    fontSize: 14,
    color: '#163C16',
    textAlign: 'space-around',
    flexShrink: 1,
    paddingLeft: 10,
    paddingRight: 10,
    paddingTop: 10,
    lineHeight: 18,
    paddingBottom: 30,
  },
  generateButtonActive: {
    backgroundColor: '#168715', // Active color when a category is selected
  },
});

export default RecipeIdeas;
