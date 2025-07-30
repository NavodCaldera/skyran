import React, { useState } from 'react';
import { FaBuilding, FaCheckCircle, FaHandHoldingUsd, FaUniversity, FaPiggyBank } from 'react-icons/fa';
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

const AssetClassesSkill = ({ onComplete, isCompleted }) => {
  const [currentLesson, setCurrentLesson] = useState(1);
  const [quizCompleted, setQuizCompleted] = useState(isCompleted);
  const [assignments, setAssignments] = useState({
    'Apple Inc. Share': '',
    'Government Bond': '',
    'Savings Account': '',
    'Corporate Bond': '',
    'Tesla Stock': '',
    'Money Market Fund': '',
    'Real Estate Stock': '',
    'Treasury Bill': ''
  });

  const correctAssignments = {
    'Apple Inc. Share': 'Equities',
    'Government Bond': 'Fixed Income',
    'Savings Account': 'Cash',
    'Corporate Bond': 'Fixed Income',
    'Tesla Stock': 'Equities',
    'Money Market Fund': 'Cash',
    'Real Estate Stock': 'Equities',
    'Treasury Bill': 'Fixed Income'
  };

  const assetClasses = [
    {
      name: 'Equities',
      color: CHART_PURPLE,
      icon: FaBuilding,
      description: 'Owning a piece of the pie',
      details: 'When you buy stocks, you become a part-owner of a company. You share in its profits and losses.'
    },
    {
      name: 'Fixed Income',
      color: CHART_SKY_BLUE,
      icon: FaUniversity,
      description: 'Lending for interest',
      details: 'Bonds are like IOUs. You lend money to companies or governments, and they pay you interest.'
    },
    {
      name: 'Cash',
      color: CHART_PINK,
      icon: FaPiggyBank,
      description: 'Safe and ready',
      details: 'Cash and cash equivalents provide safety and liquidity, but typically offer lower returns.'
    }
  ];

  const handleAssignment = (investment, assetClass) => {
    setAssignments(prev => ({
      ...prev,
      [investment]: assetClass === prev[investment] ? '' : assetClass
    }));
  };

  const checkQuizAnswers = () => {
    const allAssigned = Object.values(assignments).every(assignment => assignment !== '');
    const allCorrect = Object.entries(assignments).every(
      ([investment, assignment]) => assignment === correctAssignments[investment]
    );
    
    if (allAssigned && allCorrect) {
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
            Asset Classes Mastered!
          </h3>
          <p style={{ color: LIGHT_SLATE }}>
            You understand the three core building blocks of investing.
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
            <FaHandHoldingUsd className="text-2xl" style={{ color: CYBER_TEAL }} />
          </div>
        </div>
        <h3 className="text-2xl font-bold mb-4" style={{ color: CYBER_TEAL }}>
          The Building Blocks of Investing
        </h3>
        <p className="text-lg" style={{ color: LIGHT_SLATE }}>
          Every investment falls into one of three basic categories. Let's learn what they are!
        </p>
      </div>

      {currentLesson === 1 && (
        <div>
          {/* Asset Classes Overview */}
          <div
            className="p-6 rounded-lg mb-6"
            style={{ backgroundColor: DEEP_SPACE_BLUE }}
          >
            <h4 className="text-xl font-semibold mb-6" style={{ color: LUMINOUS_ACCENT }}>
              The Three Core Asset Classes
            </h4>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {assetClasses.map((assetClass, index) => {
                const IconComponent = assetClass.icon;
                return (
                  <div
                    key={index}
                    className="text-center p-6 rounded-lg border-2"
                    style={{
                      backgroundColor: `${assetClass.color}10`,
                      borderColor: assetClass.color
                    }}
                  >
                    <div className="flex justify-center mb-4">
                      <div
                        className="w-16 h-16 rounded-full flex items-center justify-center"
                        style={{ backgroundColor: `${assetClass.color}20` }}
                      >
                        <IconComponent className="text-2xl" style={{ color: assetClass.color }} />
                      </div>
                    </div>
                    <h5 className="text-xl font-bold mb-2" style={{ color: assetClass.color }}>
                      {assetClass.name}
                    </h5>
                    <p className="text-lg font-medium mb-3" style={{ color: LIGHT_SLATE }}>
                      {assetClass.description}
                    </p>
                    <p className="text-sm" style={{ color: MID_SLATE }}>
                      {assetClass.details}
                    </p>
                  </div>
                );
              })}
            </div>

            <div className="text-center mt-8">
              <button
                onClick={() => setCurrentLesson(2)}
                className="px-8 py-4 rounded-lg font-bold text-lg transition-all duration-200 hover:scale-105"
                style={{
                  backgroundColor: CYBER_TEAL,
                  color: DEEP_SPACE_BLUE,
                  boxShadow: `0 4px 14px 0 ${CYBER_TEAL}40`
                }}
              >
                Take the Asset Sorter Quiz
              </button>
            </div>
          </div>
        </div>
      )}

      {currentLesson === 2 && (
        <div>
          {/* Asset Sorter Quiz */}
          <div
            className="p-6 rounded-lg mb-6"
            style={{ backgroundColor: DEEP_SPACE_BLUE }}
          >
            <h4 className="text-xl font-semibold mb-4" style={{ color: LUMINOUS_ACCENT }}>
              Asset Sorter Quiz
            </h4>
            <p className="text-lg mb-6" style={{ color: LIGHT_SLATE }}>
              Click each investment to assign it to the correct asset class:
            </p>

            {/* Investment Items */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-8">
              {Object.keys(correctAssignments).map((investment) => (
                <div
                  key={investment}
                  className="p-3 rounded-lg border-2 text-center cursor-pointer transition-all duration-200 hover:scale-105"
                  style={{
                    backgroundColor: assignments[investment] ? 
                      `${assetClasses.find(ac => ac.name === assignments[investment])?.color}20` : 
                      CORPORATE_NAVY,
                    borderColor: assignments[investment] ? 
                      assetClasses.find(ac => ac.name === assignments[investment])?.color : 
                      MID_SLATE,
                    color: LIGHT_SLATE
                  }}
                  onClick={() => {
                    // Cycle through asset classes
                    const currentIndex = assetClasses.findIndex(ac => ac.name === assignments[investment]);
                    const nextIndex = (currentIndex + 1) % assetClasses.length;
                    const nextClass = currentIndex === -1 ? assetClasses[0].name : 
                                    currentIndex === assetClasses.length - 1 ? '' : assetClasses[nextIndex].name;
                    handleAssignment(investment, nextClass);
                  }}
                >
                  <div className="text-sm font-medium">{investment}</div>
                  {assignments[investment] && (
                    <div
                      className="text-xs mt-1 px-2 py-1 rounded-full inline-block"
                      style={{
                        backgroundColor: assetClasses.find(ac => ac.name === assignments[investment])?.color,
                        color: DEEP_SPACE_BLUE
                      }}
                    >
                      {assignments[investment]}
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Asset Class Buckets */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
              {assetClasses.map((assetClass) => (
                <div
                  key={assetClass.name}
                  className="p-4 rounded-lg border-2 min-h-32"
                  style={{
                    backgroundColor: `${assetClass.color}10`,
                    borderColor: assetClass.color
                  }}
                >
                  <h5 className="font-semibold mb-3 text-center" style={{ color: assetClass.color }}>
                    {assetClass.name}
                  </h5>
                  <div className="space-y-2">
                    {Object.entries(assignments)
                      .filter(([_, assignment]) => assignment === assetClass.name)
                      .map(([investment, _]) => (
                        <div
                          key={investment}
                          className="p-2 rounded text-sm text-center"
                          style={{ backgroundColor: CORPORATE_NAVY, color: LIGHT_SLATE }}
                        >
                          {investment}
                        </div>
                      ))}
                  </div>
                </div>
              ))}
            </div>

            {/* Check Answer Button */}
            {Object.values(assignments).every(assignment => assignment !== '') && (
              <div className="text-center">
                <button
                  onClick={checkQuizAnswers}
                  className="px-6 py-3 rounded-lg font-bold transition-all duration-200 hover:scale-105"
                  style={{
                    backgroundColor: LUMINOUS_ACCENT,
                    color: DEEP_SPACE_BLUE
                  }}
                >
                  Check My Sorting
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default AssetClassesSkill;
