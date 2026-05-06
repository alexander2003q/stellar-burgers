import { FC, SyntheticEvent, useEffect } from 'react';
import { LoginUI } from '@ui-pages';
import { Location, useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from '../../services/store';
import { loginUser, resetAuthError } from '../../services/slices';
import { authErrorSelector } from '../../services/selectors';
import { useForm } from '../../hooks';

export const Login: FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const errorText = useSelector(authErrorSelector);
  const { values, handleInputChange } = useForm({
    email: '',
    password: ''
  });

  useEffect(() => {
    dispatch(resetAuthError());
  }, [dispatch]);

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    dispatch(
      loginUser({ email: values.email, password: values.password })
    ).then((result) => {
      if (loginUser.fulfilled.match(result)) {
        const redirectPath =
          (location.state as { from?: Location } | null)?.from?.pathname ?? '/';
        navigate(redirectPath, { replace: true });
      }
    });
  };

  return (
    <LoginUI
      errorText={errorText ?? ''}
      email={values.email}
      password={values.password}
      handleInputChange={handleInputChange}
      handleSubmit={handleSubmit}
    />
  );
};
