import React, { useState } from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import {
  API_BASE_URL,
  DEEP_SPACE_BLUE,
  CORPORATE_NAVY,
  CYBER_TEAL,
  LUMINOUS_ACCENT,
  LIGHT_SLATE,
  MID_SLATE,
  CHART_PURPLE,
  CHART_PINK,
  CHART_SKY_BLUE,
  VIBRANT_GREEN,
  WARNING_AMBER,
  ERROR_RED
} from '../constants';

ChartJS.register(ArcElement, Tooltip, Legend);


const Portfoliobuilder = () => {
  // Step management
  const [currentStep, setCurrentStep] = useState(1);
  const [completedSteps, setCompletedSteps] = useState([]);

  // Step 1: Personal Profile
  const [age, setAge] = useState('');
  const [ageError, setAgeError] = useState('');
  const [dependencies, setDependencies] = useState('');
  const [dependenciesError, setDependenciesError] = useState('');
  const [monthlyIncome, setMonthlyIncome] = useState('');
  const [monthlyExpenses, setMonthlyExpenses] = useState('');

  // Step 2: Risk Assessment
  const [riskRate, setRiskRate] = useState(null);
  const [isCalculatingRisk, setIsCalculatingRisk] = useState(false);

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

  // Navigation functions
  const goToNextStep = () => {
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1);
      if (!completedSteps.includes(currentStep)) {
        setCompletedSteps([...completedSteps, currentStep]);
      }
    }
  };

  const goToPreviousStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const goToStep = (step) => {
    if (step <= Math.max(...completedSteps, 1) + 1) {
      setCurrentStep(step);
    }
  };

  // Additional handler functions
  const handleInitialCapitalChange = (e) => {
    const formattedValue = formatCurrency(e.target.value);
    setInitialCapital(formattedValue);
  };

  const handleMonthlyAmountChange = (e) => {
    const formattedValue = formatCurrency(e.target.value);
    setMonthlyAmount(formattedValue);
  };

  const formatCurrency = (value) => {
    // Remove any non-digit characters
    const digits = value.replace(/\D/g, '');

    // Format with commas
    return digits.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  };

  // Risk Calculator Logic
  const calculateRiskScore = () => {
    let riskScore = 0;
    let factors = [];

    // Age factor (40% weight)
    const ageNum = parseInt(age);
    if (ageNum <= 25) {
      riskScore += 4;
      factors.push("Young age allows for higher risk tolerance");
    } else if (ageNum <= 35) {
      riskScore += 3.5;
      factors.push("Prime earning years support moderate-high risk");
    } else if (ageNum <= 45) {
      riskScore += 3;
      factors.push("Mid-career stage suggests balanced approach");
    } else if (ageNum <= 55) {
      riskScore += 2;
      factors.push("Pre-retirement phase requires conservative approach");
    } else {
      riskScore += 1;
      factors.push("Near/post retirement suggests low risk tolerance");
    }

    // Dependencies factor (20% weight)
    const dependenciesNum = parseInt(dependencies);
    if (dependenciesNum === 0) {
      riskScore += 2;
      factors.push("No dependencies allow for higher risk investments");
    } else if (dependenciesNum <= 2) {
      riskScore += 1.5;
      factors.push("Few dependencies permit moderate risk");
    } else if (dependenciesNum <= 4) {
      riskScore += 1;
      factors.push("Multiple dependencies require stable investments");
    } else {
      riskScore += 0.5;
      factors.push("High dependencies necessitate conservative approach");
    }

    // Financial cushion factor (40% weight)
    const income = parseFloat(monthlyIncome.replace(/,/g, '')) || 0;
    const expenses = parseFloat(monthlyExpenses.replace(/,/g, '')) || 0;
    const surplus = income - expenses;
    const surplusRatio = income > 0 ? (surplus / income) * 100 : 0;

    if (surplusRatio >= 40) {
      riskScore += 4;
      factors.push("High savings rate enables aggressive investment strategy");
    } else if (surplusRatio >= 25) {
      riskScore += 3;
      factors.push("Good savings rate supports moderate-high risk");
    } else if (surplusRatio >= 15) {
      riskScore += 2;
      factors.push("Moderate savings rate suggests balanced approach");
    } else if (surplusRatio >= 5) {
      riskScore += 1;
      factors.push("Low savings rate requires conservative investments");
    } else {
      riskScore += 0.5;
      factors.push("Minimal surplus demands very conservative approach");
    }

    // Cap the score at 10
    const finalScore = Math.min(Math.round(riskScore * 10) / 10, 10);

    return {
      score: finalScore,
      factors: factors,
      recommendation: getRiskRecommendation(finalScore),
      allocation: getRiskAllocation(finalScore)
    };
  };

  const getRiskRecommendation = (score) => {
    if (score <= 3) {
      return {
        level: "Conservative",
        description: "Focus on capital preservation with minimal risk. Suitable for those prioritizing stability over growth.",
        timeHorizon: "Short to Medium term (1-5 years)"
      };
    } else if (score <= 6) {
      return {
        level: "Moderate",
        description: "Balanced approach between growth and stability. Suitable for medium-term goals with moderate risk tolerance.",
        timeHorizon: "Medium to Long term (5-10 years)"
      };
    } else {
      return {
        level: "Aggressive",
        description: "Growth-focused strategy with higher risk tolerance. Suitable for long-term wealth building.",
        timeHorizon: "Long term (10+ years)"
      };
    }
  };

  const getRiskAllocation = (score) => {
    if (score <= 3) {
      return {
        stocks: 20,
        bonds: 60,
        gold: 15,
        cash: 5
      };
    } else if (score <= 6) {
      return {
        stocks: 50,
        bonds: 35,
        gold: 10,
        cash: 5
      };
    } else {
      return {
        stocks: 70,
        bonds: 20,
        gold: 8,
        cash: 2
      };
    }
  };

  const fetchRiskRate = async () => {
    setIsCalculatingRisk(true);

    try {
      // Add a small delay for better UX (shows loading state)
      await new Promise(resolve => setTimeout(resolve, 1500));

      // Calculate risk score locally
      const riskData = calculateRiskScore();
      setRiskRate(riskData.score);

      // Generate comprehensive explanation
      const explanationText = `Based on your profile, your risk score is ${riskData.score}/10 (${riskData.recommendation.level}).

Key factors considered:
${riskData.factors.map(factor => `• ${factor}`).join('\n')}

Recommendation: ${riskData.recommendation.description}

Suggested allocation: ${riskData.allocation.stocks}% Stocks, ${riskData.allocation.bonds}% Bonds, ${riskData.allocation.gold}% Gold, ${riskData.allocation.cash}% Cash

Investment horizon: ${riskData.recommendation.timeHorizon}`;

      setExplanation(explanationText.trim());

      // Optional: Also send to backend for logging/analytics
      try {
        await fetch(`${API_BASE_URL}/api/risk-rate`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            age,
            dependencies,
            monthlyIncome: monthlyIncome.replace(/,/g, ''),
            monthlyExpenses: monthlyExpenses.replace(/,/g, ''),
            calculatedRisk: riskData.score,
            factors: riskData.factors
          }),
        });
      } catch (backendError) {
        console.log('Backend logging failed, but calculation succeeded');
      }

    } catch (error) {
      console.error('Error calculating risk rate:', error);
      setRiskRate(5); // Default moderate risk
      setExplanation('Unable to calculate precise risk score. Defaulting to moderate risk profile.');
    } finally {
      setIsCalculatingRisk(false);
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

  // Check if current step is complete
  const isCurrentStepComplete = () => {
    switch (currentStep) {
      case 1:
        return age && !ageError && dependencies !== '' && !dependenciesError &&
               monthlyIncome && monthlyExpenses;
      case 2:
        return riskRate !== null;
      case 3:
        return objective && initialCapital &&
               (objective !== 'Income Generation' || monthlyAmount) &&
               selectedInvestmentTypes.length > 0;
      default:
        return false;
    }
  };

  // Render step content based on current step
  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return renderPersonalProfileStep();
      case 2:
        return renderRiskAssessmentStep();
      case 3:
        return renderPortfolioPreferencesStep();
      default:
        return null;
    }
  };

  // Step 1: Personal Profile
  const renderPersonalProfileStep = () => {
    return (
      <div
        className="rounded-lg p-8 shadow-xl animate-slideInUp"
        style={{ backgroundColor: CORPORATE_NAVY }}
      >
        <div className="mb-6">
          <h2 className="text-3xl font-bold mb-3" style={{ color: CYBER_TEAL }}>
            Step 1: Tell Us About Yourself
          </h2>
          <p className="text-lg" style={{ color: MID_SLATE }}>
            Let's start by understanding your financial situation to build the perfect portfolio for you.
          </p>
        </div>

        <form className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label
                className="block text-lg font-medium mb-3"
                htmlFor="age"
                style={{ color: LIGHT_SLATE }}
              >
                Age
              </label>
              <input
                type="number"
                id="age"
                name="age"
                value={age}
                onChange={handleAgeChange}
                className="w-full p-4 rounded-lg border-2 focus:outline-none focus:ring-2 transition-all duration-200"
                style={{
                  backgroundColor: DEEP_SPACE_BLUE,
                  borderColor: ageError ? ERROR_RED : MID_SLATE,
                  color: LIGHT_SLATE
                }}
                placeholder="Enter your age"
                min="18"
                max="100"
              />
              {ageError && (
                <p className="mt-2 text-sm flex items-center" style={{ color: ERROR_RED }}>
                  <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                  {ageError}
                </p>
              )}
            </div>

            <div>
              <label
                className="block text-lg font-medium mb-3"
                htmlFor="dependencies"
                style={{ color: LIGHT_SLATE }}
              >
                Number of Dependencies
              </label>
              <input
                type="number"
                id="dependencies"
                name="dependencies"
                value={dependencies}
                onChange={handleDependenciesChange}
                className="w-full p-4 rounded-lg border-2 focus:outline-none focus:ring-2 transition-all duration-200"
                style={{
                  backgroundColor: DEEP_SPACE_BLUE,
                  borderColor: dependenciesError ? ERROR_RED : MID_SLATE,
                  color: LIGHT_SLATE
                }}
                placeholder="Enter number of dependencies"
                min="0"
                max="10"
              />
              {dependenciesError && (
                <p className="mt-2 text-sm flex items-center" style={{ color: ERROR_RED }}>
                  <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                  {dependenciesError}
                </p>
              )}
            </div>
          </div>

          <div>
            <label
              className="block text-lg font-medium mb-3"
              htmlFor="monthlyIncome"
              style={{ color: LIGHT_SLATE }}
            >
              Monthly Income (LKR)
            </label>
            <div className="relative">
              <span
                className="absolute inset-y-0 left-0 flex items-center pl-4 text-lg font-medium"
                style={{ color: MID_SLATE }}
              >
                LKR
              </span>
              <input
                type="text"
                id="monthlyIncome"
                name="monthlyIncome"
                value={monthlyIncome}
                onChange={(e) => setMonthlyIncome(e.target.value)}
                onBlur={handleMonthlyIncomeBlur}
                className="w-full p-4 pl-16 rounded-lg border-2 focus:outline-none focus:ring-2 transition-all duration-200"
                style={{
                  backgroundColor: DEEP_SPACE_BLUE,
                  borderColor: MID_SLATE,
                  color: LIGHT_SLATE
                }}
                placeholder="Enter your monthly income"
              />
            </div>
          </div>

          <div>
            <label
              className="block text-lg font-medium mb-3"
              htmlFor="monthlyExpenses"
              style={{ color: LIGHT_SLATE }}
            >
              Monthly Expenses (LKR)
            </label>
            <div className="relative">
              <span
                className="absolute inset-y-0 left-0 flex items-center pl-4 text-lg font-medium"
                style={{ color: MID_SLATE }}
              >
                LKR
              </span>
              <input
                type="text"
                id="monthlyExpenses"
                name="monthlyExpenses"
                value={monthlyExpenses}
                onChange={(e) => setMonthlyExpenses(e.target.value)}
                onBlur={handleMonthlyExpensesBlur}
                className="w-full p-4 pl-16 rounded-lg border-2 focus:outline-none focus:ring-2 transition-all duration-200"
                style={{
                  backgroundColor: DEEP_SPACE_BLUE,
                  borderColor: MID_SLATE,
                  color: LIGHT_SLATE
                }}
                placeholder="Enter your monthly expenses"
              />
            </div>
          </div>
        </form>
      </div>
    );
  };

  // Step 2: Risk Assessment
  const renderRiskAssessmentStep = () => {
    return (
      <div
        className="rounded-lg p-8 shadow-xl animate-slideInUp"
        style={{ backgroundColor: CORPORATE_NAVY }}
      >
        <div className="mb-6">
          <h2 className="text-3xl font-bold mb-3" style={{ color: CYBER_TEAL }}>
            Step 2: Risk Assessment
          </h2>
          <p className="text-lg mb-4" style={{ color: MID_SLATE }}>
            Let's determine your risk tolerance level to create the optimal investment strategy.
          </p>

          {/* Info Card */}
          <div
            className="p-4 rounded-lg flex items-start mb-6 border-l-4"
            style={{
              backgroundColor: `${CYBER_TEAL}10`,
              borderLeftColor: CYBER_TEAL
            }}
          >
            <svg className="w-6 h-6 mr-3 flex-shrink-0 mt-1" style={{ color: CYBER_TEAL }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <div>
              <h4 className="font-semibold mb-1" style={{ color: LIGHT_SLATE }}>
                What is a Risk Assessment?
              </h4>
              <p className="text-sm" style={{ color: MID_SLATE }}>
                Your risk score (1-10) measures your ability to handle investment volatility based on your age, financial situation, and dependencies. A higher score suggests you can tolerate more market fluctuations for potentially higher returns, while a lower score indicates a need for more stable investments.
              </p>
            </div>
          </div>
        </div>

        {/* Input Summary Card */}
        <div
          className="p-6 rounded-lg mb-6"
          style={{ backgroundColor: DEEP_SPACE_BLUE }}
        >
          <h4 className="text-lg font-semibold mb-4" style={{ color: LIGHT_SLATE }}>
            Your Information Summary
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div className="flex justify-between">
              <span style={{ color: MID_SLATE }}>Age:</span>
              <span style={{ color: LIGHT_SLATE }} className="font-medium">{age} years</span>
            </div>
            <div className="flex justify-between">
              <span style={{ color: MID_SLATE }}>Dependencies:</span>
              <span style={{ color: LIGHT_SLATE }} className="font-medium">{dependencies}</span>
            </div>
            <div className="flex justify-between">
              <span style={{ color: MID_SLATE }}>Monthly Income:</span>
              <span style={{ color: LIGHT_SLATE }} className="font-medium">LKR {monthlyIncome}</span>
            </div>
            <div className="flex justify-between">
              <span style={{ color: MID_SLATE }}>Monthly Expenses:</span>
              <span style={{ color: LIGHT_SLATE }} className="font-medium">LKR {monthlyExpenses}</span>
            </div>
            {monthlyIncome && monthlyExpenses && (
              <div className="flex justify-between md:col-span-2 pt-2 border-t" style={{ borderTopColor: MID_SLATE }}>
                <span style={{ color: MID_SLATE }}>Monthly Surplus:</span>
                <span
                  style={{
                    color: (parseFloat(monthlyIncome.replace(/,/g, '')) - parseFloat(monthlyExpenses.replace(/,/g, ''))) > 0 ? VIBRANT_GREEN : ERROR_RED
                  }}
                  className="font-medium"
                >
                  LKR {(parseFloat(monthlyIncome.replace(/,/g, '')) - parseFloat(monthlyExpenses.replace(/,/g, ''))).toLocaleString()}
                </span>
              </div>
            )}
          </div>
        </div>

        <div className="mb-8">
          <button
            type="button"
            onClick={fetchRiskRate}
            disabled={!age || !dependencies || !monthlyIncome || !monthlyExpenses || ageError || dependenciesError || isCalculatingRisk}
            className="px-8 py-4 rounded-lg font-bold text-lg transition-all duration-200 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center space-x-3"
            style={{
              backgroundColor: (!age || !dependencies || !monthlyIncome || !monthlyExpenses || ageError || dependenciesError || isCalculatingRisk) ? MID_SLATE : CYBER_TEAL,
              color: DEEP_SPACE_BLUE,
              boxShadow: (!age || !dependencies || !monthlyIncome || !monthlyExpenses || ageError || dependenciesError || isCalculatingRisk) ? 'none' : `0 4px 14px 0 ${CYBER_TEAL}40`
            }}
          >
            {isCalculatingRisk ? (
              <>
                <svg className="w-6 h-6 animate-spin" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                <span>Calculating Risk Score...</span>
              </>
            ) : (
              <>
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
                <span>Calculate Risk Score</span>
              </>
            )}
          </button>
        </div>

        {/* Calculation Progress Indicator */}
        {isCalculatingRisk && (
          <div
            className="p-6 rounded-lg text-center mb-6"
            style={{ backgroundColor: DEEP_SPACE_BLUE }}
          >
            <div className="flex items-center justify-center mb-4">
              <div
                className="w-12 h-12 rounded-full flex items-center justify-center mr-4"
                style={{ backgroundColor: CYBER_TEAL }}
              >
                <svg className="w-6 h-6 animate-spin" style={{ color: DEEP_SPACE_BLUE }} fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
              </div>
              <div>
                <h3 className="text-lg font-semibold" style={{ color: LIGHT_SLATE }}>
                  Analyzing Your Profile
                </h3>
                <p className="text-sm" style={{ color: MID_SLATE }}>
                  Calculating your personalized risk score...
                </p>
              </div>
            </div>

            <div className="space-y-2 text-sm" style={{ color: MID_SLATE }}>
              <div className="flex items-center justify-center">
                <svg className="w-4 h-4 mr-2" style={{ color: CYBER_TEAL }} fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                Evaluating age and life stage
              </div>
              <div className="flex items-center justify-center">
                <svg className="w-4 h-4 mr-2" style={{ color: CYBER_TEAL }} fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                Analyzing financial obligations
              </div>
              <div className="flex items-center justify-center">
                <svg className="w-4 h-4 mr-2" style={{ color: CYBER_TEAL }} fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                Calculating savings capacity
              </div>
            </div>
          </div>
        )}

        {riskRate !== null && !isCalculatingRisk && (
          <div className="space-y-6">
            {/* Risk Score Display */}
            <div
              className="p-6 rounded-lg text-center border-2"
              style={{
                backgroundColor: DEEP_SPACE_BLUE,
                borderColor: riskRate <= 3 ? VIBRANT_GREEN :
                            riskRate <= 6 ? WARNING_AMBER :
                            ERROR_RED
              }}
            >
              <div className="flex items-center justify-center mb-4">
                <div
                  className="w-16 h-16 rounded-full flex items-center justify-center mr-4"
                  style={{
                    backgroundColor: riskRate <= 3 ? VIBRANT_GREEN :
                                    riskRate <= 6 ? WARNING_AMBER :
                                    ERROR_RED
                  }}
                >
                  <svg className="w-8 h-8" style={{ color: DEEP_SPACE_BLUE }} fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M3 6a3 3 0 013-3h10a1 1 0 01.8 1.6L14.25 8l2.55 3.4A1 1 0 0116 13H6a1 1 0 00-1 1v3a1 1 0 11-2 0V6z" clipRule="evenodd" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-2xl font-bold mb-1" style={{ color: LIGHT_SLATE }}>
                    Your Risk Score
                  </h3>
                  <div className="text-4xl font-bold" style={{ color: CYBER_TEAL }}>
                    {riskRate}/10
                  </div>
                </div>
              </div>

              {/* Animated Progress Bar */}
              <div className="w-full h-6 rounded-full overflow-hidden mb-4 relative" style={{ backgroundColor: MID_SLATE }}>
                <div
                  className="h-full flex items-center justify-center text-sm font-bold transition-all duration-2000 ease-out relative"
                  style={{
                    width: `${(riskRate / 10) * 100}%`,
                    backgroundColor: riskRate <= 3 ? VIBRANT_GREEN :
                                    riskRate <= 6 ? WARNING_AMBER :
                                    ERROR_RED,
                    color: DEEP_SPACE_BLUE
                  }}
                >
                  <span className="absolute inset-0 flex items-center justify-center">
                    {riskRate}
                  </span>
                </div>
              </div>

              {/* Risk Level Labels */}
              <div className="flex justify-between text-sm mb-4" style={{ color: MID_SLATE }}>
                <div className="text-center">
                  <div className="font-semibold">Conservative</div>
                  <div className="text-xs">1-3</div>
                </div>
                <div className="text-center">
                  <div className="font-semibold">Moderate</div>
                  <div className="text-xs">4-6</div>
                </div>
                <div className="text-center">
                  <div className="font-semibold">Aggressive</div>
                  <div className="text-xs">7-10</div>
                </div>
              </div>

              {/* Risk Level Badge */}
              <div
                className="inline-block px-4 py-2 rounded-full text-sm font-bold"
                style={{
                  backgroundColor: riskRate <= 3 ? VIBRANT_GREEN :
                                  riskRate <= 6 ? WARNING_AMBER :
                                  ERROR_RED,
                  color: DEEP_SPACE_BLUE
                }}
              >
                {riskRate <= 3 ? 'Conservative Investor' :
                 riskRate <= 6 ? 'Moderate Investor' :
                 'Aggressive Investor'}
              </div>
            </div>

            {/* Financial Summary */}
            <div
              className="p-6 rounded-lg"
              style={{ backgroundColor: DEEP_SPACE_BLUE }}
            >
              <h4 className="text-lg font-semibold mb-4" style={{ color: LIGHT_SLATE }}>
                Your Financial Profile
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="text-center p-4 rounded-lg" style={{ backgroundColor: CORPORATE_NAVY }}>
                  <div className="text-2xl font-bold mb-1" style={{ color: CYBER_TEAL }}>
                    {age}
                  </div>
                  <div className="text-sm" style={{ color: MID_SLATE }}>Years Old</div>
                </div>
                <div className="text-center p-4 rounded-lg" style={{ backgroundColor: CORPORATE_NAVY }}>
                  <div className="text-2xl font-bold mb-1" style={{ color: CYBER_TEAL }}>
                    {dependencies}
                  </div>
                  <div className="text-sm" style={{ color: MID_SLATE }}>Dependencies</div>
                </div>
                <div className="text-center p-4 rounded-lg" style={{ backgroundColor: CORPORATE_NAVY }}>
                  <div className="text-2xl font-bold mb-1" style={{ color: CYBER_TEAL }}>
                    {monthlyIncome && monthlyExpenses ?
                      `${Math.round(((parseFloat(monthlyIncome.replace(/,/g, '')) - parseFloat(monthlyExpenses.replace(/,/g, ''))) / parseFloat(monthlyIncome.replace(/,/g, '')) * 100))}%` :
                      'N/A'
                    }
                  </div>
                  <div className="text-sm" style={{ color: MID_SLATE }}>Savings Rate</div>
                </div>
              </div>
            </div>

            {/* Detailed Explanation */}
            {explanation && (
              <div
                className="p-6 rounded-lg"
                style={{ backgroundColor: DEEP_SPACE_BLUE }}
              >
                <h4 className="text-lg font-semibold mb-3 flex items-center" style={{ color: LIGHT_SLATE }}>
                  <svg className="w-5 h-5 mr-2" style={{ color: CYBER_TEAL }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Detailed Analysis
                </h4>
                <div className="whitespace-pre-line text-sm leading-relaxed" style={{ color: MID_SLATE }}>
                  {explanation}
                </div>
              </div>
            )}

            {/* Next Steps Recommendation */}
            <div
              className="p-6 rounded-lg border-l-4"
              style={{
                backgroundColor: DEEP_SPACE_BLUE,
                borderLeftColor: CYBER_TEAL
              }}
            >
              <h4 className="text-lg font-semibold mb-3" style={{ color: LIGHT_SLATE }}>
                Next Steps
              </h4>
              <p className="text-sm mb-4" style={{ color: MID_SLATE }}>
                Based on your risk profile, we recommend proceeding to customize your portfolio with investments that match your risk tolerance.
              </p>
              <div className="flex items-center text-sm" style={{ color: CYBER_TEAL }}>
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
                Click "Next Step" to continue to portfolio customization
              </div>
            </div>
          </div>
        )}
      </div>
    );
  };

  // Step 3: Portfolio Preferences
  const renderPortfolioPreferencesStep = () => {
    return (
      <div
        className="rounded-lg p-8 shadow-xl animate-slideInUp"
        style={{ backgroundColor: CORPORATE_NAVY }}
      >
        <div className="mb-6">
          <h2 className="text-3xl font-bold mb-3" style={{ color: CYBER_TEAL }}>
            Step 3: Portfolio Preferences
          </h2>
          <p className="text-lg" style={{ color: MID_SLATE }}>
            Let's customize your investment portfolio based on your goals and preferences.
          </p>
        </div>

        <form className="space-y-6">
          <div>
            <label
              className="block text-lg font-medium mb-3"
              htmlFor="objective"
              style={{ color: LIGHT_SLATE }}
            >
              Investment Objective
            </label>
            <select
              id="objective"
              name="objective"
              value={objective}
              onChange={(e) => setObjective(e.target.value)}
              className="w-full p-4 rounded-lg border-2 focus:outline-none focus:ring-2 transition-all duration-200"
              style={{
                backgroundColor: DEEP_SPACE_BLUE,
                borderColor: MID_SLATE,
                color: LIGHT_SLATE
              }}
            >
              <option value="">-- Select an Objective --</option>
              <option value="Capital Preservation">Capital Preservation</option>
              <option value="Capital Appreciation">Capital Appreciation</option>
              <option value="Income Generation">Income Generation</option>
              <option value="Balanced Growth">Balanced Growth</option>
            </select>
          </div>

          <div>
            <label
              className="block text-lg font-medium mb-3"
              htmlFor="initialCapital"
              style={{ color: LIGHT_SLATE }}
            >
              Initial Investment Amount (LKR)
            </label>
            <div className="relative">
              <span
                className="absolute inset-y-0 left-0 flex items-center pl-4 text-lg font-medium"
                style={{ color: MID_SLATE }}
              >
                LKR
              </span>
              <input
                type="text"
                id="initialCapital"
                name="initialCapital"
                value={initialCapital}
                onChange={handleInitialCapitalChange}
                className="w-full p-4 pl-16 rounded-lg border-2 focus:outline-none focus:ring-2 transition-all duration-200"
                style={{
                  backgroundColor: DEEP_SPACE_BLUE,
                  borderColor: MID_SLATE,
                  color: LIGHT_SLATE
                }}
                placeholder="Enter initial investment amount"
              />
            </div>
          </div>

          {objective === 'Income Generation' && (
            <div>
              <label
                className="block text-lg font-medium mb-3"
                htmlFor="monthlyAmount"
                style={{ color: LIGHT_SLATE }}
              >
                Target Monthly Income (LKR)
              </label>
              <div className="relative">
                <span
                  className="absolute inset-y-0 left-0 flex items-center pl-4 text-lg font-medium"
                  style={{ color: MID_SLATE }}
                >
                  LKR
                </span>
                <input
                  type="text"
                  id="monthlyAmount"
                  name="monthlyAmount"
                  value={monthlyAmount}
                  onChange={handleMonthlyAmountChange}
                  className="w-full p-4 pl-16 rounded-lg border-2 focus:outline-none focus:ring-2 transition-all duration-200"
                  style={{
                    backgroundColor: DEEP_SPACE_BLUE,
                    borderColor: MID_SLATE,
                    color: LIGHT_SLATE
                  }}
                  placeholder="Enter target monthly income"
                />
              </div>
            </div>
          )}

          <div>
            <label
              className="block text-lg font-medium mb-4"
              style={{ color: LIGHT_SLATE }}
            >
              Investment Types
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {['Share Market', 'Treasury Bonds', 'Gold', 'Fixed Deposits', 'Unit Trust', 'Corporate Bonds'].map((investmentType) => (
                <div
                  key={investmentType}
                  className="flex items-center p-4 rounded-lg border-2 hover:border-opacity-80 transition-all duration-200 cursor-pointer"
                  style={{
                    backgroundColor: DEEP_SPACE_BLUE,
                    borderColor: selectedInvestmentTypes.includes(investmentType) ? CYBER_TEAL : MID_SLATE
                  }}
                  onClick={() => {
                    const event = { target: { value: investmentType, checked: !selectedInvestmentTypes.includes(investmentType) } };
                    handleInvestmentTypeChange(event);
                  }}
                >
                  <input
                    type="checkbox"
                    id={investmentType}
                    value={investmentType}
                    checked={selectedInvestmentTypes.includes(investmentType)}
                    onChange={handleInvestmentTypeChange}
                    className="mr-3 w-5 h-5 rounded focus:ring-2"
                    style={{
                      accentColor: CYBER_TEAL,
                      backgroundColor: DEEP_SPACE_BLUE,
                      borderColor: MID_SLATE
                    }}
                  />
                  <label
                    htmlFor={investmentType}
                    className="cursor-pointer flex-1 font-medium"
                    style={{ color: LIGHT_SLATE }}
                  >
                    {investmentType}
                  </label>
                </div>
              ))}
            </div>
          </div>
        </form>
      </div>
    );
  };

  return (
    <div className="min-h-screen" style={{ backgroundColor: DEEP_SPACE_BLUE, color: LIGHT_SLATE }}>
      <div className="max-w-4xl mx-auto p-6">
        {/* Header */}
        <div className="text-center mb-8 pt-8">
          <h1 className="text-5xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-cyber-teal to-luminous-accent">
            Portfolio Builder
          </h1>
          <p className="text-xl" style={{ color: MID_SLATE }}>
            Build your personalized investment portfolio in 3 simple steps
          </p>
        </div>

        {/* Progress Indicator */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-4">
            {[1, 2, 3].map((step) => (
              <div key={step} className="flex items-center">
                <div
                  className={`w-12 h-12 rounded-full flex items-center justify-center font-bold cursor-pointer transition-all duration-300 ${
                    currentStep === step
                      ? 'text-deep-space shadow-lg transform scale-110'
                      : completedSteps.includes(step)
                      ? 'text-deep-space'
                      : 'text-light-slate'
                  }`}
                  style={{
                    backgroundColor: currentStep === step
                      ? CYBER_TEAL
                      : completedSteps.includes(step)
                      ? VIBRANT_GREEN
                      : MID_SLATE
                  }}
                  onClick={() => goToStep(step)}
                >
                  {completedSteps.includes(step) ? '✓' : step}
                </div>
                {step < 3 && (
                  <div
                    className="w-24 h-1 mx-2 rounded-full transition-all duration-300"
                    style={{
                      backgroundColor: completedSteps.includes(step) ? VIBRANT_GREEN : MID_SLATE
                    }}
                  />
                )}
              </div>
            ))}
          </div>

          <div className="flex justify-between text-sm" style={{ color: MID_SLATE }}>
            <span className="text-center">Personal Profile</span>
            <span className="text-center">Risk Assessment</span>
            <span className="text-center">Portfolio Preferences</span>
          </div>
        </div>

        {/* Step Content */}
        <div className="mb-8">
          {renderStepContent()}
        </div>

        {/* Navigation Buttons */}
        <div className="flex justify-between pb-8">
          <button
            onClick={goToPreviousStep}
            disabled={currentStep === 1}
            className="px-6 py-3 rounded-md font-medium transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
            style={{
              backgroundColor: currentStep === 1 ? MID_SLATE : CORPORATE_NAVY,
              color: LIGHT_SLATE
            }}
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            <span>Previous</span>
          </button>

          {currentStep < 3 ? (
            <button
              onClick={goToNextStep}
              disabled={!isCurrentStepComplete()}
              className="px-6 py-3 rounded-md font-bold transition-all duration-200 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center space-x-2"
              style={{
                backgroundColor: isCurrentStepComplete() ? CYBER_TEAL : MID_SLATE,
                color: DEEP_SPACE_BLUE,
                boxShadow: isCurrentStepComplete() ? `0 4px 14px 0 ${CYBER_TEAL}40` : 'none'
              }}
            >
              <span>Next Step</span>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          ) : (
            <button
              onClick={() => {
                console.log('Generating Portfolio...');
                // Add portfolio generation logic here
              }}
              disabled={!isCurrentStepComplete()}
              className="px-6 py-3 rounded-md font-bold transition-all duration-200 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center space-x-2"
              style={{
                backgroundColor: isCurrentStepComplete() ? VIBRANT_GREEN : MID_SLATE,
                color: DEEP_SPACE_BLUE,
                boxShadow: isCurrentStepComplete() ? `0 4px 14px 0 ${VIBRANT_GREEN}40` : 'none'
              }}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
              <span>Generate Portfolio</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Portfoliobuilder;