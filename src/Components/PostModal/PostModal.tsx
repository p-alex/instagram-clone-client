import { useEffect, useState, useRef } from "react";
import { GET_POST_QUERY } from "../../GraphQL/Queries/postQueries";
import useFetch from "../../Hooks/useFetch";
import { IPost } from "../../interfaces";
import "./PostModal.scss";
import FocusTrapRedirectFocus from "../FocusTrap";
import { closePostModal, selectPostId } from "../../Redux/Profile";
import useRedux from "../../Hooks/useRedux";
import PostImage from "../Post/PostComponents/PostImage/PostImage";
import PostUser from "../Post/PostComponents/PostUser/PostUser";
import PostComments from "../Post/PostComponents/PostComments/PostComments";
import PostReact from "../Post/PostComponents/PostReact/PostReact";
import PostForm from "../Post/PostComponents/PostForm/PostForm";
import {
  setPost,
  loadingPost,
  loadingPostError,
  resetPostState,
  closePostOptions,
} from "../../Redux/Post";
import PostLoader from "../Post/PostComponents/PostLoader/PostLoader";
import PostPanel from "../Post/PostComponents/PostPanel/PostPanel";
import PostModalCtrl from "./PostModalComponents/PostModalCtrl";
import PostOptionsModal from "../Post/PostComponents/PostOptions/PostOptionsModal";

const PostModal = ({ postId }: { postId: string }) => {
  const { authState, profileState, postState, dispatch } = useRedux();
  const { selectedPostId, lastFocusedPostIndex, user } = profileState;
  const { post, isLoading } = postState;
  const selectedPost = user?.posts.postsList.find(
    (post) => post.id === selectedPostId
  );
  const userPosts = user?.posts.postsList;

  const [getPost] = useFetch({
    query: GET_POST_QUERY,
    variables: {
      postId,
      userId: authState.user?.id,
    },
  });

  const [currentPostIndex, setCurrentPostIndex] = useState<number | undefined>(
    0
  );
  const [isPostOptionsActive, setIsPostOptionsActive] = useState(false);

  const handleToggleOptionsModal = () =>
    setIsPostOptionsActive((prevState) => !prevState);

  useEffect(() => {
    setCurrentPostIndex(
      userPosts!.findIndex((post) => post.id === selectedPost?.id)
    );
  }, [selectedPostId]);

  const handleGetPost = async () => {
    try {
      dispatch(loadingPost());
      const response: {
        statusCode: number;
        success: boolean;
        message: string;
        post: IPost;
      } = await getPost();
      if (response.success) return dispatch(setPost(response.post));
      dispatch(loadingPostError(response.message));
    } catch (error: any) {
      console.log(error.message);
      dispatch(loadingPostError("Something went wrong"));
    }
  };

  const firstFocusableElement = useRef<any>();
  const lastFocusableElement = useRef<any>();

  useEffect(() => {
    firstFocusableElement.current.focus();
    return () => {
      dispatch(closePostModal());
      dispatch(closePostOptions());
    };
  }, []);

  useEffect(() => {
    handleGetPost();
  }, [postId]);

  const handleCloseModal = () => {
    const lastFocusedPost = document.querySelector(
      `#profile-post-${lastFocusedPostIndex}`
    ) as HTMLButtonElement;
    dispatch(resetPostState());
    dispatch(closePostModal());
    lastFocusedPost.focus();
  };

  const handleNavigatePosts = (direction: "prev" | "next") => {
    if (userPosts?.length && !isLoading) {
      if (typeof currentPostIndex === "number") {
        if (direction === "prev" && currentPostIndex > 0)
          return dispatch(selectPostId(userPosts[currentPostIndex - 1].id));
        if (direction === "next" && currentPostIndex < userPosts.length - 1)
          return dispatch(selectPostId(userPosts[currentPostIndex + 1].id));
      }
    }
  };

  return (
    <div className="postModal__container" role={"dialog"}>
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
        <PostModalCtrl
          direction="prev"
          handleNavigatePosts={handleNavigatePosts}
        />
      ) : null}

      {!isLoading ? (
        <div className="postModal">
          <PostImage
            imageUrl={post?.images[0].fullImage.url}
            aspectRatio={post?.images[0].fullImage.aspectRatio}
          />
          <PostPanel>
            <PostUser
              username={post?.user.username}
              profilePicture={post?.user.profilePicture}
              handleToggleOptionsModal={handleToggleOptionsModal}
            />
            <PostComments />
            <PostReact
              post={postState.post}
              isPostLiked={post?.isLiked}
              isFeedPost={false}
            />
            {authState.accessToken && <PostForm />}
          </PostPanel>
        </div>
      ) : (
        <PostLoader />
      )}

      {typeof currentPostIndex === "number" &&
      userPosts &&
      currentPostIndex < userPosts?.length - 1 ? (
        <PostModalCtrl
          direction="next"
          handleNavigatePosts={handleNavigatePosts}
        />
      ) : null}

      {isPostOptionsActive && (
        <PostOptionsModal
          handleToggleOptionsModal={handleToggleOptionsModal}
          currentPostId={post!.id}
        />
      )}
      <FocusTrapRedirectFocus element={firstFocusableElement} />
    </div>
  );
};

export default PostModal;
