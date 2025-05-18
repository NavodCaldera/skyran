import React from 'react';

export default function Toggle({ type, setType }) {
  return (
    <div className="flex justify-center gap-4 mb-4">
      <button
        className={`px-4 py-2 rounded-lg ${type === 't-bill' ? 'bg-blue-500 text-white' : 'bg-white border'}`}
        onClick={() => setType('t-bill')}
      >
        T-Bill
      </button>
      <button
        className={`px-4 py-2 rounded-lg ${type === 't-bond' ? 'bg-blue-500 text-white' : 'bg-white border'}`}
        onClick={() => setType('t-bond')}
      >
        T-Bond
      </button>
    </div>
  );
}
