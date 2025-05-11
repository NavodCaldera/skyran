import React, { useState } from 'react';

const Portfoliobuilder = () => {
  const [age, setAge] = useState('');
  const [ageError, setAgeError] = useState('');
  const [dependencies, setDependencies] = useState('');
  const [dependenciesError, setDependenciesError] = useState('');
  const [monthlyIncome, setMonthlyIncome] = useState('');
  const [monthlyExpenses, setMonthlyExpenses] = useState('');
  const [explanation, setExplanation] = useState(''); // State to store the explanation text
  // Add a new state for the Emergency Fund explanation
  const [emergencyFundExplanation, setEmergencyFundExplanation] = useState('');

  const handleAgeChange = (e) => {
    const value = e.target.value;
    setAge(value);

    if (value < 0 || value > 100) {
      setAgeError('Age should be between 0 and 100');
    } else {
      setAgeError('');
    }
  };

  const handleDependenciesChange = (e) => {
    const value = e.target.value;
    setDependencies(value);

    if (value < 0 || value > 10) {
      setDependenciesError('Dependencies should be between 0 and 10');
    } else {
      setDependenciesError('');
    }
  };

  const handleMonthlyIncomeBlur = () => {
    if (monthlyIncome) {
      const formattedValue = new Intl.NumberFormat('en-US', {
        style: 'decimal',
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      }).format(monthlyIncome.replace(/,/g, '')); // Remove commas before formatting
      setMonthlyIncome(formattedValue);
    }
  };

  const handleMonthlyExpensesBlur = () => {
    if (monthlyExpenses) {
      const formattedValue = new Intl.NumberFormat('en-US', {
        style: 'decimal',
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      }).format(monthlyExpenses.replace(/,/g, '')); // Remove commas before formatting
      setMonthlyExpenses(formattedValue);
    }
  };

  const fetchExplanation = async () => {
    try {
      // Simulate fetching data from the AI server
      const response = await fetch('https://api.example.com/get-explanation'); // Replace with your API endpoint
      const data = await response.json();
      setExplanation(data.explanation); // Update the explanation state with the fetched data
    } catch (error) {
      console.error('Error fetching explanation:', error);
      setExplanation('Failed to fetch explanation. Please try again later.');
    }
  };

  // Function to fetch explanation dynamically
  const fetchEmergencyFundExplanation = async (answer) => {
    try {
      // Simulate fetching data from an LLM API
      const response = await fetch('https://api.example.com/get-emergency-fund-explanation', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ answer }), // Send the user's answer ("Yes" or "No") to the API
      });
      const data = await response.json();
      setEmergencyFundExplanation(data.explanation); // Update the explanation state with the fetched data
    } catch (error) {
      console.error('Error fetching explanation:', error);
      setEmergencyFundExplanation('Failed to fetch explanation. Please try again later.');
    }
  };

  return (
    <div className="max-w-7xl mx-auto p-6">
      {/* Title */}
      <div className="text-center mb-6">
        <h1 className="text-5xl font-bold font-sans text-transparent bg-clip-text bg-gradient-to-t from-[#181E23] via-[#18426c] to-[#10cfc8]">
          Portfolio Builder
        </h1>
      </div>

      <div className="mt-12">
        {/* Risk Calculator Section */}
        <div className="text-left mb-6">
          <h1 className="text-4xl font-bold font-sans text-transparent bg-clip-text bg-gradient-to-t from-[#181E23] via-[#18426c] to-[#10cfc8]">
            Risk Calculator
          </h1>
        </div>
        {/* Content Placeholder */}
        <div className="text-left">
          <p className="text-lg text-gray-700 mb-4">
            Use the Risk Calculator to assess your investment risk tolerance and make informed decisions.
          </p>
          {/* Input Fields */}
          <form className="space-y-4">
            <div>
              <label className="block text-lg font-medium text-gray-800 mb-2" htmlFor="age">
                Age
              </label>
              <input
                type="number"
                id="age"
                name="age"
                value={age}
                onChange={handleAgeChange}
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter your age"
                min="0"
                max="100"
              />
              {ageError && (
                <p className="text-red-500 text-sm mt-1">{ageError}</p>
              )}
            </div>
            <div>
              <label className="block text-lg font-medium text-gray-800 mb-2" htmlFor="monthlyIncome">
                Monthly Income
              </label>
              <input
                type="text"
                id="monthlyIncome"
                name="monthlyIncome"
                value={monthlyIncome}
                onChange={(e) => setMonthlyIncome(e.target.value)}
                onBlur={handleMonthlyIncomeBlur} // Format on blur
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter your monthly income"
              />
            </div>
            <div>
              <label className="block text-lg font-medium text-gray-800 mb-2" htmlFor="monthlyExpenses">
                Monthly Expenses
              </label>
              <input
                type="text"
                id="monthlyExpenses"
                name="monthlyExpenses"
                value={monthlyExpenses}
                onChange={(e) => setMonthlyExpenses(e.target.value)}
                onBlur={handleMonthlyExpensesBlur} // Format on blur
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter your monthly expenses"
              />
            </div>
            <div>
              <label className="block text-lg font-medium text-gray-800 mb-2" htmlFor="dependencies">
                Dependencies
              </label>
              <input
                type="number"
                id="dependencies"
                name="dependencies"
                value={dependencies}
                onChange={handleDependenciesChange}
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter the number of dependencies"
                min="0"
                max="10"
              />
              {dependenciesError && (
                <p className="text-red-500 text-sm mt-1">{dependenciesError}</p>
              )}
            </div>
          </form>
        </div>
      </div>

      <div className="text-right mt-6">
        <button
          onClick={() => {
            fetchExplanation(); // Fetch explanation when the button is clicked
          }}
          className="px-6 py-2 font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 text-white bg-gradient-to-t from-[#181E23] via-[#18426c] to-[#10cfc8] border border-transparent hover:bg-white hover:text-transparent hover:bg-clip-text hover:bg-gradient-to-t hover:from-[#181E23] hover:via-[#18426c] hover:to-[#10cfc8] hover:border-[#181E23] transition duration-300"
        >
          Calculate Risk
        </button>
      </div>

      <div className="mt-6 text-center">
        <div className="border border-white rounded-md p-4 bg-white">
          <h2 className="text-2xl font-medium text-transparent bg-clip-text bg-gradient-to-t from-[#181E23] via-[#18426c] to-[#10cfc8] mt-2">Your Risk Score</h2>
          <p className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-t from-[#181E23] via-[#18426c] to-[#10cfc8] mt-2">
            85
          </p> {/* Replace 85 with dynamic value */}
        </div>
      </div>

      <div className="mt-8">
        <div className="flex w-full h-10">
          <div className="flex-1 bg-green-500 flex justify-center items-center text-white font-bold">1</div>
          <div className="flex-1 bg-green-400 flex justify-center items-center text-white font-bold">2</div>
          <div className="flex-1 bg-green-300 flex justify-center items-center text-white font-bold">3</div>
          <div className="flex-1 bg-yellow-300 flex justify-center items-center text-white font-bold">4</div>
          <div className="flex-1 bg-yellow-400 flex justify-center items-center text-white font-bold">5</div>
          <div className="flex-1 bg-yellow-500 flex justify-center items-center text-white font-bold">6</div>
          <div className="flex-1 bg-orange-400 flex justify-center items-center text-white font-bold">7</div>
          <div className="flex-1 bg-orange-500 flex justify-center items-center text-white font-bold">8</div>
          <div className="flex-1 bg-red-400 flex justify-center items-center text-white font-bold">9</div>
          <div className="flex-1 bg-red-500 flex justify-center items-center text-white font-bold">10</div>
        </div>
      </div>

      {/* Explanation Box */}
      <div className="mt-8">
        <div className="border border-gray-300 rounded-md p-4 bg-white">
          <h2 className="text-lg font-medium text-gray-800">Explanation</h2>
          <p className="text-base text-gray-700 mt-2">
            {explanation || 'Generating explanation...'}
          </p>
        </div>
      </div>

      <div className="mt-12">
        <div className="text-left mb-6">
          <h1 className="text-4xl font-bold font-sans text-transparent bg-clip-text bg-gradient-to-t from-[#181E23] via-[#18426c] to-[#10cfc8] leading-relaxed">
            Emergency Fund
          </h1>
        </div>

      </div>

      <div className="mt-8">
        <div className="text-left mb-6">
          <h2 className="text-lg font-medium text-gray-800">Do you have an Emergency Fund?</h2>
          <div className="flex space-x-4 mt-4">
            <button
              onClick={() => setEmergencyFundExplanation('Great! Having an emergency fund is essential for financial stability.')}
              className="px-4 py-2 bg-green-500 text-white font-medium rounded-md hover:bg-green-600 transition duration-300"
            >
              Yes
            </button>
            <button
              onClick={() => setEmergencyFundExplanation('It’s important to start building an emergency fund to prepare for unexpected expenses.')}
              className="px-4 py-2 bg-red-500 text-white font-medium rounded-md hover:bg-red-600 transition duration-300"
            >
              No
            </button>
          </div>
        </div>

        {/* Independent Explanation Box */}
        <div className="mt-6">
          <div className="border border-gray-300 rounded-md p-4 bg-white">
            <h2 className="text-lg font-medium text-gray-800">Explanation</h2>
            <p className="text-base text-gray-700 mt-2 leading-relaxed">
              {emergencyFundExplanation || 'Click Yes or No to see the explanation.'}
            </p>
          </div>
        </div>
      </div>

      {/* Portfolio Building Section */}
      <div className="mt-12">
        <div className="text-left mb-6">
          <h1 className="text-4xl font-bold font-sans text-transparent bg-clip-text bg-gradient-to-t from-[#181E23] via-[#18426c] to-[#10cfc8] leading-relaxed">
            Portfolio Building
          </h1>
        </div>
      </div>

      




    </div>
  );
};

export default Portfoliobuilder;