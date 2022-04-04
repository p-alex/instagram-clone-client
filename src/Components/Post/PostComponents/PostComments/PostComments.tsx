import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { GET_COMMENTS_QUERY } from '../../../../GraphQL/Queries/commentQueries';
import useFetchWithRetry from '../../../../Hooks/useFetchWithRetry';
import useRedux from '../../../../Hooks/useRedux';
import {
  errorLoadingComments,
  loadingComments,
  resetComments,
  setComments,
} from '../../../../Redux/CommentsSection';
import Comment from '../../../Comment/Comment';
import './PostComments.scss';

const PostComments = () => {
  const { authState, postState, commentsSectionState, dispatch } = useRedux();
  const { post } = postState;
  const [getCommentsRequest, { isLoading }] = useFetchWithRetry({
    query: GET_COMMENTS_QUERY,
    variables: { postId: postState.post?.id },
    accessToken: authState.accessToken,
  });
  const handleGetComments = async () => {
    dispatch(loadingComments());
    try {
      const response = await getCommentsRequest();
      if (response.success) dispatch(setComments(response.comments));
    } catch (error: any) {
      dispatch(errorLoadingComments(error.message));
      console.log(error.message);
    }
  };
  useEffect(() => {
    if (postState.post?.id && authState.accessToken) handleGetComments();
    return () => {
      dispatch(resetComments());
    };
  }, [postState.post?.id]);
  return (
    <div className="postComments">
      {post?.description && (
        <Comment
          profilePicture={post?.user.profilePicture}
          username={post?.user.username}
          comment={post?.description}
          postedAt={post?.postedAt}
          isDescription={true}
        />
      )}
      {isLoading && <p>Loading...</p>}
      {commentsSectionState.comments.length
        ? !isLoading &&
          authState.accessToken &&
          commentsSectionState.comments.map((comment, index) => (
            <Comment
              key={comment.id}
              commentId={comment.id}
              commentIndex={index}
              profilePicture={comment?.user?.profilePicture}
              username={comment?.user?.username}
              comment={comment?.comment}
              likes={comment.likes}
              postedAt={comment?.postedAt}
              isDescription={false}
            />
          ))
        : null}
      {!authState.accessToken && (
        <p>
          <Link to="/login" style={{ color: '' }}>
            Login
          </Link>{' '}
          to see comments.
        </p>
      )}
    </div>
  );
};

export default PostComments;
