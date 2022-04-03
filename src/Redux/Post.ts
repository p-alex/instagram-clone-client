import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IComment, IPost } from '../interfaces';

export interface IPostState {
  post: IPost | null;
  postIndex: number | null;
  isPostOptionsActive: boolean;
  isLoading: boolean;
  errorMessage: string | null;
}

const initialState: IPostState = {
  post: null,
  postIndex: null,
  isPostOptionsActive: false,
  isLoading: false,
  errorMessage: null,
};

const PostSlice = createSlice({
  name: 'post',
  initialState,
  reducers: {
    loadingPost: (state) => {
      state.isLoading = true;
    },
    loadingPostError: (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.errorMessage = action.payload;
    },
    setPost: (state, action: PayloadAction<IPost>) => {
      state.isLoading = false;
      state.post = action.payload;
    },
    likePost: (state, action: PayloadAction<string>) => {
      state.post!.likes.count += 1;
      state.post!.likes.users.unshift(action.payload);
    },
    dislikePost: (state, action: PayloadAction<string>) => {
      state.post!.likes.count -= 1;
      state.post!.likes.users = state.post!.likes.users.filter(
        (id) => id !== action.payload
      );
    },
    togglePostOptions: (state) => {
      state.isPostOptionsActive = !state.isPostOptionsActive;
    },
    resetPostState: (state) => {
      state.post = null;
      state.postIndex = null;
      state.isLoading = false;
      state.errorMessage = null;
    },
  },
});

export const {
  loadingPost,
  loadingPostError,
  setPost,
  likePost,
  dislikePost,
  togglePostOptions,
  resetPostState,
} = PostSlice.actions;

export default PostSlice.reducer;
