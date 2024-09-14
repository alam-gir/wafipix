import PageHeader from "@/components/global/page-header";
import { FC } from "react";
import MenuItem from "../_components/menu-item";
import {
  BriefcaseBusiness,
  Feather,
  Globe,
  HeartHandshake,
  Hexagon,
  MapPin,
  Package,
  Sparkles,
} from "lucide-react";

interface DashboardProps {}

const Dashboard: FC<DashboardProps> = ({}) => {
  return (
    <h1>
      <PageHeader
        header="Welcome to Dashboard"
        subHeader="Mange Your site here."
      />
      <DashboardMenuSection />
    </h1>
  );
};

export default Dashboard;

const DashboardMenuSection: FC = () => {
  return (
    <nav className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <MenuItem
        href="/dashboard/services/"
        icon={<HeartHandshake />}
        label="Manage Services"
        isCollapsed={false}
      />
      <MenuItem
        href="/dashboard/portfolios"
        icon={<BriefcaseBusiness />}
        label="Manage Portfolios"
        isCollapsed={false}
      />
      <MenuItem
        href="/dashboard/packages"
        icon={<Package />}
        label="Manage Packages"
        isCollapsed={false}
      />
      <MenuItem
        href="/dashboard/logo"
        icon={<Hexagon />}
        label="Manage Logo"
        isCollapsed={false}
      />
      <MenuItem
        href="/dashboard/hero-features"
        icon={<Feather />}
        label="Manage Hero-Features"
        isCollapsed={false}
      />
      <MenuItem
        href="/dashboard/top-customers"
        icon={<Sparkles />}
        label="Manage Top-Customers"
        isCollapsed={false}
      />
      <MenuItem
        href="/dashboard/social-informations"
        icon={<Globe />}
        label="Manage Social-Informations"
        isCollapsed={false}
      />
      <MenuItem
        href="/dashboard/contact-informations"
        icon={<MapPin />}
        label="Manage Contact-Informations"
        isCollapsed={false}
      />
    </nav>
  );
};
