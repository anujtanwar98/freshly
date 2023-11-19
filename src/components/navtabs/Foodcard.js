import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { FontAwesome, FontAwesome5, MaterialCommunityIcons } from '@expo/vector-icons';
import Eaten from './eaten';
import Eat from './eat';

const Test = ({ title, freshness }) => {
  return (
    <View style={styles.mainCard}>
    <View style={styles.cardContainer}>
      <Image
        source={require('./../../../assets/freshly_logo.png')}
        style={styles.imageStyle}
      />
      <View style={styles.textContainer}>
        <Text style={styles.titleText}>hello</Text>
        <Text style={styles.subTitleText}>Fresh for 1 - 2 days</Text>
      </View>
      <TouchableOpacity style={styles.iconButton}>
        <Eat size={24} color="black" />
      </TouchableOpacity>
      <TouchableOpacity style={styles.iconButton}>
        <Eaten size={24} color="black" />
      </TouchableOpacity>
    </View>
    </View>
  );
};

const styles = StyleSheet.create({
    mainCard: {
        alignItems: 'center',
        marginTop: 16,
    },
  cardContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
    width: '90%',
    // height: '35%',
    borderWidth: 1, 
    borderColor: '#000',
  },
  imageStyle: {
    width: 70, // Adjust size as needed
    height: 70, // Adjust size as needed
    borderRadius: 25,
    marginRight: 10,
  },
  textContainer: {
    flex: 1,
  },
  titleText: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  subTitleText: {
    fontSize: 14,
    color: '#666',
    marginTop: 10,
  },
  iconButton: {
    marginLeft: 10,
    padding: 8,
  },
});

export default Test;
