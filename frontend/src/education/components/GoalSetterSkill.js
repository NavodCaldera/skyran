import React, { useState, useEffect } from 'react';
import { FaBullseye, FaCheckCircle, FaPlus, FaTrash } from 'react-icons/fa';
import {
  DEEP_SPACE_BLUE,
  CORPORATE_NAVY,
  CYBER_TEAL,
  LUMINOUS_ACCENT,
  LIGHT_SLATE,
  MID_SLATE,
  VIBRANT_GREEN,
  CHART_PURPLE,
  CHART_PINK,
  CHART_SKY_BLUE
} from '../../constants';

const GoalSetterSkill = ({ userData, setUserData, onComplete, isCompleted }) => {
  const [goals, setGoals] = useState(userData.goals || []);
  const [skillCompleted, setSkillCompleted] = useState(isCompleted);

  // Update userData when goals change
  useEffect(() => {
    setUserData(prev => ({
      ...prev,
      goals
    }));
  }, [goals, setUserData]);

  const addGoal = () => {
    const newGoal = {
      id: Date.now(),
      name: '',
      targetAmount: '',
      targetDate: '',
      priority: 'medium'
    };
    setGoals([...goals, newGoal]);
  };

  const removeGoal = (goalId) => {
    setGoals(goals.filter(goal => goal.id !== goalId));
  };

  const updateGoal = (goalId, field, value) => {
    setGoals(goals.map(goal => 
      goal.id === goalId ? { ...goal, [field]: value } : goal
    ));
  };

  const getTimeHorizon = (targetDate) => {
    if (!targetDate) return '';
    const today = new Date();
    const target = new Date(targetDate);
    const diffTime = target - today;
    const diffYears = diffTime / (1000 * 60 * 60 * 24 * 365);
    
    if (diffYears < 2) return 'Short-Term';
    if (diffYears <= 5) return 'Intermediate-Term';
    return 'Long-Term';
  };

  const getTimeHorizonColor = (horizon) => {
    switch (horizon) {
      case 'Short-Term': return CHART_SKY_BLUE;
      case 'Intermediate-Term': return CHART_PINK;
      case 'Long-Term': return CHART_PURPLE;
      default: return MID_SLATE;
    }
  };

  const formatCurrency = (value) => {
    const digits = value.replace(/\D/g, '');
    return digits.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  };

  const handleAmountChange = (goalId, value) => {
    const formatted = formatCurrency(value);
    updateGoal(goalId, 'targetAmount', formatted);
  };

  const completeSkill = () => {
    const hasValidGoals = goals.some(goal => 
      goal.name.trim() && goal.targetAmount.trim() && goal.targetDate.trim()
    );
    
    if (hasValidGoals) {
      setSkillCompleted(true);
      setTimeout(() => {
        onComplete();
      }, 2000);
    }
  };

  const canComplete = goals.some(goal => 
    goal.name.trim() && goal.targetAmount.trim() && goal.targetDate.trim()
  );

  if (skillCompleted) {
    return (
      <div className="text-center">
        <div className="mb-6">
          <FaCheckCircle className="text-6xl mx-auto mb-4" style={{ color: VIBRANT_GREEN }} />
          <h3 className="text-2xl font-bold mb-2" style={{ color: VIBRANT_GREEN }}>
            Goal Setter Mastered!
          </h3>
          <p style={{ color: LIGHT_SLATE }}>
            You've learned how to set SMART financial goals with proper time horizons.
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
            <FaBullseye className="text-2xl" style={{ color: CYBER_TEAL }} />
          </div>
        </div>
        <h3 className="text-2xl font-bold mb-4" style={{ color: CYBER_TEAL }}>
          Goal-Setter Workshop
        </h3>
        <p className="text-lg" style={{ color: LIGHT_SLATE }}>
          Clear goals are the foundation of successful investing. Let's define what you're working towards.
        </p>
      </div>

      {/* Educational Content */}
      <div
        className="p-6 rounded-lg mb-6"
        style={{ backgroundColor: DEEP_SPACE_BLUE }}
      >
        <h4 className="text-xl font-semibold mb-4" style={{ color: LUMINOUS_ACCENT }}>
          SMART Goals Framework
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
          <div className="text-center">
            <div
              className="w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-2"
              style={{ backgroundColor: CHART_SKY_BLUE }}
            >
              <span className="font-bold text-sm" style={{ color: DEEP_SPACE_BLUE }}>S</span>
            </div>
            <h5 className="font-semibold" style={{ color: LIGHT_SLATE }}>Specific</h5>
            <p className="text-sm" style={{ color: MID_SLATE }}>Clear and well-defined</p>
          </div>
          <div className="text-center">
            <div
              className="w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-2"
              style={{ backgroundColor: CHART_PINK }}
            >
              <span className="font-bold text-sm" style={{ color: DEEP_SPACE_BLUE }}>M</span>
            </div>
            <h5 className="font-semibold" style={{ color: LIGHT_SLATE }}>Measurable</h5>
            <p className="text-sm" style={{ color: MID_SLATE }}>Has a target amount</p>
          </div>
          <div className="text-center">
            <div
              className="w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-2"
              style={{ backgroundColor: CHART_PURPLE }}
            >
              <span className="font-bold text-sm" style={{ color: DEEP_SPACE_BLUE }}>T</span>
            </div>
            <h5 className="font-semibold" style={{ color: LIGHT_SLATE }}>Time-bound</h5>
            <p className="text-sm" style={{ color: MID_SLATE }}>Has a deadline</p>
          </div>
        </div>
      </div>

      {/* Goals List */}
      <div className="space-y-4 mb-6">
        {goals.map((goal) => (
          <div
            key={goal.id}
            className="p-6 rounded-lg border-2"
            style={{
              backgroundColor: CORPORATE_NAVY,
              borderColor: MID_SLATE
            }}
          >
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
              <div>
                <label className="block text-sm font-medium mb-2" style={{ color: LIGHT_SLATE }}>
                  Goal Name
                </label>
                <input
                  type="text"
                  value={goal.name}
                  onChange={(e) => updateGoal(goal.id, 'name', e.target.value)}
                  className="w-full p-3 rounded-lg border-2 focus:outline-none focus:ring-2 transition-all duration-200"
                  style={{
                    backgroundColor: DEEP_SPACE_BLUE,
                    borderColor: MID_SLATE,
                    color: LIGHT_SLATE
                  }}
                  placeholder="e.g., House down payment"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2" style={{ color: LIGHT_SLATE }}>
                  Target Amount (LKR)
                </label>
                <input
                  type="text"
                  value={goal.targetAmount}
                  onChange={(e) => handleAmountChange(goal.id, e.target.value)}
                  className="w-full p-3 rounded-lg border-2 focus:outline-none focus:ring-2 transition-all duration-200"
                  style={{
                    backgroundColor: DEEP_SPACE_BLUE,
                    borderColor: MID_SLATE,
                    color: LIGHT_SLATE
                  }}
                  placeholder="e.g., 5,000,000"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2" style={{ color: LIGHT_SLATE }}>
                  Target Date
                </label>
                <input
                  type="date"
                  value={goal.targetDate}
                  onChange={(e) => updateGoal(goal.id, 'targetDate', e.target.value)}
                  className="w-full p-3 rounded-lg border-2 focus:outline-none focus:ring-2 transition-all duration-200"
                  style={{
                    backgroundColor: DEEP_SPACE_BLUE,
                    borderColor: MID_SLATE,
                    color: LIGHT_SLATE
                  }}
                />
              </div>
            </div>

            <div className="flex items-center justify-between">
              {/* Time Horizon Badge */}
              {goal.targetDate && (
                <div
                  className="inline-block px-3 py-1 rounded-full text-xs font-bold"
                  style={{
                    backgroundColor: getTimeHorizonColor(getTimeHorizon(goal.targetDate)),
                    color: DEEP_SPACE_BLUE
                  }}
                >
                  {getTimeHorizon(goal.targetDate)}
                </div>
              )}
              
              {/* Remove Button */}
              <button
                type="button"
                onClick={() => removeGoal(goal.id)}
                className="text-sm px-3 py-1 rounded-lg transition-all duration-200 hover:opacity-80 flex items-center space-x-1"
                style={{
                  backgroundColor: CHART_SKY_BLUE,
                  color: DEEP_SPACE_BLUE
                }}
              >
                <FaTrash className="text-xs" />
                <span>Remove</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Add Goal Button */}
      <button
        type="button"
        onClick={addGoal}
        className="w-full p-4 rounded-lg border-2 border-dashed transition-all duration-200 hover:border-opacity-80 flex items-center justify-center space-x-2 mb-6"
        style={{
          borderColor: CYBER_TEAL,
          color: CYBER_TEAL
        }}
      >
        <FaPlus className="text-sm" />
        <span>Add New Goal</span>
      </button>

      {/* Complete Skill Button */}
      {canComplete && (
        <div className="text-center">
          <button
            onClick={completeSkill}
            className="px-8 py-4 rounded-lg font-bold text-lg transition-all duration-200 hover:scale-105"
            style={{
              backgroundColor: CYBER_TEAL,
              color: DEEP_SPACE_BLUE,
              boxShadow: `0 4px 14px 0 ${CYBER_TEAL}40`
            }}
          >
            Complete Goal Setting
          </button>
        </div>
      )}

      {/* Guidance Text */}
      {!canComplete && (
        <div className="text-center">
          <p className="text-sm" style={{ color: MID_SLATE }}>
            Add at least one complete goal (name, amount, and date) to continue.
          </p>
        </div>
      )}
    </div>
  );
};

export default GoalSetterSkill;
