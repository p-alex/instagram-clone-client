import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { DELETE_POST_MUTATION } from "../../../../GraphQL/Mutations/postMutations";
import useFetchWithRetry from "../../../../Hooks/useFetchWithRetry";
import useRedux from "../../../../Hooks/useRedux";
import { IDefaultResponse } from "../../../../interfaces";
import { closePostModal, deletePost } from "../../../../Redux/Profile";
import Spinner from "../../../../Ui/Spinner";
import FocusTrapRedirectFocus from "../../../FocusTrap";

interface Props {
  handleToggleOptionsModal: () => void;
  currentPostId: string;
}

const PostOptionsModal = (props: Props) => {
  const navigate = useNavigate();
  const { authState, postState, dispatch } = useRedux();

  const [deletePostRequest, { isLoading }] = useFetchWithRetry({
    query: DELETE_POST_MUTATION,
    variables: { postId: postState.post?.id },
    accessToken: authState.accessToken,
  });

  const [isDeleteMode, setIsDeleteMode] = useState(false);

  const optionsFirstFocusable = useRef<any>();
  const optionsLastFocusable = useRef<any>();

  const confirmDeleteFirstFocusable = useRef<any>();
  const confirmDeleteLastFocusable = useRef<any>();

  useEffect(() => {
    optionsFirstFocusable.current.focus();
  }, []);

  useEffect(() => {
    if (isDeleteMode) confirmDeleteLastFocusable.current.focus();
  }, [isDeleteMode]);

  const handleDeletePost = async () => {
    try {
      const response: IDefaultResponse = await deletePostRequest();
      if (response.success) {
        navigate(`/users/${authState.user?.username}`);
        dispatch(closePostModal());
        dispatch(deletePost(postState.post!.id));
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleCloseModalAndRedirectFocus = () => {
    const optionsToggleBtn = document.querySelector(
      ".postUser__moreOptionsBtn"
    ) as HTMLButtonElement;
    props.handleToggleOptionsModal();
    optionsToggleBtn.focus();
  };

  const handleToggleDeleteMode = () => {
    setIsDeleteMode(!isDeleteMode);
    optionsFirstFocusable.current.focus();
  };

  const handleGoToPost = () => {
    navigate(`/posts/${props.currentPostId}`);
  };

  const handleCopyToClipboard = () => {
    navigator.clipboard.writeText(window.location.href);
    props.handleToggleOptionsModal();
  };

  return (
    <div className="optionsModal">
      <FocusTrapRedirectFocus element={optionsLastFocusable} />
      <div
        className="optionsModal__backdrop"
        onClick={handleCloseModalAndRedirectFocus}
      ></div>
      {isDeleteMode ? (
        <div className="optionsModal__container">
          <FocusTrapRedirectFocus element={confirmDeleteLastFocusable} />
          <div className="optionsModal__confirmMessage">
            {isLoading && <Spinner />}
            <h2>{!isLoading ? "Delete Post?" : "Loading..."}</h2>
            {!isLoading && <p>Are you sure you want to delete this post?</p>}
          </div>
          {!isLoading && (
            <>
              <button
                className="optionsModal__option optionsModal__red-option"
                ref={confirmDeleteFirstFocusable}
                onClick={handleDeletePost}
                disabled={isLoading}
              >
                Delete
              </button>
              <button
                className="optionsModal__option"
                ref={confirmDeleteLastFocusable}
                onClick={handleToggleDeleteMode}
              >
                Cancel
              </button>
            </>
          )}
          <FocusTrapRedirectFocus element={confirmDeleteFirstFocusable} />
        </div>
      ) : (
        <div className="optionsModal__container">
          {authState.user?.id &&
          authState.user.id === postState.post?.user.id ? (
            <button
              className="optionsModal__option optionsModal__red-option"
              onClick={() => setIsDeleteMode(!isDeleteMode)}
              ref={optionsFirstFocusable}
            >
              Delete
            </button>
          ) : (
            authState.accessToken && (
              <button
                className="optionsModal__option optionsModal__red-option"
                ref={optionsFirstFocusable}
              >
                Report
              </button>
            )
          )}
          {authState.accessToken &&
            authState.user?.id !== postState.post?.user.id && (
              <button className="optionsModal__option">Follow</button>
            )}
          <button
            className="optionsModal__option"
            role="link"
            onClick={handleGoToPost}
            ref={!authState.accessToken ? optionsFirstFocusable : null}
          >
            Go to post
          </button>
          <button
            className="optionsModal__option"
            onClick={handleCopyToClipboard}
          >
            Copy Link
          </button>
          <button
            className="optionsModal__option"
            ref={optionsLastFocusable}
            onClick={handleCloseModalAndRedirectFocus}
          >
            Cancel
          </button>
        </div>
      )}
      <FocusTrapRedirectFocus element={optionsFirstFocusable} />
    </div>
  );
};

export default PostOptionsModal;
