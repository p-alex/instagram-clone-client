import { faCheckCircle, faExclamationCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useContext, useEffect } from 'react';
import { CreateModalContext } from '../../../Context/CreateModalContext';

const CreatePostResult = ({ error }: { error: string }) => {
  const { lastFocusableElementRef, handleFocusTrap } = useContext(CreateModalContext);
  useEffect(() => {
    const resultMessage = document.querySelector(
      '.createModal__resultMessage'
    ) as HTMLParagraphElement;
    resultMessage.focus();
  }, []);
  return (
    <div className="createModal__result">
      {!error ? (
        <FontAwesomeIcon icon={faCheckCircle} />
      ) : (
        <FontAwesomeIcon icon={faExclamationCircle} style={{ color: 'red' }} />
      )}
      <p
        tabIndex={0}
        ref={lastFocusableElementRef}
        className="createModal__resultMessage"
      >
        {!error ? 'Your post has been shared.' : error}
      </p>
      <div tabIndex={0} onFocus={() => handleFocusTrap('bottomTrap')}></div>
    </div>
  );
};

export default CreatePostResult;
