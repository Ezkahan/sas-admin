import { useEffect, useState, useCallback, useRef } from "react";
import ReactCrop from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";

interface IProps {
  inputData: {
    select_image: string;
    image: any;
  };
  setInputData: Function;
  setCropedImage: Function;
  label: string;
  required?: boolean;
}

const ImageUpload = ({
  inputData,
  setInputData,
  setCropedImage,
  label,
  required = true,
}: IProps) => {
  const [upImg, setUpImg] = useState<any>();
  const imgRef = useRef(null);
  const previewCanvasRef = useRef(null);
  const [crop, setCrop] = useState<any>({
    unit: "%",
    width: 30,
    // x: 0,
    // y: 0,
    // height: 30,
  });
  const [completedCrop, setCompletedCrop] = useState<any>(null);

  const onSelectFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const reader = new FileReader();
      reader.addEventListener("load", () => setUpImg(reader.result));
      reader.readAsDataURL(e.target.files[0]);
    }
  };
  const onLoad = useCallback((img) => {
    imgRef.current = img;
  }, []);
  useEffect(() => {
    if (!completedCrop || !previewCanvasRef.current || !imgRef.current) {
      return;
    }

    const image: HTMLImageElement = imgRef.current;
    const canvas: HTMLCanvasElement = previewCanvasRef.current;
    const crop: any = completedCrop;

    const scaleX = image.naturalWidth / image.width;
    const scaleY = image.naturalHeight / image.height;
    const ctx: CanvasRenderingContext2D | null = canvas.getContext("2d");
    const pixelRatio = window.devicePixelRatio;

    canvas.width = crop.width * pixelRatio * scaleX;
    canvas.height = crop.height * pixelRatio * scaleY;
    if (ctx) {
      ctx.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
      ctx.imageSmoothingQuality = "high";

      ctx.drawImage(
        image,
        crop.x * scaleX,
        crop.y * scaleY,
        crop.width * scaleX,
        crop.height * scaleY,
        0,
        0,
        crop.width * scaleX,
        crop.height * scaleY
      );
    }
    canvas.toBlob(
      (blob) => {
        const reader = new FileReader();
        blob && reader.readAsDataURL(blob);
        reader.addEventListener("load", () => setCropedImage(reader.result));
      },
      "image/png",
      1
    );
  }, [completedCrop, setCropedImage]);

  return (
    <div className="w-full ">
      <aside className="grid grid-cols-12 gap-5">
        <ReactCrop
          className="col-span-12 lg:col-span-7"
          src={upImg}
          onImageLoaded={onLoad}
          crop={crop}
          onChange={(c) => setCrop(c)}
          onComplete={(c) => setCompletedCrop(c)}
        />
        <div className="col-span-12 lg:col-span-5">
          <canvas
            className="max-w-full h-auto"
            ref={previewCanvasRef}
            // Rounding is important so the canvas width and height matches/is a multiple for sharpness.
            style={{
              width: Math.round(completedCrop?.width ?? 0),
              // height: Math.round(completedCrop?.height ?? 0)
            }}
          />
        </div>
      </aside>

      <aside className="flex flex-col border border-gray-200 bg-gray-50 rounded-md">
        <label className="text-sm px-4 pt-2" htmlFor="logo">
          {label}
          {required && <span className="text-red-600 pl-2">*</span>}
        </label>

        <div className="relative h-10">
          <label className="absolute top-2 left-4 text-gray-400" htmlFor="file">
            {inputData.select_image}
          </label>
          <input
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              if (e?.target?.files?.[0]) {
                onSelectFile(e);
                setInputData({
                  ...inputData,
                  select_image: e.target.files[0].name,
                  image: e.target.files[0],
                });
              }
            }}
            type="file"
            className="opacity-0"
            accept="image/*"
          />
        </div>
      </aside>
    </div>
  );
};

export default ImageUpload;
