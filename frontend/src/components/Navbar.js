import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    return (
        <nav className="bg-[#18426c] text-[#fff] shadow-md">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    {/* Logo and Name */}
                    <Link to="/" className="flex items-center space-x-2">
                        <img src="/logo.png" alt="Logo" className="h-9 w-9" />
                        <span className="text-[#fff] font-semibold text-3xl tracking-wide">Skyran</span>
                    </Link>


                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center space-x-8">
                        {/* Features Dropdown */}
                        <div className="relative">
                            <button
                                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                                className="text-[#fff] hover:text-[#181E23] text-base transition-colors duration-200"
                            >
                                Features ▾
                            </button>
                            {isDropdownOpen && (
                                <div className="absolute z-10 mt-2 w-56 bg-[#2E3944] rounded-lg shadow-lg py-2">
                                    {[
                                        { path: "/portfolio-builder", label: "Portfolio Builder" },
                                        { path: "/saving-account", label: "Saving Account" },
                                        { path: "/unit-trust-rates", label: "Unit Trust" },
                                        { path: "/fixed-deposit", label: "Fixed Deposit" },
                                        { path: "/bonds", label: "Bonds" },
                                        { path: "/share-market", label: "Share Market" },
                                        { path: "/gold-market", label: "Gold Market" },
                                    ].map(({ path, label }) => (
                                        <Link
                                            key={path}
                                            to={path}
                                            className="block px-4 py-2 text-sm hover:bg-[#10cfc8] hover:text-white transition duration-150"
                                        >
                                            {label}
                                        </Link>
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* Dashboard Tab */}
                        <Link
                            to="/dashboard"
                            className="text-[#fff] hover:text-[#181E23] text-base transition-colors duration-200"
                        >
                            Dashboard
                        </Link>

                        <Link
                            to="/dashboard"
                            className="text-[#fff] hover:text-[#181E23] text-base transition-colors duration-200"
                        >
                            Learn
                        </Link>

                        {/* Auth Buttons */}
                        <Link
                            to="/login"
                            className="text-[#fff] hover:text-[#181E23] transition duration-200"
                        >
                            Login
                        </Link>
                        <Link
                            to="/signup"
                            className="bg-[#10cfc8] text-[#fff] px-4 py-2 rounded-lg hover:text-[#181E23] transition duration-200"

                        >
                            Sign Up
                        </Link>
                    </div>

                    {/* Mobile menu toggle */}
                    <div className="md:hidden">
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="text-[#fff] hover:text-[#181E23]"
                        >
                            <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                {isOpen ? (
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                ) : (
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                                )}
                            </svg>
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            {isOpen && (
                <div className="md:hidden bg-[#14778f] px-4 py-4 space-y-2">
                    {/* Features Dropdown in Mobile */}
                    <div>
                        <button
                            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                            className="block w-full text-left text-[#ffffff] hover:text-[#181E23]"
                        >
                            Features ▾
                        </button>
                        {isDropdownOpen && (
                            <div className="pl-4 mt-1 space-y-1">
                                {[
                                    { path: "/unit-trust-rates", label: "Unit Trust" },
                                    { path: "/fixed-deposit", label: "Fixed Deposit" },
                                    { path: "/bonds", label: "Bonds" },
                                    { path: "/portfolio-builder", label: "Portfolio Builder" },
                                    { path: "/share-market", label: "Share Market" },
                                ].map(({ path, label }) => (
                                    <Link
                                        key={path}
                                        to={path}
                                        className="block text-[#ffffff] hover:text-[#181E23] transition duration-150"
                                    >
                                        {label}
                                    </Link>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Dashboard and Learn tabs */}
                    <Link to="/dashboard" className="block text-[#ffffff] hover:text-[#181E23]">
                        Dashboard
                    </Link>
                    <Link to="/learn" className="block text-[#ffffff] hover:text-[#181E23]">
                        Learn
                    </Link>

                    {/* Auth Buttons */}
                    <Link to="/login" className="block text-[#ffffff] hover:text-[#181E23]">
                        Login
                    </Link>
                    <Link
                        to="/signup"
                        className="inline-block bg-[#10cfc8] text-white px-4 py-2 rounded-lg hover:text-[#181E23]"
                    >
                        Sign Up
                    </Link>
                </div>
            )}

        </nav>
    );
};

export default Navbar;
