import { Link } from "react-router-dom";
import { ISuggestion } from "../../../../interfaces";
import FollowButton from "../../../FollowButton/FollowButton";

const Suggestion = ({ suggestion }: { suggestion: ISuggestion }) => {
  return (
    <div className="suggestionsBig__suggestion">
      <div className="suggestionsBig__user">
        <img
          src={suggestion.profilePicture}
          width="35"
          height="35"
          alt=""
          className="suggestionsBig__profileImage"
        />
        <Link
          to={`users/${suggestion.username}`}
          className="suggestionsBig__username"
        >
          {suggestion.username}
        </Link>
      </div>
      <FollowButton userId={suggestion.id} isFollowed={false} />
    </div>
  );
};

export default Suggestion;
