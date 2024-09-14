import { FC } from 'react'
import PageHeader from '../../_components/page-header'
import SectionSeparator from '@/components/global/section-separator'
import LogoManageContainer from '../../_components/logo/logo-manage-container'

interface LogoProps {
  
}

const Logo: FC<LogoProps> = ({}) => {
  return <div>
  <PageHeader title='Logo' description='Manage your Logo' />
  <SectionSeparator className='min-h-6 lg:min-h-6' />
  <LogoManageContainer />
</div>
}

export default Logo