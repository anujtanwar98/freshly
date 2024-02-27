import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, FlatList, ScrollView } from 'react-native';
import { useFonts, PlusJakartaSans_500Medium, PlusJakartaSans_400Regular, PlusJakartaSans_600SemiBold, PlusJakartaSans_700Bold, PlusJakartaSans_800ExtraBold } from '@expo-google-fonts/plus-jakarta-sans';

const numColumns = 3;

const EatSoon = ({ route }) => {
  const { eatSoonItems } = route.params;

  const eatWithin2Days = eatSoonItems.filter(item => item.freshness_duration_max <= 2);
  const eatWithin5Days = eatSoonItems.filter(item => item.freshness_duration_max > 2);

  const renderItem = ({ item, index }) => (
    <View style={styles.eat_soon_container}>
      <View style={styles.eat_soon_circle}>
        <Text style={styles.eat_soon_emoji}>{item.emoji}</Text>
        <Text style={item.freshness_duration_max <= 2 ? styles.eat_soon_subText_Red : styles.eat_soon_subText_Orange}>
          {item.freshness_duration_min}-{item.freshness_duration_max} days
        </Text>
      </View>
      <Text numberOfLines={1} style={styles.eat_soon_mainText}>{item.item}</Text>
    </View>
  );

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

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView>
      <View style={styles.container}>
        <Text style={styles.main_eat_soon_title}>Eat Soon</Text>

        {eatWithin2Days.length > 0 && (
          <>
            <Text style={styles.eat2SectionTitle}>Eat within 2 days</Text>
            <View>
            <FlatList
              data={eatWithin2Days}
              renderItem={renderItem}
              keyExtractor={(item, index) => index.toString()}
              numColumns={numColumns}
            />
            </View>
          </>
        )}
        {eatWithin5Days.length > 0 && (
          <>
            <Text style={styles.eat5SectionTitle}>Eat within 5 days</Text>
            <View>
            <FlatList
              data={eatWithin5Days}
              renderItem={renderItem}
              keyExtractor={(item, index) => index.toString()}
              numColumns={numColumns}
            />
            </View>
          </>
        )}
      </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default EatSoon;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#FBFBFB',
  },
  container: {
    backgroundColor: '#FBFBFB',
  },
  main_eat_soon_title: {
    fontSize: 24,
    margin: 20,
    fontFamily: 'PlusJakartaSans_800ExtraBold',
    color: '#168715',
  },
  eat_soon_container_upper: {
    flex: 1,
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    margin: 20,
  },
  eat_soon_container_lower: {
    flex: 1,
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    margin: 20,
  },
  eat2SectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    // margin: 10,
    marginLeft: 20,
    marginBottom: 10,
    fontFamily: 'PlusJakartaSans_600SemiBold',
    color: '#E41C1C',
  },
  eat5SectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    // margin: 10,
    marginLeft: 20,
    marginTop: 20,
    marginBottom: 10,
    fontFamily: 'PlusJakartaSans_600SemiBold',
    color: '#F78908',
  },
  eat_soon_container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    maxWidth: '33%',
  },
  eat_soon_circle: {
    width: 109,
    height: 109,
    borderRadius: 100,
    backgroundColor: '#ffffff',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E9E9E9',
    position: 'relative',
    marginTop: 5,
  },
  eat_soon_emoji: {
    // width: 50,
    // height: 50,
    // position: 'absolute',
    // top: 10,
    fontSize: 30,
  },
  eat_soon_subText_Orange: {
    position: 'absolute',
    bottom: 10,
    fontSize: 16,
    color: '#F78908',
    fontFamily: 'PlusJakartaSans_600SemiBold',
  },
  eat_soon_subText_Red: {
    position: 'absolute',
    bottom: 10,
    fontSize: 16,
    color: '#E41C1C',
    fontFamily: 'PlusJakartaSans_600SemiBold',
  },
  eat_soon_mainText: {
    marginTop: 5,
    fontSize: 14,
    color: '#163C16',
    fontFamily: 'PlusJakartaSans_600SemiBold',
    marginBottom: 10,
    maxWidth: 100,
  },
});
