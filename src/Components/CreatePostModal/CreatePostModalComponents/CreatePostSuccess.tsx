import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useContext, useEffect } from 'react';
import { CreateModalContext } from '../../../Context/CreateModalContext';

const CreatePostSuccess = () => {
  const { lastFocusableElementRef, handleFocusTrap } = useContext(CreateModalContext);
  useEffect(() => {
    const successMessage = document.querySelector(
      '.createModal__successMessage'
    ) as HTMLParagraphElement;
    successMessage.focus();
  }, []);
  return (
    <div className="createModal__success">
      <FontAwesomeIcon icon={faCheckCircle} />
      <p
        tabIndex={0}
        ref={lastFocusableElementRef}
        className="createModal__successMessage"
      >
        Your post has been shared.
      </p>
      <div tabIndex={0} onFocus={() => handleFocusTrap('bottomTrap')}></div>
    </div>
  );
};

export default CreatePostSuccess;
