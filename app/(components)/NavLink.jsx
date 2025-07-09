'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import clsx from 'clsx'; // Optional: install if you want cleaner conditional classes

export default function NavLink({ href, children }) {
  const pathname = usePathname();

  const isActive = pathname === href;

  return (
    <Link
      href={href}
      className={clsx(
        'transition hover:text-[#de6a2a]',
        isActive ? 'text-[#de6a2a] ' : 'text-gray-700'
      )}
    >
      {children}
    </Link>
  );
}
