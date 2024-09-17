import { FC } from 'react'
import DashboardLayout from '../_components/dashborad-layout'

interface LayoutProps {
  children: React.ReactNode 
}

const Layout: FC<LayoutProps> = ({children}) => {
  return <DashboardLayout>
    {children}
    </DashboardLayout>
}

export default Layout