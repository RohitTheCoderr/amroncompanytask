'use client'; // Needed for using useState in App Router
import Image from "next/image";
import Link from "next/link";
import { ShoppingCartIcon, UserIcon, Bars3Icon } from '@heroicons/react/24/outline';
import { useEffect, useRef, useState } from "react";
import NavLink from "./NavLink";
import { useSelector } from "react-redux";

function Navbar() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const dropdownRef = useRef(null);

  // const cartCount = useSelector(state =>
  //   Array.isArray(state.cart?.items)
  //     ? state.cart.items.reduce((sum, item) => sum + item.quantity, 0)
  //     : 0
  // );

  const cartCount = useSelector(state =>(state.cart?.items));

  console.log("count", cartCount?.length);
  

  // Close dropdown when clicked outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Close dropdown after clicking a link
  const handleLinkClick = () => {
    setIsDropdownOpen(false);
  };


  return (
    <header className="w-full h-20 flex justify-between items-center px-6 sm:px-12 shadow-md bg-white">

      {/* Logo */}
      <Link href={"/"}>
        <div className="w-32 relative h-12">
          <Image
            src="/images/logo.png" // Place your logo at /public/images/logo.png
            alt="Logo"
            fill
            className="object-contain"
          />
        </div>
      </Link>

      {/* Navigation Links */}
      <nav className="hidden sm:flex gap-6 text-gray-700 font-medium">
        <NavLink href="/">Home</NavLink>
        <NavLink href="/about">About</NavLink>
        <NavLink href="/service">Service</NavLink>
      </nav>

      {/* Cart & User */}
      <div className="w-[10rem] flex gap-6 items-center justify-end text-gray-700 font-medium">
        <Link href="/cart">
          <div className="relative cursor-pointer">
            <ShoppingCartIcon className="h-6 w-6 text-gray-700 hover:text-[#de6a2a]" />
            <span className="absolute -top-2 -right-2 bg-[#de6a2a] text-white text-xs px-1.5 py-0.5 rounded-full">
              {cartCount?.length}
            </span>
          </div>
        </Link>
        {/* Menu Icon (Hamburger) */}
        <div
          onClick={() => setIsDropdownOpen((prev) => !prev)}
          className="cursor-pointer"
        >
          <Bars3Icon className="h-6 w-6 text-gray-700 hover:text-[#de6a2a]" />
        </div>

        {/* Dropdown */}
        {isDropdownOpen && (
          <div
            ref={dropdownRef}
            className="absolute top-16 right-0 bg-white shadow-md border border-gray-200 rounded-md w-40 py-2 z-50">
            {/* Desktop Links */}
            <div className="block sm:hidden border-b-2 mb-2 border-gray-300">
              <Link href="/" onClick={handleLinkClick} className="block px-4 py-1 hover:bg-gray-100">Home</Link>
              <Link href="/about" onClick={handleLinkClick} className="block px-4 py-1 hover:bg-gray-100">About</Link>
              <Link href="/services" onClick={handleLinkClick} className="block px-4 py-1 hover:bg-gray-100">Services</Link>
            </div>

            {/* Always Show Order History */}
            <div className="">
              <h3 className="font-bold px-4 bg-gray-200">For User</h3>
            </div>
            <Link href="/orders" onClick={handleLinkClick} className="block px-4 py-1 hover:bg-gray-100">Order History</Link>
          </div>
        )}
      </div>
    </header >
  );
}

export default Navbar;
