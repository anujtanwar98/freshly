import React from 'react';
import { View, Text, Image, StyleSheet, SafeAreaView, ScrollView } from 'react-native';
import { useFonts, PlusJakartaSans_500Medium, PlusJakartaSans_400Regular, PlusJakartaSans_600SemiBold, PlusJakartaSans_700Bold, PlusJakartaSans_800ExtraBold } from '@expo-google-fonts/plus-jakarta-sans';

const DetailRecipeScreen = () => {

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
    <SafeAreaView style={styles.safeArea}>
      <ScrollView style={styles.mainContainer}>
      <View style={styles.mainWrapper}>
        <View style={styles.foodImageContainer}>
          <Image style={styles.foodImage} source={require('./../../../assets/food-image1.png')}/>
        </View>
        <View style={styles.foodTextContainer}>
          <Text style={styles.foodText}>Honey Garlic Shrimp and Broccoli</Text>
          <View style={styles.foodTime}>
            <Text style={styles.foodTimeText}>35 minutes</Text>
          </View>
        </View>
        <View style={styles.numberServing}>
          <Text style={styles.numberServingText}>Number of Servings</Text>
        </View>
        <View style={styles.servingContainer}>
          <View style={styles.servingButton}>
            <Text style={styles.servingText}>1</Text>
          </View>
          <View style={styles.servingButton}>
            <Text style={styles.servingText}>2</Text>
          </View>
          <View style={styles.servingButton}>
            <Text style={styles.servingText}>3</Text>
          </View>
          <View style={styles.servingButton}>
            <Text style={styles.servingText}>4</Text>
          </View>
        </View>
        <View style={styles.whatNeedBox}>
          <Text style={styles.ingredientsText}>What You'll Need</Text>
        </View>
        <View style={styles.ingredientsContainer}>
          <View style={styles.ingredientBox}>
            <Text style={styles.ingredientText}>1/4 cup honey</Text>
          </View>
          <View style={styles.ingredientBox}>
            <Text style={styles.ingredientText}>1/4 cup honey</Text>
          </View>
          <View style={styles.ingredientBox}>
            <Text style={styles.ingredientText}>1/4 cup honey</Text>
          </View>
          <View style={styles.ingredientBox}>
            <Text style={styles.ingredientText}>1/4 cup soy sauce</Text>
          </View>
          <View style={styles.ingredientBox}>
            <Text style={styles.ingredientText}>1/4 cup rice vinegar</Text>
          </View>
          <View style={styles.ingredientBox}>
            <Text style={styles.ingredientText}>2 cloves garlic</Text>
          </View>
          <View style={styles.ingredientBox}>
            <Text style={styles.ingredientText}>1 tbsp. cornstarch</Text>
          </View>
          <View style={styles.ingredientBox}>
            <Text style={styles.ingredientText}>1 tbsp. sesame oil</Text>
          </View>
          <View style={styles.ingredientBox}>
            <Text style={styles.ingredientText}>Cooked white rice, for serving</Text>
          </View>
          <View style={styles.ingredientBox}>
            <Text style={styles.ingredientText}>Sesame seeds, for garnish</Text>
          </View>
          <View style={styles.ingredientBox}>
            <Text style={styles.ingredientText}>Sliced green onions, for garnish</Text>
          </View>
        </View> 
        <View style={styles.howToContainer}>
          <Text style={styles.howToText}>How to Make It</Text>
        </View>
        <View style={styles.stepBoxes}>
          <Text style={styles.stepNumberText}>Step 1: Marinate the Shrimp</Text>
          <View style={styles.ingredientBox}>
            <Text style={styles.ingredientText}>1/4 cup soy sauce</Text>
          </View>
          <View style={styles.stepTextContainer}>
            <Text style={styles.stepText}>• Whisk together honey, soy sauce, garlic, sesame oil, and red pepper flakes.</Text>
            <Text style={styles.stepText}>• Add the shrimp and toss to coat.</Text>
          </View>
        </View>
        <View style={styles.howToContainer}>
          <Text style={styles.howToText}>How to Make It</Text>
        </View>
        <View style={styles.stepBoxes}>
          <Text style={styles.stepNumberText}>Step 1: Marinate the Shrimp</Text>
          <View style={styles.ingredientBox}>
            <Text style={styles.ingredientText}>1/4 cup soy sauce</Text>
          </View>
          <View style={styles.stepTextContainer}>
            <Text style={styles.stepText}>• Whisk together honey, soy sauce, garlic, sesame oil, and red pepper flakes.</Text>
            <Text style={styles.stepText}>• Add the shrimp and toss to coat.</Text>
          </View>
        </View>
        <View style={styles.howToContainer}>
          <Text style={styles.howToText}>How to Make It</Text>
        </View>
        <View style={styles.stepBoxes}>
          <Text style={styles.stepNumberText}>Step 1: Marinate the Shrimp</Text>
          <View style={styles.ingredientBox}>
            <Text style={styles.ingredientText}>1/4 cup soy sauce</Text>
          </View>
          <View style={styles.stepTextContainer}>
            <Text style={styles.stepText}>• Whisk together honey, soy sauce, garlic, sesame oil, and red pepper flakes.</Text>
            <Text style={styles.stepText}>• Add the shrimp and toss to coat.</Text>
          </View>
        </View>
        <View style={styles.brocImageBox}>
          <Image style={styles.brocImage} source={require('./../../../assets/brocEndFood.png')}/>
        </View>
        <View style={styles.endTextBox}>
          <Text style={styles.endText}>You made it to the end, enjoy your food! 😋</Text>
        </View>
      </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default DetailRecipeScreen;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  mainContainer: {
    flex: 1,
    backgroundColor: '#FBFBFB',
  },
  foodImageContainer: {
    alignItems: 'center',
  },
  foodTextContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FBF',
    padding: 30,
    marginRight: 50,
    marginLeft: 50,
    borderRadius: 20,
    marginTop: -20,
  },
  foodText: {
    fontFamily: 'PlusJakartaSans_600SemiBold',
    fontSize: 24,
    color: '#000',
    textAlign: 'center',
    maxWidth: 270,
  },
  foodTime: {
    marginTop: 20,
  },

  whatNeedBox: {
    marginTop: 20,
    marginLeft: 24,
  },
  ingredientsText: {
    fontSize: 16,
    fontFamily: 'PlusJakartaSans_600SemiBold',
  },
  ingredientsContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    flexWrap: 'wrap',
    marginLeft: 20,
    marginRight: 20,
    marginTop: 10,
    backgroundColor: '#FBF',
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 20,
    paddingRight: 20,

  },
  ingredientBox: {
    backgroundColor: '#D9F2AF',
    padding: 10,
    borderRadius: 10,
    marginRight: 10,
    marginBottom: 10,
  },
  ingredientText: {
    fontFamily: 'PlusJakartaSans_500Medium',
    fontSize: 12,
  },
  howToContainer: {
    marginTop: 20,
    marginLeft: 24,
  },
  howToText: {
    fontSize: 16,
    fontFamily: 'PlusJakartaSans_600SemiBold',
  },
  stepBoxes: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    marginLeft: 20,
    marginRight: 20,
    marginTop: 10,
    backgroundColor: '#FBF',
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 20,
    paddingRight: 20,
  },
  stepNumberText: {
    fontFamily: 'PlusJakartaSans_600SemiBold',
    fontSize: 16,
    marginBottom: 10,
  },
  stepTextContainer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  },
  stepText: {
    fontFamily: 'PlusJakartaSans_400Regular',
    fontSize: 14,
  },
  brocImageBox: {
    alignItems: 'center',
    marginTop: 20,
  },
  endTextBox: {
    alignItems: 'center',
    marginTop: -30,
    marginBottom: 40,
  },
  endText: {
    fontFamily: 'PlusJakartaSans_500Medium',
    fontSize: 16,
  },
});
