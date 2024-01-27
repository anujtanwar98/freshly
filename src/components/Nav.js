import React from "react";
import HomeMain from "./navtabs/HomeMain";
import Progress from "./navtabs/Progress";
import Leftover from "./navtabs/Leftover";
import UploadReceiptScreen from "./navtabs/Test";
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Feather } from '@expo/vector-icons';
import { MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';
// import FoodLogo from './assets/foodLogoSVG';
import { createStackNavigator } from '@react-navigation/stack';
import DetailScreen from "./navtabs/DetailScreen";

const Tab = createBottomTabNavigator()
const UploadReceiptStack = createStackNavigator();

function UploadReceiptStackScreen() {
  return (
    <UploadReceiptStack.Navigator>
      <UploadReceiptStack.Screen name="My Food" component={UploadReceiptScreen} options={{ headerShown: false }} />
      <UploadReceiptStack.Screen name="DetailScreen" component={DetailScreen} options={{ headerTitle: '' }} />
    </UploadReceiptStack.Navigator>
  );
}

const Nav = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator 
      screenOptions={{
        tabBarActiveTintColor: '#7CC106',
        tabBarInactiveTintColor: '#808B9F',
        tabBarStyle: {
          backgroundColor: '#ffffff',
        },
        tabBarLabelStyle: {
          fontSize: 14,
        },
        }}>
          <Tab.Screen name="My Food" component={HomeMain} options={{
            tabBarIcon: ({ focused  }) => (
              <FontAwesome5 name="carrot" color={focused ? '#7CC106' : '#808B9F'} size={25} />
              // <FoodLogo size={24} color={focused ? '#7CC106' : '#808B9F'} />
            ),
            headerShown: false,
          }} />
          <Tab.Screen name="Explore" component={UploadReceiptStackScreen} options={{
            tabBarIcon: ({ focused }) => (
              <MaterialIcons name="explore" color={focused ? '#7CC106' : '#808B9F'} size={25} />
            ),
            headerShown: false,
          }} />
          <Tab.Screen name="Recipes" component={Progress} options={{
            tabBarIcon: ({ focused }) => (
              <MaterialCommunityIcons name="chef-hat" color={focused ? '#7CC106' : '#808B9F'} size={25} />
            ),
            headerShown: false,
          }} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

export default Nav;