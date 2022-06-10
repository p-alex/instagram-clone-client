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

const Post = () => {
  const { authState, postState } = useRedux();
  const { post, isLoading } = postState;

  const [isPostOptionsActive, setIsPostOptionsActive] = useState(false);

  const handleToggleOptionsModal = () =>
    setIsPostOptionsActive((prevState) => !prevState);

  return (
    <>
      {post ? (
        <article className="post">
          {isLoading && <PostLoader />}
          <PostImage
            imageUrl={post.images[0].fullImage.url}
            aspectRatio={post.images[0].fullImage.aspectRatio}
            isFeedPost={true}
          />
          <PostPanel>
            <PostUser
              postId={post.id}
              userId={post.user.id}
              username={post.user.username}
              profilePicture={post.user.profilePicture.smallPicture}
              handleToggleOptionsModal={handleToggleOptionsModal}
              isPostOwnerFollowed={post.isPostOwnerFollowed}
            />
            <PostComments />
            <PostReact
              post={postState.post}
              isPostLiked={post.isLiked}
              isFeedPost={false}
            />
            {authState.accessToken && <PostForm />}
          </PostPanel>
          {isPostOptionsActive && (
            <PostOptionsModal
              handleToggleOptionsModal={handleToggleOptionsModal}
              currentPostId={postState.post!.id}
              isPostOwnerFollowed={postState.post!.isPostOwnerFollowed}
              postOwnerId={postState.post!.user.id}
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
