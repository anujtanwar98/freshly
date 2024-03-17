import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useFonts, PlusJakartaSans_500Medium, PlusJakartaSans_400Regular, PlusJakartaSans_600SemiBold, PlusJakartaSans_700Bold, PlusJakartaSans_800ExtraBold } from '@expo-google-fonts/plus-jakarta-sans';
import Checkbox from 'expo-checkbox';
import { useNavigation } from '@react-navigation/native';
import { Iconify } from 'react-native-iconify';

const ReceiptReview = ({ route }) => {
  const { items } = route.params;
  const navigation = useNavigation();

  // Convert object into an array of categories and their items
  const [categoriesAndItems, setCategoriesAndItems] = useState(
    Object.keys(items).map(category => ({
      category,
      items: items[category].map(item => ({
        ...item,
        isChecked: true,
      })),
    }))
  );

  const toggleCheckbox = (categoryIndex, itemIndex) => {
    // Assuming categoriesAndItems is part of your component's state:
    setCategoriesAndItems(currentCategoriesAndItems => {
      const newCategoriesAndItems = currentCategoriesAndItems.map((categoryData, index) => {
        if (index === categoryIndex) {
          return {
            ...categoryData,
            items: categoryData.items.map((item, idx) => {
              if (idx === itemIndex) {
                return { ...item, isChecked: !item.isChecked };
              }
              return item;
            }),
          };
        }
        return categoryData;
      });
      return newCategoriesAndItems;
    });
  };

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

  const navigateToMyFridge = () => {
    navigation.navigate('My Fridge');
  };  
  // Now you can map over categoriesAndItems to display your data
  return (
    <View style={{ backgroundColor: '#FBFBFB', flex: 1 }}>
    <>
      <ScrollView style={styles.container}>
        <Text style={styles.mainTitle}>Receipt Review</Text>
        {categoriesAndItems.map((categoryData, categoryIndex) => (
          <View key={categoryIndex}>
            {categoryData.items.map((item, itemIndex) => (
              <View style={styles.outsideBox}>
                <React.Fragment key={itemIndex}>
                  <Checkbox value={item.isChecked} onValueChange={() => toggleCheckbox(categoryIndex, itemIndex)} color={item.isChecked ? '#7CC106' : undefined} style={styles.checkbox} />
                  <View key={itemIndex} style={styles.itemBox}>
                    <Text style={styles.itemText}>{item.item}</Text>
                  </View>
                </React.Fragment>
              </View>
            ))}
          </View>
        ))}
      </ScrollView>
      <View style={styles.confirmButtonBox}>
        <TouchableOpacity style={styles.confirmButton} onPress={navigateToMyFridge}>
          <View style={styles.iconConfirmText}>
            <Iconify icon="icon-park-outline:check-one"color='white' size={18}/>
            <Text style={styles.confirmButtonText}>Confirm</Text>
          </View>
        </TouchableOpacity>
      </View>
    </>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingLeft: 24,
    paddingRight: 24,
    backgroundColor: '#FBFBFB',
    marginBottom: 80,
  },
  mainTitle: {
    fontSize: 24,
    fontFamily: 'PlusJakartaSans_800ExtraBold',
    marginBottom: 20,
    color: '#168715',
  },
  outsideBox: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  itemBox: {
    marginBottom: 10,
    backgroundColor: '#FFFFFF',
    padding: 10,
    borderRadius: 6,
    borderWidth: 2,
    borderColor: '#7CC106',
    width: '90%',
    marginLeft: 10,
  },
  itemText: {
    fontSize: 16,
    fontFamily: 'PlusJakartaSans_500Medium',
  },
  iconConfirmText: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  confirmButtonBox: {
    position: 'absolute',
    bottom: 10,
    width: '100%',
    alignItems: 'center',
    paddingRight: 24,
    paddingLeft: 24,
    backgroundColor: '#FBFBFB',
  },
  confirmButton: {
    backgroundColor: '#168715',
    borderRadius: 50,
    width: '100%',
    alignItems: 'center',
    height: 53,
    justifyContent: 'center',
    marginBottom: 10,
  },
  confirmButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontFamily: 'PlusJakartaSans_600SemiBold',
    marginLeft: 10,
  },
});

export default ReceiptReview;
