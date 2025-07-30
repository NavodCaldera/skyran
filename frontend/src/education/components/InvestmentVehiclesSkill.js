import React, { useState } from 'react';
import { FaShoppingCart, FaCheckCircle, FaExchangeAlt, FaCog, FaMoneyBillWave } from 'react-icons/fa';
import {
  DEEP_SPACE_BLUE,
  CORPORATE_NAVY,
  CYBER_TEAL,
  LUMINOUS_ACCENT,
  LIGHT_SLATE,
  MID_SLATE,
  VIBRANT_GREEN,
  CHART_SKY_BLUE,
  CHART_PINK
} from '../../constants';

const InvestmentVehiclesSkill = ({ onComplete, isCompleted }) => {
  const [currentLesson, setCurrentLesson] = useState(1);
  const [quizAnswer, setQuizAnswer] = useState('');
  const [skillCompleted, setSkillCompleted] = useState(isCompleted);

  const vehicleComparison = [
    {
      feature: 'How they are traded',
      mutualFund: 'Once per day after market close',
      etf: 'Throughout the trading day like stocks',
      icon: FaExchangeAlt
    },
    {
      feature: 'Management style',
      mutualFund: 'Often actively managed by fund managers',
      etf: 'Usually passively tracks an index',
      icon: FaCog
    },
    {
      feature: 'Typical fees',
      mutualFund: 'Higher fees (0.5% - 2.0% annually)',
      etf: 'Lower fees (0.03% - 0.75% annually)',
      icon: FaMoneyBillWave
    }
  ];

  const scenarios = [
    {
      question: "Aisha wants to invest in a basket of tech stocks and wants the lowest possible fees. Which vehicle is likely better for her?",
      options: ["Mutual Fund", "ETF", "Both are the same"],
      correct: "ETF",
      explanation: "ETFs typically have lower fees than mutual funds, making them better for cost-conscious investors."
    },
    {
      question: "Raj wants to buy and sell his investment multiple times during the day based on market movements. Which vehicle allows this?",
      options: ["Mutual Fund", "ETF", "Neither"],
      correct: "ETF",
      explanation: "ETFs trade throughout the day like stocks, while mutual funds only trade once per day after market close."
    },
    {
      question: "Maria prefers having professional fund managers actively pick stocks for her portfolio. Which vehicle typically offers this?",
      options: ["Mutual Fund", "ETF", "Both equally"],
      correct: "Mutual Fund",
      explanation: "Mutual funds are more commonly actively managed by professional fund managers, while ETFs usually passively track indexes."
    }
  ];

  const [currentScenario, setCurrentScenario] = useState(0);

  const handleQuizAnswer = (answer) => {
    setQuizAnswer(answer);
  };

  const checkAnswer = () => {
    if (quizAnswer === scenarios[currentScenario].correct) {
      if (currentScenario < scenarios.length - 1) {
        // Move to next scenario
        setTimeout(() => {
          setCurrentScenario(currentScenario + 1);
          setQuizAnswer('');
        }, 2000);
      } else {
        // All scenarios completed
        setSkillCompleted(true);
        setTimeout(() => {
          onComplete();
        }, 2000);
      }
    }
  };

  if (skillCompleted) {
    return (
      <div className="text-center">
        <div className="mb-6">
          <FaCheckCircle className="text-6xl mx-auto mb-4" style={{ color: VIBRANT_GREEN }} />
          <h3 className="text-2xl font-bold mb-2" style={{ color: VIBRANT_GREEN }}>
            Investment Vehicles Mastered!
          </h3>
          <p style={{ color: LIGHT_SLATE }}>
            You understand the key differences between mutual funds and ETFs.
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
            <FaShoppingCart className="text-2xl" style={{ color: CYBER_TEAL }} />
          </div>
        </div>
        <h3 className="text-2xl font-bold mb-4" style={{ color: CYBER_TEAL }}>
          Investment Vehicles: Your Shopping Baskets
        </h3>
        <p className="text-lg" style={{ color: LIGHT_SLATE }}>
          Learn about the two most popular ways to buy a diversified basket of investments.
        </p>
      </div>

      {currentLesson === 1 && (
        <div>
          {/* Introduction */}
          <div
            className="p-6 rounded-lg mb-6"
            style={{ backgroundColor: DEEP_SPACE_BLUE }}
          >
            <h4 className="text-xl font-semibold mb-4" style={{ color: LUMINOUS_ACCENT }}>
              What are Investment Vehicles?
            </h4>
            <p className="text-lg mb-6" style={{ color: LIGHT_SLATE }}>
              Think of investment vehicles as shopping baskets. Instead of buying individual stocks one by one, 
              you can buy a "basket" that contains many different investments. The two most popular baskets are:
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              {/* Mutual Funds */}
              <div
                className="p-6 rounded-lg border-2 text-center"
                style={{
                  backgroundColor: `${CHART_SKY_BLUE}10`,
                  borderColor: CHART_SKY_BLUE
                }}
              >
                <h5 className="text-xl font-bold mb-3" style={{ color: CHART_SKY_BLUE }}>
                  Mutual Funds
                </h5>
                <p className="text-sm" style={{ color: LIGHT_SLATE }}>
                  A pool of money from many investors, managed by professionals who decide what to buy and sell.
                </p>
              </div>

              {/* ETFs */}
              <div
                className="p-6 rounded-lg border-2 text-center"
                style={{
                  backgroundColor: `${CHART_PINK}10`,
                  borderColor: CHART_PINK
                }}
              >
                <h5 className="text-xl font-bold mb-3" style={{ color: CHART_PINK }}>
                  ETFs (Exchange-Traded Funds)
                </h5>
                <p className="text-sm" style={{ color: LIGHT_SLATE }}>
                  A basket that tracks a specific index or group of investments, traded like individual stocks.
                </p>
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
                Compare Mutual Funds vs ETFs
              </button>
            </div>
          </div>
        </div>
      )}

      {currentLesson === 2 && (
        <div>
          {/* Comparison Table */}
          <div
            className="p-6 rounded-lg mb-6"
            style={{ backgroundColor: DEEP_SPACE_BLUE }}
          >
            <h4 className="text-xl font-semibold mb-6" style={{ color: LUMINOUS_ACCENT }}>
              Mutual Funds vs ETFs: Key Differences
            </h4>

            <div className="space-y-6">
              {vehicleComparison.map((comparison, index) => {
                const IconComponent = comparison.icon;
                return (
                  <div
                    key={index}
                    className="p-4 rounded-lg border-2"
                    style={{
                      backgroundColor: CORPORATE_NAVY,
                      borderColor: MID_SLATE
                    }}
                  >
                    <div className="flex items-center mb-4">
                      <IconComponent className="text-xl mr-3" style={{ color: CYBER_TEAL }} />
                      <h5 className="text-lg font-semibold" style={{ color: LUMINOUS_ACCENT }}>
                        {comparison.feature}
                      </h5>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div
                        className="p-3 rounded-lg"
                        style={{ backgroundColor: `${CHART_SKY_BLUE}10` }}
                      >
                        <h6 className="font-semibold mb-2" style={{ color: CHART_SKY_BLUE }}>
                          Mutual Funds
                        </h6>
                        <p className="text-sm" style={{ color: LIGHT_SLATE }}>
                          {comparison.mutualFund}
                        </p>
                      </div>
                      
                      <div
                        className="p-3 rounded-lg"
                        style={{ backgroundColor: `${CHART_PINK}10` }}
                      >
                        <h6 className="font-semibold mb-2" style={{ color: CHART_PINK }}>
                          ETFs
                        </h6>
                        <p className="text-sm" style={{ color: LIGHT_SLATE }}>
                          {comparison.etf}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="text-center mt-8">
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
            </div>
          </div>
        </div>
      )}

      {currentLesson === 3 && (
        <div>
          {/* Scenario Quiz */}
          <div
            className="p-6 rounded-lg mb-6"
            style={{ backgroundColor: DEEP_SPACE_BLUE }}
          >
            <h4 className="text-xl font-semibold mb-4" style={{ color: LUMINOUS_ACCENT }}>
              Scenario {currentScenario + 1} of {scenarios.length}
            </h4>
            
            <div
              className="p-4 rounded-lg mb-6"
              style={{ backgroundColor: CORPORATE_NAVY }}
            >
              <p className="text-lg" style={{ color: LIGHT_SLATE }}>
                {scenarios[currentScenario].question}
              </p>
            </div>

            <div className="space-y-3 mb-6">
              {scenarios[currentScenario].options.map((option, index) => (
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
                    backgroundColor: quizAnswer === scenarios[currentScenario].correct ? VIBRANT_GREEN : CHART_PINK,
                    color: DEEP_SPACE_BLUE
                  }}
                >
                  {quizAnswer === scenarios[currentScenario].correct ? 'Correct!' : 'Try Again'}
                </button>
                
                {quizAnswer === scenarios[currentScenario].correct && (
                  <div
                    className="mt-4 p-3 rounded-lg"
                    style={{ backgroundColor: `${VIBRANT_GREEN}20`, border: `1px solid ${VIBRANT_GREEN}` }}
                  >
                    <p className="text-sm" style={{ color: LIGHT_SLATE }}>
                      {scenarios[currentScenario].explanation}
                    </p>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default InvestmentVehiclesSkill;
