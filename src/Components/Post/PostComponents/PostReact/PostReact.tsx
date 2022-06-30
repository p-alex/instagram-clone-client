import useRedux from "../../../../Hooks/useRedux";
import { dateConverter } from "../../../../Util/dateConverter";
import LikeBtn from "../../../LikeBtn/LikeBtn";
import "./PostReact.scss";
import { IPost } from "../../../../interfaces";
import PostDescription from "../PostDescription/PostDescription";
import { useContext, useEffect, useState } from "react";
import { FeedContext } from "../../../../Context/FeedContext";
import { checkIsMobileWindowSize } from "../../../../Util/checkWindowSize";

interface Props {
  post: IPost | null;
  postIndex?: number;
  isPostLiked: boolean | undefined;
  isFeedPost: boolean;
  isForModal: boolean;
  showViewAllCommentsBtn: boolean;
  handleToggleMobileComments: () => void;
}

const PostReact = (props: Props) => {
  const { handleSelectPost } = useContext(FeedContext);
  const { authState, postState } = useRedux();

  const [isMobileWindowSize, setIsMobileWindowSize] = useState(false);

  const handleRedirectFocusToInput = () => {
    const formInput = document.querySelector(
      ".postForm__input"
    ) as HTMLInputElement;
    formInput.focus();
  };

  const handleViewComments = () => {
    const isMobileWindowSize = checkIsMobileWindowSize();
    if (isMobileWindowSize) {
      props.handleToggleMobileComments();
      return;
    }
    if (props.isFeedPost) return handleSelectPost(props.post!.id);
    handleRedirectFocusToInput();
  };

  const checkWindowSize = () => {
    if (window.innerWidth > 980) {
      setIsMobileWindowSize(false);
    } else {
      setIsMobileWindowSize(true);
    }
  };

  useEffect(() => {
    checkWindowSize();
    window.addEventListener("resize", checkWindowSize);
    return () => window.removeEventListener("resize", checkWindowSize);
  }, []);

  return (
    <div className="postReact">
      {authState.accessToken && (
        <div className="postReact__likeAndComment">
          <LikeBtn
            isPostLiked={
              props.isFeedPost ? props?.isPostLiked : postState.post?.isLiked
            }
            postId={props.post?.id}
            postIndex={props?.postIndex}
            isFeedPost={props?.isFeedPost}
          />
          <button
            title="write a comment"
            disabled={!authState.accessToken}
            onClick={handleViewComments}
            className="postReact__commentBtn"
          >
            <i className="fa-regular fa-comment"></i>
          </button>
        </div>
      )}

      <div className="postReact__details">
        <p className="postReact__likeCount">{`${props.post?.likes.count} ${
          props.post?.likes.count === 1 ? "like" : "likes"
        }`}</p>

        {props.post?.description && props.isFeedPost && (
          <PostDescription
            description={props.post.description}
            postedAt={props.post.createdAt}
            profilePicture={props.post.user.profilePicture.smallPicture}
            username={props.post.user.username}
            showProfilePicture={true}
            noPadding={true}
          />
        )}

        {props.post?.comments.count !== 0 &&
          props.showViewAllCommentsBtn &&
          authState.accessToken && (
            <div className="postReact__viewCommentsBtnContainer">
              <button
                className="postReact__viewCommentsButton"
                onClick={handleViewComments}
              >
                {props.post?.comments.count === 1
                  ? `View ${props.post?.comments.count} comment`
                  : `View all ${props.post?.comments.count} comments`}
              </button>
            </div>
          )}

        <small className="postReact__date">
          {dateConverter(parseInt(props.post?.createdAt!))}
        </small>
      </div>
    </div>
  );
};

export default PostReact;
