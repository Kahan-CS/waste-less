"use client"
import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import logo from "@/public/images/logo.png"

const NavBar = () => {

    const [menuOpen, setMenuOpen] = useState(false);

    const toggleMenu = () => {
    setMenuOpen(!menuOpen);
    };

    const closeMenu = () => {
    setMenuOpen(false);
    };

    // Close the menu when clicking outside
    useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuOpen && !(e.target as HTMLElement).closest('.menu')) {
      closeMenu();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [menuOpen]);
    return(
    <header className="bg-[#AFE1AF] shadow-md border-b border-gray-200 sticky top-0 z-50">
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">
        {/* Logo Section */}
        <Link href="/" className="flex items-center space-x-2">
          <Image src={logo} alt="Logo" width={40} height={40} />
          <span className="text-2xl font-bold">Waste Less</span>
        </Link>

        {/* Hamburger Icon */}
        <button
          onClick={toggleMenu}
          className="lg:hidden block text-2xl focus:outline-none"
          aria-label="Toggle menu"
        >
          ☰
        </button>

        {/* Overlay for blurring the background */}
        {menuOpen && (
          <div className="fixed inset-0 bg-opacity-50 backdrop-blur-sm z-40" onClick={closeMenu}></div>
        )}

        {/* Navigation Links */}
        <nav
          className={`menu lg:flex lg:space-x-4 absolute lg:static top-16 right-6 bg-white w-48 lg:w-auto shadow-lg lg:shadow-none rounded-lg lg:rounded-none p-4 lg:p-0 z-50 transform transition-transform duration-300 ${
            menuOpen ? 'block' : 'hidden'
          }`}
        >
          <ul className="flex flex-col lg:flex-row lg:items-center divide-y lg:divide-y-0 lg:divide-x divide-gray-200">
            <li onClick={closeMenu}>
              <Link href="/cart" className="block py-2 px-4 hover:bg-gray-100 hover:text-[#AFE1AF]">
                Cart
              </Link>
            </li>
            <li onClick={closeMenu}>
              <Link href="/orders" className="block py-2 px-4 hover:bg-gray-100 hover:text-[#AFE1AF]">
                Orders
              </Link>
            </li>
            <li onClick={closeMenu}>
              <Link href="/login" className="block py-2 px-4 hover:bg-gray-100 hover:text-[#AFE1AF]">
                Login/Signup
              </Link>
            </li>
            
          </ul>
        </nav>
      </div>
    </header>
    );
};

export default NavBar;