import { FC } from 'react'
import PageHeader from '../../_components/page-header'
import SocialMediaList from '../../_components/social-media/social-media-list'

interface SocialInfosProps {
  
}

const SocialInfos: FC<SocialInfosProps> = ({}) => {
  return <div>
    <PageHeader title='Social Infos' description='Mange social info list.' buttonTitle='Add Social-media' buttonHref='/dashboard/social-info/add'/>
    <SocialMediaList />
  </div>
}

export default SocialInfos