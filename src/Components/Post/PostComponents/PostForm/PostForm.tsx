import './PostForm.scss';

const PostForm = () => (
  <form className="postForm">
    <input type="text" placeholder="Add a comment..."></input>
    <button type="submit">Post</button>
  </form>
);

export default PostForm;
