import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { useContext } from 'react';
import './CreatePostBtn.scss';
import { NavBarContext } from '../../../Context/NavBarContext';

const CreatePostBtn = () => {
  const { handleToggleCreatePostModal } = useContext(NavBarContext);
  return (
    <button className="navBarCreatePostBtn" onClick={handleToggleCreatePostModal}>
      <FontAwesomeIcon icon={faPlus} />
    </button>
  );
};

export default CreatePostBtn;
