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
                  <Image style={styles.foodImage} source={require('./../../../assets/food-image1.png')}/>
                  <View style={styles.timeTextBox}>
                    <Text style={styles.timeText}>35 min</Text>
                  </View>
                  <Text style={styles.foodText}>Honey Garlic Shrimp and Broccoli</Text>
                </TouchableOpacity>
              </View>
              <View style={styles.cardFood}>
                <TouchableOpacity style={styles.foodButton} onPress={() => navigation.navigate('DetailRecipeScreen')}>
                  <Image style={styles.foodImage} source={require('./../../../assets/food-image2.png')}/>
                  <View style={styles.timeTextBox}>
                    <Text style={styles.timeText}>50 min</Text>
                  </View>
                  <Text style={styles.foodText}>Vegetarian Quinoa Stuffed Bell Peppers</Text>
                </TouchableOpacity>
              </View>
              <View style={styles.cardFood}>
                <TouchableOpacity style={styles.foodButton} onPress={() => navigation.navigate('DetailRecipeScreen')}>
                  <Image style={styles.foodImage} source={require('./../../../assets/food-image3.png')}/>
                  <View style={styles.timeTextBox}>
                    <Text style={styles.timeText}>80 min</Text>
                  </View>
                  <Text style={styles.foodText}>Teriyaki Glazed Tofu Stir-Fry</Text>
                </TouchableOpacity>
              </View>
              <View style={styles.cardFood}>
                <TouchableOpacity style={styles.foodButton} onPress={() => navigation.navigate('DetailRecipeScreen')}>
                  <Image style={styles.foodImage} source={require('./../../../assets/food-image4.png')}/>
                  <View style={styles.timeTextBox}>
                    <Text style={styles.timeText}>55 min</Text>
                  </View>
                  <Text style={styles.foodText}>Mushroom Risotto with Parmesan Crisps</Text>
                </TouchableOpacity>
              </View>
              <TouchableOpacity style={[ styles.generateButton, styles.generateButtonActive ]} onPress={() => { 
              }} >
                <Image style={styles.generateIcon} source={require('./../../../assets/generate-icon.svg')}/>
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
    backgroundColor: '#FBFBFB',
  },
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  mainWrapper: {
    backgroundColor: '#FBFBFB',
  },
  brocContainer: {
    flex: 1,
    backgroundColor: '#D9F2AF',
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginLeft: 24,
    marginTop: 10,
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
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    alignItems: 'flex-start',
    paddingHorizontal: 12,
    marginHorizontal: 12,
    marginTop: 20,
    marginBottom: 0,
    gap: 18,
  },
  cardFood: {
    // backgroundColor: '#fff',
    // padding: 24,
    // borderRadius: 20,
    // flexDirection: 'column',
    // justifyContent: 'space-around',
    // alignItems: 'center',
    // width: 162,
    // height: 215,
    // borderColor: '#f0f0f0',
    // borderWidth: 2,
    // shadowColor: '#000000',
    // shadowOffset: {width: 0, height: 3},
    // shadowOpacity: 0.06,
    // shadowRadius: 9,
  },
  foodButton: {
    backgroundColor: '#fff',
    padding: 0,
    borderRadius: 20,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
    width: 162,
    height: 215,
    borderColor: '#f0f0f0',
    borderWidth: 2,
    shadowColor: '#000000',
    shadowOffset: {width: 0, height: 3},
    shadowOpacity: .06,
    shadowRadius: 9,
  },
  foodImage: {
    width: 162,
    height: 122,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    resizeMode: 'cover',
  },
  timeTextBox: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: 53,
    height: 24,
    borderColor: '#168715',
    borderWidth: 1,
    borderRadius: 29,
    position: 'absolute',
    right: 12,
    top: 110,
    backgroundColor: '#FFFFFF',
  },
  timeText: {
    fontSize: 12,
    color: '#20821E',
    fontWeight: '600',
  },
  foodText: {
    width: '100%',
    fontSize: 14,
    fontWeight: '600',
    lineHeight: 18,
    color: '#163C16',
    paddingLeft: 16,
    paddingRight: 18,
    paddingTop: 18.5,
  },
  generateButton: {
    backgroundColor: '#168715',
    padding: 10,
    borderRadius: 44,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    width: 287,
    height: 53,
    alignSelf: 'center',
  },
  generateIcon: {
    width: 33.76,
    height: 30.14,
  },
  generateButtonText: {
    fontSize: 16,
    lineHeight: 18,
    fontWeight: '600',
    color: '#fff',
  },
  generateButtonActive: {
    backgroundColor: '#168715', // Active color when a category is selected
  },
});

export default RecipeIdeas;
