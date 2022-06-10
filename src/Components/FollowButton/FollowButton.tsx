import { useEffect, useState } from "react";
import { FOLLOW_OR_UNFOLLOW_USER_MUTATION } from "../../GraphQL/Mutations/userMutations";
import useFetchWithRetry from "../../Hooks/useFetchWithRetry";
import useRedux from "../../Hooks/useRedux";
import { followFeedPostOwner, unfollowFeedPostOwner } from "../../Redux/Feed";
import { followPostOwner, unfollowPostOwner } from "../../Redux/Post";
import { followProfile, unfollowProfile } from "../../Redux/Profile";
import { followSuggestion, unfollowSuggestion } from "../../Redux/Suggestions";
import "./FollowButton.scss";

interface Props {
  postId?: string;
  userId: string;
  username: string;
  isFollowed: boolean;
}

const FollowButton = (props: Props) => {
  const {
    authState,
    suggestionsState,
    profileState,
    feedState,
    postState,
    dispatch,
  } = useRedux();

  const [btnText, setBtnText] = useState(
    props.isFollowed ? "Unfollow" : "Follow"
  );

  const [followOrUnfollowUserRequest, { isLoading }] = useFetchWithRetry({
    query: FOLLOW_OR_UNFOLLOW_USER_MUTATION,
    variables: { userId: props.userId, type: btnText },
    accessToken: authState.accessToken,
  });

  const handleStateChange = () => {
    const feedStateUser = feedState.posts.find(
      (post) => post.user.id === props.userId
    );

    if (profileState.user) {
      if (profileState.isFollowed) {
        dispatch(unfollowProfile());
      } else {
        dispatch(followProfile());
      }
    }

    if (postState.post) {
      if (postState.post.isPostOwnerFollowed === true) {
        dispatch(unfollowPostOwner());
      } else {
        dispatch(followPostOwner());
      }
    }

    if (suggestionsState.suggestions) {
      let isSuggestionFollowed = () => {
        const suggestion =
          suggestionsState.suggestions &&
          suggestionsState.suggestions.find(
            (suggestion) => suggestion.id === props.userId
          );
        return suggestion?.isFollowed;
      };
      if (isSuggestionFollowed()) {
        dispatch(unfollowSuggestion({ suggestionId: props.userId }));
      } else {
        dispatch(followSuggestion({ suggestionId: props.userId }));
      }
    }

    if (feedStateUser?.id) {
      if (feedStateUser.isPostOwnerFollowed === true) {
        dispatch(unfollowFeedPostOwner({ userId: props.userId }));
      } else {
        dispatch(followFeedPostOwner({ userId: props.userId }));
      }
    }
  };

  const handleFollowOrUnfollowUser = async () => {
    if (!isLoading) {
      try {
        handleStateChange();
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
    <>
      {authState.accessToken && authState.user?.id !== props.userId && (
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
          {btnText}
        </button>
      )}
    </>
  );
};

export default FollowButton;
