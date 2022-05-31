import { useState } from "react";
import { IPost } from "../../../interfaces";
import PostImage from "../../Post/PostComponents/PostImage/PostImage";
import PostOptionsModal from "../../Post/PostComponents/PostOptions/PostOptionsModal";
import PostReact from "../../Post/PostComponents/PostReact/PostReact";
import PostUser from "../../Post/PostComponents/PostUser/PostUser";
import "./FeedPost.scss";

interface Props {
  post: IPost;
  postIndex: number;
}

const FeedPost = (props: Props) => {
  const [isPostOptionsActive, setIsPostOptionActive] = useState(false);

  const handleToggleOptionsModal = () =>
    setIsPostOptionActive((prevState) => !prevState);

  return (
    <article className="feedPost">
      <PostUser
        postId={props.post.id}
        userId={props.post.user.id}
        username={props.post.user.username}
        profilePicture={props.post.user.profilePicture}
        handleToggleOptionsModal={handleToggleOptionsModal}
        isPostOwnerFollowed={props.post.isPostOwnerFollowed}
      />
      <PostImage
        imageUrl={props.post.images[0].fullImage.url}
        aspectRatio={props.post.images[0].fullImage.aspectRatio}
        isFeedPost={true}
      />
      <PostReact
        post={props.post}
        postIndex={props.postIndex}
        isPostLiked={props.post.isLiked}
        isFeedPost={true}
      />
      {isPostOptionsActive && (
        <PostOptionsModal
          handleToggleOptionsModal={handleToggleOptionsModal}
          currentPostId={props.post.id}
          isPostOwnerFollowed={props.post.isPostOwnerFollowed}
          postOwnerId={props.post.user.id}
        />
      )}
    </article>
  );
};

export default FeedPost;
