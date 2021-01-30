//set inital state
import { MEALS } from '../../data/dummy-data';
import { TOGGLE_FAVORITES, SET_FILTERS } from '../actions/meals';

const initialState = {
  meals: MEALS,
  filteredMeals: MEALS,
  //you can set state from the server, lyk when user closes application , the state remains
  favoriteMeals: [],
};

const mealsReducer = function (state = initialState, action) {
  switch (action.type) {
    case TOGGLE_FAVORITES:
      const existingIndex = state.favoriteMeals.findIndex(
        (meal) => meal.id === action.mealId
      );
      if (existingIndex >= 0) {
        const updatedFavMeals = [...state.favoriteMeals];
        updatedFavMeals.splice(existingIndex, 1);
        return {
          ...state,
          favoriteMeals: updatedFavMeals,
        };
      } else {
        const addmeal = state.meals.find((meal) => meal.id === action.mealId);
        return {
          ...state,
          favoriteMeals: state.favoriteMeals.concat(addmeal),
        };
      }
    case SET_FILTERS:
      const appliedFilters = action.filters;
      const updatedfilteredMeals = state.meals.filter((meal) => {
        if (appliedFilters.glutenFree && !meal.isGlutenFree) {
          return false;
        }
        if (appliedFilters.lactoseFree && !meal.isLactoseFree) {
          return false;
        }
        if (appliedFilters.vegan && !meal.isVegan) {
          return false;
        }
        if (appliedFilters.Vegetarian && !meal.isVegetarian) {
          return false;
        }
        return true;
      });
      return {
        ...state,
        filteredMeals: updatedfilteredMeals,
      };
    default:
      return state;
  }
};

export default mealsReducer;
