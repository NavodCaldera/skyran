import React, { useState } from "react";

const UnitTrustRates = () => {
    const [selectedCategory, setSelectedCategory] = useState("");
    const [selectedCompany, setSelectedCompany] = useState("");
    const [openIndex, setOpenIndex] = useState(null);

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

    const filteredRates = rates.filter(item =>
        (selectedCategory ? item.category === selectedCategory : true) &&
        (selectedCompany ? item.company === selectedCompany : true)
    );

    return (
        <div className="max-w-7xl mx-auto p-6">
            {/* Title */}
            <div className="text-center mb-6">
                <h1 className="text-4xl font-bold font-sans text-transparent bg-clip-text bg-gradient-to-t from-[#181E23] via-[#18426c] to-[#10cfc8]">
                    Unit Trust
                </h1>
            </div>

            {/* Selectors */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                {/* Category Selector */}
                <div>
                    <label className="block text-lg font-semibold mb-2" htmlFor="category">Select Category</label>
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
                {/* Company Selector */}
                <div>
                    <label className="block text-lg font-semibold mb-2" htmlFor="company">Select Company</label>
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
                    <thead className="bg-[#18426c]">
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


            {/* FAQ Section */}
            <div className="mt-12">
                <h2 className="text-3xl font-bold text-center mb-6 text-transparent bg-clip-text bg-gradient-to-t from-[#181E23] via-[#18426c] to-[#10cfc8]">Frequently Asked Questions</h2>
                <div className="space-y-4">
                    {faqData.map((faq, index) => (
                        <div
                            key={index}
                            className="border border-gray-300 rounded-md p-4 cursor-pointer hover:shadow"
                            onClick={() => toggleFAQ(index)}
                        >
                            <div className="font-semibold text-lg flex justify-between items-center">
                                {faq.question}
                                <span>{openIndex === index ? "−" : "+"}</span>
                            </div>
                            {openIndex === index && (
                                <p
                                className="mt-2 text-gray-700"
                                dangerouslySetInnerHTML={{ __html: faq.answer }}
                              />
                              
                            )}
                        </div>
                    ))}
                </div>
            </div>

            {/* External Link */}
            <div className="mt-6 text-center">
                <a
                    href="https://www.sec.gov.lk/unit-trust-list/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#18426c] hover:underline text-lg md:text-xl"
                >
                    Unit Trust – Securities & Exchange Commission
                </a>
            </div>

        </div>

        
    );
};

export default UnitTrustRates;
