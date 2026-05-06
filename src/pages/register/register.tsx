import { FC, SyntheticEvent, useEffect } from 'react';
import { RegisterUI } from '@ui-pages';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from '../../services/store';
import { registerUser, resetAuthError } from '../../services/slices';
import { authErrorSelector } from '../../services/selectors';
import { useForm } from '../../hooks';

export const Register: FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const errorText = useSelector(authErrorSelector);
  const { values, handleInputChange } = useForm({
    userName: '',
    email: '',
    password: ''
  });

  useEffect(() => {
    dispatch(resetAuthError());
  }, [dispatch]);

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    dispatch(
      registerUser({
        name: values.userName,
        email: values.email,
        password: values.password
      })
    ).then((result) => {
      if (registerUser.fulfilled.match(result)) {
        navigate('/', { replace: true });
      }
    });
  };

  return (
    <RegisterUI
      errorText={errorText ?? ''}
      email={values.email}
      userName={values.userName}
      password={values.password}
      handleInputChange={handleInputChange}
      handleSubmit={handleSubmit}
    />
  );
};
