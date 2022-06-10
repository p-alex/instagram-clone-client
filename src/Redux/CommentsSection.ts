import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IComment } from "../interfaces";

interface ICommentsSectionSliceState {
  comments: IComment[];
  isCommentOptionsActive: boolean;
  selectedCommentId: string;
  isLoadingComments: boolean;
  errorMessage: string | null;
}

const initialState: ICommentsSectionSliceState = {
  comments: [],
  isCommentOptionsActive: false,
  selectedCommentId: "",
  isLoadingComments: false,
  errorMessage: null,
};

const CommentsSectionSlice = createSlice({
  name: "CommentsSection",
  initialState,
  reducers: {
    loadingComments: (state) => {
      state.isLoadingComments = true;
    },
    errorLoadingComments: (state, action: PayloadAction<string>) => {
      state.isLoadingComments = false;
      state.errorMessage = action.payload;
    },
    setComments: (state, action: PayloadAction<IComment[]>) => {
      state.comments = action.payload;
      state.isLoadingComments = false;
    },
    loadMoreComments: (
      state,
      action: PayloadAction<{ comments: IComment[] }>
    ) => {
      state.comments = [...state.comments, ...action.payload.comments];
    },
    addComment: (state, action: PayloadAction<IComment>) => {
      state.comments.unshift(action.payload);
    },
    deleteComment: (state, action: PayloadAction<{ commentId: string }>) => {
      state.comments = state.comments.filter(
        (comment) => comment.id !== action.payload.commentId
      );
    },
    likeComment: (
      state,
      action: PayloadAction<{
        commentIndex: number;
        commentId: string;
        userId: string;
      }>
    ) => {
      state.comments[action.payload.commentIndex].likes.count += 1;
      state.comments[action.payload.commentIndex].likes.users.unshift(
        action.payload.userId
      );
    },
    dislikeComment: (
      state,
      action: PayloadAction<{
        commentIndex: number;
        commentId: string;
        userId: string;
      }>
    ) => {
      state.comments[action.payload.commentIndex].likes.count -= 1;
      const usersArray =
        state.comments[action.payload.commentIndex].likes.users;
      state.comments[action.payload.commentIndex].likes.users =
        usersArray.filter((id) => id !== action.payload.userId);
    },
    toggleCommentOptions: (state, action: PayloadAction<string>) => {
      if (state.isCommentOptionsActive) {
        state.selectedCommentId = "";
        state.isCommentOptionsActive = false;
      } else {
        state.selectedCommentId = action.payload;
        state.isCommentOptionsActive = true;
      }
    },
    resetComments: (state) => {
      state.comments = [];
    },
  },
});

export const {
  loadingComments,
  errorLoadingComments,
  setComments,
  loadMoreComments,
  addComment,
  deleteComment,
  likeComment,
  dislikeComment,
  toggleCommentOptions,
  resetComments,
} = CommentsSectionSlice.actions;

export default CommentsSectionSlice.reducer;
