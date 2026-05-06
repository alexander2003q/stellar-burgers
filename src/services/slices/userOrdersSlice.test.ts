import { TOrder } from '@utils-types';
import {
  fetchUserOrders,
  resetUserOrders,
  userOrdersReducer
} from './userOrdersSlice';

const mockOrders: TOrder[] = [
  {
    _id: 'order-1',
    status: 'done',
    name: 'Test Burger',
    createdAt: '2024-01-01T00:00:00.000Z',
    updatedAt: '2024-01-01T00:00:00.000Z',
    number: 12345,
    ingredients: ['bun-1', 'main-1', 'bun-1']
  }
];

describe('userOrders slice reducer', () => {
  it('should set isLoading=true on pending', () => {
    const state = userOrdersReducer(
      undefined,
      fetchUserOrders.pending('request-id')
    );

    expect(state.isLoading).toBe(true);
    expect(state.error).toBeNull();
  });

  it('should set orders and isLoading=false on fulfilled', () => {
    const state = userOrdersReducer(
      undefined,
      fetchUserOrders.fulfilled(mockOrders, 'request-id')
    );

    expect(state.orders).toEqual(mockOrders);
    expect(state.isLoading).toBe(false);
  });

  it('should set error and isLoading=false on rejected', () => {
    const state = userOrdersReducer(
      undefined,
      fetchUserOrders.rejected(new Error('Ошибка'), 'request-id')
    );

    expect(state.error).toBe('Ошибка');
    expect(state.isLoading).toBe(false);
  });

  it('should reset state on resetUserOrders', () => {
    const stateWithOrders = {
      orders: mockOrders,
      isLoading: false,
      error: 'some error'
    };

    const state = userOrdersReducer(stateWithOrders, resetUserOrders());

    expect(state.orders).toEqual([]);
    expect(state.error).toBeNull();
    expect(state.isLoading).toBe(false);
  });
});
