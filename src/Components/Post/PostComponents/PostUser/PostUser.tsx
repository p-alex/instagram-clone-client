import { Link } from "react-router-dom";
import FollowButton from "../../../FollowButton/FollowButton";
import "./PostUser.scss";

interface Props {
  postIndex?: number;
  postId: string;
  userId: string;
  username: string;
  profilePicture: string;
  handleToggleOptionsModal: () => void;
  isPostOwnerFollowed: boolean;
}

const PostUser = (props: Props) => {
  return (
    <div className="postUser">
      <div className="postUser__container">
        <img src={props.profilePicture} alt="" width="35" height="35" />
        <Link to={`/users/${props.username}`}>{props.username}</Link>
        <FollowButton
          isFollowed={props.isPostOwnerFollowed}
          username={props.username}
          userId={props.userId}
        />
      </div>
      <button
        className="postUser__moreOptionsBtn"
        onClick={props.handleToggleOptionsModal}
        aria-label="Open post options modal"
        id={
          typeof props.postIndex === "number"
            ? `moreOptionsBtn${props.postIndex}`
            : "moreOptionsBtn"
        }
      >
        <i className="fa-solid fa-ellipsis"></i>
      </button>
    </div>
  );
};

export default PostUser;
