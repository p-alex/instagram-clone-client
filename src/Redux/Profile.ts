import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IFollowers, IFollowing, IPosts } from '../interfaces';

interface IProfileUserData {
  userId: string;
  username: string;
  fullname: string;
  bio: string;
  followers: IFollowers;
  following: IFollowing;
  posts: IPosts;
  profilePicture: string;
}

interface IProfileState {
  user: IProfileUserData | null;
  isPostModalActive: boolean;
  selectedPostId: string;
  lastFocusedPostIndex: number | null;
  isLoading: boolean;
  errorMessage: string | null;
}

const initialState: IProfileState = {
  user: null,
  isPostModalActive: false,
  selectedPostId: '',
  lastFocusedPostIndex: null,
  isLoading: false,
  errorMessage: null,
};

const ProfileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {
    loadingProfile: (state) => {
      return { ...state, isLoading: true };
    },
    loadingProfileError: (state, action: PayloadAction<string>) => {
      return { ...state, isLoading: false, errorMessage: action.payload };
    },
    setProfileData: (state, action: PayloadAction<IProfileUserData>) => {
      const {
        userId,
        username,
        fullname,
        bio,
        followers,
        following,
        posts,
        profilePicture,
      } = action.payload;
      return {
        ...state,
        isLoading: false,
        user: {
          ...state.user,
          userId,
          username,
          fullname,
          bio,
          followers,
          following,
          posts,
          profilePicture,
        },
      };
    },
    selectPostId: (state, action: PayloadAction<string>) => {
      return { ...state, selectedPostId: action.payload };
    },
    closePostModal: (state) => {
      return { ...state, selectedPostId: '' };
    },
    setLastFocusedPostIndex: (state, action: PayloadAction<number | null>) => {
      return { ...state, lastFocusedPostIndex: action.payload };
    },
    resetProfileState: (state) => {
      return {
        ...state,
        user: null,
        isPostModalActive: false,
        selectedPostId: '',
        lastFocusedPostIndex: null,
        isLoading: false,
        errorMessage: null,
      };
    },
  },
});

export const {
  loadingProfile,
  loadingProfileError,
  setProfileData,
  selectPostId,
  closePostModal,
  setLastFocusedPostIndex,
  resetProfileState,
} = ProfileSlice.actions;

export default ProfileSlice.reducer;
