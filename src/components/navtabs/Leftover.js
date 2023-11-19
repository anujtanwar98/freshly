import React from 'react';
import { View, Text, SafeAreaView, StyleSheet, TouchableOpacity} from 'react-native';
import { Ionicons } from '@expo/vector-icons';


const Leftover = () => {
    return (
         // <SafeAreaView style={styles.mainWrapper}>
    <View style={styles.mainWrapper}>
        <View style={styles.container}>
        <Text style={styles.text}>My Leftover 🍱</Text>
        <TouchableOpacity style={styles.button} onPress={{}}>
            <Ionicons style={styles.icon} name="add-circle" color={'#FFA197'} size={30} />
            <Text style={styles.AddText}>Add Leftover</Text>
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
      AddText: {
        color: '#000',
        fontSize: 14,
        alignItems: 'center',
        marginLeft: 10,
      },
})

export default Leftover;