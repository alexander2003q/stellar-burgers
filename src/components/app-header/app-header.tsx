import { FC } from 'react';
import { AppHeaderUI } from '@ui';
import { useSelector } from '../../services/store';
import { userDataSelector } from '../../services/selectors';

export const AppHeader: FC = () => {
  const user = useSelector(userDataSelector);

  return <AppHeaderUI userName={user?.name} />;
};
