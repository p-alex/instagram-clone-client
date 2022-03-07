import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faHeart,
  faComment,
  faEllipsisH,
  faChevronLeft,
  faChevronRight,
} from '@fortawesome/free-solid-svg-icons';
import { useEffect, useState, useContext } from 'react';
import { GET_POST_QUERY } from '../../GraphQL/Queries/postQueries';
import useAxios from '../../Hooks/useAxios';
import { IPost } from '../../interfaces';
import './PostModal.scss';
import { ProfileContext } from '../../Context/ProfileContext';
import { DEFAULT_PROFILE_PICTURE_URL } from '../../default-profile-pic-url';
import Comment from '../Comment/Comment';
import Spinner from '../../Ui/Spinner';

const PostModal = ({ postId }: { postId: string }) => {
  const { selectedPostId, setSelectedPostId, profilePosts } = useContext(ProfileContext);

  const [getPost, { isLoading, error }] = useAxios({
    query: GET_POST_QUERY,
    variables: {
      postId,
    },
  });

  const [post, setPost] = useState<IPost | null>(null);

  const [currentPostIndex, setCurrentPostIndex] = useState<number | undefined>(0);

  useEffect(() => {
    setCurrentPostIndex(profilePosts?.findIndex((post) => post.id === selectedPostId));
  }, [selectedPostId]);

  const handleGetPost = async () => {
    try {
      const response: {
        statusCode: number;
        success: boolean;
        message: string;
        post: IPost;
      } = await getPost();
      if (response.success) {
        setPost(response.post);
      }
    } catch (error: any) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    handleGetPost();
  }, [postId]);

  const handleNavigatePosts = (direction: 'prev' | 'next') => {
    if (profilePosts?.length && !isLoading) {
      if (typeof currentPostIndex === 'number') {
        if (direction === 'prev' && currentPostIndex > 0)
          return setSelectedPostId(profilePosts[currentPostIndex - 1].id);
        if (direction === 'next' && currentPostIndex < profilePosts.length - 1)
          return setSelectedPostId(profilePosts[currentPostIndex + 1].id);
      }
    }
  };

  return (
    <>
      <div className="postModal__backdrop" onClick={() => setSelectedPostId(null)}></div>
      <div className="postModal">
        {isLoading && (
          <div className="postModal__loading">
            <div className="postModal__spinnerContainer">
              <Spinner />
            </div>
          </div>
        )}
        {currentPostIndex && currentPostIndex > 0 ? (
          <button
            className="postModal__ctrl ctrl--left"
            onClick={() => handleNavigatePosts('prev')}
          >
            <FontAwesomeIcon icon={faChevronLeft} />
          </button>
        ) : null}

        <div className="postModal__image">
          <img src={post?.images[0].fullImage} alt="" />
        </div>
        <div className="postModal__panel">
          <div className="postModal__owner">
            <div className="postModal__ownerContainer">
              <img
                src={
                  post?.user.profilePicture
                    ? post?.user.profilePicture
                    : DEFAULT_PROFILE_PICTURE_URL
                }
                alt=""
                width="35"
                height="35"
              />
              <p>{post?.user.username}</p>
            </div>
            <button className="postModal__moreOptionsBtn">
              <FontAwesomeIcon icon={faEllipsisH} />
            </button>
          </div>
          <div className="postModal__comments">
            {post?.description && (
              <Comment
                profilePicture={post.user.profilePicture}
                username={post.user.username}
                description={post.description}
                postedAt={post.postedAt}
              />
            )}
          </div>
          <div className="postModal__react">
            <button aria-label="like post">
              <FontAwesomeIcon icon={faHeart} />
            </button>
            <button aria-label="add a comment">
              <FontAwesomeIcon icon={faComment} />
            </button>
            <p>{post?.likes.count} likes</p>
            <small>{post?.postedAt}</small>
          </div>
          <form className="postModal__form">
            <input type="text" placeholder="Add a comment..."></input>
            <button type="submit">Post</button>
          </form>
        </div>
        {typeof currentPostIndex === 'number' &&
        profilePosts &&
        currentPostIndex < profilePosts?.length - 1 ? (
          <button
            className="postModal__ctrl ctrl--right"
            onClick={() => handleNavigatePosts('next')}
          >
            <FontAwesomeIcon icon={faChevronRight} />
          </button>
        ) : null}
      </div>
    </>
  );
};

export default PostModal;
