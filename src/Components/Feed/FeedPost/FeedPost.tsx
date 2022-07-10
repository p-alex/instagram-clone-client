import { useState } from "react";
import { IPost } from "../../../interfaces";
import MobileComments from "../../MobileComments/MobileComments";
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

  const [isMobileCommentsActive, setIsMobileCommentsActive] = useState(false);

  const handleToggleOptionsModal = () =>
    setIsPostOptionActive((prevState) => !prevState);

  const handleToggleMobileComments = () =>
    setIsMobileCommentsActive((prevState) => !prevState);

  return (
    <article className="feedPost" role="presentation">
      <PostUser
        postId={props.post.id}
        postOwner={props.post.user}
        handleToggleOptionsModal={handleToggleOptionsModal}
        isPostOwnerFollowed={props.post.isPostOwnerFollowed}
        postIndex={props.postIndex}
      />
      <PostImage
        imageUrl={props.post.images[0].fullImage.url}
        aspectRatio={props.post.images[0].fullImage.aspectRatio}
        isForModal={false}
      />
      <PostReact
        post={props.post}
        postIndex={props.postIndex}
        isPostLiked={props.post.isLiked}
        isForModal={false}
        isFeedPost={true}
        showViewAllCommentsBtn={true}
        handleToggleMobileComments={handleToggleMobileComments}
      />
      {isPostOptionsActive && (
        <PostOptionsModal
          handleToggleOptionsModal={handleToggleOptionsModal}
          currentPostId={props.post.id}
          isPostOwnerFollowed={props.post.isPostOwnerFollowed}
          postOwnerId={props.post.user.id}
          postIndex={props.postIndex}
        />
      )}
      {isMobileCommentsActive && (
        <MobileComments
          postId={props.post.id}
          postOwner={props.post.user}
          postDescription={props.post.description}
          postedAt={props.post.createdAt}
          handleToggleMobileComments={handleToggleMobileComments}
        />
      )}
    </article>
  );
};

export default FeedPost;
