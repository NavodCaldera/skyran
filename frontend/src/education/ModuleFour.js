import React, { useState } from 'react';
import ProgressBar from './components/ProgressBar';
import IPSSkill from './components/IPSSkill';
import RebalancingSkill from './components/RebalancingSkill';
import CapstoneSummary from './components/CapstoneSummary';
import {
  DEEP_SPACE_BLUE,
  CORPORATE_NAVY,
  CYBER_TEAL,
  LUMINOUS_ACCENT,
  LIGHT_SLATE,
  MID_SLATE
} from '../constants';

const ModuleFour = ({ userData, setUserData, investorProfile, onComplete }) => {
  const [currentSkill, setCurrentSkill] = useState(1);
  const [completedSkills, setCompletedSkills] = useState([]);
  const [ipsText, setIpsText] = useState('');

  const skills = [
    { id: 1, name: 'Investment Policy', component: IPSSkill },
    { id: 2, name: 'Rebalancing', component: RebalancingSkill },
    { id: 3, name: 'Your Blueprint', component: CapstoneSummary }
  ];

  const handleSkillComplete = (skillId) => {
    if (!completedSkills.includes(skillId)) {
      const newCompletedSkills = [...completedSkills, skillId];
      setCompletedSkills(newCompletedSkills);
      
      // Move to next skill or complete module
      if (skillId < 3) {
        setCurrentSkill(skillId + 1);
      } else {
        // All skills completed, complete the entire journey
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
    
    // Pass different props based on the skill
    const commonProps = {
      onComplete: () => handleSkillComplete(currentSkill),
      isCompleted: completedSkills.includes(currentSkill)
    };

    if (currentSkill === 1) {
      // IPSSkill needs userData, investorProfile, and setIpsText
      return (
        <SkillComponent
          {...commonProps}
          userData={userData}
          investorProfile={investorProfile}
          setIpsText={setIpsText}
        />
      );
    } else if (currentSkill === 2) {
      // RebalancingSkill needs investorProfile
      return (
        <SkillComponent
          {...commonProps}
          investorProfile={investorProfile}
        />
      );
    } else if (currentSkill === 3) {
      // CapstoneSummary needs all data
      return (
        <SkillComponent
          {...commonProps}
          userData={userData}
          investorProfile={investorProfile}
          ipsText={ipsText}
        />
      );
    } else {
      return <SkillComponent {...commonProps} />;
    }
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
          Module 4: The Blueprint
        </h2>
        <p
          className="text-lg text-center mb-6"
          style={{ color: LIGHT_SLATE }}
        >
          How Do I Build My Plan? Create your personalized Investment Policy Statement and learn portfolio maintenance.
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
            if (currentSkill < 3 && completedSkills.includes(currentSkill)) {
              setCurrentSkill(currentSkill + 1);
            }
          }}
          disabled={currentSkill === 3 || !completedSkills.includes(currentSkill)}
          className="px-6 py-3 rounded-lg font-bold transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          style={{
            backgroundColor: (currentSkill === 3 || !completedSkills.includes(currentSkill)) ? MID_SLATE : CYBER_TEAL,
            color: (currentSkill === 3 || !completedSkills.includes(currentSkill)) ? LIGHT_SLATE : DEEP_SPACE_BLUE
          }}
        >
          {currentSkill === 3 ? 'Journey Complete!' : 'Next Skill'}
        </button>
      </div>
    </div>
  );
};

export default ModuleFour;
