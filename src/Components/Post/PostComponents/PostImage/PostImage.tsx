import { useEffect } from "react";
import "./PostImage.scss";

interface Props {
  imageUrl: string | undefined;
  aspectRatio: number | undefined;
  isFeedPost?: boolean;
}

const PostImage = (props: Props) => {
  function resizeEvent() {
    const imageContainer = document.querySelector(
      ".postImage"
    ) as HTMLDivElement;

    if (window.innerWidth < 980) {
      imageContainer.removeAttribute("style");
      return;
    }

    const windowHeightPercentage = 94 / 100;

    if (!props.isFeedPost) {
      if (props.aspectRatio === 4 / 5) {
        const maxHeight = window.innerHeight * windowHeightPercentage;
        const maxWidth = maxHeight * props.aspectRatio;
        imageContainer.style.cssText = `max-width: ${maxWidth}px; min-width: ${300}px; min-height: ${
          300 * props.aspectRatio
        }px; max-height: ${maxHeight}px; aspect-ratio: ${
          props.aspectRatio
        }; flex-basis: ${maxWidth}px`;
      } else {
        const maxHeight = window.innerHeight * windowHeightPercentage;
        const maxWidth = maxHeight;
        imageContainer.style.cssText = `max-width: ${maxWidth}px; min-width: ${300}px; max-height: ${maxHeight}px; min-height: ${
          300 * props.aspectRatio!
        }px; aspect-ratio: 1 / 1; flex-basis: ${maxWidth}px`;
      }
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
      <img
        src={props.imageUrl}
        alt=""
        className="postImage__image"
        style={{ width: "100%", aspectRatio: `${props.aspectRatio}` }}
      />
    </div>
  );
};

export default PostImage;
