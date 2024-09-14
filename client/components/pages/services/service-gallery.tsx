import { FC } from 'react'
import ServiceGelleryCard from './service-gallery-card'
import { TService } from '@/lib/URL-services/services'

interface ServiceGalleryProps {
  services: TService[]
}

const ServiceGallery: FC<ServiceGalleryProps> = ({services}) => {

    const GALLERY = services?.map(service => {
        return <ServiceGelleryCard key={service.title} service={service} />
    })

  return <div className='h-full w-full grid grid-cols-1 lg:grid-cols-3 gap-6'>
    {GALLERY}
  </div>
}

export default ServiceGallery