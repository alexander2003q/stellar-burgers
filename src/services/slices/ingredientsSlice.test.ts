import { TIngredient } from '@utils-types';
import { fetchIngredients, ingredientsReducer } from './ingredientsSlice';

const ingredientsMock: TIngredient[] = [
  {
    _id: 'bun-1',
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
  }
];

describe('ingredients slice reducer', () => {
  it('should set isLoading=true on request action', () => {
    const state = ingredientsReducer(
      undefined,
      fetchIngredients.pending('request-id', undefined)
    );

    expect(state.isLoading).toBe(true);
    expect(state.error).toBeNull();
  });

  it('should set items and isLoading=false on success action', () => {
    const state = ingredientsReducer(
      undefined,
      fetchIngredients.fulfilled(ingredientsMock, 'request-id', undefined)
    );

    expect(state.items).toEqual(ingredientsMock);
    expect(state.isLoading).toBe(false);
    expect(state.error).toBeNull();
  });

  it('should set error and isLoading=false on failed action', () => {
    const state = ingredientsReducer(
      undefined,
      fetchIngredients.rejected(new Error('Ошибка загрузки'), 'request-id')
    );

    expect(state.error).toBe('Ошибка загрузки');
    expect(state.isLoading).toBe(false);
  });
});
