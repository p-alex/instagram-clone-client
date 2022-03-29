import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { DELETE_POST_MUTATION } from '../../../../GraphQL/Mutations/postMutations';
import useFetchWithRetry from '../../../../Hooks/useFetchWithRetry';
import useRedux from '../../../../Hooks/useRedux';
import { IDefaultResponse } from '../../../../interfaces';
import { togglePostOptions } from '../../../../Redux/Post';
import { closePostModal, deletePost } from '../../../../Redux/Profile';
import Spinner from '../../../../Ui/Spinner';
import FocusTrapRedirectFocus from '../../../FocusTrap';
import './PostOptionsModal.scss';

const PostOptionsModal = () => {
  const navigate = useNavigate();
  const { authState, postState, dispatch } = useRedux();

  const [deletePostRequest, { isLoading }] = useFetchWithRetry({
    query: DELETE_POST_MUTATION,
    variables: { id: postState.post?.id },
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

  const handleCopyToUrlToClipboard = () => {
    navigator.clipboard.writeText(window.location.href);
  };

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

  return (
    <div className="postOptions">
      <FocusTrapRedirectFocus element={optionsLastFocusable} />
      <div
        className="postOptions__backdrop"
        onClick={() => dispatch(togglePostOptions())}
      ></div>
      {isDeleteMode ? (
        <div className="postOptions__container">
          <FocusTrapRedirectFocus element={confirmDeleteLastFocusable} />
          <div className="postOptions__confirmMessage">
            {isLoading && <Spinner />}
            <h2>{!isLoading ? 'Delete Post?' : 'Loading...'}</h2>
            {!isLoading && <p>Are you sure you want to delete this post?</p>}
          </div>
          <button
            className="postOptions__option postOptions__red-option"
            ref={confirmDeleteFirstFocusable}
            onClick={handleDeletePost}
            disabled={isLoading}
          >
            Delete
          </button>
          <button
            className="postOptions__option"
            ref={confirmDeleteLastFocusable}
            onClick={() => {
              setIsDeleteMode(!isDeleteMode);
              optionsFirstFocusable.current.focus();
            }}
          >
            Cancel
          </button>
          <FocusTrapRedirectFocus element={confirmDeleteFirstFocusable} />
        </div>
      ) : (
        <div className="postOptions__container">
          {authState.user?.id && authState.user.id === postState.post?.user.id ? (
            <button
              className="postOptions__option postOptions__red-option"
              onClick={() => setIsDeleteMode(!isDeleteMode)}
              ref={optionsFirstFocusable}
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
          {!authState.user?.id && <button className="postOptions__option">Follow</button>}
          <button
            className="postOptions__option"
            role="link"
            onClick={() => {
              dispatch(togglePostOptions());
              navigate(`/posts/${postState.post?.id}`);
            }}
          >
            Go to post
          </button>
          <button
            className="postOptions__option"
            onClick={() => {
              handleCopyToUrlToClipboard();
              dispatch(togglePostOptions());
            }}
          >
            Copy Link
          </button>
          <button
            className="postOptions__option"
            ref={optionsLastFocusable}
            onClick={() => {
              const optionsToggleBtn = document.querySelector(
                '.postUser__moreOptionsBtn'
              ) as HTMLButtonElement;
              dispatch(togglePostOptions());
              optionsToggleBtn.focus();
            }}
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
