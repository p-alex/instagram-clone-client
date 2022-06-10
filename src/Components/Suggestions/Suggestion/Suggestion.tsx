import { Link } from "react-router-dom";
import { ISuggestion } from "../../../interfaces";
import FollowButton from "../../FollowButton/FollowButton";
import "./Suggestion.scss";

interface Props {
  suggestion: ISuggestion;
  suggestionIndex: number;
  isFollowed: boolean;
}

const Suggestion = (props: Props) => {
  return (
    <div className="suggestion">
      <div className="suggestion__user">
        <img
          src={props.suggestion.profilePicture.smallPicture}
          width="35"
          height="35"
          alt=""
          className="suggestion__profileImage"
        />
        <Link
          to={`users/${props.suggestion.username}`}
          className="suggestion__username"
        >
          {props.suggestion.username}
        </Link>
      </div>
      <FollowButton
        userId={props.suggestion.id}
        username={props.suggestion.username}
        isFollowed={props.isFollowed}
      />
    </div>
  );
};

export default Suggestion;
