import PageHeader from "@/app/(private)/_components/page-header";
import TopCustomerAddForm from "@/app/(private)/_components/top-customer/top-customer-add-form";
import SectionSeparator from "@/components/global/section-separator";
import { FC } from "react";

interface AddTopCustomerProps {}

const AddTopCustomer: FC<AddTopCustomerProps> = ({}) => {
  return (
    <div>
      <PageHeader
        title="Add Top Customer"
        description="Fill the form with all the required data."
      />
      <SectionSeparator className="min-h-6 lg:min-h-6" />
      <TopCustomerAddForm />
    </div>
  );
};

export default AddTopCustomer;
