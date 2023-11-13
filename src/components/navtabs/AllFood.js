import * as React from 'react';
import { View, Text, SafeAreaView} from 'react-native';
import { StyleSheet } from 'react-native';
// import { Ionicons } from '@expo/vector-icons';
// <Ionicons name="scan" size={24} color="black" />


const HomeMain = () => {
  return (
    <SafeAreaView style={styles.mainWrapper}>
      <View style={styles.container}>
        <Text>Hello food 🍱</Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  mainWrapper: {
    flex: 1,
  },
  container: {
    flex: 1,
    backgroundColor: '#00A2D6',
    alignItems: 'center',
  },
})

export default HomeMain;