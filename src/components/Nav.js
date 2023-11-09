import React from "react";
import HomeMain from "./navtabs/AllFood";
import Progress from "./navtabs/Progress";
import Scan from "./navtabs/Scan";
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Feather } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';

const Tab = createBottomTabNavigator()

const Nav = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator 
      screenOptions={{
        tabBarActiveTintColor: 'tomato',
        tabBarInactiveTintColor: 'gray',
        tabBarStyle: {
          backgroundColor: '#3E48A0',
        },
        }}>
          <Tab.Screen name="Home" component={HomeMain} options={{
            tabBarIcon: ({ focused  }) => (
              <Feather name="home" color={focused ? 'tomato' : 'black'} size={25} />
            )
          }} />
          <Tab.Screen name="Scan" component={Scan} options={{
            tabBarIcon: ({ focused }) => (
              <Ionicons name="scan" color={focused ? 'tomato' : 'black'} size={25} />
            )
          }} />
          <Tab.Screen name="Progress" component={Progress} options={{
            tabBarIcon: ({ focused }) => (
              <MaterialCommunityIcons name="chart-line" color={focused ? 'tomato' : 'black'} size={25} />
            )
          }} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

export default Nav;