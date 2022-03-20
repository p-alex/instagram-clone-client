import { useEffect, useState, useRef } from 'react';
import { GET_POST_QUERY } from '../../GraphQL/Queries/postQueries';
import useAxios from '../../Hooks/useAxios';
import { IPost } from '../../interfaces';
import './PostModal.scss';
import { DEFAULT_PROFILE_PICTURE_URL } from '../../default-profile-pic-url';
import Comment from '../Comment/Comment';
import Spinner from '../../Ui/Spinner';
import FocusTrapRedirectFocus from '../FocusTrap';
import { closePostModal, selectPostId } from '../../Redux/Profile';
import { dateConverter } from '../../Util/dateConverter';
import useRedux from '../../Hooks/useRedux';
import PostImage from '../Post/PostComponents/PostImage/PostImage';
import PostUser from '../Post/PostComponents/PostUser/PostUser';
import PostComments from '../Post/PostComponents/PostComments/PostComments';

const PostModal = ({ postId }: { postId: string }) => {
  const { profileState, dispatch } = useRedux();
  const { selectedPostId, lastFocusedPostIndex, user } = profileState;
  const selectedPost = user?.posts.postsList.find((post) => post.id === selectedPostId);
  const userPosts = user?.posts.postsList;

  const [getPost, { isLoading, error }] = useAxios({
    query: GET_POST_QUERY,
    variables: {
      postId,
    },
  });

  const [post, setPost] = useState<IPost | null>(null);

  const [currentPostIndex, setCurrentPostIndex] = useState<number | undefined>(0);

  useEffect(() => {
    setCurrentPostIndex(userPosts!.findIndex((post) => post.id === selectedPost?.id));
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

  const handleCloseModal = () => {
    const lastFocusedPost = document.querySelector(
      `#profile-post-${lastFocusedPostIndex}`
    ) as HTMLButtonElement;
    dispatch(closePostModal());
    lastFocusedPost.focus();
  };

  const handleNavigatePosts = (direction: 'prev' | 'next') => {
    if (userPosts?.length && !isLoading) {
      if (typeof currentPostIndex === 'number') {
        if (direction === 'prev' && currentPostIndex > 0)
          return dispatch(selectPostId(userPosts[currentPostIndex - 1].id));
        if (direction === 'next' && currentPostIndex < userPosts.length - 1)
          return dispatch(selectPostId(userPosts[currentPostIndex + 1].id));
      }
    }
  };

  return (
    <div className="postModal__container">
      <FocusTrapRedirectFocus element={lastFocusableElement} />

      <div className="postModal__backdrop" onClick={handleCloseModal}></div>
      <button
        className="postModal__closeBtn"
        onClick={handleCloseModal}
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
      userPosts &&
      currentPostIndex < userPosts?.length - 1 ? (
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

        <PostImage imageUrl={post?.images[0].fullImage} />

        <div className="postModal__panel">
          <PostUser
            username={post?.user.username}
            profilePicture={post?.user.profilePicture}
          />

          <PostComments
            profilePicture={post?.user.profilePicture}
            username={post?.user.username}
            comment={post?.description}
            postedAt={post?.postedAt}
            comments={post?.comments.commentsList ? post.comments.commentsList : []}
          />

          <div className="postModal__react">
            <button aria-label="like post">
              <i className="fa-regular fa-heart"></i>
            </button>
            <button aria-label="add a comment">
              <i className="fa-regular fa-comment"></i>
            </button>
            <p>{post?.likes.count} likes</p>
            {post?.postedAt && <small>{dateConverter(parseInt(post.postedAt))}</small>}
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
