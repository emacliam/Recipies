import React from 'react';
import { FlatList, StyleSheet, View, Text } from 'react-native';
import Mealitem from '../components/Mealitem';
import { useSelector } from 'react-redux';

const MealList = (props) => {
  const isFavorite = useSelector((state) => state.meals.favoriteMeals);

  const renderMealItem = (itemData) => {
    //we can use useSelector in here coz it only works on the root component , in this case its mealList
    const isFavs = isFavorite.some((meal) => meal.id === itemData.item.id);
    return (
      <View style={styles.container}>
        <Mealitem
          DisplayData={itemData}
          duration={itemData.item.duration}
          complexity={itemData.item.complexity}
          affordability={itemData.item.affordability}
          image={itemData.item.imageUrl}
          title={itemData.item.title}
          onSelectMeal={() => {
            props.navigation.navigate({
              routeName: 'MealsDetail',
              params: {
                mealId: itemData.item.id,
                mealTitle: itemData.item.title,
                isFav: isFavs,
              },
            });
          }}
        />
      </View>
    );
  };
  return (
    <View style={styles.screen}>
      <FlatList
        data={props.displayedMeals}
        renderItem={renderMealItem}
        keyExtractor={(x, index) => x.id}
        style={{ width: '100%' }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    margin: 10,
  },
});

export default MealList;
