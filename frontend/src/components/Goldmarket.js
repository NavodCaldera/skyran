import React, { useState, useEffect, useMemo } from 'react';
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

// --- Helper Components & Mock Data ---

// Enhanced gold market data
const mockGoldData = {
    // Current prices (LKR per gram)
    prices: {
        gold24K: 23156.25,  // per gram
        gold22K: 21226.25,  // per gram
        gold18K: 17367.19,  // per gram
        sovereign24K: 185250.00,  // per sovereign (8g)
        sovereign22K: 169810.00,  // per sovereign (8g)
    },
    // Daily changes
    changes: {
        gold24K: { amount: 93.75, percentage: 0.41, trend: 'up' },
        gold22K: { amount: 85.94, percentage: 0.41, trend: 'up' },
        gold18K: { amount: 70.31, percentage: 0.41, trend: 'up' },
        sovereign24K: { amount: 750.00, percentage: 0.41, trend: 'up' },
        sovereign22K: { amount: 687.50, percentage: 0.41, trend: 'up' },
    },
    // Historical data for charts (last 30 days)
    historicalData: [
        { date: '2024-01-01', price: 22800, volume: 1250 },
        { date: '2024-01-02', price: 22850, volume: 1180 },
        { date: '2024-01-03', price: 22920, volume: 1320 },
        { date: '2024-01-04', price: 22880, volume: 1290 },
        { date: '2024-01-05', price: 22950, volume: 1410 },
        { date: '2024-01-08', price: 23020, volume: 1380 },
        { date: '2024-01-09', price: 23100, volume: 1450 },
        { date: '2024-01-10', price: 23080, volume: 1320 },
        { date: '2024-01-11', price: 23150, volume: 1520 },
        { date: '2024-01-12', price: 23200, volume: 1480 },
        { date: '2024-01-15', price: 23180, volume: 1390 },
        { date: '2024-01-16', price: 23220, volume: 1420 },
        { date: '2024-01-17', price: 23156, volume: 1350 },
    ],
    // Market insights
    marketInsights: {
        weeklyHigh: 23220.00,
        weeklyLow: 22800.00,
        monthlyHigh: 23350.00,
        monthlyLow: 22650.00,
        volatility: 'Low',
        marketSentiment: 'Bullish',
        globalInfluence: 'USD strengthening, inflation concerns'
    },
    lastUpdated: new Date().toISOString()
};

