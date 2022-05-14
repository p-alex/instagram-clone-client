import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IPost } from "../interfaces";

export interface IPostState {
  post: IPost | null;
  postIndex: number | null;
  isPostOptionsActive: boolean;
  isLoading: boolean;
  postFormState: {
    postNew: "comment" | "reply";
    replyTo: string | null;
    commentId: string | null;
  };
  errorMessage: string | null;
}

const initialState: IPostState = {
  post: null,
  postIndex: null,
  isPostOptionsActive: false,
  isLoading: false,
  postFormState: { postNew: "reply", replyTo: null, commentId: null },
  errorMessage: null,
};

const PostSlice = createSlice({
  name: "post",
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
    changePostFormToNewComment: (state) => {
      state.postFormState.postNew = "comment";
      state.postFormState.replyTo = null;
      state.postFormState.commentId = null;
    },
    changePostFormToNewReply: (
      state,
      action: PayloadAction<{ replyTo: string; commentId: string }>
    ) => {
      state.postFormState.postNew = "reply";
      state.postFormState.replyTo = `@${action.payload.replyTo}`;
      state.postFormState.commentId = action.payload.commentId;
    },
    togglePostOptions: (state) => {
      state.isPostOptionsActive = !state.isPostOptionsActive;
    },
    closePostOptions: (state) => {
      state.isPostOptionsActive = false;
    },
    resetPostState: (state) => {
      state.post = null;
      state.postIndex = null;
      state.isLoading = false;
      state.errorMessage = null;
      state.isPostOptionsActive = false;
    },
  },
});

export const {
  loadingPost,
  loadingPostError,
  setPost,
  likePost,
  dislikePost,
  changePostFormToNewComment,
  changePostFormToNewReply,
  togglePostOptions,
  closePostOptions,
  resetPostState,
} = PostSlice.actions;

export default PostSlice.reducer;
