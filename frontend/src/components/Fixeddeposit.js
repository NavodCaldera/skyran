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

// Enhanced mock data with more comprehensive information
const mockFdData = [
  {
    id: 1,
    name: 'Commercial Bank',
    type: 'Bank',
    logo: 'path/to/comm-bank.png',
    rating: 'AA+',
    minAmount: 25000,
    features: ['Online Banking', 'Mobile App', 'Auto Renewal'],
    lastUpdated: '2024-01-15',
    rates: [
      { period: '3m', rate: 13.5, compound: 'Monthly' },
      { period: '6m', rate: 14.5, compound: 'Quarterly' },
      { period: '1yr', rate: 15.0, compound: 'Quarterly' },
      { period: '2yr', rate: 14.8, compound: 'Semi-annually' },
      { period: '5yr', rate: 14.5, compound: 'Annually' }
    ]
  },
  {
    id: 2,
    name: 'Sampath Bank',
    type: 'Bank',
    logo: 'path/to/sampath-bank.png',
    rating: 'AA',
    minAmount: 50000,
    features: ['Digital Banking', 'SMS Alerts', 'Flexible Terms'],
    lastUpdated: '2024-01-14',
    rates: [
      { period: '3m', rate: 13.25, compound: 'Monthly' },
      { period: '6m', rate: 14.25, compound: 'Quarterly' },
      { period: '1yr', rate: 14.75, compound: 'Quarterly' },
      { period: '2yr', rate: 14.6, compound: 'Semi-annually' },
      { period: '5yr', rate: 14.3, compound: 'Annually' }
    ]
  },
  {
    id: 3,
    name: 'Hatton National Bank',
    type: 'Bank',
    logo: 'path/to/hnb.png',
    rating: 'AA-',
    minAmount: 30000,
    features: ['HNB SOLO', 'Internet Banking', 'Phone Banking'],
    lastUpdated: '2024-01-16',
    rates: [
      { period: '3m', rate: 13.0, compound: 'Monthly' },
      { period: '6m', rate: 14.0, compound: 'Quarterly' },
      { period: '1yr', rate: 14.5, compound: 'Quarterly' },
      { period: '2yr', rate: 14.3, compound: 'Semi-annually' },
      { period: '5yr', rate: 14.0, compound: 'Annually' }
    ]
  },
  {
    id: 4,
    name: 'LOLC Finance',
    type: 'Finance',
    logo: 'path/to/lolc.png',
    rating: 'A+',
    minAmount: 100000,
    features: ['High Returns', 'Flexible Terms', 'Quick Processing'],
    lastUpdated: '2024-01-13',
    rates: [
      { period: '3m', rate: 15.5, compound: 'Monthly' },
      { period: '6m', rate: 16.0, compound: 'Quarterly' },
      { period: '1yr', rate: 16.5, compound: 'Quarterly' },
      { period: '2yr', rate: 16.2, compound: 'Semi-annually' },
      { period: '5yr', rate: 15.8, compound: 'Annually' }
    ]
  },
  {
    id: 5,
    name: 'LB Finance',
    type: 'Finance',
    logo: 'path/to/lb.png',
    rating: 'A',
    minAmount: 75000,
    features: ['Competitive Rates', 'Easy Application', 'Quick Approval'],
    lastUpdated: '2024-01-12',
    rates: [
      { period: '3m', rate: 15.0, compound: 'Monthly' },
      { period: '6m', rate: 15.75, compound: 'Quarterly' },
      { period: '1yr', rate: 16.25, compound: 'Quarterly' },
      { period: '2yr', rate: 16.0, compound: 'Semi-annually' },
      { period: '5yr', rate: 15.5, compound: 'Annually' }
    ]
  },
  {
    id: 6,
    name: 'Bank of Ceylon',
    type: 'Bank',
    logo: 'path/to/boc.png',
    rating: 'AA',
    minAmount: 20000,
    features: ['Government Backing', 'Island-wide Network', 'Reliable Service'],
    lastUpdated: '2024-01-17',
    rates: [
      { period: '3m', rate: 12.8, compound: 'Monthly' },
      { period: '6m', rate: 13.5, compound: 'Quarterly' },
      { period: '1yr', rate: 14.0, compound: 'Quarterly' },
      { period: '2yr', rate: 13.8, compound: 'Semi-annually' },
      { period: '5yr', rate: 13.5, compound: 'Annually' }
    ]
  },
  {
    id: 7,
    name: 'Nations Trust Bank',
    type: 'Bank',
    logo: 'path/to/ntb.png',
    rating: 'A+',
    minAmount: 40000,
    features: ['Premium Banking', 'Personalized Service', 'Investment Advisory'],
    lastUpdated: '2024-01-16',
    rates: [
      { period: '3m', rate: 13.2, compound: 'Monthly' },
      { period: '6m', rate: 14.1, compound: 'Quarterly' },
      { period: '1yr', rate: 14.6, compound: 'Quarterly' },
      { period: '2yr', rate: 14.4, compound: 'Semi-annually' },
      { period: '5yr', rate: 14.1, compound: 'Annually' }
    ]
  },
  {
    id: 8,
    name: 'Seylan Bank',
    type: 'Bank',
    logo: 'path/to/seylan.png',
    rating: 'A',
    minAmount: 35000,
    features: ['Digital First', 'Innovative Products', '24/7 Support'],
    lastUpdated: '2024-01-15',
    rates: [
      { period: '3m', rate: 13.1, compound: 'Monthly' },
      { period: '6m', rate: 14.0, compound: 'Quarterly' },
      { period: '1yr', rate: 14.4, compound: 'Quarterly' },
      { period: '2yr', rate: 14.2, compound: 'Semi-annually' },
      { period: '5yr', rate: 13.9, compound: 'Annually' }
    ]
  }
];

