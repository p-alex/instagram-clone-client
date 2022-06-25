import { Link } from "react-router-dom";
import { ILiteUser } from "../../../../interfaces";
import FollowButton from "../../../FollowButton/FollowButton";
import "./PostUser.scss";

interface Props {
  postIndex?: number;
  postId: string;
  postOwner: ILiteUser;
  handleToggleOptionsModal: () => void;
  isPostOwnerFollowed: boolean;
}

const PostUser = (props: Props) => {
  return (
    <div className="postUser">
      <div className="postUser__container">
        <Link
          to={`/users/${props.postOwner.username}`}
          className="postUser__profileImageLink"
        >
          <img
            src={props.postOwner.profilePicture.smallPicture}
            alt=""
            width="35"
            height="35"
          />
        </Link>
        <Link
          to={`/users/${props.postOwner.username}`}
          className="postUser__usernameLink"
        >
          {props.postOwner.username}
        </Link>
        <FollowButton
          isFollowed={props.isPostOwnerFollowed}
          username={props.postOwner.username}
          userId={props.postOwner.id}
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
