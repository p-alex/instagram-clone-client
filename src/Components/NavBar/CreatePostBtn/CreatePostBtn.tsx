import { useContext } from 'react';
import './CreatePostBtn.scss';
import { NavBarContext } from '../../../Context/NavBarContext';

const CreatePostBtn = () => {
  const { handleToggleCreatePostModal } = useContext(NavBarContext);
  return (
    <button className="navBarCreatePostBtn" onClick={handleToggleCreatePostModal}>
      <i className="fa-solid fa-plus"></i>
    </button>
  );
};

export default CreatePostBtn;
