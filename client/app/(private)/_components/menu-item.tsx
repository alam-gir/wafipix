
'use client'
import { useState } from 'react';
import Link from 'next/link';
import { ChevronDownIcon } from 'lucide-react';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';

interface MenuItemProps {
  href: string;
  icon: JSX.Element;
  label: string;
  isCollapsed: boolean;
  hasDropdown?: boolean;
  dropdownItems?: { href: string; label: string; icon: JSX.Element }[];
}

export default function MenuItem({
  href,
  icon,
  label,
  isCollapsed,
  hasDropdown = false,
  dropdownItems = [],
}: MenuItemProps) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const pathname = usePathname();
  const path = pathname.split('/').slice(2);
  const currentPath = path.includes(label.toLowerCase())
  const isDashboard = path.length == 0 && label.toLowerCase() == 'dashboard';

  return (
    <div>
      <Link href={href} onClick={(e) => hasDropdown && e.preventDefault() } className={cn("flex items-center p-4 text-accent3 font-medium hover:bg-accent3/80 hover:text-primary-foreground/80 rounded-md transition-colors duration-150 ease-in-out",
        currentPath && 'bg-accent3/80 text-primary-foreground/80',
        isDashboard && 'bg-accent3/80 text-primary-foreground/80'
      )}>
        {icon}
        {!isCollapsed && <span className="ml-3">{label}</span>}
        {hasDropdown && (
          <button
            onClick={(e) => {
                setIsDropdownOpen(!isDropdownOpen)
                if(hasDropdown) e.preventDefault();
                }
            }
            className="ml-auto text-gray-300 hover:text-white focus:outline-none"
          >
            <ChevronDownIcon size={18} />
          </button>
        )}
      </Link>
      
      {hasDropdown && isDropdownOpen && (
        <div className={`pl-10 space-y-1 ${isCollapsed ? 'hidden' : ''}`}>
          {dropdownItems?.map((item, index) => (
            <Link
              key={index}
              href={item.href}
              className="flex items-center p-2 text-accent3 font-medium hover:bg-accent3 hover:text-primary-foreground/80 rounded-md transition-colors duration-150 ease-in-out"
            >
              {item.icon}
              <span className="ml-2">{item.label}</span>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
