export const imageCropper = async ({
  pos,
  cropArea,
  image,
}: {
  pos: { x: number; y: number };
  cropArea: HTMLDivElement;
  image: HTMLImageElement;
}) => {
  const result: string = await new Promise((resolve) => {
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");

    const cropAreaPercentageX = cropArea.offsetWidth / image.offsetWidth;
    const cropAreaPercentageY = cropArea.offsetHeight / image.offsetHeight;

    const percentageMoveX = pos.x / image.offsetWidth;
    const percentageMoveY = pos.y / image.offsetHeight;

    const canvasWidth = image.naturalWidth * cropAreaPercentageX;
    const canvasHeight = image.naturalHeight * cropAreaPercentageY;

    const movedX = -image.naturalWidth * percentageMoveX;
    const movedY = -image.naturalHeight * percentageMoveY;

    canvas.width = Math.floor(canvasWidth);
    canvas.height = Math.floor(canvasHeight);

    ctx?.drawImage(
      image,
      movedX,
      movedY,
      image.naturalWidth,
      image.naturalHeight
    );

    resolve(canvas.toDataURL("image/jpeg", 0.75));
  });
  return result;
};
