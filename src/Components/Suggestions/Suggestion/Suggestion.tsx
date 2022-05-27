import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { ISuggestion } from "../../../interfaces";
import { followProfile, unfollowProfile } from "../../../Redux/Profile";
import { RootState } from "../../../Redux/Store";
import {
  followSuggestion,
  unfollowSuggestion,
} from "../../../Redux/Suggestions";
import FollowButton from "../../FollowButton/FollowButton";
import "./Suggestion.scss";

interface Props {
  suggestion: ISuggestion;
  suggestionIndex: number;
  isFollowed: boolean;
}

const Suggestion = (props: Props) => {
  const profileState = useSelector((state: RootState) => state.profile);
  const dispatch = useDispatch();

  const handleFollowOrUnfollowSuggestion = () => {
    const doesUserExistInProfileState =
      profileState.user?.userId === props.suggestion.id;
    if (props.isFollowed) {
      dispatch(unfollowSuggestion({ suggestionId: props.suggestion.id }));
      if (doesUserExistInProfileState) {
        dispatch(unfollowProfile());
      }
    } else {
      dispatch(followSuggestion({ suggestionId: props.suggestion.id }));
      if (doesUserExistInProfileState) {
        dispatch(followProfile());
      }
    }
  };

  return (
    <div className="suggestion">
      <div className="suggestion__user">
        <img
          src={props.suggestion.profilePicture}
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
        handleUpdateState={handleFollowOrUnfollowSuggestion}
      />
    </div>
  );
};

export default Suggestion;
