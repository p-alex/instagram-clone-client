import { useEffect, useContext } from 'react';
import { CreateModalContext } from '../../../Context/CreateModalContext';
import Spinner from '../../../Ui/Spinner';
import FocusTrapRedirectFocus from '../../FocusTrap';

const CreatePostLoading = () => {
  const { lastFocusableElementRef } = useContext(CreateModalContext);
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
      <FocusTrapRedirectFocus element={lastFocusableElementRef} />
    </div>
  );
};

export default CreatePostLoading;
