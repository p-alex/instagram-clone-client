import PostLoader from "./PostComponents/PostLoader/PostLoader";
import PostImage from "./PostComponents/PostImage/PostImage";
import PostPanel from "./PostComponents/PostPanel/PostPanel";
import PostUser from "./PostComponents/PostUser/PostUser";
import PostComments from "./PostComponents/PostComments/PostComments";
import PostReact from "./PostComponents/PostReact/PostReact";
import PostForm from "./PostComponents/PostForm/PostForm";
import PostOptionsModal from "./PostComponents/PostOptions/PostOptionsModal";
import useRedux from "../../Hooks/useRedux";
import "./Post.scss";
import { useState } from "react";
import Spinner from "../../Ui/Spinner";
import MobileComments from "../MobileComments/MobileComments";

const Post = () => {
  const { authState, postState } = useRedux();
  const { post, isLoading } = postState;

  const [isPostOptionsActive, setIsPostOptionsActive] = useState(false);
  const [isMobileCommentsActive, setIsMobileCommentsActive] = useState(false);

  const handleToggleOptionsModal = () =>
    setIsPostOptionsActive((prevState) => !prevState);

  const handleToggleMobileComments = () =>
    setIsMobileCommentsActive((prevState) => !prevState);

  return (
    <>
      {post ? (
        <article className="post">
          {isLoading && <PostLoader />}
          <PostImage
            imageUrl={post.images[0].fullImage.url}
            aspectRatio={post.images[0].fullImage.aspectRatio}
            isForModal={false}
          />
          <PostPanel>
            <PostUser
              postId={post.id}
              postOwner={post.user}
              handleToggleOptionsModal={handleToggleOptionsModal}
              isPostOwnerFollowed={post.isPostOwnerFollowed}
            />
            <PostComments postId={post.id} />
            <PostReact
              post={postState.post}
              isPostLiked={post.isLiked}
              isFeedPost={false}
              handleToggleMobileComments={handleToggleMobileComments}
              showViewAllCommentsBtn={true}
              isForModal={false}
            />
            {authState.accessToken && <PostForm postId={post.id} />}
          </PostPanel>
          {isPostOptionsActive && (
            <PostOptionsModal
              handleToggleOptionsModal={handleToggleOptionsModal}
              currentPostId={postState.post!.id}
              isPostOwnerFollowed={postState.post!.isPostOwnerFollowed}
              postOwnerId={postState.post!.user.id}
            />
          )}
          {isMobileCommentsActive && (
            <MobileComments
              postId={postState.post!.id}
              postOwner={postState.post!.user}
              postDescription={postState.post!.description}
              postedAt={postState.post!.createdAt}
              handleToggleMobileComments={handleToggleMobileComments}
            />
          )}
        </article>
      ) : (
        <>
          {!postState.errorMessage && <Spinner size="big" />}
          {postState.errorMessage && <p>{postState.errorMessage}</p>}
        </>
      )}
    </>
  );
};

export default Post;
