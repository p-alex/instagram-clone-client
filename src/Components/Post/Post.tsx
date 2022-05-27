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

const Post = () => {
  const { authState, postState } = useRedux();
  const { post, isLoading } = postState;

  const [isPostOptionsActive, setIsPostOptionsActive] = useState(false);

  const handleToggleOptionsModal = () =>
    setIsPostOptionsActive((prevState) => !prevState);

  return (
    <article className="post">
      {isLoading && <PostLoader />}
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
      {isPostOptionsActive && (
        <PostOptionsModal
          handleToggleOptionsModal={handleToggleOptionsModal}
          currentPostId={postState.post!.id}
        />
      )}
    </article>
  );
};

export default Post;
