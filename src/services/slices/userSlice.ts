import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import {
  TLoginData,
  TRegisterData,
  getUserApi,
  loginUserApi,
  logoutApi,
  registerUserApi,
  updateUserApi
} from '@api';
import { TUser } from '@utils-types';
import { deleteCookie, getCookie, setCookie } from '../../utils/cookie';
import { resetUserOrders } from './userOrdersSlice';

type UserState = {
  user: TUser | null;
  isAuthChecked: boolean;
  request: boolean;
  authError: string | null;
  updateUserError: string | null;
};

const initialState: UserState = {
  user: null,
  isAuthChecked: false,
  request: false,
  authError: null,
  updateUserError: null
};

const saveTokens = (accessToken: string, refreshToken: string) => {
  setCookie('accessToken', accessToken);
  localStorage.setItem('refreshToken', refreshToken);
};

const clearTokens = () => {
  deleteCookie('accessToken');
  localStorage.removeItem('refreshToken');
};

export const registerUser = createAsyncThunk(
  'user/registerUser',
  async (payload: TRegisterData) => {
    const data = await registerUserApi(payload);
    saveTokens(data.accessToken, data.refreshToken);
    return data.user;
  }
);

export const loginUser = createAsyncThunk(
  'user/loginUser',
  async (payload: TLoginData) => {
    const data = await loginUserApi(payload);
    saveTokens(data.accessToken, data.refreshToken);
    return data.user;
  }
);

export const getUser = createAsyncThunk('user/getUser', async () => {
  const data = await getUserApi();
  return data.user;
});

export const checkUserAuth = createAsyncThunk(
  'user/checkUserAuth',
  async (_, { rejectWithValue }) => {
    if (!getCookie('accessToken')) {
      return rejectWithValue('no-token');
    }

    const data = await getUserApi();
    return data.user;
  }
);

export const updateUser = createAsyncThunk(
  'user/updateUser',
  async (payload: Partial<TRegisterData>) => {
    const data = await updateUserApi(payload);
    return data.user;
  }
);

export const logoutUser = createAsyncThunk(
  'user/logoutUser',
  async (_, { dispatch }) => {
    await logoutApi();
    clearTokens();
    dispatch(resetUserOrders());
  }
);

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    resetAuthError: (state) => {
      state.authError = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.request = true;
        state.authError = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.request = false;
        state.user = action.payload;
        state.isAuthChecked = true;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.request = false;
        state.authError =
          action.error.message ?? 'Не удалось выполнить регистрацию';
      })
      .addCase(loginUser.pending, (state) => {
        state.request = true;
        state.authError = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.request = false;
        state.user = action.payload;
        state.isAuthChecked = true;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.request = false;
        state.authError = action.error.message ?? 'Не удалось выполнить вход';
      })
      .addCase(getUser.pending, (state) => {
        state.request = true;
      })
      .addCase(getUser.fulfilled, (state, action) => {
        state.request = false;
        state.user = action.payload;
      })
      .addCase(getUser.rejected, (state) => {
        state.request = false;
        state.user = null;
      })
      .addCase(checkUserAuth.pending, (state) => {
        state.request = true;
      })
      .addCase(checkUserAuth.fulfilled, (state, action) => {
        state.request = false;
        state.user = action.payload;
        state.isAuthChecked = true;
      })
      .addCase(checkUserAuth.rejected, (state) => {
        state.request = false;
        state.user = null;
        state.isAuthChecked = true;
      })
      .addCase(updateUser.pending, (state) => {
        state.updateUserError = null;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.user = action.payload;
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.updateUserError =
          action.error.message ?? 'Не удалось обновить данные пользователя';
      })
      .addCase(logoutUser.pending, (state) => {
        state.request = true;
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.request = false;
        state.user = null;
        state.isAuthChecked = true;
      })
      .addCase(logoutUser.rejected, (state, action) => {
        state.request = false;
        state.authError =
          action.error.message ?? 'Не удалось выйти из аккаунта';
      });
  }
});

export const { resetAuthError } = userSlice.actions;

export const userReducer = userSlice.reducer;
