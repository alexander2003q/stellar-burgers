import { ProfileOrdersUI } from '@ui-pages';
import { FC, useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from '../../services/store';
import { fetchUserOrders } from '../../services/slices';
import {
  userOrdersLoadingSelector,
  userOrdersSelector
} from '../../services/selectors';
import { Preloader } from '@ui';

export const ProfileOrders: FC = () => {
  const dispatch = useDispatch();
  const orders = useSelector(userOrdersSelector);
  const isLoading = useSelector(userOrdersLoadingSelector);

  const loadOrders = useCallback(() => {
    dispatch(fetchUserOrders());
  }, [dispatch]);

  useEffect(() => {
    loadOrders();

    const intervalId = window.setInterval(() => {
      loadOrders();
    }, 5000);

    return () => {
      window.clearInterval(intervalId);
    };
  }, [loadOrders]);

  if (isLoading && !orders.length) {
    return <Preloader />;
  }

  return <ProfileOrdersUI orders={orders} />;
};
