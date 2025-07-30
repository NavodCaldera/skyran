import React, { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';
import { FaMagic, FaCheckCircle, FaRocket } from 'react-icons/fa';
import {
  DEEP_SPACE_BLUE,
  CORPORATE_NAVY,
  CYBER_TEAL,
  LUMINOUS_ACCENT,
  LIGHT_SLATE,
  MID_SLATE,
  VIBRANT_GREEN,
  CHART_PURPLE,
  CHART_PINK,
  CHART_SKY_BLUE
} from '../../constants';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const CompoundingSkill = ({ userData, onComplete, isCompleted }) => {
  const [skillCompleted, setSkillCompleted] = useState(isCompleted);
  const [showChart, setShowChart] = useState(false);

  // Get user's data for personalization
  const monthlySavings = userData.monthlySavings || 50000; // Default if not set
  const longTermGoal = userData.goals?.find(goal => {
    if (!goal.targetDate) return false;
    const today = new Date();
    const target = new Date(goal.targetDate);
    const diffYears = (target - today) / (1000 * 60 * 60 * 24 * 365);
    return diffYears > 5;
  });

  const targetAmount = longTermGoal ? 
    parseFloat(longTermGoal.targetAmount.replace(/,/g, '')) || 5000000 : 5000000;
  const targetYears = longTermGoal ? 
    Math.ceil((new Date(longTermGoal.targetDate) - new Date()) / (1000 * 60 * 60 * 24 * 365)) : 10;

  // Calculate compound growth data
  const generateChartData = () => {
    const years = Math.min(Math.max(targetYears, 10), 30); // Between 10-30 years
    const monthlyAmount = monthlySavings;
    const annualReturn = 0.12; // 12% annual return assumption
    const monthlyReturn = annualReturn / 12;

    const labels = [];
    const simpleData = [];
    const compoundData = [];

    for (let year = 0; year <= years; year++) {
      labels.push(year.toString());
      
      // Simple savings (no interest)
      const simpleSavings = monthlyAmount * 12 * year;
      simpleData.push(simpleSavings);
      
      // Compound growth calculation
      const months = year * 12;
      let compoundValue = 0;
      if (months > 0) {
        compoundValue = monthlyAmount * (((1 + monthlyReturn) ** months - 1) / monthlyReturn);
      }
      compoundData.push(compoundValue);
    }

    return {
      labels,
      datasets: [
        {
          label: 'Simple Savings (No Investment)',
          data: simpleData,
          borderColor: CHART_SKY_BLUE,
          backgroundColor: `${CHART_SKY_BLUE}20`,
          borderWidth: 3,
          fill: false,
          tension: 0.1
        },
        {
          label: 'Compound Growth (12% Annual Return)',
          data: compoundData,
          borderColor: CYBER_TEAL,
          backgroundColor: `${CYBER_TEAL}20`,
          borderWidth: 3,
          fill: false,
          tension: 0.1
        }
      ]
    };
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
        labels: {
          color: LIGHT_SLATE,
          font: {
            size: 14
          }
        }
      },
      title: {
        display: true,
        text: `Your Personalized Growth Projection (LKR ${monthlySavings.toLocaleString()}/month)`,
        color: LUMINOUS_ACCENT,
        font: {
          size: 16,
          weight: 'bold'
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
            return `${context.dataset.label}: LKR ${context.parsed.y.toLocaleString()}`;
          }
        }
      }
    },
    scales: {
      x: {
        title: {
          display: true,
          text: 'Years',
          color: LIGHT_SLATE
        },
        ticks: {
          color: LIGHT_SLATE
        },
        grid: {
          color: `${MID_SLATE}40`
        }
      },
      y: {
        title: {
          display: true,
          text: 'Amount (LKR)',
          color: LIGHT_SLATE
        },
        ticks: {
          color: LIGHT_SLATE,
          callback: function(value) {
            return 'LKR ' + value.toLocaleString();
          }
        },
        grid: {
          color: `${MID_SLATE}40`
        }
      }
    }
  };

  const completeSkill = () => {
    setSkillCompleted(true);
    setTimeout(() => {
      onComplete();
    }, 2000);
  };

  if (skillCompleted) {
    return (
      <div className="text-center">
        <div className="mb-6">
          <FaCheckCircle className="text-6xl mx-auto mb-4" style={{ color: VIBRANT_GREEN }} />
          <h3 className="text-2xl font-bold mb-2" style={{ color: VIBRANT_GREEN }}>
            Compounding Magic Mastered!
          </h3>
          <p style={{ color: LIGHT_SLATE }}>
            You understand the power of compound growth and time in investing.
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
            <FaMagic className="text-2xl" style={{ color: CYBER_TEAL }} />
          </div>
        </div>
        <h3 className="text-2xl font-bold mb-4" style={{ color: CYBER_TEAL }}>
          The Magic of Compounding
        </h3>
        <p className="text-lg" style={{ color: LIGHT_SLATE }}>
          Einstein called it "the eighth wonder of the world." Let's see how it works with YOUR numbers.
        </p>
      </div>

      {!showChart ? (
        <div>
          {/* Educational Content */}
          <div
            className="p-6 rounded-lg mb-6"
            style={{ backgroundColor: DEEP_SPACE_BLUE }}
          >
            <h4 className="text-xl font-semibold mb-4" style={{ color: LUMINOUS_ACCENT }}>
              What is Compound Growth?
            </h4>
            <div className="space-y-4 mb-6">
              <div className="flex items-start space-x-4">
                <div
                  className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0"
                  style={{ backgroundColor: CHART_SKY_BLUE, color: DEEP_SPACE_BLUE }}
                >
                  1
                </div>
                <div>
                  <h5 className="font-semibold mb-1" style={{ color: LIGHT_SLATE }}>
                    Your money earns returns
                  </h5>
                  <p className="text-sm" style={{ color: MID_SLATE }}>
                    When you invest, your money grows through returns (interest, dividends, capital gains)
                  </p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <div
                  className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0"
                  style={{ backgroundColor: CHART_PINK, color: DEEP_SPACE_BLUE }}
                >
                  2
                </div>
                <div>
                  <h5 className="font-semibold mb-1" style={{ color: LIGHT_SLATE }}>
                    Returns earn returns
                  </h5>
                  <p className="text-sm" style={{ color: MID_SLATE }}>
                    Those returns get reinvested and start earning their own returns
                  </p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <div
                  className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0"
                  style={{ backgroundColor: CHART_PURPLE, color: DEEP_SPACE_BLUE }}
                >
                  3
                </div>
                <div>
                  <h5 className="font-semibold mb-1" style={{ color: LIGHT_SLATE }}>
                    Time accelerates growth
                  </h5>
                  <p className="text-sm" style={{ color: MID_SLATE }}>
                    The longer you invest, the more dramatic the compounding effect becomes
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Personal Context */}
          <div
            className="p-6 rounded-lg mb-6"
            style={{ backgroundColor: `${CYBER_TEAL}10`, border: `2px solid ${CYBER_TEAL}` }}
          >
            <h4 className="text-lg font-semibold mb-4" style={{ color: CYBER_TEAL }}>
              Your Personal Scenario
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold mb-1" style={{ color: LIGHT_SLATE }}>
                  LKR {monthlySavings.toLocaleString()}
                </div>
                <div className="text-sm" style={{ color: MID_SLATE }}>Monthly Savings</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold mb-1" style={{ color: LIGHT_SLATE }}>
                  {targetYears} Years
                </div>
                <div className="text-sm" style={{ color: MID_SLATE }}>Time Horizon</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold mb-1" style={{ color: LIGHT_SLATE }}>
                  LKR {targetAmount.toLocaleString()}
                </div>
                <div className="text-sm" style={{ color: MID_SLATE }}>
                  {longTermGoal ? 'Your Goal' : 'Example Goal'}
                </div>
              </div>
            </div>
          </div>

          {/* Show Chart Button */}
          <div className="text-center">
            <button
              onClick={() => setShowChart(true)}
              className="px-8 py-4 rounded-lg font-bold text-lg transition-all duration-200 hover:scale-105 flex items-center space-x-3 mx-auto"
              style={{
                backgroundColor: CYBER_TEAL,
                color: DEEP_SPACE_BLUE,
                boxShadow: `0 4px 14px 0 ${CYBER_TEAL}40`
              }}
            >
              <FaRocket />
              <span>See Your Growth Potential</span>
            </button>
          </div>
        </div>
      ) : (
        <div>
          {/* Personalized Chart */}
          <div
            className="p-6 rounded-lg mb-6"
            style={{ backgroundColor: DEEP_SPACE_BLUE }}
          >
            <Line data={generateChartData()} options={chartOptions} />
          </div>

          {/* Key Insights */}
          <div
            className="p-6 rounded-lg mb-6"
            style={{ backgroundColor: `${VIBRANT_GREEN}10`, border: `2px solid ${VIBRANT_GREEN}` }}
          >
            <h4 className="text-lg font-semibold mb-4" style={{ color: VIBRANT_GREEN }}>
              Key Insights from Your Chart
            </h4>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <div
                  className="w-4 h-4 rounded-full"
                  style={{ backgroundColor: CHART_SKY_BLUE }}
                />
                <span style={{ color: LIGHT_SLATE }}>
                  Simple savings: LKR {(monthlySavings * 12 * targetYears).toLocaleString()} after {targetYears} years
                </span>
              </div>
              <div className="flex items-center space-x-3">
                <div
                  className="w-4 h-4 rounded-full"
                  style={{ backgroundColor: CYBER_TEAL }}
                />
                <span style={{ color: LIGHT_SLATE }}>
                  With 12% returns: Potentially much more through compound growth!
                </span>
              </div>
              <div className="mt-4 p-3 rounded-lg" style={{ backgroundColor: CORPORATE_NAVY }}>
                <p className="text-sm" style={{ color: MID_SLATE }}>
                  <strong>Remember:</strong> This assumes a 12% annual return, which is not guaranteed. 
                  Actual returns will vary, but the principle of compounding remains powerful over time.
                </p>
              </div>
            </div>
          </div>

          {/* Complete Skill Button */}
          <div className="text-center">
            <button
              onClick={completeSkill}
              className="px-8 py-4 rounded-lg font-bold text-lg transition-all duration-200 hover:scale-105"
              style={{
                backgroundColor: LUMINOUS_ACCENT,
                color: DEEP_SPACE_BLUE
              }}
            >
              I Understand Compounding!
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CompoundingSkill;
