import { useState, useEffect } from "react";
import { LIKE_OR_DISLIKE_POST_MUTATION } from "../../GraphQL/Mutations/postMutations";
import useFetchWithRetry from "../../Hooks/useFetchWithRetry";
import useRedux from "../../Hooks/useRedux";
import { dislikeFeedPost, likeFeedPost } from "../../Redux/Feed";
import { dislikePost, likePost } from "../../Redux/Post";
import "./LikeBtn.scss";

interface Props {
  postId: string | undefined;
  isPostLiked: boolean | undefined;
  postIndex?: number;
  isFeedPost: boolean | undefined;
}

const LikeBtn = (props: Props) => {
  const { authState, postState, feedState, dispatch } = useRedux();
  const [isLiked, setIsLiked] = useState<boolean | undefined>(false);

  useEffect(() => {
    if (props.isFeedPost) {
      setIsLiked(props.isPostLiked);
      return;
    }
    setIsLiked(postState.post?.isLiked);
  }, [props.isFeedPost, props.isPostLiked, postState.post?.isLiked]);

  console.log(
    props.isPostLiked,
    postState.post?.isLiked,
    props.isFeedPost,
    isLiked
  );

  const userId = authState?.user?.id;

  const [likePostRequest, { isLoading }] = useFetchWithRetry({
    query: LIKE_OR_DISLIKE_POST_MUTATION,
    variables: { postId: props.postId },
    accessToken: authState.accessToken,
  });

  const handleLikePostDispatch = () => {
    if (props.isFeedPost) {
      dispatch(likeFeedPost({ postIndex: props.postIndex }));
    } else {
      dispatch(likePost(userId!));
      //Check if a post with current id exists in the feed state and update that post too if it exists
      feedState.posts.forEach((post, index) => {
        if (post.id === props.postId)
          dispatch(likeFeedPost({ postIndex: index }));
      });
    }
    setIsLiked(true);
  };

  const handleDislikePostDispatch = () => {
    if (props.isFeedPost) {
      dispatch(dislikeFeedPost({ postIndex: props.postIndex }));
    } else {
      dispatch(dislikePost(userId!));
      //Check if a post with current id exists in the feed state and update that post too if it exists
      feedState.posts.forEach((post, index) => {
        if (post.id === props.postId) {
          dispatch(dislikeFeedPost({ postIndex: index }));
        }
      });
    }
    setIsLiked(false);
  };

  const handleLikePost = async () => {
    if (!isLoading) {
      try {
        if (isLiked) {
          handleDislikePostDispatch();
        } else {
          handleLikePostDispatch();
        }
        await likePostRequest();
      } catch (error: any) {
        console.log(error.message);
      }
    }
  };

  return (
    <button
      title="like post"
      className="likeBtn"
      onClick={handleLikePost}
      disabled={!authState.accessToken}
    >
      <i className={`fa-${isLiked ? "solid" : "regular"}  fa-heart`}></i>
    </button>
  );
};

export default LikeBtn;
