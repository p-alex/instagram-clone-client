import { useSelector } from "react-redux";
import { RootState } from "../../../Redux/Store";
import "./DetailsStage.scss";

interface Props {
  croppedImageUrl: string;
  description: string;
  setDescription: React.Dispatch<React.SetStateAction<string>>;
  lastFocusableElement: React.MutableRefObject<any>;
}

const DetailsStage = (props: Props) => {
  const authState = useSelector((state: RootState) => state.auth);
  return (
    <div className="detailsStage">
      <img
        src={props.croppedImageUrl}
        alt=""
        className="detailsStage__preview"
      />
      <div className="detailsStage__panel">
        <div className="detailsStage__user">
          <img
            src={authState.user?.profilePicture.smallPicture}
            width="40"
            height="40"
            alt=""
          />
          <p>{authState.user?.username}</p>
        </div>
        <textarea
          placeholder="Write a caption..."
          value={props.description}
          onChange={(event) => props.setDescription(event.target.value)}
          className="detailsStage__textarea"
          autoFocus={true}
          ref={props.lastFocusableElement}
        ></textarea>
      </div>
    </div>
  );
};

export default DetailsStage;
