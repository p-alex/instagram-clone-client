import { useEffect } from 'react';
import { GET_COMMENTS_QUERY } from '../../../../GraphQL/Queries/commentQueries';
import useFetchWithRetry from '../../../../Hooks/useFetchWithRetry';
import useRedux from '../../../../Hooks/useRedux';
import { IComment } from '../../../../interfaces';
import { loadComments } from '../../../../Redux/Post';
import Spinner from '../../../../Ui/Spinner';
import Comment from '../../../Comment/Comment';
import './PostComments.scss';

const PostComments = ({
  profilePicture,
  username,
  description,
  postedAt,
}: {
  profilePicture: string | undefined;
  username: string | undefined;
  description: string | undefined;
  postedAt: string | undefined;
}) => {
  const { authState, postState, dispatch } = useRedux();
  const [getCommentsRequest, { isLoading }] = useFetchWithRetry({
    query: GET_COMMENTS_QUERY,
    variables: { postId: postState.post?.id },
    accessToken: authState.accessToken,
  });
  const handleGetComments = async () => {
    try {
      const response = await getCommentsRequest();
      if (response.success) dispatch(loadComments(response.comments));
    } catch (error: any) {
      console.log(error.message);
    }
  };
  useEffect(() => {
    if (postState.post?.id) handleGetComments();
  }, [postState.post?.id]);
  return (
    <div className="postComments">
      {description && (
        <Comment
          profilePicture={profilePicture!}
          username={username!}
          comment={description!}
          postedAt={postedAt!}
        />
      )}
      {isLoading && <p>Loading...</p>}
      {postState.post?.comments.userComments.length &&
        !isLoading &&
        postState.post?.comments.userComments.map((comment) => (
          <Comment
            key={comment.id}
            profilePicture={comment?.user?.profilePicture}
            username={comment?.user?.username}
            comment={comment?.comment}
            postedAt={comment?.postedAt}
          />
        ))}
    </div>
  );
};

export default PostComments;
