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
        <View style={styles.mainImageTextContainer}>
          <View style={styles.foodImageContainer}>
            <Image style={styles.foodImage} source={require('./../../../assets/food-image1.png')}/>
          </View>
          <View style={styles.foodTextContainer}>
            <Text style={styles.foodText}>Honey Garlic Shrimp and Broccoli</Text>
            <View style={styles.foodTime}>
              <Text style={styles.foodTimeText}>35 minutes</Text>
            </View>
          </View>
        </View>
        <View style={styles.numberServing}>
          <Text style={styles.numberServingText}>Number of Servings</Text>
        </View>
        <View style={styles.mainImageTextContainer}>
          <View style={styles.servingContainer}>
            <View style={[styles.servingButton, styles.servingButtonSelected]}>
              <Text style={[styles.servingText, styles.servingTextSelected]}>1</Text>
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
        </View>
        <View style={styles.whatNeedBox}>
          <Text style={styles.ingredientsText}>What You'll Need</Text>
        </View>
        <View style={styles.ingredientsContainer}>
          <View style={styles.ingredientBox}>
            <Text style={styles.ingredientText}>1/4 cup honey</Text>
          </View>
          <View style={styles.ingredientBox}>
            <Text style={styles.ingredientText}>2 tbsp soy sauce</Text>
          </View>
          <View style={styles.ingredientBox}>
            <Text style={styles.ingredientText}>4 cloves garlic</Text>
          </View>
          <View style={styles.ingredientBox}>
            <Text style={styles.ingredientText}>1 tsp sesame oil</Text>
          </View>
          <View style={styles.ingredientBox}>
            <Text style={styles.ingredientText}>1 lb shrimp</Text>
          </View>
          <View style={styles.ingredientBox}>
            <Text style={styles.ingredientText}>1/2 tsp red pepper flakes</Text>
          </View>
          <View style={styles.ingredientBox}>
            <Text style={styles.ingredientText}>2 cups broccoli</Text>
          </View>
          <View style={styles.ingredientBox}>
            <Text style={styles.ingredientText}>2 tbsp vegetable oil</Text>
          </View>
          <View style={styles.ingredientBox}>
            <Text style={styles.ingredientText}>rice or noodles</Text>
          </View>
          <View style={styles.ingredientBox}>
            <Text style={styles.ingredientText}>sesame seeds</Text>
          </View>
          <View style={styles.ingredientBox}>
            <Text style={styles.ingredientText}>green onions</Text>
          </View>
        </View> 
        <View style={styles.howToContainer}>
          <Text style={styles.howToText}>How to Make It</Text>
        </View>
        <View style={styles.stepBoxes}>
          <Text style={styles.stepNumberText}>Step 1: Marinate the Shrimp</Text>
          <View style={styles.ingredientsSubcontainer}>
            <View style={styles.ingredientBox}>
              <Text style={styles.ingredientText}>• honey</Text>
            </View>
            <View style={styles.ingredientBox}>
              <Text style={styles.ingredientText}>• soy sauce</Text>
            </View>
            <View style={styles.ingredientBox}>
              <Text style={styles.ingredientText}>• garlic</Text>
            </View>
            <View style={styles.ingredientBox}>
              <Text style={styles.ingredientText}>• sesame oil</Text>
            </View>
            <View style={styles.ingredientBox}>
              <Text style={styles.ingredientText}>• red pepper flakes</Text>
            </View>
            <View style={styles.ingredientBox}>
              <Text style={styles.ingredientText}>• shrimp</Text>
            </View>
          </View>
          <View style={styles.stepTextContainer}>
            <Text style={styles.stepText}>• Whisk together honey, soy sauce, garlic, sesame oil, and red pepper flakes.</Text>
            <Text style={styles.stepText}>• Add the shrimp and toss to coat.</Text>
            <Text style={styles.stepText}>• Let marinate for 15 minutes.</Text>
          </View>
        </View>
        <View style={styles.stepBoxes}>
          <Text style={styles.stepNumberText}>Step 2: Cook the Broccoli</Text>
          <View style={styles.ingredientsSubcontainer}>
            <View style={styles.ingredientBox}>
              <Text style={styles.ingredientText}>• broccoli</Text>
            </View>
          </View>
          <View style={styles.stepTextContainer}>
            <Text style={styles.stepText}>• Bring a pot of water to a boil.</Text>
            <Text style={styles.stepText}>• Add the broccoli and cook for 2-3 minutes until vibrant and slightly tender.</Text>
            <Text style={styles.stepText}>• Drain and set aside.</Text>
          </View>
        </View>
        <View style={styles.stepBoxes}>
          <Text style={styles.stepNumberText}>Step 3: Cook the Shrimp</Text>
          <View style={styles.ingredientsSubcontainer}>
            <View style={styles.ingredientBox}>
              <Text style={styles.ingredientText}>• vegetable oil</Text>
            </View>
            <View style={styles.ingredientBox}>
              <Text style={styles.ingredientText}>• shrimp</Text>
            </View>
          </View>
          <View style={styles.stepTextContainer}>
            <Text style={styles.stepText}>• Heat vegetable oil in a large skillet over medium-high heat.</Text>
            <Text style={styles.stepText}>• Remove shrimp from the marinade (reserve the marinade) and cook for 1-2 minutes on each side, until pink and cooked through.</Text>
            <Text style={styles.stepText}>• Remove shrimp and set aside.</Text>
          </View>
        </View>
        <View style={styles.stepBoxes}>
          <Text style={styles.stepNumberText}>Step 4: Make the Sauce</Text>
          <View style={styles.stepTextContainer}>
            <Text style={styles.stepText}>• In the same skillet, pour in the reserved marinade and bring to a simmer. </Text>
            <Text style={styles.stepText}>• Let it reduce slightly for 2-3 minutes.</Text>
            {/* <Text style={styles.stepText}>• Cook for another 2 minutes to heat everything through.</Text> */}
          </View>
        </View>
        <View style={styles.stepBoxes}>
          <Text style={styles.stepNumberText}>Step 5: Combine and Finish</Text>
          <View style={styles.stepTextContainer}>
            <Text style={styles.stepText}>• Return the cooked shrimp and broccoli to the skillet.</Text>
            <Text style={styles.stepText}>• Toss everything together to coat in the sauce.</Text>
            <Text style={styles.stepText}>• Cook for another 2 minutes to heat everything through.</Text>
          </View>
        </View>
        <View style={styles.stepBoxes}>
          <Text style={styles.stepNumberText}>Step 6: Serve and Enjoy!</Text>
          <View style={styles.ingredientsSubcontainer}>
              <View style={styles.ingredientBox}>
              <Text style={styles.ingredientText}>• rice or noodles</Text>
            </View>
            <View style={styles.ingredientBox}>
              <Text style={styles.ingredientText}>• sesame seeds</Text>
            </View>
            <View style={styles.ingredientBox}>
              <Text style={styles.ingredientText}>• green onions</Text>
            </View>
          </View>
          <View style={styles.stepTextContainer}>
            <Text style={styles.stepText}>• Serve the honey garlic shrimp and broccoli over cooked rice or noodles.</Text>
            <Text style={styles.stepText}>• Garnish with sesame seeds and sliced green onions.</Text>
          </View>
        </View>
        <View style={styles.brocImageBox}>
          <Image style={styles.brocImage} source={require('./../../../assets/brocEndFood.png')}/>
        </View>
        <View style={styles.endTextBox}>
          <Text style={styles.endText}>You made it to the end, enjoy {"\n"}your food! 😋</Text>
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
  mainImageTextContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  foodImageContainer: {
    marginTop: 10,
  },
  foodImage: {
    height: 259,
    width: 342,
    // left: 24,
  },
  foodTextContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    width: 342,
    // padding: 30,
    marginRight: 24,
    marginLeft: 24,
    marginTop: -56,
    borderRadius: 20,
    borderColor: '#F0F0F0',
    borderWidth: 1,
    shadowColor: '#000000',
    shadowOffset: {width: 0, height: 3},
    shadowOpacity: 0.06,
    shadowRadius: 9,
  },
  foodText: {
    fontFamily: 'PlusJakartaSans_600SemiBold',
    fontSize: 24,
    color: '#163C16',
    textAlign: 'center',
    maxWidth: 271,
    marginTop: 24,
  },
  foodTime: {
    margin: 12,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: 85,
    height: 25,
    borderColor: '#20821E',
    borderWidth: 1,
    borderRadius: 29,
    backgroundColor: '#FFFFFF',
  },
  foodTimeText: {
    fontSize: 12,
    color: '#20821E',
    fontWeight: '600',
  },
  numberServingText: {
    marginLeft: 24,
    marginTop: 24,
    marginBottom: 16,
    fontFamily: 'PlusJakartaSans_600SemiBold',
    fontSize: 16,
    lineHeight: 22,
  },
  servingContainer: {
    width: 342,
    height: 53,
    // marginLeft: 24,
    borderColor: '#F0F0F0',
    borderWidth: 1,
    borderRadius: 50,
    backgroundColor: '#FFFFFF',
    flexDirection: 'row',
    shadowColor: '#000000',
    shadowOffset: {width: 0, height: 3},
    shadowOpacity: 0.06,
    shadowRadius: 9,
  },  
  servingButton: {
    width: 75,
    height: 41,
    marginLeft: 7,
    marginRight: 7,
    flex: 1,
    alignSelf: 'center',
    gap: 7,
    borderRadius: 44,
    backgroundColor: '#ffffff',
  },
  servingButtonSelected: {
    backgroundColor: '#168715',
  },
  servingText: {
    textAlign: 'center',
    fontFamily: 'PlusJakartaSans_600SemiBold',
    fontSize: 16,
    lineHeight: 18,
    marginTop: 12,
    color: '#163C16'
  },
  servingTextSelected: {
    color: '#ffffff',
  },
  whatNeedBox: {
    
  },
  ingredientsText: {
    marginLeft: 24,
    marginTop: 24,
    marginBottom: 16,
    fontFamily: 'PlusJakartaSans_600SemiBold',
    fontSize: 16,
    lineHeight: 22,
  },
  ingredientsContainer: {
    marginLeft: 24,
    marginRight: 24,
    paddingTop: 20,
    paddingBottom: 12,
    paddingLeft: 24,
    paddingRight: 14,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    flexWrap: 'wrap',
    borderColor: '#F0F0F0',
    borderWidth: 1,
    borderRadius: 18,
    backgroundColor: '#FFFFFF',
    shadowColor: '#000000',
    shadowOffset: {width: 0, height: 3},
    shadowOpacity: 0.06,
    shadowRadius: 9,
  },
  ingredientBox: {
    backgroundColor: '#168715',
    paddingTop: 4,
    paddingRight: 8,
    paddingBottom: 4,
    paddingLeft: 8,
    borderRadius: 8,
    marginRight: 8,
    marginBottom: 8,
    height: 28,
  },
  ingredientText: {
    fontFamily: 'PlusJakartaSans_500Medium',
    fontSize: 12,
    lineHeight: 20,
    color: '#ffffff',
  },
  howToContainer: {

  },
  howToText: {
    marginLeft: 24,
    marginTop: 24,
    marginBottom: 16,
    fontFamily: 'PlusJakartaSans_600SemiBold',
    fontSize: 16,
    lineHeight: 22,
  },
  stepBoxes: {
    marginLeft: 24,
    marginRight: 24,
    marginBottom: 16,
    paddingTop: 20,
    // paddingBottom: 12,
    paddingLeft: 24,
    paddingRight: 24,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    // flexWrap: 'wrap',
    borderColor: '#F0F0F0',
    borderWidth: 1,
    borderRadius: 18,
    backgroundColor: '#FFFFFF',
    shadowColor: '#000000',
    shadowOffset: {width: 0, height: 3},
    shadowOpacity: 0.06,
    shadowRadius: 9,
  },
  stepNumberText: {
    fontFamily: 'PlusJakartaSans_600SemiBold',
    fontSize: 16,
    lineHeight: 22,
    marginBottom: 10,///????
  },
  ingredientsSubcontainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  stepTextContainer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    marginBottom: 20,
  },
  stepText: {
    fontFamily: 'PlusJakartaSans_400Regular',
    fontSize: 14,
    lineHeight: 22,
  },
  brocImageBox: {
    alignItems: 'center',
  },
  endTextBox: {
    width: 261,
    alignSelf: 'center',
    marginTop: -30,
    marginBottom: 40,
  },
  endText: {
    fontFamily: 'PlusJakartaSans_500Medium',
    fontSize: 16,
    textAlign: 'center',
    color: '#163C16',
  },
});
