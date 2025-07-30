import React from 'react';
import { FaCheckCircle, FaCircle, FaPlayCircle } from 'react-icons/fa';
import {
  DEEP_SPACE_BLUE,
  CORPORATE_NAVY,
  CYBER_TEAL,
  LUMINOUS_ACCENT,
  LIGHT_SLATE,
  MID_SLATE
} from '../../constants';

const ProgressBar = ({ skills, currentSkill, completedSkills, onSkillClick }) => {
  const getSkillStatus = (skillId) => {
    if (completedSkills.includes(skillId)) {
      return 'completed';
    } else if (skillId === currentSkill) {
      return 'current';
    } else if (skillId === Math.max(...completedSkills, 0) + 1) {
      return 'available';
    } else {
      return 'locked';
    }
  };

  const getSkillIcon = (skillId) => {
    const status = getSkillStatus(skillId);
    switch (status) {
      case 'completed':
        return <FaCheckCircle className="text-xl" style={{ color: CYBER_TEAL }} />;
      case 'current':
        return <FaPlayCircle className="text-xl" style={{ color: LUMINOUS_ACCENT }} />;
      case 'available':
        return <FaCircle className="text-xl" style={{ color: CYBER_TEAL }} />;
      default:
        return <FaCircle className="text-xl" style={{ color: MID_SLATE }} />;
    }
  };

  const getSkillStyles = (skillId) => {
    const status = getSkillStatus(skillId);
    const baseStyles = {
      transition: 'all 0.3s ease',
      cursor: status === 'locked' ? 'not-allowed' : 'pointer'
    };

    switch (status) {
      case 'completed':
        return {
          ...baseStyles,
          backgroundColor: `${CYBER_TEAL}20`,
          borderColor: CYBER_TEAL,
          color: LIGHT_SLATE
        };
      case 'current':
        return {
          ...baseStyles,
          backgroundColor: `${LUMINOUS_ACCENT}20`,
          borderColor: LUMINOUS_ACCENT,
          color: LIGHT_SLATE,
          boxShadow: `0 0 20px ${LUMINOUS_ACCENT}40`
        };
      case 'available':
        return {
          ...baseStyles,
          backgroundColor: DEEP_SPACE_BLUE,
          borderColor: CYBER_TEAL,
          color: LIGHT_SLATE
        };
      default:
        return {
          ...baseStyles,
          backgroundColor: DEEP_SPACE_BLUE,
          borderColor: MID_SLATE,
          color: MID_SLATE,
          opacity: 0.6
        };
    }
  };

  return (
    <div className="w-full">
      {/* Desktop Progress Bar */}
      <div className="hidden md:flex items-center justify-between">
        {skills.map((skill, index) => (
          <div key={skill.id} className="flex items-center flex-1">
            {/* Skill Node */}
            <div
              className="flex flex-col items-center cursor-pointer group"
              onClick={() => onSkillClick(skill.id)}
            >
              <div
                className="w-16 h-16 rounded-full border-2 flex items-center justify-center mb-2 group-hover:scale-110 transition-transform duration-200"
                style={getSkillStyles(skill.id)}
              >
                {getSkillIcon(skill.id)}
              </div>
              <span
                className="text-sm font-medium text-center max-w-20"
                style={{ color: getSkillStatus(skill.id) === 'locked' ? MID_SLATE : LIGHT_SLATE }}
              >
                {skill.name}
              </span>
            </div>

            {/* Connection Line */}
            {index < skills.length - 1 && (
              <div className="flex-1 mx-4">
                <div
                  className="h-1 rounded-full transition-all duration-500"
                  style={{
                    backgroundColor: completedSkills.includes(skill.id) ? CYBER_TEAL : MID_SLATE
                  }}
                />
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Mobile Progress Bar */}
      <div className="md:hidden">
        <div className="space-y-4">
          {skills.map((skill) => (
            <div
              key={skill.id}
              className="flex items-center p-3 rounded-lg border-2 cursor-pointer transition-all duration-200"
              style={getSkillStyles(skill.id)}
              onClick={() => onSkillClick(skill.id)}
            >
              <div className="mr-4">
                {getSkillIcon(skill.id)}
              </div>
              <div className="flex-1">
                <span className="font-medium">{skill.name}</span>
              </div>
              {getSkillStatus(skill.id) === 'current' && (
                <div
                  className="px-2 py-1 rounded-full text-xs font-bold"
                  style={{
                    backgroundColor: LUMINOUS_ACCENT,
                    color: DEEP_SPACE_BLUE
                  }}
                >
                  Current
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Progress Summary */}
      <div className="mt-6 text-center">
        <div
          className="inline-block px-4 py-2 rounded-full text-sm font-medium"
          style={{
            backgroundColor: `${CYBER_TEAL}20`,
            color: CYBER_TEAL
          }}
        >
          {completedSkills.length} of {skills.length} skills completed
        </div>
      </div>
    </div>
  );
};

export default ProgressBar;
