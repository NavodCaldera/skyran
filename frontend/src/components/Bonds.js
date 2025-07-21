import React, { useState, useMemo, useEffect } from 'react';
import {
  DEEP_SPACE_BLUE,
  CORPORATE_NAVY,
  CYBER_TEAL,
  LUMINOUS_ACCENT,
  LIGHT_SLATE,
  MID_SLATE,
  VIBRANT_GREEN,
  WARNING_AMBER,
  ERROR_RED
} from '../constants';

// --- Helper Components & Mock Data (kept in one file for simplicity) ---

// Enhanced bond data with comprehensive information
const mockBondData = [
  {
    id: 1,
    issuer: 'Sri Lanka Treasury Bond',
    type: 'Government',
    maturity: '2028-05-15',
    couponRate: 14.50,
    faceValue: 100000,
    currentPrice: 98500,
    yield: 14.85,
    rating: 'B+',
    minInvestment: 100000,
    paymentFrequency: 'Semi-annually',
    sector: 'Government',
    lastUpdated: '2024-01-18',
    description: 'Sri Lankan Government Treasury Bond with sovereign backing'
  },
  {
    id: 2,
    issuer: 'Sri Lanka Treasury Bond',
    type: 'Government',
    maturity: '2033-07-01',
    couponRate: 13.75,
    faceValue: 100000,
    currentPrice: 96200,
    yield: 14.32,
    rating: 'B+',
    minInvestment: 100000,
    paymentFrequency: 'Semi-annually',
    sector: 'Government',
    lastUpdated: '2024-01-18',
    description: 'Long-term Sri Lankan Government Treasury Bond'
  },
  {
    id: 3,
    issuer: 'John Keells Holdings PLC',
    type: 'Corporate',
    maturity: '2029-12-01',
    couponRate: 15.25,
    faceValue: 100000,
    currentPrice: 101200,
    yield: 14.95,
    rating: 'A-',
    minInvestment: 250000,
    paymentFrequency: 'Quarterly',
    sector: 'Conglomerate',
    lastUpdated: '2024-01-17',
    description: 'Leading diversified conglomerate in Sri Lanka'
  },
  {
    id: 4,
    issuer: 'Dialog Axiata PLC',
    type: 'Corporate',
    maturity: '2027-09-20',
    couponRate: 15.00,
    faceValue: 100000,
    currentPrice: 99800,
    yield: 15.12,
    rating: 'BBB+',
    minInvestment: 200000,
    paymentFrequency: 'Quarterly',
    sector: 'Telecommunications',
    lastUpdated: '2024-01-16',
    description: 'Leading telecommunications provider in Sri Lanka'
  },
  {
    id: 5,
    issuer: 'LOLC Holdings PLC',
    type: 'Corporate',
    maturity: '2030-06-30',
    couponRate: 16.10,
    faceValue: 100000,
    currentPrice: 102500,
    yield: 15.65,
    rating: 'BBB',
    minInvestment: 300000,
    paymentFrequency: 'Quarterly',
    sector: 'Financial Services',
    lastUpdated: '2024-01-15',
    description: 'Diversified financial services group'
  },
  {
    id: 6,
    issuer: 'Sri Lanka Treasury Bond',
    type: 'Government',
    maturity: '2026-02-01',
    couponRate: 15.50,
    faceValue: 100000,
    currentPrice: 99200,
    yield: 15.95,
    rating: 'B+',
    minInvestment: 100000,
    paymentFrequency: 'Semi-annually',
    sector: 'Government',
    lastUpdated: '2024-01-18',
    description: 'Short-term Sri Lankan Government Treasury Bond'
  },
  {
    id: 7,
    issuer: 'Sampath Bank PLC',
    type: 'Corporate',
    maturity: '2028-11-10',
    couponRate: 14.80,
    faceValue: 100000,
    currentPrice: 100500,
    yield: 14.55,
    rating: 'A',
    minInvestment: 200000,
    paymentFrequency: 'Quarterly',
    sector: 'Banking',
    lastUpdated: '2024-01-17',
    description: 'Leading commercial bank in Sri Lanka'
  },
  {
    id: 8,
    issuer: 'Commercial Bank of Ceylon PLC',
    type: 'Corporate',
    maturity: '2029-03-15',
    couponRate: 14.90,
    faceValue: 100000,
    currentPrice: 100200,
    yield: 14.85,
    rating: 'A',
    minInvestment: 200000,
    paymentFrequency: 'Quarterly',
    sector: 'Banking',
    lastUpdated: '2024-01-16',
    description: 'One of Sri Lanka\'s largest commercial banks'
  },
  {
    id: 9,
    issuer: 'Ceylon Electricity Board',
    type: 'Government',
    maturity: '2031-08-20',
    couponRate: 14.25,
    faceValue: 100000,
    currentPrice: 97800,
    yield: 14.68,
    rating: 'B+',
    minInvestment: 150000,
    paymentFrequency: 'Semi-annually',
    sector: 'Utilities',
    lastUpdated: '2024-01-18',
    description: 'Government-owned electricity utility company'
  },
  {
    id: 10,
    issuer: 'Hemas Holdings PLC',
    type: 'Corporate',
    maturity: '2027-12-31',
    couponRate: 15.75,
    faceValue: 100000,
    currentPrice: 101800,
    yield: 15.35,
    rating: 'BBB+',
    minInvestment: 250000,
    paymentFrequency: 'Quarterly',
    sector: 'Healthcare & Consumer',
    lastUpdated: '2024-01-15',
    description: 'Diversified healthcare and consumer goods company'
  }
];

