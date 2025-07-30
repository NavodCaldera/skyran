import React from 'react';
import { Link } from 'react-router-dom';
import { FaGraduationCap, FaArrowRight, FaCheckCircle } from 'react-icons/fa';
import {
  DEEP_SPACE_BLUE,
  CORPORATE_NAVY,
  CYBER_TEAL,
  LUMINOUS_ACCENT,
  LIGHT_SLATE,
  MID_SLATE
} from '../constants';

const Learn = () => {
  const modules = [
    "Module 1: The Foundation — Why Should I Invest?",
    "Module 2: The Investor — Who Am I?",
    "Module 3: The Toolkit — What Can I Invest In?",
    "Module 4: The Blueprint — How Do I Build My Plan?"
  ];

  return (
    <div
      className="min-h-screen py-12 px-6"
      style={{ backgroundColor: DEEP_SPACE_BLUE }}
    >
      {/* Header Section */}
      <div className="max-w-6xl mx-auto text-center mb-16">
        <h1
          className="text-5xl font-bold mb-6"
          style={{ color: LUMINOUS_ACCENT }}
        >
          WealthWise Education Hub
        </h1>
        <p
          className="text-xl max-w-4xl mx-auto leading-relaxed"
          style={{ color: LIGHT_SLATE }}
        >
          Your journey to financial literacy starts here. Choose a path below to begin mastering the world of investments.
        </p>
      </div>

      {/* Course Grid */}
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">

          {/* Capital Markets for Beginners Course Card */}
          <div className="lg:col-span-2 xl:col-span-2">
            <div
              className="rounded-2xl p-8 border-2 transition-all duration-300 hover:scale-105 hover:shadow-2xl cursor-pointer group"
              style={{
                backgroundColor: CORPORATE_NAVY,
                borderColor: CYBER_TEAL,
                boxShadow: `0 10px 30px rgba(41, 217, 201, 0.1)`
              }}
            >
              {/* Course Icon */}
              <div className="flex justify-center mb-6">
                <div
                  className="w-20 h-20 rounded-full flex items-center justify-center border-2 group-hover:scale-110 transition-transform duration-300"
                  style={{
                    backgroundColor: `${CYBER_TEAL}20`,
                    borderColor: CYBER_TEAL
                  }}
                >
                  <FaGraduationCap
                    className="text-3xl"
                    style={{ color: CYBER_TEAL }}
                  />
                </div>
              </div>

              {/* Course Title */}
              <h2
                className="text-3xl font-bold text-center mb-4"
                style={{ color: CYBER_TEAL }}
              >
                Capital Markets for Beginners
              </h2>

              {/* Course Description */}
              <p
                className="text-lg text-center mb-8 leading-relaxed"
                style={{ color: LIGHT_SLATE }}
              >
                A step-by-step interactive course designed to take you from zero knowledge to your first investment plan. No jargon, just clear, practical learning.
              </p>

              {/* What You'll Learn Section */}
              <div className="mb-8">
                <h3
                  className="text-xl font-semibold mb-4"
                  style={{ color: LUMINOUS_ACCENT }}
                >
                  What You'll Learn:
                </h3>
                <div className="space-y-3">
                  {modules.map((module, index) => (
                    <div key={index} className="flex items-start space-x-3">
                      <FaCheckCircle
                        className="text-lg mt-1 flex-shrink-0"
                        style={{ color: CYBER_TEAL }}
                      />
                      <span
                        className="text-base"
                        style={{ color: LIGHT_SLATE }}
                      >
                        {module}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Call-to-Action Button */}
              <Link to="/learn/capital-markets-beginner">
                <button
                  className="w-full py-4 px-6 rounded-xl font-bold text-lg transition-all duration-300 hover:scale-105 hover:shadow-lg flex items-center justify-center space-x-3 group"
                  style={{
                    backgroundColor: LUMINOUS_ACCENT,
                    color: DEEP_SPACE_BLUE
                  }}
                >
                  <span>Start Learning</span>
                  <FaArrowRight className="group-hover:translate-x-1 transition-transform duration-300" />
                </button>
              </Link>
            </div>
          </div>

          {/* Placeholder for Future Courses */}
          <div className="space-y-6">
            {/* Coming Soon Card 1 */}
            <div
              className="rounded-2xl p-6 border-2 opacity-60"
              style={{
                backgroundColor: CORPORATE_NAVY,
                borderColor: MID_SLATE
              }}
            >
              <div className="text-center">
                <div
                  className="w-16 h-16 rounded-full flex items-center justify-center border-2 mx-auto mb-4"
                  style={{
                    backgroundColor: `${MID_SLATE}20`,
                    borderColor: MID_SLATE
                  }}
                >
                  <span className="text-2xl">🏦</span>
                </div>
                <h3
                  className="text-xl font-bold mb-2"
                  style={{ color: MID_SLATE }}
                >
                  Advanced Portfolio Management
                </h3>
                <p
                  className="text-sm mb-4"
                  style={{ color: MID_SLATE }}
                >
                  Coming Soon
                </p>
                <button
                  disabled
                  className="w-full py-2 px-4 rounded-lg font-medium text-sm cursor-not-allowed"
                  style={{
                    backgroundColor: MID_SLATE,
                    color: CORPORATE_NAVY
                  }}
                >
                  Coming Soon
                </button>
              </div>
            </div>

            {/* Coming Soon Card 2 */}
            <div
              className="rounded-2xl p-6 border-2 opacity-60"
              style={{
                backgroundColor: CORPORATE_NAVY,
                borderColor: MID_SLATE
              }}
            >
              <div className="text-center">
                <div
                  className="w-16 h-16 rounded-full flex items-center justify-center border-2 mx-auto mb-4"
                  style={{
                    backgroundColor: `${MID_SLATE}20`,
                    borderColor: MID_SLATE
                  }}
                >
                  <span className="text-2xl">📊</span>
                </div>
                <h3
                  className="text-xl font-bold mb-2"
                  style={{ color: MID_SLATE }}
                >
                  Technical Analysis Fundamentals
                </h3>
                <p
                  className="text-sm mb-4"
                  style={{ color: MID_SLATE }}
                >
                  Coming Soon
                </p>
                <button
                  disabled
                  className="w-full py-2 px-4 rounded-lg font-medium text-sm cursor-not-allowed"
                  style={{
                    backgroundColor: MID_SLATE,
                    color: CORPORATE_NAVY
                  }}
                >
                  Coming Soon
                </button>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Bottom Section */}
      <div className="max-w-6xl mx-auto mt-16 text-center">
        <p
          className="text-lg"
          style={{ color: MID_SLATE }}
        >
          More courses and learning paths coming soon. Start with the fundamentals and build your financial knowledge step by step.
        </p>
      </div>
    </div>
  );
};

export default Learn;