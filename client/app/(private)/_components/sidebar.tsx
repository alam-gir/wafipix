"use client"

import { useState } from 'react';
import { ChevronLeftIcon, ChevronRightIcon, UserIcon, LogOutIcon, HeartHandshake, BriefcaseBusiness, Package, LayoutDashboard, MapPin, Globe, Sparkles, Feather, Hexagon } from 'lucide-react';
import MenuItem from './menu-item'; // Separate MenuItem component

export default function Sidebar() {
  const [isCollapsed, setIsCollapsed] = useState(true);

  const handleToggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <div className={`flex flex-col h-full  bg-background2 bg-gradient-to-r backdrop-blur-lg border-r-2 border-r-primary/5 text-primary-foreground ${isCollapsed ? 'w-14 md:w-16' : 'w-screen md:w-64 border-r-0'} transition-all duration-300 ease-in-out`}>
      {/* Sidebar Header with Collapse Button */}
      <div className="flex items-center justify-between p-4 border-b border-primary/5">
        <button 
          onClick={handleToggleSidebar} 
          className="p-2 rounded-md hover:bg-accent3 text-accent3 hover:text-primary-foreground focus:outline-none focus:ring-2 focus:ring-accent2"
          aria-label={isCollapsed ? 'Expand Sidebar' : 'Collapse Sidebar'}
        >
          {isCollapsed ? <ChevronRightIcon size={24} /> : <ChevronLeftIcon size={24} />}
        </button>
      </div>

      {/* Menu Sections */}
      <nav className="mt-4 flex-1 space-y-1">
        <MenuItem href="/dashboard" icon={<LayoutDashboard />} label="Dashboard" isCollapsed={isCollapsed} />
        <MenuItem href="/dashboard/services/" icon={<HeartHandshake />} label="Services" isCollapsed={isCollapsed} />
        <MenuItem href="/dashboard/portfolios" icon={<BriefcaseBusiness />} label="Portfolios" isCollapsed={isCollapsed} />
        <MenuItem href="/dashboard/packages" icon={<Package />} label="Packages" isCollapsed={isCollapsed} />
        <MenuItem href="/dashboard/logo" icon={<Hexagon />} label="Logo" isCollapsed={isCollapsed} />
        <MenuItem href="/dashboard/hero-features" icon={<Feather />} label="Hero-Features" isCollapsed={isCollapsed} />
        <MenuItem href="/dashboard/top-customers" icon={<Sparkles />} label="Top-Customers" isCollapsed={isCollapsed} />
        <MenuItem href="/dashboard/social-info" icon={<Globe />} label="Social-Info" isCollapsed={isCollapsed} />
        <MenuItem href="/dashboard/contact-info" icon={<MapPin />} label="Contact-Info" isCollapsed={isCollapsed} />
        
      </nav>

      {/* Profile Section */}
      <div className="p-4 mt-auto border-t border-primary-foreground">
        <MenuItem
          href=""
          icon={<UserIcon />}
          label="Profile"
          isCollapsed={isCollapsed}
          hasDropdown
          dropdownItems={[
            { href: '/logout', label: 'Logout', icon: <LogOutIcon /> },
            // Add more dropdown items here
          ]}
        />
      </div>
    </div>
  );
}
