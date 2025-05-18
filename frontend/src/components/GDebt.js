// App.js
import React, { useEffect, useState } from 'react';
import { Toggle } from './components/GDebtComp/Toggle';
import { Filters } from './components/GDebtComp/Filters';
import { RatesTable } from './components/GDebtComp/RatesTable';
import axios from 'axios';

export default function App() {
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
      <div className="max-w-5xl mx-auto">
        <h1 className="text-2xl font-bold mb-4 text-center">T-Bill & T-Bond Rates</h1>
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
}
