'use client'
import ImageCard from '@/components/global/image-card'
import { TPortfolio } from '@/lib/URL-services/portfolios'
import { FC } from 'react'

interface PortfolioGalleryProps {
  portfolios: TPortfolio[]
}

const PortfolioGallery: FC<PortfolioGalleryProps> = ({portfolios}) => {
  return <div className='space-y-8'>
    <div className='grid grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-8'>
      {portfolios?.map(portfolio => {
        return PortfolioItem({portfolio})
      })}
    </div>
</div>
}

export default PortfolioGallery

const PortfolioItem = ({portfolio}:{portfolio:TPortfolio}) => {
    return <div className='group h-full w-full rounded-xl overflow-hidden cursor-pointer'>
          <ImageCard src={portfolio.image.secure_url} height={720} width={720} alt={portfolio.title} classNameValue='h-full w-full object-cover' />
      </div>
}