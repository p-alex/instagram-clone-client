import { FormEvent, useState } from 'react';
import { ADD_COMMENT_MUTATION } from '../../../../GraphQL/Mutations/commentMutations';
import useFetchWithRetry from '../../../../Hooks/useFetchWithRetry';
import useRedux from '../../../../Hooks/useRedux';
import { addComment } from '../../../../Redux/CommentsSection';
import './PostForm.scss';

const PostForm = () => {
  const { authState, postState, dispatch } = useRedux();
  const [comment, setComment] = useState('');
  const [addCommentRequest, { isLoading }] = useFetchWithRetry({
    query: ADD_COMMENT_MUTATION,
    variables: { comment, postId: postState.post?.id },
    accessToken: authState.accessToken,
  });
  const handleAddComment = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await addCommentRequest();
      if (response.success) {
        dispatch(addComment(response.comment));
        setComment('');
      }
    } catch (error: any) {
      console.log(error.message);
    }
  };

  return (
    <form className="postForm" onSubmit={(e) => handleAddComment(e)}>
      <input
        type="text"
        placeholder="Add a comment..."
        value={comment}
        onChange={(event) => setComment(event.target.value)}
      ></input>
      <button type="submit" disabled={isLoading || !comment}>
        Post
      </button>
    </form>
  );
};

export default PostForm;
