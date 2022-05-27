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
      <img src={props.profilePicture} width="60" height="60" alt="" />
      <div className="usernameAndName__container">
        <Link to={`/users/${props.username}`}>{props.username}</Link>
        <p>{props.fullname}</p>
      </div>
    </div>
  );
};

export default UsernameAndName;
