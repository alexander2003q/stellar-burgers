import { TOrder } from '@utils-types';
import {
  closeOrderModal,
  clearOrderData,
  createOrder,
  getOrderByNumber,
  orderReducer
} from './orderSlice';

const mockOrder: TOrder = {
  _id: 'order-1',
  status: 'done',
  name: 'Test Burger',
  createdAt: '2024-01-01T00:00:00.000Z',
  updatedAt: '2024-01-01T00:00:00.000Z',
  number: 12345,
  ingredients: ['bun-1', 'main-1', 'bun-1']
};

describe('order slice reducer', () => {
  it('should set orderRequest=true on createOrder.pending', () => {
    const state = orderReducer(
      undefined,
      createOrder.pending('request-id', ['bun-1', 'main-1'])
    );

    expect(state.orderRequest).toBe(true);
    expect(state.orderError).toBeNull();
  });

  it('should set orderModalData on createOrder.fulfilled', () => {
    const state = orderReducer(
      undefined,
      createOrder.fulfilled(mockOrder, 'request-id', ['bun-1', 'main-1'])
    );

    expect(state.orderRequest).toBe(false);
    expect(state.orderModalData).toEqual(mockOrder);
  });

  it('should set orderError on createOrder.rejected', () => {
    const state = orderReducer(
      undefined,
      createOrder.rejected(new Error('Ошибка заказа'), 'request-id', [
        'bun-1',
        'main-1'
      ])
    );

    expect(state.orderRequest).toBe(false);
    expect(state.orderError).toBe('Ошибка заказа');
  });

  it('should set isOrderLoading=true on getOrderByNumber.pending', () => {
    const state = orderReducer(
      undefined,
      getOrderByNumber.pending('request-id', 12345)
    );

    expect(state.isOrderLoading).toBe(true);
  });

  it('should set orderData on getOrderByNumber.fulfilled', () => {
    const state = orderReducer(
      undefined,
      getOrderByNumber.fulfilled(mockOrder, 'request-id', 12345)
    );

    expect(state.isOrderLoading).toBe(false);
    expect(state.orderData).toEqual(mockOrder);
  });

  it('should set orderError on getOrderByNumber.rejected', () => {
    const state = orderReducer(
      undefined,
      getOrderByNumber.rejected(new Error('Не найден'), 'request-id', 12345)
    );

    expect(state.isOrderLoading).toBe(false);
    expect(state.orderError).toBe('Не найден');
  });

  it('should clear orderModalData on closeOrderModal', () => {
    const stateWithModal = {
      orderRequest: false,
      orderModalData: mockOrder,
      orderData: null,
      orderError: 'some error',
      isOrderLoading: false
    };

    const state = orderReducer(stateWithModal, closeOrderModal());

    expect(state.orderModalData).toBeNull();
    expect(state.orderError).toBeNull();
  });

  it('should clear orderData on clearOrderData', () => {
    const stateWithData = {
      orderRequest: false,
      orderModalData: null,
      orderData: mockOrder,
      orderError: null,
      isOrderLoading: false
    };

    const state = orderReducer(stateWithData, clearOrderData());

    expect(state.orderData).toBeNull();
  });
});
