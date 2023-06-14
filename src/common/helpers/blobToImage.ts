const blobToImage = async (blobSrc: any, fileName: string) => {
  const res = await fetch(blobSrc);
  const blob = await res.blob();

  return new File([blob], fileName, { type: "image/png" });
};

export default blobToImage;
