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
      className="suggetionBox"
      style={{ minWidth: `${100 / props.boxesPerSlide}%` }}
    >
      <div className="suggestionBox__image">
        <img
          src={props.profilePicture.smallPicture}
          alt=""
          width={50}
          height={50}
        />
      </div>
      <p>{props.username}</p>
      <FollowButton
        userId={props.id}
        username={props.username}
        isFollowed={props.isFollowed}
      />
    </div>
  );
}

export default SuggestionBox;
