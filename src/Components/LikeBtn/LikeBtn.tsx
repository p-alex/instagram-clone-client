import { LIKE_POST_MUTATION } from '../../GraphQL/Mutations/postMutations';
import useFetchWithRetry from '../../Hooks/useFetchWithRetry';
import useRedux from '../../Hooks/useRedux';
import './LikeBtn.scss';

const LikeBtn = ({ postId }: { postId: string }) => {
  const { authState } = useRedux();
  const [likePostRequest, { isLoading, error }] = useFetchWithRetry({
    query: LIKE_POST_MUTATION,
    variables: { uid: authState.user?.id, postId },
    accessToken: authState.accessToken,
  });
  return (
    <button aria-label="like post" className="likeBtn">
      <i className="fa-regular fa-heart"></i>
    </button>
  );
};

export default LikeBtn;
