export const imageOptimizer = async (
  imgUrl: string | ArrayBuffer | null,
  maxWidth = 1500,
  maxHeight = 1500
): Promise<string> => {
  const result: string = await new Promise((resolve) => {
    if (typeof imgUrl === "string") {
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");
      const img = document.createElement("img");
      img.src = imgUrl;
      img.onload = () => {
        if (img.width > img.height) {
          if (img.width > maxWidth) {
            img.height *= maxWidth / img.width;
            img.width = maxWidth;
          }
        } else {
          if (img.height > maxHeight) {
            img.width *= maxHeight / img.height;
            img.height = maxHeight;
          }
        }

        canvas.width = img.width;
        canvas.height = img.height;

        ctx?.drawImage(img, 0, 0, img.width, img.height);
        const result: string = canvas.toDataURL("image/jpeg", 0.7);
        resolve(result);
      };
    } else {
      resolve("");
    }
  });
  return result;
};
