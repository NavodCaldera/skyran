import React, { useState, useEffect } from 'react';
import { FaFileAlt, FaCheckCircle, FaEdit, FaSave } from 'react-icons/fa';
import {
  DEEP_SPACE_BLUE,
  CORPORATE_NAVY,
  CYBER_TEAL,
  LUMINOUS_ACCENT,
  LIGHT_SLATE,
  MID_SLATE,
  VIBRANT_GREEN
} from '../../constants';

const IPSSkill = ({ userData, investorProfile, setIpsText, onComplete, isCompleted }) => {
  const [currentLesson, setCurrentLesson] = useState(1);
  const [userName, setUserName] = useState('');
  const [ipsContent, setIpsContent] = useState('');
  const [skillCompleted, setSkillCompleted] = useState(isCompleted);

  // Get portfolio allocation based on investor profile
  const getPortfolioAllocation = (profile) => {
    const allocations = {
      Conservative: { stocks: 20, bonds: 70, cash: 10 },
      Moderate: { stocks: 55, bonds: 35, cash: 10 },
      Aggressive: { stocks: 80, bonds: 15, cash: 5 }
    };
    return allocations[profile] || allocations.Moderate;
  };

  // Get primary goal from userData
  const getPrimaryGoal = () => {
    if (userData.goals && userData.goals.length > 0) {
      const goalWithAmount = userData.goals.find(goal => goal.name && goal.targetAmount);
      return goalWithAmount || userData.goals[0];
    }
    return { name: 'financial independence', targetAmount: '10,000,000' };
  };

  // Generate IPS template
  const generateIPSTemplate = () => {
    const primaryGoal = getPrimaryGoal();
    const allocation = getPortfolioAllocation(investorProfile);
    
    return `Investment Policy Statement for: ${userName || '[Your Name]'}

1. **Objective:** My primary long-term financial goal is to fund my '${primaryGoal.name}' with a target of LKR ${primaryGoal.targetAmount}.

2. **Risk Profile:** My assessment has identified me as a '${investorProfile || 'Moderate'}' investor. I am comfortable with ${investorProfile === 'Conservative' ? 'minimal' : investorProfile === 'Aggressive' ? 'significant' : 'moderate'} market fluctuations in pursuit of long-term growth.

3. **Strategy:** My investment strategy will be to maintain a diversified portfolio aligned with my risk profile. A sample allocation is approximately ${allocation.stocks}% Stocks, ${allocation.bonds}% Bonds, ${allocation.cash}% Cash.

4. **Review:** This plan will be reviewed annually or after any significant life event.

5. **Implementation:** I will start by investing LKR ${userData.monthlySavings ? userData.monthlySavings.toLocaleString() : '50,000'} monthly through systematic investment plans in diversified mutual funds or ETFs.

6. **Emergency Fund:** I will maintain ${allocation.cash}% of my portfolio in liquid cash equivalents for emergencies and opportunities.`;
  };

  // Update IPS content when user data changes
  useEffect(() => {
    if (currentLesson === 2) {
      setIpsContent(generateIPSTemplate());
    }
  }, [userName, userData, investorProfile, currentLesson]);

  const handleSaveBlueprint = () => {
    setIpsText(ipsContent);
    setSkillCompleted(true);
    setTimeout(() => {
      onComplete();
    }, 1000);
  };

  if (skillCompleted) {
    return (
      <div className="text-center">
        <div className="mb-6">
          <FaCheckCircle className="text-6xl mx-auto mb-4" style={{ color: VIBRANT_GREEN }} />
          <h3 className="text-2xl font-bold mb-2" style={{ color: VIBRANT_GREEN }}>
            Investment Policy Statement Created!
          </h3>
          <p style={{ color: LIGHT_SLATE }}>
            You've created your personal investment rulebook to guide your decisions.
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
            <FaFileAlt className="text-2xl" style={{ color: CYBER_TEAL }} />
          </div>
        </div>
        <h3 className="text-2xl font-bold mb-4" style={{ color: CYBER_TEAL }}>
          Your Investment Rulebook
        </h3>
        <p className="text-lg" style={{ color: LIGHT_SLATE }}>
          Create a personalized Investment Policy Statement to guide your investment decisions.
        </p>
      </div>

      {currentLesson === 1 && (
        <div>
          {/* What is an IPS */}
          <div
            className="p-6 rounded-lg mb-6"
            style={{ backgroundColor: DEEP_SPACE_BLUE }}
          >
            <h4 className="text-xl font-semibold mb-4" style={{ color: LUMINOUS_ACCENT }}>
              What is an Investment Policy Statement?
            </h4>
            
            <div className="space-y-4 mb-6">
              <div className="flex items-start space-x-4">
                <div
                  className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0"
                  style={{ backgroundColor: CYBER_TEAL, color: DEEP_SPACE_BLUE }}
                >
                  1
                </div>
                <div>
                  <h5 className="font-semibold mb-1" style={{ color: LIGHT_SLATE }}>
                    Your Investment Constitution
                  </h5>
                  <p className="text-sm" style={{ color: MID_SLATE }}>
                    An IPS is a written document that outlines your investment goals, risk tolerance, and strategy. It serves as your personal rulebook.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div
                  className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0"
                  style={{ backgroundColor: CYBER_TEAL, color: DEEP_SPACE_BLUE }}
                >
                  2
                </div>
                <div>
                  <h5 className="font-semibold mb-1" style={{ color: LIGHT_SLATE }}>
                    Prevents Emotional Decisions
                  </h5>
                  <p className="text-sm" style={{ color: MID_SLATE }}>
                    When markets get volatile, your IPS reminds you of your long-term plan and prevents panic buying or selling.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div
                  className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0"
                  style={{ backgroundColor: CYBER_TEAL, color: DEEP_SPACE_BLUE }}
                >
                  3
                </div>
                <div>
                  <h5 className="font-semibold mb-1" style={{ color: LIGHT_SLATE }}>
                    Guides Your Decisions
                  </h5>
                  <p className="text-sm" style={{ color: MID_SLATE }}>
                    Every investment decision can be evaluated against your IPS to ensure it aligns with your goals and strategy.
                  </p>
                </div>
              </div>
            </div>

            <div
              className="p-4 rounded-lg mb-6"
              style={{ backgroundColor: CORPORATE_NAVY }}
            >
              <p className="text-center font-medium" style={{ color: LIGHT_SLATE }}>
                "An Investment Policy Statement is like a GPS for your financial journey - it keeps you on track even when the road gets bumpy."
              </p>
            </div>

            <div className="text-center">
              <button
                onClick={() => setCurrentLesson(2)}
                className="px-8 py-4 rounded-lg font-bold text-lg transition-all duration-200 hover:scale-105"
                style={{
                  backgroundColor: CYBER_TEAL,
                  color: DEEP_SPACE_BLUE,
                  boxShadow: `0 4px 14px 0 ${CYBER_TEAL}40`
                }}
              >
                Create My First IPS
              </button>
            </div>
          </div>
        </div>
      )}

      {currentLesson === 2 && (
        <div>
          {/* IPS Workshop */}
          <div
            className="p-6 rounded-lg mb-6"
            style={{ backgroundColor: DEEP_SPACE_BLUE }}
          >
            <h4 className="text-xl font-semibold mb-4" style={{ color: LUMINOUS_ACCENT }}>
              Create My First IPS
            </h4>
            
            <p className="text-lg mb-6" style={{ color: LIGHT_SLATE }}>
              Below is your personalized Investment Policy Statement, pre-filled with your data from the previous modules. 
              You can edit it to make it truly yours:
            </p>

            {/* Name Input */}
            <div className="mb-6">
              <label className="block text-sm font-medium mb-2" style={{ color: LIGHT_SLATE }}>
                Your Name
              </label>
              <input
                type="text"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                className="w-full p-3 rounded-lg border-2 focus:outline-none focus:ring-2 transition-all duration-200"
                style={{
                  backgroundColor: CORPORATE_NAVY,
                  borderColor: MID_SLATE,
                  color: LIGHT_SLATE
                }}
                placeholder="Enter your name"
              />
            </div>

            {/* IPS Content */}
            <div className="mb-6">
              <div className="flex items-center mb-3">
                <FaEdit className="mr-2" style={{ color: CYBER_TEAL }} />
                <label className="text-sm font-medium" style={{ color: LIGHT_SLATE }}>
                  Your Investment Policy Statement
                </label>
              </div>
              <textarea
                value={ipsContent}
                onChange={(e) => setIpsContent(e.target.value)}
                rows={12}
                className="w-full p-4 rounded-lg border-2 focus:outline-none focus:ring-2 transition-all duration-200 font-mono text-sm"
                style={{
                  backgroundColor: CORPORATE_NAVY,
                  borderColor: MID_SLATE,
                  color: LIGHT_SLATE,
                  lineHeight: '1.6'
                }}
              />
            </div>

            <div className="text-center">
              <button
                onClick={handleSaveBlueprint}
                disabled={!ipsContent.trim() || !userName.trim()}
                className="px-8 py-4 rounded-lg font-bold text-lg transition-all duration-200 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-3 mx-auto"
                style={{
                  backgroundColor: ipsContent.trim() && userName.trim() ? VIBRANT_GREEN : MID_SLATE,
                  color: DEEP_SPACE_BLUE
                }}
              >
                <FaSave />
                <span>Save My Blueprint</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default IPSSkill;
