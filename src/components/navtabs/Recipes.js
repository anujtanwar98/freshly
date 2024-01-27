import React from 'react';
import { View, Text, SafeAreaView, StyleSheet, TouchableOpacity} from 'react-native';
import { Ionicons } from '@expo/vector-icons';


const Recipes = () => {
    return (
    <View style={styles.mainWrapper}>
      <View style={styles.container}>
        <Text style={styles.text}>Explore 🧭</Text>
      </View>
  </View>
);
}

const styles = StyleSheet.create({
  mainWrapper: {
    flex: 1,
  },
  container: {
    paddingTop: 80,
    flex: 1,
    backgroundColor: '#545F71',
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
})

export default Recipes;