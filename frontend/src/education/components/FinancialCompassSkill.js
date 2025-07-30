import React, { useState } from 'react';
import { FaCompass, FaCheckCircle, FaArrowUp, FaArrowDown } from 'react-icons/fa';
import {
  DEEP_SPACE_BLUE,
  CORPORATE_NAVY,
  CYBER_TEAL,
  LUMINOUS_ACCENT,
  LIGHT_SLATE,
  MID_SLATE,
  VIBRANT_GREEN,
  ERROR_RED
} from '../../constants';

const FinancialCompassSkill = ({ onComplete, isCompleted }) => {
  const [showQuiz, setShowQuiz] = useState(false);
  const [quizCompleted, setQuizCompleted] = useState(isCompleted);
  const [showResult, setShowResult] = useState(false);

  // The correct order of the 6-step financial planning process
  const correctOrder = [
    'Establish the relationship',
    'Gather data and determine goals',
    'Analyze current situation',
    'Develop recommendations',
    'Implement the plan',
    'Monitor and review'
  ];

  // Shuffled steps for the quiz
  const [steps, setSteps] = useState([
    { id: '1', content: 'Implement the plan' },
    { id: '2', content: 'Gather data and determine goals' },
    { id: '3', content: 'Monitor and review' },
    { id: '4', content: 'Establish the relationship' },
    { id: '5', content: 'Develop recommendations' },
    { id: '6', content: 'Analyze current situation' }
  ]);

  const moveStep = (index, direction) => {
    const newSteps = [...steps];
    const targetIndex = direction === 'up' ? index - 1 : index + 1;

    if (targetIndex >= 0 && targetIndex < newSteps.length) {
      [newSteps[index], newSteps[targetIndex]] = [newSteps[targetIndex], newSteps[index]];
      setSteps(newSteps);
    }
  };

  const checkAnswer = () => {
    const userOrder = steps.map(step => step.content);
    const isCorrect = JSON.stringify(userOrder) === JSON.stringify(correctOrder);
    
    if (isCorrect) {
      setQuizCompleted(true);
      setShowResult(true);
      setTimeout(() => {
        onComplete();
      }, 2000);
    } else {
      setShowResult(true);
      setTimeout(() => {
        setShowResult(false);
      }, 3000);
    }
  };

  if (quizCompleted) {
    return (
      <div className="text-center">
        <div className="mb-6">
          <FaCheckCircle className="text-6xl mx-auto mb-4" style={{ color: VIBRANT_GREEN }} />
          <h3 className="text-2xl font-bold mb-2" style={{ color: VIBRANT_GREEN }}>
            Financial Compass Mastered!
          </h3>
          <p style={{ color: LIGHT_SLATE }}>
            You've successfully learned the 6-step financial planning process.
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
            <FaCompass className="text-2xl" style={{ color: CYBER_TEAL }} />
          </div>
        </div>
        <h3 className="text-2xl font-bold mb-4" style={{ color: CYBER_TEAL }}>
          Your Financial Compass
        </h3>
        <p className="text-lg" style={{ color: LIGHT_SLATE }}>
          Every successful journey needs a compass. Let's learn the proven 6-step process that financial advisors use worldwide.
        </p>
      </div>

      {!showQuiz ? (
        <div>
          {/* Educational Content */}
          <div
            className="p-6 rounded-lg mb-6"
            style={{ backgroundColor: DEEP_SPACE_BLUE }}
          >
            <h4 className="text-xl font-semibold mb-4" style={{ color: LUMINOUS_ACCENT }}>
              The 6-Step Financial Planning Process
            </h4>
            <div className="space-y-4">
              {correctOrder.map((step, index) => (
                <div key={index} className="flex items-start space-x-4">
                  <div
                    className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0"
                    style={{ backgroundColor: CYBER_TEAL, color: DEEP_SPACE_BLUE }}
                  >
                    {index + 1}
                  </div>
                  <div>
                    <h5 className="font-semibold mb-1" style={{ color: LIGHT_SLATE }}>
                      {step}
                    </h5>
                    <p className="text-sm" style={{ color: MID_SLATE }}>
                      {index === 0 && "Build trust and understand your needs"}
                      {index === 1 && "Collect financial information and define clear goals"}
                      {index === 2 && "Evaluate your current financial position"}
                      {index === 3 && "Create a personalized strategy"}
                      {index === 4 && "Put the plan into action"}
                      {index === 5 && "Regular check-ins and adjustments"}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Start Quiz Button */}
          <div className="text-center">
            <button
              onClick={() => setShowQuiz(true)}
              className="px-8 py-4 rounded-lg font-bold text-lg transition-all duration-200 hover:scale-105"
              style={{
                backgroundColor: CYBER_TEAL,
                color: DEEP_SPACE_BLUE,
                boxShadow: `0 4px 14px 0 ${CYBER_TEAL}40`
              }}
            >
              Test Your Knowledge
            </button>
          </div>
        </div>
      ) : (
        <div>
          {/* Quiz Instructions */}
          <div className="mb-6 text-center">
            <h4 className="text-xl font-semibold mb-2" style={{ color: LUMINOUS_ACCENT }}>
              Ordering Quiz
            </h4>
            <p style={{ color: LIGHT_SLATE }}>
              Arrange the steps in the correct order using the up/down arrows.
            </p>
          </div>

          {/* Ordering Quiz */}
          <div className="space-y-3 mb-6">
            {steps.map((step, index) => (
              <div
                key={step.id}
                className="flex items-center p-4 rounded-lg border-2 transition-all duration-200"
                style={{
                  backgroundColor: CORPORATE_NAVY,
                  borderColor: MID_SLATE,
                  color: LIGHT_SLATE
                }}
              >
                <div className="flex flex-col space-y-1 mr-4">
                  <button
                    onClick={() => moveStep(index, 'up')}
                    disabled={index === 0}
                    className="p-1 rounded transition-all duration-200 disabled:opacity-30 disabled:cursor-not-allowed hover:bg-opacity-80"
                    style={{ backgroundColor: `${CYBER_TEAL}40` }}
                  >
                    <FaArrowUp className="text-xs" style={{ color: CYBER_TEAL }} />
                  </button>
                  <button
                    onClick={() => moveStep(index, 'down')}
                    disabled={index === steps.length - 1}
                    className="p-1 rounded transition-all duration-200 disabled:opacity-30 disabled:cursor-not-allowed hover:bg-opacity-80"
                    style={{ backgroundColor: `${CYBER_TEAL}40` }}
                  >
                    <FaArrowDown className="text-xs" style={{ color: CYBER_TEAL }} />
                  </button>
                </div>
                <div
                  className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold mr-4"
                  style={{ backgroundColor: CYBER_TEAL, color: DEEP_SPACE_BLUE }}
                >
                  {index + 1}
                </div>
                <span className="flex-1">{step.content}</span>
              </div>
            ))}
          </div>

          {/* Check Answer Button */}
          <div className="text-center mb-6">
            <button
              onClick={checkAnswer}
              className="px-6 py-3 rounded-lg font-bold transition-all duration-200 hover:scale-105"
              style={{
                backgroundColor: LUMINOUS_ACCENT,
                color: DEEP_SPACE_BLUE
              }}
            >
              Check My Answer
            </button>
          </div>

          {/* Result Display */}
          {showResult && (
            <div
              className="p-4 rounded-lg text-center"
              style={{
                backgroundColor: quizCompleted ? `${VIBRANT_GREEN}20` : `${ERROR_RED}20`,
                border: `2px solid ${quizCompleted ? VIBRANT_GREEN : ERROR_RED}`
              }}
            >
              <p
                className="font-bold"
                style={{ color: quizCompleted ? VIBRANT_GREEN : ERROR_RED }}
              >
                {quizCompleted ? 'Correct! Well done!' : 'Not quite right. Try again!'}
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default FinancialCompassSkill;
