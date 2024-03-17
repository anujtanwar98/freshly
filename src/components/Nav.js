import React from "react";
import Recipes from "./navtabs/Recipes";
import Explore from "./navtabs/Explore";
import UploadReceiptScreen from "./navtabs/HomeMain";
import { NavigationContainer, getFocusedRouteNameFromRoute } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Feather } from '@expo/vector-icons';
import { MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';
// import FoodLogo from './assets/foodLogoSVG';
import { createStackNavigator } from '@react-navigation/stack';
import DetailScreen from "./navtabs/DetailScreen";
import RecipeIdeas from "./navtabs/RecipeIdeas";
import DetailRecipeScreen from "./navtabs/DetailRecipeScreen";
import EditFoodScreen from "./navtabs/EditFoodScreen";
import EatSoon from "./navtabs/EatSoon";
import { useFonts, PlusJakartaSans_700Bold, PlusJakartaSans_600SemiBold } from '@expo-google-fonts/plus-jakarta-sans';
import { Text, View } from 'react-native';
import { Iconify } from 'react-native-iconify';
import MyChef from '../../assets/chefhat';
import MyLearnIcon from '../../assets/learnicon';
import ReceiptReview from "./navtabs/receiptReview";

const Tab = createBottomTabNavigator()
const UploadReceiptStack = createStackNavigator();
const RecipesStack = createStackNavigator();
const hideTabBarScreens = ['EditFoodScreen', 'ReceiptReview'];

function UploadReceiptStackScreen() {
  return (
    <UploadReceiptStack.Navigator
    screenOptions={{
      gestureEnabled: true,
      transitionSpec: {
        open: { animation: 'timing', config: { duration: 300 } },
        close: { animation: 'timing', config: { duration: 300 } },
      },
    }}>
      <UploadReceiptStack.Screen name="My Fridge" component={UploadReceiptScreen} options={{ headerShown: false }} />
      <UploadReceiptStack.Screen name="DetailScreen" component={DetailScreen} options={{ headerTitle: '', headerTitleStyle: { color: '#163C16' }, headerStyle: { backgroundColor: '#FBFBFB' }, headerTintColor: '#616774', }} />
      <UploadReceiptStack.Screen name="EditFoodScreen" component={EditFoodScreen} options={{ headerTitle: 'Edit Item', headerTitleStyle: { color: '#163C16' }, headerStyle: { backgroundColor: '#FBFBFB' }, headerTintColor: '#616774', }} />
      <UploadReceiptStack.Screen name="EatSoon" component={EatSoon} options={{ headerTitle: 'Eat Soon', headerTitleStyle: { color: '#163C16' }, headerStyle: { backgroundColor: '#FBFBFB' }, headerTintColor: '#616774', }} />
      <UploadReceiptStack.Screen
        name="ReceiptReview"
        component={ReceiptReview}
        options={{ headerTitle: '', headerBackTitle: "Redo", headerTintColor: '#616774', headerStyle: { backgroundColor: '#FBFBFB' }, 
        transitionSpec: {
          open: { animation: 'timing', config: { duration: 1 } },
          close: { animation: 'timing', config: { duration: 100 } },
        },
      }}
      />
    </UploadReceiptStack.Navigator>
  );
}

function RecipesStackScreen() {
  return (
    <RecipesStack.Navigator
    screenOptions={{
      gestureEnabled: true,
      transitionSpec: {
        open: { animation: 'timing', config: { duration: 300 } },
        close: { animation: 'timing', config: { duration: 300 } },
      },
    }}>
      <RecipesStack.Screen name="Recipes" component={Recipes} options={{ headerShown: false }} />
      <RecipesStack.Screen name="RecipeIdeas" component={RecipeIdeas} options={{ headerTitle: 'Recipe Ideas', headerTitleStyle: { color: '#163C16' }, headerStyle: { backgroundColor: '#FBFBFB' }, headerTintColor: '#616774', }} />
      <RecipesStack.Screen name="DetailRecipeScreen" component={DetailRecipeScreen} options={{ headerTitle: '', headerTintColor: '#616774', headerStyle: { backgroundColor: '#FBFBFB' }, }} />
    </RecipesStack.Navigator>
  );
}

const Nav = () => {
  let [fontsLoaded] = useFonts({
    PlusJakartaSans_700Bold,
    PlusJakartaSans_600SemiBold,
  });
  
  if (!fontsLoaded) {
    return null;
  }
  return (
    <NavigationContainer>
      {/* <Tab.Navigator 
      screenOptions={{
        tabBarActiveTintColor: '#7CC106',
        tabBarInactiveTintColor: '#808B9F',
        tabBarStyle: {
          backgroundColor: '#ffffff',
        },
        tabBarLabelStyle: {
          fontSize: 14,
          fontFamily: 'PlusJakartaSans_700Bold',
        },
        }}> */}
        <Tab.Navigator 
        screenOptions={({ route }) => ({
          tabBarActiveTintColor: '#168715',
          tabBarInactiveTintColor: '#808B9F',
          tabBarStyle: {
            backgroundColor: '#ffffff',
            display: hideTabBarScreens.includes(getFocusedRouteNameFromRoute(route)) ? 'none' : 'flex',
          },
          tabBarLabel: ({ focused, color }) => {
            const label = route.name;
            const fontFamily = focused ? 'PlusJakartaSans_700Bold' : 'PlusJakartaSans_600SemiBold';
            return <Text style={{ color, fontFamily, fontSize: 12 }}>{label}</Text>;
          },
        })}>
          <Tab.Screen name="My Fridge" component={UploadReceiptStackScreen} options={{
            tabBarIcon: ({ focused  }) => (
              // <FontAwesome5 name="carrot" color={focused ? '#7CC106' : '#808B9F'} size={25} />
              <Iconify icon="fluent:food-carrot-24-regular" color={focused ? '#168715' : '#808B9F'} size={25}/>
              // <FoodLogo size={24} color={focused ? '#7CC106' : '#808B9F'} />
            ),
            headerShown: false,
          }} />
          <Tab.Screen name="Learn" component={Explore} options={{
            tabBarIcon: ({ focused }) => (
              // <Iconify icon="nimbus:university" color={focused ? '#168715' : '#808B9F'} size={25} />
              <MyLearnIcon focused={focused} strokeWidth={1.75} />
            ),
            headerShown: false,
          }} />
          <Tab.Screen name="Recipes" component={RecipesStackScreen} options={{
            tabBarIcon: ({ focused }) => (
              <MyChef focused={focused}/>
            ),
            headerShown: false,
          }} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

export default Nav;