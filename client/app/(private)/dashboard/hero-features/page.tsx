import { FC } from 'react'
import PageHeader from '../../_components/page-header'
import HeroFeaturesForm from '../../_components/hero-features/hero-features-form'
import SectionSeparator from '@/components/global/section-separator'

interface HeroFeaturesProps {
  
}

const HeroFeatures: FC<HeroFeaturesProps> = ({}) => {
  return <div>
    <PageHeader title='Hero Features' description='Mange hero feature list.'/>
    <SectionSeparator className='min-h-6 lg:min-h-6' />
    <HeroFeaturesForm />
  </div>
}

export default HeroFeatures