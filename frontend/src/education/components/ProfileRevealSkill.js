import React, { useState, useEffect } from 'react';
import { FaTrophy, FaCheckCircle, FaUser, FaShieldAlt, FaRocket } from 'react-icons/fa';
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

const ProfileRevealSkill = ({ riskScore, setInvestorProfile, onComplete, isCompleted }) => {
  const [isCalculating, setIsCalculating] = useState(true);
  const [showProfile, setShowProfile] = useState(false);
  const [quizAnswer, setQuizAnswer] = useState('');
  const [skillCompleted, setSkillCompleted] = useState(isCompleted);

  const getInvestorProfile = (score) => {
    if (score <= 15) {
      return {
        type: "Conservative",
        icon: FaShieldAlt,
        color: CHART_SKY_BLUE,
        description: "You prefer stability and capital preservation over high returns. You're comfortable with lower, more predictable returns and want to minimize the risk of losing money.",
        characteristics: [
          "Prioritizes capital preservation",
          "Comfortable with steady, modest returns",
          "Prefers low-volatility investments",
          "Values financial security above growth"
        ],
        quizQuestion: "Conservative investors typically prefer:",
        quizOptions: [
          "High-risk, high-reward investments",
          "Stable, low-risk investments with modest returns",
          "Speculative trading strategies"
        ],
        correctAnswer: "Stable, low-risk investments with modest returns"
      };
    } else if (score <= 35) {
      return {
        type: "Moderate",
        icon: FaUser,
        color: CHART_PURPLE,
        description: "You seek a balance between growth and stability. You're willing to accept some volatility in exchange for potentially higher returns than conservative investments.",
        characteristics: [
          "Balances growth and stability",
          "Accepts moderate volatility for better returns",
          "Diversifies across asset classes",
          "Has a medium-term investment horizon"
        ],
        quizQuestion: "Moderate investors typically:",
        quizOptions: [
          "Only invest in savings accounts",
          "Balance risk and return across different investments",
          "Put everything in high-risk stocks"
        ],
        correctAnswer: "Balance risk and return across different investments"
      };
    } else {
      return {
        type: "Aggressive",
        icon: FaRocket,
        color: CHART_PINK,
        description: "You're focused on long-term growth and willing to accept significant volatility. You understand that higher potential returns come with higher risk of losses.",
        characteristics: [
          "Focuses on long-term growth potential",
          "Comfortable with high volatility",
          "Willing to accept significant short-term losses",
          "Has a long investment time horizon"
        ],
        quizQuestion: "Aggressive investors are typically:",
        quizOptions: [
          "Risk-averse and prefer guaranteed returns",
          "Willing to accept high volatility for growth potential",
          "Only interested in short-term gains"
        ],
        correctAnswer: "Willing to accept high volatility for growth potential"
      };
    }
  };

  const profile = getInvestorProfile(riskScore || 20);

  useEffect(() => {
    if (riskScore !== null && !showProfile) {
      // Simulate calculation time
      const timer = setTimeout(() => {
        setIsCalculating(false);
        setShowProfile(true);
        // Save the profile to parent state
        setInvestorProfile(profile.type);
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [riskScore, showProfile, setInvestorProfile, profile.type]);

  const handleQuizSubmit = () => {
    if (quizAnswer === profile.correctAnswer) {
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
            Profile Understanding Complete!
          </h3>
          <p style={{ color: LIGHT_SLATE }}>
            You understand your investor profile and what it means for your investment strategy.
          </p>
        </div>
      </div>
    );
  }

  if (isCalculating) {
    return (
      <div className="text-center">
        <div className="mb-8">
          <div
            className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 animate-pulse"
            style={{ backgroundColor: `${CYBER_TEAL}20`, border: `3px solid ${CYBER_TEAL}` }}
          >
            <div
              className="w-12 h-12 rounded-full animate-spin border-4 border-transparent"
              style={{ borderTopColor: CYBER_TEAL }}
            />
          </div>
          <h3 className="text-2xl font-bold mb-4" style={{ color: CYBER_TEAL }}>
            Calculating Your Profile...
          </h3>
          <p className="text-lg" style={{ color: LIGHT_SLATE }}>
            Analyzing your responses to determine your investor personality
          </p>
        </div>

        {/* Calculation Steps */}
        <div
          className="p-6 rounded-lg max-w-md mx-auto"
          style={{ backgroundColor: DEEP_SPACE_BLUE }}
        >
          <div className="space-y-3 text-sm" style={{ color: MID_SLATE }}>
            <div className="flex items-center">
              <div
                className="w-4 h-4 rounded-full mr-3 animate-pulse"
                style={{ backgroundColor: CYBER_TEAL }}
              />
              Evaluating time horizon preferences...
            </div>
            <div className="flex items-center">
              <div
                className="w-4 h-4 rounded-full mr-3 animate-pulse"
                style={{ backgroundColor: CYBER_TEAL, animationDelay: '0.5s' }}
              />
              Analyzing risk tolerance responses...
            </div>
            <div className="flex items-center">
              <div
                className="w-4 h-4 rounded-full mr-3 animate-pulse"
                style={{ backgroundColor: CYBER_TEAL, animationDelay: '1s' }}
              />
              Determining optimal investor profile...
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (showProfile && !skillCompleted) {
    const ProfileIcon = profile.icon;
    
    return (
      <div>
        {/* Profile Reveal */}
        <div className="text-center mb-8">
          <div className="mb-6">
            <FaTrophy className="text-6xl mx-auto mb-4" style={{ color: LUMINOUS_ACCENT }} />
            <h3 className="text-3xl font-bold mb-4" style={{ color: LUMINOUS_ACCENT }}>
              Congratulations!
            </h3>
            <div
              className="inline-block px-6 py-3 rounded-full text-2xl font-bold mb-4"
              style={{
                backgroundColor: `${profile.color}20`,
                color: profile.color,
                border: `2px solid ${profile.color}`
              }}
            >
              You are a {profile.type} Investor
            </div>
          </div>

          {/* Profile Icon */}
          <div className="flex justify-center mb-6">
            <div
              className="w-24 h-24 rounded-full flex items-center justify-center"
              style={{ backgroundColor: `${profile.color}20`, border: `3px solid ${profile.color}` }}
            >
              <ProfileIcon className="text-4xl" style={{ color: profile.color }} />
            </div>
          </div>
        </div>

        {/* Profile Description */}
        <div
          className="p-6 rounded-lg mb-6"
          style={{ backgroundColor: DEEP_SPACE_BLUE }}
        >
          <h4 className="text-xl font-semibold mb-4" style={{ color: profile.color }}>
            Your Investor Profile
          </h4>
          <p className="text-lg mb-6" style={{ color: LIGHT_SLATE }}>
            {profile.description}
          </p>

          <h5 className="text-lg font-semibold mb-4" style={{ color: LUMINOUS_ACCENT }}>
            Key Characteristics:
          </h5>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {profile.characteristics.map((characteristic, index) => (
              <div key={index} className="flex items-center">
                <div
                  className="w-2 h-2 rounded-full mr-3"
                  style={{ backgroundColor: profile.color }}
                />
                <span style={{ color: LIGHT_SLATE }}>{characteristic}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Score Display */}
        <div
          className="p-4 rounded-lg mb-6 text-center"
          style={{ backgroundColor: `${profile.color}10`, border: `2px solid ${profile.color}` }}
        >
          <h5 className="font-semibold mb-2" style={{ color: profile.color }}>
            Your Risk Score: {riskScore}/60
          </h5>
          <div className="w-full bg-gray-700 rounded-full h-3">
            <div
              className="h-3 rounded-full transition-all duration-1000"
              style={{
                width: `${(riskScore / 60) * 100}%`,
                backgroundColor: profile.color
              }}
            />
          </div>
        </div>

        {/* Understanding Quiz */}
        <div
          className="p-6 rounded-lg mb-6"
          style={{ backgroundColor: DEEP_SPACE_BLUE }}
        >
          <h4 className="text-xl font-semibold mb-4" style={{ color: LUMINOUS_ACCENT }}>
            Quick Understanding Check
          </h4>
          <p className="text-lg mb-4" style={{ color: LIGHT_SLATE }}>
            {profile.quizQuestion}
          </p>

          <div className="space-y-3">
            {profile.quizOptions.map((option, index) => (
              <button
                key={index}
                onClick={() => setQuizAnswer(option)}
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
            <div className="text-center mt-6">
              <button
                onClick={handleQuizSubmit}
                className="px-6 py-3 rounded-lg font-bold transition-all duration-200 hover:scale-105"
                style={{
                  backgroundColor: quizAnswer === profile.correctAnswer ? VIBRANT_GREEN : CHART_PINK,
                  color: DEEP_SPACE_BLUE
                }}
              >
                {quizAnswer === profile.correctAnswer ? 'Correct! Complete Module' : 'Try Again'}
              </button>
            </div>
          )}
        </div>
      </div>
    );
  }

  return null;
};

export default ProfileRevealSkill;
