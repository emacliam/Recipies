import React from 'react';
import { useSelector } from 'react-redux';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { CATEGORIES } from '../data/dummy-data';
import MealList from '../components/MealList';

const CategoryMealsScreen = (props) => {
  const categoryId = props.navigation.getParam('categoryId');
  /*   const selectedCategory = CATEGORIES.find((cat) => cat.id === categoryId); */

  const availableMeals = useSelector((state) => state.meals.filteredMeals);
  const displayedMeals = availableMeals.filter(
    (meal) => meal.categoryIds.indexOf(categoryId) >= 0
  );
  if (displayedMeals.length === 0 || !displayedMeals) {
    return (
      <View>
        <Text>No Meals Here</Text>
      </View>
    );
  }
  return (
    <MealList displayedMeals={displayedMeals} navigation={props.navigation} />
  );
};

//setting the header title from data
CategoryMealsScreen.navigationOptions = (navigationData) => {
  const catID = navigationData.navigation.getParam('categoryId');
  const selectedCategory = CATEGORIES.find((cat) => cat.id === catID);
  return {
    headerTitle: selectedCategory.title,
  };
};

const styles = StyleSheet.create({});

export default CategoryMealsScreen;
