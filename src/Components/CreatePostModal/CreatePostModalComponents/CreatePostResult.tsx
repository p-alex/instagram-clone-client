import { useContext, useEffect } from 'react';
import { CreateModalContext } from '../../../Context/CreateModalContext';
import FocusTrapRedirectFocus from '../../FocusTrap';

const CreatePostResult = ({ error }: { error: string }) => {
  const { lastFocusableElementRef, firstFocusableElementRef } =
    useContext(CreateModalContext);
  useEffect(() => {
    const resultMessage = document.querySelector(
      '.createModal__resultMessage'
    ) as HTMLParagraphElement;
    resultMessage.focus();
  }, []);
  return (
    <div className="createModal__result">
      {!error ? (
        <i className="fa-solid fa-circle-check"></i>
      ) : (
        <i className="fa-solid fa-circle-exclamation" style={{ color: 'red' }}></i>
      )}
      <p
        tabIndex={0}
        ref={lastFocusableElementRef}
        className="createModal__resultMessage"
      >
        {!error ? 'Your post has been shared.' : error}
      </p>
      <FocusTrapRedirectFocus element={firstFocusableElementRef} />
    </div>
  );
};

export default CreatePostResult;
