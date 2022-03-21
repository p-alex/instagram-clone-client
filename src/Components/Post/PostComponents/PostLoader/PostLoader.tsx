import Spinner from '../../../../Ui/Spinner';
import './PostLoader.scss';

const PostLoader = () => {
  return (
    <div className="postLoader">
      <div className="postLoader__spinner">
        <Spinner />
      </div>
    </div>
  );
};

export default PostLoader;
