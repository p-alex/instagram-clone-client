import useRedux from '../../../../Hooks/useRedux';
import { dateConverter } from '../../../../Util/dateConverter';
import LikeBtn from '../../../LikeBtn/LikeBtn';
import './PostReact.scss';

const PostReact = () => {
  const { postState } = useRedux();
  const count = postState.post?.likes.count;
  const postedAt = postState.post?.postedAt;
  const postId = postState.post?.id;
  return (
    <div className="postReact">
      <LikeBtn postId={postId ? postId : ''} />
      <button aria-label="add a comment">
        <i className="fa-regular fa-comment"></i>
      </button>
      <p>{`${count} ${count === 1 ? 'like' : 'likes'}`}</p>
      {postedAt && <small>{dateConverter(parseInt(postedAt))}</small>}
    </div>
  );
};

export default PostReact;
