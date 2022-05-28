import useRedux from "../../../../Hooks/useRedux";
import { dateConverter } from "../../../../Util/dateConverter";
import LikeBtn from "../../../LikeBtn/LikeBtn";
import { Link, useNavigate } from "react-router-dom";
import "./PostReact.scss";
import { IPost } from "../../../../interfaces";

interface Props {
  post: IPost | null;
  postIndex?: number;
  isPostLiked: boolean | undefined;
  isFeedPost: boolean;
}

const PostReact = (props: Props) => {
  const navigate = useNavigate();
  const { authState, postState } = useRedux();

  const handleRedirectFocusToInput = () => {
    const formInput = document.querySelector(
      ".postForm__input"
    ) as HTMLInputElement;
    formInput.focus();
  };

  const handleCommentButton = () => {
    if (props.isFeedPost) {
      navigate(`/posts/${props.post?.id}`);
    } else {
      handleRedirectFocusToInput();
    }
  };

  return (
    <div className="postReact">
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
          onClick={handleCommentButton}
          className="postReact__commentBtn"
        >
          <i className="fa-regular fa-comment"></i>
        </button>
      </div>
      <div className="postReact__details">
        <p className="postReact__likeCount">{`${props.post?.likes.count} ${
          props.post?.likes.count === 1 ? "like" : "likes"
        }`}</p>

        {props.post?.description && props.isFeedPost && (
          <p className="postReact__description">
            <Link to={`/users/${props.post?.user.username}`}>
              {props.post?.user.username}
            </Link>
            {` `}
            {props.post?.description}
          </p>
        )}

        {props.isFeedPost &&
        props.post?.comments.count &&
        props.post?.comments.count > 0 ? (
          <Link
            to={`posts/${props.post.id}`}
            className="postReact__viewCommentsLink"
          >
            {props.post?.comments.count === 1
              ? `View ${props.post?.comments.count} comment`
              : `View all ${props.post?.comments.count} comments`}
          </Link>
        ) : null}

        <small className="postReact__date">
          {dateConverter(parseInt(props.post?.createdAt!))}
        </small>
      </div>
    </div>
  );
};

export default PostReact;
