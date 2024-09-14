'use client'
import { usePathname } from 'next/navigation';
import Link from 'next/link';

export default function Breadcrumb() {
  const pathName = usePathname();
  const pathSegments = pathName.split('/').filter((segment) => segment)

  return (
    <nav className="py-4 backdrop-blur-3xl border-b border-b-primary/5">
      <ol className="flex flex-wrap items-center space-x-2 text-sm text-primary">
        <li>
          <Link href="/" className="text-accent3 hover:underline">
            Home
          </Link>
        </li>
        {pathSegments?.map((segment, index) => {
          const segmentPath = `/${pathSegments.slice(0, index + 1).join('/')}`;
          return (
            <li key={index} className="flex items-center space-x-2">
              <span className='text-primary font-medium'>/</span>
              <Link href={segmentPath} className="text-accent3 hover:underline capitalize">
                {segment.replace(/-/g, ' ')}
              </Link>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
