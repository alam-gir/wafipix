import { FC } from 'react'
import PageHeader from '../../_components/page-header'
import Filter from '../../_components/service/filter-service'
import PortfolioList from '../../_components/portfolio/portfolio-list'
import SectionSeparator from '@/components/global/section-separator'

interface PortfliosProps {
  
}

const Portflios: FC<PortfliosProps> = ({}) => {
  return <div>
    <PageHeader title='Portfolios' description='Manage your Portfolios' buttonTitle='Add Portfolio' buttonHref='/dashboard/portfolios/add' />
    <Filter isFilter={false} />
    <SectionSeparator className='min-h-6 lg:min-h-6' />
    <PortfolioList />
  </div>
}

export default Portflios