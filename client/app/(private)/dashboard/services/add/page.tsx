import PageHeader from '@/app/(private)/_components/page-header'
import ServiceAddForm from '@/app/(private)/_components/service/service-add-form'
import SectionSeparator from '@/components/global/section-separator'
import { FC } from 'react'

interface AddServiceProps {
  
}

const AddService: FC<AddServiceProps> = ({}) => {
  return <div>
    <PageHeader title='Add Service' description='Fill the form with all the required data.' />
    <SectionSeparator className='min-h-6 lg:min-h-6' />
    <ServiceAddForm />
  </div>
}

export default AddService