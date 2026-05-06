import { FC, useEffect, useMemo } from 'react';
import { useParams } from 'react-router-dom';
import { Preloader } from '../ui/preloader';
import { OrderInfoUI } from '../ui/order-info';
import { TIngredient } from '@utils-types';
import { useDispatch, useSelector } from '../../services/store';
import { clearOrderData, getOrderByNumber } from '../../services/slices';
import {
  feedOrdersSelector,
  ingredientsSelector,
  orderDataSelector,
  userOrdersSelector
} from '../../services/selectors';

export const OrderInfo: FC = () => {
  const dispatch = useDispatch();
  const { number } = useParams();
  const orderFromStore = useSelector(orderDataSelector);
  const ingredients: TIngredient[] = useSelector(ingredientsSelector);
  const feedOrders = useSelector(feedOrdersSelector);
  const profileOrders = useSelector(userOrdersSelector);

  const orderNumber = Number(number);

  const selectedOrder =
    feedOrders.find((order) => order.number === orderNumber) ||
    profileOrders.find((order) => order.number === orderNumber) ||
    orderFromStore;

  useEffect(() => {
    if (!orderNumber || Number.isNaN(orderNumber)) {
      return;
    }

    if (!selectedOrder || selectedOrder.number !== orderNumber) {
      dispatch(getOrderByNumber(orderNumber));
    }

    return () => {
      dispatch(clearOrderData());
    };
  }, [dispatch, orderNumber, selectedOrder]);

  /* Готовим данные для отображения */
  const orderInfo = useMemo(() => {
    if (!selectedOrder || !ingredients.length) return null;

    const date = new Date(selectedOrder.createdAt);

    type TIngredientsWithCount = {
      [key: string]: TIngredient & { count: number };
    };

    const ingredientsInfo = selectedOrder.ingredients.reduce(
      (acc: TIngredientsWithCount, item) => {
        if (!acc[item]) {
          const ingredient = ingredients.find((ing) => ing._id === item);
          if (ingredient) {
            acc[item] = {
              ...ingredient,
              count: 1
            };
          }
        } else {
          acc[item].count++;
        }

        return acc;
      },
      {}
    );

    const total = Object.values(ingredientsInfo).reduce(
      (acc, item) => acc + item.price * item.count,
      0
    );

    return {
      ...selectedOrder,
      ingredientsInfo,
      date,
      total
    };
  }, [selectedOrder, ingredients]);

  if (!orderInfo) {
    return <Preloader />;
  }

  return <OrderInfoUI orderInfo={orderInfo} />;
};
