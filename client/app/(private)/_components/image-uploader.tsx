"use client";

import Button2 from "@/components/global/buttons/button2";
import SectionLoader from "@/components/global/section-loader";
import Image from "next/image";
import { FC, useRef, useState } from "react";

interface ImageUploaderProps {
  uploadHandle: (imageFile: File) => void;
  imageUrl?: string;
  isLoading?: boolean;
  note?: string;
}

const ImageUploader: FC<ImageUploaderProps> = ({
  isLoading,
  imageUrl,
  uploadHandle,
  note,
}) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [selectedImage, setImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    } else {
      // clean history
      setImage(null);
      setImagePreview(null);
      e.target.value = "";
    }
  };

  const handleCancel = () => {
    if (inputRef.current) {
      inputRef.current.value = "";
      setImage(null);
      setImagePreview(null);
    }
  };

  const onUploadImage = async () => {
    if (selectedImage) {
      uploadHandle(selectedImage);
      setImage(null);
      setImagePreview(null);
      if (inputRef.current) {
        inputRef.current.value = "";
      }
    }
  };

  return (
    <div className="h-full w-full max-w-96 space-y-4">
      {/* PREVIEW */}
      <div
        onClick={() => {
          if (inputRef.current) {
            inputRef.current.click();
          }
        }}
        className="cursor-pointer aspect-video max-w-96 bg-white flex items-center justify-center rounded-xl overflow-hidden"
      >
        {isLoading ? <SectionLoader className="h-full w-full" /> : null}
        {!isLoading && imageUrl ? (
          <Image
            src={imagePreview || imageUrl}
            alt="preview logo"
            width={640}
            height={480}
            className="object-contain h-full w-full"
          />
        ) : null}
        {!isLoading && !imageUrl ? (
          <p className="text-center text-gray-500">No image selected</p>
        ) : null}
      </div>
      {
        // notes
        !imagePreview && !selectedImage && imageUrl && note
          ? notes(note)
          : imagePreview
          ? notes("Click save to save this image.")
          : null
      }

      {/* UPLOAD BUTTON */}
      <div className="mt-4 space-y-4">
        <input
          disabled={isLoading}
          ref={inputRef}
          id="image-upload"
          type="file"
          accept="image/*"
          className="
                bg-white rounded-r-lg overflow-hidden w-full
                "
          onChange={handleImageChange}
        />
        {selectedImage ? (
          <div className="space-y-4">
            <Button2
              isLoading={isLoading}
              disabled={isLoading}
              loadingText="Uploading..."
              title="Save"
              className="w-full rounded-lg"
              onClick={onUploadImage}
            />
            <Button2
              disabled={isLoading}
              title="Cancel"
              variant={"outline"}
              className="w-full rounded-lg"
              onClick={handleCancel}
            />
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default ImageUploader;

const notes = (note: string) => {
  return (
    <div className="p-4 bg-accent3/10 border border-accent3 rounded-xl">
      <p className="text-center text-muted-foreground hover:text-primary/80 duration-300 font-semibold tracking-wide italic">
        {note}
      </p>
    </div>
  );
};
