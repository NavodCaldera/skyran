import React, { useState, useEffect, useRef } from 'react';
import {
  FaBook, FaSearch, FaDumbbell, FaTrophy, FaFlag, FaGem, FaUser, FaEllipsisH,
  FaHeart, FaFire, FaStar, FaCheckCircle, FaLock, FaTimes, FaCoins,
  FaCrown, FaChartLine, FaBullseye, FaGift, FaUniversity, FaBolt
} from 'react-icons/fa';
import {
  DEEP_SPACE_BLUE,
  CORPORATE_NAVY,
  CYBER_TEAL,
  LUMINOUS_ACCENT,
  LIGHT_SLATE,
  MID_SLATE,
  CHART_SKY_BLUE,
  CHART_PURPLE
} from '../constants';

// --- SIMPLIFIED WEALTHWISE CONFIGURATION ---
const SIDEBAR_WIDTH = '280px';
const NAVBAR_WIDTH = '240px';

// --- LESSON DATA STRUCTURE ---
const UNITS = [
  {
    id: 1,
    title: 'SECTION 1, UNIT 1',
    subtitle: 'Banking Basics',
    lessons: [
      { id: 1, title: 'What is a Savings Account?', xp: 10, status: 'current' },
      { id: 2, title: 'Understanding Interest', xp: 10, status: 'locked' },
      { id: 3, title: 'Current vs Savings', xp: 15, status: 'locked' },
      { id: 4, title: 'Banking Fees', xp: 10, status: 'locked' },
      { id: 5, title: 'Online Banking Safety', xp: 15, status: 'locked' },
      { id: 6, title: 'Unit 1 Challenge', xp: 25, status: 'locked', type: 'milestone' }
    ]
  },
  {
    id: 2,
    title: 'SECTION 1, UNIT 2',
    subtitle: 'Investment Fundamentals',
    lessons: [
      { id: 7, title: 'What is Investing?', xp: 10, status: 'locked' },
      { id: 8, title: 'Risk vs Return', xp: 15, status: 'locked' },
      { id: 9, title: 'Fixed Deposits', xp: 10, status: 'locked' },
      { id: 10, title: 'Unit Trust Basics', xp: 15, status: 'locked' },
      { id: 11, title: 'Investment Challenge', xp: 25, status: 'locked', type: 'milestone' }
    ]
  }
];

// --- EXERCISE DATA ---
const EXERCISE_DATA = {
  1: {
    type: 'fill_blank',
    instruction: 'Fill in the blanks',
    sentence: 'A savings account earns you ______.',
    options: ['interest', 'fees', 'cheques'],
    correct: 'interest',
    explanation: 'Savings accounts pay interest on your deposited money, helping it grow over time.'
  }
};

