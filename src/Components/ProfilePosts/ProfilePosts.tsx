import { useEffect, useState } from 'react';
import PostModal from '../PostModal/PostModal';
import './ProfilePosts.scss';
import { useNavigate } from 'react-router-dom';
import { RootState } from '../../Redux/Store';
import { useDispatch, useSelector } from 'react-redux';
import { selectPostId, setLastFocusedPostIndex } from '../../Redux/Profile';

const ProfilePosts = () => {
  const navigate = useNavigate();
  const profileState = useSelector((state: RootState) => state.profile);
  const dispatch = useDispatch();
  const [isMobileWidth, setIsMobileWidth] = useState(false);

  const handleViewPost = (postId: string, postIndex: number) => {
    if (isMobileWidth) {
      dispatch(setLastFocusedPostIndex(null));
      navigate(`/posts/${postId}`);
    }
    dispatch(setLastFocusedPostIndex(postIndex));
    dispatch(selectPostId(postId));
  };

  const handleSetIsMobileWidth = () => {
    if (window.innerWidth <= 980) return setIsMobileWidth(true);
    setIsMobileWidth(false);
  };

  useEffect(() => {
    handleSetIsMobileWidth();
  }, []);

  useEffect(() => {
    let isMounted = true;

    if (isMounted) {
      window.addEventListener('resize', handleSetIsMobileWidth);
    }

    return () => {
      isMounted = false;
      window.removeEventListener('resize', handleSetIsMobileWidth);
    };
  }, []);

  return (
    <>
      <section className="profilePosts">
        {profileState.user &&
          profileState.user.posts.postsList.map((post, index) => (
            <button
              className="profilePosts__post"
              role={isMobileWidth ? 'link' : 'button'}
              id={`profile-post-${index}`}
              aria-label={
                isMobileWidth ? `navigate to post ${index + 1} page` : 'open post modal'
              }
              onClick={() => handleViewPost(post.id, index)}
              key={post.id}
            >
              <img
                src={post.images[0].croppedImage}
                alt=""
                className="profilePosts__image"
                width="293"
                height="293"
                loading="lazy"
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
      {profileState.selectedPostId && <PostModal postId={profileState.selectedPostId} />}
    </>
  );
};

export default ProfilePosts;
