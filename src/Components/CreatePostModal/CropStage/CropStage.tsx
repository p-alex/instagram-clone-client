import React from "react";
import Cropper from "../../Cropper/Cropper";

interface ICropStage {
  imgUrl: string;
  savedImagePos: { x: number; y: number };
  savedAspectRatio: number;
  setCroppedImageUrl: React.Dispatch<React.SetStateAction<string>>;
  setSavedImagePos: React.Dispatch<
    React.SetStateAction<{
      x: number;
      y: number;
    }>
  >;
  setSavedAspectRatio: React.Dispatch<React.SetStateAction<number>>;
  lastFocusableElementRef: any;
}

const CropStage = ({
  imgUrl,
  savedImagePos,
  savedAspectRatio,
  setCroppedImageUrl,
  setSavedImagePos,
  setSavedAspectRatio,
  lastFocusableElementRef,
}: ICropStage) => {
  return (
    <Cropper
      imgUrl={imgUrl}
      savedImagePos={savedImagePos}
      savedAspectRatio={savedAspectRatio}
      setCroppedImageUrl={setCroppedImageUrl}
      setSavedImagePos={setSavedImagePos}
      setSavedAspectRatio={setSavedAspectRatio}
      lastFocusableElementRef={lastFocusableElementRef}
    />
  );
};

export default CropStage;
