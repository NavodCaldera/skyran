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

// --- Enhanced Mock Data & Helper Components ---

// Enhanced account data with comprehensive information
const accountData = [
  {
    id: 1,
    bank: "Bank of Ceylon",
    logo: '🏦',
    type: "Saving",
    category: "Personal",
    minDeposit: 1000,
    rate: 3.5,
    maxBalance: 5000000,
    features: ["Online Banking", "Mobile App", "ATM Network", "SMS Alerts"],
    fees: { monthlyFee: 0, atmFee: 0, transferFee: 25 },
    rating: "AA",
    description: "Government-backed savings account with nationwide branch network",
    benefits: ["No monthly fees", "Island-wide ATM access", "Government guarantee"],
    requirements: ["Valid NIC", "Proof of address", "Initial deposit"]
  },
  {
    id: 2,
    bank: "Commercial Bank",
    logo: '🏦',
    type: "Current",
    category: "Business",
    minDeposit: 50000,
    rate: 1.8,
    maxBalance: 50000000,
    features: ["Business Banking", "Cheque Book", "Overdraft Facility", "Trade Finance"],
    fees: { monthlyFee: 500, atmFee: 0, transferFee: 50 },
    rating: "AA+",
    description: "Comprehensive business current account with trade finance facilities",
    benefits: ["Overdraft facility", "Trade finance", "Dedicated relationship manager"],
    requirements: ["Business registration", "Tax clearance", "Financial statements"]
  },
  {
    id: 3,
    bank: "Sampath Bank",
    logo: '🏦',
    type: "Saving",
    category: "Student",
    minDeposit: 500,
    rate: 4.25,
    maxBalance: 1000000,
    features: ["Student Benefits", "Online Banking", "Mobile App", "Educational Loans"],
    fees: { monthlyFee: 0, atmFee: 0, transferFee: 0 },
    rating: "AA",
    description: "Special savings account designed for students with educational benefits",
    benefits: ["No fees", "Educational loan eligibility", "Scholarship opportunities"],
    requirements: ["Student ID", "Valid NIC", "School/University letter"]
  },
  {
    id: 4,
    bank: "Hatton National Bank",
    logo: '🏦',
    type: "Saving",
    category: "Personal",
    minDeposit: 5000,
    rate: 3.75,
    maxBalance: 10000000,
    features: ["HNB SOLO", "Internet Banking", "Phone Banking", "Investment Options"],
    fees: { monthlyFee: 100, atmFee: 0, transferFee: 30 },
    rating: "AA-",
    description: "Premium personal savings account with investment opportunities",
    benefits: ["Investment advisory", "Premium banking", "Exclusive offers"],
    requirements: ["Valid NIC", "Proof of income", "Minimum balance maintenance"]
  },
  {
    id: 5,
    bank: "People's Bank",
    logo: '🏦',
    type: "Current",
    category: "Personal",
    minDeposit: 2000,
    rate: 1.5,
    maxBalance: 5000000,
    features: ["Basic Banking", "ATM Access", "Online Banking", "Bill Payments"],
    fees: { monthlyFee: 200, atmFee: 25, transferFee: 35 },
    rating: "A+",
    description: "Basic current account for everyday banking needs",
    benefits: ["Low minimum deposit", "Basic banking services", "Government backing"],
    requirements: ["Valid NIC", "Proof of address", "Employment letter"]
  },
  {
    id: 6,
    bank: "NDB Bank",
    logo: '🏦',
    type: "Saving",
    category: "Business",
    minDeposit: 25000,
    rate: 3.9,
    maxBalance: 25000000,
    features: ["Business Banking", "Cash Management", "Trade Finance", "Investment Banking"],
    fees: { monthlyFee: 300, atmFee: 0, transferFee: 40 },
    rating: "A+",
    description: "Business savings account with comprehensive corporate banking services",
    benefits: ["Cash management", "Investment opportunities", "Corporate advisory"],
    requirements: ["Business registration", "Board resolution", "Financial statements"]
  },
  {
    id: 7,
    bank: "Seylan Bank",
    logo: '🏦',
    type: "Saving",
    category: "Personal",
    minDeposit: 3000,
    rate: 4.0,
    maxBalance: 8000000,
    features: ["Digital Banking", "Mobile Wallet", "Investment Plans", "Insurance"],
    fees: { monthlyFee: 150, atmFee: 0, transferFee: 25 },
    rating: "A",
    description: "Digital-first savings account with modern banking features",
    benefits: ["Digital banking", "Mobile wallet integration", "Investment plans"],
    requirements: ["Valid NIC", "Mobile number", "Email address"]
  },
  {
    id: 8,
    bank: "Nations Trust Bank",
    logo: '🏦',
    type: "Saving",
    category: "Premium",
    minDeposit: 100000,
    rate: 4.5,
    maxBalance: 50000000,
    features: ["Premium Banking", "Wealth Management", "Concierge Services", "Priority Banking"],
    fees: { monthlyFee: 1000, atmFee: 0, transferFee: 0 },
    rating: "A+",
    description: "Premium savings account with wealth management and concierge services",
    benefits: ["Wealth management", "Priority banking", "Concierge services"],
    requirements: ["High net worth", "Relationship manager approval", "Investment portfolio"]
  }
];

