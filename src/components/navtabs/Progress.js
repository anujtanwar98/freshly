import React from 'react';
import { View, Text, SafeAreaView, StyleSheet, TouchableOpacity} from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import { Dimensions } from 'react-native';
const screenWidth = Dimensions.get('window').width;

const chartConfig = {
    backgroundColor: "#e26a00",
    backgroundGradientFrom: "#fb8c00",
    backgroundGradientTo: "#ffa726",
    decimalPlaces: 2, // optional, defaults to 2dp
    color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
    labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
    style: {
      borderRadius: 16
    },
    propsForDots: {
      r: "6",
      strokeWidth: "2",
      stroke: "#ffa726"
    }
  };
  

const data = {
    labels: ["Day 1", "Day 2", "Day 3", "Day 4", "Day 5"],
    datasets: [
      {
        data: [20, 45, 28, 80, 99], // Number of completed tasks
        color: (opacity = 1) => `rgba(134, 65, 244, ${opacity})`, // optional
        strokeWidth: 2 // optional
      },
      {
        data: [30, 78, 43, 95, 65], // Number of tasks not completed
        color: (opacity = 1) => `rgba(255, 99, 132, ${opacity})`, // optional
        strokeWidth: 2 // optional
      }
    ]
  };

  const legendData = [
    { name: 'Completed Tasks', color: 'rgba(134, 65, 244, 1)' },
    { name: 'Tasks Not Completed', color: 'rgba(255, 99, 132, 1)' },
  ];

  const Legend = ({ data }) => (
    <View style={styles.legendContainer}>
      {data.map((item, index) => (
        <View key={index} style={styles.legendItem}>
          <View style={[styles.legendIndicator, { backgroundColor: item.color }]} />
          <Text style={styles.legendText}>{item.name}</Text>
        </View>
      ))}
    </View>
  );
  
const Progress = () => {
    return (
        // <SafeAreaView style={styles.mainWrapper}>
    <View style={styles.mainWrapper}>
       <View style={styles.container}>
       <Text style={styles.text}>My Progress</Text>
       </View>
       <View>
        <Text>Trend of Tasks Completion</Text>
        <LineChart
            data={data}
            width={screenWidth}
            height={220}
            chartConfig={chartConfig}
        />
        <Legend data={legendData} />
        </View>
    </View>
    )
}

const styles = StyleSheet.create({
    mainWrapper: {
        flex: 1,
        backgroundColor: '#FA8072',
        
      },
      container: {
        paddingTop: 80,
        // flex: 1,
        // backgroundColor: '#FA8072',
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
      chartContainer: {
        alignItems: 'center',
        marginTop: 16,
      },
      chartTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 8,
      },
      legendContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 16,
      },
      legendItem: {
        flexDirection: 'row',
        alignItems: 'center',
        marginRight: 20,
      },
      legendIndicator: {
        width: 16,
        height: 16,
        borderRadius: 8,
        marginRight: 6,
      },
      legendText: {
        fontSize: 14,
      },
})

export default Progress;