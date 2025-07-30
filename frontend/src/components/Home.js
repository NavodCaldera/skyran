import React, { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/autoplay';
import { Pagination, Autoplay } from 'swiper/modules';
import { FaChartLine, FaGraduationCap, FaCheckCircle, FaLightbulb } from 'react-icons/fa';
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
  const choiceSectionRef = useRef(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const handleScrollToChoices = () => {
    choiceSectionRef.current?.scrollIntoView({ behavior: 'smooth' });
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
      {/* Hook Hero Section */}
      <div
        className="min-h-screen bg-cover bg-center bg-no-repeat flex items-center justify-center relative overflow-hidden"
        style={{ backgroundImage: "url('/assets/home4.png')" }}
      >
        {/* Overlay */}
        <div
          className="absolute inset-0"
          style={{
            background: `linear-gradient(180deg,
              ${DEEP_SPACE_BLUE}40 0%,
              ${DEEP_SPACE_BLUE}60 50%,
              ${DEEP_SPACE_BLUE}80 100%
            )`
          }}
        ></div>

        {/* Hero Content */}
        <div className="relative z-10 text-center px-6">
          <h1
            className="text-5xl md:text-7xl lg:text-8xl font-bold mb-8 drop-shadow-lg"
            style={{
              color: LUMINOUS_ACCENT,
              textShadow: `0 4px 8px ${DEEP_SPACE_BLUE}`
            }}
          >
            Your Financial Sanctuary
          </h1>
          <p
            className="text-xl md:text-2xl max-w-4xl mx-auto leading-relaxed mb-12"
            style={{ color: LIGHT_SLATE }}
          >
            Whether you're ready to invest or want to learn the ropes, your journey starts here.
          </p>

          {/* Single Explore Button */}
          <button
            onClick={handleScrollToChoices}
            className="group rounded-full border border-white/30 px-8 py-4 text-xl font-semibold text-white transition-all duration-300 hover:border-white/60 hover:bg-white/10 transform hover:scale-105"
            style={{
              backgroundColor: 'rgba(255, 255, 255, 0.05)',
              backdropFilter: 'blur(10px)',
              boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)'
            }}
          >
            <span className="flex items-center">
              Explore Your Path
              <svg className="w-6 h-6 ml-3 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </span>
          </button>
        </div>
      </div>

      {/* Reveal Section - Choice Cards */}
      <section
        ref={choiceSectionRef}
        className="py-20 px-6"
        style={{ backgroundColor: DEEP_SPACE_BLUE }}
      >
        <div className="max-w-7xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-16">
            <h2
              className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6"
              style={{ color: LUMINOUS_ACCENT }}
            >
              Choose Your Path
            </h2>
            <p
              className="text-xl max-w-3xl mx-auto leading-relaxed"
              style={{ color: LIGHT_SLATE }}
            >
              Select the journey that best fits your current financial goals and experience level.
            </p>
          </div>

          {/* Two-Column Choice Cards */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">

            {/* Build My Portfolio Card (Left) */}
            <Link to="/portfolio-builder" className="group block">
              <div
                className="rounded-2xl p-8 border-2 transition-all duration-300 hover:scale-105 hover:shadow-2xl h-full"
                style={{
                  backgroundColor: CORPORATE_NAVY,
                  borderColor: CYBER_TEAL,
                  boxShadow: `0 10px 30px rgba(41, 217, 201, 0.1)`
                }}
              >
                {/* Icon */}
                <div className="flex justify-center mb-6">
                  <div
                    className="w-20 h-20 rounded-full flex items-center justify-center border-2 group-hover:scale-110 transition-transform duration-300"
                    style={{
                      backgroundColor: `${CYBER_TEAL}20`,
                      borderColor: CYBER_TEAL
                    }}
                  >
                    <FaChartLine
                      className="text-3xl"
                      style={{ color: CYBER_TEAL }}
                    />
                  </div>
                </div>

                {/* Title */}
                <h2
                  className="text-3xl font-bold text-center mb-4"
                  style={{ color: CYBER_TEAL }}
                >
                  Build My Portfolio
                </h2>

                {/* Description */}
                <p
                  className="text-lg text-center mb-8 leading-relaxed"
                  style={{ color: LIGHT_SLATE }}
                >
                  Ready to invest? Let's create a personalized portfolio based on your financial goals, risk tolerance, and investment preferences.
                </p>

                {/* Feature List */}
                <div className="mb-8">
                  <div className="space-y-3">
                    {[
                      'Personalized risk assessment',
                      'Goal-based portfolio allocation',
                      'AI-powered recommendations',
                      'Real-time market insights'
                    ].map((feature, index) => (
                      <div key={index} className="flex items-start space-x-3">
                        <FaCheckCircle
                          className="text-lg mt-1 flex-shrink-0"
                          style={{ color: CYBER_TEAL }}
                        />
                        <span
                          className="text-base"
                          style={{ color: LIGHT_SLATE }}
                        >
                          {feature}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* CTA Button */}
                <button
                  className="w-full py-4 px-6 rounded-xl font-bold text-lg transition-all duration-300 hover:scale-105 hover:shadow-lg flex items-center justify-center space-x-3"
                  style={{
                    backgroundColor: CYBER_TEAL,
                    color: DEEP_SPACE_BLUE
                  }}
                >
                  <span>Start Building →</span>
                </button>
              </div>
            </Link>

            {/* Learn Capital Markets Card (Right) */}
            <Link to="/learn" className="group block">
              <div
                className="rounded-2xl p-8 border-2 transition-all duration-300 hover:scale-105 hover:shadow-2xl h-full"
                style={{
                  backgroundColor: CORPORATE_NAVY,
                  borderColor: MID_SLATE,
                  boxShadow: `0 10px 30px rgba(0, 0, 0, 0.1)`
                }}
              >
                {/* Icon */}
                <div className="flex justify-center mb-6">
                  <div
                    className="w-20 h-20 rounded-full flex items-center justify-center border-2 group-hover:scale-110 transition-transform duration-300"
                    style={{
                      backgroundColor: `${LIGHT_SLATE}20`,
                      borderColor: LIGHT_SLATE
                    }}
                  >
                    <FaGraduationCap
                      className="text-3xl"
                      style={{ color: LIGHT_SLATE }}
                    />
                  </div>
                </div>

                {/* Title */}
                <h2
                  className="text-3xl font-bold text-center mb-4"
                  style={{ color: LIGHT_SLATE }}
                >
                  Learn Capital Markets
                </h2>

                {/* Description */}
                <p
                  className="text-lg text-center mb-8 leading-relaxed"
                  style={{ color: LIGHT_SLATE }}
                >
                  New to investing? Explore our comprehensive education center to understand capital markets, investment strategies, and financial planning.
                </p>

                {/* Feature List */}
                <div className="mb-8">
                  <div className="space-y-3">
                    {[
                      'Investment fundamentals',
                      'Market analysis techniques',
                      'Risk management strategies',
                      'Portfolio theory basics'
                    ].map((feature, index) => (
                      <div key={index} className="flex items-start space-x-3">
                        <FaCheckCircle
                          className="text-lg mt-1 flex-shrink-0"
                          style={{ color: LIGHT_SLATE }}
                        />
                        <span
                          className="text-base"
                          style={{ color: LIGHT_SLATE }}
                        >
                          {feature}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* CTA Button */}
                <button
                  className="w-full py-4 px-6 rounded-xl font-bold text-lg transition-all duration-300 hover:scale-105 hover:shadow-lg flex items-center justify-center space-x-3"
                  style={{
                    backgroundColor: '#f8fafc',
                    color: DEEP_SPACE_BLUE
                  }}
                >
                  <span>Start Learning →</span>
                </button>
              </div>
            </Link>

          </div>

          {/* Switch Modes Hint */}
          <div className="text-center mt-12">
            <p
              className="text-lg flex items-center justify-center space-x-2"
              style={{ color: MID_SLATE }}
            >
              <FaLightbulb className="text-yellow-400" />
              <span>You can always switch between modes at any time.</span>
            </p>
          </div>
        </div>
      </section>







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
