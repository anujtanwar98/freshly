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
          <View>
            <Text>Recent Items</Text>
          </View>
          <View style={styles.allCardContain}>
            <TouchableOpacity style={styles.searchItemButton}>
              <Text style={styles.buttonText}><MaterialIcons name="history" size={20} color="#7CC106" />  Carrots</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.searchItemButton}>
              <Text style={styles.buttonText}><MaterialIcons name="history" size={20} color="#7CC106" />  Bread</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.searchItemButton}>
              <Text style={styles.buttonText}><MaterialIcons name="history" size={20} color="#7CC106" />  Eggs</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.searchItemButton}>
              <Text style={styles.buttonText}><MaterialIcons name="history" size={20} color="#7CC106" />  Cheese</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.searchItemButton}>
              <Text style={styles.buttonText}><MaterialIcons name="history" size={20} color="#7CC106" />  Watermelon</Text>
            </TouchableOpacity>
          </View>
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
  searchItemButton: {
    backgroundColor: '#fff',
    borderRadius: 30,
    flexDirection: 'column',
    // justifyContent: 'space-around',
    alignItems: 'center',
    padding: 10,
    borderColor: '#7CC106',
    borderWidth: 1,
    // width: 100,
  },
})

export default Explore;