"use client";
import { cn } from "@/lib/utils";
import Image, { StaticImageData } from "next/image";
import { FC } from "react";

interface ImageCardProps {
  src: string | StaticImageData;
  height: number;
  width: number;
  alt?: string;
  quality?: number;
  classNameValue?: string;
}

const ImageCard: FC<ImageCardProps> = ({
  src,
  height,
  width,
  alt,
  quality,
  classNameValue,
}) => {
  return (
    <Image
      className={cn(classNameValue)}
      src={src}
      height={height}
      quality={quality || 100}
      width={width}
      alt={alt || "image"}
    />
  );
};

export default ImageCard;
