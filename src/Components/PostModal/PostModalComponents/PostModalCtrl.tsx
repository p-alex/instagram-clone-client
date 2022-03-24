import useRedux from '../../../Hooks/useRedux';
import { resetPostState } from '../../../Redux/Post';

const PostModalCtrl = ({
  direction,
  handleNavigatePosts,
}: {
  direction: 'prev' | 'next';
  handleNavigatePosts: (direction: 'prev' | 'next') => void;
}) => {
  const { dispatch } = useRedux();
  return (
    <button
      className={`postModal__ctrl ctrl--${direction}`}
      onClick={() => {
        dispatch(resetPostState());
        handleNavigatePosts(direction);
      }}
    >
      <i className={`fa-solid fa-chevron-${direction === 'prev' ? 'left' : 'right'}`}></i>
    </button>
  );
};

export default PostModalCtrl;
