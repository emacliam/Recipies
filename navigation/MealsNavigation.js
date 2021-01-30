import React from 'react';
import { createStackNavigator } from 'react-navigation-stack';
import { createAppContainer } from 'react-navigation';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs';
import { createDrawerNavigator } from 'react-navigation-drawer';
import CategoriesScreen from '../screens/CategoriesScreen';
import CategoryMealsScreen from '../screens/CategoryMealsScreen';
import MealDetailScreen from '../screens/MealDetailScreen';
import FavoritesScreen from '../screens/FavoritesScreen';
import FiltersScreen from '../screens/FiltersScreen';
import Colors from '../constants/Colors';
import { Ionicons } from '@expo/vector-icons';

//you can split the navigation into seperate files and import them(drawer,tabs,stack)
const MealsNavigator = createStackNavigator(
  {
    Categories: {
      screen: CategoriesScreen,
      navigationOptions: {
        headerTitle: 'Meal Categories',
      },
    },
    CategoryMeals: {
      screen: CategoryMealsScreen,
      navigationOptions: {},
    },
    MealsDetail: {
      screen: MealDetailScreen,
    },
  },
  {
    defaultNavigationOptions: {
      headerStyle: {
        backgroundColor: Colors.primaryColor,
      },
      headerTintColor: 'white',
    },
    initialRouteName: 'Categories',
    mode: 'card',
  }
);

const FavStack = createStackNavigator(
  {
    Favorites: FavoritesScreen,
    MealsDetail: MealDetailScreen,
  },
  {
    defaultNavigationOptions: {
      headerStyle: {
        backgroundColor: Colors.primaryColor,
      },
      headerTintColor: 'white',
      /*   headerTitleStyle:{

      } */
    },
    initialRouteName: 'Favorites',
    mode: 'card',
  }
);

const FiltersScreenStack = createStackNavigator(
  {
    Filters: {
      screen: FiltersScreen,
    },
  },
  {
    //used when navigator is used as a screen or the other method
    /*  navigationOptions: {
      drawerLabel: 'filts',
    }, */
    defaultNavigationOptions: {
      headerStyle: {
        backgroundColor: Colors.primaryColor,
      },
      headerTintColor: 'white',
    },
  }
);

//tab navigator
const MealsFavTabNavigator = createMaterialBottomTabNavigator(
  {
    Meals: {
      screen: MealsNavigator,
      navigationOptions: {
        tabBarLabel: 'Meals',
        tabBarIcon: (tabInfo) => {
          return (
            <Ionicons
              name="ios-restaurant"
              size={25}
              color={tabInfo.tintColor}
            />
          );
        },
        tabBarColor: Colors.primaryColor,
      },
    },
    Favorites: {
      screen: FavStack,
      navigationOptions: {
        tabBarLabel: 'Favorites',
        tabBarIcon: (tabInfo) => {
          return (
            <Ionicons name="ios-star" size={25} color={tabInfo.tintColor} />
          );
        },
        tabBarColor: Colors.accentColor,
        /*   tabBarLabel:<Text style="">Favourites</Text> */
      },
    },
  },
  {
    //not for material
    /* tabBarOptions: {
      activeTintColor: Colors.accentColor,
    }, */
    activeTintColor: 'white',
    shifting: true,
    barStyle: {
      //if shifting is off
      backgroundColor: Colors.primaryColor,
    },
  }
);

//drawer navigator
const MainNavigator = createDrawerNavigator(
  {
    MealsFav: {
      screen: MealsFavTabNavigator, //this method
      navigationOptions: {
        drawerLabel: 'Meals',
      },
    },
    Filters: {
      screen: FiltersScreenStack,
      navigationOptions: {
        drawerLabel: 'Filters',
      },
    },
  },
  {
    contentOptions: {
      activeTintColor: Colors.accentColor,
      /*  labelStyle:{

      } */
    },
  }
);

export default createAppContainer(MainNavigator);
