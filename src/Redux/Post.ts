import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IPost } from '../interfaces';

export interface IPostState {
  post: IPost | null;
  isLoading: boolean;
  errorMessage: string | null;
}

const initialState: IPostState = {
  post: null,
  isLoading: false,
  errorMessage: null,
};

const PostSlice = createSlice({
  name: 'post',
  initialState,
  reducers: {
    loadingPost: (state) => ({ ...state, isLoading: true }),
    loadingPostError: (state, action: PayloadAction<string>) => ({
      ...state,
      isLoading: false,
      errorMessage: action.payload,
    }),
    setPost: (state, action: PayloadAction<IPost>) => ({
      ...state,
      isLoading: false,
      post: action.payload,
    }),
    resetPostState: (state) => ({
      ...state,
      post: null,
      isLoading: false,
      errorMessage: null,
    }),
  },
});

export const { loadingPost, loadingPostError, setPost, resetPostState } =
  PostSlice.actions;

export default PostSlice.reducer;
