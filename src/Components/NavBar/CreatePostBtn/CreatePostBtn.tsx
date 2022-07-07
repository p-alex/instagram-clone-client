import { useContext } from "react";
import "./CreatePostBtn.scss";
import { NavBarContext } from "../../../Context/NavBarContext";

const CreatePostBtn = () => {
  const { handleToggleCreatePostModal } = useContext(NavBarContext);
  return (
    <button
      className="navBar__btn"
      onClick={handleToggleCreatePostModal}
      aria-label="Create new post"
      id="create-post-toggle-modal-btn"
    >
      <i className="fa-solid fa-plus"></i>
    </button>
  );
};

export default CreatePostBtn;
