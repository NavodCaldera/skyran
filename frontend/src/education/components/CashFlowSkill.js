import React, { useState, useEffect } from 'react';
import { FaWallet, FaCheckCircle, FaArrowUp, FaArrowDown } from 'react-icons/fa';
import {
  DEEP_SPACE_BLUE,
  CORPORATE_NAVY,
  CYBER_TEAL,
  LUMINOUS_ACCENT,
  LIGHT_SLATE,
  MID_SLATE,
  VIBRANT_GREEN,
  ERROR_RED,
  CHART_SKY_BLUE,
  CHART_PINK
} from '../../constants';

const CashFlowSkill = ({ userData, setUserData, onComplete, isCompleted }) => {
  const [monthlyIncome, setMonthlyIncome] = useState(userData.monthlyIncome || '');
  const [monthlyExpenses, setMonthlyExpenses] = useState(userData.monthlyExpenses || '');
  const [showNeedsWantsQuiz, setShowNeedsWantsQuiz] = useState(false);
  const [quizCompleted, setQuizCompleted] = useState(isCompleted);

  // Calculate derived values
  const monthlySavings = monthlyIncome && monthlyExpenses ? 
    parseFloat(monthlyIncome.replace(/,/g, '')) - parseFloat(monthlyExpenses.replace(/,/g, '')) : 0;
  const savingsRate = monthlyIncome && monthlyExpenses && parseFloat(monthlyIncome.replace(/,/g, '')) > 0 ? 
    (monthlySavings / parseFloat(monthlyIncome.replace(/,/g, ''))) * 100 : 0;

  // Update userData when values change
  useEffect(() => {
    if (monthlyIncome && monthlyExpenses) {
      setUserData(prev => ({
        ...prev,
        monthlyIncome,
        monthlyExpenses,
        monthlySavings,
        savingsRate
      }));
    }
  }, [monthlyIncome, monthlyExpenses, monthlySavings, savingsRate, setUserData]);

  // Needs vs Wants items for the quiz
  const [items, setItems] = useState([
    { id: '1', content: 'Rent/Mortgage', category: null, correctCategory: 'needs' },
    { id: '2', content: 'Netflix Subscription', category: null, correctCategory: 'wants' },
    { id: '3', content: 'Groceries', category: null, correctCategory: 'needs' },
    { id: '4', content: 'Designer Clothes', category: null, correctCategory: 'wants' },
    { id: '5', content: 'Health Insurance', category: null, correctCategory: 'needs' },
    { id: '6', content: 'Dining Out', category: null, correctCategory: 'wants' },
    { id: '7', content: 'Transportation', category: null, correctCategory: 'needs' },
    { id: '8', content: 'Gaming Console', category: null, correctCategory: 'wants' }
  ]);

  const formatCurrency = (value) => {
    const digits = value.replace(/\D/g, '');
    return digits.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  };

  const handleIncomeChange = (e) => {
    const formatted = formatCurrency(e.target.value);
    setMonthlyIncome(formatted);
  };

  const handleExpensesChange = (e) => {
    const formatted = formatCurrency(e.target.value);
    setMonthlyExpenses(formatted);
  };

  const assignItem = (itemId, category) => {
    setItems(prev => prev.map(item =>
      item.id === itemId
        ? { ...item, category: category === item.category ? null : category }
        : item
    ));
  };

  const checkNeedsWantsQuiz = () => {
    const allCorrect = items.every(item => item.category === item.correctCategory);
    if (allCorrect) {
      setQuizCompleted(true);
      setUserData(prev => ({ ...prev, needsVsWantsScore: 100 }));
      setTimeout(() => {
        onComplete();
      }, 2000);
    }
  };

  const canProceedToQuiz = monthlyIncome && monthlyExpenses && monthlySavings >= 0;

  if (quizCompleted) {
    return (
      <div className="text-center">
        <div className="mb-6">
          <FaCheckCircle className="text-6xl mx-auto mb-4" style={{ color: VIBRANT_GREEN }} />
          <h3 className="text-2xl font-bold mb-2" style={{ color: VIBRANT_GREEN }}>
            Cash Flow Mastered!
          </h3>
          <p style={{ color: LIGHT_SLATE }}>
            You understand your monthly snapshot and can distinguish needs from wants.
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
            <FaWallet className="text-2xl" style={{ color: CYBER_TEAL }} />
          </div>
        </div>
        <h3 className="text-2xl font-bold mb-4" style={{ color: CYBER_TEAL }}>
          Your Monthly Snapshot
        </h3>
        <p className="text-lg" style={{ color: LIGHT_SLATE }}>
          Understanding your cash flow is the foundation of all financial planning.
        </p>
      </div>

      {!showNeedsWantsQuiz ? (
        <div>
          {/* Income and Expenses Input */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div>
              <label className="block text-lg font-medium mb-3" style={{ color: LIGHT_SLATE }}>
                Monthly Income (LKR)
              </label>
              <div className="relative">
                <span
                  className="absolute inset-y-0 left-0 flex items-center pl-4 text-lg font-medium"
                  style={{ color: MID_SLATE }}
                >
                  LKR
                </span>
                <input
                  type="text"
                  value={monthlyIncome}
                  onChange={handleIncomeChange}
                  className="w-full p-4 pl-16 rounded-lg border-2 focus:outline-none focus:ring-2 transition-all duration-200"
                  style={{
                    backgroundColor: DEEP_SPACE_BLUE,
                    borderColor: MID_SLATE,
                    color: LIGHT_SLATE
                  }}
                  placeholder="Enter your monthly income"
                />
              </div>
            </div>

            <div>
              <label className="block text-lg font-medium mb-3" style={{ color: LIGHT_SLATE }}>
                Monthly Expenses (LKR)
              </label>
              <div className="relative">
                <span
                  className="absolute inset-y-0 left-0 flex items-center pl-4 text-lg font-medium"
                  style={{ color: MID_SLATE }}
                >
                  LKR
                </span>
                <input
                  type="text"
                  value={monthlyExpenses}
                  onChange={handleExpensesChange}
                  className="w-full p-4 pl-16 rounded-lg border-2 focus:outline-none focus:ring-2 transition-all duration-200"
                  style={{
                    backgroundColor: DEEP_SPACE_BLUE,
                    borderColor: MID_SLATE,
                    color: LIGHT_SLATE
                  }}
                  placeholder="Enter your monthly expenses"
                />
              </div>
            </div>
          </div>

          {/* Results Display */}
          {monthlyIncome && monthlyExpenses && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div
                className="p-6 rounded-lg text-center"
                style={{ backgroundColor: DEEP_SPACE_BLUE }}
              >
                <div className="flex items-center justify-center mb-2">
                  {monthlySavings >= 0 ? (
                    <FaArrowUp className="text-2xl mr-2" style={{ color: VIBRANT_GREEN }} />
                  ) : (
                    <FaArrowDown className="text-2xl mr-2" style={{ color: ERROR_RED }} />
                  )}
                </div>
                <h4 className="text-lg font-semibold mb-2" style={{ color: LIGHT_SLATE }}>
                  Monthly Savings
                </h4>
                <p
                  className="text-2xl font-bold"
                  style={{ color: monthlySavings >= 0 ? VIBRANT_GREEN : ERROR_RED }}
                >
                  LKR {monthlySavings.toLocaleString()}
                </p>
              </div>

              <div
                className="p-6 rounded-lg text-center"
                style={{ backgroundColor: DEEP_SPACE_BLUE }}
              >
                <div className="flex items-center justify-center mb-2">
                  <div
                    className="w-8 h-8 rounded-full flex items-center justify-center"
                    style={{ backgroundColor: CYBER_TEAL }}
                  >
                    <span className="text-sm font-bold" style={{ color: DEEP_SPACE_BLUE }}>%</span>
                  </div>
                </div>
                <h4 className="text-lg font-semibold mb-2" style={{ color: LIGHT_SLATE }}>
                  Savings Rate
                </h4>
                <p className="text-2xl font-bold" style={{ color: CYBER_TEAL }}>
                  {savingsRate.toFixed(1)}%
                </p>
              </div>
            </div>
          )}

          {/* Proceed to Quiz Button */}
          {canProceedToQuiz && (
            <div className="text-center">
              <button
                onClick={() => setShowNeedsWantsQuiz(true)}
                className="px-8 py-4 rounded-lg font-bold text-lg transition-all duration-200 hover:scale-105"
                style={{
                  backgroundColor: CYBER_TEAL,
                  color: DEEP_SPACE_BLUE,
                  boxShadow: `0 4px 14px 0 ${CYBER_TEAL}40`
                }}
              >
                Continue to Needs vs Wants Quiz
              </button>
            </div>
          )}
        </div>
      ) : (
        <div>
          {/* Needs vs Wants Quiz */}
          <div className="mb-6 text-center">
            <h4 className="text-xl font-semibold mb-2" style={{ color: LUMINOUS_ACCENT }}>
              Needs vs Wants Sorting
            </h4>
            <p style={{ color: LIGHT_SLATE }}>
              Click each item to assign it to the correct category. This skill is crucial for budgeting!
            </p>
          </div>

          {/* Items to Sort */}
          <div className="mb-6">
            <h5 className="font-semibold mb-4 text-center" style={{ color: LIGHT_SLATE }}>
              Click items to categorize them:
            </h5>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
              {items.map((item) => (
                <div
                  key={item.id}
                  className="p-3 rounded-lg border-2 cursor-pointer transition-all duration-200 hover:scale-105 text-center"
                  style={{
                    backgroundColor: item.category === 'needs' ? `${CHART_SKY_BLUE}20` :
                                   item.category === 'wants' ? `${CHART_PINK}20` : CORPORATE_NAVY,
                    borderColor: item.category === 'needs' ? CHART_SKY_BLUE :
                               item.category === 'wants' ? CHART_PINK : MID_SLATE,
                    color: LIGHT_SLATE
                  }}
                  onClick={() => assignItem(item.id, item.category === 'needs' ? 'wants' :
                                          item.category === 'wants' ? null : 'needs')}
                >
                  <div className="text-sm font-medium">{item.content}</div>
                  {item.category && (
                    <div
                      className="text-xs mt-1 px-2 py-1 rounded-full inline-block"
                      style={{
                        backgroundColor: item.category === 'needs' ? CHART_SKY_BLUE : CHART_PINK,
                        color: DEEP_SPACE_BLUE
                      }}
                    >
                      {item.category === 'needs' ? 'Need' : 'Want'}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Category Summary */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            {/* Needs Summary */}
            <div
              className="p-4 rounded-lg border-2"
              style={{ backgroundColor: `${CHART_SKY_BLUE}10`, borderColor: CHART_SKY_BLUE }}
            >
              <h5 className="font-semibold mb-3 text-center" style={{ color: CHART_SKY_BLUE }}>
                Needs ({items.filter(item => item.category === 'needs').length})
              </h5>
              <div className="space-y-2">
                {items.filter(item => item.category === 'needs').map((item) => (
                  <div
                    key={item.id}
                    className="p-2 rounded text-sm text-center"
                    style={{ backgroundColor: CORPORATE_NAVY, color: LIGHT_SLATE }}
                  >
                    {item.content}
                  </div>
                ))}
              </div>
            </div>

            {/* Wants Summary */}
            <div
              className="p-4 rounded-lg border-2"
              style={{ backgroundColor: `${CHART_PINK}10`, borderColor: CHART_PINK }}
            >
              <h5 className="font-semibold mb-3 text-center" style={{ color: CHART_PINK }}>
                Wants ({items.filter(item => item.category === 'wants').length})
              </h5>
              <div className="space-y-2">
                {items.filter(item => item.category === 'wants').map((item) => (
                  <div
                    key={item.id}
                    className="p-2 rounded text-sm text-center"
                    style={{ backgroundColor: CORPORATE_NAVY, color: LIGHT_SLATE }}
                  >
                    {item.content}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Check Answer Button */}
          {items.every(item => item.category !== null) && (
            <div className="text-center">
              <button
                onClick={checkNeedsWantsQuiz}
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
      )}
    </div>
  );
};

export default CashFlowSkill;
