import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IComment } from '../interfaces';

interface ICommentsSectionSliceState {
  comments: IComment[];
  isCommentOptionsModalActive: boolean;
  isLoading: boolean;
  errorMessage: string | null;
}

const initialState: ICommentsSectionSliceState = {
  comments: [],
  isCommentOptionsModalActive: false,
  isLoading: false,
  errorMessage: null,
};

const CommentsSectionSlice = createSlice({
  name: 'CommentsSection',
  initialState,
  reducers: {
    loadingComments: (state) => {
      state.isLoading = true;
    },
    errorLoadingComments: (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.errorMessage = action.payload;
    },
    setComments: (state, action: PayloadAction<IComment[]>) => {
      state.comments = action.payload;
      state.isLoading = false;
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
      action: PayloadAction<{ commentIndex: number; commentId: string; userId: string }>
    ) => {
      state.comments[action.payload.commentIndex].likes.count += 1;
      state.comments[action.payload.commentIndex].likes.users.unshift(
        action.payload.userId
      );
    },
    dislikeComment: (
      state,
      action: PayloadAction<{ commentIndex: number; commentId: string; userId: string }>
    ) => {
      state.comments[action.payload.commentIndex].likes.count -= 1;
      const usersArray = state.comments[action.payload.commentIndex].likes.users;
      state.comments[action.payload.commentIndex].likes.users = usersArray.filter(
        (id) => id !== action.payload.userId
      );
    },
    toggleOptions: (state) => {
      state.isCommentOptionsModalActive = !state.isCommentOptionsModalActive;
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
  addComment,
  deleteComment,
  likeComment,
  dislikeComment,
  toggleOptions,
  resetComments,
} = CommentsSectionSlice.actions;

export default CommentsSectionSlice.reducer;
