import { configureStore } from "@reduxjs/toolkit";
import AuthReducer from "./Auth";
import ProfileReducer from "./Profile";
import PostReducer from "./Post";
import CommentsSectionReducer from "./CommentsSection";
import SuggestionsReducer from "./Suggestions";
import FeedReducer from "./Feed";
export const store = configureStore({
  reducer: {
    auth: AuthReducer,
    profile: ProfileReducer,
    post: PostReducer,
    commentsSection: CommentsSectionReducer,
    suggestions: SuggestionsReducer,
    feed: FeedReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
