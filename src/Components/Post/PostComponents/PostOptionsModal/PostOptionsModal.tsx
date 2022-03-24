import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useRedux from '../../../../Hooks/useRedux';
import { togglePostOptions } from '../../../../Redux/Post';
import FocusTrapRedirectFocus from '../../../FocusTrap';
import './PostOptionsModal.scss';

const PostOptionsModal = () => {
  const navigate = useNavigate();
  const { authState, postState, dispatch } = useRedux();
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
            <h2>Delete Post?</h2>
            <p>Are you sure you want to delete this post?</p>
          </div>

          <button
            className="postOptions__option postOptions__red-option"
            ref={confirmDeleteFirstFocusable}
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
          {authState.user?.id ? (
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