const banks = ["All Banks", ...new Set(accountData.map(d => d.bank))];
const accountTypes = ["All Types", "Saving", "Current"];
const categories = ["All Categories", "Personal", "Business", "Student", "Premium"];

const FAQItem = ({ question, children }) => {
    const [isOpen, setIsOpen] = useState(false);
    return (
        <div className="border-b border-slate-700 py-4">
            <button className="w-full flex justify-between items-center text-left text-lg font-semibold" style={{color: LIGHT_SLATE}} onClick={() => setIsOpen(!isOpen)}>
                <span>{question}</span>
                <span className={`transform transition-transform duration-300 ${isOpen ? 'rotate-180' : 'rotate-0'}`}>▼</span>
            </button>
            {isOpen && <div className="mt-4 leading-relaxed animate-fade-in" style={{color: MID_SLATE}}>{children}</div>}
        </div>
    );
};


// --- The Main, Enhanced SavingAccount Component ---

const SavingAccount = () => {
    // Enhanced state management
    const [selectedBank, setSelectedBank] = useState('All Banks');
    const [selectedAccountType, setSelectedAccountType] = useState('All Types');
    const [selectedCategory, setSelectedCategory] = useState('All Categories');
    const [searchTerm, setSearchTerm] = useState('');
    const [sortBy, setSortBy] = useState('rate'); // 'rate', 'minDeposit', 'bank', 'fees'
    const [sortOrder, setSortOrder] = useState('desc');
    const [selectedAccount, setSelectedAccount] = useState(null);
    const [showCalculator, setShowCalculator] = useState(false);
    const [showComparison, setShowComparison] = useState(false);
    const [comparisonList, setComparisonList] = useState([]);

    // Calculator state
    const [depositAmount, setDepositAmount] = useState(100000);
    const [timeHorizon, setTimeHorizon] = useState(12); // months
    const [calculatorResults, setCalculatorResults] = useState(null);

    // Enhanced filtering and sorting logic
    const filteredAndSortedData = useMemo(() => {
        let filtered = accountData.filter(row =>
            (searchTerm === '' || row.bank.toLowerCase().includes(searchTerm.toLowerCase())) &&
            (selectedBank === 'All Banks' || row.bank === selectedBank) &&
            (selectedAccountType === 'All Types' || row.type === selectedAccountType) &&
            (selectedCategory === 'All Categories' || row.category === selectedCategory)
        );

        // Sort the data
        filtered.sort((a, b) => {
            let comparison = 0;

            switch (sortBy) {
                case 'rate':
                    comparison = a.rate - b.rate;
                    break;
                case 'minDeposit':
                    comparison = a.minDeposit - b.minDeposit;
                    break;
                case 'bank':
                    comparison = a.bank.localeCompare(b.bank);
                    break;
                case 'fees':
                    comparison = a.fees.monthlyFee - b.fees.monthlyFee;
                    break;
                default:
                    comparison = a.rate - b.rate;
            }

            return sortOrder === 'asc' ? comparison : -comparison;
        });

        return filtered;
    }, [selectedBank, selectedAccountType, selectedCategory, searchTerm, sortBy, sortOrder]);

    // Calculator function
    const calculateSavings = (amount, rate, months) => {
        const monthlyRate = rate / 100 / 12;
        const compoundInterest = amount * Math.pow((1 + monthlyRate), months);
        const interest = compoundInterest - amount;

        return {
            principal: amount,
            interest: interest,
            total: compoundInterest,
            monthlyGrowth: interest / months
        };
    };

    // Update calculator results
    useEffect(() => {
        if (selectedAccount) {
            const results = calculateSavings(depositAmount, selectedAccount.rate, timeHorizon);
            setCalculatorResults(results);
        }
    }, [selectedAccount, depositAmount, timeHorizon]);

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
            'AA+': VIBRANT_GREEN,
            'AA': VIBRANT_GREEN,
            'AA-': CYBER_TEAL,
            'A+': CYBER_TEAL,
            'A': WARNING_AMBER,
            'A-': WARNING_AMBER
        };
        return ratingColors[rating] || MID_SLATE;
    };

    const addToComparison = (account) => {
        if (comparisonList.length < 3 && !comparisonList.find(item => item.id === account.id)) {
            setComparisonList([...comparisonList, account]);
        }
    };

    const removeFromComparison = (accountId) => {
        setComparisonList(comparisonList.filter(item => item.id !== accountId));
    };

    // --- Render JSX ---

    return (
        <div
            className="min-h-screen text-white"
            style={{ backgroundColor: DEEP_SPACE_BLUE }}
        >
            <div className="max-w-7xl mx-auto p-6 md:p-8">

                {/* Enhanced Hero Section */}
                <section className="text-center mb-16 md:mb-20 animate-fade-in">
                    <h1
                        className="text-4xl md:text-6xl font-bold font-sans leading-tight pb-4 text-transparent bg-clip-text bg-gradient-to-r from-cyber-teal to-luminous-accent"
                    >
                        Banking Solutions Hub
                    </h1>
                    <p className="max-w-3xl mx-auto text-xl mb-8" style={{ color: MID_SLATE }}>
                        Discover the perfect banking solution for your financial needs. Compare savings and current accounts
                        from Sri Lanka's leading banks with our comprehensive analysis tools.
                    </p>

                    {/* Quick Stats */}
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mt-8">
                        <div
                            className="p-6 rounded-lg text-center transform hover:scale-105 transition-transform duration-200"
                            style={{ backgroundColor: CORPORATE_NAVY }}
                        >
                            <div className="text-3xl font-bold mb-2" style={{ color: CYBER_TEAL }}>
                                {Math.max(...accountData.map(acc => acc.rate)).toFixed(2)}%
                            </div>
                            <div className="text-sm" style={{ color: MID_SLATE }}>Highest Interest Rate</div>
                        </div>
                        <div
                            className="p-6 rounded-lg text-center transform hover:scale-105 transition-transform duration-200"
                            style={{ backgroundColor: CORPORATE_NAVY }}
                        >
                            <div className="text-3xl font-bold mb-2" style={{ color: CYBER_TEAL }}>
                                {accountData.length}
                            </div>
                            <div className="text-sm" style={{ color: MID_SLATE }}>Banking Options</div>
                        </div>
                        <div
                            className="p-6 rounded-lg text-center transform hover:scale-105 transition-transform duration-200"
                            style={{ backgroundColor: CORPORATE_NAVY }}
                        >
                            <div className="text-3xl font-bold mb-2" style={{ color: CYBER_TEAL }}>
                                {formatCurrency(Math.min(...accountData.map(acc => acc.minDeposit)))}
                            </div>
                            <div className="text-sm" style={{ color: MID_SLATE }}>Lowest Min Deposit</div>
                        </div>
                        <div
                            className="p-6 rounded-lg text-center transform hover:scale-105 transition-transform duration-200"
                            style={{ backgroundColor: CORPORATE_NAVY }}
                        >
                            <div className="text-3xl font-bold mb-2" style={{ color: CYBER_TEAL }}>
                                {accountData.filter(acc => acc.fees.monthlyFee === 0).length}
                            </div>
                            <div className="text-sm" style={{ color: MID_SLATE }}>Fee-Free Options</div>
                        </div>
                    </div>
                </section>

                {/* Savings Calculator Section */}
                <section className="mb-16 md:mb-20">
                    <div
                        className="max-w-6xl mx-auto p-6 md:p-8 rounded-xl shadow-lg border"
                        style={{
                            backgroundColor: CORPORATE_NAVY,
                            borderColor: MID_SLATE
                        }}
                    >
                        <h2 className="text-2xl md:text-3xl font-bold text-center mb-8" style={{ color: CYBER_TEAL }}>
                            Savings Calculator
                        </h2>

                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                            {/* Calculator Inputs */}
                            <div className="space-y-6">
                                <div>
                                    <label className="block text-lg font-medium mb-3" style={{ color: LIGHT_SLATE }}>
                                        Initial Deposit Amount (LKR)
                                    </label>
                                    <input
                                        type="number"
                                        value={depositAmount}
                                        onChange={(e) => setDepositAmount(Number(e.target.value) || 0)}
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
                                    <label className="block text-lg font-medium mb-3" style={{ color: LIGHT_SLATE }}>
                                        Time Period (Months)
                                    </label>
                                    <select
                                        value={timeHorizon}
                                        onChange={(e) => setTimeHorizon(Number(e.target.value))}
                                        className="w-full px-4 py-3 rounded-lg border-2 focus:outline-none focus:ring-2 transition-all duration-200"
                                        style={{
                                            backgroundColor: DEEP_SPACE_BLUE,
                                            borderColor: MID_SLATE,
                                            color: LIGHT_SLATE
                                        }}
                                    >
                                        <option value={6}>6 Months</option>
                                        <option value={12}>1 Year</option>
                                        <option value={24}>2 Years</option>
                                        <option value={36}>3 Years</option>
                                        <option value={60}>5 Years</option>
                                    </select>
                                </div>

                                <div>
                                    <label className="block text-lg font-medium mb-3" style={{ color: LIGHT_SLATE }}>
                                        Select Account for Calculation
                                    </label>
                                    <select
                                        value={selectedAccount?.id || ''}
                                        onChange={(e) => {
                                            const account = accountData.find(acc => acc.id === Number(e.target.value));
                                            setSelectedAccount(account);
                                        }}
                                        className="w-full px-4 py-3 rounded-lg border-2 focus:outline-none focus:ring-2 transition-all duration-200"
                                        style={{
                                            backgroundColor: DEEP_SPACE_BLUE,
                                            borderColor: MID_SLATE,
                                            color: LIGHT_SLATE
                                        }}
                                    >
                                        <option value="">Choose an account...</option>
                                        {accountData.filter(acc => acc.type === 'Saving').map(account => (
                                            <option key={account.id} value={account.id}>
                                                {account.bank} - {account.rate}% ({account.category})
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            </div>

                            {/* Calculator Results */}
                            {calculatorResults && selectedAccount && (
                                <div
                                    className="p-6 rounded-lg"
                                    style={{ backgroundColor: DEEP_SPACE_BLUE }}
                                >
                                    <h3 className="text-xl font-semibold mb-6" style={{ color: CYBER_TEAL }}>
                                        Projected Savings Growth
                                    </h3>

                                    <div className="space-y-4">
                                        <div className="flex justify-between items-center">
                                            <span style={{ color: MID_SLATE }}>Initial Deposit:</span>
                                            <span className="font-medium text-lg" style={{ color: LIGHT_SLATE }}>
                                                {formatCurrency(calculatorResults.principal)}
                                            </span>
                                        </div>

                                        <div className="flex justify-between items-center">
                                            <span style={{ color: MID_SLATE }}>Interest Earned:</span>
                                            <span className="font-medium text-lg" style={{ color: VIBRANT_GREEN }}>
                                                {formatCurrency(calculatorResults.interest)}
                                            </span>
                                        </div>

                                        <div className="flex justify-between items-center">
                                            <span style={{ color: MID_SLATE }}>Monthly Growth:</span>
                                            <span className="font-medium" style={{ color: WARNING_AMBER }}>
                                                {formatCurrency(calculatorResults.monthlyGrowth)}
                                            </span>
                                        </div>

                                        <div
                                            className="flex justify-between items-center border-t pt-4"
                                            style={{ borderTopColor: MID_SLATE }}
                                        >
                                            <span className="font-semibold text-lg" style={{ color: LIGHT_SLATE }}>
                                                Total Amount:
                                            </span>
                                            <span className="font-bold text-2xl" style={{ color: CYBER_TEAL }}>
                                                {formatCurrency(calculatorResults.total)}
                                            </span>
                                        </div>
                                    </div>

                                    {/* Account Details */}
                                    <div className="mt-6 p-4 rounded-lg" style={{ backgroundColor: `${CYBER_TEAL}10` }}>
                                        <h4 className="font-semibold mb-2" style={{ color: LIGHT_SLATE }}>
                                            Selected Account Details
                                        </h4>
                                        <div className="text-sm space-y-1">
                                            <div className="flex justify-between">
                                                <span style={{ color: MID_SLATE }}>Bank:</span>
                                                <span style={{ color: LIGHT_SLATE }}>{selectedAccount.bank}</span>
                                            </div>
                                            <div className="flex justify-between">
                                                <span style={{ color: MID_SLATE }}>Interest Rate:</span>
                                                <span style={{ color: LIGHT_SLATE }}>{selectedAccount.rate}% p.a.</span>
                                            </div>
                                            <div className="flex justify-between">
                                                <span style={{ color: MID_SLATE }}>Monthly Fee:</span>
                                                <span style={{ color: LIGHT_SLATE }}>
                                                    {selectedAccount.fees.monthlyFee === 0 ? 'Free' : formatCurrency(selectedAccount.fees.monthlyFee)}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </section>

                {/* Section 2: Enhanced Filter Bar */}
                <section
                    className="p-6 mb-12 rounded-xl sticky top-4 z-10" // Make filters sticky on scroll
                    style={{ backgroundColor: CORPORATE_NAVY, backdropFilter: 'blur(10px)', background: 'rgba(24, 66, 108, 0.8)' }}
                >
                    <div className="mb-6">
                        <h3 className="text-xl font-bold text-center mb-4" style={{ color: CYBER_TEAL }}>
                            Filter & Sort Accounts
                        </h3>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 items-end">
                        {/* Search Input */}
                        <div>
                             <label className="block text-sm font-semibold mb-2" style={{ color: LIGHT_SLATE }}>Search Bank</label>
                            <input
                                type="text"
                                placeholder="e.g., Sampath Bank"
                                className="w-full p-3 rounded-lg border-2"
                                style={{
                                    backgroundColor: DEEP_SPACE_BLUE,
                                    borderColor: MID_SLATE,
                                    color: LIGHT_SLATE,
                                }}
                                value={searchTerm}
                                onChange={e => setSearchTerm(e.target.value)}
                            />
                        </div>
                        
                        {/* Account Type Pills */}
                         <div>
                            <label className="block text-sm font-semibold mb-2" style={{ color: LIGHT_SLATE }}>Account Type</label>
                            <div className="flex bg-[#0A192F] p-1 rounded-lg border-2 border-[#3d4f6b]">
                                {accountTypes.slice(1).map(type => (
                                    <button 
                                        key={type}
                                        onClick={() => setSelectedAccountType(type === selectedAccountType ? 'All Types' : type)}
                                        className={`w-full py-2 text-sm font-semibold rounded-md transition ${selectedAccountType === type ? 'text-[#0A192F]' : 'text-slate-300'}`}
                                        style={{backgroundColor: selectedAccountType === type ? CYBER_TEAL : 'transparent' }}
                                    >
                                        {type}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Category Pills */}
                         <div>
                             <label className="block text-sm font-semibold mb-2" style={{ color: LIGHT_SLATE }}>Category</label>
                             <div className="flex flex-wrap gap-2">
                                {categories.slice(1).map(cat => (
                                    <button
                                        key={cat}
                                        onClick={() => setSelectedCategory(cat === selectedCategory ? 'All Categories' : cat)}
                                        className={`px-4 py-2 text-sm font-semibold rounded-full transition ${selectedCategory === cat ? 'text-[#0A192F]' : 'text-slate-300 hover:bg-[#3d4f6b]'}`}
                                        style={{
                                          backgroundColor: selectedCategory === cat ? CYBER_TEAL : 'rgb(10 25 47 / 0.5)',
                                          border: '1px solid #3d4f6b'
                                        }}
                                    >
                                        {cat}
                                    </button>
                                ))}
                             </div>
                        </div>
                        {/* Sort By */}
                        <div>
                            <label className="block text-sm font-semibold mb-2" style={{ color: LIGHT_SLATE }}>Sort By</label>
                            <select
                                value={sortBy}
                                onChange={(e) => setSortBy(e.target.value)}
                                className="w-full p-3 rounded-lg border-2"
                                style={{
                                    backgroundColor: DEEP_SPACE_BLUE,
                                    borderColor: MID_SLATE,
                                    color: LIGHT_SLATE,
                                }}
                            >
                                <option value="rate">Interest Rate</option>
                                <option value="minDeposit">Min Deposit</option>
                                <option value="bank">Bank Name</option>
                                <option value="fees">Monthly Fees</option>
                            </select>
                        </div>

                        {/* Reset Button */}
                        <div>
                          <button
                            onClick={() => {
                              setSelectedBank('All Banks');
                              setSelectedAccountType('All Types');
                              setSelectedCategory('All Categories');
                              setSearchTerm('');
                              setSortBy('rate');
                              setSortOrder('desc');
                            }}
                            className="w-full py-3 text-sm font-bold rounded-lg transition hover:opacity-80"
                            style={{color: CYBER_TEAL, backgroundColor: 'rgb(16 207 200 / 0.1)'}}
                          >
                            Reset All
                          </button>
                        </div>
                    </div>
                </section>
                
                {/* Section 3: Enhanced Account Cards Grid */}
                <section>
                    <div className="mb-6 flex justify-between items-center">
                        <h3 className="text-2xl font-bold" style={{ color: LIGHT_SLATE }}>
                            Available Accounts ({filteredAndSortedData.length})
                        </h3>
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

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {filteredAndSortedData.length > 0 ? (
                            filteredAndSortedData.map((row) => (
                                <div
                                    key={row.id}
                                    className="p-6 rounded-lg flex flex-col justify-between transform hover:scale-105 transition-all duration-200 hover:shadow-lg"
                                    style={{
                                        backgroundColor: CORPORATE_NAVY,
                                        border: `2px solid ${MID_SLATE}`,
                                        borderColor: row.type === 'Saving' ? CYBER_TEAL : WARNING_AMBER
                                    }}
                                >
                                    <div>
                                        {/* Header with Bank Name and Rating */}
                                        <div className="flex items-center justify-between mb-4">
                                            <div className="flex items-center">
                                                <div className="text-2xl mr-3">{row.logo}</div>
                                                <div>
                                                    <h3 className="text-xl font-bold" style={{ color: LUMINOUS_ACCENT }}>
                                                        {row.bank}
                                                    </h3>
                                                    <span
                                                        className="px-2 py-1 rounded text-xs font-bold"
                                                        style={{
                                                            backgroundColor: getRatingColor(row.rating),
                                                            color: DEEP_SPACE_BLUE
                                                        }}
                                                    >
                                                        {row.rating}
                                                    </span>
                                                </div>
                                            </div>
                                            <span
                                                className="px-3 py-1 rounded-full text-xs font-medium"
                                                style={{
                                                    backgroundColor: row.type === 'Saving' ? `${CYBER_TEAL}20` : `${WARNING_AMBER}20`,
                                                    color: row.type === 'Saving' ? CYBER_TEAL : WARNING_AMBER
                                                }}
                                            >
                                                {row.type}
                                            </span>
                                        </div>

                                        {/* Account Details */}
                                        <div className="space-y-3 mb-4">
                                            <div className="flex justify-between items-center">
                                                <span className="text-sm" style={{color: MID_SLATE}}>Category:</span>
                                                <span className="font-semibold" style={{color: LIGHT_SLATE}}>{row.category}</span>
                                            </div>
                                            <div className="flex justify-between items-center">
                                                <span className="text-sm" style={{color: MID_SLATE}}>Min Deposit:</span>
                                                <span className="font-semibold" style={{color: LIGHT_SLATE}}>
                                                    {formatCurrency(row.minDeposit)}
                                                </span>
                                            </div>
                                            <div className="flex justify-between items-center">
                                                <span className="text-sm" style={{color: MID_SLATE}}>Monthly Fee:</span>
                                                <span
                                                    className="font-semibold"
                                                    style={{color: row.fees.monthlyFee === 0 ? VIBRANT_GREEN : WARNING_AMBER}}
                                                >
                                                    {row.fees.monthlyFee === 0 ? 'Free' : formatCurrency(row.fees.monthlyFee)}
                                                </span>
                                            </div>
                                        </div>

                                        {/* Interest Rate Display */}
                                        <div className="text-center py-4 rounded-lg mb-4" style={{ backgroundColor: DEEP_SPACE_BLUE }}>
                                            <p className="text-xs uppercase font-semibold mb-1" style={{color: MID_SLATE}}>
                                                Interest Rate (p.a.)
                                            </p>
                                            <p className="text-4xl font-bold" style={{color: CYBER_TEAL}}>
                                                {row.rate.toFixed(2)}%
                                            </p>
                                        </div>

                                        {/* Key Features */}
                                        <div className="mb-4">
                                            <p className="text-xs uppercase font-semibold mb-2" style={{color: MID_SLATE}}>
                                                Key Features
                                            </p>
                                            <div className="flex flex-wrap gap-1">
                                                {row.features.slice(0, 3).map((feature, index) => (
                                                    <span
                                                        key={index}
                                                        className="px-2 py-1 rounded text-xs"
                                                        style={{
                                                            backgroundColor: `${CYBER_TEAL}15`,
                                                            color: LIGHT_SLATE
                                                        }}
                                                    >
                                                        {feature}
                                                    </span>
                                                ))}
                                                {row.features.length > 3 && (
                                                    <span
                                                        className="px-2 py-1 rounded text-xs"
                                                        style={{
                                                            backgroundColor: `${MID_SLATE}20`,
                                                            color: MID_SLATE
                                                        }}
                                                    >
                                                        +{row.features.length - 3} more
                                                    </span>
                                                )}
                                            </div>
                                        </div>
                                    </div>

                                    {/* Action Buttons */}
                                    <div className="space-y-2">
                                        <button
                                            onClick={() => {
                                                setSelectedAccount(row);
                                                setShowCalculator(true);
                                            }}
                                            className="w-full py-2 px-4 rounded-lg font-semibold transition-all duration-200 hover:opacity-80"
                                            style={{
                                                backgroundColor: CYBER_TEAL,
                                                color: DEEP_SPACE_BLUE
                                            }}
                                        >
                                            Calculate Returns
                                        </button>
                                        <div className="flex space-x-2">
                                            <button
                                                onClick={() => addToComparison(row)}
                                                disabled={comparisonList.length >= 3 || comparisonList.find(item => item.id === row.id)}
                                                className="flex-1 py-2 px-3 rounded-lg text-sm font-medium transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                                                style={{
                                                    backgroundColor: DEEP_SPACE_BLUE,
                                                    border: `1px solid ${MID_SLATE}`,
                                                    color: LIGHT_SLATE
                                                }}
                                            >
                                                Compare
                                            </button>
                                            <button
                                                className="flex-1 py-2 px-3 rounded-lg text-sm font-medium transition-all duration-200 hover:opacity-80"
                                                style={{
                                                    backgroundColor: LUMINOUS_ACCENT,
                                                    color: DEEP_SPACE_BLUE
                                                }}
                                            >
                                                Details
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="md:col-span-2 lg:col-span-3 text-center py-12 px-6 rounded-lg" style={{backgroundColor: CORPORATE_NAVY}}>
                                <p className="text-2xl mb-2" style={{color: LUMINOUS_ACCENT}}>No Accounts Found</p>
                                <p style={{color: LIGHT_SLATE}}>Try adjusting your filters to find more results.</p>
                            </div>
                        )}
                    </div>
                </section>

                {/* Comparison Section */}
                {comparisonList.length > 0 && (
                    <section className="mb-16 md:mb-20">
                        <div
                            className="p-6 md:p-8 rounded-xl shadow-lg border"
                            style={{
                                backgroundColor: CORPORATE_NAVY,
                                borderColor: MID_SLATE
                            }}
                        >
                            <div className="flex justify-between items-center mb-6">
                                <h2 className="text-2xl font-bold" style={{ color: CYBER_TEAL }}>
                                    Account Comparison ({comparisonList.length}/3)
                                </h2>
                                <button
                                    onClick={() => setComparisonList([])}
                                    className="px-4 py-2 rounded-lg font-medium transition-all duration-200 hover:opacity-80"
                                    style={{ backgroundColor: ERROR_RED, color: LIGHT_SLATE }}
                                >
                                    Clear All
                                </button>
                            </div>

                            <div className="overflow-x-auto">
                                <table className="w-full text-left">
                                    <thead style={{ backgroundColor: DEEP_SPACE_BLUE }}>
                                        <tr>
                                            <th className="px-4 py-3 font-semibold" style={{ color: LIGHT_SLATE }}>Feature</th>
                                            {comparisonList.map(account => (
                                                <th key={account.id} className="px-4 py-3 font-semibold text-center" style={{ color: LIGHT_SLATE }}>
                                                    <div className="flex items-center justify-center space-x-2">
                                                        <span>{account.bank}</span>
                                                        <button
                                                            onClick={() => removeFromComparison(account.id)}
                                                            className="text-xs px-2 py-1 rounded hover:opacity-80"
                                                            style={{ backgroundColor: ERROR_RED, color: LIGHT_SLATE }}
                                                        >
                                                            ×
                                                        </button>
                                                    </div>
                                                </th>
                                            ))}
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr className="border-t" style={{ borderTopColor: MID_SLATE }}>
                                            <td className="px-4 py-3 font-medium" style={{ color: LIGHT_SLATE }}>Interest Rate</td>
                                            {comparisonList.map(account => (
                                                <td key={account.id} className="px-4 py-3 text-center font-bold text-xl" style={{ color: CYBER_TEAL }}>
                                                    {account.rate}%
                                                </td>
                                            ))}
                                        </tr>
                                        <tr className="border-t" style={{ borderTopColor: MID_SLATE }}>
                                            <td className="px-4 py-3 font-medium" style={{ color: LIGHT_SLATE }}>Account Type</td>
                                            {comparisonList.map(account => (
                                                <td key={account.id} className="px-4 py-3 text-center" style={{ color: LIGHT_SLATE }}>
                                                    {account.type} - {account.category}
                                                </td>
                                            ))}
                                        </tr>
                                        <tr className="border-t" style={{ borderTopColor: MID_SLATE }}>
                                            <td className="px-4 py-3 font-medium" style={{ color: LIGHT_SLATE }}>Min Deposit</td>
                                            {comparisonList.map(account => (
                                                <td key={account.id} className="px-4 py-3 text-center" style={{ color: LIGHT_SLATE }}>
                                                    {formatCurrency(account.minDeposit)}
                                                </td>
                                            ))}
                                        </tr>
                                        <tr className="border-t" style={{ borderTopColor: MID_SLATE }}>
                                            <td className="px-4 py-3 font-medium" style={{ color: LIGHT_SLATE }}>Monthly Fee</td>
                                            {comparisonList.map(account => (
                                                <td key={account.id} className="px-4 py-3 text-center" style={{
                                                    color: account.fees.monthlyFee === 0 ? VIBRANT_GREEN : WARNING_AMBER
                                                }}>
                                                    {account.fees.monthlyFee === 0 ? 'Free' : formatCurrency(account.fees.monthlyFee)}
                                                </td>
                                            ))}
                                        </tr>
                                        <tr className="border-t" style={{ borderTopColor: MID_SLATE }}>
                                            <td className="px-4 py-3 font-medium" style={{ color: LIGHT_SLATE }}>Rating</td>
                                            {comparisonList.map(account => (
                                                <td key={account.id} className="px-4 py-3 text-center">
                                                    <span
                                                        className="px-2 py-1 rounded text-xs font-bold"
                                                        style={{
                                                            backgroundColor: getRatingColor(account.rating),
                                                            color: DEEP_SPACE_BLUE
                                                        }}
                                                    >
                                                        {account.rating}
                                                    </span>
                                                </td>
                                            ))}
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </section>
                )}

                {/* Section 4: Enhanced FAQ */}
                <section className="max-w-4xl mx-auto py-20">
                    <h2 className="text-3xl font-bold text-center mb-10" style={{color: LUMINOUS_ACCENT}}>
                        Banking Knowledge Center
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div>
                            <FAQItem question="What's the difference between Savings and Current accounts?">
                                <p>A <strong>Savings Account</strong> is designed to help you save money and typically earns interest. It might have limits on the number of withdrawals. A <strong>Current Account</strong> is designed for frequent transactions (like paying bills or daily spending), often includes a cheque book, and usually offers little to no interest.</p>
                            </FAQItem>
                            <FAQItem question="Why do different categories like 'Student' or 'Business' exist?">
                                <p>Banks create different account types to meet the specific needs of various customer groups. A 'Student' account might have a very low minimum deposit and offer educational benefits, while a 'Business' account will have features for handling large transaction volumes and business payrolls.</p>
                            </FAQItem>
                            <FAQItem question="What are bank ratings and why do they matter?">
                                <p>Bank ratings (like AA+, AA, A+) are credit ratings that indicate the financial stability and creditworthiness of the bank. Higher ratings suggest lower risk and greater financial stability, which means your deposits are safer.</p>
                            </FAQItem>
                        </div>
                        <div>
                            <FAQItem question="How is interest calculated on savings accounts?">
                                <p>Interest is typically calculated daily on your account balance and credited monthly or quarterly. The rate shown is annual (p.a. - per annum), so it's divided by 12 for monthly calculation. Compound interest means you earn interest on your interest too.</p>
                            </FAQItem>
                            <FAQItem question="What fees should I watch out for?">
                                <p>Common fees include monthly maintenance fees, ATM withdrawal fees (especially from other banks), transfer fees, and minimum balance penalties. Always check the fee structure before opening an account.</p>
                            </FAQItem>
                            <FAQItem question="How do I choose the right account for me?">
                                <p>Consider your primary use case: frequent transactions (Current), saving money (Savings), your age/status (Student, Premium), and compare interest rates, fees, minimum deposits, and features that matter to you.</p>
                            </FAQItem>
                        </div>
                    </div>
                </section>

            </div>
        </div>
    );
};

export default SavingAccount;