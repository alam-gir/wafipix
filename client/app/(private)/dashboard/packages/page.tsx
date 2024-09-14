import { FC } from 'react'
import PageHeader from '../../_components/page-header'
import Filter from '../../_components/service/filter-service'
import SectionSeparator from '@/components/global/section-separator'
import PackageList from '../../_components/package/package-list'

interface PackagesProps {
  
}

const Packages: FC<PackagesProps> = ({}) => {
  return <div>
    <PageHeader title='Packages' description='Manage your Packages' buttonTitle='Add Package' buttonHref='/dashboard/packages/add' />
    <Filter />
    <SectionSeparator className='min-h-6 lg:min-h-6' />
    <PackageList />
  </div>
}

export default Packages