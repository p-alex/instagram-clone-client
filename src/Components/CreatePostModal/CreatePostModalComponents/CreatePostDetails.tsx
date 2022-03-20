import { useContext } from 'react';
import { useSelector } from 'react-redux';
import { CreateModalContext } from '../../../Context/CreateModalContext';
import { RootState } from '../../../Redux/Store';
import FocusTrapRedirectFocus from '../../FocusTrap';

const CreatePostDetails = ({
  step,
  caption,
  setCaption,
}: {
  step: number;
  caption: string;
  setCaption: (value: React.SetStateAction<string>) => void;
}) => {
  const authState = useSelector((state: RootState) => state.auth);
  const { lastFocusableElementRef, firstFocusableElementRef } =
    useContext(CreateModalContext);
  return (
    <div className="createModal__postDetails">
      <div className="createModal__imagePreview"></div>
      {step === 3 && (
        <div className="createModal__details">
          <div className="createModal__user">
            <img
              src={
                authState.user?.profilePicture
                  ? authState.user?.profilePicture
                  : '/images/default-profile-picture.png'
              }
              alt=""
              width={30}
              height={30}
              className="createModal__userImage"
            />
            <p>{authState.user?.username}</p>
          </div>
          <div className="createModal__caption">
            <textarea
              placeholder="Write a caption..."
              value={caption}
              onChange={(event) => setCaption(event.target.value)}
              ref={lastFocusableElementRef}
            ></textarea>
          </div>
        </div>
      )}
      <FocusTrapRedirectFocus element={firstFocusableElementRef} />
    </div>
  );
};

export default CreatePostDetails;
