    'use client'

    import { X } from 'lucide-react'
    import { StaticImageData } from 'next/image'
    import { FC } from 'react'
    import WidthWrapper from '../width-wrapper'
    import ImageCard from '../image-card'

    interface ImageViewerProps {
    image: string | StaticImageData
    isOpen: boolean
    onClose: () => void
    }

    const ImageViewer: FC<ImageViewerProps> = ({image, isOpen, onClose}) => {
        if(!isOpen) return null;

  return <div className='h-screen w-screen backdrop-blur-sm fixed top-0 left-0 z-50 p-8 lg:p-24'>
    <WidthWrapper>
        {/* close button */}
        <div onClick={onClose} className='absolute top-10 right-10 h-fit w-fit p-2 bg-primary-foreground rounded-full hover:bg-primary-foreground/60 group cursor-pointer duration-100'>
            <X className='h-6 w-6 lg:h-8 lg:w-8 text-primary group-hover:text-primary/60 duration-100' />
        </div>
        {/* Image view card */}
        <ImageCard src={image} height={720} width={1366} classNameValue='h-full w-full object-fit' />
    </WidthWrapper>
  </div>
}

export default ImageViewer