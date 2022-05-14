import { useEffect } from "react";
import "./PostImage.scss";

interface Props {
  imageUrl: string | undefined;
  aspectRatio: number | undefined;
}

const PostImage = (props: Props) => {
  function resizeEvent() {
    const imageContainer = document.querySelector(
      ".postImage"
    ) as HTMLDivElement;

    const windowHeightPercentage = 94 / 100;

    if (window.innerWidth < 980) {
      imageContainer.removeAttribute("style");
      return;
    }

    if (props.aspectRatio === 4 / 5) {
      const maxHeight = window.innerHeight * windowHeightPercentage;
      const maxWidth = maxHeight * props.aspectRatio;
      imageContainer.style.cssText = `max-width: ${maxWidth}px; max-height: ${maxHeight}px; aspect-ratio: ${props.aspectRatio}`;
    } else {
      const maxHeight = window.innerHeight * windowHeightPercentage;
      const maxWidth = maxHeight;
      imageContainer.style.cssText = `max-width: ${maxWidth}px; max-height: ${maxHeight}px; aspect-ratio: 1 / 1`;
    }
  }

  useEffect(() => {
    resizeEvent();
    window.addEventListener("resize", resizeEvent);
    return () => {
      window.removeEventListener("resize", resizeEvent);
    };
  }, []);

  return (
    <div className="postImage">
      <img src={props.imageUrl} alt="" className="postImage__image" />
    </div>
  );
};

export default PostImage;
