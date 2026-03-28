import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getOrderByNumberApi, orderBurgerApi } from '@api';
import { TOrder } from '@utils-types';
import { clearConstructor } from './constructorSlice';

type OrderState = {
  orderRequest: boolean;
  orderModalData: TOrder | null;
  orderData: TOrder | null;
  orderError: string | null;
  isOrderLoading: boolean;
};

const initialState: OrderState = {
  orderRequest: false,
  orderModalData: null,
  orderData: null,
  orderError: null,
  isOrderLoading: false
};

export const createOrder = createAsyncThunk(
  'order/createOrder',
  async (ingredients: string[], { dispatch }) => {
    const data = await orderBurgerApi(ingredients);
    dispatch(clearConstructor());

    return {
      ...data.order,
      ingredients
    } as TOrder;
  }
);

export const getOrderByNumber = createAsyncThunk(
  'order/getOrderByNumber',
  async (number: number) => {
    const data = await getOrderByNumberApi(number);
    return data.orders[0] ?? null;
  }
);

export const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    closeOrderModal: (state) => {
      state.orderModalData = null;
      state.orderError = null;
    },
    clearOrderData: (state) => {
      state.orderData = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(createOrder.pending, (state) => {
        state.orderRequest = true;
        state.orderError = null;
      })
      .addCase(createOrder.fulfilled, (state, action) => {
        state.orderRequest = false;
        state.orderModalData = action.payload;
      })
      .addCase(createOrder.rejected, (state, action) => {
        state.orderRequest = false;
        state.orderError = action.error.message ?? 'Не удалось оформить заказ';
      })
      .addCase(getOrderByNumber.pending, (state) => {
        state.isOrderLoading = true;
      })
      .addCase(getOrderByNumber.fulfilled, (state, action) => {
        state.isOrderLoading = false;
        state.orderData = action.payload;
      })
      .addCase(getOrderByNumber.rejected, (state, action) => {
        state.isOrderLoading = false;
        state.orderError =
          action.error.message ?? 'Не удалось загрузить информацию о заказе';
      });
  }
});

export const { closeOrderModal, clearOrderData } = orderSlice.actions;

export const orderReducer = orderSlice.reducer;
