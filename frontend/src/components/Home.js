import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/autoplay';
import { Pagination, Autoplay } from 'swiper/modules';
import {
  DEEP_SPACE_BLUE,
  CORPORATE_NAVY,
  CYBER_TEAL,
  LUMINOUS_ACCENT,
  LIGHT_SLATE,
  MID_SLATE
} from '../constants';

const Home = () => {
  const [openIndex, setOpenIndex] = useState(null);
  const [tourStep, setTourStep] = useState(0); // 0 = initial, 1-5 = tour steps
  const [isTransitioning, setIsTransitioning] = useState(false);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  // Guided Discovery Tour Data - Following your exact plan
  const tourSteps = [
    {
      id: 1,
      icon: '🏦',
      title: 'Fixed Deposits',
      subtitle: 'The Foundation',
      description: 'The safest place to grow your savings.',
      position: 'left', // Appears center-left as specified
      link: '/fixed-deposit'
    },
    {
      id: 2,
      icon: '🛡️',
      title: 'Government Securities',
      subtitle: 'The Secure Step-Up',
      description: 'Lend to the government for secure returns.',
      position: 'center-left', // Slightly to the right of first card
      link: '/bonds'
    },
    {
      id: 3,
      icon: '📊',
      title: 'Unit Trusts',
      subtitle: 'The Smart Mix',
      description: 'Invest in many assets at once.',
      position: 'center-right', // Further right, maybe slightly higher
      link: '/unit-trust-rates'
    },
    {
      id: 4,
      icon: '📈',
      title: 'Share Market',
      subtitle: 'The Growth Engine',
      description: 'Own a piece of top Sri Lankan companies.',
      position: 'center', // Moves towards center, representing importance
      link: '/share-market'
    },
    {
      id: 5,
      icon: '🚀',
      title: "You're Ready to Start",
      subtitle: 'Your Financial Journey',
      description: "Let's build your personalized financial plan together.",
      position: 'final', // Center of screen, larger than others
      link: '/portfolio-builder',
      isCallToAction: true
    }
  ];

  const startTour = () => {
    setIsTransitioning(true);
    setTimeout(() => {
      setTourStep(1);
      setIsTransitioning(false);
    }, 500);
  };

  const nextStep = () => {
    if (tourStep < tourSteps.length) {
      setIsTransitioning(true);
      setTimeout(() => {
        setTourStep(tourStep + 1);
        setIsTransitioning(false);
      }, 300);
    }
  };

  const previousStep = () => {
    if (tourStep > 1) {
      setIsTransitioning(true);
      setTimeout(() => {
        setTourStep(tourStep - 1);
        setIsTransitioning(false);
      }, 300);
    }
  };

  const resetTour = () => {
    setIsTransitioning(true);
    setTimeout(() => {
      setTourStep(0);
      setIsTransitioning(false);
    }, 300);
  };

  const getCardPosition = (position) => {
    // All cards now appear in the center for focused experience
    return 'left-1/2 transform -translate-x-1/2';
  };

  const faqData = [
    {
      question: 'What is the Portfolio Builder?',
      answer: 'It is a tool to help you create and manage investment portfolios with AI-based suggestions.'
    },
    {
      question: 'How often are saving and fixed deposit rates updated?',
      answer: 'We update them daily based on public and partner bank sources.'
    },
    {
      question: 'Can I track gold and share market prices in real-time?',
      answer: 'Yes, our platform integrates live market data feeds for accuracy.'
    },
    {
      question: 'Is this platform free to use?',
      answer: 'Yes, our core features are free. Premium tools may be introduced in the future.'
    }
  ];

  return (
    <div>
      {/* Guided Discovery Tour Hero Section */}
      <div
        className="min-h-screen bg-cover bg-center bg-no-repeat flex items-center justify-center relative overflow-hidden"
        style={{ backgroundImage: "url('/assets/home4.png')" }}
      >
        {/* Enhanced overlay system - darkens slightly during tour */}
        <div
          className="absolute inset-0 transition-all duration-700"
          style={{
            background: tourStep === 0
              ? `linear-gradient(180deg,
                  ${DEEP_SPACE_BLUE}40 0%,
                  ${DEEP_SPACE_BLUE}60 50%,
                  ${DEEP_SPACE_BLUE}80 100%
                )`
              : `linear-gradient(180deg,
                  ${DEEP_SPACE_BLUE}60 0%,
                  ${DEEP_SPACE_BLUE}75 50%,
                  ${DEEP_SPACE_BLUE}90 100%
                )`
          }}
        ></div>

        {/* Step 0: Initial State - "Your Financial Sanctuary" */}
        {tourStep === 0 && (
          <div
            className={`relative z-10 text-center px-4 transition-all duration-500 ${
              isTransitioning ? 'opacity-0 transform translate-y-4' : 'opacity-100 transform translate-y-0'
            }`}
          >
            <h1
              className="text-5xl md:text-7xl lg:text-8xl font-bold mb-8 drop-shadow-lg animate-fade-up"
              style={{
                color: LUMINOUS_ACCENT,
                textShadow: `0 4px 8px ${DEEP_SPACE_BLUE}`
              }}
            >
              Learn Today, Earn for Tomorrow.
            </h1>

            {/* Sri Lankan Community-Focused Button - Encouraging & Reassuring */}
            <button
              onClick={startTour}
              className="group rounded-full border border-white/30 px-8 py-4 text-xl font-semibold text-white transition-all duration-300 hover:border-white/60 hover:bg-white/10 transform hover:scale-105"
              style={{
                backgroundColor: 'rgba(255, 255, 255, 0.05)',
                backdropFilter: 'blur(10px)',
                boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)'
              }}
            >
              <span className="flex items-center">
                Take the First Step
                <svg className="w-6 h-6 ml-3 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </span>
            </button>

            {/* Alternative Option 2: Direct & Honest - "See How It Works" */}
            {/*
            <button
              onClick={startTour}
              className="group rounded-full bg-gradient-to-r from-cyan-400 to-violet-500 px-8 py-4 text-xl font-bold text-white shadow-lg shadow-violet-500/30 transition-all duration-300 hover:shadow-xl hover:shadow-cyan-500/40 transform hover:scale-105"
            >
              <span className="flex items-center">
                See How It Works
                <svg className="h-6 w-6 ml-3 transition-transform duration-300 group-hover:scale-110" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
              </span>
            </button>
            */}

            {/* Alternative Option 3: Personal & Aspirational - "Start Your Money Path" */}
            {/*
            <button
              onClick={startTour}
              className="rounded-full px-8 py-4 text-xl font-semibold transition-all duration-200 active:scale-95 active:shadow-inner transform hover:scale-105"
              style={{
                backgroundColor: '#1e293b',
                color: '#cbd5e1',
                boxShadow: '4px 4px 8px #0c1a2c, -4px -4px 8px #2a3a4e'
              }}
            >
              <span className="flex items-center">
                🚀 Start Your Money Path
              </span>
            </button>
            */}
          </div>
        )}

        {/* Tour Steps 1-5: Discovery Cards with Position-Based Storytelling */}
        {tourStep > 0 && tourStep <= tourSteps.length && (
          <div className="relative z-10 w-full h-full">
            {tourSteps.map((step, index) => {
              if (index + 1 !== tourStep) return null;

              return (
                <div
                  key={step.id}
                  className={`absolute top-1/2 transform -translate-y-1/2 transition-all duration-500 ${
                    isTransitioning ? 'opacity-0 scale-95 translate-y-4' : 'opacity-100 scale-100 translate-y-0'
                  } ${getCardPosition(step.position)}`}
                >
                  <div
                    className={`p-6 md:p-8 rounded-2xl shadow-2xl border backdrop-blur-md ${
                      step.isCallToAction ? 'w-80 md:w-96 lg:w-[420px]' : 'w-72 md:w-80 lg:w-96'
                    }`}
                    style={{
                      backgroundColor: step.isCallToAction ? `${CYBER_TEAL}20` : `${CORPORATE_NAVY}F0`,
                      borderColor: step.isCallToAction ? CYBER_TEAL : `${CYBER_TEAL}60`,
                      boxShadow: step.isCallToAction
                        ? `0 25px 50px rgba(0, 0, 0, 0.6), 0 0 0 2px ${CYBER_TEAL}80`
                        : `0 25px 50px rgba(0, 0, 0, 0.5), 0 0 0 1px ${CYBER_TEAL}40`
                    }}
                  >
                    {/* Card Content */}
                    <div className="text-center space-y-4 md:space-y-6">
                      {/* Large Icon */}
                      <div
                        className={`mx-auto rounded-full flex items-center justify-center ${
                          step.isCallToAction ? 'w-16 h-16 md:w-20 md:h-20 text-3xl md:text-4xl' : 'w-12 h-12 md:w-16 md:h-16 text-2xl md:text-3xl'
                        }`}
                        style={{
                          backgroundColor: step.isCallToAction ? `${LUMINOUS_ACCENT}30` : `${CYBER_TEAL}30`,
                          border: `3px solid ${step.isCallToAction ? LUMINOUS_ACCENT : CYBER_TEAL}`
                        }}
                      >
                        {step.icon}
                      </div>

                      {/* Title */}
                      <div>
                        <h2
                          className={`font-bold mb-1 ${
                            step.isCallToAction ? 'text-2xl md:text-3xl lg:text-4xl' : 'text-xl md:text-2xl lg:text-3xl'
                          }`}
                          style={{ color: step.isCallToAction ? LUMINOUS_ACCENT : CYBER_TEAL }}
                        >
                          {step.title}
                        </h2>
                        <p
                          className="text-xs md:text-sm font-medium opacity-80"
                          style={{ color: LIGHT_SLATE }}
                        >
                          {step.subtitle}
                        </p>
                      </div>

                      {/* One-sentence explanation */}
                      <p
                        className={`leading-relaxed ${
                          step.isCallToAction ? 'text-base md:text-lg' : 'text-sm md:text-base'
                        }`}
                        style={{ color: LIGHT_SLATE }}
                      >
                        {step.description}
                      </p>

                      {/* Navigation */}
                      <div className="pt-2 md:pt-4">
                        {step.isCallToAction ? (
                          <div className="space-y-4">
                            {/* Previous button for final step */}
                            <button
                              onClick={previousStep}
                              className="w-full px-6 md:px-8 py-2 md:py-3 rounded-full font-medium transition-all duration-300 transform hover:scale-105 border"
                              style={{
                                backgroundColor: 'transparent',
                                color: LIGHT_SLATE,
                                borderColor: `${MID_SLATE}60`,
                                boxShadow: `0 2px 8px ${MID_SLATE}20`
                              }}
                              onMouseEnter={(e) => {
                                e.target.style.backgroundColor = `${MID_SLATE}20`;
                                e.target.style.borderColor = MID_SLATE;
                              }}
                              onMouseLeave={(e) => {
                                e.target.style.backgroundColor = 'transparent';
                                e.target.style.borderColor = `${MID_SLATE}60`;
                              }}
                            >
                              ← Previous
                            </button>

                            {/* Main CTA button */}
                            <Link
                              to={step.link}
                              className="block w-full py-3 md:py-4 px-6 md:px-8 rounded-full font-semibold transition-all duration-300 transform hover:scale-105"
                              style={{
                                backgroundColor: LUMINOUS_ACCENT,
                                color: DEEP_SPACE_BLUE,
                                boxShadow: `0 4px 15px ${LUMINOUS_ACCENT}40`
                              }}
                            >
                              Create My Portfolio
                            </Link>
                          </div>
                        ) : (
                          <div className="flex justify-between items-center space-x-4">
                            {/* Previous button (only show if not first step) */}
                            {tourStep > 1 && (
                              <button
                                onClick={previousStep}
                                className="px-4 md:px-6 py-2 md:py-3 rounded-full font-medium transition-all duration-300 transform hover:scale-105 border"
                                style={{
                                  backgroundColor: 'transparent',
                                  color: LIGHT_SLATE,
                                  borderColor: `${MID_SLATE}60`,
                                  boxShadow: `0 2px 8px ${MID_SLATE}20`
                                }}
                                onMouseEnter={(e) => {
                                  e.target.style.backgroundColor = `${MID_SLATE}20`;
                                  e.target.style.borderColor = MID_SLATE;
                                }}
                                onMouseLeave={(e) => {
                                  e.target.style.backgroundColor = 'transparent';
                                  e.target.style.borderColor = `${MID_SLATE}60`;
                                }}
                              >
                                ← Previous
                              </button>
                            )}

                            {/* Next button */}
                            <button
                              onClick={nextStep}
                              className="px-6 md:px-8 py-3 rounded-full font-semibold transition-all duration-300 transform hover:scale-105 flex-1"
                              style={{
                                backgroundColor: CYBER_TEAL,
                                color: DEEP_SPACE_BLUE,
                                boxShadow: `0 4px 15px ${CYBER_TEAL}40`
                              }}
                            >
                              Next →
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Skip Tour Button - positioned under each card */}
                  <div className="mt-4 text-center">
                    <button
                      onClick={resetTour}
                      className="px-4 py-2 rounded-lg text-xs md:text-sm font-medium transition-all duration-200 opacity-70 hover:opacity-100"
                      style={{
                        backgroundColor: `${MID_SLATE}40`,
                        color: LIGHT_SLATE,
                        border: `1px solid ${MID_SLATE}60`
                      }}
                    >
                      {tourStep === tourSteps.length ? 'Tour Over' : 'Skip Tour'}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* CSS Animation for fade-up effect */}
      <style>
        {`
          @keyframes fade-up {
            0% {
              opacity: 0;
              transform: translateY(40px);
            }
            100% {
              opacity: 1;
              transform: translateY(0);
            }
          }

          .animate-fade-up {
            animation: fade-up 1.5s ease-out forwards;
            opacity: 0;
          }
        `}
      </style>







      {/* Interactive Opportunity Hub - Smart Cards */}
      <div
        id="opportunities"
        className="w-full py-20 px-6 mx-auto max-w-screen-xl"
        style={{ backgroundColor: DEEP_SPACE_BLUE }}
      >
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2
            className="text-4xl md:text-5xl lg:text-6xl font-bold"
            style={{ color: LUMINOUS_ACCENT }}
          >
            Your Financial Toolkit
          </h2>
        </div>

        {/* Smart Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">

          {/* Card 1: Portfolio Builder */}
          <div className="group relative rounded-xl overflow-hidden shadow-2xl cursor-pointer h-80 transition-all duration-500 hover:scale-105">
            {/* Background Image */}
            <img
              src="/assets/portfolio-builder.jpg"
              alt="Portfolio Builder"
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            />

            {/* Default State */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end p-6">
              <h3 className="text-2xl md:text-3xl font-bold text-white">AI Portfolio Builder</h3>
            </div>

            {/* Hover State */}
            <div
              className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-all duration-500 flex items-end p-6"
              style={{
                background: `linear-gradient(135deg, ${CYBER_TEAL}80 0%, ${CORPORATE_NAVY}70 50%, ${DEEP_SPACE_BLUE}80 100%)`
              }}
            >
              <div className="w-full transition-transform duration-500 transform translate-y-4 group-hover:translate-y-0">
                <p className="text-white/90 text-sm md:text-base mb-4">
                  Get a custom investment plan in minutes.
                </p>

                <button
                  className="w-full text-center py-3 px-4 rounded-full font-semibold transition-all duration-300 hover:scale-105"
                  style={{
                    backgroundColor: LUMINOUS_ACCENT,
                    color: DEEP_SPACE_BLUE
                  }}
                >
                  Build Plan →
                </button>
              </div>
            </div>
          </div>

          {/* Card 2: Saving Rates */}
          <div className="group relative rounded-xl overflow-hidden shadow-2xl cursor-pointer h-80 transition-all duration-500 hover:scale-105">
            <img
              src="/assets/saving-rates.jpg"
              alt="Saving Rates"
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            />

            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end p-6">
              <h3 className="text-2xl md:text-3xl font-bold text-white">Saving Rates</h3>
            </div>

            <div
              className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-all duration-500 flex items-end p-6"
              style={{
                background: `linear-gradient(135deg, ${CYBER_TEAL}80 0%, ${CORPORATE_NAVY}70 50%, ${DEEP_SPACE_BLUE}80 100%)`
              }}
            >
              <div className="w-full transition-transform duration-500 transform translate-y-4 group-hover:translate-y-0">
                <p className="text-white/90 text-sm md:text-base mb-4">
                  Find the highest interest rates from all banks.
                </p>

                <button
                  className="w-full text-center py-3 px-4 rounded-full font-semibold transition-all duration-300 hover:scale-105"
                  style={{
                    backgroundColor: LUMINOUS_ACCENT,
                    color: DEEP_SPACE_BLUE
                  }}
                >
                  Compare →
                </button>
              </div>
            </div>
          </div>

          {/* Card 3: Fixed Deposits */}
          <div className="group relative rounded-xl overflow-hidden shadow-2xl cursor-pointer h-80 transition-all duration-500 hover:scale-105">
            <img
              src="/assets/fixed-deposit-rates.webp"
              alt="Fixed Deposits"
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            />

            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end p-6">
              <h3 className="text-2xl md:text-3xl font-bold text-white">Fixed Deposits</h3>
            </div>

            <div
              className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-all duration-500 flex items-end p-6"
              style={{
                background: `linear-gradient(135deg, ${CYBER_TEAL}80 0%, ${CORPORATE_NAVY}70 50%, ${DEEP_SPACE_BLUE}80 100%)`
              }}
            >
              <div className="w-full transition-transform duration-500 transform translate-y-4 group-hover:translate-y-0">
                <p className="text-white/90 text-sm md:text-base mb-4">
                  Lock in a guaranteed return. Safe and simple.
                </p>

                <button
                  className="w-full text-center py-3 px-4 rounded-full font-semibold transition-all duration-300 hover:scale-105"
                  style={{
                    backgroundColor: LUMINOUS_ACCENT,
                    color: DEEP_SPACE_BLUE
                  }}
                >
                  Find FDs →
                </button>
              </div>
            </div>
          </div>

          {/* Card 4: Bonds */}
          <div className="group relative rounded-xl overflow-hidden shadow-2xl cursor-pointer h-80 transition-all duration-500 hover:scale-105">
            <img
              src="/assets/bonds.png"
              alt="Bonds"
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            />

            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end p-6">
              <h3 className="text-2xl md:text-3xl font-bold text-white">Bonds</h3>
            </div>

            <div
              className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-all duration-500 flex items-end p-6"
              style={{
                background: `linear-gradient(135deg, ${CYBER_TEAL}80 0%, ${CORPORATE_NAVY}70 50%, ${DEEP_SPACE_BLUE}80 100%)`
              }}
            >
              <div className="w-full transition-transform duration-500 transform translate-y-4 group-hover:translate-y-0">
                <p className="text-white/90 text-sm md:text-base mb-4">
                  Lend to the government or top companies for steady income.
                </p>

                <button
                  className="w-full text-center py-3 px-4 rounded-full font-semibold transition-all duration-300 hover:scale-105"
                  style={{
                    backgroundColor: LUMINOUS_ACCENT,
                    color: DEEP_SPACE_BLUE
                  }}
                >
                  Explore →
                </button>
              </div>
            </div>
          </div>

          {/* Card 5: Unit Trust */}
          <div className="group relative rounded-xl overflow-hidden shadow-2xl cursor-pointer h-80 transition-all duration-500 hover:scale-105">
            <img
              src="/assets/unit-trust.jpg"
              alt="Unit Trust"
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            />

            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end p-6">
              <h3 className="text-2xl md:text-3xl font-bold text-white">Unit Trusts</h3>
            </div>

            <div
              className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-all duration-500 flex items-end p-6"
              style={{
                background: `linear-gradient(135deg, ${CYBER_TEAL}80 0%, ${CORPORATE_NAVY}70 50%, ${DEEP_SPACE_BLUE}80 100%)`
              }}
            >
              <div className="w-full transition-transform duration-500 transform translate-y-4 group-hover:translate-y-0">
                <p className="text-white/90 text-sm md:text-base mb-4">
                  Instantly diversify. One fund, many investments.
                </p>

                <button
                  className="w-full text-center py-3 px-4 rounded-full font-semibold transition-all duration-300 hover:scale-105"
                  style={{
                    backgroundColor: LUMINOUS_ACCENT,
                    color: DEEP_SPACE_BLUE
                  }}
                >
                  Discover →
                </button>
              </div>
            </div>
          </div>

          {/* Card 6: Gold Market */}
          <div className="group relative rounded-xl overflow-hidden shadow-2xl cursor-pointer h-80 transition-all duration-500 hover:scale-105">
            <img
              src="/assets/gold-market.webp"
              alt="Gold Market"
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            />

            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end p-6">
              <h3 className="text-2xl md:text-3xl font-bold text-white">Gold Market</h3>
            </div>

            <div
              className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-all duration-500 flex items-end p-6"
              style={{
                background: `linear-gradient(135deg, ${CYBER_TEAL}80 0%, ${CORPORATE_NAVY}70 50%, ${DEEP_SPACE_BLUE}80 100%)`
              }}
            >
              <div className="w-full transition-transform duration-500 transform translate-y-4 group-hover:translate-y-0">
                <p className="text-white/90 text-sm md:text-base mb-4">
                  A classic safe haven to protect your wealth.
                </p>

                <button
                  className="w-full text-center py-3 px-4 rounded-full font-semibold transition-all duration-300 hover:scale-105"
                  style={{
                    backgroundColor: LUMINOUS_ACCENT,
                    color: DEEP_SPACE_BLUE
                  }}
                >
                  Track Gold →
                </button>
              </div>
            </div>
          </div>

          {/* Card 7: Share Market */}
          <div className="group relative rounded-xl overflow-hidden shadow-2xl cursor-pointer h-80 transition-all duration-500 hover:scale-105 lg:col-start-2">
            <img
              src="/assets/share-market.webp"
              alt="Share Market"
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            />

            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end p-6">
              <h3 className="text-2xl md:text-3xl font-bold text-white">Share Market</h3>
            </div>

            <div
              className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-all duration-500 flex items-end p-6"
              style={{
                background: `linear-gradient(135deg, ${CYBER_TEAL}80 0%, ${CORPORATE_NAVY}70 50%, ${DEEP_SPACE_BLUE}80 100%)`
              }}
            >
              <div className="w-full transition-transform duration-500 transform translate-y-4 group-hover:translate-y-0">
                <p className="text-white/90 text-sm md:text-base mb-4">
                  Own a piece of top Sri Lankan companies.
                </p>

                <button
                  className="w-full text-center py-3 px-4 rounded-full font-semibold transition-all duration-300 hover:scale-105"
                  style={{
                    backgroundColor: LUMINOUS_ACCENT,
                    color: DEEP_SPACE_BLUE
                  }}
                >
                  View Market →
                </button>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Frequently Asked Questions Section */}
      <section className="mt-20 px-4 max-w-screen-xl mx-auto">
        <h2 className="text-4xl sm:text-5xl font-extrabold text-center text-white mb-12">
          Frequently Asked Questions
        </h2>


        <div className="max-w-3xl mx-auto space-y-4">
          {faqData.map((faq, index) => (
            <div
              key={index}
              className="rounded-xl overflow-hidden shadow-md"
              style={{
                border: `1px solid ${CORPORATE_NAVY}`,
                backgroundColor: CORPORATE_NAVY
              }}
            >
              <button
                className="w-full flex justify-between items-center px-6 py-4 text-left text-lg font-semibold transition"
                style={{
                  backgroundColor: CORPORATE_NAVY,
                  color: LIGHT_SLATE
                }}
                onMouseEnter={(e) => {
                  e.target.style.backgroundColor = CYBER_TEAL;
                  e.target.style.color = DEEP_SPACE_BLUE;
                }}
                onMouseLeave={(e) => {
                  e.target.style.backgroundColor = CORPORATE_NAVY;
                  e.target.style.color = LIGHT_SLATE;
                }}
                onClick={() => toggleFAQ(index)}
              >
                {faq.question}
                <span>{openIndex === index ? '-' : '+'}</span>
              </button>
              {openIndex === index && (
                <div
                  className="px-6 py-4 transition-all duration-300"
                  style={{
                    backgroundColor: DEEP_SPACE_BLUE,
                    color: MID_SLATE
                  }}
                >
                  {faq.answer}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>


      {/* Testimonials Section */}
      <div
        className="w-full py-20 px-6 mx-auto max-w-screen-xl"
        style={{ backgroundColor: DEEP_SPACE_BLUE }}
      >
        <h2
          className="text-4xl sm:text-5xl font-extrabold text-center mb-12 leading-[1.3] pb-3"
          style={{ color: LUMINOUS_ACCENT }}
        >
          What Our Users Say
        </h2>

        <Swiper
          modules={[Pagination, Autoplay]}
          spaceBetween={30}
          slidesPerView={1}
          pagination={{ clickable: true }}
          autoplay={{ delay: 5000 }}
          loop={true}
          breakpoints={{
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
        >
          {[
            {
              text: "“This platform helped me invest wisely using AI. The insights are easy to understand.”",
              name: "Nimesh Perera",
              location: "Colombo, Sri Lanka",
              img: "/assets/user1.jpg"
            },
            {
              text: "“Simple, smart, and effective. I’ve seen significant growth in my portfolio.”",
              name: "Anjali Fernando",
              location: "Kandy, Sri Lanka",
              img: "/assets/user2.jpg"
            },
            {
              text: "“The customer support is excellent, and the AI suggestions are spot-on.”",
              name: "Ruwan Jayasuriya",
              location: "Galle, Sri Lanka",
              img: "/assets/user3.jpg"
            },
            {
              text: "“Very intuitive UI and powerful analytics tools. Love it!”",
              name: "Tharushi Silva",
              location: "Negombo, Sri Lanka",
              img: "/assets/user4.jpg"
            },
            {
              text: "“It gave me confidence to manage my investments with less stress.”",
              name: "Kasun De Silva",
              location: "Matara, Sri Lanka",
              img: "/assets/user5.jpg"
            },
            {
              text: "“I highly recommend it to anyone serious about growing their wealth.”",
              name: "Dilani Samarasinghe",
              location: "Jaffna, Sri Lanka",
              img: "/assets/user6.jpg"
            },
          ].map((testimonial, index) => (
            <SwiperSlide key={index}>
              <div
                className="p-6 rounded-xl shadow-md h-full flex flex-col justify-between"
                style={{ backgroundColor: CORPORATE_NAVY }}
              >
                <p
                  className="text-lg mb-4"
                  style={{ color: LIGHT_SLATE }}
                >
                  {testimonial.text}
                </p>
                <div className="flex items-center space-x-4 mt-auto">
                  <img src={testimonial.img} alt={testimonial.name} className="w-12 h-12 rounded-full object-cover" />
                  <div>
                    <h4
                      className="text-xl font-semibold"
                      style={{ color: CYBER_TEAL }}
                    >
                      {testimonial.name}
                    </h4>
                    <p
                      className="text-sm"
                      style={{ color: MID_SLATE }}
                    >
                      {testimonial.location}
                    </p>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      <div
        className="w-full py-10 px-4 text-center"
        style={{ backgroundColor: CORPORATE_NAVY }}
      >
        <h3
          className="text-3xl sm:text-4xl font-bold mb-4"
          style={{ color: LUMINOUS_ACCENT }}
        >
          Start Investing Now
        </h3>
        <button
          className="px-8 py-3 rounded-full text-lg font-semibold transition duration-300"
          style={{
            backgroundColor: CYBER_TEAL,
            color: DEEP_SPACE_BLUE
          }}
          onMouseEnter={(e) => {
            e.target.style.backgroundColor = LUMINOUS_ACCENT;
            e.target.style.color = DEEP_SPACE_BLUE;
          }}
          onMouseLeave={(e) => {
            e.target.style.backgroundColor = CYBER_TEAL;
            e.target.style.color = DEEP_SPACE_BLUE;
          }}
        >
          Get Started
        </button>
      </div>



    </div>
  );
};

export default Home;
