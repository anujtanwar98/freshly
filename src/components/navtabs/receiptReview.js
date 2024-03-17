import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { useFonts, PlusJakartaSans_500Medium, PlusJakartaSans_400Regular, PlusJakartaSans_600SemiBold, PlusJakartaSans_700Bold, PlusJakartaSans_800ExtraBold } from '@expo-google-fonts/plus-jakarta-sans';

const ReceiptReview = ({ route }) => {
  const { items } = route.params;

  // Convert object into an array of categories and their items
  const categoriesAndItems = Object.keys(items).map(category => ({
    category,
    items: items[category],
  }));

  let [fontsLoaded] = useFonts({
    PlusJakartaSans_500Medium,
    PlusJakartaSans_400Regular,
    PlusJakartaSans_600SemiBold,
    PlusJakartaSans_700Bold,
    PlusJakartaSans_800ExtraBold,
  });

  if (!fontsLoaded) {
      return null;
  }
  // Now you can map over categoriesAndItems to display your data
  return (
    <ScrollView style={styles.container}>
      {categoriesAndItems.map((categoryData, index) => (
        <View key={index}>
          {categoryData.items.map((item, itemIndex) => (
            <View key={itemIndex} style={styles.item}>
              <Text style={styles.itemText}>{item.item}</Text>
            </View>
          ))}
        </View>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  item: {
    marginBottom: 10,
  },
  itemText: {
    fontSize: 16,
    fontFamily: 'PlusJakartaSans_500Medium',
  },
});

export default ReceiptReview;
