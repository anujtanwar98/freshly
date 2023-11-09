import React from 'react';
import { View, Text, SafeAreaView, StyleSheet} from 'react-native';

const Progress = () => {
    return (
        <SafeAreaView style={styles.mainWrapper}>
        <View style={styles.container}>
            <Text>Hello Progress 📈</Text>
        </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    mainWrapper: {
        flex: 1,
    },
    container: {
        flex: 1,
        backgroundColor: 'salmon',
        alignItems: 'center',
    },
})

export default Progress;