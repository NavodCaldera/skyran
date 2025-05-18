import React, { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/autoplay';
import { Pagination, Autoplay } from 'swiper/modules';
import { COLOR_DARK, COLOR_PRIMARY, COLOR_ACCENT, COLOR_SECONDARY } from '../constants';

const Home = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
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
      {/* Main Section */}
      <div className="flex flex-col md:flex-row items-center justify-between min-h-screen p-12 bg-[#ffffff] mx-auto max-w-screen-xl">
        {/* Left Side */}
        <div className="md:w-1/2 space-y-10 text-center md:text-left">
          <h1 className="text-5xl md:text-8xl font-bold text-transparent bg-clip-text bg-gradient-to-t from-[#181E23] via-[#18426c] to-[#10cfc8]">
            Better Value
          </h1>
          <h1 className="text-5xl md:text-8xl font-bold text-transparent bg-clip-text bg-gradient-to-t from-[#181E23] via-[#18426c] to-[#10cfc8] leading-[1.3] pb-4">
            for Money
          </h1>
          <div className="flex items-center space-x-4 justify-center md:justify-start">
            <img src="/assets/aiimage.jpg" alt="AI icon" className="w-10 h-10 rounded-full" />
            <p className="text-xl md:text-2xl text-[#181E23]">
              Invest with AI powered expert strategies
            </p>
          </div>
        </div>

        {/* Right Side */}
        <div className="md:w-1/2 mt-10 md:mt-0 flex justify-center">
          <img src="/assets/dashboard.jpg" alt="Dashboard" className="max-w-full h-auto rounded-xl shadow-lg" />
        </div>
      </div>


      {/* Opportunities Section */}
      <div id="opportunities" className="w-full text-center py-20 mx-auto max-w-screen-xl">
        <div className="flex justify-center">
          <div className="flip-card max-w-sm">
            <div className="flip-card-inner rounded-lg shadow-sm" style={{ backgroundColor: COLOR_PRIMARY, borderColor: COLOR_SECONDARY }}>
              {/* Front Side */}
              <div className="flip-card-front rounded-lg shadow-sm flex flex-col items-center">
                <a href="#">
                  <img className="rounded-t-lg" src="/assets/saving-rates.jpg" alt="" />
                </a>
                <div className="p-5">
                  <a href="#">
                    <h5
                      className="mb-2 text-2xl font-bold tracking-tight"
                      style={{ color: "#fff" }} // White color for Saving Account
                    >
                      Saving Account
                    </h5>
                  </a>
                  <p className="mb-3 font-normal text-white">
                    A savings account is a secure place to store money while earning interest, helping individuals manage their finances and plan for the future.
                  </p>
                </div>
              </div>
              {/* Back Side */}
              <div className="flip-card-back rounded-lg shadow-sm flex flex-col items-center justify-center p-5" style={{ backgroundColor: COLOR_SECONDARY }}>
                <div className="mb-3 font-normal text-white text-center">
                  <strong>Benefits:</strong>
                  <ul className="list-disc list-inside mt-2 space-y-1">
                    <li>Safe Storage – Protects your money securely.</li>
                    <li>Earn Interest – Grows your savings over time.</li>
                    <li>Easy Access – Allows quick withdrawals when needed.</li>
                  </ul>
                </div>
                <a
                  href="#"
                  className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white rounded-lg mt-4 hover:text-[#181E23]"
                  style={{ backgroundColor: COLOR_ACCENT }}
                >
                  Read more
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>
        {`
.flip-card {
  perspective: 1000px;
  width: 100%;
  max-width: 350px;
  min-height: 400px;
}
.flip-card-inner {
  position: relative;
  width: 100%;
  min-height: 400px;
  transition: transform 0.6s;
  transform-style: preserve-3d;
}
.flip-card:hover .flip-card-inner,
.flip-card:focus-within .flip-card-inner {
  transform: rotateY(180deg);
}
.flip-card-front, .flip-card-back {
  position: absolute;
  width: 100%;
  min-height: 400px;
  backface-visibility: hidden;
}
.flip-card-front {
  z-index: 2;
}
.flip-card-back {
  transform: rotateY(180deg);
  z-index: 1;
  display: flex;
  align-items: center;
  justify-content: center;
}
`}
      </style>


      {/* Opportunities Section */}
      <div id="opportunities" className="w-full text-center py-20 bg-[#ffffff] mx-auto max-w-screen-xl">
        <h2 className="text-5xl md:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-t from-[#181E23] via-[#18426c] to-[#10cfc8]">
          Opportunities
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-10">
          {/* Each Box */}
          {[
            {
              title: "Portfolio Builder",
              img: "portfolio-builder.jpg",
              desc: "Create and manage your portfolio with personalized AI-powered recommendations."
            },
            {
              title: "Saving Rates",
              img: "saving-rates.jpg",
              desc: "Stay updated on the latest saving rates across various banks and institutions."
            },
            {
              title: "Fixed Deposit Rates",
              img: "fixed-deposit-rates.webp",
              desc: "Compare fixed deposit rates to find the best options for your savings goals."
            },
            {
              title: "Bonds (Government/Corporate)",
              img: "bonds.png",
              desc: "Invest in government or corporate bonds for safe and reliable returns."
            },
            {
              title: "Unit Trust",
              img: "unit-trust.jpg",
              desc: "Diversify your investments with unit trusts that pool resources for greater returns."
            },
            {
              title: "Gold Market",
              img: "gold-market.webp",
              desc: "Track gold market trends and make informed decisions for investing in gold."
            },
            {
              title: "Share Market",
              img: "share-market.webp",
              desc: "Get real-time market data and expert insights for making informed stock market investments."
            }
          ].map((item, index) => (
            <div
              key={index}
              className={`group relative min-h-[200px] p-6 bg-cover bg-center rounded-xl shadow-lg ${item.title === "Share Market" ? "sm:col-span-1 lg:col-start-2" : ""
                }`}
              style={{ backgroundImage: `url('/assets/${item.img}')` }}
            >
              <div className="absolute inset-0 bg-gradient-to-t from-[#10cfc8]/40 via-[#18426c]/40 to-[#181E23]/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl flex flex-col justify-center items-center text-center p-4">

                <h3 className="text-3xl font-bold text-white">{item.title}</h3>
                <p className="mt-4 text-lg text-white">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Frequently Asked Questions Section */}
      <section className="mt-20 px-4 max-w-screen-xl mx-auto">
        <h2 className="text-4xl sm:text-5xl font-extrabold text-center bg-gradient-to-t from-[#181E23] via-[#18426c] to-[#10cfc8] text-transparent bg-clip-text mb-12">
          Frequently Asked Questions
        </h2>


        <div className="max-w-3xl mx-auto space-y-4">
          {faqData.map((faq, index) => (
            <div key={index} className="border border-[#18426c] rounded-xl overflow-hidden shadow-md">
              <button
                className="w-full flex justify-between items-center px-6 py-4 text-left text-lg font-semibold bg-white hover:bg-gray-100 transition"
                onClick={() => toggleFAQ(index)}
              >
                {faq.question}
                <span>{openIndex === index ? '-' : '+'}</span>
              </button>
              {openIndex === index && (
                <div className="px-6 py-4 bg-gray-50 text-gray-700 transition-all duration-300">
                  {faq.answer}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>


      {/* Testimonials Section */}
      <div className="w-full bg-white py-20 px-6 mx-auto max-w-screen-xl">
        <h2 className="text-4xl sm:text-5xl font-extrabold text-center bg-gradient-to-t from-[#181E23] via-[#18426c] to-[#10cfc8] text-transparent bg-clip-text mb-12 leading-[1.3] pb-3">
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
              <div className="bg-gray-100 p-6 rounded-xl shadow-md h-full flex flex-col justify-between">
                <p className="text-lg text-gray-700 mb-4">{testimonial.text}</p>
                <div className="flex items-center space-x-4 mt-auto">
                  <img src={testimonial.img} alt={testimonial.name} className="w-12 h-12 rounded-full object-cover" />
                  <div>
                    <h4 className="text-xl font-semibold text-[#18426c]">{testimonial.name}</h4>
                    <p className="text-sm text-gray-500">{testimonial.location}</p>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      <div className="w-full bg-[#18426c] text-white py-10 px-4 text-center">
        <h3 className="text-3xl sm:text-4xl font-bold mb-4">
          Start Investing Now
        </h3>
        <button className="bg-gradient-to-r from-[#10cfc8] to-[#18426c] hover:from-[#18426c] hover:to-[#10cfc8] text-white px-8 py-3 rounded-full text-lg font-semibold transition duration-300">
          Get Started
        </button>
      </div>



    </div>
  );
};

export default Home;
