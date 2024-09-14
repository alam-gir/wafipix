import { FC } from 'react'
import PageHeader from '../../_components/page-header'
import TopCustomerList from '../../_components/top-customer/top-customer-list'

interface TopCustomersProps {
  
}

const TopCustomers: FC<TopCustomersProps> = ({}) => {
  return <div>
    <PageHeader title='Top Customers' description='Mange top customer list.' buttonTitle='Add Customer' buttonHref='/dashboard/top-customers/add'/>
    <TopCustomerList />
  </div>
}

export default TopCustomers