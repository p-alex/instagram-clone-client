import Spinner from "../../../../Ui/Spinner";
import "./PostLoader.scss";

const PostLoader = () => {
  return (
    <div className="postLoader">
      <div className="postLoader__spinner">
        <Spinner size="big" />
      </div>
    </div>
  );
};

export default PostLoader;
