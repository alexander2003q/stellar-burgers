import { rootReducer } from './store';
import { ingredientsReducer } from './slices/ingredientsSlice';
import { constructorReducer } from './slices/constructorSlice';
import { feedReducer } from './slices/feedSlice';
import { userOrdersReducer } from './slices/userOrdersSlice';
import { userReducer } from './slices/userSlice';
import { orderReducer } from './slices/orderSlice';

describe('rootReducer', () => {
  it('should return initial state', () => {
    const action = { type: 'UNKNOWN_ACTION' };
    const state = rootReducer(undefined, action);

    expect(state).toEqual({
      ingredients: ingredientsReducer(undefined, action),
      burgerConstructor: constructorReducer(undefined, action),
      feed: feedReducer(undefined, action),
      userOrders: userOrdersReducer(undefined, action),
      user: userReducer(undefined, action),
      order: orderReducer(undefined, action)
    });
  });
});
