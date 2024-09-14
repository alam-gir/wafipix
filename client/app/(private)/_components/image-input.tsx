import Button2 from "@/components/global/buttons/button2";
import { ImageUp, Trash2 } from "lucide-react";
import Image from "next/image";
import React, {
  ChangeEvent,
  FC,
  HTMLAttributes,
  MouseEvent,
  useRef,
  useState,
} from "react";

interface ImageInputProps extends HTMLAttributes<HTMLInputElement> {
  imageUrl?: string;
  isLoading?: boolean;
  isDisabled?: boolean;
  selectText?: string;
  disabled?: boolean;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  removeButton?: boolean;
  icon?: React.ReactNode;
}

const ImageInput: FC<ImageInputProps> = ({
  selectText = "Select image",
  removeButton = false,
  onChange,
  imageUrl,
  isLoading,
  isDisabled,
  disabled,
  icon,
  ...props
}) => {
  const ref = useRef<HTMLInputElement>(null);
  const [image, setImage] = useState<File | null>(null);

  const imageObjectUrl = image ? URL.createObjectURL(image) : null;

  const clickHandle = () => {
    if (ref) ref.current?.click();
  };

  const removeHandle = (e: MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    if (ref.current) {
      if (image) setImage(null);
      ref.current.value = "";
      ref.current.dispatchEvent(new Event("change", { bubbles: true }));
    }
  };

  const showRemoveButton = removeButton && image;

  return (
    <div
      onClick={clickHandle}
      className="relative h-full w-full rounded lg:rounded-xl overflow-hidden cursor-pointer border border-primary/10"
    >
      {showRemoveButton ? (
        <Button2
          onClick={removeHandle}
          icon={<Trash2 />}
          className="absolute top-0 right-0 z-20"
        />
      ) : null}
      <div className="h-full w-full">
        {imageObjectUrl ? ImageBox(imageObjectUrl) : EmptyBox(selectText, icon)}
      </div>
      <input
        ref={ref}
        type="file"
        accept="image/*"
        onChange={(e) => {
          if (!e.target.files) return;
          setImage(e.target.files[0]);
          onChange(e);
        }}
        {...props}
        disabled={disabled}
        className="hidden"
      />
    </div>
  );
};

export default ImageInput;

const ImageBox = (url: string) => (
  <div className="relative h-full w-full group overflow-hidden ">
    <div className="absolute w-full h-full z-10 flex items-center justify-center opacity-0 group-hover:opacity-100 bg-primary/40 duration-300">
      <p className="text-lg font-semibold text-primary-foreground tracking-wide">
        Change
      </p>
    </div>

    <Image
      src={url}
      alt="Selected source"
      height={400}
      width={400}
      className="w-full h-full object-contain"
    />
  </div>
);

const EmptyBox = (text: string, icon? : React.ReactNode) => (
  <div className="relative h-full w-full flex items-center justify-center flex-col gap-1 p-4 group cursor-pointer bg-white rounded lg:rounded-lg hover:bg-primary/20 duration-300">
    <div className="text-primary/80 group-hover:scale-105 duration-300">
      {icon ? icon : <ImageUp />}
    </div>
    <p className="font-semibold text-primary/80 tracking-wide group-hover:scale-110 duration-300">
      {text}
    </p>
  </div>
);
