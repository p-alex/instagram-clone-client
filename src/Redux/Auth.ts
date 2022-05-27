import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface AuthState {
  user: {
    id: string;
    username: string;
    fullname: string;
    profilePicture: string;
    hasFollowings: boolean;
  } | null;
  accessToken: string | null;
}

const initialState: AuthState = {
  user: null,
  accessToken: null,
};

const AuthSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginUser: (state, action: PayloadAction<AuthState>) => {
      console.log(action.payload.user);
      state.user = action.payload.user;
      state.accessToken = action.payload.accessToken;
    },
    logoutUser: (state) => {
      state.user = null;
      state.accessToken = null;
    },
    refreshToken: (state, action: PayloadAction<AuthState>) => {
      state.user = action.payload.user;
      state.accessToken = action.payload.accessToken;
    },
  },
});

export const { loginUser, logoutUser, refreshToken } = AuthSlice.actions;

export default AuthSlice.reducer;
