import useRedux from "../../../Hooks/useRedux";
import { resetPostState } from "../../../Redux/Post";

const PostModalCtrl = ({
  direction,
  handleNavigatePosts,
  lastFocusableElementRef,
}: {
  direction: "prev" | "next";
  handleNavigatePosts: (direction: "prev" | "next") => void;
  lastFocusableElementRef?: any;
}) => {
  const { dispatch } = useRedux();
  return (
    <button
      className={`postModal__ctrl ctrl--${direction}`}
      id={`postModal-${direction}Btn`}
      onClick={() => {
        dispatch(resetPostState());
        handleNavigatePosts(direction);
      }}
      ref={lastFocusableElementRef}
      aria-label={direction === "prev" ? "Previous post" : "Next post"}
    >
      <i
        className={`fa-solid fa-chevron-${
          direction === "prev" ? "left" : "right"
        }`}
      ></i>
    </button>
  );
};

export default PostModalCtrl;
