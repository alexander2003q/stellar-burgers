import { TConstructorIngredient } from '@utils-types';
import {
  addIngredient,
  constructorReducer,
  moveIngredientDown,
  moveIngredientUp,
  removeIngredient
} from './constructorSlice';

const bun: TConstructorIngredient = {
  _id: 'bun-1',
  id: 'bun-1-instance',
  name: 'Краторная булка N-200i',
  type: 'bun',
  proteins: 80,
  fat: 24,
  carbohydrates: 53,
  calories: 420,
  price: 1255,
  image: 'https://code.s3.yandex.net/react/code/bun-02.png',
  image_large: 'https://code.s3.yandex.net/react/code/bun-02-large.png',
  image_mobile: 'https://code.s3.yandex.net/react/code/bun-02-mobile.png'
};

const mainOne: TConstructorIngredient = {
  _id: 'main-1',
  id: 'main-1-instance',
  name: 'Биокотлета из марсианской Магнолии',
  type: 'main',
  proteins: 420,
  fat: 142,
  carbohydrates: 242,
  calories: 4242,
  price: 424,
  image: 'https://code.s3.yandex.net/react/code/meat-01.png',
  image_large: 'https://code.s3.yandex.net/react/code/meat-01-large.png',
  image_mobile: 'https://code.s3.yandex.net/react/code/meat-01-mobile.png'
};

const mainTwo: TConstructorIngredient = {
  ...mainOne,
  _id: 'main-2',
  id: 'main-2-instance',
  name: 'Филе Люминесцентного тетраодонтимформа'
};

describe('burgerConstructor slice reducer', () => {
  it('should handle adding ingredient', () => {
    const withBun = constructorReducer(undefined, addIngredient(bun));
    const withMain = constructorReducer(withBun, addIngredient(mainOne));

    expect(withMain.bun?._id).toBe('bun-1');
    expect(withMain.ingredients).toEqual([mainOne]);
  });

  it('should handle removing ingredient', () => {
    const stateWithIngredients = {
      bun,
      ingredients: [mainOne, mainTwo]
    };
    const state = constructorReducer(
      stateWithIngredients,
      removeIngredient(mainOne.id)
    );

    expect(state.ingredients).toEqual([mainTwo]);
  });

  it('should handle moveIngredientDown', () => {
    const stateWithIngredients = {
      bun,
      ingredients: [mainOne, mainTwo]
    };
    const state = constructorReducer(
      stateWithIngredients,
      moveIngredientDown(0)
    );

    expect(state.ingredients).toEqual([mainTwo, mainOne]);
  });

  it('should not change order when moveIngredientDown on last element', () => {
    const stateWithIngredients = {
      bun,
      ingredients: [mainOne, mainTwo]
    };
    const state = constructorReducer(
      stateWithIngredients,
      moveIngredientDown(1)
    );

    expect(state.ingredients).toEqual([mainOne, mainTwo]);
  });

  it('should handle moveIngredientUp', () => {
    const stateWithIngredients = {
      bun,
      ingredients: [mainOne, mainTwo]
    };
    const state = constructorReducer(
      stateWithIngredients,
      moveIngredientUp(1)
    );

    expect(state.ingredients).toEqual([mainTwo, mainOne]);
  });

  it('should not change order when moveIngredientUp on first element', () => {
    const stateWithIngredients = {
      bun,
      ingredients: [mainOne, mainTwo]
    };
    const state = constructorReducer(
      stateWithIngredients,
      moveIngredientUp(0)
    );

    expect(state.ingredients).toEqual([mainOne, mainTwo]);
  });
});
