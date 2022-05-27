import { Link } from "react-router-dom";
import "./PostUser.scss";

const PostUser = ({
  username,
  profilePicture,
  handleToggleOptionsModal,
}: {
  username: string | undefined;
  profilePicture: string | undefined;
  handleToggleOptionsModal: () => void;
}) => {
  return (
    <div className="postUser">
      <div className="postUser__container">
        <img src={profilePicture} alt="" width="35" height="35" />
        <Link to={`/users/${username}`}>{username}</Link>
      </div>
      <button
        className="postUser__moreOptionsBtn"
        onClick={handleToggleOptionsModal}
        aria-label="Open post options modal"
      >
        <i className="fa-solid fa-ellipsis"></i>
      </button>
    </div>
  );
};

export default PostUser;
