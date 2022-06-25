import { Link } from "react-router-dom";
import "./UsernameAndName.scss";

interface Props {
  username: string;
  fullname: string;
  profilePicture: string;
}

const UsernameAndName = (props: Props) => {
  return (
    <div className="usernameAndName">
      <Link
        to={`/users/${props.username}`}
        className="usernameAndName__profileImageLink"
      >
        <img
          src={props.profilePicture}
          width="60"
          height="60"
          alt=""
          className="usernameAndName__profileImage"
        />
      </Link>
      <div className="usernameAndName__container">
        <Link
          to={`/users/${props.username}`}
          className="usernameAndName__usernameLink"
        >
          {props.username}
        </Link>
        <p className="usernameAndName__name">{props.fullname}</p>
      </div>
    </div>
  );
};

export default UsernameAndName;
