'use client'
import Link from "next/link";
import handleLogout from "@/app/actions/logout";
import { useState, useEffect } from "react";

export default function NavbarSignin() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      {/* ========== HEADER ========== */}
      <header className={`sticky top-0 left-0 right-0 z-50 w-full transition-all duration-300 ${isScrolled ? 'bg-white shadow-md' : 'bg-transparent'}`}>
        <nav className="container mx-auto flex items-center justify-between px-4 py-3 lg:px-6">
          <Link href="/" className="flex items-center">
            {/* Logo */}
            <img
              src="/PickMe_transparent.svg"
              alt="pickme-logo"
              className={`transition-all duration-300 ${isScrolled ? 'w-12 h-12' : 'w-16 h-16'} bg-white/60 rounded-xl p-1`}
            />
            {/* End Logo */}
          </Link>
          <div className="hidden md:flex items-center space-x-6 lg:space-x-12 font-cousine">
            <Link
              className="text-gray-800 hover:text-yellow-400 transition-colors duration-400 ease-in-out"
              href="/"
              aria-current="page"
            >
              Home
            </Link>
            <Link
              className="text-gray-800 hover:text-yellow-400 transition-colors duration-400 ease-in-out"
              href="/songs"
            >
              Songs
            </Link>
            <Link
              className="text-gray-800 hover:text-yellow-400 transition-colors duration-400 ease-in-out"
              href="/profile"
            >
              Profile
            </Link>
            <button
              className="text-gray-800 hover:text-yellow-400 transition-colors duration-400 ease-in-out"
              onClick={() => {
                handleLogout()
              }}
            >
              Sign Out
            </button>
          </div>
          <div className="md:hidden">
            {/* Toggle Button */}
            <button
              type="button"
              className="flex items-center p-2 text-gray-500 hover:text-gray-600"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <span className="sr-only">Toggle menu</span>
              {isMenuOpen ? (
                <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </nav>
        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              <Link
                href="/"
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50"
              >
                Home
              </Link>
              <Link
                href="/songs"
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50"
              >
                Songs
              </Link>
              <Link
                href="/profile"
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50"
              >
                Profile
              </Link>
              <button
                onClick={() => {
                  handleLogout()
                  setIsMenuOpen(false)
                }}
                className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50"
              >
                Sign Out
              </button>
            </div>
          </div>
        )}
      </header>
      {/* ========== END HEADER ========== */}
    </>
  );
}
