import React, { useState, useMemo } from "react";
import {
    DEEP_SPACE_BLUE,
    LUMINOUS_ACCENT,
    CORPORATE_NAVY,
    LIGHT_SLATE,
    MID_SLATE,
    CYBER_TEAL,
    VIBRANT_GREEN,
    ERROR_RED,
    WARNING_AMBER,
    CHART_PURPLE,
    CHART_PINK,
    CHART_SKY_BLUE
} from '../constants';

const UnitTrustRates = () => {
    const [selectedCategory, setSelectedCategory] = useState("");
    const [selectedCompany, setSelectedCompany] = useState("");
    const [searchTerm, setSearchTerm] = useState("");
    const [sortBy, setSortBy] = useState("ytd");
    const [sortOrder, setSortOrder] = useState("desc");
    const [openIndex, setOpenIndex] = useState(null);
    const [viewMode, setViewMode] = useState("cards"); // "cards" or "table"

    const toggleFAQ = (index) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    const rates = [
        {
            fund: "ASTRUE Active Income Fund",
            category: "OPEN-ENDED INCOME FUNDS",
            company: "Asset Trust Management (Pvt) Ltd",
            navValue: "2,423,490,261.11",
            navPerUnit: "196.13",
            units: "216",
            ytd: 2.42,
            year2024: 12.44,
            year2023: 41.28,
            year2022: 13.39,
            year2021: 6.30,
            riskLevel: "Low",
            description: "Conservative income-focused fund with stable returns"
        },
        {
            fund: "CAL Fixed Income Opportunities Fund",
            category: "OPEN-ENDED INCOME FUNDS",
            company: "Capital Alliance Investments Ltd",
            navValue: "65,506,242,080.49",
            navPerUnit: "38.21",
            units: "8499",
            ytd: 2.47,
            year2024: 13.24,
            year2023: 25.70,
            year2022: 20.24,
            year2021: 3.59,
            riskLevel: "Low",
            description: "Fixed income opportunities with consistent performance"
        },
        {
            fund: "Ceylon Financial Sector Fund",
            category: "OPEN-END EQUITY INDEX/SECTOR FUNDS",
            company: "Ceylon Asset Management Limited",
            navValue: "129,455,784.31",
            navPerUnit: "15.52",
            units: "127",
            ytd: 0.56,
            year2024: 64.21,
            year2023: 86.13,
            year2022: -38.31,
            year2021: 47.57,
            riskLevel: "High",
            description: "Sector-focused equity fund with high growth potential"
        },
        {
            fund: "CEYLON Index Fund",
            category: "OPEN-END EQUITY INDEX/SECTOR FUNDS",
            company: "Ceylon Asset Management Limited",
            navValue: "206,995,759.24",
            navPerUnit: "92.02",
            units: "299",
            ytd: -0.37,
            year2024: 40.95,
            year2023: 7.01,
            year2022: -35.82,
            year2021: 112.09,
            riskLevel: "Medium",
            description: "Diversified index fund tracking market performance"
        },
    ];

    const faqData = [
        {
            question: 'What are Unit Trusts?(ඒකක භාර යනු මොනවාද?)',
            answer: 'A unit trust is a collective investment scheme where money from many investors is pooled together and managed by professionals. The pooled money is used to buy a diversified portfolio of assets such as stocks, bonds, or real estate. Each investor owns "units" that represent their share of the fund. (ඒකක භාරයක් යනු බොහෝ ආයෝජකයින්ගෙන් ලැබෙන මුදල් එකට එකතු කර වෘත්තිකයන් විසින් කළමනාකරණය කරනු ලබන සාමූහික ආයෝජන යෝජනා ක්‍රමයකි. එකතු කරන ලද මුදල් කොටස්, බැඳුම්කර හෝ දේපළ වෙළඳාම් වැනි විවිධාංගීකරණය වූ වත්කම් කළඹක් මිලදී ගැනීමට භාවිතා කරයි. සෑම ආයෝජකයෙකුටම අරමුදලේ ඔවුන්ගේ කොටස නියෝජනය කරන "ඒකක" හිමි වේ.)'
        },
        {
            question: 'Does a unit trust give more return than FD rates? (ඒකක භාරයක් FD අනුපාතවලට වඩා වැඩි ප්‍රතිලාභයක් ලබා දෙනවාද?)',
            answer: 'Unit trusts generally offer higher returns over the long term because they invest in market-linked assets like stocks and bonds, while FDs provide fixed but usually lower interest rates. However, FD rates can sometimes be higher for large, long-term deposits. (ඒකක භාර සාමාන්‍යයෙන් දිගු කාලීනව ඉහළ ප්‍රතිලාභ ලබා දෙන්නේ ඔවුන් කොටස් සහ බැඳුම්කර වැනි වෙළඳපොළට සම්බන්ධ වත්කම්වල ආයෝජනය කරන අතර, ස්ථාවර තැන්පතු ස්ථාවර නමුත් සාමාන්‍යයෙන් අඩු පොලී අනුපාත ලබා දෙන බැවිනි. කෙසේ වෙතත්, විශාල, දිගු කාලීන තැන්පතු සඳහා FD අනුපාත සමහර විට වැඩි විය හැකිය.)'
        },
        {
            question: 'How about the liquidity of unit trusts? (ඒකක භාරවල ද්‍රවශීලතාවය කෙසේද?)',
            answer: 'Unit trusts offer high liquidity, allowing you to redeem your investment any business day without penalties. FDs usually lock your money for a fixed term, and early withdrawal may incur penalties.(ඒකක භාර මඟින් ඉහළ ද්‍රවශීලතාවයක් ලබා දෙන අතර, එමඟින් ඕනෑම ව්‍යාපාරික දිනයක දඩ මුදල් නොමැතිව ඔබේ ආයෝජනය මුදවා ගැනීමට ඔබට ඉඩ සලසයි. ස්ථාවර තැන්පතු සාමාන්‍යයෙන් ඔබේ මුදල් ස්ථාවර කාලයක් සඳහා අගුලු දමන අතර, කලින් මුදල් ආපසු ගැනීම් සඳහා දඩ මුදල් අය කළ හැකිය.)'
        },
        {
            question: 'How about the risk of investing in unit trusts compared to FDs? (ස්ථාවර තැන්පතු හා සසඳන විට ඒකක භාරවල ආයෝජනය කිරීමේ අවදානම කෙසේද?)',
            answer: 'Unit trusts carry market risk, so their value can fluctuate daily. FDs are low-risk with guaranteed returns, making them safer but with lower growth potential. (ඒකක භාර වෙළඳපල අවදානමක් දරයි, එබැවින් ඒවායේ වටිනාකම දිනපතා උච්චාවචනය විය හැකිය. ස්ථාවර තැන්පතු සහතික කළ ප්‍රතිලාභ සහිත අඩු අවදානම් සහිත වන අතර, ඒවා ආරක්ෂිත කරයි නමුත් අඩු වර්ධන විභවයක් ඇත.)'
        },
        {
            question: 'How to know whether a unit trust company is licensed or registered? (ඒකක භාර සමාගමක් බලපත්‍රලාභීද නැතහොත් ලියාපදිංචිද යන්න දැන ගන්නේ කෙසේද?)',
            answer: 'In Sri Lanka, the Securities and Exchange Commission (SEC) is the primary regulatory authority overseeing the capital market. Established under the Securities and Exchange Commission of Sri Lanka Act, the SEC is responsible for regulating and supervising the securities market to ensure investor protection and market integrity. This includes licensing and monitoring unit trust managing companies. To verify if a unit trust company is licensed, you can visit the SEC\'s official website and refer to their list of licensed unit trust managing companies. For more information, visit the <a href="https://www.sec.gov.lk/unit-trust/" target="_blank" rel="noopener noreferrer">SEC Sri Lanka website</a>.(ශ්‍රී ලංකාවේ, සුරැකුම්පත් හා විනිමය කොමිෂන් සභාව (SEC) ප්‍රාග්ධන වෙළඳපොළ අධීක්ෂණය කරන ප්‍රාථමික නියාමන අධිකාරිය වේ. ශ්‍රී ලංකා සුරැකුම්පත් හා විනිමය කොමිෂන් සභා පනත යටතේ ස්ථාපිත කර ඇති සුරැකුම්පත් හා විනිමය කොමිෂන් සභාව, ආයෝජක ආරක්ෂාව සහ වෙළඳපල අඛණ්ඩතාව සහතික කිරීම සඳහා සුරැකුම්පත් වෙළඳපොළ නියාමනය කිරීම සහ අධීක්ෂණය කිරීම සඳහා වගකිව යුතුය. මෙයට ඒකක භාර කළමනාකරණ සමාගම් බලපත්‍ර ලබා දීම සහ අධීක්ෂණය කිරීම ඇතුළත් වේ. ඒකක භාර සමාගමක් බලපත්‍රලාභී දැයි සත්‍යාපනය කිරීමට, ඔබට SEC හි නිල වෙබ් අඩවියට පිවිස ඔවුන්ගේ බලපත්‍රලාභී ඒකක භාර කළමනාකරණ සමාගම් ලැයිස්තුවට පිවිසිය හැකිය.)'
          }
           
        
        
        
        
    ];

    const uniqueCategories = [...new Set(rates.map(item => item.category))];
    const uniqueCompanies = [...new Set(rates.map(item => item.company))];

    // Enhanced filtering and sorting logic
    const filteredAndSortedRates = useMemo(() => {
        let filtered = rates.filter(item => {
            const matchesCategory = selectedCategory ? item.category === selectedCategory : true;
            const matchesCompany = selectedCompany ? item.company === selectedCompany : true;
            const matchesSearch = searchTerm ?
                item.fund.toLowerCase().includes(searchTerm.toLowerCase()) ||
                item.company.toLowerCase().includes(searchTerm.toLowerCase()) : true;

            return matchesCategory && matchesCompany && matchesSearch;
        });

        // Sort the filtered results
        filtered.sort((a, b) => {
            let aValue = a[sortBy];
            let bValue = b[sortBy];

            // Handle percentage values
            if (typeof aValue === 'number') {
                return sortOrder === 'desc' ? bValue - aValue : aValue - bValue;
            }

            // Handle string values
            if (sortOrder === 'desc') {
                return bValue.localeCompare(aValue);
            }
            return aValue.localeCompare(bValue);
        });

        return filtered;
    }, [rates, selectedCategory, selectedCompany, searchTerm, sortBy, sortOrder]);

    // Calculate summary metrics
    const summaryMetrics = useMemo(() => {
        const totalFunds = filteredAndSortedRates.length;
        const avgYTD = filteredAndSortedRates.reduce((sum, fund) => sum + fund.ytd, 0) / totalFunds;
        const bestPerformer = filteredAndSortedRates.reduce((best, fund) =>
            fund.ytd > best.ytd ? fund : best, filteredAndSortedRates[0] || {});
        const totalAssets = filteredAndSortedRates.reduce((sum, fund) =>
            sum + parseFloat(fund.navValue.replace(/,/g, '')), 0);

        return {
            totalFunds,
            avgYTD: avgYTD.toFixed(2),
            bestPerformer,
            totalAssets: totalAssets.toLocaleString('en-LK')
        };
    }, [filteredAndSortedRates]);

    // Helper functions
    const getPerformanceColor = (value) => {
        if (value > 10) return VIBRANT_GREEN;
        if (value > 0) return CYBER_TEAL;
        if (value > -10) return WARNING_AMBER;
        return ERROR_RED;
    };

    const getRiskColor = (risk) => {
        switch (risk) {
            case 'Low': return VIBRANT_GREEN;
            case 'Medium': return WARNING_AMBER;
            case 'High': return ERROR_RED;
            default: return MID_SLATE;
        }
    };

    const formatCurrency = (value) => {
        return `LKR ${parseFloat(value.replace(/,/g, '')).toLocaleString('en-LK')}`;
    };

    return (
        <div className="min-h-screen" style={{ backgroundColor: DEEP_SPACE_BLUE }}>
            <div className="max-w-7xl mx-auto p-6">
                {/* Enhanced Header */}
                <div className="text-center mb-8">
                    <h1 className="text-5xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-cyber-teal to-luminous-accent">
                        Unit Trust Funds
                    </h1>
                    <p className="text-xl mb-6" style={{ color: LIGHT_SLATE }}>
                        Explore Sri Lanka's leading unit trust funds with real-time performance data
                    </p>

                    {/* Summary Metrics Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
                        <div
                            className="p-4 rounded-xl border"
                            style={{
                                backgroundColor: CORPORATE_NAVY,
                                borderColor: `${CYBER_TEAL}40`
                            }}
                        >
                            <div className="text-center">
                                <p className="text-sm font-medium mb-1" style={{ color: MID_SLATE }}>
                                    Total Funds
                                </p>
                                <p className="text-2xl font-bold" style={{ color: CYBER_TEAL }}>
                                    {summaryMetrics.totalFunds}
                                </p>
                            </div>
                        </div>

                        <div
                            className="p-4 rounded-xl border"
                            style={{
                                backgroundColor: CORPORATE_NAVY,
                                borderColor: `${CYBER_TEAL}40`
                            }}
                        >
                            <div className="text-center">
                                <p className="text-sm font-medium mb-1" style={{ color: MID_SLATE }}>
                                    Average YTD
                                </p>
                                <p
                                    className="text-2xl font-bold"
                                    style={{ color: getPerformanceColor(parseFloat(summaryMetrics.avgYTD)) }}
                                >
                                    {summaryMetrics.avgYTD}%
                                </p>
                            </div>
                        </div>

                        <div
                            className="p-4 rounded-xl border"
                            style={{
                                backgroundColor: CORPORATE_NAVY,
                                borderColor: `${CYBER_TEAL}40`
                            }}
                        >
                            <div className="text-center">
                                <p className="text-sm font-medium mb-1" style={{ color: MID_SLATE }}>
                                    Best Performer
                                </p>
                                <p className="text-lg font-bold truncate" style={{ color: LUMINOUS_ACCENT }}>
                                    {summaryMetrics.bestPerformer?.fund?.split(' ')[0] || 'N/A'}
                                </p>
                                <p
                                    className="text-sm"
                                    style={{ color: getPerformanceColor(summaryMetrics.bestPerformer?.ytd || 0) }}
                                >
                                    {summaryMetrics.bestPerformer?.ytd?.toFixed(2) || 0}%
                                </p>
                            </div>
                        </div>

                        <div
                            className="p-4 rounded-xl border"
                            style={{
                                backgroundColor: CORPORATE_NAVY,
                                borderColor: `${CYBER_TEAL}40`
                            }}
                        >
                            <div className="text-center">
                                <p className="text-sm font-medium mb-1" style={{ color: MID_SLATE }}>
                                    Total Assets
                                </p>
                                <p className="text-lg font-bold" style={{ color: CYBER_TEAL }}>
                                    LKR {(parseFloat(summaryMetrics.totalAssets.replace(/,/g, '')) / 1000000000).toFixed(1)}B
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Enhanced Filters and Controls */}
                <div
                    className="p-6 rounded-xl border mb-8"
                    style={{
                        backgroundColor: CORPORATE_NAVY,
                        borderColor: `${CYBER_TEAL}40`
                    }}
                >
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
                        {/* Search */}
                        <div>
                            <label className="block text-sm font-medium mb-2" style={{ color: LIGHT_SLATE }}>
                                Search Funds
                            </label>
                            <div className="relative">
                                <input
                                    type="text"
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="w-full p-3 pl-10 rounded-lg border-2 focus:outline-none focus:ring-2 transition-all duration-200"
                                    style={{
                                        backgroundColor: DEEP_SPACE_BLUE,
                                        borderColor: MID_SLATE,
                                        color: LIGHT_SLATE
                                    }}
                                    placeholder="Search by fund name..."
                                />
                                <svg
                                    className="absolute left-3 top-3.5 w-4 h-4"
                                    style={{ color: MID_SLATE }}
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                </svg>
                            </div>
                        </div>

                        {/* Category Selector */}
                        <div>
                            <label className="block text-sm font-medium mb-2" style={{ color: LIGHT_SLATE }}>
                                Category
                            </label>
                            <select
                                value={selectedCategory}
                                onChange={(e) => setSelectedCategory(e.target.value)}
                                className="w-full p-3 rounded-lg border-2 focus:outline-none focus:ring-2 transition-all duration-200"
                                style={{
                                    backgroundColor: DEEP_SPACE_BLUE,
                                    borderColor: MID_SLATE,
                                    color: LIGHT_SLATE
                                }}
                            >
                                <option value="">All Categories</option>
                                {uniqueCategories.map((cat, idx) => (
                                    <option key={idx} value={cat}>{cat}</option>
                                ))}
                            </select>
                        </div>

                        {/* Company Selector */}
                        <div>
                            <label className="block text-sm font-medium mb-2" style={{ color: LIGHT_SLATE }}>
                                Company
                            </label>
                            <select
                                value={selectedCompany}
                                onChange={(e) => setSelectedCompany(e.target.value)}
                                className="w-full p-3 rounded-lg border-2 focus:outline-none focus:ring-2 transition-all duration-200"
                                style={{
                                    backgroundColor: DEEP_SPACE_BLUE,
                                    borderColor: MID_SLATE,
                                    color: LIGHT_SLATE
                                }}
                            >
                                <option value="">All Companies</option>
                                {uniqueCompanies.map((comp, idx) => (
                                    <option key={idx} value={comp}>{comp}</option>
                                ))}
                            </select>
                        </div>

                        {/* Sort Controls */}
                        <div>
                            <label className="block text-sm font-medium mb-2" style={{ color: LIGHT_SLATE }}>
                                Sort By
                            </label>
                            <div className="flex gap-2">
                                <select
                                    value={sortBy}
                                    onChange={(e) => setSortBy(e.target.value)}
                                    className="flex-1 p-3 rounded-lg border-2 focus:outline-none focus:ring-2 transition-all duration-200"
                                    style={{
                                        backgroundColor: DEEP_SPACE_BLUE,
                                        borderColor: MID_SLATE,
                                        color: LIGHT_SLATE
                                    }}
                                >
                                    <option value="ytd">YTD</option>
                                    <option value="year2024">2024</option>
                                    <option value="navPerUnit">NAV</option>
                                    <option value="fund">Name</option>
                                </select>
                                <button
                                    onClick={() => setSortOrder(sortOrder === 'desc' ? 'asc' : 'desc')}
                                    className="p-3 rounded-lg border-2 transition-all duration-200 hover:scale-105"
                                    style={{
                                        backgroundColor: CYBER_TEAL,
                                        borderColor: CYBER_TEAL,
                                        color: DEEP_SPACE_BLUE
                                    }}
                                >
                                    {sortOrder === 'desc' ? '↓' : '↑'}
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* View Mode Toggle */}
                    <div className="flex justify-between items-center">
                        <div className="flex items-center space-x-4">
                            <span className="text-sm font-medium" style={{ color: LIGHT_SLATE }}>
                                View Mode:
                            </span>
                            <div className="flex rounded-lg overflow-hidden border" style={{ borderColor: MID_SLATE }}>
                                <button
                                    onClick={() => setViewMode('cards')}
                                    className={`px-4 py-2 text-sm font-medium transition-all duration-200 ${
                                        viewMode === 'cards' ? 'text-white' : ''
                                    }`}
                                    style={{
                                        backgroundColor: viewMode === 'cards' ? CYBER_TEAL : 'transparent',
                                        color: viewMode === 'cards' ? DEEP_SPACE_BLUE : LIGHT_SLATE
                                    }}
                                >
                                    Cards
                                </button>
                                <button
                                    onClick={() => setViewMode('table')}
                                    className={`px-4 py-2 text-sm font-medium transition-all duration-200 ${
                                        viewMode === 'table' ? 'text-white' : ''
                                    }`}
                                    style={{
                                        backgroundColor: viewMode === 'table' ? CYBER_TEAL : 'transparent',
                                        color: viewMode === 'table' ? DEEP_SPACE_BLUE : LIGHT_SLATE
                                    }}
                                >
                                    Table
                                </button>
                            </div>
                        </div>

                        <div className="text-sm" style={{ color: MID_SLATE }}>
                            Showing {filteredAndSortedRates.length} of {rates.length} funds
                        </div>
                    </div>
                </div>

                {/* Dynamic Content Based on View Mode */}
                {viewMode === 'cards' ? (
                    /* Card View */
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                        {filteredAndSortedRates.map((fund, index) => (
                            <div
                                key={index}
                                className="group relative overflow-hidden rounded-xl border-2 transition-all duration-300 hover:scale-105 hover:shadow-2xl cursor-pointer"
                                style={{
                                    backgroundColor: CORPORATE_NAVY,
                                    borderColor: `${CYBER_TEAL}40`,
                                    boxShadow: `0 8px 32px ${CYBER_TEAL}20`
                                }}
                            >
                                {/* Gradient Overlay */}
                                <div
                                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                                    style={{
                                        background: `linear-gradient(135deg, ${CYBER_TEAL}10, ${LUMINOUS_ACCENT}05)`
                                    }}
                                />

                                <div className="relative p-6">
                                    {/* Fund Header */}
                                    <div className="mb-4">
                                        <div className="flex justify-between items-start mb-2">
                                            <h3 className="text-lg font-bold leading-tight" style={{ color: LUMINOUS_ACCENT }}>
                                                {fund.fund}
                                            </h3>
                                            <div
                                                className="px-2 py-1 rounded-full text-xs font-bold"
                                                style={{
                                                    backgroundColor: getRiskColor(fund.riskLevel),
                                                    color: DEEP_SPACE_BLUE
                                                }}
                                            >
                                                {fund.riskLevel}
                                            </div>
                                        </div>
                                        <p className="text-sm mb-2" style={{ color: MID_SLATE }}>
                                            {fund.company}
                                        </p>
                                        <p className="text-xs" style={{ color: LIGHT_SLATE }}>
                                            {fund.description}
                                        </p>
                                    </div>

                                    {/* Key Metrics */}
                                    <div className="grid grid-cols-2 gap-4 mb-4">
                                        <div className="text-center">
                                            <p className="text-xs font-medium mb-1" style={{ color: MID_SLATE }}>
                                                NAV per Unit
                                            </p>
                                            <p className="text-lg font-bold" style={{ color: CYBER_TEAL }}>
                                                LKR {fund.navPerUnit}
                                            </p>
                                        </div>
                                        <div className="text-center">
                                            <p className="text-xs font-medium mb-1" style={{ color: MID_SLATE }}>
                                                YTD Return
                                            </p>
                                            <p
                                                className="text-lg font-bold"
                                                style={{ color: getPerformanceColor(fund.ytd) }}
                                            >
                                                {fund.ytd.toFixed(2)}%
                                            </p>
                                        </div>
                                    </div>

                                    {/* Performance Chart */}
                                    <div className="mb-4">
                                        <p className="text-xs font-medium mb-2" style={{ color: MID_SLATE }}>
                                            5-Year Performance
                                        </p>
                                        <div className="flex items-end space-x-1 h-12">
                                            {[fund.year2021, fund.year2022, fund.year2023, fund.year2024, fund.ytd].map((value, idx) => (
                                                <div
                                                    key={idx}
                                                    className="flex-1 rounded-t transition-all duration-300 hover:opacity-80"
                                                    style={{
                                                        backgroundColor: getPerformanceColor(value),
                                                        height: `${Math.max(Math.abs(value) / 100 * 100, 5)}%`,
                                                        opacity: value < 0 ? 0.6 : 1
                                                    }}
                                                    title={`${2021 + idx}: ${value.toFixed(2)}%`}
                                                />
                                            ))}
                                        </div>
                                        <div className="flex justify-between text-xs mt-1" style={{ color: MID_SLATE }}>
                                            <span>2021</span>
                                            <span>2022</span>
                                            <span>2023</span>
                                            <span>2024</span>
                                            <span>YTD</span>
                                        </div>
                                    </div>

                                    {/* Additional Info */}
                                    <div className="text-xs space-y-1" style={{ color: MID_SLATE }}>
                                        <div className="flex justify-between">
                                            <span>Total Assets:</span>
                                            <span>{formatCurrency(fund.navValue)}</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span>Units in Issue:</span>
                                            <span>{fund.units}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    /* Table View */
                    <div className="overflow-x-auto mb-8">
                        <div
                            className="rounded-xl border"
                            style={{
                                backgroundColor: CORPORATE_NAVY,
                                borderColor: `${CYBER_TEAL}40`
                            }}
                        >
                            <table className="w-full text-sm">
                                <thead>
                                    <tr style={{ backgroundColor: `${CYBER_TEAL}20` }}>
                                        <th className="px-4 py-3 text-left font-semibold" style={{ color: LIGHT_SLATE }}>
                                            Fund Name
                                        </th>
                                        <th className="px-4 py-3 text-right font-semibold" style={{ color: LIGHT_SLATE }}>
                                            NAV per Unit
                                        </th>
                                        <th className="px-4 py-3 text-right font-semibold" style={{ color: LIGHT_SLATE }}>
                                            YTD
                                        </th>
                                        <th className="px-4 py-3 text-right font-semibold" style={{ color: LIGHT_SLATE }}>
                                            2024
                                        </th>
                                        <th className="px-4 py-3 text-right font-semibold" style={{ color: LIGHT_SLATE }}>
                                            2023
                                        </th>
                                        <th className="px-4 py-3 text-right font-semibold" style={{ color: LIGHT_SLATE }}>
                                            Risk
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {filteredAndSortedRates.map((fund, index) => (
                                        <tr
                                            key={index}
                                            className="border-t transition-all duration-200 hover:bg-opacity-50"
                                            style={{
                                                borderColor: `${MID_SLATE}30`,
                                                backgroundColor: 'transparent'
                                            }}
                                        >
                                            <td className="px-4 py-4">
                                                <div>
                                                    <p className="font-semibold" style={{ color: LUMINOUS_ACCENT }}>
                                                        {fund.fund}
                                                    </p>
                                                    <p className="text-xs" style={{ color: MID_SLATE }}>
                                                        {fund.company}
                                                    </p>
                                                </div>
                                            </td>
                                            <td className="px-4 py-4 text-right font-semibold" style={{ color: CYBER_TEAL }}>
                                                LKR {fund.navPerUnit}
                                            </td>
                                            <td
                                                className="px-4 py-4 text-right font-bold"
                                                style={{ color: getPerformanceColor(fund.ytd) }}
                                            >
                                                {fund.ytd.toFixed(2)}%
                                            </td>
                                            <td
                                                className="px-4 py-4 text-right font-semibold"
                                                style={{ color: getPerformanceColor(fund.year2024) }}
                                            >
                                                {fund.year2024.toFixed(2)}%
                                            </td>
                                            <td
                                                className="px-4 py-4 text-right font-semibold"
                                                style={{ color: getPerformanceColor(fund.year2023) }}
                                            >
                                                {fund.year2023.toFixed(2)}%
                                            </td>
                                            <td className="px-4 py-4 text-right">
                                                <span
                                                    className="px-2 py-1 rounded-full text-xs font-bold"
                                                    style={{
                                                        backgroundColor: getRiskColor(fund.riskLevel),
                                                        color: DEEP_SPACE_BLUE
                                                    }}
                                                >
                                                    {fund.riskLevel}
                                                </span>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}


                {/* Enhanced FAQ Section */}
                <div className="mt-12">
                    <div className="text-center mb-8">
                        <h2 className="text-3xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-cyber-teal to-luminous-accent">
                            Frequently Asked Questions
                        </h2>
                        <p className="text-lg" style={{ color: MID_SLATE }}>
                            Everything you need to know about unit trusts in Sri Lanka
                        </p>
                    </div>

                    <div className="space-y-4 mb-8">
                        {faqData.map((faq, index) => (
                            <div
                                key={index}
                                className="rounded-xl border-2 transition-all duration-300 hover:shadow-lg cursor-pointer"
                                style={{
                                    backgroundColor: CORPORATE_NAVY,
                                    borderColor: openIndex === index ? CYBER_TEAL : `${CYBER_TEAL}40`
                                }}
                                onClick={() => toggleFAQ(index)}
                            >
                                <div className="p-6">
                                    <div className="flex justify-between items-center">
                                        <h3 className="font-semibold text-lg pr-4" style={{ color: LIGHT_SLATE }}>
                                            {faq.question}
                                        </h3>
                                        <div
                                            className="w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300"
                                            style={{
                                                backgroundColor: openIndex === index ? CYBER_TEAL : `${CYBER_TEAL}20`,
                                                color: openIndex === index ? DEEP_SPACE_BLUE : CYBER_TEAL,
                                                transform: openIndex === index ? 'rotate(45deg)' : 'rotate(0deg)'
                                            }}
                                        >
                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                                            </svg>
                                        </div>
                                    </div>

                                    {openIndex === index && (
                                        <div className="mt-4 pt-4 border-t" style={{ borderColor: `${CYBER_TEAL}30` }}>
                                            <p
                                                className="leading-relaxed"
                                                style={{ color: LIGHT_SLATE }}
                                                dangerouslySetInnerHTML={{ __html: faq.answer }}
                                            />
                                        </div>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Enhanced External Links Section */}
                <div
                    className="mt-8 p-6 rounded-xl border text-center"
                    style={{
                        backgroundColor: `${CYBER_TEAL}10`,
                        borderColor: CYBER_TEAL
                    }}
                >
                    <h3 className="text-xl font-bold mb-4" style={{ color: CYBER_TEAL }}>
                        Official Resources
                    </h3>
                    <div className="space-y-3">
                        <a
                            href="https://www.sec.gov.lk/unit-trust-list/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center px-6 py-3 rounded-lg font-semibold transition-all duration-200 hover:scale-105"
                            style={{
                                backgroundColor: CYBER_TEAL,
                                color: DEEP_SPACE_BLUE,
                                boxShadow: `0 4px 15px ${CYBER_TEAL}40`
                            }}
                        >
                            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                            </svg>
                            SEC Sri Lanka - Unit Trust List
                        </a>
                        <p className="text-sm" style={{ color: LIGHT_SLATE }}>
                            Official list of licensed unit trust managing companies
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UnitTrustRates;
