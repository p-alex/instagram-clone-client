import { useEffect, useRef, useState } from 'react';
import { DELETE_COMMENT_MUTATION } from '../../../GraphQL/Mutations/commentMutations';
import useFetchWithRetry from '../../../Hooks/useFetchWithRetry';
import useRedux from '../../../Hooks/useRedux';
import { IDefaultResponse } from '../../../interfaces';
import { deleteComment, toggleOptions } from '../../../Redux/CommentsSection';
import { togglePostOptions } from '../../../Redux/Post';
import FocusTrapRedirectFocus from '../../FocusTrap';

const CommentOptions = ({ commentId }: { commentId: string }) => {
  const { authState, postState, dispatch } = useRedux();

  const [deleteCommentRequest, { isLoading }] = useFetchWithRetry({
    query: DELETE_COMMENT_MUTATION,
    variables: { commentId, postId: postState.post?.id },
    accessToken: authState.accessToken,
  });

  const optionsFirstFocusable = useRef<any>();
  const optionsLastFocusable = useRef<any>();

  useEffect(() => {
    optionsFirstFocusable.current.focus();
  }, []);

  const handleDeleteComment = async () => {
    try {
      const response: IDefaultResponse = await deleteCommentRequest();
      if (response.success) {
        dispatch(toggleOptions());
        dispatch(deleteComment({ commentId }));
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleCloseModalAndRedirectFocus = () => {
    const optionsToggleBtn = document.querySelector(
      '.postUser__moreOptionsBtn'
    ) as HTMLButtonElement;
    dispatch(toggleOptions());
    optionsToggleBtn.focus();
  };

  return (
    <div className="postOptions">
      <FocusTrapRedirectFocus element={optionsLastFocusable} />
      <div
        className="postOptions__backdrop"
        onClick={() => dispatch(togglePostOptions())}
      ></div>
      <div className="postOptions__container">
        {authState.user?.id && authState.user.id === postState.post?.user.id ? (
          <button
            className="postOptions__option postOptions__red-option"
            onClick={handleDeleteComment}
            ref={optionsFirstFocusable}
            disabled={isLoading}
          >
            Delete
          </button>
        ) : (
          <button
            className="postOptions__option postOptions__red-option"
            ref={optionsFirstFocusable}
          >
            Report
          </button>
        )}
        <button
          className="postOptions__option"
          ref={optionsLastFocusable}
          onClick={handleCloseModalAndRedirectFocus}
        >
          Cancel
        </button>
      </div>

      <FocusTrapRedirectFocus element={optionsFirstFocusable} />
    </div>
  );
};

export default CommentOptions;
