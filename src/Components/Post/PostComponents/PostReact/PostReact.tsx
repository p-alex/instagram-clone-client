import useRedux from '../../../../Hooks/useRedux';
import { changePostFormToNewComment } from '../../../../Redux/Post';
import { dateConverter } from '../../../../Util/dateConverter';
import LikeBtn from '../../../LikeBtn/LikeBtn';
import './PostReact.scss';

const PostReact = () => {
  const { authState, postState, dispatch } = useRedux();
  const count = postState.post?.likes.count;
  const createdAt = postState.post?.createdAt;
  const postId = postState.post?.id;
  return (
    <div className="postReact">
      <LikeBtn postId={postId ? postId : ''} />
      <button
        title="write a comment"
        disabled={!authState.accessToken}
        onClick={() => {
          const formInput = document.querySelector(
            '.postForm__input'
          ) as HTMLInputElement;
          dispatch(changePostFormToNewComment());
          formInput.focus();
        }}
      >
        <i className="fa-regular fa-comment"></i>
      </button>
      <p>{`${count} ${count === 1 ? 'like' : 'likes'}`}</p>
      <small>{dateConverter(parseInt(createdAt!))}</small>
    </div>
  );
};

export default PostReact;
