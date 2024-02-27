import React from 'react';
import { View, Text, SafeAreaView, StyleSheet, TouchableOpacity, ScrollView} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import { Image } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useFonts, PlusJakartaSans_500Medium, PlusJakartaSans_400Regular, PlusJakartaSans_600SemiBold, PlusJakartaSans_700Bold, PlusJakartaSans_800ExtraBold } from '@expo-google-fonts/plus-jakarta-sans';



const Learn = () => {
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
      <ScrollView style={styles.mainContainer}>
        <View style={styles.mainWrapper}>
          <View style={styles.container}>
            <Text style={styles.text}>Learn</Text>
          </View>
          <View style={styles.searchContainer}>
            <Text style={styles.searchTextContainer}><FontAwesome name="search" size={16} color="#8B8B8B" />    search any food item to learn more </Text>
          </View>
          <View style={styles.recentContain}>
            <Text style={styles.recentContainText}>Recent Searches</Text>
          </View>
          <View style={styles.allCardContain}>
            <TouchableOpacity style={styles.searchItemButton}>
              <MaterialIcons name="history" size={20} color="#168715" style={styles.searchItemIcon} />
              <Text style={styles.buttonText}>Carrots</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.searchItemButton}>
              <MaterialIcons name="history" size={20} color="#168715" style={styles.searchItemIcon} />
              <Text style={styles.buttonText}>Bread</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.searchItemButton}>
              <MaterialIcons name="history" size={20} color="#168715" style={styles.searchItemIcon} />
              <Text style={styles.buttonText}>Eggs</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.searchItemButton}>
              <MaterialIcons name="history" size={20} color="#168715" style={styles.searchItemIcon} />
              <Text style={styles.buttonText}>Cheese</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.searchItemButton}>
              <MaterialIcons name="history" size={20} color="#168715" style={styles.searchItemIcon} />
              <Text style={styles.buttonText}>Watermelon</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.emptyBoxLine}></View>
          <View style={styles.mainContain}>
            <View style={styles.recentContain}>
              <Text style={styles.recentContainText}>✏️   Tip of the day</Text>
            </View>
            <View style={styles.tipContain}>
              <View style={styles.tipContainTitleBoxFirst}>
                <Text style={styles.tipContainTitle}>Embrace Your Freezer:</Text>
              </View>
              <View style={styles.tipContainTextBoxSecond}>
                <Text style={styles.tipOneText}>1. Freeze leftovers or ingredients that won't be consumed in time.</Text>
                <Text style={styles.tipTwoText}>2. Label items with contents and dates to keep track.</Text>
              </View>
            </View>
          </View>
          <View style={styles.emptyBoxLine}></View>
          <View style={styles.helpEnvBox}>
            <View style={styles.helpTitleContain}>
              <Text style={styles.helpTitleText}>🌏   Help the Environment</Text>
            </View>
            <View style={styles.allImages}>
              <View style={styles.imageOneHelp}>
                <Image style={styles.imageOne} source={require('../../../assets/composting_tips.png')}/>
                <View style={styles.imageTextBox}>
                  <Text style={styles.imageText}>Composting Tips</Text>
                </View>
              </View>
              <View style={styles.imageTwoHelp}>
                <Image style={styles.imageTwo} source={require('../../../assets/low_carbon_diet.png')}/>
                <View style={styles.imageTextBox}>
                  <Text style={styles.imageText}>Low Carbon Diet</Text>
                </View>
              </View>
            </View>
          </View>
          <View style={styles.emptyBoxLine}></View>
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
  mainContainer: {
    backgroundColor: '#FBFBFB',
  },
  mainWrapper: {
    flex: 1,
  },
  container: {
    flex: 1,
    // backgroundColor: '#F3F3F3',
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
  searchContainer: {
    flex: 1,
    backgroundColor: '#D8D8D8',
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'row',
    marginLeft: 20,
    marginRight: 20,
    marginTop: 20,
    borderRadius: 50,
    height: 50,
  },
  searchTextContainer: {
    color: '#8B8B8B',
    fontSize: 16,
    fontFamily: 'PlusJakartaSans_500Medium',
    maxWidth: 300,
    padding: 10,
    marginLeft: 10,
  },
  recentContain: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    paddingHorizontal: 24,
    marginTop: 24,
  },
  recentContainText: {
    color: '#163C16',
    fontSize: 16,
    fontFamily: 'PlusJakartaSans_700Bold',
  },
  allCardContain: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    // justifyContent: 'space-around',
    alignItems: 'flex-start',
    paddingHorizontal: 8,
    marginTop: 20,
    marginBottom: 20,
    marginLeft: 20,
    marginRight: 20,
  },
  searchItemButton: {
    backgroundColor: '#fff',
    borderRadius: 30,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 8,
    marginBottom: 12,
    marginRight: 8,
    borderColor: '#168715',
    borderWidth: 1,
    // width: 100,
  },
  emptyBoxLine : {
    borderBottomColor: '#F5F5F5',
    borderBottomWidth: 10,
  },
  mainContain: {
    flex: 1,
    // backgroundColor: '#F3F3F3',
    // marginTop: 10,
    // marginBottom: 10,
  },
  searchItemIcon: {
    marginRight: 8,
  },
  buttonText: {
    color: '#168715',
    fontSize: 16,
    fontFamily: 'PlusJakartaSans_500Medium',
  },
  tipContain: {
    borderRadius: 30,
    flexDirection: 'column',
    alignItems: 'flex-start',
    padding: 10,
    marginTop: 8,
    marginLeft: 20,
    marginRight: 20,
    marginBottom: 24,
  },
  tipContainTitleBoxFirst: {
    backgroundColor: '#168715',
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 22,
    paddingTop: 18,
    paddingBottom: 16,
    width: '100%',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  tipContainTitle: {
    color: '#F7FCEE',
    fontSize: 16,
    fontFamily: 'PlusJakartaSans_700Bold',
  },
  tipContainTextBoxSecond: {
    backgroundColor: '#fff',
    flexDirection: 'column',
    alignItems: 'flex-start',
    paddingTop: 16,
    paddingLeft: 24,
    paddingRight: 24,
    paddingBottom: 20,
    width: '100%',
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    borderColor: '#f0f0f0',
    borderWidth: 1,
    shadowColor: '#000000',
    shadowOffset: {width: 0, height: 4.02},
    shadowOpacity: .05,
    shadowRadius: 5.36,
  },
  tipOneText: {
    color: '#163C16',
    fontSize: 14,
    fontFamily: 'PlusJakartaSans_500Medium',
    marginBottom: 16,
  },
  tipTwoText: {
    color: '#163C16',
    fontSize: 14,
    fontFamily: 'PlusJakartaSans_500Medium',
  },
  helpTitleContain: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    paddingHorizontal: 24,
    marginTop: 24,
  },
  helpTitleText: {
    color: '#163C16',
    fontSize: 16,
    fontFamily: 'PlusJakartaSans_700Bold',
  },
  allImages: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'flex-start',
    paddingHorizontal: 20,
    marginTop: 20,
    marginBottom: 20,
  },
  imageOneHelp: {
    width: '40%',
    height: 200,
  },
  imageOne: {
    width: '100%',
    height: '100%',
    borderRadius: 20,
    backgroundColor: '#C8D9AA',
    padding: 20,
  },
  imageTwoHelp: {
    width: '40%',
    height: 200,
  },
  imageTwo: {
    width: '100%',
    height: '100%',
    borderRadius: 20,
    backgroundColor: '#FAC29C',
    borderRadius: 20,
    padding: 20,
  },
  imageText: {
    color: '#163C16',
    fontSize: 16,
    marginTop: 16,
    fontFamily: 'PlusJakartaSans_600SemiBold',
  },
  imageTextBox: {
    marginBottom: 100,
  },
  helpEnvBox: {
    flex: 1,
    // backgroundColor: '#F3F3F3',
    // marginTop: 10,
    marginBottom: 20,
  },
})

export default Learn;