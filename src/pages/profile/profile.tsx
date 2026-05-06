import { ProfileUI } from '@ui-pages';
import { FC, SyntheticEvent, useEffect } from 'react';
import { useDispatch, useSelector } from '../../services/store';
import { updateUser } from '../../services/slices';
import {
  updateUserErrorSelector,
  userDataSelector
} from '../../services/selectors';
import { useForm } from '../../hooks';

export const Profile: FC = () => {
  const dispatch = useDispatch();
  const user = useSelector(userDataSelector);
  const updateUserError = useSelector(updateUserErrorSelector) ?? undefined;

  const {
    values: formValue,
    setValues,
    handleInputChange,
    resetForm
  } = useForm({
    name: user?.name ?? '',
    email: user?.email ?? '',
    password: ''
  });

  useEffect(() => {
    setValues((prevState) => ({
      ...prevState,
      name: user?.name || '',
      email: user?.email || ''
    }));
  }, [setValues, user]);

  const isFormChanged =
    formValue.name !== user?.name ||
    formValue.email !== user?.email ||
    !!formValue.password;

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    const payload = {
      name: formValue.name,
      email: formValue.email,
      ...(formValue.password ? { password: formValue.password } : {})
    };

    dispatch(updateUser(payload));
  };

  const handleCancel = (e: SyntheticEvent) => {
    e.preventDefault();
    resetForm({
      name: user?.name ?? '',
      email: user?.email ?? '',
      password: ''
    });
  };

  return (
    <ProfileUI
      formValue={formValue}
      isFormChanged={isFormChanged}
      handleCancel={handleCancel}
      handleSubmit={handleSubmit}
      handleInputChange={handleInputChange}
      updateUserError={updateUserError}
    />
  );
};
