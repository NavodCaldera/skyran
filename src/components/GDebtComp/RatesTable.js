import React from 'react';

export default function RatesTable({ data }) {
  if (!data.length) return <div className="text-center text-gray-500">No data available.</div>;

  const allPeriods = Array.from(
    new Set(data.flatMap(bank => Object.keys(bank.rates)))
  );

  return (
    <div className="overflow-x-auto bg-white rounded-lg shadow">
      <table className="min-w-full table-auto text-left text-sm">
        <thead className="bg-gray-200">
          <tr>
            <th className="p-2">Bank</th>
            {allPeriods.map(period => (
              <th key={period} className="p-2">{period}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((bank, i) => (
            <tr key={i} className="border-t">
              <td className="p-2 font-medium">{bank.bank}</td>
              {allPeriods.map(period => (
                <td key={period} className="p-2">
                  {bank.rates[period] !== undefined ? `${bank.rates[period]}%` : '-'}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
