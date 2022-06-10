import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface AuthState {
  user: {
    id: string;
    username: string;
    email: string;
    bio: string;
    fullname: string;
    profilePicture: {
      fullPicture: string;
      smallPicture: string;
    };
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
    changeProfilePicture: (state, action) => {
      state.user!.profilePicture = action.payload.profilePicture;
    },
    changeUserInfo: (state, action) => {
      state.user!.fullname = action.payload.fullname;
      state.user!.username = action.payload.username;
      state.user!.bio = action.payload.bio;
    },
  },
});

export const {
  loginUser,
  logoutUser,
  refreshToken,
  changeProfilePicture,
  changeUserInfo,
} = AuthSlice.actions;

export default AuthSlice.reducer;
