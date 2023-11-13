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
        tabBarActiveTintColor: '#FFA197',
        tabBarInactiveTintColor: '#C8C8C8',
        tabBarStyle: {
          backgroundColor: '#820C00',
        },
        tabBarLabelStyle: {
          fontSize: 14,
        },
        }}>
          <Tab.Screen name="Home" component={HomeMain} options={{
            tabBarIcon: ({ focused  }) => (
              <Feather name="home" color={focused ? '#FFA197' : '#C8C8C8'} size={25} />
            ),
            headerShown: false,
          }} />
          <Tab.Screen name="Scan" component={Scan} options={{
            tabBarIcon: ({ focused }) => (
              <Ionicons name="scan" color={focused ? '#FFA197' : '#C8C8C8'} size={25} />
            ),
            headerShown: false,
          }} />
          <Tab.Screen name="Progress" component={Progress} options={{
            tabBarIcon: ({ focused }) => (
              <MaterialCommunityIcons name="chart-line" color={focused ? '#FFA197' : '#C8C8C8'} size={25} />
            ),
            headerShown: false,
          }} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

export default Nav;