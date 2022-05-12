import React, { useEffect } from "react";
import { imageOptimizer } from "../../../Util/imageOptimizer";
import "./ChooseFileStage.scss";

interface Props {
  setOptimizedImageUrl: React.Dispatch<React.SetStateAction<string>>;
  lastFocusableElementRef: React.MutableRefObject<any>;
}

function ChooseFileStage(props: Props) {
  const handleChooseFile = () => {
    const fileInput = document.getElementById("file") as HTMLInputElement;
    fileInput.click();
  };

  const handleOptimizeImage = (event: any) => {
    const image = event.target.files[0];

    const file = new FileReader();
    file.readAsDataURL(image);
    file.onload = async () => {
      const optimizedImageUrl = await imageOptimizer(file.result);
      props.setOptimizedImageUrl(optimizedImageUrl);
    };
  };

  useEffect(() => {
    props.lastFocusableElementRef.current.focus();
  }, []);

  return (
    <div className="chooseFileStage">
      <input type="file" id="file" onChange={handleOptimizeImage} />
      <button
        className="chooseFileStage__chooseBtn"
        onClick={handleChooseFile}
        ref={props.lastFocusableElementRef}
      >
        Select from computer
      </button>
    </div>
  );
}

export default ChooseFileStage;
