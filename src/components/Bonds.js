// Bonds.js
// Bonds.js
import React, { useEffect, useState } from 'react';
import Toggle   from './GDebtComp/Toggle';
import Filters  from './GDebtComp/Filters';
import RatesTable from './GDebtComp/RatesTable';
import axios from 'axios';

/** --------- local fallback data --------- */
const mockRates = {
  't-bill': [
    { bank: 'Bank of Ceylon',  rates: { '91D': 7.25,  '182D': 7.35,  '364D': 7.55 } },
    { bank: "People's Bank",   rates: { '91D': 7.30,  '182D': 7.40,  '364D': 7.60 } },
    { bank: 'Sampath Bank',    rates: { '91D': 7.15,  '182D': 7.25,  '364D': 7.50 } },
  ],
  't-bond': [
    { bank: 'Bank of Ceylon',  rates: { '2Y': 9.15, '5Y': 9.75, '10Y': 10.25 } },
    { bank: "People's Bank",   rates: { '2Y': 9.20, '5Y': 9.80, '10Y': 10.30 } },
    { bank: 'Sampath Bank',    rates: { '2Y': 9.05, '5Y': 9.60, '10Y': 10.10 } },
  ],
};
/** --------------------------------------- */

export default function Bonds() {
  const [type, setType]             = useState('t-bill');
  const [data, setData]             = useState([]);
  const [sortOrder, setSortOrder]   = useState('asc');
  const [bankFilter, setBankFilter] = useState('');

  /** hit backend → if it fails, inject mock data */
  useEffect(() => {
    let cancelled = false;

    (async () => {
      try {
        const res = await axios.get(`/api/rates?t=${type}`);
        if (!cancelled) setData(res.data);
      } catch (err) {
        console.warn(`Backend unavailable (${err?.response?.status || 'network'}); using mock data.`);
        if (!cancelled) setData(mockRates[type]);
      }
    })();

    return () => { cancelled = true; };
  }, [type]);

  /** helpers */
  const avgRate = (rates) =>
    Object.values(rates).reduce((a, b) => a + b, 0) / Object.keys(rates).length;

  const filteredData = data
    .filter((item) =>
      item.bank.toLowerCase().includes(bankFilter.toLowerCase())
    )
    .sort((a, b) => {
      const aAvg = avgRate(a.rates);
      const bAvg = avgRate(b.rates);
      return sortOrder === 'asc' ? aAvg - bAvg : bAvg - aAvg;
    });

  /** UI */
  return (
    <div className="min-h-screen bg-gray-100 text-gray-800 p-4">
      <div className="max-w-7xl mx-auto p-6">
        <header className="text-center mb-6">
          <h1 className="text-4xl font-bold font-sans text-transparent bg-clip-text bg-gradient-to-t from-[#181E23] via-[#18426c] to-[#10cfc8] leading-[1.3] pb-4">
            Bonds
          </h1>
        </header>

        <Toggle  type={type}  setType={setType} />

        <Filters
          sortOrder={sortOrder} setSortOrder={setSortOrder}
          bankFilter={bankFilter} setBankFilter={setBankFilter}
        />

        <RatesTable data={filteredData} />
      </div>
    </div>
  );
}


