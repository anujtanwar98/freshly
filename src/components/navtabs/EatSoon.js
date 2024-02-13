import React from 'react';
import { View, Text } from 'react-native';

const EatSoon = ({ route }) => {
    const { eatSoonItems } = route.params;
    return (
      <View>
        {eatSoonItems.map((item, index) => (
        //   <View key={index}>
        //     <Text>{item.item} - {item.freshness_duration_max} days left</Text>
        //   </View>
        <View key={index}>
                <Text>{item.emoji}</Text>
                <Text numberOfLines={1}>{item.item}</Text>
                <Text>Fresh for: {item.freshness_duration_min}-{item.freshness_duration_max} days</Text>
            </View>
        ))}
      </View>
    );
  };

export default EatSoon;
