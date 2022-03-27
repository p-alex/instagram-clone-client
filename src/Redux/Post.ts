import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IPost } from '../interfaces';

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
    likePost: (state, action: PayloadAction<string>) => {
      return {
        ...state,
        post: {
          ...state.post!,
          likes: {
            ...state.post!.likes,
            count: state.post!.likes.count + 1,
            users: [action.payload, ...state.post!.likes.users!],
          },
        },
      };
    },
    dislikePost: (state, action: PayloadAction<string>) => {
      return {
        ...state,
        post: {
          ...state.post!,
          likes: {
            ...state.post!.likes,
            count: state.post!.likes.count - 1,
            users: state.post!.likes.users.filter((id) => id !== action.payload),
          },
        },
      };
    },
    togglePostOptions: (state) => {
      return { ...state, isPostOptionsActive: !state.isPostOptionsActive };
    },
    resetPostState: (state) => ({
      ...state,
      post: null,
      postIndex: null,
      isLoading: false,
      errorMessage: null,
    }),
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
