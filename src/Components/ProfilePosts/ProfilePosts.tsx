import { useEffect, useState } from "react";
import PostModal from "../PostModal/PostModal";
import "./ProfilePosts.scss";
import { useNavigate } from "react-router-dom";
import { RootState } from "../../Redux/Store";
import { useDispatch, useSelector } from "react-redux";
import {
  closePostModal,
  selectPostId,
  setLastFocusedPostIndex,
} from "../../Redux/Profile";
import { resetPostState } from "../../Redux/Post";
import { IPost } from "../../interfaces";

interface Props {
  posts: IPost[];
  isProfilePage: boolean;
}

const ProfilePosts = (props: Props) => {
  const navigate = useNavigate();
  const profileState = useSelector((state: RootState) => state.profile);
  const dispatch = useDispatch();
  const [isMobileWidth, setIsMobileWidth] = useState(false);

  const handleViewPost = (postId: string, postIndex: number) => {
    if (props.isProfilePage) {
      if (isMobileWidth) {
        dispatch(setLastFocusedPostIndex(null));
        navigate(`/posts/${postId}`);
        return;
      }
      dispatch(setLastFocusedPostIndex(postIndex));
      dispatch(selectPostId(postId));
    } else {
      navigate(`/posts/${postId}`);
    }
  };

  const handleSetIsMobileWidth = () => {
    if (window.innerWidth <= 980) return setIsMobileWidth(true);
    setIsMobileWidth(false);
  };

  const handleTogglePostModal = () => {
    const lastFocusedPost = document.querySelector(
      `#profile-post-${profileState.lastFocusedPostIndex}`
    ) as HTMLButtonElement;
    dispatch(resetPostState());
    dispatch(closePostModal());
    lastFocusedPost.focus();
  };

  useEffect(() => {
    handleSetIsMobileWidth();
  }, []);

  useEffect(() => {
    let isMounted = true;

    if (isMounted) {
      window.addEventListener("resize", handleSetIsMobileWidth);
    }

    return () => {
      isMounted = false;
      window.removeEventListener("resize", handleSetIsMobileWidth);
    };
  }, []);

  return (
    <>
      <section className="profilePosts">
        {props.posts &&
          props.posts.map((post, index) => (
            <button
              className="profilePosts__post"
              role={isMobileWidth ? "link" : "button"}
              id={`profile-post-${index}`}
              aria-label={
                isMobileWidth
                  ? `navigate to post ${index + 1} page`
                  : "open post modal"
              }
              onClick={() => handleViewPost(post.id, index)}
              key={post.id}
            >
              <img
                src={post.images[0].croppedImage.url}
                alt=""
                className="profilePosts__image"
                width="293"
                height="293"
              />
              <div className="profilePosts__postOverlay">
                {post.likes.count ? (
                  <div className="profilePosts__postLikes">
                    <i className="fa-solid fa-heart profilePosts__icon"></i>
                    {post.likes.count}
                  </div>
                ) : null}
                <div className="profilePosts__postComments">
                  <i className="fa-solid fa-comment profilePosts__icon"></i>
                  {post.comments.count}
                </div>
              </div>
            </button>
          ))}
      </section>
      {profileState.selectedPostId && (
        <PostModal
          postId={profileState.selectedPostId}
          isProfileModal={true}
          handleTogglePostModal={handleTogglePostModal}
        />
      )}
    </>
  );
};

export default ProfilePosts;
