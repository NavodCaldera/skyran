// Bonds.js
import React, { useEffect, useState } from 'react';
import Toggle from './GDebtComp/Toggle';
import Filters from './GDebtComp/Filters';
import RatesTable from './GDebtComp/RatesTable';
import axios from 'axios';

const Bonds = () => {
  const [type, setType] = useState('t-bill');
  const [data, setData] = useState([]);
  const [sortOrder, setSortOrder] = useState('asc');
  const [bankFilter, setBankFilter] = useState('');

  useEffect(() => {
    axios.get(`/api/rates?t=${type}`).then((res) => {
      setData(res.data);
    });
  }, [type]);

  const filteredData = [...data]
    .filter(item => item.bank.toLowerCase().includes(bankFilter.toLowerCase()))
    .sort((a, b) => {
      const aAvg = avgRate(a.rates);
      const bAvg = avgRate(b.rates);
      return sortOrder === 'asc' ? aAvg - bAvg : bAvg - aAvg;
    });

  function avgRate(rates) {
    const values = Object.values(rates);
    return values.reduce((a, b) => a + b, 0) / values.length;
  }

  return (
    <div className="min-h-screen bg-gray-100 text-gray-800 p-4">
      <div className="max-w-7xl mx-auto p-6">
        {/* Title */}
        <div className="text-center mb-6">
          <h1 className="text-4xl font-bold font-sans text-transparent bg-clip-text bg-gradient-to-t from-[#181E23] via-[#18426c] to-[#10cfc8] leading-[1.3] pb-4">
            Bonds
          </h1>
        </div>

        <Toggle type={type} setType={setType} />
        <Filters
          sortOrder={sortOrder}
          setSortOrder={setSortOrder}
          bankFilter={bankFilter}
          setBankFilter={setBankFilter}
        />
        <RatesTable data={filteredData} />
      </div>
    </div>
  );
};

export default Bonds;