// --- SIMPLIFIED COMPONENT A: LEFT NAVBAR ---
const LeftNavbar = ({ activeTab = 'LEARN' }) => {
  const navItems = [
    { id: 'LEARN', label: 'LEARN', icon: FaBook },
    { id: 'GLOSSARY', label: 'GLOSSARY', icon: FaSearch },
    { id: 'PRACTICE', label: 'PRACTICE', icon: FaDumbbell },
    { id: 'LEADERBOARDS', label: 'LEADERBOARDS', icon: FaTrophy },
    { id: 'CHALLENGES', label: 'CHALLENGES', icon: FaFlag },
    { id: 'SHOP', label: 'SHOP', icon: FaGem },
    { id: 'PROFILE', label: 'PROFILE', icon: FaUser },
    { id: 'MORE', label: 'MORE', icon: FaEllipsisH }
  ];

  return (
    <div
      className="fixed left-0 top-0 h-full flex flex-col border-r"
      style={{
        width: NAVBAR_WIDTH,
        backgroundColor: CORPORATE_NAVY,
        borderColor: MID_SLATE,
        zIndex: 10,
        paddingTop: '1rem'
      }}
    >
      {/* Logo/Brand */}
      <div className="p-6 border-b" style={{ borderColor: MID_SLATE }}>
        <div className="flex items-center space-x-3">
          <div className="text-2xl">🧸</div>
          <div>
            <h1 className="text-xl font-bold" style={{ color: LUMINOUS_ACCENT }}>
              WealthWise
            </h1>
            <p className="text-xs" style={{ color: MID_SLATE }}>
              Financial Literacy
            </p>
          </div>
        </div>
      </div>

      {/* Navigation Items */}
      <nav className="flex-1 py-4">
        {navItems.map((item) => {
          const isActive = item.id === activeTab;
          const Icon = item.icon;

          return (
            <button
              key={item.id}
              className={`w-full flex items-center space-x-3 px-6 py-3 text-left transition-all duration-200 ${
                isActive ? 'border-r-4' : 'hover:bg-opacity-50'
              }`}
              style={{
                borderColor: isActive ? CYBER_TEAL : 'transparent',
                backgroundColor: isActive ? `${CYBER_TEAL}10` : 'transparent',
                color: isActive ? CYBER_TEAL : LIGHT_SLATE
              }}
              onMouseEnter={(e) => {
                if (!isActive) {
                  e.target.style.backgroundColor = `${CYBER_TEAL}05`;
                }
              }}
              onMouseLeave={(e) => {
                if (!isActive) {
                  e.target.style.backgroundColor = 'transparent';
                }
              }}
            >
              <Icon className="text-lg" />
              <span className="font-medium text-sm">{item.label}</span>
            </button>
          );
        })}
      </nav>

      {/* User Stats */}
      <div className="p-4 border-t" style={{ borderColor: MID_SLATE }}>
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center space-x-1">
            <FaFire style={{ color: CHART_SKY_BLUE }} />
            <span className="text-sm font-bold" style={{ color: CHART_SKY_BLUE }}>7</span>
          </div>
          <div className="flex items-center space-x-1">
            <FaGem style={{ color: CYBER_TEAL }} />
            <span className="text-sm font-bold" style={{ color: CYBER_TEAL }}>250</span>
          </div>
        </div>
        <div className="text-xs" style={{ color: MID_SLATE }}>
          Level 3 • 1,250 XP
        </div>
      </div>
    </div>
  );
};

