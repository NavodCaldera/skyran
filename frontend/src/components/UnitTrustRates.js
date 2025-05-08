import React, { useState } from "react";

const UnitTrustRates = () => {
    const [selectedCategory, setSelectedCategory] = useState("");
    const [selectedCompany, setSelectedCompany] = useState("");

    const rates = [
        {
            fund: "ASTRUE Active Income Fund",
            category: "OPEN-ENDED INCOME FUNDS",
            company: "Asset Trust Management (Pvt) Ltd",
            navValue: "2,423,490,261.11",
            navPerUnit: "196.13",
            units: "216",
            ytd: "2.42%",
            year2024: "12.44%",
            year2023: "41.28%",
            year2022: "13.39%",
            year2021: "6.30%",
        },
        {
            fund: "CAL Fixed Income Opportunities Fund",
            category: "OPEN-ENDED INCOME FUNDS",
            company: "Capital Alliance Investments Ltd",
            navValue: "65,506,242,080.49",
            navPerUnit: "38.21",
            units: "8499",
            ytd: "2.47%",
            year2024: "13.24%",
            year2023: "25.70%",
            year2022: "20.24%",
            year2021: "3.59%",
        },
        {
            fund: "Ceylon Financial Sector Fund",
            category: "OPEN-END EQUITY INDEX/SECTOR FUNDS",
            company: "Ceylon Asset Management Limited",
            navValue: "129,455,784.31",
            navPerUnit: "15.52",
            units: "127",
            ytd: "0.56%",
            year2024: "64.21%",
            year2023: "86.13%",
            year2022: "-38.31%",
            year2021: "47.57%",
        },
        {
            fund: "CEYLON Index Fund",
            category: "OPEN-END EQUITY INDEX/SECTOR FUNDS",
            company: "Ceylon Asset Management Limited",
            navValue: "206,995,759.24",
            navPerUnit: "92.02",
            units: "299",
            ytd: "-0.37%",
            year2024: "40.95%",
            year2023: "7.01%",
            year2022: "-35.82%",
            year2021: "112.09%",
        },
    ];

    // Extract unique categories and companies
    const uniqueCategories = [...new Set(rates.map(item => item.category))];
    const uniqueCompanies = [...new Set(rates.map(item => item.company))];

    // Filter based on both category and company
    const filteredRates = rates.filter(item =>
        (selectedCategory ? item.category === selectedCategory : true) &&
        (selectedCompany ? item.company === selectedCompany : true)
    );

    return (
        <div className="max-w-7xl mx-auto p-6">
            {/* Title */}
            <div className="text-center mb-6">
                <h1 className="text-4xl font-bold text-blue-700 font-sans">Unit Trust</h1>
            </div>

            {/* Selectors */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div>
                    <label className="block text-lg font-semibold mb-2" htmlFor="category">
                        Select Category
                    </label>
                    <select
                        id="category"
                        className="w-full p-2 border border-gray-300 rounded-md"
                        value={selectedCategory}
                        onChange={(e) => setSelectedCategory(e.target.value)}
                    >
                        <option value="">All Categories</option>
                        {uniqueCategories.map((cat, idx) => (
                            <option key={idx} value={cat}>{cat}</option>
                        ))}
                    </select>
                </div>
                <div>
                    <label className="block text-lg font-semibold mb-2" htmlFor="company">
                        Select Company
                    </label>
                    <select
                        id="company"
                        className="w-full p-2 border border-gray-300 rounded-md"
                        value={selectedCompany}
                        onChange={(e) => setSelectedCompany(e.target.value)}
                    >
                        <option value="">All Companies</option>
                        {uniqueCompanies.map((comp, idx) => (
                            <option key={idx} value={comp}>{comp}</option>
                        ))}
                    </select>
                </div>
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
                <table className="w-full table-auto border border-gray-300 text-sm md:text-base">
                    <thead className="bg-blue-700">
                        <tr className="text-white">
                            <th className="border px-4 py-2 text-left">Fund Name</th>
                            <th className="border px-4 py-2 text-left">Net Asset Value</th>
                            <th className="border px-4 py-2 text-left">NAV per Unit</th>
                            <th className="border px-4 py-2 text-left">Units in Issue</th>
                            <th className="border px-4 py-2 text-left">YTD</th>
                            <th className="border px-4 py-2 text-left">2024</th>
                            <th className="border px-4 py-2 text-left">2023</th>
                            <th className="border px-4 py-2 text-left">2022</th>
                            <th className="border px-4 py-2 text-left">2021</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredRates.map((item, index) => (
                            <tr key={index} className="hover:bg-blue-50">
                                <td className="border px-4 py-2">{item.fund}</td>
                                <td className="border px-4 py-2 text-right">{item.navValue}</td>
                                <td className="border px-4 py-2 text-right">{item.navPerUnit}</td>
                                <td className="border px-4 py-2 text-right">{item.units}</td>
                                <td className="border px-4 py-2 text-right">{item.ytd}</td>
                                <td className="border px-4 py-2 text-right">{item.year2024}</td>
                                <td className="border px-4 py-2 text-right">{item.year2023}</td>
                                <td className="border px-4 py-2 text-right">{item.year2022}</td>
                                <td className="border px-4 py-2 text-right">{item.year2021}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Footer Link */}
            <div className="mt-6 text-center">
                <a
                    href="https://www.sec.gov.lk/unit-trust-list/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline text-lg md:text-xl"

                >
                    Unit Trust – Securities & Exchange Commission
                </a>
            </div>


        </div>
    );
};

export default UnitTrustRates;
