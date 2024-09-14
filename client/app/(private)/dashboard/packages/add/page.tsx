import PackageAddForm from '@/app/(private)/_components/package/package-add-form'
import PageHeader from '@/app/(private)/_components/page-header'
import SectionSeparator from '@/components/global/section-separator'
import { FC } from 'react'

interface AddPackageProps {
  
}

const AddPackage: FC<AddPackageProps> = ({}) => {
  return <div>
    <PageHeader title='Add Package' description='Fill the form with all the required data.' />
    <SectionSeparator className='min-h-6 lg:min-h-6' />
    <PackageAddForm />
  </div>
}

export default AddPackage