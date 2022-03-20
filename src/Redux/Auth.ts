import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface AuthState {
  user: { id: string; username: string; profilePicture: string } | null;
  accessToken: string | null;
}

const initialState: AuthState = {
  user: null,
  accessToken: null,
};

const AuthSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginUser: (state, action: PayloadAction<AuthState>) => {
      return {
        ...state,
        user: action.payload.user,
        accessToken: action.payload.accessToken,
      };
    },
    logoutUser: (state) => {
      return { ...state, user: null, accessToken: null };
    },
    refreshToken: (state, action: PayloadAction<AuthState>) => {
      return {
        ...state,
        user: action.payload.user,
        accessToken: action.payload.accessToken,
      };
    },
  },
});

export const { loginUser, logoutUser, refreshToken } = AuthSlice.actions;

export default AuthSlice.reducer;
