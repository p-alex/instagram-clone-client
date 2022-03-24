import { useEffect, useState } from 'react';
import { LIKE_OR_DISLIKE_POST_MUTATION } from '../../GraphQL/Mutations/postMutations';
import useFetchWithRetry from '../../Hooks/useFetchWithRetry';
import useRedux from '../../Hooks/useRedux';
import { dislikePost, likePost } from '../../Redux/Post';
import './LikeBtn.scss';

const LikeBtn = ({ postId }: { postId: string }) => {
  const { authState, postState, dispatch } = useRedux();
  const [isLiked, setIsLiked] = useState<boolean>();

  useEffect(() => {
    if (authState.user && postState.post)
      setIsLiked(postState.post.likes.users.includes(authState.user.id));
  }, [authState, postState]);

  const userId = authState?.user?.id;

  const [likePostRequest, { isLoading }] = useFetchWithRetry({
    query: LIKE_OR_DISLIKE_POST_MUTATION,
    variables: { postId },
    accessToken: authState.accessToken,
  });

  const handleLikePost = async () => {
    if (!isLoading) {
      try {
        if (isLiked) {
          dispatch(dislikePost(userId!));
        } else {
          dispatch(likePost(userId!));
        }
        await likePostRequest();
      } catch (error) {
        console.log(error);
      }
    }
  };
  return (
    <button
      aria-label="like post"
      className="likeBtn"
      onClick={handleLikePost}
      disabled={!authState.accessToken}
    >
      <i
        className={`fa-${isLiked ? 'solid' : 'regular'}  fa-heart`}
        style={isLiked ? { color: 'red' } : undefined}
      ></i>
    </button>
  );
};

export default LikeBtn;
