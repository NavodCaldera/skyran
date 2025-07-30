import React, { useState } from 'react';
import { FaBalanceScale, FaCheckCircle, FaChartLine } from 'react-icons/fa';
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
  CHART_PINK
} from '../../constants';

const RiskUnderstandingSkill = ({ onComplete, isCompleted }) => {
  const [currentLesson, setCurrentLesson] = useState(1);
  const [riskReturnValue, setRiskReturnValue] = useState(5);
  const [quizCompleted, setQuizCompleted] = useState(isCompleted);
  const [quizAnswers, setQuizAnswers] = useState({
    'Savings Account': '',
    'Government Bonds': '',
    'Tech Stock': '',
    'Cryptocurrency': ''
  });

  const correctAnswers = {
    'Savings Account': 'Low',
    'Government Bonds': 'Low',
    'Tech Stock': 'High',
    'Cryptocurrency': 'High'
  };

  const handleQuizAnswer = (investment, riskLevel) => {
    setQuizAnswers(prev => ({
      ...prev,
      [investment]: riskLevel
    }));
  };

  const checkQuizAnswers = () => {
    const allAnswered = Object.values(quizAnswers).every(answer => answer !== '');
    const allCorrect = Object.entries(quizAnswers).every(
      ([investment, answer]) => answer === correctAnswers[investment]
    );
    
    if (allAnswered && allCorrect) {
      setQuizCompleted(true);
      setTimeout(() => {
        onComplete();
      }, 2000);
    }
  };

  if (quizCompleted) {
    return (
      <div className="text-center">
        <div className="mb-6">
          <FaCheckCircle className="text-6xl mx-auto mb-4" style={{ color: VIBRANT_GREEN }} />
          <h3 className="text-2xl font-bold mb-2" style={{ color: VIBRANT_GREEN }}>
            Risk Understanding Mastered!
          </h3>
          <p style={{ color: LIGHT_SLATE }}>
            You understand the relationship between risk and return in investing.
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
          Understanding Investment Risk
        </h3>
        <p className="text-lg" style={{ color: LIGHT_SLATE }}>
          Before we assess your risk tolerance, let's understand what risk really means in investing.
        </p>
      </div>

      {currentLesson === 1 && (
        <div>
          {/* Lesson 1: Volatility */}
          <div
            className="p-6 rounded-lg mb-6"
            style={{ backgroundColor: DEEP_SPACE_BLUE }}
          >
            <h4 className="text-xl font-semibold mb-4" style={{ color: LUMINOUS_ACCENT }}>
              Lesson 1: Volatility - The Ups and Downs
            </h4>
            
            {/* Visual Comparison */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              {/* Stable Investment */}
              <div className="text-center">
                <h5 className="font-semibold mb-4" style={{ color: CHART_SKY_BLUE }}>
                  Low Volatility (Stable)
                </h5>
                <div
                  className="p-4 rounded-lg mb-4"
                  style={{ backgroundColor: CORPORATE_NAVY }}
                >
                  <svg width="100%" height="80" viewBox="0 0 300 80">
                    <path
                      d="M 10 40 Q 75 35 150 40 Q 225 45 290 40"
                      stroke={CHART_SKY_BLUE}
                      strokeWidth="3"
                      fill="none"
                    />
                  </svg>
                </div>
                <p className="text-sm" style={{ color: MID_SLATE }}>
                  Small price movements, predictable returns
                </p>
              </div>

              {/* Volatile Investment */}
              <div className="text-center">
                <h5 className="font-semibold mb-4" style={{ color: CHART_PINK }}>
                  High Volatility (Erratic)
                </h5>
                <div
                  className="p-4 rounded-lg mb-4"
                  style={{ backgroundColor: CORPORATE_NAVY }}
                >
                  <svg width="100%" height="80" viewBox="0 0 300 80">
                    <path
                      d="M 10 40 L 30 20 L 50 60 L 70 15 L 90 55 L 110 25 L 130 65 L 150 30 L 170 50 L 190 10 L 210 70 L 230 35 L 250 15 L 270 60 L 290 40"
                      stroke={CHART_PINK}
                      strokeWidth="3"
                      fill="none"
                    />
                  </svg>
                </div>
                <p className="text-sm" style={{ color: MID_SLATE }}>
                  Large price swings, unpredictable short-term returns
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
                Continue to Risk/Return Trade-off
              </button>
            </div>
          </div>
        </div>
      )}

      {currentLesson === 2 && (
        <div>
          {/* Lesson 2: Risk/Return Trade-off */}
          <div
            className="p-6 rounded-lg mb-6"
            style={{ backgroundColor: DEEP_SPACE_BLUE }}
          >
            <h4 className="text-xl font-semibold mb-4" style={{ color: LUMINOUS_ACCENT }}>
              Lesson 2: The Risk/Return Trade-off
            </h4>
            
            <p className="text-lg mb-6" style={{ color: LIGHT_SLATE }}>
              In investing, higher potential returns usually come with higher risk. Use the slider below to see this relationship:
            </p>

            {/* Interactive Seesaw */}
            <div className="mb-6">
              <div className="flex items-center justify-center mb-4">
                <div className="relative w-80 h-40">
                  {/* Seesaw Base */}
                  <div
                    className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-4 h-16"
                    style={{ backgroundColor: MID_SLATE }}
                  />
                  
                  {/* Seesaw Plank */}
                  <div
                    className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-72 h-2 origin-center"
                    style={{
                      backgroundColor: CYBER_TEAL,
                      transform: `translate(-50%, -50%) rotate(${(riskReturnValue - 5) * 6}deg)`
                    }}
                  />
                  
                  {/* Risk Side */}
                  <div
                    className="absolute top-4 left-4 text-center"
                    style={{
                      transform: `translateY(${(10 - riskReturnValue) * 2}px)`,
                      color: CHART_PINK
                    }}
                  >
                    <div className="font-bold">RISK</div>
                    <div className="text-sm">{riskReturnValue}/10</div>
                  </div>
                  
                  {/* Return Side */}
                  <div
                    className="absolute top-4 right-4 text-center"
                    style={{
                      transform: `translateY(${(riskReturnValue - 1) * 2}px)`,
                      color: VIBRANT_GREEN
                    }}
                  >
                    <div className="font-bold">RETURN</div>
                    <div className="text-sm">{riskReturnValue}/10</div>
                  </div>
                </div>
              </div>

              {/* Slider */}
              <div className="flex items-center justify-center">
                <input
                  type="range"
                  min="1"
                  max="10"
                  value={riskReturnValue}
                  onChange={(e) => setRiskReturnValue(parseInt(e.target.value))}
                  className="w-64"
                  style={{ accentColor: CYBER_TEAL }}
                />
              </div>
              
              <div className="text-center mt-4">
                <p className="text-sm" style={{ color: MID_SLATE }}>
                  Move the slider to see how risk and return move together
                </p>
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
                Take the Quiz
              </button>
            </div>
          </div>
        </div>
      )}

      {currentLesson === 3 && (
        <div>
          {/* Quiz */}
          <div
            className="p-6 rounded-lg mb-6"
            style={{ backgroundColor: DEEP_SPACE_BLUE }}
          >
            <h4 className="text-xl font-semibold mb-4" style={{ color: LUMINOUS_ACCENT }}>
              Quiz: Match Investments to Risk Levels
            </h4>
            
            <p className="text-lg mb-6" style={{ color: LIGHT_SLATE }}>
              Click to match each investment type with its typical risk level:
            </p>

            <div className="space-y-4 mb-6">
              {Object.keys(correctAnswers).map((investment) => (
                <div
                  key={investment}
                  className="flex items-center justify-between p-4 rounded-lg border-2"
                  style={{
                    backgroundColor: CORPORATE_NAVY,
                    borderColor: quizAnswers[investment] ? CYBER_TEAL : MID_SLATE
                  }}
                >
                  <span className="font-medium" style={{ color: LIGHT_SLATE }}>
                    {investment}
                  </span>
                  <div className="flex space-x-2">
                    {['Low', 'High'].map((level) => (
                      <button
                        key={level}
                        onClick={() => handleQuizAnswer(investment, level)}
                        className="px-4 py-2 rounded-lg font-medium transition-all duration-200"
                        style={{
                          backgroundColor: quizAnswers[investment] === level ? CYBER_TEAL : `${MID_SLATE}40`,
                          color: quizAnswers[investment] === level ? DEEP_SPACE_BLUE : LIGHT_SLATE,
                          border: `2px solid ${quizAnswers[investment] === level ? CYBER_TEAL : MID_SLATE}`
                        }}
                      >
                        {level} Risk
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {Object.values(quizAnswers).every(answer => answer !== '') && (
              <div className="text-center">
                <button
                  onClick={checkQuizAnswers}
                  className="px-6 py-3 rounded-lg font-bold transition-all duration-200 hover:scale-105"
                  style={{
                    backgroundColor: LUMINOUS_ACCENT,
                    color: DEEP_SPACE_BLUE
                  }}
                >
                  Check My Answers
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default RiskUnderstandingSkill;
