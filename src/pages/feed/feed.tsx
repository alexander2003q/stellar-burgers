import { Preloader } from '@ui';
import { FeedUI } from '@ui-pages';
import { FC, useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from '../../services/store';
import { fetchFeed } from '../../services/slices';
import {
  feedLoadingSelector,
  feedOrdersSelector
} from '../../services/selectors';

export const Feed: FC = () => {
  const dispatch = useDispatch();
  const orders = useSelector(feedOrdersSelector);
  const isLoading = useSelector(feedLoadingSelector);

  const handleGetFeeds = useCallback(() => {
    dispatch(fetchFeed());
  }, [dispatch]);

  useEffect(() => {
    handleGetFeeds();

    const intervalId = window.setInterval(() => {
      handleGetFeeds();
    }, 5000);

    return () => {
      window.clearInterval(intervalId);
    };
  }, [handleGetFeeds]);

  if (isLoading && !orders.length) {
    return <Preloader />;
  }

  return <FeedUI orders={orders} handleGetFeeds={handleGetFeeds} />;
};
