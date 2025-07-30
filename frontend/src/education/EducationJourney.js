import React, { useState } from 'react';
import ModuleOne from './ModuleOne';
import ModuleTwo from './ModuleTwo';
import ModuleThree from './ModuleThree';
import ModuleFour from './ModuleFour';
import {
  DEEP_SPACE_BLUE,
  CORPORATE_NAVY,
  CYBER_TEAL,
  LUMINOUS_ACCENT,
  LIGHT_SLATE,
  MID_SLATE
} from '../constants';

const EducationJourney = () => {
  // Overall course state
  const [currentModule, setCurrentModule] = useState(1);
  const [userData, setUserData] = useState({
    monthlyIncome: '',
    monthlyExpenses: '',
    monthlySavings: 0,
    savingsRate: 0,
    goals: [],
    needsVsWantsScore: null
  });
  const [investorProfile, setInvestorProfile] = useState(null);

  const handleModuleComplete = (moduleNumber) => {
    if (moduleNumber < 4) {
      setCurrentModule(moduleNumber + 1);
    }
  };

  const renderCurrentModule = () => {
    switch (currentModule) {
      case 1:
        return (
          <ModuleOne
            userData={userData}
            setUserData={setUserData}
            onComplete={() => handleModuleComplete(1)}
          />
        );
      case 2:
        return (
          <ModuleTwo
            userData={userData}
            setUserData={setUserData}
            setInvestorProfile={setInvestorProfile}
            onComplete={() => handleModuleComplete(2)}
          />
        );
      case 3:
        return (
          <ModuleThree
            userData={userData}
            setUserData={setUserData}
            investorProfile={investorProfile}
            onComplete={() => handleModuleComplete(3)}
          />
        );
      case 4:
        return (
          <ModuleFour
            userData={userData}
            setUserData={setUserData}
            investorProfile={investorProfile}
            onComplete={() => handleModuleComplete(4)}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div
      className="min-h-screen"
      style={{ backgroundColor: DEEP_SPACE_BLUE }}
    >
      {/* Header */}
      <div className="py-8 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-8">
            <h1
              className="text-4xl font-bold mb-4"
              style={{ color: LUMINOUS_ACCENT }}
            >
              Capital Markets for Beginners
            </h1>
            <div className="flex justify-center items-center space-x-4">
              {[1, 2, 3, 4].map((moduleNum) => (
                <div key={moduleNum} className="flex items-center">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm ${
                      currentModule === moduleNum
                        ? 'ring-2 ring-offset-2'
                        : ''
                    }`}
                    style={{
                      backgroundColor: currentModule >= moduleNum ? CYBER_TEAL : MID_SLATE,
                      color: currentModule >= moduleNum ? DEEP_SPACE_BLUE : LIGHT_SLATE,
                      ringColor: CYBER_TEAL,
                      ringOffsetColor: DEEP_SPACE_BLUE
                    }}
                  >
                    {moduleNum}
                  </div>
                  {moduleNum < 4 && (
                    <div
                      className="w-8 h-1 mx-2"
                      style={{
                        backgroundColor: currentModule > moduleNum ? CYBER_TEAL : MID_SLATE
                      }}
                    />
                  )}
                </div>
              ))}
            </div>
            <div className="flex justify-center mt-4">
              <span className="text-sm" style={{ color: MID_SLATE }}>
                Module {currentModule} of 4
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Module Content */}
      <div className="px-6 pb-8">
        <div className="max-w-6xl mx-auto">
          {renderCurrentModule()}
        </div>
      </div>
    </div>
  );
};

export default EducationJourney;
