import React, { useState } from 'react';
import { FaQuestionCircle, FaCheckCircle, FaChartBar } from 'react-icons/fa';
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

const QuestionnaireSkill = ({ setRiskScore, onComplete, isCompleted }) => {
  const [questionStep, setQuestionStep] = useState(1);
  const [answers, setAnswers] = useState({
    timeHorizon1: null, // When will you withdraw
    timeHorizon2: null, // How fast will you spend
    volatilityReaction: null, // Market drop reaction
    portfolioChoice: null // Portfolio preference
  });
  const [skillCompleted, setSkillCompleted] = useState(isCompleted);

  const portfolioOptions = [
    {
      id: 1,
      name: "Conservative",
      description: "Steady and stable growth",
      bestCase: "+8%",
      worstCase: "-2%",
      points: 5,
      color: CHART_SKY_BLUE
    },
    {
      id: 2,
      name: "Moderate Conservative",
      description: "Balanced with slight growth focus",
      bestCase: "+12%",
      worstCase: "-6%",
      points: 10,
      color: CHART_PURPLE
    },
    {
      id: 3,
      name: "Moderate",
      description: "Balanced risk and return",
      bestCase: "+16%",
      worstCase: "-12%",
      points: 15,
      color: CYBER_TEAL
    },
    {
      id: 4,
      name: "Moderate Aggressive",
      description: "Growth-focused with higher volatility",
      bestCase: "+22%",
      worstCase: "-18%",
      points: 20,
      color: CHART_PINK
    },
    {
      id: 5,
      name: "Aggressive",
      description: "Maximum growth potential",
      bestCase: "+28%",
      worstCase: "-25%",
      points: 25,
      color: LUMINOUS_ACCENT
    }
  ];

  const handleAnswer = (questionKey, value, points) => {
    setAnswers(prev => ({
      ...prev,
      [questionKey]: { value, points }
    }));
  };

  const calculateTotalScore = () => {
    const totalPoints = Object.values(answers).reduce((sum, answer) => {
      return sum + (answer ? answer.points : 0);
    }, 0);
    
    setRiskScore(totalPoints);
    setSkillCompleted(true);
    setTimeout(() => {
      onComplete();
    }, 1000);
  };

  const canProceedToNext = () => {
    switch (questionStep) {
      case 1:
        return answers.timeHorizon1 !== null;
      case 2:
        return answers.timeHorizon2 !== null;
      case 3:
        return answers.volatilityReaction !== null;
      case 4:
        return answers.portfolioChoice !== null;
      default:
        return false;
    }
  };

  if (skillCompleted) {
    return (
      <div className="text-center">
        <div className="mb-6">
          <FaCheckCircle className="text-6xl mx-auto mb-4" style={{ color: VIBRANT_GREEN }} />
          <h3 className="text-2xl font-bold mb-2" style={{ color: VIBRANT_GREEN }}>
            Assessment Complete!
          </h3>
          <p style={{ color: LIGHT_SLATE }}>
            Your responses have been analyzed. Let's reveal your investor profile!
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
            <FaQuestionCircle className="text-2xl" style={{ color: CYBER_TEAL }} />
          </div>
        </div>
        <h3 className="text-2xl font-bold mb-4" style={{ color: CYBER_TEAL }}>
          Investor Profile Assessment
        </h3>
        <p className="text-lg" style={{ color: LIGHT_SLATE }}>
          Answer a few questions to discover your personal investing style.
        </p>
        
        {/* Progress Indicator */}
        <div className="flex justify-center mt-6">
          <div className="flex space-x-2">
            {[1, 2, 3, 4].map((step) => (
              <div
                key={step}
                className="w-3 h-3 rounded-full"
                style={{
                  backgroundColor: step <= questionStep ? CYBER_TEAL : MID_SLATE
                }}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Question 1: Time Horizon - When will you withdraw */}
      {questionStep === 1 && (
        <div
          className="p-6 rounded-lg mb-6"
          style={{ backgroundColor: DEEP_SPACE_BLUE }}
        >
          <h4 className="text-xl font-semibold mb-4" style={{ color: LUMINOUS_ACCENT }}>
            Question 1: Investment Timeline
          </h4>
          <p className="text-lg mb-6" style={{ color: LIGHT_SLATE }}>
            When do you expect to start withdrawing money from your investments?
          </p>
          
          <div className="space-y-3">
            {[
              { text: "Within 2 years", points: 0 },
              { text: "2-5 years", points: 5 },
              { text: "5-10 years", points: 10 },
              { text: "More than 10 years", points: 15 }
            ].map((option, index) => (
              <button
                key={index}
                onClick={() => handleAnswer('timeHorizon1', option.text, option.points)}
                className="w-full p-4 rounded-lg border-2 text-left transition-all duration-200 hover:scale-105"
                style={{
                  backgroundColor: answers.timeHorizon1?.value === option.text ? `${CYBER_TEAL}20` : CORPORATE_NAVY,
                  borderColor: answers.timeHorizon1?.value === option.text ? CYBER_TEAL : MID_SLATE,
                  color: LIGHT_SLATE
                }}
              >
                {option.text}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Question 2: Time Horizon - How fast will you spend */}
      {questionStep === 2 && (
        <div
          className="p-6 rounded-lg mb-6"
          style={{ backgroundColor: DEEP_SPACE_BLUE }}
        >
          <h4 className="text-xl font-semibold mb-4" style={{ color: LUMINOUS_ACCENT }}>
            Question 2: Spending Pattern
          </h4>
          <p className="text-lg mb-6" style={{ color: LIGHT_SLATE }}>
            Once you start withdrawing, how quickly do you plan to spend your investments?
          </p>
          
          <div className="space-y-3">
            {[
              { text: "All within 2 years", points: 0 },
              { text: "Over 2-5 years", points: 5 },
              { text: "Over 5-10 years", points: 10 },
              { text: "Over more than 10 years", points: 15 }
            ].map((option, index) => (
              <button
                key={index}
                onClick={() => handleAnswer('timeHorizon2', option.text, option.points)}
                className="w-full p-4 rounded-lg border-2 text-left transition-all duration-200 hover:scale-105"
                style={{
                  backgroundColor: answers.timeHorizon2?.value === option.text ? `${CYBER_TEAL}20` : CORPORATE_NAVY,
                  borderColor: answers.timeHorizon2?.value === option.text ? CYBER_TEAL : MID_SLATE,
                  color: LIGHT_SLATE
                }}
              >
                {option.text}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Question 3: Volatility Reaction */}
      {questionStep === 3 && (
        <div
          className="p-6 rounded-lg mb-6"
          style={{ backgroundColor: DEEP_SPACE_BLUE }}
        >
          <h4 className="text-xl font-semibold mb-4" style={{ color: LUMINOUS_ACCENT }}>
            Question 3: Market Volatility
          </h4>
          <p className="text-lg mb-6" style={{ color: LIGHT_SLATE }}>
            The market drops 25% in a short period. Your immediate reaction would be to:
          </p>
          
          <div className="space-y-3">
            {[
              { text: "Sell everything to prevent further losses", points: 0 },
              { text: "Wait and see what happens", points: 10 },
              { text: "Buy more while prices are low", points: 20 }
            ].map((option, index) => (
              <button
                key={index}
                onClick={() => handleAnswer('volatilityReaction', option.text, option.points)}
                className="w-full p-4 rounded-lg border-2 text-left transition-all duration-200 hover:scale-105"
                style={{
                  backgroundColor: answers.volatilityReaction?.value === option.text ? `${CYBER_TEAL}20` : CORPORATE_NAVY,
                  borderColor: answers.volatilityReaction?.value === option.text ? CYBER_TEAL : MID_SLATE,
                  color: LIGHT_SLATE
                }}
              >
                {option.text}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Question 4: Portfolio Choice */}
      {questionStep === 4 && (
        <div
          className="p-6 rounded-lg mb-6"
          style={{ backgroundColor: DEEP_SPACE_BLUE }}
        >
          <h4 className="text-xl font-semibold mb-4" style={{ color: LUMINOUS_ACCENT }}>
            Question 4: Portfolio Preference
          </h4>
          <p className="text-lg mb-6" style={{ color: LIGHT_SLATE }}>
            Which portfolio would you be most comfortable with?
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {portfolioOptions.map((portfolio) => (
              <button
                key={portfolio.id}
                onClick={() => handleAnswer('portfolioChoice', portfolio.name, portfolio.points)}
                className="p-4 rounded-lg border-2 text-center transition-all duration-200 hover:scale-105"
                style={{
                  backgroundColor: answers.portfolioChoice?.value === portfolio.name ? `${portfolio.color}20` : CORPORATE_NAVY,
                  borderColor: answers.portfolioChoice?.value === portfolio.name ? portfolio.color : MID_SLATE,
                  color: LIGHT_SLATE
                }}
              >
                <div className="mb-2">
                  <FaChartBar className="text-2xl mx-auto" style={{ color: portfolio.color }} />
                </div>
                <h5 className="font-bold mb-2" style={{ color: portfolio.color }}>
                  {portfolio.name}
                </h5>
                <p className="text-sm mb-3" style={{ color: MID_SLATE }}>
                  {portfolio.description}
                </p>
                <div className="text-xs">
                  <div style={{ color: VIBRANT_GREEN }}>Best: {portfolio.bestCase}</div>
                  <div style={{ color: CHART_PINK }}>Worst: {portfolio.worstCase}</div>
                </div>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Navigation */}
      <div className="flex justify-between">
        <button
          onClick={() => setQuestionStep(Math.max(1, questionStep - 1))}
          disabled={questionStep === 1}
          className="px-6 py-3 rounded-lg font-medium transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          style={{
            backgroundColor: questionStep === 1 ? MID_SLATE : CORPORATE_NAVY,
            color: LIGHT_SLATE,
            border: `2px solid ${MID_SLATE}`
          }}
        >
          Previous
        </button>

        {questionStep < 4 ? (
          <button
            onClick={() => setQuestionStep(questionStep + 1)}
            disabled={!canProceedToNext()}
            className="px-6 py-3 rounded-lg font-bold transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            style={{
              backgroundColor: canProceedToNext() ? CYBER_TEAL : MID_SLATE,
              color: canProceedToNext() ? DEEP_SPACE_BLUE : LIGHT_SLATE
            }}
          >
            Next Question
          </button>
        ) : (
          <button
            onClick={calculateTotalScore}
            disabled={!canProceedToNext()}
            className="px-6 py-3 rounded-lg font-bold transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            style={{
              backgroundColor: canProceedToNext() ? LUMINOUS_ACCENT : MID_SLATE,
              color: canProceedToNext() ? DEEP_SPACE_BLUE : LIGHT_SLATE
            }}
          >
            Calculate My Profile
          </button>
        )}
      </div>
    </div>
  );
};

export default QuestionnaireSkill;
