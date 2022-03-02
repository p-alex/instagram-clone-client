import { useEffect, useContext } from 'react';
import { CreateModalContext } from '../../../Context/CreateModalContext';
import Spinner from '../../../Ui/Spinner';

const CreatePostLoading = () => {
  const { lastFocusableElementRef, handleFocusTrap } = useContext(CreateModalContext);
  useEffect(() => {
    const statusMessage = document.querySelector(
      '.createModal__loadingMessage'
    ) as HTMLParagraphElement;
    statusMessage.focus();
  }, []);
  return (
    <div className="createModal__loading">
      <Spinner />
      <p
        tabIndex={0}
        ref={lastFocusableElementRef}
        className="createModal__loadingMessage"
      >
        Loading
      </p>
      <div
        id="bottomFocusTrap"
        tabIndex={0}
        onFocus={() => handleFocusTrap('bottomTrap')}
      ></div>
    </div>
  );
};

export default CreatePostLoading;
