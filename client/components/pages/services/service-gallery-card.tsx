import ImageCard from '@/components/global/image-card'
import { TService } from '@/lib/URL-services/services'
import Link from 'next/link'
import { FC } from 'react'

interface ServiceGelleryCardProps {
  service: TService
}

const ServiceGelleryCard: FC<ServiceGelleryCardProps> = ({service}) => {
  
  return <Link href={"/services/" + service.slug}>
  <div className=' bg-white rounded-md overflow-hidden group h-full w-full'>
    <div className='h-fit w-full overflow-hidden '>
        <ImageCard src={service.image.secure_url} classNameValue={"h-full w-full object-cover group-hover:scale-110 group-hover:rotate-[2deg] duration-300"} alt={service.title} height={400} width={400} quality={100}/>
    </div>
    <div className='space-y-2 px-4 py-6'>
        <h1 className='hover:underline duration-100 text-primary text-cardHead lg:text-cardHeadLg'>{service.title}</h1>
        <p className='text-primary/60 text-subHead lg:text-subHeadLg tracking-wider'>{service.description}</p>
    </div>
  </div>
  </Link>
}

export default ServiceGelleryCard