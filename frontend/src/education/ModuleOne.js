import React, { useState } from 'react';
import ProgressBar from './components/ProgressBar';
import FinancialCompassSkill from './components/FinancialCompassSkill';
import CashFlowSkill from './components/CashFlowSkill';
import GoalSetterSkill from './components/GoalSetterSkill';
import CompoundingSkill from './components/CompoundingSkill';
import {
  DEEP_SPACE_BLUE,
  CORPORATE_NAVY,
  CYBER_TEAL,
  LUMINOUS_ACCENT,
  LIGHT_SLATE,
  MID_SLATE
} from '../constants';

const ModuleOne = ({ userData, setUserData, onComplete }) => {
  const [currentSkill, setCurrentSkill] = useState(1);
  const [completedSkills, setCompletedSkills] = useState([]);

  const skills = [
    { id: 1, name: 'Financial Compass', component: FinancialCompassSkill },
    { id: 2, name: 'Cash Flow', component: CashFlowSkill },
    { id: 3, name: 'Goal Setter', component: GoalSetterSkill },
    { id: 4, name: 'Compounding Magic', component: CompoundingSkill }
  ];

  const handleSkillComplete = (skillId) => {
    if (!completedSkills.includes(skillId)) {
      const newCompletedSkills = [...completedSkills, skillId];
      setCompletedSkills(newCompletedSkills);
      
      // Move to next skill or complete module
      if (skillId < 4) {
        setCurrentSkill(skillId + 1);
      } else {
        // All skills completed, complete the module
        onComplete();
      }
    }
  };

  const handleSkillNavigation = (skillId) => {
    // Only allow navigation to completed skills or the next skill
    if (completedSkills.includes(skillId) || skillId === Math.max(...completedSkills, 0) + 1) {
      setCurrentSkill(skillId);
    }
  };

  const renderCurrentSkill = () => {
    const currentSkillData = skills.find(skill => skill.id === currentSkill);
    if (!currentSkillData) return null;

    const SkillComponent = currentSkillData.component;
    return (
      <SkillComponent
        userData={userData}
        setUserData={setUserData}
        onComplete={() => handleSkillComplete(currentSkill)}
        isCompleted={completedSkills.includes(currentSkill)}
      />
    );
  };

  return (
    <div>
      {/* Module Header */}
      <div
        className="rounded-2xl p-6 mb-8"
        style={{ backgroundColor: CORPORATE_NAVY }}
      >
        <h2
          className="text-3xl font-bold text-center mb-4"
          style={{ color: CYBER_TEAL }}
        >
          Module 1: The Foundation
        </h2>
        <p
          className="text-lg text-center mb-6"
          style={{ color: LIGHT_SLATE }}
        >
          Why Should I Invest? Let's build your financial foundation step by step.
        </p>

        {/* Progress Bar */}
        <ProgressBar
          skills={skills}
          currentSkill={currentSkill}
          completedSkills={completedSkills}
          onSkillClick={handleSkillNavigation}
        />
      </div>

      {/* Current Skill Content */}
      <div
        className="rounded-2xl p-8"
        style={{ backgroundColor: CORPORATE_NAVY }}
      >
        {renderCurrentSkill()}
      </div>

      {/* Navigation Buttons */}
      <div className="flex justify-between mt-8">
        <button
          onClick={() => setCurrentSkill(Math.max(1, currentSkill - 1))}
          disabled={currentSkill === 1}
          className="px-6 py-3 rounded-lg font-medium transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          style={{
            backgroundColor: currentSkill === 1 ? MID_SLATE : CORPORATE_NAVY,
            color: LIGHT_SLATE,
            border: `2px solid ${MID_SLATE}`
          }}
        >
          Previous Skill
        </button>

        <button
          onClick={() => {
            if (currentSkill < 4 && completedSkills.includes(currentSkill)) {
              setCurrentSkill(currentSkill + 1);
            }
          }}
          disabled={currentSkill === 4 || !completedSkills.includes(currentSkill)}
          className="px-6 py-3 rounded-lg font-bold transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          style={{
            backgroundColor: (currentSkill === 4 || !completedSkills.includes(currentSkill)) ? MID_SLATE : CYBER_TEAL,
            color: (currentSkill === 4 || !completedSkills.includes(currentSkill)) ? LIGHT_SLATE : DEEP_SPACE_BLUE
          }}
        >
          {currentSkill === 4 ? 'Module Complete!' : 'Next Skill'}
        </button>
      </div>
    </div>
  );
};

export default ModuleOne;
