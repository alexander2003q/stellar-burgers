import { TUser } from '@utils-types';
import {
  checkUserAuth,
  getUser,
  loginUser,
  logoutUser,
  registerUser,
  resetAuthError,
  updateUser,
  userReducer
} from './userSlice';

const mockUser: TUser = {
  email: 'test@test.com',
  name: 'Test User'
};

describe('user slice reducer', () => {
  it('should set request=true on registerUser.pending', () => {
    const state = userReducer(
      undefined,
      registerUser.pending('request-id', {
        email: '',
        name: '',
        password: ''
      })
    );

    expect(state.request).toBe(true);
    expect(state.authError).toBeNull();
  });

  it('should set user on registerUser.fulfilled', () => {
    const state = userReducer(
      undefined,
      registerUser.fulfilled(mockUser, 'request-id', {
        email: '',
        name: '',
        password: ''
      })
    );

    expect(state.user).toEqual(mockUser);
    expect(state.isAuthChecked).toBe(true);
    expect(state.request).toBe(false);
  });

  it('should set authError on registerUser.rejected', () => {
    const state = userReducer(
      undefined,
      registerUser.rejected(new Error('Ошибка регистрации'), 'request-id', {
        email: '',
        name: '',
        password: ''
      })
    );

    expect(state.authError).toBe('Ошибка регистрации');
    expect(state.request).toBe(false);
  });

  it('should set request=true on loginUser.pending', () => {
    const state = userReducer(
      undefined,
      loginUser.pending('request-id', { email: '', password: '' })
    );

    expect(state.request).toBe(true);
    expect(state.authError).toBeNull();
  });

  it('should set user on loginUser.fulfilled', () => {
    const state = userReducer(
      undefined,
      loginUser.fulfilled(mockUser, 'request-id', { email: '', password: '' })
    );

    expect(state.user).toEqual(mockUser);
    expect(state.isAuthChecked).toBe(true);
    expect(state.request).toBe(false);
  });

  it('should set authError on loginUser.rejected', () => {
    const state = userReducer(
      undefined,
      loginUser.rejected(new Error('Неверный логин'), 'request-id', {
        email: '',
        password: ''
      })
    );

    expect(state.authError).toBe('Неверный логин');
    expect(state.request).toBe(false);
  });

  it('should set request=true on getUser.pending', () => {
    const state = userReducer(
      undefined,
      getUser.pending('request-id')
    );

    expect(state.request).toBe(true);
  });

  it('should set user on getUser.fulfilled', () => {
    const state = userReducer(
      undefined,
      getUser.fulfilled(mockUser, 'request-id')
    );

    expect(state.user).toEqual(mockUser);
    expect(state.request).toBe(false);
  });

  it('should clear user on getUser.rejected', () => {
    const stateWithUser = {
      user: mockUser,
      isAuthChecked: false,
      request: true,
      authError: null,
      updateUserError: null
    };

    const state = userReducer(
      stateWithUser,
      getUser.rejected(new Error('Ошибка'), 'request-id')
    );

    expect(state.user).toBeNull();
    expect(state.request).toBe(false);
  });

  it('should set request=true on checkUserAuth.pending', () => {
    const state = userReducer(
      undefined,
      checkUserAuth.pending('request-id')
    );

    expect(state.request).toBe(true);
  });

  it('should set user and isAuthChecked on checkUserAuth.fulfilled', () => {
    const state = userReducer(
      undefined,
      checkUserAuth.fulfilled(mockUser, 'request-id')
    );

    expect(state.user).toEqual(mockUser);
    expect(state.isAuthChecked).toBe(true);
    expect(state.request).toBe(false);
  });

  it('should clear user and set isAuthChecked on checkUserAuth.rejected', () => {
    const state = userReducer(
      undefined,
      checkUserAuth.rejected(new Error('no-token'), 'request-id')
    );

    expect(state.user).toBeNull();
    expect(state.isAuthChecked).toBe(true);
    expect(state.request).toBe(false);
  });

  it('should set user on updateUser.fulfilled', () => {
    const updatedUser = { ...mockUser, name: 'Updated' };

    const state = userReducer(
      undefined,
      updateUser.fulfilled(updatedUser, 'request-id', { name: 'Updated' })
    );

    expect(state.user).toEqual(updatedUser);
  });

  it('should set updateUserError on updateUser.rejected', () => {
    const state = userReducer(
      undefined,
      updateUser.rejected(new Error('Ошибка обновления'), 'request-id', {
        name: 'Updated'
      })
    );

    expect(state.updateUserError).toBe('Ошибка обновления');
  });

  it('should clear updateUserError on updateUser.pending', () => {
    const stateWithError = {
      user: mockUser,
      isAuthChecked: true,
      request: false,
      authError: null,
      updateUserError: 'old error'
    };

    const state = userReducer(
      stateWithError,
      updateUser.pending('request-id', { name: 'Updated' })
    );

    expect(state.updateUserError).toBeNull();
  });

  it('should set request=true on logoutUser.pending', () => {
    const state = userReducer(
      undefined,
      logoutUser.pending('request-id')
    );

    expect(state.request).toBe(true);
  });

  it('should clear user on logoutUser.fulfilled', () => {
    const stateWithUser = {
      user: mockUser,
      isAuthChecked: true,
      request: true,
      authError: null,
      updateUserError: null
    };

    const state = userReducer(
      stateWithUser,
      logoutUser.fulfilled(undefined, 'request-id')
    );

    expect(state.user).toBeNull();
    expect(state.request).toBe(false);
    expect(state.isAuthChecked).toBe(true);
  });

  it('should set authError on logoutUser.rejected', () => {
    const state = userReducer(
      undefined,
      logoutUser.rejected(new Error('Ошибка выхода'), 'request-id')
    );

    expect(state.authError).toBe('Ошибка выхода');
    expect(state.request).toBe(false);
  });

  it('should reset authError on resetAuthError', () => {
    const stateWithError = {
      user: null,
      isAuthChecked: false,
      request: false,
      authError: 'some error',
      updateUserError: null
    };

    const state = userReducer(stateWithError, resetAuthError());

    expect(state.authError).toBeNull();
  });
});
