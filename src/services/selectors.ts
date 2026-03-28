import { RootState } from './store';

export const ingredientsSelector = (state: RootState) =>
  state.ingredients.items;
export const isIngredientsLoadingSelector = (state: RootState) =>
  state.ingredients.isLoading;
export const ingredientsErrorSelector = (state: RootState) =>
  state.ingredients.error;

export const constructorSelector = (state: RootState) =>
  state.burgerConstructor;

export const feedOrdersSelector = (state: RootState) => state.feed.orders;
export const feedLoadingSelector = (state: RootState) => state.feed.isLoading;
export const feedDataSelector = (state: RootState) => ({
  total: state.feed.total,
  totalToday: state.feed.totalToday
});

export const userOrdersSelector = (state: RootState) => state.userOrders.orders;
export const userOrdersLoadingSelector = (state: RootState) =>
  state.userOrders.isLoading;

export const userDataSelector = (state: RootState) => state.user.user;
export const isAuthCheckedSelector = (state: RootState) =>
  state.user.isAuthChecked;
export const authErrorSelector = (state: RootState) => state.user.authError;
export const updateUserErrorSelector = (state: RootState) =>
  state.user.updateUserError;

export const orderRequestSelector = (state: RootState) =>
  state.order.orderRequest;
export const orderModalDataSelector = (state: RootState) =>
  state.order.orderModalData;
export const orderDataSelector = (state: RootState) => state.order.orderData;
