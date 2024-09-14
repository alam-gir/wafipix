import ImageCard from '@/components/global/image-card'
import { TPortfolio } from '@/lib/URL-services/portfolios'
import { FC } from 'react'

interface ShowcaseGalleryProps {
  portfolios: TPortfolio[]
}

const ShowcaseGallery: FC<ShowcaseGalleryProps> = ({portfolios}) => {
  
    const GALLERY = portfolios?.map(portfolio => {
        return <ImageCard src={portfolio.image.secure_url} height={320} width={320} classNameValue={"h-full w-full object-cover rounded"} />
    })
    return <div className='h-auto w-full grid grid-cols-2 gap-2'>
        {GALLERY}
    </div>
}

export default ShowcaseGallery