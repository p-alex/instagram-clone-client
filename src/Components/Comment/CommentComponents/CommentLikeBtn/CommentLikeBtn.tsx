import { useEffect, useState } from 'react';
import { LIKE_OR_DISLIKE_COMMENT_MUTATION } from '../../../../GraphQL/Mutations/commentMutations';
import useFetchWithRetry from '../../../../Hooks/useFetchWithRetry';
import useRedux from '../../../../Hooks/useRedux';
import { ILikes } from '../../../../interfaces';
import { dislikeComment, likeComment } from '../../../../Redux/CommentsSection';
import './CommentLikeBtn.scss';
const CommentLikeBtn = ({
  isReply,
  commentId,
  replyId,
  likes,
  commentIndex,
}: {
  isReply: boolean;
  commentId: string;
  replyId: string;
  likes: ILikes | undefined;
  commentIndex: number;
}) => {
  const [isLiked, setIsLiked] = useState(false);
  const [canRequest, setCanRequest] = useState(true);
  const { authState, dispatch } = useRedux();
  const [likeCommentRequest, { isLoading }] = useFetchWithRetry({
    query: LIKE_OR_DISLIKE_COMMENT_MUTATION,
    variables: isReply ? { replyId } : { commentId },
    accessToken: authState.accessToken,
  });
  const handleLikeComment = async () => {
    if (canRequest) {
      try {
        setCanRequest(false);
        if (!isLiked) {
          dispatch(likeComment({ commentId, commentIndex, userId: authState.user!.id }));
          setTimeout(() => setCanRequest(true), 1500);
        } else {
          dispatch(
            dislikeComment({ commentId, commentIndex, userId: authState.user!.id })
          );
          setTimeout(() => setCanRequest(true), 1500);
        }
        await likeCommentRequest();
      } catch (error) {
        console.log(error);
        setCanRequest(true);
      }
    }
  };
  useEffect(() => {
    if (authState.user) {
      let isCommentAlreadyLiked = likes?.users.includes(authState.user.id);
      isCommentAlreadyLiked ? setIsLiked(true) : setIsLiked(false);
    }
  }, [likes]);
  return (
    <button
      className="commentLikeBtn"
      onClick={handleLikeComment}
      disabled={!canRequest || isLoading}
      style={isLiked ? { color: 'red' } : { color: 'black' }}
    >
      <i className={`fa-${isLiked ? 'solid' : 'regular'}  fa-heart`}></i>
    </button>
  );
};

export default CommentLikeBtn;
