import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { useSelector } from 'react-redux';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import CustomHeaderButton from '../components/HeaderButton';
import MealList from '../components/MealList';

const FavoritesScreen = (props) => {
  /*  const categoryId = props.navigation.getParam('categoryId'); */
  /*   const selectedCategory = CATEGORIES.find((cat) => cat.id === categoryId); */
  const displayedMeals = useSelector((state) => state.meals.favoriteMeals);
  if (displayedMeals.length === 0 || !displayedMeals) {
    return (
      <View>
        <Text>No Favorite meal found</Text>
      </View>
    );
  }
  return (
    <MealList displayedMeals={displayedMeals} navigation={props.navigation} />
  );
};

FavoritesScreen.navigationOptions = (navigationData) => {
  return {
    headerTitle: 'Favorites',
    headerLeft: () => (
      <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
        <Item
          title="drawer menu"
          iconName="ios-menu"
          onPress={() => {
            navigationData.navigation.toggleDrawer();
          }}
        />
      </HeaderButtons>
    ),
  };
};
const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default FavoritesScreen;
