import { useState } from 'react';
import { FOLLOW_OR_UNFOLLOW_USER } from '../../GraphQL/Mutations/userMutations';
import useFetchWithRetry from '../../Hooks/useFetchWithRetry';
import useRedux from '../../Hooks/useRedux';
import './FollowButton.scss';

const FollowButton = ({
  userId,
  isFollowed,
}: {
  userId: string;
  isFollowed: boolean;
}) => {
  const { authState } = useRedux();

  const [btnText, setBtnText] = useState(isFollowed ? 'Unfollow' : 'Follow');

  const [followOrUnfollowUserRequest, { isLoading }] = useFetchWithRetry({
    query: FOLLOW_OR_UNFOLLOW_USER,
    variables: { userId, type: btnText },
    accessToken: authState.accessToken,
  });

  const handleFollowOrUnfollowUser = async () => {
    if (!isLoading) {
      try {
        const response = await followOrUnfollowUserRequest();
        if (response.success) {
          setBtnText(btnText === 'Follow' ? 'Unfollow' : 'Follow');
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <button
      className={
        btnText === 'Unfollow' ? 'followButton followButton--followed' : 'followButton'
      }
      onClick={handleFollowOrUnfollowUser}
      disabled={isLoading}
    >
      {btnText}
    </button>
  );
};

export default FollowButton;