const periodOptions = [
    { label: '3 Months', value: '3m', months: 3 },
    { label: '6 Months', value: '6m', months: 6 },
    { label: '1 Year', value: '1yr', months: 12 },
    { label: '2 Years', value: '2yr', months: 24 },
    { label: '5 Years', value: '5yr', months: 60 },
];

const FAQItem = ({ question, children }) => {
    const [isOpen, setIsOpen] = useState(false);
    return (
        <div className="border-b border-slate-700 py-4">
            <button
                className="w-full flex justify-between items-center text-left text-lg font-semibold text-slate-100"
                onClick={() => setIsOpen(!isOpen)}
            >
                <span>{question}</span>
                <span className={`transform transition-transform duration-300 ${isOpen ? 'rotate-180' : 'rotate-0'}`}>▼</span>
            </button>
            {isOpen && <div className="mt-4 text-slate-300 leading-relaxed animate-fade-in">{children}</div>}
        </div>
    );
};


// --- The Main FixedDeposit Component ---

const FixedDeposit = () => {
    // State for the interactive calculator
    const [amount, setAmount] = useState(100000);
    const [calcPeriod, setCalcPeriod] = useState(12); // in months
    const [earnings, setEarnings] = useState({ interest: 0, total: 0, monthlyBreakdown: [] });
    const [compoundFrequency, setCompoundFrequency] = useState('Quarterly');
    const [selectedInstitution, setSelectedInstitution] = useState(null);

    // State for the comparison table filters
    const [filterPeriod, setFilterPeriod] = useState('1yr');
    const [filterType, setFilterType] = useState('All');
    const [searchTerm, setSearchTerm] = useState('');
    const [sortBy, setSortBy] = useState('rate'); // 'rate', 'name', 'minAmount'
    const [sortOrder, setSortOrder] = useState('desc'); // 'asc', 'desc'

    // State for advanced features
    const [showComparison, setShowComparison] = useState(false);
    const [comparisonList, setComparisonList] = useState([]);
    const [showCalculatorDetails, setShowCalculatorDetails] = useState(false);

    // --- Logic & Side Effects ---

    // Enhanced calculation with compound interest
    const calculateCompoundInterest = (principal, rate, time, compoundingFreq) => {
        const frequencies = {
            'Monthly': 12,
            'Quarterly': 4,
            'Semi-annually': 2,
            'Annually': 1
        };

        const n = frequencies[compoundingFreq] || 4;
        const r = rate / 100;
        const t = time / 12;

        const compoundAmount = principal * Math.pow((1 + r / n), n * t);
        const interest = compoundAmount - principal;

        return {
            interest: interest,
            total: compoundAmount,
            effectiveRate: ((compoundAmount / principal) - 1) * (12 / time) * 100
        };
    };

    // Effect to update calculator results when inputs change
    useEffect(() => {
        const selectedPeriodOption = periodOptions.find(p => p.months === calcPeriod);

        // Find the best rate for the selected period
        const availableRates = mockFdData
            .flatMap(inst => inst.rates.filter(r => r.period === selectedPeriodOption?.value))
            .sort((a, b) => b.rate - a.rate);

        if (availableRates.length > 0) {
            const bestRate = availableRates[0];
            const calculation = calculateCompoundInterest(
                amount,
                bestRate.rate,
                calcPeriod,
                bestRate.compound
            );

            // Generate monthly breakdown for visualization
            const monthlyBreakdown = [];
            for (let month = 1; month <= calcPeriod; month++) {
                const monthlyCalc = calculateCompoundInterest(amount, bestRate.rate, month, bestRate.compound);
                monthlyBreakdown.push({
                    month: month,
                    balance: monthlyCalc.total,
                    interest: monthlyCalc.interest
                });
            }

            setEarnings({
                interest: calculation.interest,
                total: calculation.total,
                effectiveRate: calculation.effectiveRate,
                monthlyBreakdown: monthlyBreakdown,
                bestRate: bestRate.rate,
                compoundFreq: bestRate.compound
            });
        } else {
            // Fallback calculation
            const defaultRate = 15.0;
            const calculation = calculateCompoundInterest(amount, defaultRate, calcPeriod, 'Quarterly');
            setEarnings({
                interest: calculation.interest,
                total: calculation.total,
                effectiveRate: calculation.effectiveRate,
                monthlyBreakdown: [],
                bestRate: defaultRate,
                compoundFreq: 'Quarterly'
            });
        }
    }, [amount, calcPeriod]);

    // Enhanced filtering and sorting logic
    const filteredAndSortedData = useMemo(() => {
        let filtered = mockFdData.filter(institution => {
            const matchesType = filterType === 'All' || institution.type === filterType;
            const matchesSearch = institution.name.toLowerCase().includes(searchTerm.toLowerCase());
            const hasSelectedPeriod = institution.rates.some(rate => rate.period === filterPeriod);
            return matchesType && matchesSearch && hasSelectedPeriod;
        });

        // Add rate for selected period to each institution for sorting
        filtered = filtered.map(institution => {
            const rateForPeriod = institution.rates.find(rate => rate.period === filterPeriod);
            return {
                ...institution,
                currentRate: rateForPeriod ? rateForPeriod.rate : 0,
                currentCompound: rateForPeriod ? rateForPeriod.compound : 'N/A'
            };
        });

        // Sort the data
        filtered.sort((a, b) => {
            let comparison = 0;

            switch (sortBy) {
                case 'rate':
                    comparison = a.currentRate - b.currentRate;
                    break;
                case 'name':
                    comparison = a.name.localeCompare(b.name);
                    break;
                case 'minAmount':
                    comparison = a.minAmount - b.minAmount;
                    break;
                case 'rating':
                    const ratingOrder = { 'AA+': 7, 'AA': 6, 'AA-': 5, 'A+': 4, 'A': 3, 'A-': 2, 'BBB+': 1 };
                    comparison = (ratingOrder[a.rating] || 0) - (ratingOrder[b.rating] || 0);
                    break;
                default:
                    comparison = a.currentRate - b.currentRate;
            }

            return sortOrder === 'asc' ? comparison : -comparison;
        });

        return filtered;
    }, [filterType, searchTerm, filterPeriod, sortBy, sortOrder]);

    // Helper functions
    const addToComparison = (institution) => {
        if (comparisonList.length < 3 && !comparisonList.find(item => item.id === institution.id)) {
            setComparisonList([...comparisonList, institution]);
        }
    };

    const removeFromComparison = (institutionId) => {
        setComparisonList(comparisonList.filter(item => item.id !== institutionId));
    };

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
            'AA+': VIBRANT_GREEN,
            'AA': VIBRANT_GREEN,
            'AA-': CYBER_TEAL,
            'A+': CYBER_TEAL,
            'A': WARNING_AMBER,
            'A-': WARNING_AMBER,
            'BBB+': ERROR_RED
        };
        return ratingColors[rating] || MID_SLATE;
    };


    // --- Render JSX ---

    return (
        <div className="min-h-screen text-white" style={{ backgroundColor: DEEP_SPACE_BLUE }}>
            <div className="max-w-7xl mx-auto px-4 py-12 md:py-20">

                {/* Enhanced Hero Section */}
                <section className="text-center mb-16 md:mb-20 animate-fade-in">
                    <h1 className="text-4xl md:text-6xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-cyber-teal to-luminous-accent">
                        Fixed Deposit Rates
                    </h1>
                    <p className="text-xl max-w-3xl mx-auto mb-8" style={{ color: MID_SLATE }}>
                        Compare the latest fixed deposit rates from leading banks and finance companies in Sri Lanka.
                        Find the best returns for your investment with our advanced calculator and comparison tools.
                    </p>

                    {/* Quick Stats */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
                        <div
                            className="p-6 rounded-lg text-center transform hover:scale-105 transition-transform duration-200"
                            style={{ backgroundColor: CORPORATE_NAVY }}
                        >
                            <div className="text-3xl font-bold mb-2" style={{ color: CYBER_TEAL }}>
                                {Math.max(...mockFdData.flatMap(inst => inst.rates.map(r => r.rate))).toFixed(1)}%
                            </div>
                            <div className="text-sm" style={{ color: MID_SLATE }}>Highest Rate Available</div>
                        </div>
                        <div
                            className="p-6 rounded-lg text-center transform hover:scale-105 transition-transform duration-200"
                            style={{ backgroundColor: CORPORATE_NAVY }}
                        >
                            <div className="text-3xl font-bold mb-2" style={{ color: CYBER_TEAL }}>
                                {mockFdData.length}
                            </div>
                            <div className="text-sm" style={{ color: MID_SLATE }}>Financial Institutions</div>
                        </div>
                        <div
                            className="p-6 rounded-lg text-center transform hover:scale-105 transition-transform duration-200"
                            style={{ backgroundColor: CORPORATE_NAVY }}
                        >
                            <div className="text-3xl font-bold mb-2" style={{ color: CYBER_TEAL }}>
                                {formatCurrency(Math.min(...mockFdData.map(inst => inst.minAmount)))}
                            </div>
                            <div className="text-sm" style={{ color: MID_SLATE }}>Minimum Investment</div>
                        </div>
                    </div>
                </section>

                {/* Enhanced Interactive Calculator */}
                <section className="mb-16 md:mb-20">
                    <div
                        className="max-w-6xl mx-auto p-6 md:p-8 rounded-xl shadow-lg border"
                        style={{
                            backgroundColor: CORPORATE_NAVY,
                            borderColor: MID_SLATE
                        }}
                    >
                        <h2 className="text-2xl md:text-3xl font-bold text-center mb-8" style={{ color: CYBER_TEAL }}>
                            Advanced FD Calculator
                        </h2>

                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                            {/* Enhanced Inputs */}
                            <div className="space-y-6">
                                <div>
                                    <label htmlFor="amount" className="block text-lg font-medium mb-3" style={{ color: LIGHT_SLATE }}>
                                        Initial Amount (LKR)
                                    </label>
                                    <input
                                        type="number"
                                        id="amount"
                                        value={amount}
                                        onChange={(e) => setAmount(Number(e.target.value) || 0)}
                                        className="w-full px-4 py-3 rounded-lg border-2 focus:outline-none focus:ring-2 transition-all duration-200"
                                        style={{
                                            backgroundColor: DEEP_SPACE_BLUE,
                                            borderColor: MID_SLATE,
                                            color: LIGHT_SLATE
                                        }}
                                        placeholder="100,000"
                                    />
                                </div>

                                <div>
                                    <label htmlFor="period" className="block text-lg font-medium mb-3" style={{ color: LIGHT_SLATE }}>
                                        Investment Period
                                    </label>
                                    <select
                                        id="period"
                                        value={calcPeriod}
                                        onChange={(e) => setCalcPeriod(Number(e.target.value))}
                                        className="w-full px-4 py-3 rounded-lg border-2 focus:outline-none focus:ring-2 transition-all duration-200"
                                        style={{
                                            backgroundColor: DEEP_SPACE_BLUE,
                                            borderColor: MID_SLATE,
                                            color: LIGHT_SLATE
                                        }}
                                    >
                                        {periodOptions.map(option => (
                                            <option key={option.months} value={option.months}>{option.label}</option>
                                        ))}
                                    </select>
                                </div>

                                {/* Best Rate Display */}
                                {earnings.bestRate && (
                                    <div
                                        className="p-4 rounded-lg border-l-4"
                                        style={{
                                            backgroundColor: DEEP_SPACE_BLUE,
                                            borderLeftColor: CYBER_TEAL
                                        }}
                                    >
                                        <h4 className="font-semibold mb-2" style={{ color: LIGHT_SLATE }}>
                                            Best Available Rate
                                        </h4>
                                        <div className="flex justify-between items-center">
                                            <span style={{ color: MID_SLATE }}>Rate:</span>
                                            <span className="text-xl font-bold" style={{ color: CYBER_TEAL }}>
                                                {earnings.bestRate}%
                                            </span>
                                        </div>
                                        <div className="flex justify-between items-center mt-1">
                                            <span style={{ color: MID_SLATE }}>Compounding:</span>
                                            <span style={{ color: LIGHT_SLATE }}>{earnings.compoundFreq}</span>
                                        </div>
                                    </div>
                                )}
                            </div>

                            {/* Enhanced Results */}
                            <div
                                className="p-6 rounded-lg"
                                style={{ backgroundColor: DEEP_SPACE_BLUE }}
                            >
                                <h3 className="text-xl font-semibold mb-6" style={{ color: CYBER_TEAL }}>
                                    Your Investment Returns
                                </h3>

                                <div className="space-y-4">
                                    <div className="flex justify-between items-center">
                                        <span style={{ color: MID_SLATE }}>Initial Amount:</span>
                                        <span className="font-medium text-lg" style={{ color: LIGHT_SLATE }}>
                                            {formatCurrency(amount)}
                                        </span>
                                    </div>

                                    <div className="flex justify-between items-center">
                                        <span style={{ color: MID_SLATE }}>Interest Earned:</span>
                                        <span className="font-medium text-lg" style={{ color: VIBRANT_GREEN }}>
                                            {formatCurrency(earnings.interest)}
                                        </span>
                                    </div>

                                    {earnings.effectiveRate && (
                                        <div className="flex justify-between items-center">
                                            <span style={{ color: MID_SLATE }}>Effective Annual Rate:</span>
                                            <span className="font-medium" style={{ color: WARNING_AMBER }}>
                                                {earnings.effectiveRate.toFixed(2)}%
                                            </span>
                                        </div>
                                    )}

                                    <div
                                        className="flex justify-between items-center border-t pt-4"
                                        style={{ borderTopColor: MID_SLATE }}
                                    >
                                        <span className="font-semibold text-lg" style={{ color: LIGHT_SLATE }}>
                                            Total Amount:
                                        </span>
                                        <span className="font-bold text-2xl" style={{ color: CYBER_TEAL }}>
                                            {formatCurrency(earnings.total)}
                                        </span>
                                    </div>
                                </div>

                                {/* Show Details Toggle */}
                                <button
                                    onClick={() => setShowCalculatorDetails(!showCalculatorDetails)}
                                    className="w-full mt-6 px-4 py-2 rounded-lg font-medium transition-all duration-200 hover:opacity-80"
                                    style={{ backgroundColor: CYBER_TEAL, color: DEEP_SPACE_BLUE }}
                                >
                                    {showCalculatorDetails ? 'Hide Details' : 'Show Monthly Breakdown'}
                                </button>

                                {/* Monthly Breakdown */}
                                {showCalculatorDetails && earnings.monthlyBreakdown.length > 0 && (
                                    <div className="mt-6">
                                        <h4 className="font-semibold mb-3" style={{ color: LIGHT_SLATE }}>
                                            Monthly Growth (Last 6 months)
                                        </h4>
                                        <div className="max-h-40 overflow-y-auto space-y-2">
                                            {earnings.monthlyBreakdown.slice(-6).map((month, index) => (
                                                <div key={month.month} className="flex justify-between text-sm">
                                                    <span style={{ color: MID_SLATE }}>Month {month.month}:</span>
                                                    <span style={{ color: LIGHT_SLATE }}>
                                                        {formatCurrency(month.balance)}
                                                    </span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </section>

                {/* Enhanced Filters & Comparison Section */}
                <section>
                    <div className="mb-8">
                        <h2 className="text-3xl font-bold text-center mb-8" style={{ color: CYBER_TEAL }}>
                            Compare Fixed Deposit Rates
                        </h2>

                        {/* Enhanced Filters */}
                        <div
                            className="p-6 rounded-lg mb-6"
                            style={{ backgroundColor: CORPORATE_NAVY }}
                        >
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                                {/* Period Filter */}
                                <div>
                                    <label className="block text-sm font-medium mb-2" style={{ color: LIGHT_SLATE }}>
                                        Investment Period
                                    </label>
                                    <select
                                        value={filterPeriod}
                                        onChange={(e) => setFilterPeriod(e.target.value)}
                                        className="w-full px-3 py-2 rounded-lg border focus:outline-none focus:ring-2"
                                        style={{
                                            backgroundColor: DEEP_SPACE_BLUE,
                                            borderColor: MID_SLATE,
                                            color: LIGHT_SLATE
                                        }}
                                    >
                                        {periodOptions.map(p => (
                                            <option key={p.value} value={p.value}>{p.label}</option>
                                        ))}
                                    </select>
                                </div>

                                {/* Type Filter */}
                                <div>
                                    <label className="block text-sm font-medium mb-2" style={{ color: LIGHT_SLATE }}>
                                        Institution Type
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
                                        <option value="Bank">Banks</option>
                                        <option value="Finance">Finance Companies</option>
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
                                        <option value="rate">Interest Rate</option>
                                        <option value="name">Institution Name</option>
                                        <option value="minAmount">Minimum Amount</option>
                                        <option value="rating">Credit Rating</option>
                                    </select>
                                </div>

                                {/* Search */}
                                <div>
                                    <label className="block text-sm font-medium mb-2" style={{ color: LIGHT_SLATE }}>
                                        Search
                                    </label>
                                    <input
                                        type="text"
                                        placeholder="Search institutions..."
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
                    {/* Enhanced Comparison Table */}
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
                                        <th className="px-6 py-4 font-semibold" style={{ color: LIGHT_SLATE }}>Institution</th>
                                        <th className="px-6 py-4 font-semibold" style={{ color: LIGHT_SLATE }}>Rate</th>
                                        <th className="px-6 py-4 font-semibold" style={{ color: LIGHT_SLATE }}>Min Amount</th>
                                        <th className="px-6 py-4 font-semibold" style={{ color: LIGHT_SLATE }}>Rating</th>
                                        <th className="px-6 py-4 font-semibold" style={{ color: LIGHT_SLATE }}>Your Earnings</th>
                                        <th className="px-6 py-4 font-semibold" style={{ color: LIGHT_SLATE }}>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {filteredAndSortedData.length > 0 ? filteredAndSortedData.map((institution, index) => (
                                        <tr
                                            key={institution.id}
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
                                                        {institution.name.charAt(0)}
                                                    </div>
                                                    <div>
                                                        <div className="font-medium" style={{ color: LIGHT_SLATE }}>
                                                            {institution.name}
                                                        </div>
                                                        <span
                                                            className="px-2 py-1 rounded-full text-xs font-medium"
                                                            style={{
                                                                backgroundColor: institution.type === 'Bank' ? `${CYBER_TEAL}20` : `${WARNING_AMBER}20`,
                                                                color: institution.type === 'Bank' ? CYBER_TEAL : WARNING_AMBER
                                                            }}
                                                        >
                                                            {institution.type}
                                                        </span>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="text-2xl font-bold" style={{ color: VIBRANT_GREEN }}>
                                                    {institution.currentRate}%
                                                </div>
                                                <div className="text-sm" style={{ color: MID_SLATE }}>
                                                    {institution.currentCompound}
                                                </div>
                                            </td>
                                            <td className="px-6 py-4" style={{ color: LIGHT_SLATE }}>
                                                {formatCurrency(institution.minAmount)}
                                            </td>
                                            <td className="px-6 py-4">
                                                <span
                                                    className="px-2 py-1 rounded text-xs font-bold"
                                                    style={{
                                                        backgroundColor: getRatingColor(institution.rating),
                                                        color: DEEP_SPACE_BLUE
                                                    }}
                                                >
                                                    {institution.rating}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="text-lg font-bold" style={{ color: VIBRANT_GREEN }}>
                                                    {formatCurrency(amount * (institution.currentRate / 100) * (calcPeriod / 12))}
                                                </div>
                                                <div className="text-sm" style={{ color: MID_SLATE }}>
                                                    Interest for {calcPeriod} months
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="flex space-x-2">
                                                    <button
                                                        onClick={() => addToComparison(institution)}
                                                        disabled={comparisonList.length >= 3 || comparisonList.find(item => item.id === institution.id)}
                                                        className="px-3 py-1 rounded text-xs font-medium transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                                                        style={{
                                                            backgroundColor: CYBER_TEAL,
                                                            color: DEEP_SPACE_BLUE
                                                        }}
                                                    >
                                                        Compare
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    )) : (
                                        <tr>
                                            <td colSpan="6" className="text-center py-12">
                                                <div className="text-6xl mb-4">🔍</div>
                                                <h3 className="text-xl font-semibold mb-2" style={{ color: LIGHT_SLATE }}>
                                                    No institutions found
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
                <section className="max-w-3xl mx-auto py-20">
                     <h2 className="text-3xl font-bold text-center mb-10">Understanding Fixed Deposits</h2>
                     <FAQItem question="What is a Fixed Deposit (FD)?">
                        <p>An FD is a secure investment where you deposit money for a fixed period (e.g., 1 year) at a guaranteed interest rate. At the end of the term, you get your initial deposit back plus the interest you earned.</p>
                     </FAQItem>
                     <FAQItem question="Are my deposits safe in Sri Lanka?">
                        <p>Yes, FDs are one of the safest options. Deposits in Licensed Banks and Finance Companies are insured up to LKR 1,100,000 per person by the Sri Lanka Deposit Insurance Scheme (SLDIS), managed by the Central Bank.</p>
                     </FAQItem>
                     <FAQItem question="What's the difference between Banks and Finance Companies?">
                        <p>Finance Companies often offer higher interest rates to attract deposits. Licensed Banks are typically larger and may be perceived as lower risk. Both are regulated by the Central Bank of Sri Lanka, and deposits in licensed institutions are covered by the SLDIS.</p>
                     </FAQItem>
                </section>

            </div>
        </div>
    );
};

export default FixedDeposit;