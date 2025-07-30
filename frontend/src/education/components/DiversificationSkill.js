import React, { useState } from 'react';
import { Pie } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend
} from 'chart.js';
import { FaEgg, FaCheckCircle, FaShieldAlt } from 'react-icons/fa';
import {
  DEEP_SPACE_BLUE,
  CORPORATE_NAVY,
  CYBER_TEAL,
  LUMINOUS_ACCENT,
  LIGHT_SLATE,
  MID_SLATE,
  VIBRANT_GREEN,
  ERROR_RED,
  CHART_SKY_BLUE,
  CHART_PINK,
  CHART_PURPLE
} from '../../constants';

ChartJS.register(ArcElement, Tooltip, Legend);

const DiversificationSkill = ({ investorProfile, onComplete, isCompleted }) => {
  const [currentLesson, setCurrentLesson] = useState(1);
  const [quizAnswer, setQuizAnswer] = useState('');
  const [skillCompleted, setSkillCompleted] = useState(isCompleted);

  // Portfolio allocations based on investor profile
  const portfolioAllocations = {
    Conservative: { 
      labels: ['Stocks', 'Bonds', 'Cash'], 
      data: [20, 70, 10],
      colors: [CHART_PURPLE, CHART_SKY_BLUE, CHART_PINK],
      description: "As a Conservative investor, your portfolio prioritizes stability and capital preservation. The heavy allocation to bonds provides steady income, while a small stock allocation offers some growth potential."
    },
    Moderate: { 
      labels: ['Stocks', 'Bonds', 'Cash'], 
      data: [55, 35, 10],
      colors: [CHART_PURPLE, CHART_SKY_BLUE, CHART_PINK],
      description: "As a Moderate investor, your portfolio balances growth and stability. The majority in stocks provides growth potential, while bonds offer stability and cash provides liquidity."
    },
    Aggressive: { 
      labels: ['Stocks', 'Bonds', 'Cash'], 
      data: [80, 15, 5],
      colors: [CHART_PURPLE, CHART_SKY_BLUE, CHART_PINK],
      description: "As an Aggressive investor, your portfolio focuses on long-term growth. The heavy stock allocation maximizes growth potential, accepting higher volatility for potentially higher returns."
    }
  };

  // Default to Moderate if profile not found
  const currentAllocation = portfolioAllocations[investorProfile] || portfolioAllocations.Moderate;

  const chartData = {
    labels: currentAllocation.labels,
    datasets: [
      {
        data: currentAllocation.data,
        backgroundColor: currentAllocation.colors,
        borderColor: DEEP_SPACE_BLUE,
        borderWidth: 2,
      },
    ],
  };

  const chartOptions = {
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
        borderWidth: 1,
        callbacks: {
          label: function(context) {
            return `${context.label}: ${context.parsed}%`;
          }
        }
      }
    }
  };

  // Unbalanced portfolio for quiz
  const unbalancedChartData = {
    labels: ['Single Tech Stock', 'Cash'],
    datasets: [
      {
        data: [95, 5],
        backgroundColor: [ERROR_RED, CHART_PINK],
        borderColor: DEEP_SPACE_BLUE,
        borderWidth: 2,
      },
    ],
  };

  const handleQuizAnswer = (answer) => {
    setQuizAnswer(answer);
  };

  const checkAnswer = () => {
    if (quizAnswer === "Diversify across different assets") {
      setSkillCompleted(true);
      setTimeout(() => {
        onComplete();
      }, 2000);
    }
  };

  if (skillCompleted) {
    return (
      <div className="text-center">
        <div className="mb-6">
          <FaCheckCircle className="text-6xl mx-auto mb-4" style={{ color: VIBRANT_GREEN }} />
          <h3 className="text-2xl font-bold mb-2" style={{ color: VIBRANT_GREEN }}>
            Diversification Mastered!
          </h3>
          <p style={{ color: LIGHT_SLATE }}>
            You understand the golden rule of investing and your personalized portfolio allocation.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div>
      {/* Skill Header */}
      <div className="text-center mb-8">
        <div className="flex justify-center mb-4">
          <div
            className="w-16 h-16 rounded-full flex items-center justify-center"
            style={{ backgroundColor: `${CYBER_TEAL}20`, border: `2px solid ${CYBER_TEAL}` }}
          >
            <FaShieldAlt className="text-2xl" style={{ color: CYBER_TEAL }} />
          </div>
        </div>
        <h3 className="text-2xl font-bold mb-4" style={{ color: CYBER_TEAL }}>
          The Golden Rule: Diversification
        </h3>
        <p className="text-lg" style={{ color: LIGHT_SLATE }}>
          Learn why "don't put all your eggs in one basket" is the most important rule in investing.
        </p>
      </div>

      {currentLesson === 1 && (
        <div>
          {/* Diversification Concept */}
          <div
            className="p-6 rounded-lg mb-6"
            style={{ backgroundColor: DEEP_SPACE_BLUE }}
          >
            <h4 className="text-xl font-semibold mb-6" style={{ color: LUMINOUS_ACCENT }}>
              Why Diversification Matters
            </h4>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-6">
              {/* Single Egg Scenario */}
              <div className="text-center">
                <h5 className="text-lg font-semibold mb-4" style={{ color: ERROR_RED }}>
                  All Eggs in One Basket
                </h5>
                <div className="relative mb-4">
                  <div
                    className="w-32 h-32 rounded-lg mx-auto flex items-center justify-center relative overflow-hidden"
                    style={{ backgroundColor: `${ERROR_RED}20`, border: `2px solid ${ERROR_RED}` }}
                  >
                    <FaEgg className="text-4xl" style={{ color: ERROR_RED }} />
                  </div>
                </div>
                <p className="text-sm" style={{ color: MID_SLATE }}>
                  If the basket drops, you lose everything
                </p>
              </div>

              {/* Multiple Eggs Scenario */}
              <div className="text-center">
                <h5 className="text-lg font-semibold mb-4" style={{ color: VIBRANT_GREEN }}>
                  Eggs in Multiple Baskets
                </h5>
                <div className="grid grid-cols-3 gap-2 mb-4">
                  {[0, 1, 2].map((index) => (
                    <div
                      key={index}
                      className="w-20 h-20 rounded-lg flex items-center justify-center"
                      style={{ 
                        backgroundColor: index === 1 ? `${ERROR_RED}20` : `${VIBRANT_GREEN}20`, 
                        border: `2px solid ${index === 1 ? ERROR_RED : VIBRANT_GREEN}` 
                      }}
                    >
                      <FaEgg
                        className="text-2xl"
                        style={{ color: index === 1 ? ERROR_RED : VIBRANT_GREEN }}
                      />
                    </div>
                  ))}
                </div>
                <p className="text-sm" style={{ color: MID_SLATE }}>
                  If one basket drops, you still have the others
                </p>
              </div>
            </div>

            <div
              className="p-4 rounded-lg mb-6"
              style={{ backgroundColor: CORPORATE_NAVY }}
            >
              <p className="text-lg text-center" style={{ color: LIGHT_SLATE }}>
                <strong>Diversification</strong> means spreading your investments across different types of assets, 
                companies, and sectors to reduce risk.
              </p>
            </div>

            <div className="text-center">
              <button
                onClick={() => setCurrentLesson(2)}
                className="px-6 py-3 rounded-lg font-bold transition-all duration-200 hover:scale-105"
                style={{
                  backgroundColor: CYBER_TEAL,
                  color: DEEP_SPACE_BLUE
                }}
              >
                See Your Personalized Portfolio
              </button>
            </div>
          </div>
        </div>
      )}

      {currentLesson === 2 && (
        <div>
          {/* Personalized Portfolio */}
          <div
            className="p-6 rounded-lg mb-6"
            style={{ backgroundColor: DEEP_SPACE_BLUE }}
          >
            <h4 className="text-xl font-semibold mb-4" style={{ color: LUMINOUS_ACCENT }}>
              Asset Allocation for a {investorProfile || 'Moderate'} Investor
            </h4>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-6">
              {/* Pie Chart */}
              <div className="text-center">
                <h5 className="text-lg font-semibold mb-4" style={{ color: CYBER_TEAL }}>
                  Your Recommended Portfolio
                </h5>
                <div className="max-w-sm mx-auto">
                  <Pie data={chartData} options={chartOptions} />
                </div>
              </div>

              {/* Allocation Details */}
              <div>
                <h5 className="text-lg font-semibold mb-4" style={{ color: CYBER_TEAL }}>
                  Why This Mix?
                </h5>
                <p className="text-sm mb-6" style={{ color: LIGHT_SLATE }}>
                  {currentAllocation.description}
                </p>

                <div className="space-y-3">
                  {currentAllocation.labels.map((label, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <div className="flex items-center">
                        <div
                          className="w-4 h-4 rounded-full mr-3"
                          style={{ backgroundColor: currentAllocation.colors[index] }}
                        />
                        <span style={{ color: LIGHT_SLATE }}>{label}</span>
                      </div>
                      <span className="font-bold" style={{ color: currentAllocation.colors[index] }}>
                        {currentAllocation.data[index]}%
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="text-center">
              <button
                onClick={() => setCurrentLesson(3)}
                className="px-6 py-3 rounded-lg font-bold transition-all duration-200 hover:scale-105"
                style={{
                  backgroundColor: CYBER_TEAL,
                  color: DEEP_SPACE_BLUE
                }}
              >
                Test Your Understanding
              </button>
            </div>
          </div>
        </div>
      )}

      {currentLesson === 3 && (
        <div>
          {/* Fix the Portfolio Quiz */}
          <div
            className="p-6 rounded-lg mb-6"
            style={{ backgroundColor: DEEP_SPACE_BLUE }}
          >
            <h4 className="text-xl font-semibold mb-4" style={{ color: LUMINOUS_ACCENT }}>
              Fix the Portfolio Challenge
            </h4>
            
            <p className="text-lg mb-6" style={{ color: LIGHT_SLATE }}>
              Look at this portfolio. What's the most important step to improve it?
            </p>

            {/* Unbalanced Portfolio Chart */}
            <div className="max-w-sm mx-auto mb-6">
              <Pie data={unbalancedChartData} options={chartOptions} />
            </div>

            <div
              className="p-4 rounded-lg mb-6 text-center"
              style={{ backgroundColor: `${ERROR_RED}20`, border: `2px solid ${ERROR_RED}` }}
            >
              <p className="font-bold" style={{ color: ERROR_RED }}>
                ⚠️ This portfolio has 95% in a single tech stock!
              </p>
            </div>

            <div className="space-y-3 mb-6">
              {[
                "Buy more of the same stock",
                "Diversify across different assets",
                "Put everything in cash"
              ].map((option, index) => (
                <button
                  key={index}
                  onClick={() => handleQuizAnswer(option)}
                  className="w-full p-4 rounded-lg border-2 text-left transition-all duration-200 hover:scale-105"
                  style={{
                    backgroundColor: quizAnswer === option ? `${CYBER_TEAL}20` : CORPORATE_NAVY,
                    borderColor: quizAnswer === option ? CYBER_TEAL : MID_SLATE,
                    color: LIGHT_SLATE
                  }}
                >
                  {option}
                </button>
              ))}
            </div>

            {quizAnswer && (
              <div className="text-center">
                <button
                  onClick={checkAnswer}
                  className="px-6 py-3 rounded-lg font-bold transition-all duration-200 hover:scale-105"
                  style={{
                    backgroundColor: quizAnswer === "Diversify across different assets" ? VIBRANT_GREEN : ERROR_RED,
                    color: DEEP_SPACE_BLUE
                  }}
                >
                  {quizAnswer === "Diversify across different assets" ? 'Correct! Complete Module' : 'Try Again'}
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default DiversificationSkill;
