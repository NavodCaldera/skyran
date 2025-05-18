import React, { useState, useRef } from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false); // Mobile menu state
    const [isDropdownOpen, setIsDropdownOpen] = useState(false); // Desktop dropdown
    const [isMarketDropdownOpen, setIsMarketDropdownOpen] = useState(false); // Desktop Market Insights submenu
    const [isMobileDropdownOpen, setIsMobileDropdownOpen] = useState(false); // Mobile dropdown
    const [isMobileMarketDropdownOpen, setIsMobileMarketDropdownOpen] = useState(false); // Mobile Market Insights submenu
    const [showHeader, setShowHeader] = useState(true); // Scroll reveal state
    const dropdownRef = useRef(null);

    return (
        <nav
            className={`
                bg-[#18426c] text-white shadow-md transition-all duration-300
                sticky top-0 left-0 w-full z-50 px-0 rounded-none
                ${showHeader ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}
            `}
            style={{ transition: 'opacity 0.3s, top 0.3s' }}
        >
            {/* Navbar Container */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    {/* Logo Section */}
                    <div className="flex items-center">
                        <Link to="/" className="flex items-center space-x-2">
                            <img src="/logo.png" alt="Logo" className="h-9 w-9" />
                            <span className="text-white font-semibold text-3xl tracking-wide">Skyran</span>
                        </Link>
                    </div>

                    {/* Desktop Menu */}
                    <div className="hidden md:flex items-center space-x-8">
                        {/* Features Dropdown */}
                        <div className="relative" ref={dropdownRef}>
                            <button
                                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                                className="text-white hover:text-[#181E23] text-base transition-colors duration-200"
                            >
                                Features ▾
                            </button>

                            {isDropdownOpen && (
                                <div className="absolute z-10 mt-2 w-56 bg-[#2E3944] rounded-lg shadow-lg py-2">
                                    <Link
                                        to="/portfolio-builder"
                                        className="block px-4 py-2 text-sm hover:bg-[#10cfc8] hover:text-white transition duration-150"
                                    >
                                        Investment Planner
                                    </Link>
                                    <Link
                                        to="/advisor"
                                        className="block px-4 py-2 text-sm hover:bg-[#10cfc8] hover:text-white transition duration-150"
                                    >
                                        Talk to an Advisor
                                    </Link>

                                    {/* Market Insights Submenu */}
                                    <div
                                        className="relative group"
                                        onMouseEnter={() => setIsMarketDropdownOpen(true)}
                                        onMouseLeave={() => setIsMarketDropdownOpen(false)}
                                    >
                                        <button
                                            className="flex justify-between items-center w-full px-4 py-2 text-sm hover:bg-[#10cfc8] hover:text-white transition duration-150"
                                            onClick={() => setIsMarketDropdownOpen(!isMarketDropdownOpen)}
                                            type="button"
                                        >
                                            Market Insights
                                            <span className="ml-2">▶</span>
                                        </button>

                                        {isMarketDropdownOpen && (
                                            <div className="absolute left-full top-0 w-64 bg-[#2E3944] rounded-lg shadow-lg py-2 z-20">
                                                <Link to="/saving-account" className="block px-4 py-2 text-sm hover:bg-[#10cfc8] hover:text-white transition duration-150">
                                                    Saving &amp; Current Accounts
                                                </Link>
                                                <Link to="/fixed-deposit" className="block px-4 py-2 text-sm hover:bg-[#10cfc8] hover:text-white transition duration-150">
                                                    Fixed Deposit
                                                </Link>
                                                <Link to="/unit-trust-rates" className="block px-4 py-2 text-sm hover:bg-[#10cfc8] hover:text-white transition duration-150">
                                                    Unit Trust
                                                </Link>
                                                <Link to="/bonds" className="block px-4 py-2 text-sm hover:bg-[#10cfc8] hover:text-white transition duration-150">
                                                    Bond Market
                                                </Link>
                                                <Link to="/share-market" className="block px-4 py-2 text-sm hover:bg-[#10cfc8] hover:text-white transition duration-150">
                                                    Share Market
                                                </Link>
                                                <Link to="/gold-market" className="block px-4 py-2 text-sm hover:bg-[#10cfc8] hover:text-white transition duration-150">
                                                    Gold Market
                                                </Link>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Other Links */}
                        <Link to="/dashboard" className="text-white hover:text-[#181E23] text-base transition-colors duration-200">
                            Dashboard
                        </Link>
                        <Link to="/learn" className="text-white hover:text-[#181E23] text-base transition-colors duration-200">
                            Learn
                        </Link>
                        <Link to="/login" className="text-white hover:text-[#181E23] transition duration-200">
                            Login
                        </Link>
                        <Link
                            to="/signup"
                            className="bg-[#10cfc8] text-white px-4 py-2 rounded-lg hover:text-[#181E23] transition duration-200"
                        >
                            Sign Up
                        </Link>
                    </div>

                    {/* Mobile Menu Button */}
                    <div className="md:hidden">
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="text-white hover:text-[#181E23]"
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

            {/* Mobile Menu Content */}
            {isOpen && (
                <div className="md:hidden bg-[#14778f] px-4 py-4 space-y-2">
                    {/* Mobile Features Dropdown */}
                    <div>
                        <button
                            onClick={() => setIsMobileDropdownOpen(!isMobileDropdownOpen)}
                            className="block w-full text-left text-white hover:text-[#181E23]"
                        >
                            Features ▾
                        </button>

                        {isMobileDropdownOpen && (
                            <div className="pl-4 mt-1 space-y-1">
                                <Link
                                    to="/portfolio-builder"
                                    className="block text-white hover:text-[#181E23] transition duration-150"
                                    onClick={() => {
                                        setIsOpen(false);
                                        setIsMobileDropdownOpen(false);
                                    }}
                                >
                                    Investment Planner
                                </Link>
                                <Link
                                    to="/advisor"
                                    className="block text-white hover:text-[#181E23] transition duration-150"
                                    onClick={() => {
                                        setIsOpen(false);
                                        setIsMobileDropdownOpen(false);
                                    }}
                                >
                                    Talk to an Advisor
                                </Link>

                                {/* Mobile Market Insights Submenu */}
                                <div>
                                    <button
                                        onClick={() => setIsMobileMarketDropdownOpen(!isMobileMarketDropdownOpen)}
                                        className="block w-full text-left text-white hover:text-[#181E23] pl-2"
                                    >
                                        Market Insights ▾
                                    </button>

                                    {isMobileMarketDropdownOpen && (
                                        <div className="pl-4 mt-1 space-y-1">
                                            <Link to="/saving-account" className="block text-white hover:text-[#181E23] transition duration-150" onClick={() => setIsOpen(false)}>Saving &amp; Current Accounts</Link>
                                            <Link to="/fixed-deposit" className="block text-white hover:text-[#181E23] transition duration-150" onClick={() => setIsOpen(false)}>Fixed Deposit</Link>
                                            <Link to="/unit-trust-rates" className="block text-white hover:text-[#181E23] transition duration-150" onClick={() => setIsOpen(false)}>Unit Trust</Link>
                                            <Link to="/bonds" className="block text-white hover:text-[#181E23] transition duration-150" onClick={() => setIsOpen(false)}>Bond Market</Link>
                                            <Link to="/share-market" className="block text-white hover:text-[#181E23] transition duration-150" onClick={() => setIsOpen(false)}>Share Market</Link>
                                            <Link to="/gold-market" className="block text-white hover:text-[#181E23] transition duration-150" onClick={() => setIsOpen(false)}>Gold Market</Link>
                                        </div>
                                    )}
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Other Mobile Links */}
                    <Link to="/dashboard" className="block text-white hover:text-[#181E23]" onClick={() => setIsOpen(false)}>
                        Dashboard
                    </Link>
                    <Link to="/learn" className="block text-white hover:text-[#181E23]" onClick={() => setIsOpen(false)}>
                        Learn
                    </Link>
                    <Link to="/login" className="block text-white hover:text-[#181E23]" onClick={() => setIsOpen(false)}>
                        Login
                    </Link>
                    <Link
                        to="/signup"
                        className="inline-block bg-[#10cfc8] text-white px-4 py-2 rounded-lg hover:text-[#181E23]"
                        onClick={() => setIsOpen(false)}
                    >
                        Sign Up
                    </Link>
                </div>
            )}
        </nav>
    );
};

export default Navbar;
