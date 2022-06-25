import { Link } from "react-router-dom";
import FollowButton from "../../FollowButton/FollowButton";
import "./SuggestionBox.scss";

interface Props {
  id: string;
  username: string;
  profilePicture: {
    smallPicture: string;
  };
  isFollowed: boolean;
  boxesPerSlide: number;
}

function SuggestionBox(props: Props) {
  return (
    <div
      className="suggestionBox"
      style={{ minWidth: `${100 / props.boxesPerSlide}%` }}
    >
      <div className="suggestionBox__image">
        <Link to={`/users/${props.username}`}>
          <img
            src={props.profilePicture.smallPicture}
            alt=""
            width={60}
            height={60}
          />
        </Link>
      </div>
      <Link to={`/users/${props.username}`}>{props.username}</Link>
      <FollowButton
        userId={props.id}
        username={props.username}
        isFollowed={props.isFollowed}
      />
    </div>
  );
}

export default SuggestionBox;
