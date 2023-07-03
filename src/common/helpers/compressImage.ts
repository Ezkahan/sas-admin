export const compressImage = async (
  file: File,
  { quality = 1, type = file.type }
) => {
  const imageBitmap = await createImageBitmap(file);
  const canvas = document.createElement("canvas");
  canvas.width = imageBitmap.width;
  canvas.height = imageBitmap.height;
  const ctx = canvas.getContext("2d");
  ctx?.drawImage(imageBitmap, 0, 0);
  const blob: any = await new Promise((resolve) =>
    canvas.toBlob(resolve, type, quality)
  );
  return new File([blob], file.name, {
    type: blob.type,
  });
};
