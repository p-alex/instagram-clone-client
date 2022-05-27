import { useEffect, useState } from "react";
import { FOLLOW_OR_UNFOLLOW_USER } from "../../GraphQL/Mutations/userMutations";
import useFetchWithRetry from "../../Hooks/useFetchWithRetry";
import useRedux from "../../Hooks/useRedux";
import "./FollowButton.scss";

interface Props {
  userId: string;
  username: string;
  isFollowed: boolean;
  handleUpdateState: () => void;
}

const FollowButton = (props: Props) => {
  const { authState } = useRedux();

  const [btnText, setBtnText] = useState(
    props.isFollowed ? "Unfollow" : "Follow"
  );

  const [followOrUnfollowUserRequest, { isLoading }] = useFetchWithRetry({
    query: FOLLOW_OR_UNFOLLOW_USER,
    variables: { userId: props.userId, type: btnText },
    accessToken: authState.accessToken,
  });

  const handleFollowOrUnfollowUser = async () => {
    if (!isLoading) {
      try {
        props.handleUpdateState();
        const response = await followOrUnfollowUserRequest();
        if (response.success) {
          setBtnText(btnText === "Follow" ? "Unfollow" : "Follow");
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  useEffect(() => {
    setBtnText(props.isFollowed ? "Unfollow" : "Follow");
  }, [props.isFollowed]);

  return (
    <button
      className={
        props.isFollowed
          ? "followButton followButton--followed"
          : "followButton"
      }
      onClick={handleFollowOrUnfollowUser}
      disabled={isLoading}
      aria-label={
        props.isFollowed
          ? `Unfollow ${props.username}`
          : `Follow ${props.username}`
      }
    >
      {props.isFollowed ? "Unfollow" : "Follow"}
    </button>
  );
};

export default FollowButton;
