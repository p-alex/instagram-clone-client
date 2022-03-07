const getImageBase64 = async (selectedFile: any): Promise<any> => {
  let result_base64 = await new Promise((resolve) => {
    const file = new FileReader();
    file.readAsDataURL(selectedFile);
    file.onload = (e) => resolve(file.result);
  });
  return result_base64;
};

const optimizeBase64 = async (base64: string, maxWidth: number, maxHeight: number) => {
  let optimized_base64 = await new Promise((resolve) => {
    let img = new Image();
    img.src = base64;
    img.onload = () => {
      let width = img.width;
      let height = img.height;
      let canvas = document.createElement('canvas');
      if (width > height) {
        if (width > maxWidth) {
          height *= maxWidth / width;
          width = maxWidth;
        }
      } else {
        if (height > maxHeight) {
          width *= maxHeight / height;
          height = maxHeight;
        }
      }
      canvas.width = width;
      canvas.height = height;
      let ctx = canvas.getContext('2d');
      ctx?.drawImage(img, 0, 0, width, height);
      resolve(canvas.toDataURL('image/jpeg', 0.7));
    };
  });
  return optimized_base64;
};

export const imageOptimizer = async (
  selectedFile: any,
  maxWidth: number,
  maxHeight: number
) => {
  const base64 = await getImageBase64(selectedFile);
  if (selectedFile.size <= 275000) return base64;
  const optimizedBase64 = await optimizeBase64(base64, maxWidth, maxHeight);
  return optimizedBase64;
};
