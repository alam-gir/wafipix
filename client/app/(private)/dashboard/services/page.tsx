import { FC } from 'react'
import PageHeader from '../../_components/page-header'
import Filter from '../../_components/service/filter-service'
import ServiceList from '../../_components/service/service-list'
import SectionSeparator from '@/components/global/section-separator'

interface ServicesProps {
  
}

const Services: FC<ServicesProps> = ({}) => {
  return <div>
    <PageHeader title='Services' description='Manage your services' buttonTitle='Add Service' buttonHref='/dashboard/services/add' />
    <Filter />
    <SectionSeparator className='min-h-8 lg:min-h-10' />
    <ServiceList />
  </div>
}

export default Services