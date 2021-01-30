import React, { useEffect, useCallback } from 'react';
import { ScrollView, Image, View, Text, StyleSheet } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
//note this is plural
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import CustomHeaderButton from '../components/HeaderButton';

//import the action
import { toggleFavorite } from '../store/actions/meals';

const List = (props) => {
  return (
    <View style={styles.list}>
      <Text>{props.children}</Text>
    </View>
  );
};

const MealDetailScreen = (props) => {
  const { navigation } = props;
  const availableMeals = useSelector((state) => state.meals.meals);
  const mealid = props.navigation.getParam('mealId');

  const ItemDetails = availableMeals.find((meal) => meal.id === mealid);
  //this ca work but we can pass the data from where we are coming from
  /*   useEffect(() => {
    navigation.setParams({ mealTitle: ItemDetails.title });
  }, [ItemDetails]); */

  const dispatch = useDispatch();
  const toggleFavoriteHandler = useCallback(() => {
    dispatch(toggleFavorite(mealid));
  }, [dispatch, mealid]);

  useEffect(() => {
    props.navigation.setParams({ toggleFav: toggleFavoriteHandler });
  }, [toggleFavoriteHandler]);

  const isfavorite = useSelector((state) =>
    state.meals.favoriteMeals.some((meal) => meal.id === mealid)
  );
  useEffect(() => {
    props.navigation.setParams({ isFav: isfavorite });
  }, [isfavorite]);
  return (
    <ScrollView>
      <Image source={{ uri: ItemDetails.imageUrl }} style={styles.image} />
      <View
        style={{ ...styles.MealRow, ...styles.MealDetail, ...styles.Details }}
      >
        <Text>{ItemDetails.duration}</Text>
        <Text>{ItemDetails.complexity.toUpperCase()}</Text>
        <Text>{ItemDetails.affordability.toUpperCase()}</Text>
      </View>
      <Text style={styles.title}>Ingredients</Text>
      {ItemDetails.ingredients.map((item) => (
        <List key={item}>{item}</List>
      ))}
      <Text style={styles.steps}>Steps</Text>
      {ItemDetails.steps.map((item) => (
        <List key={item}>{item}</List>
      ))}
    </ScrollView>
  );
};

MealDetailScreen.navigationOptions = (navigationData) => {
  const mealtitle = navigationData.navigation.getParam('mealTitle');
  const toggleFav = navigationData.navigation.getParam('toggleFav');
  const isFav = navigationData.navigation.getParam('isFav');

  return {
    headerTitle: mealtitle,
    headerRight: () => (
      <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
        <Item
          title="star"
          iconName={isFav ? 'ios-star' : 'ios-star-outline'}
          onPress={toggleFav}
        />
      </HeaderButtons>
    ),
  };
};

const styles = StyleSheet.create({
  image: {
    width: '100%',
    height: 200,
  },
  Details: {
    flexDirection: 'row',
    padding: 15,
    justifyContent: 'space-around',
  },
  title: {
    fontSize: 22,
    textAlign: 'center',
    marginVertical: 10,
  },
  steps: {
    fontSize: 22,
    textAlign: 'center',
    marginVertical: 10,
  },
  list: {
    marginVertical: 10,
    marginHorizontal: 20,
    borderColor: '#ccc',
    borderWidth: 1,
    padding: 10,
  },
});

export default MealDetailScreen;
