import './PostImage.scss';

const PostImage = ({ imageUrl }: { imageUrl: string | undefined }) => (
  <div className="postImage">
    <img src={imageUrl} alt="" />
  </div>
);

export default PostImage;
