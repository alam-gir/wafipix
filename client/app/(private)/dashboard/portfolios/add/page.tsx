import PageHeader from '@/app/(private)/_components/page-header'
import PortfolioAddForm from '@/app/(private)/_components/portfolio/portfolio-add-form'
import SectionSeparator from '@/components/global/section-separator'
import { FC } from 'react'

interface AddPortfolioProps {
  
}

const AddPortfolio: FC<AddPortfolioProps> = ({}) => {
  return <div>
    <PageHeader title='Add Portfolio' description='Fill the form with all the required data.' />
    <SectionSeparator className='min-h-6 lg:min-h-6' />
    <PortfolioAddForm />
  </div>
}

export default AddPortfolio