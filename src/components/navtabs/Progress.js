import React from 'react';
import { View, Text, SafeAreaView, StyleSheet, TouchableOpacity} from 'react-native';

const Progress = () => {
    return (
        // <SafeAreaView style={styles.mainWrapper}>
    <View style={styles.mainWrapper}>
       <View style={styles.container}>
       <Text style={styles.text}>My Progress</Text>
       </View>
    </View>
    )
}

const styles = StyleSheet.create({
    mainWrapper: {
        flex: 1,
      },
      container: {
        paddingTop: 80,
        flex: 1,
        backgroundColor: '#FA8072',
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

export default Progress;