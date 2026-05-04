import { rootReducer } from './store';

describe('rootReducer', () => {
  it('should return initial state', () => {
    const state = rootReducer(undefined, { type: 'UNKNOWN_ACTION' });

    expect(state).toEqual({
      ingredients: {
        items: [],
        isLoading: false,
        error: null
      },
      burgerConstructor: {
        bun: null,
        ingredients: []
      },
      feed: {
        orders: [],
        total: 0,
        totalToday: 0,
        isLoading: false,
        error: null
      },
      userOrders: {
        orders: [],
        isLoading: false,
        error: null
      },
      user: {
        user: null,
        isAuthChecked: false,
        request: false,
        authError: null,
        updateUserError: null
      },
      order: {
        orderRequest: false,
        orderModalData: null,
        orderData: null,
        orderError: null,
        isOrderLoading: false
      }
    });
  });
});
