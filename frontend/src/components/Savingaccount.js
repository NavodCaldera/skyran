import React, { useState } from 'react';
import {
  DEEP_SPACE_BLUE,
  CORPORATE_NAVY,
  CYBER_TEAL,
  LUMINOUS_ACCENT,
  LIGHT_SLATE,
  MID_SLATE
} from '../constants';

const banks = ["Bank of Ceylon", "Commercial Bank", "Sampath Bank", "HNB", "Peoples Bank"];
const accountTypes = ["Saving", "Current"];
const categories = ["Personal", "Business", "Student"];

// Example data for the table
const accountData = [
  {
    bank: "Bank of Ceylon",
    type: "Saving",
    category: "Personal",
    deposit: "10,000",
    rate: "3.5%",
  },
  {
    bank: "Commercial Bank",
    type: "Current",
    category: "Business",
    deposit: "50,000",
    rate: "2.8%",
  },
  {
    bank: "Sampath Bank",
    type: "Saving",
    category: "Student",
    deposit: "2,000",
    rate: "4.0%",
  },
  // Add more rows as needed
];

const SavingAccount = () => {
  const [selectedBank, setSelectedBank] = useState('');
  const [selectedAccountType, setSelectedAccountType] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');

  // Filter data based on selections
  const filteredData = accountData.filter(row =>
    (selectedBank === '' || row.bank === selectedBank) &&
    (selectedAccountType === '' || row.type === selectedAccountType) &&
    (selectedCategory === '' || row.category === selectedCategory)
  );

  return (
    <div
      className="min-h-screen"
      style={{ backgroundColor: DEEP_SPACE_BLUE }}
    >
      <div className="max-w-7xl mx-auto p-6">
        {/* Title */}
        <div className="text-center mb-6">
          <h1
            className="text-4xl font-bold font-sans leading-[1.3] pb-4"
            style={{ color: LUMINOUS_ACCENT }}
          >
            Saving & Current Accounts
          </h1>
        </div>

      {/* Search Bars */}
      <div className="flex flex-col md:flex-row gap-8 justify-center mb-8">
        {/* Bank Select */}
        <div>
          <label className="block text-lg font-semibold mb-2" htmlFor="bank">Select Bank</label>
          <select
            id="bank"
            className="w-full p-3 border border-gray-300 rounded-md"
            style={{ backgroundColor: "#ffff", color: "#000" }}
            value={selectedBank}
            onChange={e => setSelectedBank(e.target.value)}
          >
            <option value="">All Banks</option>
            {banks.map((bank, idx) => (
              <option key={idx} value={bank}>{bank}</option>
            ))}
          </select>
        </div>

        {/* Account Type Select */}
        <div>
          <label className="block text-lg font-semibold mb-2" htmlFor="accountType">Select Account Type</label>
          <select
            id="accountType"
            className="w-full p-3 border border-gray-300 rounded-md"
            style={{ backgroundColor: "#ffff", color: "#000" }}
            value={selectedAccountType}
            onChange={e => setSelectedAccountType(e.target.value)}
          >
            <option value="">All Types</option>
            {accountTypes.map((type, idx) => (
              <option key={idx} value={type}>{type}</option>
            ))}
          </select>
        </div>

        {/* Category Select */}
        <div>
          <label className="block text-lg font-semibold mb-2" htmlFor="category">Select Category</label>
          <select
            id="category"
            className="w-full p-3 border border-gray-300 rounded-md"
            style={{ backgroundColor: "#ffff", color: "#000" }}
            value={selectedCategory}
            onChange={e => setSelectedCategory(e.target.value)}
          >
            <option value="">All Categories</option>
            {categories.map((cat, idx) => (
              <option key={idx} value={cat}>{cat}</option>
            ))}
          </select>
        </div>
      </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table
            className="min-w-full rounded-lg"
            style={{
              backgroundColor: CORPORATE_NAVY,
              border: `1px solid ${MID_SLATE}`
            }}
          >
            <thead style={{ backgroundColor: CORPORATE_NAVY }}>
              <tr>
                <th
                  className="py-3 px-4 text-left border"
                  style={{
                    color: LIGHT_SLATE,
                    borderColor: MID_SLATE
                  }}
                >
                  Bank Name
                </th>
                <th
                  className="py-3 px-4 text-left border"
                  style={{
                    color: LIGHT_SLATE,
                    borderColor: MID_SLATE
                  }}
                >
                  Account Type
                </th>
                <th
                  className="py-3 px-4 text-left border"
                  style={{
                    color: LIGHT_SLATE,
                    borderColor: MID_SLATE
                  }}
                >
                  Category
                </th>
                <th
                  className="py-3 px-4 text-left border"
                  style={{
                    color: LIGHT_SLATE,
                    borderColor: MID_SLATE
                  }}
                >
                  Minimum Deposit Amount
                </th>
                <th
                  className="py-3 px-4 text-left border"
                  style={{
                    color: LIGHT_SLATE,
                    borderColor: MID_SLATE
                  }}
                >
                  Rate
                </th>
              </tr>
            </thead>
    <tbody>
      {filteredData.length === 0 ? (
        <tr>
          <td colSpan={5} className="py-4 px-4 text-center text-gray-500 border border-gray-300">No data found.</td>
        </tr>
      ) : (
        filteredData.map((row, idx) => (
          <tr key={idx} className="hover:bg-gray-50">
            <td className="py-3 px-4 border border-gray-300">{row.bank}</td>
            <td className="py-3 px-4 border border-gray-300">{row.type}</td>
            <td className="py-3 px-4 border border-gray-300">{row.category}</td>
            <td className="py-3 px-4 border border-gray-300">{row.deposit}</td>
            <td className="py-3 px-4 border border-gray-300">{row.rate}</td>
          </tr>
        ))
      )}
    </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default SavingAccount;