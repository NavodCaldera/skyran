import React, { useState, useRef, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { DEEP_SPACE_BLUE, CORPORATE_NAVY, CYBER_TEAL, LIGHT_SLATE, MID_SLATE, LUMINOUS_ACCENT } from '../constants';

const Navbar = () => {
    const location = useLocation();
    const [isOpen, setIsOpen] = useState(false); // Mobile menu state
    const [isDropdownOpen, setIsDropdownOpen] = useState(false); // Desktop dropdown
    const [isMarketDropdownOpen, setIsMarketDropdownOpen] = useState(false); // Desktop Market Insights submenu
    const [isMobileDropdownOpen, setIsMobileDropdownOpen] = useState(false); // Mobile dropdown
    const [isMobileMarketDropdownOpen, setIsMobileMarketDropdownOpen] = useState(false); // Mobile Market Insights submenu
    const [isScrolled, setIsScrolled] = useState(false); // Scroll state for navbar styling
    const dropdownRef = useRef(null);
    const marketDropdownRef = useRef(null);

    // Handle scroll effect
    useEffect(() => {
        const handleScroll = () => {
            const scrollTop = window.scrollY;
            setIsScrolled(scrollTop > 10);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Handle click outside to close dropdowns
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsDropdownOpen(false);
            }
            if (marketDropdownRef.current && !marketDropdownRef.current.contains(event.target)) {
                setIsMarketDropdownOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    // Close mobile menu when route changes
    useEffect(() => {
        setIsOpen(false);
        setIsMobileDropdownOpen(false);
        setIsMobileMarketDropdownOpen(false);
    }, [location]);

    // Helper function to check if link is active
    const isActiveLink = (path) => {
        return location.pathname === path;
    };

    // Helper function for link styling
    const getLinkStyle = (path) => ({
        color: isActiveLink(path) ? CYBER_TEAL : LIGHT_SLATE,
        fontWeight: isActiveLink(path) ? '600' : '400',
    });

    // Helper function for hover effects
    const handleLinkHover = (e, isEntering) => {
        if (isEntering) {
            e.target.style.color = CYBER_TEAL;
            e.target.style.transform = 'translateY(-1px)';
        } else {
            const isActive = isActiveLink(e.target.getAttribute('href'));
            e.target.style.color = isActive ? CYBER_TEAL : LIGHT_SLATE;
            e.target.style.transform = 'translateY(0)';
        }
    };

    return (
        <nav
            className={`
                shadow-lg transition-all duration-300 ease-in-out
                sticky top-0 left-0 w-full z-50
                ${isScrolled ? 'backdrop-blur-md bg-opacity-95' : 'bg-opacity-100'}
            `}
            style={{
                backgroundColor: isScrolled ? `${DEEP_SPACE_BLUE}F0` : DEEP_SPACE_BLUE,
                color: LIGHT_SLATE,
                borderBottom: `1px solid ${isScrolled ? CYBER_TEAL : MID_SLATE}`,
                boxShadow: isScrolled ? `0 4px 20px rgba(16, 207, 200, 0.1)` : `0 2px 10px rgba(0, 0, 0, 0.1)`
            }}
        >
            {/* Navbar Container */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    {/* Logo Section */}
                    <div className="flex items-center">
                        <Link
                            to="/"
                            className="flex items-center space-x-3 group transition-all duration-200"
                            onMouseEnter={(e) => {
                                e.currentTarget.style.transform = 'scale(1.05)';
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.transform = 'scale(1)';
                            }}
                        >
                            <div className="relative">
                                <img
                                    src="/logo.png"
                                    alt="Skyran Logo"
                                    className="h-10 w-10 transition-all duration-200 group-hover:drop-shadow-lg"
                                />
                                <div
                                    className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-20 transition-opacity duration-200"
                                    style={{ backgroundColor: CYBER_TEAL }}
                                ></div>
                            </div>
                            <span
                                className="font-bold text-2xl sm:text-3xl tracking-wide transition-all duration-200"
                                style={{
                                    color: LUMINOUS_ACCENT,
                                    textShadow: isScrolled ? `0 0 10px ${CYBER_TEAL}40` : 'none'
                                }}
                            >
                                Skyran
                            </span>
                        </Link>
                    </div>

                    {/* Desktop Menu */}
                    <div className="hidden lg:flex items-center space-x-6 xl:space-x-8">
                        {/* Features Dropdown */}
                        <div className="relative" ref={dropdownRef}>
                            <button
                                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                                className="flex items-center space-x-1 text-base font-medium transition-all duration-200 px-3 py-2 rounded-lg"
                                style={{
                                    color: isDropdownOpen ? CYBER_TEAL : LIGHT_SLATE,
                                    backgroundColor: isDropdownOpen ? `${CYBER_TEAL}20` : 'transparent'
                                }}
                                onMouseEnter={(e) => {
                                    if (!isDropdownOpen) {
                                        e.target.style.color = CYBER_TEAL;
                                        e.target.style.backgroundColor = `${CYBER_TEAL}10`;
                                    }
                                }}
                                onMouseLeave={(e) => {
                                    if (!isDropdownOpen) {
                                        e.target.style.color = LIGHT_SLATE;
                                        e.target.style.backgroundColor = 'transparent';
                                    }
                                }}
                            >
                                <span>Features</span>
                                <svg
                                    className={`w-4 h-4 transition-transform duration-200 ${isDropdownOpen ? 'rotate-180' : ''}`}
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                </svg>
                            </button>

                            {isDropdownOpen && (
                                <div
                                    className="absolute z-20 mt-3 w-64 rounded-xl shadow-2xl py-3 border animate-fadeIn"
                                    style={{
                                        backgroundColor: CORPORATE_NAVY,
                                        borderColor: `${CYBER_TEAL}40`,
                                        boxShadow: `0 20px 25px -5px rgba(0, 0, 0, 0.3), 0 10px 10px -5px rgba(0, 0, 0, 0.1), 0 0 0 1px ${CYBER_TEAL}20`
                                    }}
                                >
                                    <div className="px-3 py-2">
                                        <p
                                            className="text-xs font-semibold uppercase tracking-wider mb-2"
                                            style={{ color: MID_SLATE }}
                                        >
                                            Tools & Services
                                        </p>
                                    </div>

                                    <Link
                                        to="/portfolio-builder"
                                        className="flex items-center px-4 py-3 text-sm font-medium transition-all duration-200 group"
                                        style={{ color: isActiveLink('/portfolio-builder') ? CYBER_TEAL : LIGHT_SLATE }}
                                        onMouseEnter={(e) => {
                                            e.target.style.backgroundColor = `${CYBER_TEAL}15`;
                                            e.target.style.color = CYBER_TEAL;
                                            e.target.style.paddingLeft = '20px';
                                        }}
                                        onMouseLeave={(e) => {
                                            e.target.style.backgroundColor = 'transparent';
                                            e.target.style.color = isActiveLink('/portfolio-builder') ? CYBER_TEAL : LIGHT_SLATE;
                                            e.target.style.paddingLeft = '16px';
                                        }}
                                        onClick={() => setIsDropdownOpen(false)}
                                    >
                                        <svg className="w-4 h-4 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                                        </svg>
                                        <div>
                                            <div>AI Portfolio Builder</div>
                                            <div className="text-xs opacity-70">Smart investment planning</div>
                                        </div>
                                    </Link>

                                    <Link
                                        to="/talk-to-an-advisor"
                                        className="flex items-center px-4 py-3 text-sm font-medium transition-all duration-200 group"
                                        style={{ color: isActiveLink('/talk-to-an-advisor') ? CYBER_TEAL : LIGHT_SLATE }}
                                        onMouseEnter={(e) => {
                                            e.target.style.backgroundColor = `${CYBER_TEAL}15`;
                                            e.target.style.color = CYBER_TEAL;
                                            e.target.style.paddingLeft = '20px';
                                        }}
                                        onMouseLeave={(e) => {
                                            e.target.style.backgroundColor = 'transparent';
                                            e.target.style.color = isActiveLink('/talk-to-an-advisor') ? CYBER_TEAL : LIGHT_SLATE;
                                            e.target.style.paddingLeft = '16px';
                                        }}
                                        onClick={() => setIsDropdownOpen(false)}
                                    >
                                        <svg className="w-4 h-4 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                                        </svg>
                                        <div>
                                            <div>Talk to an Advisor</div>
                                            <div className="text-xs opacity-70">Expert consultation</div>
                                        </div>
                                    </Link>

                                    <div className="border-t border-opacity-20 my-2" style={{ borderColor: MID_SLATE }}></div>

                                    {/* Market Insights Submenu */}
                                    <div className="relative" ref={marketDropdownRef}>
                                        <button
                                            className="flex justify-between items-center w-full px-4 py-3 text-sm font-medium transition-all duration-200"
                                            style={{ color: isMarketDropdownOpen ? CYBER_TEAL : LIGHT_SLATE }}
                                            onClick={() => setIsMarketDropdownOpen(!isMarketDropdownOpen)}
                                            onMouseEnter={(e) => {
                                                if (!isMarketDropdownOpen) {
                                                    e.target.style.backgroundColor = `${CYBER_TEAL}15`;
                                                    e.target.style.color = CYBER_TEAL;
                                                    e.target.style.paddingLeft = '20px';
                                                }
                                            }}
                                            onMouseLeave={(e) => {
                                                if (!isMarketDropdownOpen) {
                                                    e.target.style.backgroundColor = 'transparent';
                                                    e.target.style.color = LIGHT_SLATE;
                                                    e.target.style.paddingLeft = '16px';
                                                }
                                            }}
                                        >
                                            <div className="flex items-center">
                                                <svg className="w-4 h-4 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                                                </svg>
                                                Market Insights
                                            </div>
                                            <svg
                                                className={`w-4 h-4 transition-transform duration-200 ${isMarketDropdownOpen ? 'rotate-90' : ''}`}
                                                fill="none"
                                                stroke="currentColor"
                                                viewBox="0 0 24 24"
                                            >
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                            </svg>
                                        </button>

                                        {isMarketDropdownOpen && (
                                            <div
                                                className="absolute left-full top-0 w-72 rounded-xl shadow-2xl py-3 border animate-fadeIn ml-2"
                                                style={{
                                                    backgroundColor: CORPORATE_NAVY,
                                                    borderColor: `${CYBER_TEAL}40`,
                                                    boxShadow: `0 20px 25px -5px rgba(0, 0, 0, 0.3), 0 10px 10px -5px rgba(0, 0, 0, 0.1), 0 0 0 1px ${CYBER_TEAL}20`
                                                }}
                                            >
                                                <div className="px-3 py-2">
                                                    <p
                                                        className="text-xs font-semibold uppercase tracking-wider mb-2"
                                                        style={{ color: MID_SLATE }}
                                                    >
                                                        Financial Markets
                                                    </p>
                                                </div>

                                                {[
                                                    { path: '/saving-account', name: 'Savings & Current', desc: 'Account rates comparison', icon: 'M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z' },
                                                    { path: '/fixed-deposit', name: 'Fixed Deposits', desc: 'Term deposit rates', icon: 'M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4' },
                                                    { path: '/unit-trust-rates', name: 'Unit Trusts', desc: 'Mutual fund performance', icon: 'M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z' },
                                                    { path: '/bonds', name: 'Bond Market', desc: 'Government & corporate bonds', icon: 'M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z' },
                                                    { path: '/share-market', name: 'Share Market', desc: 'Stock market data', icon: 'M13 7h8m0 0v8m0-8l-8 8-4-4-6 6' },
                                                    { path: '/gold-market', name: 'Gold Market', desc: 'Precious metals pricing', icon: 'M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z' }
                                                ].map((item) => (
                                                    <Link
                                                        key={item.path}
                                                        to={item.path}
                                                        className="flex items-center px-4 py-2.5 text-sm font-medium transition-all duration-200"
                                                        style={{ color: isActiveLink(item.path) ? CYBER_TEAL : LIGHT_SLATE }}
                                                        onMouseEnter={(e) => {
                                                            e.target.style.backgroundColor = `${CYBER_TEAL}15`;
                                                            e.target.style.color = CYBER_TEAL;
                                                            e.target.style.paddingLeft = '20px';
                                                        }}
                                                        onMouseLeave={(e) => {
                                                            e.target.style.backgroundColor = 'transparent';
                                                            e.target.style.color = isActiveLink(item.path) ? CYBER_TEAL : LIGHT_SLATE;
                                                            e.target.style.paddingLeft = '16px';
                                                        }}
                                                        onClick={() => {
                                                            setIsDropdownOpen(false);
                                                            setIsMarketDropdownOpen(false);
                                                        }}
                                                    >
                                                        <svg className="w-4 h-4 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={item.icon} />
                                                        </svg>
                                                        <div className="flex-1">
                                                            <div>{item.name}</div>
                                                            <div className="text-xs opacity-70">{item.desc}</div>
                                                        </div>
                                                    </Link>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Other Navigation Links */}
                        <Link
                            to="/dashboard"
                            className="text-base font-medium transition-all duration-200 px-3 py-2 rounded-lg"
                            style={getLinkStyle('/dashboard')}
                            onMouseEnter={(e) => handleLinkHover(e, true)}
                            onMouseLeave={(e) => handleLinkHover(e, false)}
                        >
                            Dashboard
                        </Link>

                        <Link
                            to="/learn"
                            className="text-base font-medium transition-all duration-200 px-3 py-2 rounded-lg"
                            style={getLinkStyle('/learn')}
                            onMouseEnter={(e) => handleLinkHover(e, true)}
                            onMouseLeave={(e) => handleLinkHover(e, false)}
                        >
                            Learn
                        </Link>

                        <Link
                            to="/login"
                            className="text-base font-medium transition-all duration-200 px-3 py-2 rounded-lg border border-transparent"
                            style={{
                                color: isActiveLink('/login') ? CYBER_TEAL : LIGHT_SLATE,
                                borderColor: isActiveLink('/login') ? CYBER_TEAL : 'transparent'
                            }}
                            onMouseEnter={(e) => {
                                e.target.style.color = CYBER_TEAL;
                                e.target.style.borderColor = CYBER_TEAL;
                                e.target.style.backgroundColor = `${CYBER_TEAL}10`;
                            }}
                            onMouseLeave={(e) => {
                                const isActive = isActiveLink('/login');
                                e.target.style.color = isActive ? CYBER_TEAL : LIGHT_SLATE;
                                e.target.style.borderColor = isActive ? CYBER_TEAL : 'transparent';
                                e.target.style.backgroundColor = 'transparent';
                            }}
                        >
                            Login
                        </Link>

                        <Link
                            to="/signup"
                            className="px-6 py-2.5 rounded-lg font-semibold text-sm transition-all duration-200 transform hover:scale-105 shadow-lg"
                            style={{
                                backgroundColor: CYBER_TEAL,
                                color: DEEP_SPACE_BLUE,
                                boxShadow: `0 4px 14px 0 ${CYBER_TEAL}40`
                            }}
                            onMouseEnter={(e) => {
                                e.target.style.backgroundColor = LUMINOUS_ACCENT;
                                e.target.style.color = DEEP_SPACE_BLUE;
                                e.target.style.boxShadow = `0 6px 20px 0 ${LUMINOUS_ACCENT}40`;
                            }}
                            onMouseLeave={(e) => {
                                e.target.style.backgroundColor = CYBER_TEAL;
                                e.target.style.color = DEEP_SPACE_BLUE;
                                e.target.style.boxShadow = `0 4px 14px 0 ${CYBER_TEAL}40`;
                            }}
                        >
                            Sign Up
                        </Link>
                    </div>

                    {/* Mobile Menu Button */}
                    <div className="lg:hidden">
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="p-2 rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2"
                            style={{
                                color: LIGHT_SLATE,
                                backgroundColor: isOpen ? `${CYBER_TEAL}20` : 'transparent',
                                focusRingColor: CYBER_TEAL
                            }}
                            onMouseEnter={(e) => {
                                e.target.style.backgroundColor = `${CYBER_TEAL}20`;
                                e.target.style.color = CYBER_TEAL;
                            }}
                            onMouseLeave={(e) => {
                                e.target.style.backgroundColor = isOpen ? `${CYBER_TEAL}20` : 'transparent';
                                e.target.style.color = LIGHT_SLATE;
                            }}
                            aria-label="Toggle mobile menu"
                        >
                            <svg
                                className={`h-6 w-6 transition-transform duration-200 ${isOpen ? 'rotate-90' : ''}`}
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
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
            <div
                className={`lg:hidden overflow-hidden transition-all duration-300 ease-in-out ${
                    isOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0'
                }`}
                style={{
                    backgroundColor: `${CORPORATE_NAVY}F5`,
                    backdropFilter: 'blur(10px)',
                    borderTop: `1px solid ${MID_SLATE}40`
                }}
            >
                <div className="px-4 py-6 space-y-3">
                    {/* Mobile Features Dropdown */}
                    <div className="space-y-2">
                        <button
                            onClick={() => setIsMobileDropdownOpen(!isMobileDropdownOpen)}
                            className="flex items-center justify-between w-full text-left px-3 py-3 rounded-lg font-medium transition-all duration-200"
                            style={{
                                color: isMobileDropdownOpen ? CYBER_TEAL : LIGHT_SLATE,
                                backgroundColor: isMobileDropdownOpen ? `${CYBER_TEAL}20` : 'transparent'
                            }}
                        >
                            <span>Features</span>
                            <svg
                                className={`w-5 h-5 transition-transform duration-200 ${isMobileDropdownOpen ? 'rotate-180' : ''}`}
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7 7" />
                            </svg>
                        </button>

                        <div
                            className={`overflow-hidden transition-all duration-300 ${
                                isMobileDropdownOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                            }`}
                        >
                            <div className="pl-6 pt-2 space-y-2">
                                <Link
                                    to="/portfolio-builder"
                                    className="flex items-center px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200"
                                    style={{ color: isActiveLink('/portfolio-builder') ? CYBER_TEAL : LIGHT_SLATE }}
                                    onClick={() => {
                                        setIsOpen(false);
                                        setIsMobileDropdownOpen(false);
                                    }}
                                >
                                    <svg className="w-4 h-4 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                                    </svg>
                                    AI Portfolio Builder
                                </Link>

                                <Link
                                    to="/talk-to-an-advisor"
                                    className="flex items-center px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200"
                                    style={{ color: isActiveLink('/talk-to-an-advisor') ? CYBER_TEAL : LIGHT_SLATE }}
                                    onClick={() => {
                                        setIsOpen(false);
                                        setIsMobileDropdownOpen(false);
                                    }}
                                >
                                    <svg className="w-4 h-4 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                                    </svg>
                                    Talk to an Advisor
                                </Link>

                                {/* Mobile Market Insights Submenu */}
                                <div className="pt-2">
                                    <button
                                        onClick={() => setIsMobileMarketDropdownOpen(!isMobileMarketDropdownOpen)}
                                        className="flex items-center justify-between w-full px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200"
                                        style={{
                                            color: isMobileMarketDropdownOpen ? CYBER_TEAL : LIGHT_SLATE,
                                            backgroundColor: isMobileMarketDropdownOpen ? `${CYBER_TEAL}15` : 'transparent'
                                        }}
                                    >
                                        <div className="flex items-center">
                                            <svg className="w-4 h-4 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                                            </svg>
                                            Market Insights
                                        </div>
                                        <svg
                                            className={`w-4 h-4 transition-transform duration-200 ${isMobileMarketDropdownOpen ? 'rotate-180' : ''}`}
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                        >
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7 7" />
                                        </svg>
                                    </button>

                                    <div
                                        className={`overflow-hidden transition-all duration-300 ${
                                            isMobileMarketDropdownOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                                        }`}
                                    >
                                        <div className="pl-6 pt-2 space-y-1">
                                            {[
                                                { path: '/saving-account', name: 'Savings & Current' },
                                                { path: '/fixed-deposit', name: 'Fixed Deposits' },
                                                { path: '/unit-trust-rates', name: 'Unit Trusts' },
                                                { path: '/bonds', name: 'Bond Market' },
                                                { path: '/share-market', name: 'Share Market' },
                                                { path: '/gold-market', name: 'Gold Market' }
                                            ].map((item) => (
                                                <Link
                                                    key={item.path}
                                                    to={item.path}
                                                    className="block px-3 py-2 rounded-lg text-sm transition-all duration-200"
                                                    style={{ color: isActiveLink(item.path) ? CYBER_TEAL : MID_SLATE }}
                                                    onClick={() => setIsOpen(false)}
                                                >
                                                    {item.name}
                                                </Link>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Other Mobile Links */}
                    <div className="space-y-2 pt-4 border-t border-opacity-20" style={{ borderColor: MID_SLATE }}>
                        <Link
                            to="/dashboard"
                            className="block px-3 py-3 rounded-lg font-medium transition-all duration-200"
                            style={{ color: isActiveLink('/dashboard') ? CYBER_TEAL : LIGHT_SLATE }}
                            onClick={() => setIsOpen(false)}
                        >
                            Dashboard
                        </Link>

                        <Link
                            to="/learn"
                            className="block px-3 py-3 rounded-lg font-medium transition-all duration-200"
                            style={{ color: isActiveLink('/learn') ? CYBER_TEAL : LIGHT_SLATE }}
                            onClick={() => setIsOpen(false)}
                        >
                            Learn
                        </Link>

                        <Link
                            to="/login"
                            className="block px-3 py-3 rounded-lg font-medium transition-all duration-200"
                            style={{ color: isActiveLink('/login') ? CYBER_TEAL : LIGHT_SLATE }}
                            onClick={() => setIsOpen(false)}
                        >
                            Login
                        </Link>

                        <Link
                            to="/signup"
                            className="block mx-3 mt-4 px-6 py-3 rounded-lg font-semibold text-center transition-all duration-200"
                            style={{
                                backgroundColor: CYBER_TEAL,
                                color: DEEP_SPACE_BLUE
                            }}
                            onClick={() => setIsOpen(false)}
                        >
                            Sign Up
                        </Link>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
