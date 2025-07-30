import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Pie } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
} from 'chart.js';
import jsPDF from 'jspdf';
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
  CHART_SKY_BLUE
} from '../constants';


ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);







const Portfoliobuilder = () => {
  // Step management
  const [currentStep, setCurrentStep] = useState(1);
  const [completedSteps, setCompletedSteps] = useState([]);

  // Educational banner state
  const [showEducationalBanner, setShowEducationalBanner] = useState(true);

  // Step 1: Personal Profile
  const [age, setAge] = useState('');
  const [ageError, setAgeError] = useState('');
  const [dependencies, setDependencies] = useState('');
  const [dependenciesError, setDependenciesError] = useState('');
  const [monthlyIncome, setMonthlyIncome] = useState('');
  const [monthlyExpenses, setMonthlyExpenses] = useState('');

  // Financial Goals State
  const [goals, setGoals] = useState([]);

  // Step 2: Risk Assessment
  const [riskRate, setRiskRate] = useState(null);
  const [isCalculatingRisk, setIsCalculatingRisk] = useState(false);
  const [emotionalRiskChoice, setEmotionalRiskChoice] = useState('');

  const [explanation, setExplanation] = useState('');
  const [objective, setObjective] = useState('');
  const [monthlyAmount, setMonthlyAmount] = useState('');
  const [initialCapital, setInitialCapital] = useState('');
  const [selectedInvestmentTypes, setSelectedInvestmentTypes] = useState([]);

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

  // Goal management functions
  const addGoal = () => {
    const newGoal = {
      id: Date.now(),
      name: '',
      targetAmount: '',
      targetDate: ''
    };
    setGoals([...goals, newGoal]);
  };

  const removeGoal = (goalId) => {
    setGoals(goals.filter(goal => goal.id !== goalId));
  };

  const updateGoal = (goalId, field, value) => {
    setGoals(goals.map(goal =>
      goal.id === goalId ? { ...goal, [field]: value } : goal
    ));
  };

  const getTimeHorizon = (targetDate) => {
    if (!targetDate) return '';
    const today = new Date();
    const target = new Date(targetDate);
    const diffTime = target - today;
    const diffYears = diffTime / (1000 * 60 * 60 * 24 * 365);

    if (diffYears < 2) return 'Short-Term';
    if (diffYears <= 5) return 'Intermediate-Term';
    return 'Long-Term';
  };

  const getTimeHorizonColor = (horizon) => {
    switch (horizon) {
      case 'Short-Term': return CHART_SKY_BLUE;
      case 'Intermediate-Term': return CHART_PINK;
      case 'Long-Term': return CHART_PURPLE;
      default: return MID_SLATE;
    }
  };

  // Navigation functions
  const goToNextStep = () => {
    if (currentStep < 4) {
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

      // Adjust score based on emotional risk choice
      let adjustedScore = riskData.score;
      let emotionalAdjustment = '';

      if (emotionalRiskChoice === 'A') {
        adjustedScore = Math.max(1, adjustedScore - 0.5);
        emotionalAdjustment = 'Your conservative emotional response suggests a slightly lower risk tolerance.';
      } else if (emotionalRiskChoice === 'C') {
        adjustedScore = Math.min(10, adjustedScore + 0.5);
        emotionalAdjustment = 'Your confident emotional response indicates a higher risk tolerance.';
      } else if (emotionalRiskChoice === 'B') {
        emotionalAdjustment = 'Your balanced emotional response aligns well with your calculated profile.';
      }

      adjustedScore = Math.round(adjustedScore * 10) / 10;
      setRiskRate(adjustedScore);

      // Generate comprehensive explanation
      const explanationText = `Based on your profile, your risk score is ${adjustedScore}/10 (${getRiskRecommendation(adjustedScore).level}).

Key factors considered:
${riskData.factors.map(factor => `• ${factor}`).join('\n')}
${emotionalAdjustment ? `• ${emotionalAdjustment}` : ''}

Recommendation: ${getRiskRecommendation(adjustedScore).description}

Suggested allocation: ${getRiskAllocation(adjustedScore).stocks}% Stocks, ${getRiskAllocation(adjustedScore).bonds}% Bonds, ${getRiskAllocation(adjustedScore).gold}% Gold, ${getRiskAllocation(adjustedScore).cash}% Cash

Investment horizon: ${getRiskRecommendation(adjustedScore).timeHorizon}`;

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

  const handleInvestmentTypeChange = (e) => {
    const { value, checked } = e.target;
    if (checked) {
      setSelectedInvestmentTypes((prev) => [...prev, value]);
    } else {
      setSelectedInvestmentTypes((prev) => prev.filter((type) => type !== value));
    }
  };

  // Check if current step is complete
  const isCurrentStepComplete = () => {
    switch (currentStep) {
      case 1:
        // Require at least one complete goal in addition to basic info
        const hasCompleteGoal = goals.some(goal =>
          goal.name.trim() && goal.targetAmount.trim() && goal.targetDate.trim()
        );
        return age && !ageError && dependencies !== '' && !dependenciesError &&
               monthlyIncome && monthlyExpenses && hasCompleteGoal;
      case 2:
        return riskRate !== null && emotionalRiskChoice !== '';
      case 3:
        return objective && initialCapital &&
               (objective !== 'Income Generation' || monthlyAmount) &&
               selectedInvestmentTypes.length > 0;
      case 4:
        return true; // Blueprint step is always complete once reached
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
      case 4:
        return renderPortfolioBlueprintStep();
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
            Step 1: Your Financial Foundation
          </h2>
          <p className="text-lg" style={{ color: MID_SLATE }}>
            Let's start by understanding your financial situation and goals to build the perfect portfolio for you.
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
                  borderColor: ageError ? CORPORATE_NAVY : MID_SLATE,
                  color: LIGHT_SLATE
                }}
                placeholder="Enter your age"
                min="18"
                max="100"
              />
              {ageError && (
                <p className="mt-2 text-sm flex items-center" style={{ color: CHART_SKY_BLUE }}>
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
                  borderColor: dependenciesError ? CORPORATE_NAVY : MID_SLATE,
                  color: LIGHT_SLATE
                }}
                placeholder="Enter number of dependencies"
                min="0"
                max="10"
              />
              {dependenciesError && (
                <p className="mt-2 text-sm flex items-center" style={{ color: CHART_SKY_BLUE }}>
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

          {/* Financial Goals Section */}
          <div className="mt-8">
            <div className="mb-6">
              <h3 className="text-2xl font-bold mb-3" style={{ color: CYBER_TEAL }}>
                What are you investing for?
              </h3>
              <p className="text-sm" style={{ color: MID_SLATE }}>
                Defining clear goals is the first step to a successful plan. List your most important financial goals.
              </p>
            </div>

            {/* Goals List */}
            <div className="space-y-4 mb-6">
              {goals.map((goal) => (
                <div
                  key={goal.id}
                  className="p-6 rounded-lg border-2"
                  style={{
                    backgroundColor: DEEP_SPACE_BLUE,
                    borderColor: MID_SLATE
                  }}
                >
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                    <div>
                      <label className="block text-sm font-medium mb-2" style={{ color: LIGHT_SLATE }}>
                        Goal Name
                      </label>
                      <input
                        type="text"
                        value={goal.name}
                        onChange={(e) => updateGoal(goal.id, 'name', e.target.value)}
                        className="w-full p-3 rounded-lg border-2 focus:outline-none focus:ring-2 transition-all duration-200"
                        style={{
                          backgroundColor: CORPORATE_NAVY,
                          borderColor: MID_SLATE,
                          color: LIGHT_SLATE
                        }}
                        placeholder="e.g., House down payment"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2" style={{ color: LIGHT_SLATE }}>
                        Target Amount (LKR)
                      </label>
                      <input
                        type="text"
                        value={goal.targetAmount}
                        onChange={(e) => updateGoal(goal.id, 'targetAmount', e.target.value)}
                        className="w-full p-3 rounded-lg border-2 focus:outline-none focus:ring-2 transition-all duration-200"
                        style={{
                          backgroundColor: CORPORATE_NAVY,
                          borderColor: MID_SLATE,
                          color: LIGHT_SLATE
                        }}
                        placeholder="e.g., 5,000,000"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2" style={{ color: LIGHT_SLATE }}>
                        Target Date
                      </label>
                      <input
                        type="date"
                        value={goal.targetDate}
                        onChange={(e) => updateGoal(goal.id, 'targetDate', e.target.value)}
                        className="w-full p-3 rounded-lg border-2 focus:outline-none focus:ring-2 transition-all duration-200"
                        style={{
                          backgroundColor: CORPORATE_NAVY,
                          borderColor: MID_SLATE,
                          color: LIGHT_SLATE
                        }}
                      />
                    </div>
                  </div>

                  {/* Time Horizon Badge */}
                  {goal.targetDate && (
                    <div className="flex items-center justify-between">
                      <div
                        className="inline-block px-3 py-1 rounded-full text-xs font-bold"
                        style={{
                          backgroundColor: getTimeHorizonColor(getTimeHorizon(goal.targetDate)),
                          color: DEEP_SPACE_BLUE
                        }}
                      >
                        {getTimeHorizon(goal.targetDate)}
                      </div>
                      <button
                        type="button"
                        onClick={() => removeGoal(goal.id)}
                        className="text-sm px-3 py-1 rounded-lg transition-all duration-200 hover:opacity-80"
                        style={{
                          backgroundColor: CHART_SKY_BLUE,
                          color: DEEP_SPACE_BLUE
                        }}
                      >
                        Remove
                      </button>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Add Goal Button */}
            <button
              type="button"
              onClick={addGoal}
              className="w-full p-4 rounded-lg border-2 border-dashed transition-all duration-200 hover:border-opacity-80 flex items-center justify-center space-x-2"
              style={{
                borderColor: CYBER_TEAL,
                color: CYBER_TEAL
              }}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
              <span>Add Goal</span>
            </button>
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
            Step 2: Your Risk Discovery
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
                    color: (parseFloat(monthlyIncome.replace(/,/g, '')) - parseFloat(monthlyExpenses.replace(/,/g, ''))) > 0 ? CYBER_TEAL : CHART_SKY_BLUE
                  }}
                  className="font-medium"
                >
                  LKR {(parseFloat(monthlyIncome.replace(/,/g, '')) - parseFloat(monthlyExpenses.replace(/,/g, ''))).toLocaleString()}
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Emotional Risk Assessment */}
        <div
          className="p-6 rounded-lg mb-6"
          style={{ backgroundColor: DEEP_SPACE_BLUE }}
        >
          <h4 className="text-lg font-semibold mb-4" style={{ color: LIGHT_SLATE }}>
            Gauging Your Gut Feeling
          </h4>
          <p className="text-sm mb-4" style={{ color: MID_SLATE }}>
            Imagine the market has a bad year, and your LKR 100,000 portfolio drops to LKR 80,000. Your immediate reaction is to:
          </p>
          <div className="space-y-3">
            {[
              { value: 'A', text: 'Sell to prevent further losses.' },
              { value: 'B', text: 'Do nothing and wait for it to recover.' },
              { value: 'C', text: 'Invest more while prices are low.' }
            ].map((choice) => (
              <button
                key={choice.value}
                type="button"
                onClick={() => setEmotionalRiskChoice(choice.value)}
                className="w-full p-4 rounded-lg border-2 text-left transition-all duration-200 hover:border-opacity-80"
                style={{
                  backgroundColor: emotionalRiskChoice === choice.value ? `${CYBER_TEAL}20` : CORPORATE_NAVY,
                  borderColor: emotionalRiskChoice === choice.value ? CYBER_TEAL : MID_SLATE,
                  color: LIGHT_SLATE
                }}
              >
                <span className="font-bold mr-3" style={{ color: CYBER_TEAL }}>
                  {choice.value})
                </span>
                {choice.text}
              </button>
            ))}
          </div>
        </div>

        <div className="mb-8">
          <button
            type="button"
            onClick={fetchRiskRate}
            disabled={!age || !dependencies || !monthlyIncome || !monthlyExpenses || ageError || dependenciesError || isCalculatingRisk || !emotionalRiskChoice}
            className="px-8 py-4 rounded-lg font-bold text-lg transition-all duration-200 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center space-x-3"
            style={{
              backgroundColor: (!age || !dependencies || !monthlyIncome || !monthlyExpenses || ageError || dependenciesError || isCalculatingRisk || !emotionalRiskChoice) ? MID_SLATE : CYBER_TEAL,
              color: DEEP_SPACE_BLUE,
              boxShadow: (!age || !dependencies || !monthlyIncome || !monthlyExpenses || ageError || dependenciesError || isCalculatingRisk || !emotionalRiskChoice) ? 'none' : `0 4px 14px 0 ${CYBER_TEAL}40`
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
                borderColor: riskRate <= 3 ? CORPORATE_NAVY :
                            riskRate <= 6 ? CHART_SKY_BLUE :
                            CYBER_TEAL
              }}
            >
              <div className="flex items-center justify-center mb-4">
                <div
                  className="w-16 h-16 rounded-full flex items-center justify-center mr-4"
                  style={{
                    backgroundColor: riskRate <= 3 ? CORPORATE_NAVY :
                                    riskRate <= 6 ? CHART_SKY_BLUE :
                                    CYBER_TEAL
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
                    backgroundColor: riskRate <= 3 ? CORPORATE_NAVY :
                                    riskRate <= 6 ? CHART_SKY_BLUE :
                                    CYBER_TEAL,
                    color: LIGHT_SLATE
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
                  backgroundColor: riskRate <= 3 ? CORPORATE_NAVY :
                                  riskRate <= 6 ? CHART_SKY_BLUE :
                                  CYBER_TEAL,
                  color: LIGHT_SLATE
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

  // Step 4: Portfolio Blueprint
  const renderPortfolioBlueprintStep = () => {
    const riskRecommendation = getRiskRecommendation(riskRate);
    const allocation = getRiskAllocation(riskRate);
    const primaryGoal = goals.find(goal => goal.name && goal.targetAmount && goal.targetDate);

    // Prepare pie chart data
    const pieChartData = {
      labels: ['Stocks', 'Bonds', 'Gold', 'Cash'],
      datasets: [
        {
          data: [allocation.stocks, allocation.bonds, allocation.gold, allocation.cash],
          backgroundColor: [CHART_PURPLE, CHART_SKY_BLUE, CHART_PINK, CYBER_TEAL],
          borderColor: DEEP_SPACE_BLUE,
          borderWidth: 2,
        },
      ],
    };

    const pieChartOptions = {
      responsive: true,
      plugins: {
        legend: {
          position: 'bottom',
          labels: {
            color: LIGHT_SLATE,
            padding: 20,
            font: {
              size: 14
            }
          }
        },
        tooltip: {
          backgroundColor: CORPORATE_NAVY,
          titleColor: LIGHT_SLATE,
          bodyColor: LIGHT_SLATE,
          borderColor: CYBER_TEAL,
          borderWidth: 1
        }
      }
    };

    const downloadPlan = () => {
      const doc = new jsPDF();

      // Set colors and fonts
      doc.setTextColor(10, 25, 47); // DEEP_SPACE_BLUE equivalent

      // Title
      doc.setFontSize(20);
      doc.text('Your Investment Blueprint', 20, 30);

      // Profile section
      doc.setFontSize(14);
      doc.text(`Investor Profile: ${riskRecommendation.level} (Risk Score: ${riskRate}/10)`, 20, 50);

      // Allocation
      doc.text('Recommended Asset Allocation:', 20, 70);
      doc.setFontSize(12);
      doc.text(`• Stocks: ${allocation.stocks}%`, 30, 85);
      doc.text(`• Bonds: ${allocation.bonds}%`, 30, 95);
      doc.text(`• Gold: ${allocation.gold}%`, 30, 105);
      doc.text(`• Cash: ${allocation.cash}%`, 30, 115);

      // Goals
      if (primaryGoal) {
        doc.setFontSize(14);
        doc.text('Primary Goal:', 20, 135);
        doc.setFontSize(12);
        doc.text(`${primaryGoal.name} - LKR ${primaryGoal.targetAmount}`, 30, 150);
        doc.text(`Target Date: ${primaryGoal.targetDate}`, 30, 160);
      }

      // Recommendation
      doc.setFontSize(14);
      doc.text('Investment Strategy:', 20, 180);
      doc.setFontSize(10);
      const splitText = doc.splitTextToSize(riskRecommendation.description, 160);
      doc.text(splitText, 30, 195);

      doc.save('investment-blueprint.pdf');
    };

    return (
      <div
        className="rounded-lg p-8 shadow-xl animate-slideInUp"
        style={{ backgroundColor: CORPORATE_NAVY }}
      >
        <div className="mb-8">
          <h2 className="text-3xl font-bold mb-3" style={{ color: CYBER_TEAL }}>
            Your Investment Blueprint
          </h2>
          <p className="text-lg" style={{ color: MID_SLATE }}>
            Here's your personalized investment strategy based on our comprehensive analysis.
          </p>
        </div>

        {/* Profile Summary */}
        <div
          className="p-6 rounded-lg mb-6"
          style={{ backgroundColor: DEEP_SPACE_BLUE }}
        >
          <h3 className="text-xl font-semibold mb-4" style={{ color: LIGHT_SLATE }}>
            Your Profile
          </h3>
          <p className="text-lg" style={{ color: MID_SLATE }}>
            Based on our analysis, you are a <span style={{ color: CYBER_TEAL, fontWeight: 'bold' }}>
            {riskRecommendation.level}</span> Investor with a risk score of <span style={{ color: CYBER_TEAL, fontWeight: 'bold' }}>
            {riskRate}/10</span>.
          </p>
        </div>

        {/* Asset Allocation Chart */}
        <div
          className="p-6 rounded-lg mb-6"
          style={{ backgroundColor: DEEP_SPACE_BLUE }}
        >
          <h3 className="text-xl font-semibold mb-6" style={{ color: LIGHT_SLATE }}>
            Recommended Asset Allocation
          </h3>
          <div className="max-w-md mx-auto">
            <Pie data={pieChartData} options={pieChartOptions} />
          </div>
        </div>

        {/* Goal Alignment */}
        {primaryGoal && (
          <div
            className="p-6 rounded-lg mb-6"
            style={{ backgroundColor: DEEP_SPACE_BLUE }}
          >
            <h3 className="text-xl font-semibold mb-4" style={{ color: LIGHT_SLATE }}>
              Alignment with Goals
            </h3>
            <p className="text-lg" style={{ color: MID_SLATE }}>
              This <span style={{ color: CYBER_TEAL, fontWeight: 'bold' }}>{riskRecommendation.level}</span> portfolio
              is designed to help you reach your goal of <span style={{ color: CYBER_TEAL, fontWeight: 'bold' }}>
              {primaryGoal.name}</span> by <span style={{ color: CYBER_TEAL, fontWeight: 'bold' }}>
              {new Date(primaryGoal.targetDate).toLocaleDateString()}</span>.
            </p>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4">
          <button
            type="button"
            onClick={() => {
              setCurrentStep(1);
              setCompletedSteps([]);
              setGoals([]);
              setRiskRate(null);
              setEmotionalRiskChoice('');
            }}
            className="flex-1 px-6 py-3 rounded-lg font-bold transition-all duration-200 transform hover:scale-105 flex items-center justify-center space-x-2"
            style={{
              backgroundColor: CORPORATE_NAVY,
              color: LIGHT_SLATE,
              border: `2px solid ${MID_SLATE}`
            }}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
            <span>Start Over</span>
          </button>
          <button
            type="button"
            onClick={downloadPlan}
            className="flex-1 px-6 py-3 rounded-lg font-bold transition-all duration-200 transform hover:scale-105 flex items-center justify-center space-x-2"
            style={{
              backgroundColor: CYBER_TEAL,
              color: DEEP_SPACE_BLUE,
              boxShadow: `0 4px 14px 0 ${CYBER_TEAL}40`
            }}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            <span>Download My Plan</span>
          </button>
        </div>
      </div>
    );
  };

  // Portfolio builder main component
  return (
    <div className="min-h-screen" style={{ backgroundColor: DEEP_SPACE_BLUE, color: LIGHT_SLATE }}>
      {/* Educational Banner */}
      {showEducationalBanner && (
        <div
          className="p-4 border-b-2"
          style={{
            backgroundColor: `${CYBER_TEAL}20`,
            borderBottomColor: CYBER_TEAL
          }}
        >
          <div className="max-w-4xl mx-auto flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <span className="text-2xl">💡</span>
              <div>
                <span style={{ color: LIGHT_SLATE }}>
                  First time investing? For the best experience, we recommend starting with our{' '}
                </span>
                <Link
                  to="/learn"
                  className="font-bold underline hover:opacity-80 transition-opacity duration-200"
                  style={{ color: CYBER_TEAL }}
                >
                  Learn Capital Markets module
                </Link>
                <span style={{ color: LIGHT_SLATE }}> to understand the key concepts.</span>
              </div>
            </div>
            <button
              onClick={() => setShowEducationalBanner(false)}
              className="text-2xl hover:opacity-70 transition-opacity duration-200"
              style={{ color: LIGHT_SLATE }}
            >
              ×
            </button>
          </div>
        </div>
      )}

      <div className="max-w-4xl mx-auto p-6">
        {/* Header */}
        <div className="text-center mb-8 pt-8">
          <h1 className="text-5xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-cyber-teal to-luminous-accent">
            AI Portfolio Builder
          </h1>
          <p className="text-xl mb-6" style={{ color: LIGHT_SLATE }}>
            Build your personalized investment portfolio using proven financial planning principles
          </p>

          {/* Introduction to Financial Planning Process */}
          <div
            className="max-w-3xl mx-auto p-6 rounded-lg border-l-4 mb-8"
            style={{
              backgroundColor: `${CORPORATE_NAVY}80`,
              borderLeftColor: CYBER_TEAL
            }}
          >
            <div className="flex items-start text-left">
              <svg className="w-8 h-8 mr-4 flex-shrink-0 mt-1" style={{ color: CYBER_TEAL }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
              </svg>
              <div>
                <h3 className="text-lg font-semibold mb-3" style={{ color: LUMINOUS_ACCENT }}>
                  Welcome to Your Financial Planning Journey
                </h3>
                <p className="text-sm leading-relaxed mb-3" style={{ color: LIGHT_SLATE }}>
                  This tool follows the proven <strong>6-Step Financial Planning Process</strong> used by professional advisors:
                  (1) Establish relationship, (2) Gather data & goals, (3) Analyze, (4) Recommend, (5) Implement, (6) Monitor.
                </p>
                <p className="text-sm leading-relaxed" style={{ color: MID_SLATE }}>
                  We'll guide you through a simplified version of this process to help you think strategically about your financial future.
                  By the end, you'll have a personalized portfolio recommendation based on your unique situation and goals.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Progress Indicator */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-4">
            {[1, 2, 3, 4].map((step) => (
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
                      ? CYBER_TEAL
                      : MID_SLATE
                  }}
                  onClick={() => goToStep(step)}
                >
                  {completedSteps.includes(step) ? '✓' : step}
                </div>
                {step < 4 && (
                  <div
                    className="w-16 h-1 mx-2 rounded-full transition-all duration-300"
                    style={{
                      backgroundColor: completedSteps.includes(step) ? CYBER_TEAL : MID_SLATE
                    }}
                  />
                )}
              </div>
            ))}
          </div>

          <div className="flex justify-between text-sm" style={{ color: MID_SLATE }}>
            <span className="text-center">Financial Foundation</span>
            <span className="text-center">Risk Discovery</span>
            <span className="text-center">Portfolio Preferences</span>
            <span className="text-center">Investment Blueprint</span>
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

          {currentStep < 4 ? (
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
              <span>{currentStep === 3 ? 'View Blueprint' : 'Next Step'}</span>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          ) : (
            <div className="text-center">
              <p className="text-sm" style={{ color: MID_SLATE }}>
                Your investment blueprint is complete! Use the buttons above to download your plan or start over.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Portfoliobuilder;