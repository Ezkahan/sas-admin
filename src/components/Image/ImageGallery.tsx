import React from "react";

interface ImageGalleryType {
  image?: File;
  images?: FileList[];
}

const ImageGallery: React.FC<ImageGalleryType> = ({ image, images }) => {
  if (images) {
    return (
      <div className="flex gap-5 overflow-x-auto hide-scroll">
        {images?.map((file: any, index: number) => {
          return (
            <img
              key={index}
              src={URL.createObjectURL(file)}
              alt="banner"
              className="h-48 w-80 object-cover rounded-lg"
            />
          );
        })}
      </div>
    );
  }

  return (
    <img
      src={URL.createObjectURL(image as File)}
      alt=""
      className="h-48 w-80 object-cover rounded-lg"
    />
  );
};

export default React.memo(ImageGallery);
