import { dateConverter } from '../../../../Util/dateConverter';
import LikeBtn from '../../../LikeBtn/LikeBtn';
import './PostReact.scss';

const PostReact = ({
  likesCount,
  postedAt,
  postId,
}: {
  likesCount: number | undefined;
  postedAt: string | undefined;
  postId: string | undefined;
}) => {
  return (
    <div className="postReact">
      <LikeBtn postId={postId ? postId : ''} />
      <button aria-label="add a comment">
        <i className="fa-regular fa-comment"></i>
      </button>
      {typeof likesCount === 'number' && (
        <p>{`${likesCount} ${likesCount === 1 ? 'like' : 'likes'}`}</p>
      )}
      {postedAt && <small>{dateConverter(parseInt(postedAt))}</small>}
    </div>
  );
};

export default PostReact;
