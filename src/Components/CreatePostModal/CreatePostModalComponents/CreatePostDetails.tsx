import { useContext } from 'react';
import { GlobalContext } from '../../../Context/GlobalContext';

const CreatePostDetails = ({
  step,
  caption,
  setCaption,
}: {
  step: number;
  caption: string;
  setCaption: (value: React.SetStateAction<string>) => void;
}) => {
  const { user } = useContext(GlobalContext);
  return (
    <div className="createModal__postDetails">
      <div className="createModal__imagePreview"></div>
      {step === 3 && (
        <div className="createModal__details">
          <div className="createModal__user">
            <img
              src={
                user?.profileImg ? user.profileImg : '/images/default-profile-picture.png'
              }
              alt=""
              width={30}
              height={30}
              className="createModal__userImage"
            />
            <p>{user?.username}</p>
          </div>
          <div className="createModal__caption">
            <textarea
              placeholder="Write a caption..."
              value={caption}
              onChange={(event) => setCaption(event.target.value)}
            ></textarea>
          </div>
        </div>
      )}
    </div>
  );
};

export default CreatePostDetails;
