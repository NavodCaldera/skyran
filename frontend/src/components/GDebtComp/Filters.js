import React from 'react';

export function Filters({ sortOrder, setSortOrder, bankFilter, setBankFilter }) {
  return (
    <div className="flex flex-col md:flex-row justify-between items-center mb-4 gap-4">
      <input
        type="text"
        placeholder="Filter by bank name"
        className="p-2 border rounded-md"
        value={bankFilter}
        onChange={(e) => setBankFilter(e.target.value)}
      />
      <select
        className="p-2 border rounded-md"
        value={sortOrder}
        onChange={(e) => setSortOrder(e.target.value)}
      >
        <option value="asc">Rate: Low to High</option>
        <option value="desc">Rate: High to Low</option>
      </select>
    </div>
  );
}
