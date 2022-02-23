import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const CreatePostSuccess = ({
  handleDiscard,
  handleToggleCreatePostModal,
}: {
  handleDiscard: () => void;
  handleToggleCreatePostModal: () => void;
}) => {
  return (
    <div className="createModal__success">
      <FontAwesomeIcon icon={faCheckCircle} />
      <p>Your post has been shared.</p>
    </div>
  );
};

export default CreatePostSuccess;
