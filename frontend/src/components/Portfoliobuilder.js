import React, { useState } from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { API_BASE_URL } from '../constants'; // Import at the top

ChartJS.register(ArcElement, Tooltip, Legend);


const Portfoliobuilder = () => {
  const [age, setAge] = useState('');
  const [ageError, setAgeError] = useState('');
  const [dependencies, setDependencies] = useState('');
  const [dependenciesError, setDependenciesError] = useState('');
  const [monthlyIncome, setMonthlyIncome] = useState('');
  const [monthlyExpenses, setMonthlyExpenses] = useState('');
  const [riskRate, setRiskRate] = useState(null);

  const [explanation, setExplanation] = useState('');
  const [objective, setObjective] = useState('');
  const [monthlyAmount, setMonthlyAmount] = useState('');
  const [initialCapital, setInitialCapital] = useState('');
  const [selectedInvestmentTypes, setSelectedInvestmentTypes] = useState([]);
  const [investmentDistribution, setInvestmentDistribution] = useState([
    { type: 'Share Market', percentage: 55, color: '#FF6384' },
    { type: 'Treasury Bonds', percentage: 25, color: '#36A2EB' },
    { type: 'Gold', percentage: 15, color: '#FFCE56' },
    { type: 'Fixed Deposits', percentage: 5, color: '#4BC0C0' },
  ]); // Example data

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

  const fetchRiskRate = async () => {
    const income = monthlyIncome.replace(/,/g, '');
    const expenses = monthlyExpenses.replace(/,/g, '');

    const queryParams = new URLSearchParams({
      age,
      dependencies,
      monthlyIncome: income,
      monthlyExpenses: expenses,
    });

    try {
      const response = await fetch(`${API_BASE_URL}/api/risk_rate?${queryParams}`);
      const data = await response.json();
      setRiskRate(data.risk_rate);
    } catch (error) {
      console.error('Failed to fetch risk rate:', error);
      alert('Error fetching risk rate');
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

  const handleInvestmentTypeChange = (e) => {
    const { value, checked } = e.target;
    if (checked) {
      setSelectedInvestmentTypes((prev) => [...prev, value]);
    } else {
      setSelectedInvestmentTypes((prev) => prev.filter((type) => type !== value));
    }
  };

  // Prepare data for the pie chart
  const pieChartData = {
    labels: investmentDistribution.map((item) => item.type), // Show investment types as labels
    datasets: [
      {
        data: investmentDistribution.map((item) => item.percentage), // Use percentages for the pie chart
        backgroundColor: investmentDistribution.map((item) => item.color), // Use colors from the data
        hoverBackgroundColor: investmentDistribution.map((item) => item.color),
      },
    ],
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
            fetchRiskRate(); // ✅ Call fetchRiskRate instead of fetchExplanation
          }}
          className="px-6 py-2 font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 text-white bg-gradient-to-t from-[#181E23] via-[#18426c] to-[#10cfc8] border border-transparent hover:bg-white hover:text-transparent hover:bg-clip-text hover:bg-gradient-to-t hover:from-[#181E23] hover:via-[#18426c] hover:to-[#10cfc8] hover:border-[#181E23] transition duration-300"
        >
          Calculate Risk
        </button>
      </div>



      <div className="mt-6 text-center">
        <div className="border border-white rounded-md p-4 bg-white">
          <h2 className="text-2xl font-medium text-transparent bg-clip-text bg-gradient-to-t from-[#181E23] via-[#18426c] to-[#10cfc8] mt-2">
            Your Risk Score
          </h2>
          <p className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-t from-[#181E23] via-[#18426c] to-[#10cfc8] mt-2">
            {riskRate !== null ? riskRate.toFixed(2) : 'N/A'}
          </p>
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



      {/* Portfolio Building Section */}
      <div className="mt-12">
        <div className="text-left mb-6">
          <h1 className="text-4xl font-bold font-sans text-transparent bg-clip-text bg-gradient-to-t from-[#181E23] via-[#18426c] to-[#10cfc8] leading-relaxed">
            Portfolio Building
          </h1>
        </div>
      </div>

      {/* Objective Section */}
      <div className="mt-12">
        <div className="text-left">
          <div className="space-y-4">

            <label className="block text-lg font-medium text-gray-800 mb-2" htmlFor="objective">
              Select Objective
            </label>
            <select
              id="objective"
              name="objective"
              value={objective}
              onChange={(e) => setObjective(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">-- Select an Objective --</option>
              <option value="Capital Preservation">Capital Preservation</option>
              <option value="Capital Appreciation">Capital Appreciation</option>
              <option value="Income Generation">Income Generation</option>
              <option value="Balanced Growth">Balanced Growth</option>
            </select>


            {/* Show Monthly Amount Input if Income Generation is selected */}
            {objective === 'Income Generation' && (
              <div>
                <label className="block text-lg font-medium text-gray-800 mb-2" htmlFor="monthlyAmount">
                  Monthly Amount Needed
                </label>
                <input
                  type="number"
                  id="monthlyAmount"
                  name="monthlyAmount"
                  value={monthlyAmount}
                  onChange={(e) => setMonthlyAmount(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter the monthly amount needed"
                />
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Initial Capital Section */}
      <div className="mt-12">
        <div className="text-left">
          <label className="block text-lg font-medium text-gray-800 mb-2" htmlFor="initialCapital">
            Initial Capital
          </label>
          <input
            type="number"
            id="initialCapital"
            name="initialCapital"
            value={initialCapital}
            onChange={(e) => setInitialCapital(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter the initial capital amount"
          />
        </div>
      </div>

      {/* Investment Types Section */}
      <div className="mt-12">
        <div className="text-left">
          <p className="text-lg text-gray-700 mb-4">
            Choose the types of investments you are interested in:
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {[
              'Treasury Bills',
              'Treasury Bonds',
              'Fixed Deposits',
              'Gold',
              'Saving Accounts',
              'Share Market',
              'Corporate Bonds',
              'Unit Trust',
            ].map((investmentType) => (
              <div key={investmentType} className="flex items-center">
                <input
                  type="checkbox"
                  id={investmentType}
                  name="investmentTypes"
                  value={investmentType}
                  onChange={(e) => handleInvestmentTypeChange(e)}
                  className="w-5 h-5 text-blue-500 border-gray-300 rounded focus:ring-blue-500"
                />
                <label htmlFor={investmentType} className="ml-3 text-lg text-gray-800">
                  {investmentType}
                </label>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Generate Portfolio Button */}
      <div className="text-right mt-6">
        <button
          onClick={() => {
            // Add your logic to generate the portfolio here
            console.log('Generating Portfolio...');
          }}
          disabled={
            !age ||
            !monthlyIncome ||
            !monthlyExpenses ||
            !dependencies ||
            !objective ||
            (objective === 'Income Generation' && !monthlyAmount) ||
            !initialCapital ||
            selectedInvestmentTypes.length === 0
          }
          className={`px-6 py-2 font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 text-white transition duration-300 ${!age ||
            !monthlyIncome ||
            !monthlyExpenses ||
            !dependencies ||
            !objective ||
            (objective === 'Income Generation' && !monthlyAmount) ||
            !initialCapital ||
            selectedInvestmentTypes.length === 0
            ? 'bg-gray-400 cursor-not-allowed'
            : 'bg-gradient-to-t from-[#181E23] via-[#18426c] to-[#10cfc8] hover:bg-white hover:text-transparent hover:bg-clip-text hover:bg-gradient-to-t hover:from-[#181E23] hover:via-[#18426c] hover:to-[#10cfc8] hover:border-[#181E23]'
            }`}
        >
          Generate Portfolio
        </button>
      </div>

      {/* Pie Chart Section */}
      {investmentDistribution.length > 0 && (
        <div className="mt-12">
          <h2 className="text-4xl font-bold text-center text-transparent bg-clip-text bg-gradient-to-t from-[#181E23] via-[#18426c] to-[#10cfc8]">
            Investment Distribution
          </h2>
          <div className="flex flex-col lg:flex-row items-center justify-center mt-8">
            {/* Pie Chart */}
            <div className="w-full lg:w-1/2">
              <Pie data={pieChartData} />
            </div>
          </div>
        </div>
      )}

      {/* Personalized Reasoning Section */}
      <div className="mt-12">
        <h2 className="text-4xl font-bold text-center text-transparent bg-clip-text bg-gradient-to-t from-[#181E23] via-[#18426c] to-[#10cfc8]">
          Personalized Reasoning
        </h2>
        <div className="mt-6 text-left">
          <p className="text-lg text-gray-700 mb-4">
            Below is the reasoning generated based on your inputs:
          </p>
          <div className="border border-gray-300 rounded-md p-4 bg-white">
            <h3 className="text-lg font-medium text-gray-800">Reasoning</h3>
            <p className="text-base text-gray-700 mt-2">
              {explanation || 'Fetching reasoning from the backend...'}
            </p>
          </div>
        </div>
      </div>


    </div>
  );
};

export default Portfoliobuilder;