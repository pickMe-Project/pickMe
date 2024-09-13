'use client'
import Link from "next/link";
import { useState, useEffect } from "react";

export default function Navbar() {
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
                        <img src="/PickMe_transparent.svg" alt="pickme-logo" className={`transition-all duration-300 ${isScrolled ? 'w-12 h-12' : 'w-16 h-16'} bg-white/60 rounded-xl p-1`} />
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
                            href="/login"
                        >
                            Sign In
                        </Link>
                        <Link
                            className="text-gray-800 hover:text-yellow-400 transition-colors duration-400 ease-in-out"
                            href="/register"
                        >
                            Sign Up
                        </Link>
                    </div>
                    <div className="md:hidden">
                        {/* Toggle Button */}
                        <button
                            type="button"
                            className="flex justify-center items-center w-10 h-10 text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 rounded-full"
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                            aria-expanded={isMenuOpen}
                            aria-label="Toggle navigation"
                        >
                            {isMenuOpen ? (
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            ) : (
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                                </svg>
                            )}
                        </button>
                        {/* End Toggle Button */}
                    </div>
                </nav>
                {/* Mobile Menu */}
                <div
                    className={`md:hidden transition-all duration-300 ease-in-out ${
                        isMenuOpen ? 'max-h-64 opacity-100' : 'max-h-0 opacity-0'
                    } overflow-hidden`}
                >
                    <div className="px-4 py-3 space-y-3 bg-white shadow-lg">
                        <Link
                            className="block text-gray-800 hover:text-yellow-400 transition-colors duration-400 ease-in-out"
                            href="/"
                            onClick={() => setIsMenuOpen(false)}
                        >
                            Home
                        </Link>
                        <Link
                            className="block text-gray-800 hover:text-yellow-400 transition-colors duration-400 ease-in-out"
                            href="/songs"
                            onClick={() => setIsMenuOpen(false)}
                        >
                            Songs
                        </Link>
                        <Link
                            className="block text-gray-800 hover:text-yellow-400 transition-colors duration-400 ease-in-out"
                            href="/login"
                            onClick={() => setIsMenuOpen(false)}
                        >
                            Sign In
                        </Link>
                        <Link
                            className="block text-gray-800 hover:text-yellow-400 transition-colors duration-400 ease-in-out"
                            href="/register"
                            onClick={() => setIsMenuOpen(false)}
                        >
                            Sign Up
                        </Link>
                    </div>
                </div>
                {/* End Mobile Menu */}
            </header>
            {/* ========== END HEADER ========== */}
        </>
    )
}