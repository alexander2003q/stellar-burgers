import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { TConstructorIngredient, TIngredient } from '@utils-types';

type ConstructorState = {
  bun: TIngredient | null;
  ingredients: TConstructorIngredient[];
};

const initialState: ConstructorState = {
  bun: null,
  ingredients: []
};

export const constructorSlice = createSlice({
  name: 'burgerConstructor',
  initialState,
  reducers: {
    addIngredient: (state, action: PayloadAction<TConstructorIngredient>) => {
      const ingredient = action.payload;

      if (ingredient.type === 'bun') {
        state.bun = ingredient;
        return;
      }

      state.ingredients.push(ingredient);
    },
    removeIngredient: (state, action: PayloadAction<string>) => {
      state.ingredients = state.ingredients.filter(
        (ingredient) => ingredient.id !== action.payload
      );
    },
    moveIngredientUp: (state, action: PayloadAction<number>) => {
      const index = action.payload;
      if (index <= 0 || index >= state.ingredients.length) {
        return;
      }

      [state.ingredients[index - 1], state.ingredients[index]] = [
        state.ingredients[index],
        state.ingredients[index - 1]
      ];
    },
    moveIngredientDown: (state, action: PayloadAction<number>) => {
      const index = action.payload;
      if (index < 0 || index >= state.ingredients.length - 1) {
        return;
      }

      [state.ingredients[index], state.ingredients[index + 1]] = [
        state.ingredients[index + 1],
        state.ingredients[index]
      ];
    },
    clearConstructor: (state) => {
      state.bun = null;
      state.ingredients = [];
    }
  }
});

export const {
  addIngredient,
  removeIngredient,
  moveIngredientUp,
  moveIngredientDown,
  clearConstructor
} = constructorSlice.actions;

export const constructorReducer = constructorSlice.reducer;
