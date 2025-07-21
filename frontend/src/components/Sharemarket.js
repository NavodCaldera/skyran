import React from 'react';
import { DEEP_SPACE_BLUE, LUMINOUS_ACCENT } from '../constants';

const ShareMarket = () => {
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
            Share Market
          </h1>
        </div>
      </div>
    </div>
  );
};

export default ShareMarket;
