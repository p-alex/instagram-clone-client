import { useCallback, useEffect, useState } from 'react';
import CropperFooter from './CropperFooter/CropperFooter';
import { imageCropper } from '../../Util/imageCropper';
import './Cropper.scss';

function Cropper({
  imgUrl,
  savedImagePos,
  savedAspectRatio,
  setCroppedImageUrl,
  setSavedImagePos,
  setSavedAspectRatio,
  lastFocusableElementRef,
}: {
  imgUrl: string | ArrayBuffer | null | undefined;
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
  lastFocusableElementRef: React.MutableRefObject<any>;
}) {
  const [aspectRatio, setAspectRatio] = useState(savedAspectRatio);
  const [initialMousePos, setInitialMousePos] = useState({ x: 0, y: 0 });
  const [pos, setPos] = useState(savedImagePos);
  const [newPos, setNewPos] = useState({ x: 0, y: 0 });
  const [maxMove, setMaxMove] = useState({ x: 0, y: 0 });
  const [canMove, setCanMove] = useState(false);

  const handleCalculateCropSize = useCallback(() => {
    const cropper = document.querySelector('.cropper') as HTMLDivElement;
    const cropArea = document.querySelector('.cropper__cropArea') as HTMLDivElement;
    const image = document.querySelector('.cropper__image') as HTMLImageElement;

    if (cropper && cropArea && image) {
      const cropperWidth = cropper.offsetWidth;
      const cropperHeight = cropper.offsetHeight;

      if (aspectRatio === 16 / 9) {
        if (image.classList.contains('maxHeight')) image.classList.remove('maxHeight');
        cropArea.style.width = `${cropperWidth}px`;
        cropArea.style.height = `${cropperHeight / aspectRatio}px`;
      } else if (aspectRatio === 4 / 5) {
        cropArea.style.width = `${cropperWidth * aspectRatio}px`;
        cropArea.style.height = `${cropperHeight}px`;
        handleAddCorrectCssClass(image);
      } else {
        cropArea.style.width = `${cropperHeight}px`;
        cropArea.style.height = `${cropperHeight}px`;
        handleAddCorrectCssClass(image);
      }
    }
  }, [aspectRatio]);

  const handleCalculateMaxMove = useCallback(() => {
    const cropArea = document.querySelector('.cropper__cropArea') as HTMLDivElement;
    const image = document.querySelector('.cropper__image') as HTMLImageElement;

    let maxMoveX = image.offsetWidth - cropArea.offsetWidth;
    let maxMoveY = image.offsetHeight - cropArea.offsetHeight;

    if (maxMoveX < 5) maxMoveX = 0;
    if (maxMoveY < 5) maxMoveY = 0;

    setMaxMove((prevState) => ({ ...prevState, x: maxMoveX, y: maxMoveY }));
  }, []);

  function onMouseDown(event: any) {
    setCanMove((prevState) => !prevState);
    setInitialMousePos((prevState) => ({
      ...prevState,
      x: event.screenX,
      y: event.screenY,
    }));
  }

  function onMouseMove(event: any) {
    event.preventDefault();
    if (canMove) {
      const image = document.querySelector('.cropper__image') as HTMLImageElement;
      let newXPos = pos.x + (initialMousePos.x - event.screenX);
      let newYPos = pos.y + (initialMousePos.y - event.screenY);
      if (newXPos > maxMove.x) {
        newXPos = maxMove.x;
        setNewPos((prevState) => ({ ...prevState, x: maxMove.x }));
      } else if (newXPos < 0) {
        newXPos = 0;
        setNewPos((prevState) => ({ ...prevState, x: 0 }));
      } else {
        setNewPos((prevState) => ({ ...prevState, x: newXPos }));
      }
      if (newYPos > maxMove.y) {
        newYPos = maxMove.y;
        setNewPos((prevState) => ({ ...prevState, y: maxMove.y }));
      } else if (newYPos < 0) {
        newYPos = 0;
        setNewPos((prevState) => ({ ...prevState, y: 0 }));
      } else {
        setNewPos((prevState) => ({ ...prevState, y: newYPos }));
      }
      image.style.left = `-${newXPos}px`;
      image.style.top = `-${newYPos}px`;
    }
  }

  function onMouseUp() {
    setInitialMousePos((prevState) => ({ ...prevState, x: 0, y: 0 }));
    setCanMove(false);
    setPos((prevState) => ({ ...prevState, x: newPos.x, y: newPos.y }));
  }

  function onMouseLeave() {
    setInitialMousePos((prevState) => ({ ...prevState, x: 0, y: 0 }));
    setCanMove(false);
    setPos((prevState) => ({ ...prevState, x: newPos.x, y: newPos.y }));
  }

  function onTouchStart(event: any) {
    setCanMove((prevState) => !prevState);
    setInitialMousePos((prevState) => ({
      ...prevState,
      x: event.changedTouches[0].screenX,
      y: event.changedTouches[0].screenY,
    }));
  }

  function onTouchMove(event: React.TouchEvent<HTMLDivElement>) {
    event.preventDefault();
    if (canMove) {
      const image = document.querySelector('.cropper__image') as HTMLImageElement;
      let newXPos = pos.x + (initialMousePos.x - event.changedTouches[0].screenX);
      let newYPos = pos.y + (initialMousePos.y - event.changedTouches[0].screenY);
      if (newXPos > maxMove.x) {
        newXPos = maxMove.x;
        setNewPos((prevState) => ({ ...prevState, x: maxMove.x }));
      } else if (newXPos < 0) {
        newXPos = 0;
        setNewPos((prevState) => ({ ...prevState, x: 0 }));
      } else {
        setNewPos((prevState) => ({ ...prevState, x: newXPos }));
      }
      if (newYPos > maxMove.y) {
        newYPos = maxMove.y;
        setNewPos((prevState) => ({ ...prevState, y: maxMove.y }));
      } else if (newYPos < 0) {
        newYPos = 0;
        setNewPos((prevState) => ({ ...prevState, y: 0 }));
      } else {
        setNewPos((prevState) => ({ ...prevState, y: newYPos }));
      }
      image.style.left = `-${newXPos}px`;
      image.style.top = `-${newYPos}px`;
    }
  }

  function onTouchEnd() {
    setInitialMousePos((prevState) => ({ ...prevState, x: 0, y: 0 }));
    setCanMove(false);
    setPos((prevState) => ({ ...prevState, x: newPos.x, y: newPos.y }));
  }

  const handleAddImage = useCallback(() => {
    if (typeof imgUrl === 'string') {
      const image = document.querySelector('.cropper__image') as HTMLImageElement;
      if (!image) {
        const cropArea = document.querySelector('.cropper__cropArea') as HTMLDivElement;
        const img = document.createElement('img');

        img.draggable = false;

        img.classList.add('cropper__image');

        img.src = imgUrl;

        img.onload = () => {
          handleAddCorrectCssClass(img);
          handleCalculations();
          handleCropImage();
        };

        cropArea.appendChild(img);
      }
    }
  }, [handleCalculateCropSize, handleCalculateMaxMove, imgUrl]);

  const handleCalculations = () => {
    handleCalculateCropSize();
    handleCalculateMaxMove();
  };

  const handleCropImage = async () => {
    const cropArea = document.querySelector('.cropper__cropArea') as HTMLDivElement;
    const image = document.querySelector('.cropper__image') as HTMLImageElement;
    const result = await imageCropper({ pos, cropArea, image });
    setCroppedImageUrl(result);
  };
  const handleAddCorrectCssClass = (image: HTMLImageElement) => {
    if (image.naturalHeight < image.naturalWidth) {
      image.classList.add('maxHeight');
    } else if (image.naturalHeight === image.naturalWidth) {
      image.classList.add('maxHeight');
    } else {
      image.classList.remove('maxHeight');
    }
  };

  useEffect(() => {
    let isMounted = true;
    if (isMounted) {
      handleAddImage();
      window.addEventListener('resize', handleCalculations);
    }
    return () => {
      window.removeEventListener('resize', handleCalculations);
      isMounted = false;
    };
  }, [handleAddImage, handleCalculateCropSize, handleCalculateMaxMove]);

  useEffect(() => {
    let isMounted = true;
    if (isMounted) handleCalculations();
    if (isMounted) handleCropImage();
    if (isMounted) setSavedAspectRatio(aspectRatio);
    return () => {
      isMounted = false;
    };
  }, [aspectRatio, handleCalculateCropSize, handleCalculateMaxMove]);

  useEffect(() => {
    (async () => {
      await handleCropImage();
    })();
    setSavedImagePos(pos);
  }, [pos]);

  useEffect(() => {
    const image = document.querySelector('.cropper__image') as HTMLImageElement;
    if (savedImagePos) {
      image.style.left = `${-savedImagePos.x}px`;
      image.style.top = `${-savedImagePos.y}px`;
    }
  }, []);
  return (
    <div
      className="cropper"
      onMouseDown={(event) => onMouseDown(event)}
      onMouseMove={(event) => onMouseMove(event)}
      onMouseUp={onMouseUp}
      onMouseLeave={onMouseLeave}
      onTouchStart={onTouchStart}
      onTouchMove={(event) => onTouchMove(event)}
      onTouchEnd={onTouchEnd}
    >
      <div className="cropper__container">
        <div className="cropper__cropArea"></div>
        <CropperFooter
          setAspectRatio={setAspectRatio}
          aspectRatio={aspectRatio}
          lastFocusableElementRef={lastFocusableElementRef}
        />
      </div>
    </div>
  );
}
export default Cropper;
