import { createSlice } from "@reduxjs/toolkit";
import { IPost } from "../interfaces";

interface IFeedState {
  posts: IPost[];
  requestedOnce: boolean;
}

const initialState: IFeedState = {
  posts: [],
  requestedOnce: false,
};

const FeedSlice = createSlice({
  name: "Feed",
  initialState,
  reducers: {
    setFeedPosts: (state, action) => {
      state.posts = action.payload.posts;
      state.requestedOnce = true;
    },
    addMoreFeedPosts: (state, action) => {
      state.posts = [...state.posts, ...action.payload.posts];
    },
    likeFeedPost: (state, action) => {
      state.posts[action.payload.postIndex].isLiked = true;
      state.posts[action.payload.postIndex].likes.count += 1;
    },
    dislikeFeedPost: (state, action) => {
      state.posts[action.payload.postIndex].isLiked = false;
      state.posts[action.payload.postIndex].likes.count -= 1;
    },
    followFeedPostOwner: (state, action) => {
      state.posts = state.posts.map((post) => {
        if (post.user.id === action.payload.userId) {
          post.isPostOwnerFollowed = true;
          return post;
        }
        return post;
      });
    },
    unfollowFeedPostOwner: (state, action) => {
      state.posts = state.posts.map((post) => {
        if (post.user.id === action.payload.userId) {
          post.isPostOwnerFollowed = false;
          return post;
        }
        return post;
      });
    },
    resetFeedState: (state) => {
      state.posts = [];
      state.requestedOnce = false;
    },
  },
});

export const {
  setFeedPosts,
  addMoreFeedPosts,
  likeFeedPost,
  dislikeFeedPost,
  followFeedPostOwner,
  unfollowFeedPostOwner,
  resetFeedState,
} = FeedSlice.actions;

export default FeedSlice.reducer;
