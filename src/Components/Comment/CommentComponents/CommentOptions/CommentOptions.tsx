import { useEffect, useRef } from "react";
import { DELETE_COMMENT_MUTATION } from "../../../../GraphQL/Mutations/commentMutations";
import useFetchWithRetry from "../../../../Hooks/useFetchWithRetry";
import useRedux from "../../../../Hooks/useRedux";
import { IDefaultResponse } from "../../../../interfaces";
import {
  deleteComment,
  toggleCommentOptions,
} from "../../../../Redux/CommentsSection";
import FocusTrapRedirectFocus from "../../../FocusTrap";

interface Props {
  commentId: string;
  commentUserId: string;
}

const CommentOptions = (props: Props) => {
  const { authState, postState, dispatch } = useRedux();

  const [deleteCommentRequest, { isLoading }] = useFetchWithRetry({
    query: DELETE_COMMENT_MUTATION,
    variables: { commentId: props.commentId, postId: postState.post?.id },
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
        dispatch(toggleCommentOptions(props.commentId));
        dispatch(deleteComment({ commentId: props.commentId }));
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleCloseModalAndRedirectFocus = () => {
    const optionsToggleBtn = document.querySelector(
      ".commentBottom__optionsToggle"
    ) as HTMLButtonElement;
    dispatch(toggleCommentOptions(props.commentId));
    optionsToggleBtn.focus();
  };

  return (
    <div className="optionsModal">
      <FocusTrapRedirectFocus element={optionsLastFocusable} />
      <div
        className="optionsModal__backdrop"
        onClick={handleCloseModalAndRedirectFocus}
      ></div>
      <div className="optionsModal__container">
        {authState.user?.id && authState.user.id === props.commentUserId ? (
          <button
            className="optionsModal__option optionsModal__red-option"
            onClick={handleDeleteComment}
            ref={optionsFirstFocusable}
            disabled={isLoading}
          >
            Delete
          </button>
        ) : (
          <button
            className="optionsModal__option optionsModal__red-option"
            ref={optionsFirstFocusable}
          >
            Report
          </button>
        )}
        <button
          className="optionsModal__option"
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
