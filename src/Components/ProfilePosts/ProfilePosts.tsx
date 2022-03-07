import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faComment } from '@fortawesome/free-solid-svg-icons';
import { useContext } from 'react';
import { ProfileContext } from '../../Context/ProfileContext';
import './ProfilePosts.scss';
import PostModal from '../PostModal/PostModal';

const ProfilePosts = () => {
  const { profileData, setSelectedPostId, selectedPostId } = useContext(ProfileContext);

  return (
    <>
      <section className="profilePosts">
        {profileData?.posts.postsList &&
          profileData?.posts.postsList.map((post) => (
            <button
              className="profilePosts__post"
              aria-label="open post modal"
              onClick={() => setSelectedPostId(post.id)}
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
                    <FontAwesomeIcon icon={faHeart} className="profilePosts__icon" />
                    {post.likes.count}
                  </div>
                ) : null}
                <div className="profilePosts__postComments">
                  <FontAwesomeIcon icon={faComment} className="profilePosts__icon" />{' '}
                  {post.comments.count}
                </div>
              </div>
            </button>
          ))}
      </section>
      {selectedPostId && <PostModal postId={selectedPostId} />}
    </>
  );
};

export default ProfilePosts;
