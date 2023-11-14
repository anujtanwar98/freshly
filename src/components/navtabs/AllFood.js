import * as React from 'react';
import { View, Text, SafeAreaView, TouchableOpacity } from 'react-native';
import { StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';


const HomeMain = () => {
  const handlePress = () => {
    console.log("Icon button pressed!");
    // Add your logic here for what should happen when the button is pressed
  };
  return (
    // <SafeAreaView style={styles.mainWrapper}>
    <View style={styles.mainWrapper}>
      <View style={styles.container}>
        <Text style={styles.text}>My Food 🍱</Text>
        <TouchableOpacity style={styles.button} onPress={handlePress}>
          <Ionicons style={styles.icon} name="add-circle" color={'#FFA197'} size={30} />
          <Text style={styles.AddText}>Add Food</Text>
        </TouchableOpacity>
      </View>
    </View>
    // </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  mainWrapper: {
    flex: 1,
  },
  container: {
    paddingTop: 80,
    flex: 1,
    backgroundColor: '#00A2D6',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    paddingHorizontal: 20,
  },
  text: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
  },
  icon: {
    color: '#000',
    fontSize: 26,
    alignItems: 'center',
  },
  AddText: {
    color: '#000',
    fontSize: 14,
    alignItems: 'center',
    marginLeft: 10,
  },
  button: {
    backgroundColor: '#BDFFBE',
    padding: 10,
    borderRadius: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  }
})

export default HomeMain;