const howToInvestOptions = [
    {
        icon: '🪙',
        title: 'Physical Gold',
        description: 'The most traditional way. Purchase jewellery, coins, or gold bars from trusted sellers.'
    },
    {
        icon: '📱',
        title: 'Digital Gold',
        description: 'Own gold securely in a digital format. Easy to buy, sell, and store without physical risk.'
    },
    {
        icon: '🏦',
        title: 'Gold Savings Accounts',
        description: 'Accumulate gold over time by saving small amounts regularly with specific bank accounts.'
    },
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


// --- The Main Goldmarket Component ---

const Goldmarket = () => {
    // Enhanced state management
    const [selectedGoldType, setSelectedGoldType] = useState('24K');
    const [selectedUnit, setSelectedUnit] = useState('gram'); // 'gram' or 'sovereign'
    const [goldWeight, setGoldWeight] = useState(1);
    const [estimatedValue, setEstimatedValue] = useState(0);
    const [showCalculator, setShowCalculator] = useState(true);
    const [selectedTimeframe, setSelectedTimeframe] = useState('1D');
    const [investmentAmount, setInvestmentAmount] = useState(100000);
    const [investmentResults, setInvestmentResults] = useState(null);

    // Get current price based on selection
    const getCurrentPrice = () => {
        const priceKey = selectedUnit === 'gram' ?
            `gold${selectedGoldType}` :
            `sovereign${selectedGoldType}`;
        return mockGoldData.prices[priceKey] || mockGoldData.prices.gold24K;
    };

    // Get current change data
    const getCurrentChange = () => {
        const changeKey = selectedUnit === 'gram' ?
            `gold${selectedGoldType}` :
            `sovereign${selectedGoldType}`;
        return mockGoldData.changes[changeKey] || mockGoldData.changes.gold24K;
    };

    // Calculate investment returns
    const calculateInvestment = (amount, goldType, unit) => {
        const currentPrice = getCurrentPrice();
        const goldQuantity = amount / currentPrice;
        const weightInGrams = unit === 'sovereign' ? goldQuantity * 8 : goldQuantity;

        // Simulate potential returns (this would come from historical analysis)
        const potentialReturns = {
            conservative: amount * 1.05, // 5% annual return
            moderate: amount * 1.08,     // 8% annual return
            optimistic: amount * 1.12    // 12% annual return
        };

        return {
            goldQuantity: goldQuantity,
            weightInGrams: weightInGrams,
            currentValue: amount,
            potentialReturns: potentialReturns,
            pricePerUnit: currentPrice
        };
    };

    // Update calculator value
    useEffect(() => {
        const currentPrice = getCurrentPrice();
        setEstimatedValue(goldWeight * currentPrice);
    }, [goldWeight, selectedGoldType, selectedUnit]);

    // Update investment results
    useEffect(() => {
        const results = calculateInvestment(investmentAmount, selectedGoldType, selectedUnit);
        setInvestmentResults(results);
    }, [investmentAmount, selectedGoldType, selectedUnit]);

    // Helper functions
    const formatCurrency = (amount) => {
        return new Intl.NumberFormat('en-LK', {
            style: 'currency',
            currency: 'LKR',
            minimumFractionDigits: 0,
            maximumFractionDigits: 0,
        }).format(amount);
    };

    const formatWeight = (weight) => {
        return weight.toFixed(3);
    };

    const getGoldTypeColor = (type) => {
        const colors = {
            '24K': '#FFD700', // Gold
            '22K': '#FFC649', // Slightly darker gold
            '18K': '#DAA520'  // Goldenrod
        };
        return colors[type] || '#FFD700';
    };


    // --- Render JSX ---

    return (
        <div
            className="min-h-screen"
            style={{ backgroundColor: DEEP_SPACE_BLUE, color: LIGHT_SLATE }}
        >
            <div className="max-w-7xl mx-auto p-6 md:p-8">

                {/* Enhanced Hero Section */}
                <section className="text-center mb-16 md:mb-20 animate-fade-in">
                    <h1
                        className="text-4xl md:text-6xl font-bold font-sans leading-tight pb-4 text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-yellow-600"
                    >
                        Gold Market Intelligence
                    </h1>
                    <p className="mt-4 max-w-3xl mx-auto text-xl" style={{ color: MID_SLATE }}>
                        Track live gold prices, analyze market trends, and make informed investment decisions
                        with our comprehensive gold market analysis tools.
                    </p>

                    {/* Quick Market Stats */}
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mt-8">
                        <div
                            className="p-6 rounded-lg text-center transform hover:scale-105 transition-transform duration-200"
                            style={{ backgroundColor: CORPORATE_NAVY }}
                        >
                            <div className="text-3xl font-bold mb-2" style={{ color: '#FFD700' }}>
                                {formatCurrency(mockGoldData.prices.gold24K)}
                            </div>
                            <div className="text-sm" style={{ color: MID_SLATE }}>24K Gold per gram</div>
                        </div>
                        <div
                            className="p-6 rounded-lg text-center transform hover:scale-105 transition-transform duration-200"
                            style={{ backgroundColor: CORPORATE_NAVY }}
                        >
                            <div className="text-3xl font-bold mb-2" style={{ color: CYBER_TEAL }}>
                                {mockGoldData.changes.gold24K.percentage.toFixed(2)}%
                            </div>
                            <div className="text-sm" style={{ color: MID_SLATE }}>Daily Change</div>
                        </div>
                        <div
                            className="p-6 rounded-lg text-center transform hover:scale-105 transition-transform duration-200"
                            style={{ backgroundColor: CORPORATE_NAVY }}
                        >
                            <div className="text-3xl font-bold mb-2" style={{ color: WARNING_AMBER }}>
                                {formatCurrency(mockGoldData.marketInsights.weeklyHigh)}
                            </div>
                            <div className="text-sm" style={{ color: MID_SLATE }}>Weekly High</div>
                        </div>
                        <div
                            className="p-6 rounded-lg text-center transform hover:scale-105 transition-transform duration-200"
                            style={{ backgroundColor: CORPORATE_NAVY }}
                        >
                            <div className="text-3xl font-bold mb-2" style={{ color: VIBRANT_GREEN }}>
                                {mockGoldData.marketInsights.marketSentiment}
                            </div>
                            <div className="text-sm" style={{ color: MID_SLATE }}>Market Sentiment</div>
                        </div>
                    </div>
                </section>

                {/* Enhanced Live Price Display */}
                <section className="mb-16 md:mb-20">
                    <div
                        className="p-6 md:p-8 rounded-xl shadow-lg border"
                        style={{
                            backgroundColor: CORPORATE_NAVY,
                            borderColor: MID_SLATE
                        }}
                    >
                        <h2 className="text-2xl md:text-3xl font-bold text-center mb-8" style={{ color: '#FFD700' }}>
                            Live Gold Prices
                        </h2>

                        {/* Gold Type Selector */}
                        <div className="flex justify-center mb-8">
                            <div className="flex space-x-2 p-1 rounded-lg" style={{ backgroundColor: DEEP_SPACE_BLUE }}>
                                {['24K', '22K', '18K'].map((type) => (
                                    <button
                                        key={type}
                                        onClick={() => setSelectedGoldType(type)}
                                        className={`px-6 py-3 rounded-lg font-medium transition-all duration-200 ${
                                            selectedGoldType === type ? 'transform scale-105' : 'hover:opacity-80'
                                        }`}
                                        style={{
                                            backgroundColor: selectedGoldType === type ? getGoldTypeColor(type) : 'transparent',
                                            color: selectedGoldType === type ? DEEP_SPACE_BLUE : LIGHT_SLATE
                                        }}
                                    >
                                        {type} Gold
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Unit Selector */}
                        <div className="flex justify-center mb-8">
                            <div className="flex space-x-2 p-1 rounded-lg" style={{ backgroundColor: DEEP_SPACE_BLUE }}>
                                {[
                                    { value: 'gram', label: 'Per Gram' },
                                    { value: 'sovereign', label: 'Per Sovereign (8g)' }
                                ].map((unit) => (
                                    <button
                                        key={unit.value}
                                        onClick={() => setSelectedUnit(unit.value)}
                                        className={`px-6 py-3 rounded-lg font-medium transition-all duration-200 ${
                                            selectedUnit === unit.value ? 'transform scale-105' : 'hover:opacity-80'
                                        }`}
                                        style={{
                                            backgroundColor: selectedUnit === unit.value ? CYBER_TEAL : 'transparent',
                                            color: selectedUnit === unit.value ? DEEP_SPACE_BLUE : LIGHT_SLATE
                                        }}
                                    >
                                        {unit.label}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Price Display */}
                        <div className="text-center mb-8">
                            <div className="text-6xl md:text-8xl font-bold mb-4" style={{ color: getGoldTypeColor(selectedGoldType) }}>
                                {formatCurrency(getCurrentPrice())}
                            </div>
                            <div className="text-xl" style={{ color: MID_SLATE }}>
                                {selectedGoldType} Gold - {selectedUnit === 'gram' ? 'per gram' : 'per sovereign (8g)'}
                            </div>

                            {/* Change Indicator */}
                            <div className="flex items-center justify-center mt-4 space-x-4">
                                <div
                                    className={`flex items-center text-xl font-semibold px-4 py-2 rounded-lg`}
                                    style={{
                                        backgroundColor: getCurrentChange().trend === 'up' ? `${VIBRANT_GREEN}20` : `${ERROR_RED}20`,
                                        color: getCurrentChange().trend === 'up' ? VIBRANT_GREEN : ERROR_RED
                                    }}
                                >
                                    {getCurrentChange().trend === 'up' ? '▲' : '▼'}
                                    <span className="ml-2">{formatCurrency(getCurrentChange().amount)}</span>
                                    <span className="ml-2">({getCurrentChange().percentage.toFixed(2)}%)</span>
                                </div>
                                <div className="text-sm" style={{ color: MID_SLATE }}>
                                    Today's Change
                                </div>
                            </div>
                        </div>

                        {/* Market Insights */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <div
                                className="p-4 rounded-lg text-center"
                                style={{ backgroundColor: DEEP_SPACE_BLUE }}
                            >
                                <div className="text-lg font-bold mb-1" style={{ color: WARNING_AMBER }}>
                                    {formatCurrency(mockGoldData.marketInsights.weeklyHigh)}
                                </div>
                                <div className="text-sm" style={{ color: MID_SLATE }}>Weekly High</div>
                            </div>
                            <div
                                className="p-4 rounded-lg text-center"
                                style={{ backgroundColor: DEEP_SPACE_BLUE }}
                            >
                                <div className="text-lg font-bold mb-1" style={{ color: ERROR_RED }}>
                                    {formatCurrency(mockGoldData.marketInsights.weeklyLow)}
                                </div>
                                <div className="text-sm" style={{ color: MID_SLATE }}>Weekly Low</div>
                            </div>
                            <div
                                className="p-4 rounded-lg text-center"
                                style={{ backgroundColor: DEEP_SPACE_BLUE }}
                            >
                                <div className="text-lg font-bold mb-1" style={{ color: CYBER_TEAL }}>
                                    {mockGoldData.marketInsights.volatility}
                                </div>
                                <div className="text-sm" style={{ color: MID_SLATE }}>Volatility</div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Enhanced Calculator Section */}
                <section className="mb-16 md:mb-20">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        {/* Value Calculator */}
                        <div
                            className="p-6 md:p-8 rounded-xl shadow-lg border"
                            style={{
                                backgroundColor: CORPORATE_NAVY,
                                borderColor: MID_SLATE
                            }}
                        >
                            <h2 className="text-2xl font-bold mb-6" style={{ color: CYBER_TEAL }}>
                                Gold Value Calculator
                            </h2>

                            <div className="space-y-6">
                                <div>
                                    <label className="block text-lg font-medium mb-3" style={{ color: LIGHT_SLATE }}>
                                        Weight ({selectedUnit === 'gram' ? 'grams' : 'sovereigns'})
                                    </label>
                                    <input
                                        type="number"
                                        value={goldWeight}
                                        onChange={(e) => setGoldWeight(Number(e.target.value) || 0)}
                                        className="w-full px-4 py-3 rounded-lg border-2 focus:outline-none focus:ring-2 transition-all duration-200"
                                        style={{
                                            backgroundColor: DEEP_SPACE_BLUE,
                                            borderColor: MID_SLATE,
                                            color: LIGHT_SLATE
                                        }}
                                        placeholder={selectedUnit === 'gram' ? "e.g., 10" : "e.g., 2.5"}
                                    />
                                </div>

                                <div
                                    className="p-6 rounded-lg border-l-4"
                                    style={{
                                        backgroundColor: DEEP_SPACE_BLUE,
                                        borderLeftColor: '#FFD700'
                                    }}
                                >
                                    <h4 className="font-semibold mb-4" style={{ color: LIGHT_SLATE }}>
                                        Estimated Value
                                    </h4>
                                    <div className="text-4xl font-bold mb-2" style={{ color: '#FFD700' }}>
                                        {formatCurrency(estimatedValue)}
                                    </div>
                                    <div className="text-sm space-y-1">
                                        <div className="flex justify-between">
                                            <span style={{ color: MID_SLATE }}>Gold Type:</span>
                                            <span style={{ color: LIGHT_SLATE }}>{selectedGoldType}</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span style={{ color: MID_SLATE }}>Weight:</span>
                                            <span style={{ color: LIGHT_SLATE }}>
                                                {goldWeight} {selectedUnit === 'gram' ? 'grams' : 'sovereigns'}
                                            </span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span style={{ color: MID_SLATE }}>Price per unit:</span>
                                            <span style={{ color: LIGHT_SLATE }}>{formatCurrency(getCurrentPrice())}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Investment Calculator */}
                        <div
                            className="p-6 md:p-8 rounded-xl shadow-lg border"
                            style={{
                                backgroundColor: CORPORATE_NAVY,
                                borderColor: MID_SLATE
                            }}
                        >
                            <h2 className="text-2xl font-bold mb-6" style={{ color: CYBER_TEAL }}>
                                Investment Calculator
                            </h2>

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
                                        placeholder="100,000"
                                    />
                                </div>

                                {investmentResults && (
                                    <div
                                        className="p-6 rounded-lg"
                                        style={{ backgroundColor: DEEP_SPACE_BLUE }}
                                    >
                                        <h4 className="font-semibold mb-4" style={{ color: LIGHT_SLATE }}>
                                            Investment Breakdown
                                        </h4>
                                        <div className="space-y-3 text-sm">
                                            <div className="flex justify-between">
                                                <span style={{ color: MID_SLATE }}>Gold Quantity:</span>
                                                <span style={{ color: LIGHT_SLATE }}>
                                                    {formatWeight(investmentResults.goldQuantity)} {selectedUnit}s
                                                </span>
                                            </div>
                                            <div className="flex justify-between">
                                                <span style={{ color: MID_SLATE }}>Weight in Grams:</span>
                                                <span style={{ color: LIGHT_SLATE }}>
                                                    {formatWeight(investmentResults.weightInGrams)}g
                                                </span>
                                            </div>
                                            <div className="flex justify-between">
                                                <span style={{ color: MID_SLATE }}>Current Value:</span>
                                                <span style={{ color: LIGHT_SLATE }}>
                                                    {formatCurrency(investmentResults.currentValue)}
                                                </span>
                                            </div>
                                        </div>

                                        <div className="mt-6">
                                            <h5 className="font-semibold mb-3" style={{ color: LIGHT_SLATE }}>
                                                Potential Annual Returns
                                            </h5>
                                            <div className="space-y-2 text-sm">
                                                <div className="flex justify-between">
                                                    <span style={{ color: MID_SLATE }}>Conservative (5%):</span>
                                                    <span style={{ color: VIBRANT_GREEN }}>
                                                        {formatCurrency(investmentResults.potentialReturns.conservative)}
                                                    </span>
                                                </div>
                                                <div className="flex justify-between">
                                                    <span style={{ color: MID_SLATE }}>Moderate (8%):</span>
                                                    <span style={{ color: WARNING_AMBER }}>
                                                        {formatCurrency(investmentResults.potentialReturns.moderate)}
                                                    </span>
                                                </div>
                                                <div className="flex justify-between">
                                                    <span style={{ color: MID_SLATE }}>Optimistic (12%):</span>
                                                    <span style={{ color: '#FFD700' }}>
                                                        {formatCurrency(investmentResults.potentialReturns.optimistic)}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </section>

                {/* Enhanced Investment Options */}
                <section className="mb-16 md:mb-20">
                    <h2 className="text-3xl font-bold text-center mb-10" style={{ color: CYBER_TEAL }}>
                        Gold Investment Options
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                        {howToInvestOptions.map((option, index) => (
                            <div
                                key={option.title}
                                className="p-8 rounded-xl text-center border-2 hover:-translate-y-2 transition-all duration-300 transform hover:scale-105"
                                style={{
                                    backgroundColor: CORPORATE_NAVY,
                                    borderColor: index === 0 ? '#FFD700' : index === 1 ? CYBER_TEAL : WARNING_AMBER
                                }}
                            >
                                <div className="text-6xl mb-6">{option.icon}</div>
                                <h3 className="text-2xl font-bold mb-4" style={{ color: LIGHT_SLATE }}>
                                    {option.title}
                                </h3>
                                <p className="mb-6" style={{ color: MID_SLATE }}>
                                    {option.description}
                                </p>

                                {/* Investment Details */}
                                <div
                                    className="p-4 rounded-lg mb-4"
                                    style={{ backgroundColor: DEEP_SPACE_BLUE }}
                                >
                                    {index === 0 && (
                                        <div className="space-y-2 text-sm">
                                            <div className="flex justify-between">
                                                <span style={{ color: MID_SLATE }}>Liquidity:</span>
                                                <span style={{ color: WARNING_AMBER }}>Medium</span>
                                            </div>
                                            <div className="flex justify-between">
                                                <span style={{ color: MID_SLATE }}>Storage Cost:</span>
                                                <span style={{ color: ERROR_RED }}>High</span>
                                            </div>
                                            <div className="flex justify-between">
                                                <span style={{ color: MID_SLATE }}>Min Investment:</span>
                                                <span style={{ color: LIGHT_SLATE }}>LKR 50,000</span>
                                            </div>
                                        </div>
                                    )}
                                    {index === 1 && (
                                        <div className="space-y-2 text-sm">
                                            <div className="flex justify-between">
                                                <span style={{ color: MID_SLATE }}>Liquidity:</span>
                                                <span style={{ color: VIBRANT_GREEN }}>High</span>
                                            </div>
                                            <div className="flex justify-between">
                                                <span style={{ color: MID_SLATE }}>Storage Cost:</span>
                                                <span style={{ color: VIBRANT_GREEN }}>None</span>
                                            </div>
                                            <div className="flex justify-between">
                                                <span style={{ color: MID_SLATE }}>Min Investment:</span>
                                                <span style={{ color: LIGHT_SLATE }}>LKR 1,000</span>
                                            </div>
                                        </div>
                                    )}
                                    {index === 2 && (
                                        <div className="space-y-2 text-sm">
                                            <div className="flex justify-between">
                                                <span style={{ color: MID_SLATE }}>Liquidity:</span>
                                                <span style={{ color: CYBER_TEAL }}>Medium-High</span>
                                            </div>
                                            <div className="flex justify-between">
                                                <span style={{ color: MID_SLATE }}>Storage Cost:</span>
                                                <span style={{ color: VIBRANT_GREEN }}>Low</span>
                                            </div>
                                            <div className="flex justify-between">
                                                <span style={{ color: MID_SLATE }}>Min Investment:</span>
                                                <span style={{ color: LIGHT_SLATE }}>LKR 5,000</span>
                                            </div>
                                        </div>
                                    )}
                                </div>

                                <button
                                    className="w-full px-6 py-3 rounded-lg font-medium transition-all duration-200 hover:opacity-80"
                                    style={{
                                        backgroundColor: index === 0 ? '#FFD700' : index === 1 ? CYBER_TEAL : WARNING_AMBER,
                                        color: DEEP_SPACE_BLUE
                                    }}
                                >
                                    Learn More
                                </button>
                            </div>
                        ))}
                    </div>

                    {/* Investment Comparison Table */}
                    <div className="mt-12">
                        <h3 className="text-2xl font-bold text-center mb-8" style={{ color: LIGHT_SLATE }}>
                            Investment Comparison
                        </h3>
                        <div
                            className="rounded-lg overflow-hidden border"
                            style={{
                                backgroundColor: CORPORATE_NAVY,
                                borderColor: MID_SLATE
                            }}
                        >
                            <table className="w-full text-left">
                                <thead style={{ backgroundColor: DEEP_SPACE_BLUE }}>
                                    <tr>
                                        <th className="px-6 py-4 font-semibold" style={{ color: LIGHT_SLATE }}>Investment Type</th>
                                        <th className="px-6 py-4 font-semibold" style={{ color: LIGHT_SLATE }}>Liquidity</th>
                                        <th className="px-6 py-4 font-semibold" style={{ color: LIGHT_SLATE }}>Storage Cost</th>
                                        <th className="px-6 py-4 font-semibold" style={{ color: LIGHT_SLATE }}>Min Investment</th>
                                        <th className="px-6 py-4 font-semibold" style={{ color: LIGHT_SLATE }}>Best For</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr className="border-t" style={{ borderTopColor: MID_SLATE }}>
                                        <td className="px-6 py-4 font-medium" style={{ color: LIGHT_SLATE }}>Physical Gold</td>
                                        <td className="px-6 py-4" style={{ color: WARNING_AMBER }}>Medium</td>
                                        <td className="px-6 py-4" style={{ color: ERROR_RED }}>High</td>
                                        <td className="px-6 py-4" style={{ color: LIGHT_SLATE }}>LKR 50,000</td>
                                        <td className="px-6 py-4" style={{ color: MID_SLATE }}>Long-term wealth preservation</td>
                                    </tr>
                                    <tr className="border-t" style={{ borderTopColor: MID_SLATE }}>
                                        <td className="px-6 py-4 font-medium" style={{ color: LIGHT_SLATE }}>Digital Gold</td>
                                        <td className="px-6 py-4" style={{ color: VIBRANT_GREEN }}>High</td>
                                        <td className="px-6 py-4" style={{ color: VIBRANT_GREEN }}>None</td>
                                        <td className="px-6 py-4" style={{ color: LIGHT_SLATE }}>LKR 1,000</td>
                                        <td className="px-6 py-4" style={{ color: MID_SLATE }}>Flexible gold exposure</td>
                                    </tr>
                                    <tr className="border-t" style={{ borderTopColor: MID_SLATE }}>
                                        <td className="px-6 py-4 font-medium" style={{ color: LIGHT_SLATE }}>Gold Savings</td>
                                        <td className="px-6 py-4" style={{ color: CYBER_TEAL }}>Medium-High</td>
                                        <td className="px-6 py-4" style={{ color: VIBRANT_GREEN }}>Low</td>
                                        <td className="px-6 py-4" style={{ color: LIGHT_SLATE }}>LKR 5,000</td>
                                        <td className="px-6 py-4" style={{ color: MID_SLATE }}>Regular accumulation</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </section>
                
                {/* Section 5: FAQ */}
                <section className="max-w-3xl mx-auto">
                    <h2 className="text-3xl font-bold text-center mb-10">Understanding Gold</h2>
                    <FAQItem question="Why does the price of gold change daily?">
                        <p>The price of gold is determined by global supply and demand. Factors like economic uncertainty (people buy gold as a "safe haven"), inflation, interest rates set by central banks, and currency fluctuations (especially the US Dollar) all affect its price.</p>
                    </FAQItem>
                    <FAQItem question="What is the difference between 22K and 24K gold?">
                        <p>Karat (K) measures purity. <strong>24K</strong> is pure gold (99.9% fine). It's soft and has a rich yellow color. <strong>22K</strong> is an alloy made of 22 parts gold and 2 parts other metals (like copper or silver). This makes it harder and more durable, which is why it's commonly used for jewellery.</p>
                    </FAQItem>
                    <FAQItem question="Is physical gold a good investment?">
                        <p>Physical gold is excellent for wealth preservation and acts as a hedge against inflation. However, it doesn't generate regular income (like interest from a bond), and requires secure storage. Digital gold offers an alternative without the storage concerns.</p>
                    </FAQItem>
                </section>
                
            </div>
        </div>
    );
};

export default Goldmarket;