// --- SIMPLIFIED COMPONENT C: RIGHT SIDEBAR (THE "ADVISOR'S DESK") ---
const RightSidebar = () => {
  return (
    <div
      className="fixed right-0 top-0 h-full overflow-y-auto border-l"
      style={{
        width: SIDEBAR_WIDTH,
        backgroundColor: CORPORATE_NAVY,
        borderColor: MID_SLATE,
        zIndex: 10,
        paddingTop: '1rem'
      }}
    >
      <div className="p-6 space-y-6">
        {/* Premium Offer Module */}
        <div
          className="rounded-lg p-6 border transition-all duration-200 hover:border-opacity-80"
          style={{
            backgroundColor: DEEP_SPACE_BLUE,
            borderColor: CYBER_TEAL
          }}
        >
          <div className="flex items-center space-x-2 mb-3">
            <FaCrown style={{ color: CHART_SKY_BLUE }} />
            <h3 className="font-bold text-lg" style={{ color: LUMINOUS_ACCENT }}>
              Unlock WealthWise Pro
            </h3>
          </div>
          <p className="text-sm mb-4" style={{ color: LIGHT_SLATE }}>
            No ads, unlimited hearts for practice, and advanced market insights.
          </p>
          <button
            className="w-full py-3 px-4 rounded-lg font-bold text-sm transition-all duration-200 hover:opacity-90"
            style={{
              backgroundColor: CYBER_TEAL,
              color: DEEP_SPACE_BLUE
            }}
          >
            TRY 2 WEEKS FREE
          </button>
        </div>

        {/* Gamification Unlock Module */}
        <div
          className="rounded-lg p-4 border"
          style={{
            backgroundColor: DEEP_SPACE_BLUE,
            borderColor: MID_SLATE
          }}
        >
          <div className="flex items-center space-x-3 mb-3">
            <FaTrophy className="text-xl" style={{ color: MID_SLATE }} />
            <div>
              <h4 className="font-bold" style={{ color: LIGHT_SLATE }}>
                Unlock Leaderboards!
              </h4>
              <p className="text-xs" style={{ color: MID_SLATE }}>
                Complete 3 more lessons to start competing
              </p>
            </div>
          </div>
          <div className="w-full rounded-full h-2" style={{ backgroundColor: MID_SLATE }}>
            <div
              className="h-2 rounded-full transition-all duration-500"
              style={{
                width: '33%',
                backgroundColor: CYBER_TEAL
              }}
            />
          </div>
        </div>

        {/* Daily Challenges Module */}
        <div
          className="rounded-lg p-4 border"
          style={{
            backgroundColor: DEEP_SPACE_BLUE,
            borderColor: MID_SLATE
          }}
        >
          <h4 className="font-bold mb-4 flex items-center space-x-2">
            <FaBullseye style={{ color: CYBER_TEAL }} />
            <span style={{ color: LIGHT_SLATE }}>Daily Challenges</span>
          </h4>

          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <FaBolt className="text-sm" style={{ color: CHART_SKY_BLUE }} />
                <span className="text-sm" style={{ color: LIGHT_SLATE }}>
                  Earn 20 Wisdom Points
                </span>
              </div>
              <span className="text-xs" style={{ color: CYBER_TEAL }}>15/20</span>
            </div>
            <div className="w-full rounded-full h-1" style={{ backgroundColor: MID_SLATE }}>
              <div
                className="h-1 rounded-full"
                style={{
                  width: '75%',
                  backgroundColor: CHART_SKY_BLUE
                }}
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <FaCheckCircle className="text-sm" style={{ color: CYBER_TEAL }} />
                <span className="text-sm" style={{ color: LIGHT_SLATE }}>
                  Complete lesson with 100% accuracy
                </span>
              </div>
              <FaCheckCircle className="text-sm" style={{ color: CYBER_TEAL }} />
            </div>
          </div>
        </div>

        {/* Friends Activity */}
        <div
          className="rounded-lg p-4 border"
          style={{
            backgroundColor: DEEP_SPACE_BLUE,
            borderColor: MID_SLATE
          }}
        >
          <h4 className="font-bold mb-3" style={{ color: LIGHT_SLATE }}>
            Friend Activity
          </h4>
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <div
                className="w-6 h-6 rounded-full flex items-center justify-center text-xs"
                style={{ backgroundColor: MID_SLATE, color: LIGHT_SLATE }}
              >
                A
              </div>
              <span className="text-xs" style={{ color: MID_SLATE }}>
                Amara completed "Banking Basics"
              </span>
            </div>
            <div className="flex items-center space-x-2">
              <div
                className="w-6 h-6 rounded-full flex items-center justify-center text-xs"
                style={{ backgroundColor: MID_SLATE, color: LIGHT_SLATE }}
              >
                K
              </div>
              <span className="text-xs" style={{ color: MID_SLATE }}>
                Kamal earned 50 XP today
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// --- SIMPLIFIED COMPONENT B: CENTER CONTENT AREA (THE "PATH TO PROSPERITY") ---
const LessonNode = ({ lesson, onClick, isCurrentLesson }) => {
  const getNodeStyle = () => {
    switch (lesson.status) {
      case 'current':
        return {
          backgroundColor: CYBER_TEAL,
          border: `4px solid ${CYBER_TEAL}`,
          boxShadow: `0 0 20px ${CYBER_TEAL}60`,
          transform: 'scale(1.1)'
        };
      case 'completed':
        return {
          backgroundColor: CHART_SKY_BLUE,
          border: `4px solid ${CHART_SKY_BLUE}`,
          color: DEEP_SPACE_BLUE
        };
      case 'locked':
      default:
        return {
          backgroundColor: MID_SLATE,
          border: `4px solid ${MID_SLATE}`,
          color: LIGHT_SLATE,
          opacity: 0.6
        };
    }
  };

  const getNodeIcon = () => {
    if (lesson.type === 'milestone') {
      return lesson.status === 'completed' ? '🏆' : '🏛️';
    }
    switch (lesson.status) {
      case 'current':
        return <FaStar className="text-white text-xl" />;
      case 'completed':
        return <FaCheckCircle className="text-black text-xl" />;
      case 'locked':
      default:
        return <FaLock className="text-gray-400 text-xl" />;
    }
  };

  return (
    <div className="relative flex flex-col items-center mb-8">
      {/* Lesson Node */}
      <button
        onClick={() => lesson.status === 'current' && onClick(lesson)}
        disabled={lesson.status === 'locked'}
        className={`w-20 h-20 rounded-full flex items-center justify-center transition-all duration-300 ${
          lesson.status === 'current' ? 'hover:scale-110 cursor-pointer animate-pulse' :
          lesson.status === 'completed' ? 'hover:scale-105 cursor-pointer' :
          lesson.status === 'locked' ? 'cursor-not-allowed' : 'cursor-default'
        }`}
        style={getNodeStyle()}
      >
        {getNodeIcon()}
      </button>

      {/* Mr. Fitzwilliam positioned next to current lesson */}
      {isCurrentLesson && (
        <div className="absolute -left-24 top-1/2 transform -translate-y-1/2">
          <div
            className="w-16 h-16 rounded-full flex items-center justify-center border-2"
            style={{
              backgroundColor: CORPORATE_NAVY,
              borderColor: CYBER_TEAL,
              boxShadow: `0 0 15px ${CYBER_TEAL}40`
            }}
          >
            <div className="text-2xl">🧸</div>
          </div>
          {/* Speech bubble */}
          <div
            className="absolute -top-12 left-1/2 transform -translate-x-1/2 px-3 py-1 rounded-lg text-xs whitespace-nowrap"
            style={{ backgroundColor: CORPORATE_NAVY, color: LIGHT_SLATE }}
          >
            Ready to learn?
            <div
              className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0"
              style={{
                borderLeft: '4px solid transparent',
                borderRight: '4px solid transparent',
                borderTop: `6px solid ${CORPORATE_NAVY}`
              }}
            />
          </div>
        </div>
      )}

      {/* Lesson Title */}
      <div className="mt-3 text-center max-w-24">
        <p className="text-xs font-medium" style={{ color: LIGHT_SLATE }}>
          {lesson.title}
        </p>
        <p className="text-xs" style={{ color: MID_SLATE }}>
          +{lesson.xp} XP
        </p>
      </div>

      {/* Connecting Line to Next Lesson */}
      <div
        className="w-1 h-8 mt-2"
        style={{ backgroundColor: lesson.status === 'completed' ? CYBER_TEAL : MID_SLATE }}
      />
    </div>
  );
};

const UnitHeader = ({ unit }) => (
  <div
    className="w-full p-6 rounded-lg mb-8 border-l-4"
    style={{
      backgroundColor: CYBER_TEAL,
      borderColor: CHART_SKY_BLUE,
      color: 'white'
    }}
  >
    <div className="flex items-center justify-between">
      <div>
        <h2 className="text-lg font-bold">{unit.title}</h2>
        <h3 className="text-xl font-bold">{unit.subtitle}</h3>
      </div>
      <button
        className="px-4 py-2 rounded-lg border-2 border-white bg-transparent hover:bg-white hover:text-cyan-600 transition-colors duration-200"
      >
        GUIDEBOOK
      </button>
    </div>
  </div>
);

const CenterContent = ({ onLessonClick }) => {
  return (
    <div
      className="flex-1 overflow-y-auto px-8 py-6"
      style={{
        marginLeft: NAVBAR_WIDTH,
        marginRight: SIDEBAR_WIDTH,
        backgroundColor: DEEP_SPACE_BLUE,
        minHeight: '100vh'
      }}
    >
      <div className="max-w-2xl mx-auto">
        {UNITS.map((unit) => (
          <div key={unit.id} className="mb-12">
            <UnitHeader unit={unit} />

            <div className="flex flex-col items-center">
              {unit.lessons.map((lesson) => (
                <LessonNode
                  key={lesson.id}
                  lesson={lesson}
                  onClick={onLessonClick}
                  isCurrentLesson={lesson.status === 'current'}
                />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// --- LESSON POPUP COMPONENT ---
const LessonPopup = ({ lesson, onStart, onClose }) => {
  if (!lesson) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div
        className="bg-white rounded-xl p-6 max-w-md w-full mx-4 text-center"
        style={{ backgroundColor: CORPORATE_NAVY }}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-white"
        >
          <FaTimes />
        </button>

        <div className="mb-4">
          <div
            className="w-16 h-16 rounded-full mx-auto mb-4 flex items-center justify-center"
            style={{ backgroundColor: CYBER_TEAL }}
          >
            <FaStar className="text-white text-2xl" />
          </div>
          <h2 className="text-xl font-bold mb-2" style={{ color: LIGHT_SLATE }}>
            {lesson.title}
          </h2>
          <p className="text-sm" style={{ color: MID_SLATE }}>
            Lesson {lesson.id} of 6
          </p>
        </div>

        <button
          onClick={() => onStart(lesson)}
          className="w-full py-4 rounded-lg font-bold text-lg transition-all duration-200 hover:scale-105"
          style={{
            backgroundColor: CYBER_TEAL,
            color: 'white',
            boxShadow: `0 4px 12px ${CYBER_TEAL}40`
          }}
        >
          START +{lesson.xp} XP
        </button>
      </div>
    </div>
  );
};

// --- SIMPLIFIED EXERCISE INTERFACE COMPONENT ---
const ExerciseInterface = ({ exercise, onComplete, onExit }) => {
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showResult, setShowResult] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [hearts, setHearts] = useState(5);

  const handleAnswerSelect = (answer) => {
    if (showResult) return;
    setSelectedAnswer(answer);
  };

  const handleCheck = () => {
    if (!selectedAnswer) return;

    const correct = selectedAnswer === exercise.correct;
    setIsCorrect(correct);
    setShowResult(true);

    if (!correct) {
      setHearts(prev => Math.max(0, prev - 1));
    }
  };

  const handleContinue = () => {
    if (isCorrect) {
      onComplete(true);
    } else {
      setShowResult(false);
      setSelectedAnswer(null);
    }
  };

  return (
    <div
      className="fixed inset-0 flex flex-col"
      style={{ backgroundColor: DEEP_SPACE_BLUE, zIndex: 100 }}
    >
      {/* Header */}
      <div
        className="flex items-center justify-between p-4 border-b"
        style={{ borderColor: MID_SLATE }}
      >
        <button
          onClick={onExit}
          className="text-gray-400 hover:text-white text-xl transition-colors duration-200"
        >
          <FaTimes />
        </button>

        <div className="flex-1 mx-8">
          <div
            className="w-full h-2 rounded-full"
            style={{ backgroundColor: MID_SLATE }}
          >
            <div
              className="h-2 rounded-full transition-all duration-500"
              style={{
                width: '20%',
                backgroundColor: CYBER_TEAL
              }}
            />
          </div>
        </div>

        <div className="flex items-center space-x-1">
          {[...Array(5)].map((_, i) => (
            <FaHeart
              key={i}
              className="text-lg"
              style={{
                color: i < hearts ? CHART_PURPLE : MID_SLATE
              }}
            />
          ))}
        </div>
      </div>

      {/* Content Area */}
      <div className="flex-1 flex flex-col items-center justify-center p-8">
        <div className="max-w-2xl w-full text-center">
          <h2 className="text-2xl font-bold mb-8" style={{ color: LIGHT_SLATE }}>
            {exercise.instruction}
          </h2>

          <div className="mb-12">
            <p className="text-xl mb-4" style={{ color: LIGHT_SLATE }}>
              {exercise.sentence.split('______').map((part, index, array) => (
                <span key={index}>
                  {part}
                  {index < array.length - 1 && (
                    <span
                      className="inline-block min-w-32 border-b-4 mx-2 py-1 px-2 transition-all duration-300"
                      style={{
                        borderColor: selectedAnswer ? CYBER_TEAL : MID_SLATE,
                        color: selectedAnswer ? CYBER_TEAL : MID_SLATE,
                        fontWeight: 'bold'
                      }}
                    >
                      {selectedAnswer || ''}
                    </span>
                  )}
                </span>
              ))}
            </p>
          </div>

          {/* Word Tiles */}
          <div className="flex justify-center space-x-4 mb-12">
            {exercise.options.map((option) => (
              <button
                key={option}
                onClick={() => handleAnswerSelect(option)}
                disabled={showResult}
                className={`px-6 py-3 rounded-lg border-2 transition-all duration-200 ${
                  selectedAnswer === option ? 'scale-105' : 'hover:scale-105'
                } ${showResult ? 'cursor-not-allowed' : 'cursor-pointer'}`}
                style={{
                  backgroundColor: selectedAnswer === option ? CYBER_TEAL : CORPORATE_NAVY,
                  borderColor: selectedAnswer === option ? CYBER_TEAL : MID_SLATE,
                  color: selectedAnswer === option ? DEEP_SPACE_BLUE : LIGHT_SLATE
                }}
              >
                {option}
              </button>
            ))}
          </div>

          {/* Result Feedback */}
          {showResult && (
            <div
              className="p-4 rounded-lg mb-8"
              style={{
                backgroundColor: isCorrect ? CYBER_TEAL : CHART_PURPLE,
                color: 'white'
              }}
            >
              <h3 className="font-bold text-lg mb-2">
                {isCorrect ? 'Correct!' : 'Incorrect'}
              </h3>
              <p>{exercise.explanation}</p>
            </div>
          )}
        </div>
      </div>

      {/* Footer */}
      <div
        className="flex items-center justify-between p-4 border-t"
        style={{ borderColor: MID_SLATE }}
      >
        <button
          className="px-6 py-3 rounded-lg opacity-50"
          disabled
          style={{ color: MID_SLATE }}
        >
          SKIP
        </button>

        <button
          onClick={showResult ? handleContinue : handleCheck}
          disabled={!selectedAnswer && !showResult}
          className={`px-8 py-3 rounded-lg font-bold transition-all duration-200 ${
            (!selectedAnswer && !showResult) ? 'opacity-50 cursor-not-allowed' : 'hover:opacity-90'
          }`}
          style={{
            backgroundColor: (!selectedAnswer && !showResult) ? MID_SLATE :
                           showResult ? (isCorrect ? CYBER_TEAL : CHART_PURPLE) : CYBER_TEAL,
            color: 'white'
          }}
        >
          {showResult ? 'CONTINUE' : 'CHECK'}
        </button>
      </div>
    </div>
  );
};

const ChoiceButton = ({ icon, title, description, onClick, isCorrect, isIncorrect, disabled }) => {
    const getButtonStyle = () => {
        if (isCorrect) return {
            backgroundColor: CYBER_TEAL,
            borderColor: CYBER_TEAL,
            boxShadow: `0 0 20px ${CYBER_TEAL}40`,
            transform: 'scale(1.05)'
        };
        if (isIncorrect) return {
            backgroundColor: CHART_PURPLE,
            borderColor: CHART_PURPLE,
            boxShadow: `0 0 20px ${CHART_PURPLE}40`,
            animation: 'shake 0.5s ease-in-out'
        };
        return {
            backgroundColor: CORPORATE_NAVY,
            borderColor: CYBER_TEAL,
            transform: 'scale(1)'
        };
    };

    return (
        <button
            onClick={onClick}
            disabled={disabled}
            className={`w-full p-6 rounded-lg border-2 transition-all duration-300 ${
                disabled ? 'cursor-not-allowed opacity-50' : 'hover:scale-105 cursor-pointer'
            }`}
            style={getButtonStyle()}
        >
            <div className="flex items-center space-x-4">
                <div className="text-4xl">{icon}</div>
                <div className="text-left flex-1">
                    <h3 className="font-bold text-lg" style={{ color: LIGHT_SLATE }}>
                        {title}
                    </h3>
                    <p className="text-sm" style={{ color: MID_SLATE }}>
                        {description}
                    </p>
                </div>
                {isCorrect && (
                    <FaCheckCircle className="text-2xl" style={{ color: 'white' }} />
                )}
            </div>
        </button>
    );
};

const LessonCompleteScreen = ({ xpEarned, totalXp, streak, onContinue }) => (
    <div className="text-center space-y-6">
        {/* Celebration Animation */}
        <div className="relative">
            <div className="text-8xl animate-bounce">🎉</div>
            {[...Array(12)].map((_, i) => (
                <div
                    key={i}
                    className="absolute animate-ping"
                    style={{
                        left: `${Math.random() * 100}%`,
                        top: `${Math.random() * 100}%`,
                        animationDelay: `${i * 100}ms`,
                        animationDuration: '2s'
                    }}
                >
                    <FaCoins style={{ color: CYBER_TEAL, fontSize: '1.5rem' }} />
                </div>
            ))}
        </div>

        <h1 className="text-4xl font-bold" style={{ color: LUMINOUS_ACCENT }}>
            SPLENDID WORK!
        </h1>

        {/* Rewards Summary */}
        <div
            className="p-6 rounded-lg"
            style={{ backgroundColor: CORPORATE_NAVY }}
        >
            <h3 className="text-xl font-bold mb-4" style={{ color: LIGHT_SLATE }}>
                Lesson Complete!
            </h3>

            <div className="space-y-3">
                <div className="flex justify-between items-center">
                    <span style={{ color: MID_SLATE }}>Wisdom Points Earned:</span>
                    <span className="font-bold text-xl" style={{ color: CYBER_TEAL }}>
                        +{xpEarned} XP
                    </span>
                </div>

                <div className="flex justify-between items-center">
                    <span style={{ color: MID_SLATE }}>Total XP:</span>
                    <span className="font-bold" style={{ color: LUMINOUS_ACCENT }}>
                        {totalXp} XP
                    </span>
                </div>

                <div className="flex justify-between items-center">
                    <span style={{ color: MID_SLATE }}>Streak:</span>
                    <div className="flex items-center space-x-1">
                        <FaFire style={{ color: CHART_SKY_BLUE }} />
                        <span className="font-bold" style={{ color: CHART_SKY_BLUE }}>
                            {streak} day{streak !== 1 ? 's' : ''}
                        </span>
                    </div>
                </div>
            </div>
        </div>

        <button
            onClick={onContinue}
            className="w-full py-4 px-8 rounded-lg font-bold text-lg transition-all duration-300 hover:scale-105"
            style={{
                backgroundColor: CYBER_TEAL,
                color: DEEP_SPACE_BLUE,
                boxShadow: `0 0 20px ${CYBER_TEAL}40`
            }}
        >
            Continue Your Journey
        </button>
    </div>
);

const TutorialStep = ({ title, children, showBorder = true }) => (
    <div
        className={`p-8 rounded-xl shadow-2xl mt-6 transition-all duration-300 ${showBorder ? 'border-2' : ''}`}
        style={{
            backgroundColor: CORPORATE_NAVY,
            borderColor: showBorder ? MID_SLATE : 'transparent'
        }}
    >
        <h2 className="text-3xl font-bold mb-4" style={{ color: LUMINOUS_ACCENT }}>{title}</h2>
        <div className="text-lg space-y-3" style={{ color: LIGHT_SLATE }}>
            {children}
        </div>
    </div>
);

const ConceptExplanation = ({ title, content, highlightedWord, definition, onContinue }) => (
    <div className="space-y-6">
        <h2 className="text-2xl font-bold text-center" style={{ color: LUMINOUS_ACCENT }}>
            {title}
        </h2>

        <div
            className="p-6 rounded-lg"
            style={{ backgroundColor: CORPORATE_NAVY }}
        >
            <p className="text-lg leading-relaxed" style={{ color: LIGHT_SLATE }}>
                {content.split(highlightedWord).map((part, index, array) => (
                    <span key={index}>
                        {part}
                        {index < array.length - 1 && (
                            <span
                                className="font-bold cursor-pointer hover:underline"
                                style={{ color: CYBER_TEAL }}
                                title={definition}
                            >
                                {highlightedWord}
                            </span>
                        )}
                    </span>
                ))}
            </p>

            {definition && (
                <div
                    className="mt-4 p-3 rounded border-l-4"
                    style={{
                        backgroundColor: DEEP_SPACE_BLUE,
                        borderColor: CYBER_TEAL
                    }}
                >
                    <p className="text-sm" style={{ color: MID_SLATE }}>
                        <strong style={{ color: CYBER_TEAL }}>{highlightedWord}:</strong> {definition}
                    </p>
                </div>
            )}
        </div>

        <button
            onClick={onContinue}
            className="w-full py-3 px-6 rounded-lg font-bold transition-all duration-300 hover:scale-105"
            style={{
                backgroundColor: CYBER_TEAL,
                color: DEEP_SPACE_BLUE
            }}
        >
            Continue
        </button>
    </div>
);

// --- MAIN WEALTHWISE COMPONENT ---
const WealthWise = () => {
    // --- STATE MANAGEMENT ---
    const [selectedLesson, setSelectedLesson] = useState(null);
    const [showLessonPopup, setShowLessonPopup] = useState(false);
    const [currentExercise, setCurrentExercise] = useState(null);
    const [showExercise, setShowExercise] = useState(false);

    // --- EVENT HANDLERS ---
    const handleLessonClick = (lesson) => {
        setSelectedLesson(lesson);
        setShowLessonPopup(true);
    };

    const handleStartLesson = (lesson) => {
        setShowLessonPopup(false);
        const exercise = EXERCISE_DATA[lesson.id];
        if (exercise) {
            setCurrentExercise(exercise);
            setShowExercise(true);
        }
    };

    const handleExerciseComplete = (success) => {
        if (success) {
            // Update lesson status, XP, etc.
            setShowExercise(false);
            setCurrentExercise(null);
            setSelectedLesson(null);
        }
    };

    const handleExerciseExit = () => {
        setShowExercise(false);
        setCurrentExercise(null);
        setSelectedLesson(null);
    };

    const handleCloseLessonPopup = () => {
        setShowLessonPopup(false);
        setSelectedLesson(null);
    };

    // --- RENDER LOGIC ---
    return (
        <div
            className="min-h-screen relative"
            style={{ backgroundColor: DEEP_SPACE_BLUE }}
        >
            {/* Left Navbar */}
            <LeftNavbar activeTab="LEARN" />

            {/* Center Content */}
            <CenterContent onLessonClick={handleLessonClick} />

            {/* Right Sidebar */}
            <RightSidebar />

            {/* Lesson Popup */}
            {showLessonPopup && (
                <LessonPopup
                    lesson={selectedLesson}
                    onStart={handleStartLesson}
                    onClose={handleCloseLessonPopup}
                />
            )}

            {/* Exercise Interface */}
            {showExercise && (
                <ExerciseInterface
                    exercise={currentExercise}
                    onComplete={handleExerciseComplete}
                    onExit={handleExerciseExit}
                />
            )}
        </div>
    );
};

export default WealthWise;

