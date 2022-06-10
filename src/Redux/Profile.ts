import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IFollowers, IFollowing, IPosts } from "../interfaces";

interface IProfileUserData {
  id: string;
  username: string;
  fullname: string;
  bio: string;
  followers: IFollowers;
  following: IFollowing;
  posts: IPosts;
  profilePicture: {
    fullPicture: string;
  };
}

interface IProfileState {
  user: IProfileUserData | null;
  isFollowed: boolean;
  activeTab: "posts" | "saved";
  isPostModalActive: boolean;
  selectedPostId: string;
  selectedPostIndex: number | null;
  lastFocusedPostIndex: number | null;
  isLoading: boolean;
  errorMessage: string | null;
}

const initialState: IProfileState = {
  user: null,
  isFollowed: false,
  activeTab: "posts",
  isPostModalActive: false,
  selectedPostId: "",
  selectedPostIndex: null,
  lastFocusedPostIndex: null,
  isLoading: false,
  errorMessage: null,
};

const ProfileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {
    loadingProfile: (state) => {
      return { ...state, isLoading: true };
    },
    loadingProfileError: (state, action: PayloadAction<string>) => {
      return { ...state, isLoading: false, errorMessage: action.payload };
    },
    setProfileData: (
      state,
      action: PayloadAction<{ userData: IProfileUserData; isFollowed: boolean }>
    ) => {
      state.isLoading = false;
      const user = action.payload.userData;
      state.user = {
        id: user.id,
        username: user.username,
        fullname: user.fullname,
        bio: user.bio,
        followers: user.followers,
        following: user.following,
        posts: user.posts,
        profilePicture: {
          fullPicture: user.profilePicture.fullPicture,
        },
      };
      state.isFollowed = action.payload.isFollowed;
    },
    followProfile: (state) => {
      state.isFollowed = true;
    },
    unfollowProfile: (state) => {
      state.isFollowed = false;
    },
    selectPostId: (state, action: PayloadAction<string>) => {
      const selectedPostIndex = state.user!.posts.postsList.findIndex(
        (post) => post.id === action.payload
      );
      state.selectedPostId = action.payload;
      state.selectedPostIndex = selectedPostIndex;
    },
    deletePost: (state, action: PayloadAction<string>) => {
      const updatedPostsList = state.user!.posts.postsList.filter(
        (post) => post.id !== action.payload
      );
      state.user!.posts.count -= 1;
      state.user!.posts.postsList = updatedPostsList;
    },
    closePostModal: (state) => {
      state.selectedPostId = "";
    },
    setLastFocusedPostIndex: (state, action: PayloadAction<number | null>) => {
      state.lastFocusedPostIndex = action.payload;
    },
    changeTab: (state, action: PayloadAction<"posts" | "saved">) => {
      state.activeTab = action.payload;
    },
    resetProfileState: (state) => {
      state.user = null;
      state.isPostModalActive = false;
      state.selectedPostId = "";
      state.lastFocusedPostIndex = null;
      state.isLoading = false;
      state.errorMessage = null;
    },
  },
});

export const {
  followProfile,
  unfollowProfile,
  loadingProfile,
  loadingProfileError,
  setProfileData,
  selectPostId,
  deletePost,
  closePostModal,
  setLastFocusedPostIndex,
  changeTab,
  resetProfileState,
} = ProfileSlice.actions;

export default ProfileSlice.reducer;
