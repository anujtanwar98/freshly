import React from 'react';
import { View, Text, SafeAreaView, StyleSheet, TouchableOpacity, ScrollView} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import { Image } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';


const Explore = () => {
    return (
    <SafeAreaView>
      <ScrollView>
        <View style={styles.mainWrapper}>
          <View style={styles.container}>
            <Text style={styles.text}>Explore</Text>
          </View>
          <View style={styles.searchContainer}>
            <Text style={styles.searchTextContainer}><FontAwesome name="search" size={16} color="#8B8B8B" />   Search a food item....</Text>
          </View>
          <View style={styles.recentContain}>
            <Text style={styles.recentContainText}>Recent Items</Text>
          </View>
          <View style={styles.allCardContain}>
            <TouchableOpacity style={styles.searchItemButton}>
              <MaterialIcons name="history" size={20} color="#7CC106" style={styles.searchItemIcon} />
              <Text style={styles.buttonText}>Carrots</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.searchItemButton}>
              <MaterialIcons name="history" size={20} color="#7CC106" style={styles.searchItemIcon} />
              <Text style={styles.buttonText}>Bread</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.searchItemButton}>
              <MaterialIcons name="history" size={20} color="#7CC106" style={styles.searchItemIcon} />
              <Text style={styles.buttonText}>Eggs</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.searchItemButton}>
              <MaterialIcons name="history" size={20} color="#7CC106" style={styles.searchItemIcon} />
              <Text style={styles.buttonText}>Cheese</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.searchItemButton}>
              <MaterialIcons name="history" size={20} color="#7CC106" style={styles.searchItemIcon} />
              <Text style={styles.buttonText}>Watermelon</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.emptyBoxLine}></View>
          <View style={styles.mainContain}>
            <View style={styles.recentContain}>
              <Text style={styles.recentContainText}>✏️Tip of the day</Text>
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
              <Text style={styles.helpTitleText}>🌏Help the Environment</Text>
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
    fontWeight: '500',
    maxWidth: 300,
    padding: 10,
    marginLeft: 10,
  },
  recentContain: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    paddingHorizontal: 20,
    marginTop: 20,
  },
  recentContainText: {
    color: '#000',
    fontSize: 16,
    fontWeight: '500',
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
    gap: 20,
  },
  searchItemButton: {
    backgroundColor: '#fff',
    borderRadius: 30,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderColor: '#7CC106',
    borderWidth: 1,
    // width: 100,
  },
  emptyBoxLine : {
    borderBottomColor: '#D8D8D8',
    borderBottomWidth: 10,
  },
  mainContain: {
    flex: 1,
    backgroundColor: '#F3F3F3',
    marginTop: 10,
    marginBottom: 10,
  },
  searchItemIcon: {
    marginRight: 10,
  },
  buttonText: {
    color: '#7CC106',
    fontSize: 16,
    fontWeight: '500',
  },
  tipContain: {
    borderRadius: 30,
    flexDirection: 'column',
    alignItems: 'flex-start',
    padding: 10,
    marginLeft: 20,
    marginRight: 20,
    marginBottom: 20,
  },
  tipContainTitleBoxFirst: {
    backgroundColor: '#7CC106',
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    width: '100%',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  tipContainTitle: {
    color: '#F7FCEE',
    fontSize: 16,
    fontWeight: '700',
  },
  tipContainTextBoxSecond: {
    backgroundColor: '#fff',
    flexDirection: 'column',
    alignItems: 'flex-start',
    padding: 10,
    width: '100%',
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  tipOneText: {
    color: '#000',
    fontSize: 16,
    fontWeight: '500',
    marginTop: 10,
    marginBottom: 10,
  },
  tipTwoText: {
    color: '#000',
    fontSize: 16,
    fontWeight: '500',
    marginTop: 10,
    marginBottom: 10,
  },
  helpTitleContain: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    paddingHorizontal: 20,
    marginTop: 20,
  },
  helpTitleText: {
    color: '#000',
    fontSize: 16,
    fontWeight: '500',
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
    color: '#000',
    fontSize: 16,
    fontWeight: '500',
    marginTop: 10,
  },
  imageTextBox: {
    marginBottom: 100,
  },
  helpEnvBox: {
    flex: 1,
    backgroundColor: '#F3F3F3',
    marginTop: 10,
    marginBottom: 10,
  },
})

export default Explore;