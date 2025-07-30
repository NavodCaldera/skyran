import React, { useState } from 'react';
import { Pie } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend
} from 'chart.js';
import { FaBalanceScale, FaCheckCircle, FaChartPie, FaRedo } from 'react-icons/fa';
import {
  DEEP_SPACE_BLUE,
  CORPORATE_NAVY,
  CYBER_TEAL,
  LUMINOUS_ACCENT,
  LIGHT_SLATE,
  MID_SLATE,
  VIBRANT_GREEN,
  CHART_SKY_BLUE,
  CHART_PINK,
  CHART_PURPLE
} from '../../constants';

ChartJS.register(ArcElement, Tooltip, Legend);

const RebalancingSkill = ({ investorProfile, onComplete, isCompleted }) => {
  const [currentLesson, setCurrentLesson] = useState(1);
  const [isSkewed, setIsSkewed] = useState(false);
  const [showRebalanceButton, setShowRebalanceButton] = useState(false);
  const [quizAnswer, setQuizAnswer] = useState('');
  const [skillCompleted, setSkillCompleted] = useState(isCompleted);

  // Get target allocation based on investor profile
  const getTargetAllocation = (profile) => {
    const allocations = {
      Conservative: { stocks: 20, bonds: 70, cash: 10 },
      Moderate: { stocks: 55, bonds: 35, cash: 10 },
      Aggressive: { stocks: 80, bonds: 15, cash: 5 }
    };
    return allocations[profile] || allocations.Moderate;
  };

  const targetAllocation = getTargetAllocation(investorProfile);

  // Create skewed allocation (simulate market growth)
  const skewedAllocation = {
    stocks: Math.min(85, targetAllocation.stocks + 20),
    bonds: Math.max(10, targetAllocation.bonds - 15),
    cash: Math.max(5, targetAllocation.cash - 5)
  };

  const currentAllocation = isSkewed ? skewedAllocation : targetAllocation;

  const chartData = {
    labels: ['Stocks', 'Bonds', 'Cash'],
    datasets: [
      {
        data: [currentAllocation.stocks, currentAllocation.bonds, currentAllocation.cash],
        backgroundColor: [CHART_PURPLE, CHART_SKY_BLUE, CHART_PINK],
        borderColor: DEEP_SPACE_BLUE,
        borderWidth: 2,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    animation: {
      duration: 1000,
      easing: 'easeInOutQuart'
    },
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

  const simulateMarketGrowth = () => {
    setIsSkewed(true);
    setShowRebalanceButton(true);
  };

  const rebalancePortfolio = () => {
    setIsSkewed(false);
    setShowRebalanceButton(false);
  };

  const handleQuizAnswer = (answer) => {
    setQuizAnswer(answer);
  };

  const checkAnswer = () => {
    if (quizAnswer === "Rebalance the portfolio") {
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
            Rebalancing Mastered!
          </h3>
          <p style={{ color: LIGHT_SLATE }}>
            You understand how to maintain your target allocation through rebalancing.
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
            <FaBalanceScale className="text-2xl" style={{ color: CYBER_TEAL }} />
          </div>
        </div>
        <h3 className="text-2xl font-bold mb-4" style={{ color: CYBER_TEAL }}>
          Portfolio Rebalancing
        </h3>
        <p className="text-lg" style={{ color: LIGHT_SLATE }}>
          Learn how to maintain your target allocation as markets change over time.
        </p>
      </div>

      {currentLesson === 1 && (
        <div>
          {/* What is Rebalancing */}
          <div
            className="p-6 rounded-lg mb-6"
            style={{ backgroundColor: DEEP_SPACE_BLUE }}
          >
            <h4 className="text-xl font-semibold mb-4" style={{ color: LUMINOUS_ACCENT }}>
              What is Rebalancing?
            </h4>
            
            <div className="space-y-4 mb-6">
              <p className="text-lg" style={{ color: LIGHT_SLATE }}>
                Rebalancing is the process of realigning your portfolio back to your target allocation. 
                Over time, some investments will grow faster than others, causing your portfolio to drift from your intended mix.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div
                  className="p-4 rounded-lg"
                  style={{ backgroundColor: CORPORATE_NAVY }}
                >
                  <h5 className="font-semibold mb-2" style={{ color: CHART_PURPLE }}>
                    Why Rebalance?
                  </h5>
                  <ul className="text-sm space-y-1" style={{ color: MID_SLATE }}>
                    <li>• Maintains your target risk level</li>
                    <li>• Forces you to "sell high, buy low"</li>
                    <li>• Keeps you disciplined</li>
                    <li>• Prevents overconcentration</li>
                  </ul>
                </div>

                <div
                  className="p-4 rounded-lg"
                  style={{ backgroundColor: CORPORATE_NAVY }}
                >
                  <h5 className="font-semibold mb-2" style={{ color: CHART_SKY_BLUE }}>
                    When to Rebalance?
                  </h5>
                  <ul className="text-sm space-y-1" style={{ color: MID_SLATE }}>
                    <li>• Annually or semi-annually</li>
                    <li>• When allocation drifts 5-10%</li>
                    <li>• After major market movements</li>
                    <li>• During life changes</li>
                  </ul>
                </div>
              </div>
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
                See Interactive Example
              </button>
            </div>
          </div>
        </div>
      )}

      {currentLesson === 2 && (
        <div>
          {/* Interactive Rebalancing */}
          <div
            className="p-6 rounded-lg mb-6"
            style={{ backgroundColor: DEEP_SPACE_BLUE }}
          >
            <h4 className="text-xl font-semibold mb-4" style={{ color: LUMINOUS_ACCENT }}>
              Interactive Rebalancing Simulation
            </h4>
            
            <p className="text-lg mb-6" style={{ color: LIGHT_SLATE }}>
              Your target allocation as a {investorProfile || 'Moderate'} investor:
            </p>

            {/* Portfolio Chart */}
            <div className="max-w-md mx-auto mb-6">
              <Pie data={chartData} options={chartOptions} />
            </div>

            {/* Current Allocation Display */}
            <div
              className="p-4 rounded-lg mb-6"
              style={{ 
                backgroundColor: isSkewed ? `${CHART_PINK}20` : `${VIBRANT_GREEN}20`,
                border: `2px solid ${isSkewed ? CHART_PINK : VIBRANT_GREEN}`
              }}
            >
              <h5 className="font-semibold mb-3 text-center" style={{ color: isSkewed ? CHART_PINK : VIBRANT_GREEN }}>
                {isSkewed ? '⚠️ Portfolio After Market Growth' : '✅ Balanced Portfolio'}
              </h5>
              <div className="grid grid-cols-3 gap-4 text-center">
                <div>
                  <div className="font-bold" style={{ color: CHART_PURPLE }}>Stocks</div>
                  <div style={{ color: LIGHT_SLATE }}>{currentAllocation.stocks}%</div>
                  {isSkewed && (
                    <div className="text-xs" style={{ color: CHART_PINK }}>
                      Target: {targetAllocation.stocks}%
                    </div>
                  )}
                </div>
                <div>
                  <div className="font-bold" style={{ color: CHART_SKY_BLUE }}>Bonds</div>
                  <div style={{ color: LIGHT_SLATE }}>{currentAllocation.bonds}%</div>
                  {isSkewed && (
                    <div className="text-xs" style={{ color: CHART_PINK }}>
                      Target: {targetAllocation.bonds}%
                    </div>
                  )}
                </div>
                <div>
                  <div className="font-bold" style={{ color: CHART_PINK }}>Cash</div>
                  <div style={{ color: LIGHT_SLATE }}>{currentAllocation.cash}%</div>
                  {isSkewed && (
                    <div className="text-xs" style={{ color: CHART_PINK }}>
                      Target: {targetAllocation.cash}%
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="text-center space-y-4">
              {!isSkewed && !showRebalanceButton && (
                <button
                  onClick={simulateMarketGrowth}
                  className="px-6 py-3 rounded-lg font-bold transition-all duration-200 hover:scale-105 flex items-center space-x-2 mx-auto"
                  style={{
                    backgroundColor: CHART_PURPLE,
                    color: DEEP_SPACE_BLUE
                  }}
                >
                  <FaChartPie />
                  <span>Simulate 1 Year of Market Growth</span>
                </button>
              )}

              {showRebalanceButton && (
                <button
                  onClick={rebalancePortfolio}
                  className="px-6 py-3 rounded-lg font-bold transition-all duration-200 hover:scale-105 flex items-center space-x-2 mx-auto"
                  style={{
                    backgroundColor: VIBRANT_GREEN,
                    color: DEEP_SPACE_BLUE
                  }}
                >
                  <FaRedo />
                  <span>Rebalance Portfolio</span>
                </button>
              )}

              {!isSkewed && !showRebalanceButton && (
                <button
                  onClick={() => setCurrentLesson(3)}
                  className="px-6 py-3 rounded-lg font-bold transition-all duration-200 hover:scale-105"
                  style={{
                    backgroundColor: CYBER_TEAL,
                    color: DEEP_SPACE_BLUE
                  }}
                >
                  Test Your Knowledge
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {currentLesson === 3 && (
        <div>
          {/* Rebalancing Quiz */}
          <div
            className="p-6 rounded-lg mb-6"
            style={{ backgroundColor: DEEP_SPACE_BLUE }}
          >
            <h4 className="text-xl font-semibold mb-4" style={{ color: LUMINOUS_ACCENT }}>
              Rebalancing Scenario
            </h4>
            
            <div
              className="p-4 rounded-lg mb-6"
              style={{ backgroundColor: CORPORATE_NAVY }}
            >
              <p className="text-lg" style={{ color: LIGHT_SLATE }}>
                You check your portfolio after a great year, and stocks now make up 80% of your holdings, 
                far above your 60% target. What should you do?
              </p>
            </div>

            <div className="space-y-3 mb-6">
              {[
                "Buy more stocks while they're performing well",
                "Rebalance the portfolio",
                "Wait and see what happens next year"
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
                    backgroundColor: quizAnswer === "Rebalance the portfolio" ? VIBRANT_GREEN : CHART_PINK,
                    color: DEEP_SPACE_BLUE
                  }}
                >
                  {quizAnswer === "Rebalance the portfolio" ? 'Correct! Complete Skill' : 'Try Again'}
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default RebalancingSkill;