const FAQItem = ({ question, children }) => {
    const [isOpen, setIsOpen] = useState(false);
    return (
        <div className="border-b border-slate-700 py-4">
            <button className="w-full flex justify-between items-center text-left text-lg font-semibold text-slate-100" onClick={() => setIsOpen(!isOpen)}>
                <span>{question}</span>
                <span className={`transform transition-transform duration-300 ${isOpen ? 'rotate-180' : 'rotate-0'}`}>▼</span>
            </button>
            {isOpen && <div className="mt-4 text-slate-300 leading-relaxed animate-fade-in">{children}</div>}
        </div>
    );
};

const RiskTag = ({ type }) => {
    const isGov = type === 'Government';
    const bgColor = isGov ? 'bg-green-500/20' : 'bg-yellow-500/20';
    const textColor = isGov ? 'text-green-300' : 'text-yellow-300';
    const text = isGov ? 'Very Low' : 'Low-Moderate';

    return <span className={`px-3 py-1 text-sm font-semibold rounded-full ${bgColor} ${textColor}`}>{text}</span>;
};


// --- The Main Bonds Component (Updated) ---

const Bonds = () => {
    // Enhanced state management
    const [filterType, setFilterType] = useState('All');
    const [filterSector, setFilterSector] = useState('All');
    const [sortBy, setSortBy] = useState('yield'); // 'yield', 'couponRate', 'maturity', 'rating'
    const [sortOrder, setSortOrder] = useState('desc');
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedBond, setSelectedBond] = useState(null);
    const [showCalculator, setShowCalculator] = useState(false);

    // Calculator state
    const [investmentAmount, setInvestmentAmount] = useState(500000);
    const [calculatorResults, setCalculatorResults] = useState(null);

    // Enhanced filtering and sorting
    const filteredAndSortedData = useMemo(() => {
        let filtered = mockBondData.filter(bond => {
            const matchesType = filterType === 'All' || bond.type === filterType;
            const matchesSector = filterSector === 'All' || bond.sector === filterSector;
            const matchesSearch = bond.issuer.toLowerCase().includes(searchTerm.toLowerCase()) ||
                                bond.sector.toLowerCase().includes(searchTerm.toLowerCase());
            return matchesType && matchesSector && matchesSearch;
        });

        // Sort the data
        filtered.sort((a, b) => {
            let comparison = 0;

            switch (sortBy) {
                case 'yield':
                    comparison = a.yield - b.yield;
                    break;
                case 'couponRate':
                    comparison = a.couponRate - b.couponRate;
                    break;
                case 'maturity':
                    comparison = new Date(a.maturity) - new Date(b.maturity);
                    break;
                case 'rating':
                    const ratingOrder = { 'A': 4, 'A-': 3, 'BBB+': 2, 'BBB': 1, 'B+': 0 };
                    comparison = (ratingOrder[a.rating] || 0) - (ratingOrder[b.rating] || 0);
                    break;
                case 'issuer':
                    comparison = a.issuer.localeCompare(b.issuer);
                    break;
                default:
                    comparison = a.yield - b.yield;
            }

            return sortOrder === 'asc' ? comparison : -comparison;
        });

        return filtered;
    }, [filterType, filterSector, searchTerm, sortBy, sortOrder]);

    // Get unique sectors for filter
    const sectors = useMemo(() => {
        const uniqueSectors = [...new Set(mockBondData.map(bond => bond.sector))];
        return ['All', ...uniqueSectors];
    }, []);

    // Bond calculator
    const calculateBondReturns = (bond, amount) => {
        const years = (new Date(bond.maturity) - new Date()) / (365.25 * 24 * 60 * 60 * 1000);
        const totalCoupons = (amount / bond.faceValue) * bond.faceValue * (bond.couponRate / 100) * years;
        const capitalGain = (amount / bond.faceValue) * (bond.faceValue - bond.currentPrice);
        const totalReturn = totalCoupons + capitalGain;

        const paymentsPerYear = bond.paymentFrequency === 'Quarterly' ? 4 : 2;
        const totalPayments = Math.floor(years * paymentsPerYear);
        const couponPerPayment = (amount / bond.faceValue) * bond.faceValue * (bond.couponRate / 100) / paymentsPerYear;

        return {
            totalInvestment: amount,
            totalCoupons: totalCoupons,
            capitalGain: capitalGain,
            totalReturn: totalReturn,
            annualizedReturn: (totalReturn / amount) / years * 100,
            couponPerPayment: couponPerPayment,
            totalPayments: totalPayments,
            maturityValue: (amount / bond.faceValue) * bond.faceValue,
            years: years
        };
    };

    // Update calculator when bond or amount changes
    useEffect(() => {
        if (selectedBond) {
            const results = calculateBondReturns(selectedBond, investmentAmount);
            setCalculatorResults(results);
        }
    }, [selectedBond, investmentAmount]);

    // Helper functions
    const formatCurrency = (amount) => {
        return new Intl.NumberFormat('en-LK', {
            style: 'currency',
            currency: 'LKR',
            minimumFractionDigits: 0,
            maximumFractionDigits: 0,
        }).format(amount);
    };

    const getRatingColor = (rating) => {
        const ratingColors = {
            'A': VIBRANT_GREEN,
            'A-': CYBER_TEAL,
            'BBB+': WARNING_AMBER,
            'BBB': WARNING_AMBER,
            'B+': ERROR_RED
        };
        return ratingColors[rating] || MID_SLATE;
    };

    const getYearsToMaturity = (maturityDate) => {
        const years = (new Date(maturityDate) - new Date()) / (365.25 * 24 * 60 * 60 * 1000);
        return years.toFixed(1);
    };

    return (
        <div
            className="min-h-screen text-white"
            style={{ backgroundColor: DEEP_SPACE_BLUE }}
        >
            <div className="max-w-7xl mx-auto p-6 md:p-8">

                {/* Section 1: Hero */}
                <section className="text-center mb-16 md:mb-20 animate-fade-in">
                    <h1
                        className="text-4xl md:text-6xl font-bold font-sans leading-tight pb-4 text-transparent bg-clip-text bg-gradient-to-r from-cyber-teal to-luminous-accent"
                    >
                        Bond Market Intelligence
                    </h1>
                    <p className="mt-2 max-w-3xl mx-auto text-lg text-slate-300">
                       When you buy a bond, you're lending money to the government or a top Sri Lankan company. In return, you get paid back with regular, fixed interest. It’s one of the most reliable ways to earn.
                    </p>
                </section>
                
                {/* Enhanced Bond Calculator Section */}
                <section className="mb-16 md:mb-20">
                    <div
                        className="max-w-6xl mx-auto p-6 md:p-8 rounded-xl shadow-lg border"
                        style={{
                            backgroundColor: CORPORATE_NAVY,
                            borderColor: MID_SLATE
                        }}
                    >
                        <h2 className="text-2xl md:text-3xl font-bold text-center mb-8" style={{ color: CYBER_TEAL }}>
                            Bond Investment Calculator
                        </h2>

                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                            {/* Calculator Inputs */}
                            <div className="space-y-6">
                                <div>
                                    <label className="block text-lg font-medium mb-3" style={{ color: LIGHT_SLATE }}>
                                        Investment Amount (LKR)
                                    </label>
                                    <input
                                        type="number"
                                        value={investmentAmount}
                                        onChange={(e) => setInvestmentAmount(Number(e.target.value) || 0)}
                                        className="w-full px-4 py-3 rounded-lg border-2 focus:outline-none focus:ring-2 transition-all duration-200"
                                        style={{
                                            backgroundColor: DEEP_SPACE_BLUE,
                                            borderColor: MID_SLATE,
                                            color: LIGHT_SLATE
                                        }}
                                        placeholder="500,000"
                                    />
                                </div>

                                <div>
                                    <label className="block text-lg font-medium mb-3" style={{ color: LIGHT_SLATE }}>
                                        Select Bond for Calculation
                                    </label>
                                    <select
                                        value={selectedBond?.id || ''}
                                        onChange={(e) => {
                                            const bond = mockBondData.find(b => b.id === Number(e.target.value));
                                            setSelectedBond(bond);
                                        }}
                                        className="w-full px-4 py-3 rounded-lg border-2 focus:outline-none focus:ring-2 transition-all duration-200"
                                        style={{
                                            backgroundColor: DEEP_SPACE_BLUE,
                                            borderColor: MID_SLATE,
                                            color: LIGHT_SLATE
                                        }}
                                    >
                                        <option value="">Choose a bond...</option>
                                        {mockBondData.map(bond => (
                                            <option key={bond.id} value={bond.id}>
                                                {bond.issuer} - {bond.couponRate}% ({getYearsToMaturity(bond.maturity)} years)
                                            </option>
                                        ))}
                                    </select>
                                </div>

                                {selectedBond && (
                                    <div
                                        className="p-4 rounded-lg border-l-4"
                                        style={{
                                            backgroundColor: DEEP_SPACE_BLUE,
                                            borderLeftColor: CYBER_TEAL
                                        }}
                                    >
                                        <h4 className="font-semibold mb-2" style={{ color: LIGHT_SLATE }}>
                                            Selected Bond Details
                                        </h4>
                                        <div className="space-y-1 text-sm">
                                            <div className="flex justify-between">
                                                <span style={{ color: MID_SLATE }}>Coupon Rate:</span>
                                                <span style={{ color: LIGHT_SLATE }}>{selectedBond.couponRate}%</span>
                                            </div>
                                            <div className="flex justify-between">
                                                <span style={{ color: MID_SLATE }}>Current Yield:</span>
                                                <span style={{ color: VIBRANT_GREEN }}>{selectedBond.yield}%</span>
                                            </div>
                                            <div className="flex justify-between">
                                                <span style={{ color: MID_SLATE }}>Rating:</span>
                                                <span
                                                    className="px-2 py-1 rounded text-xs font-bold"
                                                    style={{
                                                        backgroundColor: getRatingColor(selectedBond.rating),
                                                        color: DEEP_SPACE_BLUE
                                                    }}
                                                >
                                                    {selectedBond.rating}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>

                            {/* Calculator Results */}
                            {calculatorResults && (
                                <div
                                    className="p-6 rounded-lg"
                                    style={{ backgroundColor: DEEP_SPACE_BLUE }}
                                >
                                    <h3 className="text-xl font-semibold mb-6" style={{ color: CYBER_TEAL }}>
                                        Investment Projection
                                    </h3>

                                    <div className="space-y-4">
                                        <div className="flex justify-between items-center">
                                            <span style={{ color: MID_SLATE }}>Total Investment:</span>
                                            <span className="font-medium text-lg" style={{ color: LIGHT_SLATE }}>
                                                {formatCurrency(calculatorResults.totalInvestment)}
                                            </span>
                                        </div>

                                        <div className="flex justify-between items-center">
                                            <span style={{ color: MID_SLATE }}>Total Coupon Payments:</span>
                                            <span className="font-medium text-lg" style={{ color: VIBRANT_GREEN }}>
                                                {formatCurrency(calculatorResults.totalCoupons)}
                                            </span>
                                        </div>

                                        <div className="flex justify-between items-center">
                                            <span style={{ color: MID_SLATE }}>Capital Gain/Loss:</span>
                                            <span
                                                className="font-medium text-lg"
                                                style={{
                                                    color: calculatorResults.capitalGain >= 0 ? VIBRANT_GREEN : ERROR_RED
                                                }}
                                            >
                                                {formatCurrency(calculatorResults.capitalGain)}
                                            </span>
                                        </div>

                                        <div className="flex justify-between items-center">
                                            <span style={{ color: MID_SLATE }}>Annualized Return:</span>
                                            <span className="font-medium" style={{ color: WARNING_AMBER }}>
                                                {calculatorResults.annualizedReturn.toFixed(2)}%
                                            </span>
                                        </div>

                                        <div
                                            className="flex justify-between items-center border-t pt-4"
                                            style={{ borderTopColor: MID_SLATE }}
                                        >
                                            <span className="font-semibold text-lg" style={{ color: LIGHT_SLATE }}>
                                                Total Return:
                                            </span>
                                            <span className="font-bold text-2xl" style={{ color: CYBER_TEAL }}>
                                                {formatCurrency(calculatorResults.totalReturn)}
                                            </span>
                                        </div>
                                    </div>

                                    <div className="mt-6 p-4 rounded-lg" style={{ backgroundColor: `${CYBER_TEAL}10` }}>
                                        <h4 className="font-semibold mb-2" style={{ color: LIGHT_SLATE }}>
                                            Payment Schedule
                                        </h4>
                                        <div className="text-sm space-y-1">
                                            <div className="flex justify-between">
                                                <span style={{ color: MID_SLATE }}>Payment Frequency:</span>
                                                <span style={{ color: LIGHT_SLATE }}>{selectedBond.paymentFrequency}</span>
                                            </div>
                                            <div className="flex justify-between">
                                                <span style={{ color: MID_SLATE }}>Coupon per Payment:</span>
                                                <span style={{ color: LIGHT_SLATE }}>
                                                    {formatCurrency(calculatorResults.couponPerPayment)}
                                                </span>
                                            </div>
                                            <div className="flex justify-between">
                                                <span style={{ color: MID_SLATE }}>Total Payments:</span>
                                                <span style={{ color: LIGHT_SLATE }}>{calculatorResults.totalPayments}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </section>

                {/* Enhanced Filtering Section */}
                <section className="mb-16 md:mb-20">
                    <div className="mb-8">
                        <h2 className="text-3xl font-bold text-center mb-8" style={{ color: CYBER_TEAL }}>
                            Bond Market Overview
                        </h2>

                        {/* Enhanced Filters */}
                        <div
                            className="p-6 rounded-lg mb-6"
                            style={{ backgroundColor: CORPORATE_NAVY }}
                        >
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                                {/* Type Filter */}
                                <div>
                                    <label className="block text-sm font-medium mb-2" style={{ color: LIGHT_SLATE }}>
                                        Bond Type
                                    </label>
                                    <select
                                        value={filterType}
                                        onChange={(e) => setFilterType(e.target.value)}
                                        className="w-full px-3 py-2 rounded-lg border focus:outline-none focus:ring-2"
                                        style={{
                                            backgroundColor: DEEP_SPACE_BLUE,
                                            borderColor: MID_SLATE,
                                            color: LIGHT_SLATE
                                        }}
                                    >
                                        <option value="All">All Types</option>
                                        <option value="Government">Government</option>
                                        <option value="Corporate">Corporate</option>
                                    </select>
                                </div>

                                {/* Sector Filter */}
                                <div>
                                    <label className="block text-sm font-medium mb-2" style={{ color: LIGHT_SLATE }}>
                                        Sector
                                    </label>
                                    <select
                                        value={filterSector}
                                        onChange={(e) => setFilterSector(e.target.value)}
                                        className="w-full px-3 py-2 rounded-lg border focus:outline-none focus:ring-2"
                                        style={{
                                            backgroundColor: DEEP_SPACE_BLUE,
                                            borderColor: MID_SLATE,
                                            color: LIGHT_SLATE
                                        }}
                                    >
                                        {sectors.map(sector => (
                                            <option key={sector} value={sector}>{sector}</option>
                                        ))}
                                    </select>
                                </div>

                                {/* Sort By */}
                                <div>
                                    <label className="block text-sm font-medium mb-2" style={{ color: LIGHT_SLATE }}>
                                        Sort By
                                    </label>
                                    <select
                                        value={sortBy}
                                        onChange={(e) => setSortBy(e.target.value)}
                                        className="w-full px-3 py-2 rounded-lg border focus:outline-none focus:ring-2"
                                        style={{
                                            backgroundColor: DEEP_SPACE_BLUE,
                                            borderColor: MID_SLATE,
                                            color: LIGHT_SLATE
                                        }}
                                    >
                                        <option value="yield">Yield</option>
                                        <option value="couponRate">Coupon Rate</option>
                                        <option value="maturity">Maturity</option>
                                        <option value="rating">Credit Rating</option>
                                        <option value="issuer">Issuer Name</option>
                                    </select>
                                </div>

                                {/* Search */}
                                <div>
                                    <label className="block text-sm font-medium mb-2" style={{ color: LIGHT_SLATE }}>
                                        Search
                                    </label>
                                    <input
                                        type="text"
                                        placeholder="Search bonds..."
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                        className="w-full px-3 py-2 rounded-lg border focus:outline-none focus:ring-2"
                                        style={{
                                            backgroundColor: DEEP_SPACE_BLUE,
                                            borderColor: MID_SLATE,
                                            color: LIGHT_SLATE
                                        }}
                                    />
                                </div>
                            </div>

                            {/* Sort Order Toggle */}
                            <div className="mt-4 flex justify-end">
                                <button
                                    onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
                                    className="px-4 py-2 rounded-lg font-medium transition-all duration-200 hover:opacity-80 flex items-center space-x-2"
                                    style={{ backgroundColor: CYBER_TEAL, color: DEEP_SPACE_BLUE }}
                                >
                                    <span>{sortOrder === 'asc' ? 'Ascending' : 'Descending'}</span>
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        {sortOrder === 'asc' ? (
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                                        ) : (
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                        )}
                                    </svg>
                                </button>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Enhanced Bond Market Table */}
                <section>
                    <div
                        className="rounded-lg overflow-hidden border"
                        style={{
                            backgroundColor: CORPORATE_NAVY,
                            borderColor: MID_SLATE
                        }}
                    >
                        <div className="overflow-x-auto">
                            <table className="w-full text-left">
                                <thead style={{ backgroundColor: DEEP_SPACE_BLUE }}>
                                    <tr>
                                        <th className="px-6 py-4 font-semibold" style={{ color: LIGHT_SLATE }}>Issuer</th>
                                        <th className="px-6 py-4 font-semibold" style={{ color: LIGHT_SLATE }}>Type</th>
                                        <th className="px-6 py-4 font-semibold" style={{ color: LIGHT_SLATE }}>Coupon Rate</th>
                                        <th className="px-6 py-4 font-semibold" style={{ color: LIGHT_SLATE }}>Current Yield</th>
                                        <th className="px-6 py-4 font-semibold" style={{ color: LIGHT_SLATE }}>Maturity</th>
                                        <th className="px-6 py-4 font-semibold" style={{ color: LIGHT_SLATE }}>Rating</th>
                                        <th className="px-6 py-4 font-semibold" style={{ color: LIGHT_SLATE }}>Min Investment</th>
                                        <th className="px-6 py-4 font-semibold" style={{ color: LIGHT_SLATE }}>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {filteredAndSortedData.length > 0 ? filteredAndSortedData.map((bond, index) => (
                                        <tr
                                            key={bond.id}
                                            className="border-t hover:bg-opacity-50 transition-all duration-200"
                                            style={{
                                                borderTopColor: MID_SLATE,
                                                backgroundColor: index % 2 === 0 ? `${DEEP_SPACE_BLUE}30` : 'transparent'
                                            }}
                                        >
                                            <td className="px-6 py-4">
                                                <div className="flex items-center space-x-3">
                                                    <div
                                                        className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold"
                                                        style={{ backgroundColor: CYBER_TEAL, color: DEEP_SPACE_BLUE }}
                                                    >
                                                        {bond.issuer.charAt(0)}
                                                    </div>
                                                    <div>
                                                        <div className="font-medium" style={{ color: LIGHT_SLATE }}>
                                                            {bond.issuer}
                                                        </div>
                                                        <div className="text-sm" style={{ color: MID_SLATE }}>
                                                            {bond.sector}
                                                        </div>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <span
                                                    className="px-3 py-1 rounded-full text-xs font-medium"
                                                    style={{
                                                        backgroundColor: bond.type === 'Government' ? `${VIBRANT_GREEN}20` : `${WARNING_AMBER}20`,
                                                        color: bond.type === 'Government' ? VIBRANT_GREEN : WARNING_AMBER
                                                    }}
                                                >
                                                    {bond.type}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="text-xl font-bold" style={{ color: CYBER_TEAL }}>
                                                    {bond.couponRate.toFixed(2)}%
                                                </div>
                                                <div className="text-sm" style={{ color: MID_SLATE }}>
                                                    {bond.paymentFrequency}
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="text-xl font-bold" style={{ color: VIBRANT_GREEN }}>
                                                    {bond.yield.toFixed(2)}%
                                                </div>
                                                <div className="text-sm" style={{ color: MID_SLATE }}>
                                                    Current Price: {formatCurrency(bond.currentPrice)}
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <div style={{ color: LIGHT_SLATE }}>
                                                    {new Date(bond.maturity).toLocaleDateString('en-GB', {
                                                        year: 'numeric',
                                                        month: 'short',
                                                        day: 'numeric'
                                                    })}
                                                </div>
                                                <div className="text-sm" style={{ color: MID_SLATE }}>
                                                    {getYearsToMaturity(bond.maturity)} years
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <span
                                                    className="px-2 py-1 rounded text-xs font-bold"
                                                    style={{
                                                        backgroundColor: getRatingColor(bond.rating),
                                                        color: DEEP_SPACE_BLUE
                                                    }}
                                                >
                                                    {bond.rating}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4" style={{ color: LIGHT_SLATE }}>
                                                {formatCurrency(bond.minInvestment)}
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="flex space-x-2">
                                                    <button
                                                        onClick={() => {
                                                            setSelectedBond(bond);
                                                            setShowCalculator(true);
                                                        }}
                                                        className="px-3 py-1 rounded text-xs font-medium transition-all duration-200 hover:opacity-80"
                                                        style={{
                                                            backgroundColor: CYBER_TEAL,
                                                            color: DEEP_SPACE_BLUE
                                                        }}
                                                    >
                                                        Calculate
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    )) : (
                                        <tr>
                                            <td colSpan="8" className="text-center py-12">
                                                <div className="text-6xl mb-4">📊</div>
                                                <h3 className="text-xl font-semibold mb-2" style={{ color: LIGHT_SLATE }}>
                                                    No bonds found
                                                </h3>
                                                <p style={{ color: MID_SLATE }}>
                                                    Try adjusting your filters or search terms
                                                </p>
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </section>

                {/* Section 4: FAQ */}
                <section className="max-w-3xl mx-auto pt-20">
                    <h2 className="text-3xl font-bold text-center mb-10">Understanding Bonds</h2>
                    <FAQItem question="What is a 'Coupon Rate'?">
                        <p>The "coupon rate" is simply the fixed annual interest rate that the bond pays to you, the investor. If a bond has a 15% coupon rate, you will receive 15% of your initial investment amount as interest each year.</p>
                    </FAQItem>
                    <FAQItem question="What does 'Maturity' mean?">
                        <p>The "maturity date" is the date when the bond expires. On this date, the issuer (the government or company) pays you back your original investment amount in full. This concludes the investment.</p>
                    </FAQItem>
                    <FAQItem question="Can I sell a bond before it matures?">
                        <p>Yes, many bonds can be sold on a secondary market before their maturity date. However, the price you get might be higher or lower than your initial investment, depending on changes in overall market interest rates. Our platform is designed to help you understand these options.</p>
                    </FAQItem>
                </section>

            </div>
        </div>
    );
};

export default Bonds;