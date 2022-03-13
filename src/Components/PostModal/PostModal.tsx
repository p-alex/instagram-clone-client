import { useEffect, useState, useContext, useRef } from 'react';
import { GET_POST_QUERY } from '../../GraphQL/Queries/postQueries';
import useAxios from '../../Hooks/useAxios';
import { IPost } from '../../interfaces';
import './PostModal.scss';
import { ProfileContext } from '../../Context/ProfileContext';
import { DEFAULT_PROFILE_PICTURE_URL } from '../../default-profile-pic-url';
import Comment from '../Comment/Comment';
import Spinner from '../../Ui/Spinner';
import FocusTrapRedirectFocus from '../FocusTrap';

const PostModal = ({ postId }: { postId: string }) => {
  const { selectedPostId, setSelectedPostId, profilePosts, handleClosePostModal } =
    useContext(ProfileContext);

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

  const firstFocusableElement = useRef<any>();
  const lastFocusableElement = useRef<any>();

  useEffect(() => {
    firstFocusableElement.current.focus();
  }, []);

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
    <div className="postModal__container">
      <FocusTrapRedirectFocus element={lastFocusableElement} />

      <div className="postModal__backdrop" onClick={handleClosePostModal}></div>
      <button
        className="postModal__closeBtn"
        onClick={handleClosePostModal}
        ref={firstFocusableElement}
      >
        <i className="fa-solid fa-xmark"></i>
      </button>
      {currentPostIndex && currentPostIndex > 0 ? (
        <button
          className="postModal__ctrl ctrl--left"
          onClick={() => handleNavigatePosts('prev')}
        >
          <i className="fa-solid fa-chevron-left"></i>
        </button>
      ) : null}

      {typeof currentPostIndex === 'number' &&
      profilePosts &&
      currentPostIndex < profilePosts?.length - 1 ? (
        <button
          className="postModal__ctrl ctrl--right"
          onClick={() => handleNavigatePosts('next')}
        >
          <i className="fa-solid fa-chevron-right"></i>
        </button>
      ) : null}
      <div className="postModal">
        {isLoading && (
          <div className="postModal__loading">
            <div className="postModal__spinnerContainer">
              <Spinner />
            </div>
          </div>
        )}

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
              <i className="fa-solid fa-ellipsis"></i>
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
              <i className="fa-regular fa-heart"></i>
            </button>
            <button aria-label="add a comment">
              <i className="fa-regular fa-comment"></i>
            </button>
            <p>{post?.likes.count} likes</p>
            <small>{post?.postedAt}</small>
          </div>

          <form className="postModal__form">
            <input type="text" placeholder="Add a comment..."></input>
            <button type="submit" ref={lastFocusableElement}>
              Post
            </button>
          </form>
        </div>
      </div>
      <FocusTrapRedirectFocus element={firstFocusableElement} />
    </div>
  );
};

export default PostModal;
