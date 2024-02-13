// Example of how to use the custom font in the app

import { useFonts, PlusJakartaSans_500Medium, PlusJakartaSans_400Regular, PlusJakartaSans_600SemiBold, PlusJakartaSans_700Bold, PlusJakartaSans_800ExtraBold, PlusJakartaSans_200ExtraLight } from '@expo-google-fonts/plus-jakarta-sans';
import { View, StyleSheet } from 'react-native';

let [fontsLoaded] = useFonts({
    PlusJakartaSans_500Medium,
    PlusJakartaSans_400Regular,
    PlusJakartaSans_600SemiBold,
    PlusJakartaSans_700Bold,
    PlusJakartaSans_800ExtraBold,
    PlusJakartaSans_200ExtraLight,
});

if (!fontsLoaded) {
    return null;
}

{/* <View style={styles.helloTest}>
    Hello
</View>

const styles = StyleSheet.create({
    helloTest: {
        fontFamily: 'PlusJakartaSans_400Regular',
    },
}); */}