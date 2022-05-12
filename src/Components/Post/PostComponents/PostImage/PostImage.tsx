import { useEffect } from "react";
import "./PostImage.scss";

interface Props {
  imageUrl: string | undefined;
  aspectRatio: number | undefined;
}

const PostImage = (props: Props) => {
  useEffect(() => {
    const image = document.querySelector(
      ".postImage__image"
    ) as HTMLImageElement;
    image.onerror = () => {
      image.style.display = "none";
    };
  }, []);
  return (
    <div className="postImage">
      <img src={props.imageUrl} alt="" className="postImage__image" />
    </div>
  );
};

export default PostImage;
