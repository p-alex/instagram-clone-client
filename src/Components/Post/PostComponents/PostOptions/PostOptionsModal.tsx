import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { DELETE_POST_MUTATION } from "../../../../GraphQL/Mutations/postMutations";
import { FOLLOW_OR_UNFOLLOW_USER } from "../../../../GraphQL/Mutations/userMutations";
import useFetchWithRetry from "../../../../Hooks/useFetchWithRetry";
import useRedux from "../../../../Hooks/useRedux";
import { IDefaultResponse } from "../../../../interfaces";
import {
  closePostModal,
  deletePost,
  followProfile,
  unfollowProfile,
} from "../../../../Redux/Profile";
import {
  followSuggestion,
  unfollowSuggestion,
} from "../../../../Redux/Suggestions";
import Spinner from "../../../../Ui/Spinner";
import FocusTrapRedirectFocus from "../../../FocusTrap";
import "./PostOptionsModal.scss";

interface Props {
  handleToggleOptionsModal: () => void;
  currentPostId: string;
  isPostOwnerFollowed: boolean;
  postOwnerId: string;
}

const PostOptionsModal = (props: Props) => {
  const navigate = useNavigate();
  const { authState, postState, profileState, suggestionsState, dispatch } =
    useRedux();

  const [followBtnText, setFollowBtnText] = useState<"Follow" | "Unfollow">(
    props.isPostOwnerFollowed ? "Unfollow" : "Follow"
  );

  const [deletePostRequest, { isLoading: isDeletePostRequestLoading }] =
    useFetchWithRetry({
      query: DELETE_POST_MUTATION,
      variables: { postId: postState.post?.id },
      accessToken: authState.accessToken,
    });

  const [followOrUnfollowUserRequest, { isLoading: isFollowRequestLoading }] =
    useFetchWithRetry({
      query: FOLLOW_OR_UNFOLLOW_USER,
      variables: { userId: props.postOwnerId, type: followBtnText },
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

  const handleChangeStateAfterFollowOrUnfollow = () => {
    // Change profileState and suggestionsState to reflect changes
    const doesUserExistInSuggestionsState = suggestionsState.suggestions?.find(
      (suggestion) => suggestion.id === profileState.user?.userId
    );
    if (profileState.isFollowed) {
      dispatch(unfollowProfile());
      if (doesUserExistInSuggestionsState?.id)
        dispatch(
          unfollowSuggestion({ suggestionId: profileState.user?.userId })
        );
    } else {
      dispatch(followProfile());
      if (doesUserExistInSuggestionsState?.id)
        dispatch(followSuggestion({ suggestionId: profileState.user?.userId }));
    }
  };

  const handleFollowOrUnfollow = async () => {
    try {
      const response = await followOrUnfollowUserRequest();
      if (response.success) {
        setFollowBtnText(followBtnText === "Follow" ? "Unfollow" : "Follow");
        handleChangeStateAfterFollowOrUnfollow();
      }
    } catch (error: any) {
      console.log(error.message);
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
    <div className="optionsModal" role={"dialog"}>
      <FocusTrapRedirectFocus element={optionsLastFocusable} />
      <div
        className="optionsModal__backdrop"
        onClick={handleCloseModalAndRedirectFocus}
      ></div>
      {/* ------------------- DELETE MODE ------------------- */}
      {isDeleteMode && (
        <div className="optionsModal__container">
          <FocusTrapRedirectFocus element={confirmDeleteLastFocusable} />
          <div className="optionsModal__confirmMessage">
            {isDeletePostRequestLoading && <Spinner />}
            <h2>
              {!isDeletePostRequestLoading ? "Delete Post?" : "Loading..."}
            </h2>
            {!isDeletePostRequestLoading && (
              <p>Are you sure you want to delete this post?</p>
            )}
          </div>
          {!isDeletePostRequestLoading && (
            <>
              <button
                className="optionsModal__option optionsModal__red-option"
                ref={confirmDeleteFirstFocusable}
                onClick={handleDeletePost}
                disabled={isDeletePostRequestLoading}
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
      )}

      {/* ------------------- REGULAR MODE ------------------- */}
      {!isDeleteMode && (
        <div className="optionsModal__container">
          {/* ------------------- DELETE OR REPORT BTN ------------------- */}
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

          {/* ------------------- FOLLOW OR UNFOLLOW BTN ------------------- */}
          {authState.accessToken &&
            authState.user?.id !== postState.post?.user.id && (
              <button
                className={
                  followBtnText === "Follow"
                    ? "optionsModal__option"
                    : "optionsModal__option optionsModal__red-option"
                }
                onClick={handleFollowOrUnfollow}
                disabled={isFollowRequestLoading}
              >
                {followBtnText}
              </button>
            )}

          {/* ------------------- GO TO POST BTN ------------------- */}
          <button
            className="optionsModal__option"
            role="link"
            onClick={handleGoToPost}
            ref={!authState.accessToken ? optionsFirstFocusable : null}
          >
            Go to post
          </button>

          {/* ------------------- COPY LINK BTN ------------------- */}
          <button
            className="optionsModal__option"
            onClick={handleCopyToClipboard}
          >
            Copy Link
          </button>

          {/* ------------------- CANCEL BTN ------------------- */}
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
