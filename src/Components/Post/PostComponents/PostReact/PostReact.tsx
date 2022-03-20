import { dateConverter } from '../../../../Util/dateConverter';
import './PostReact.scss';

const PostReact = ({
  likesCount,
  postedAt,
}: {
  likesCount: number | undefined;
  postedAt: string | undefined;
}) => {
  return (
    <div className="postReact">
      <button aria-label="like post">
        <i className="fa-regular fa-heart"></i>
      </button>
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
