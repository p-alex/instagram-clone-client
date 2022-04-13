import { FormEvent, useEffect, useRef, useState } from 'react';
import { ADD_COMMENT_MUTATION } from '../../../../GraphQL/Mutations/commentMutations';
import { ADD_REPLY_MUTATION } from '../../../../GraphQL/Mutations/replyMutations';
import useFetchWithRetry from '../../../../Hooks/useFetchWithRetry';
import useRedux from '../../../../Hooks/useRedux';
import { addComment } from '../../../../Redux/CommentsSection';
import './PostForm.scss';

const PostForm = () => {
  const { authState, postState, dispatch } = useRedux();
  const [text, setText] = useState('');

  const [addCommentOrReplyRequest, { isLoading }] = useFetchWithRetry({
    query: ADD_COMMENT_MUTATION,
    variables: { comment: text, postId: postState.post?.id },
    accessToken: authState.accessToken,
  });

  const handleAddCommentOrReply = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await addCommentOrReplyRequest();
      if (response.success) {
        dispatch(addComment(response?.comment));
        setText('');
      }
    } catch (error: any) {
      console.log(error.message);
    }
  };

  const formInput = useRef<any>();

  useEffect(() => {
    if (postState.postFormState.postNew === 'comment') setText('');
    if (postState.postFormState.postNew === 'reply') setText('');
  }, [postState.postFormState]);

  return (
    <form className="postForm" onSubmit={(e) => handleAddCommentOrReply(e)}>
      {postState.postFormState.postNew === 'reply' && (
        <div className="postForm__replyTo">
          <p>{`Reply to ${postState.postFormState.replyTo}`}</p>
        </div>
      )}
      <div className="postForm__inputAndSubmit">
        <input
          type="text"
          className="postForm__input"
          placeholder={
            postState.postFormState.postNew === 'comment'
              ? 'Add a comment...'
              : `Add a reply...`
          }
          value={text}
          onChange={(event) => setText(event.target.value)}
          ref={formInput}
        ></input>
        <button type="submit" disabled={isLoading || !text}>
          Post
        </button>
      </div>
    </form>
  );
};

export default PostForm;
