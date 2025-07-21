import React, { useState, useMemo } from 'react';
import {
  DEEP_SPACE_BLUE,
  CORPORATE_NAVY,
  CYBER_TEAL,
  LUMINOUS_ACCENT,
  LIGHT_SLATE,
  MID_SLATE,
  VIBRANT_GREEN
} from '../constants';

// --- Helper Components & Data (kept in one file for simplicity) ---

// Mock data for advisors. In a real app, this would come from your backend API.
const mockAdvisors = [
  {
    id: 1,
    name: 'Nayani Perera',
    title: 'Certified Financial Planner (CFP)',
    image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxMjA3fDB8MXxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&q=80&w=400',
    oneLiner: "Helping young professionals build a confident financial future.",
    specialties: ['Investing for Beginners', 'Retirement Planning', 'Shares'],
    rating: 4.9,
    reviews: 28,
  },
  {
    id: 2,
    name: 'Rohan De Silva',
    title: 'Chartered Financial Analyst (CFA)',
    image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxMjA3fDB8MXxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&q=80&w=400',
    oneLiner: "Strategic wealth management for ambitious goals.",
    specialties: ['Debt Management', 'Unit Trusts', 'Advanced Portfolios'],
    rating: 4.8,
    reviews: 42,
  },
  {
    id: 3,
    name: 'Fathima Rizwan',
    title: 'Wealth Management Specialist',
    image: 'https://images.unsplash.com/photo-1581093450021-95b6a323a6d9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxMjA3fDB8MXxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&q=80&w=400',
    oneLiner: "Making complex finance simple and accessible for everyone.",
    specialties: ['Investing for Beginners', 'Bonds', 'Tax Planning'],
    rating: 5.0,
    reviews: 19,
  },
   {
    id: 4,
    name: 'Kavinda Bandara',
    title: 'Retirement & Estate Planner',
    image: 'https://images.unsplash.com/photo-1627541604085-b851b4c9b2d8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxMjA3fDB8MXxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&q=80&w=400',
    oneLiner: "Securing your legacy, one step at a time.",
    specialties: ['Retirement Planning', 'Tax Planning', 'Advanced Portfolios'],
    rating: 4.7,
    reviews: 35,
  },
];


const FAQItem = ({ question, answer }) => {
    const [isOpen, setIsOpen] = useState(false);
    return (
        <div className="py-4" style={{ borderBottom: `1px solid ${MID_SLATE}` }}>
            <button
                className="w-full flex justify-between items-center text-left text-lg font-semibold"
                style={{ color: LIGHT_SLATE }}
                onClick={() => setIsOpen(!isOpen)}
            >
                <span>{question}</span>
                <span
                    className={`transform transition-transform duration-300 ${isOpen ? 'rotate-180' : 'rotate-0'}`}
                    style={{ color: CYBER_TEAL }}
                >
                    ▼
                </span>
            </button>
            {isOpen && (
                <div className="mt-4 animate-fade-in" style={{ color: MID_SLATE }}>
                    <p>{answer}</p>
                </div>
            )}
        </div>
    );
};


// --- The Main Component ---

export default function AdvisorHub() {
    const allSpecialties = useMemo(() => {
        const specialties = new Set();
        mockAdvisors.forEach(advisor => advisor.specialties.forEach(spec => specialties.add(spec)));
        return ['All', ...Array.from(specialties)];
    }, []);

    const [activeFilter, setActiveFilter] = useState('All');

    const filteredAdvisors = useMemo(() => {
        if (activeFilter === 'All') return mockAdvisors;
        return mockAdvisors.filter(advisor => advisor.specialties.includes(activeFilter));
    }, [activeFilter]);
    
    return (
        <div style={{ backgroundColor: DEEP_SPACE_BLUE, color: LIGHT_SLATE }}>

            {/* Section 1: The Hook */}
            <section className="relative text-center py-20 md:py-32" style={{ backgroundColor: `${CORPORATE_NAVY}33` }}>
                 <div className="absolute inset-0 bg-cover bg-center opacity-10" style={{ backgroundImage: `url('https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&w=1200&q=80')`}}></div>
                 <div className="relative container mx-auto px-4 animate-fade-in">
                    <h1 className="text-4xl md:text-6xl font-bold leading-tight" style={{ color: LIGHT_SLATE }}>
                        Personalized Guidance, <span style={{ color: CYBER_TEAL }}>On Your Terms.</span>
                    </h1>
                    <p className="mt-4 max-w-2xl mx-auto text-lg" style={{ color: MID_SLATE }}>
                        Connect with a certified financial advisor for a one-on-one consultation. Get clarity, build confidence, and ask any question—big or small.
                    </p>
                    <a
                        href="#advisor-hub"
                        className="mt-8 inline-block font-bold text-lg rounded-full py-3 px-8 transition hover:scale-105 hover:opacity-90"
                        style={{ backgroundColor: CYBER_TEAL, color: DEEP_SPACE_BLUE }}
                    >
                        Browse Our Advisors
                    </a>
                 </div>
            </section>
            
            {/* Section 2: Meet the Advisors - The Marketplace */}
            <section id="advisor-hub" className="py-20">
                <div className="container mx-auto px-4">
                    <h2 className="text-3xl md:text-4xl font-bold text-center mb-4" style={{ color: LIGHT_SLATE }}>Meet Your Expert Advisors</h2>
                    <p className="text-center mb-10 max-w-xl mx-auto" style={{ color: MID_SLATE }}>Find the right expert to help you achieve your financial goals.</p>

                    {/* Filter Tags */}
                    <div className="flex flex-wrap justify-center gap-3 mb-12">
                         {allSpecialties.map(spec => (
                            <button
                                key={spec}
                                onClick={() => setActiveFilter(spec)}
                                className="px-4 py-2 rounded-full font-semibold transition text-sm hover:opacity-90"
                                style={{
                                    backgroundColor: activeFilter === spec ? CYBER_TEAL : CORPORATE_NAVY,
                                    color: activeFilter === spec ? DEEP_SPACE_BLUE : LIGHT_SLATE
                                }}
                            >
                                {spec}
                            </button>
                         ))}
                    </div>

                    {/* Advisor Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                         {filteredAdvisors.map(advisor => (
                            <div
                                key={advisor.id}
                                className="rounded-lg shadow-lg overflow-hidden transform transition duration-300 hover:-translate-y-2 hover:shadow-2xl"
                                style={{
                                    backgroundColor: CORPORATE_NAVY,
                                    boxShadow: `0 10px 25px ${CYBER_TEAL}10`
                                }}
                            >
                                <img src={advisor.image} alt={advisor.name} className="w-full h-56 object-cover"/>
                                <div className="p-6">
                                    <h3 className="text-xl font-bold" style={{ color: LIGHT_SLATE }}>{advisor.name}</h3>
                                    <p className="text-sm font-semibold" style={{ color: CYBER_TEAL }}>{advisor.title}</p>
                                    <p className="my-4 text-sm italic" style={{ color: MID_SLATE }}>"{advisor.oneLiner}"</p>
                                    <div className="flex flex-wrap gap-2 mb-4">
                                        {advisor.specialties.map(spec =>
                                            <span
                                                key={spec}
                                                className="text-xs font-semibold rounded-full px-3 py-1"
                                                style={{ backgroundColor: DEEP_SPACE_BLUE, color: LIGHT_SLATE }}
                                            >
                                                {spec}
                                            </span>
                                        )}
                                    </div>
                                    <div className="flex justify-between items-center text-sm mb-6" style={{ color: MID_SLATE }}>
                                        <span>⭐ {advisor.rating} ({advisor.reviews} reviews)</span>
                                        <span className="font-semibold" style={{ color: VIBRANT_GREEN }}>Available Tomorrow</span>
                                    </div>
                                    <button
                                        className="w-full text-center py-2 px-4 rounded-full font-semibold transition hover:opacity-90"
                                        style={{ backgroundColor: CYBER_TEAL, color: DEEP_SPACE_BLUE }}
                                    >
                                        View Profile & Schedule →
                                    </button>
                                </div>
                            </div>
                         ))}
                    </div>
                     {filteredAdvisors.length === 0 && (
                        <p className="text-center mt-8" style={{ color: MID_SLATE }}>No advisors found with this specialty. Try another filter.</p>
                     )}
                </div>
            </section>
            
            {/* Section 3: How It Works */}
            <section className="py-20 bg-slate-800/30">
                <div className="container mx-auto px-4 text-center">
                    <h2 className="text-3xl md:text-4xl font-bold mb-12">Just 3 Simple Steps</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                        <div className="flex flex-col items-center">
                            <div className="w-20 h-20 rounded-full bg-teal-500/10 border-2 border-teal-400 flex items-center justify-center text-3xl mb-4">1</div>
                            <h3 className="text-2xl font-bold mb-2">Find Your Expert</h3>
                            <p className="text-slate-300 max-w-xs">Browse profiles, specialties, and reviews to find the perfect advisor for you.</p>
                        </div>
                         <div className="flex flex-col items-center">
                            <div className="w-20 h-20 rounded-full bg-teal-500/10 border-2 border-teal-400 flex items-center justify-center text-3xl mb-4">2</div>
                            <h3 className="text-2xl font-bold mb-2">Pick a Time</h3>
                            <p className="text-slate-300 max-w-xs">View their real-time calendar and book a time that fits your schedule.</p>
                        </div>
                         <div className="flex flex-col items-center">
                            <div className="w-20 h-20 rounded-full bg-teal-500/10 border-2 border-teal-400 flex items-center justify-center text-3xl mb-4">3</div>
                            <h3 className="text-2xl font-bold mb-2">Meet Online</h3>
                            <p className="text-slate-300 max-w-xs">Join a secure video call to get personalized advice and answers to your questions.</p>
                        </div>
                    </div>
                </div>
            </section>

             {/* Section 4: Consultation Styles */}
             <section className="py-20">
                <div className="container mx-auto px-4 text-center">
                    <h2 className="text-3xl md:text-4xl font-bold mb-12">Choose Your Consultation Style</h2>
                     <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
                        <div className="p-8 rounded-lg bg-slate-800 border-2 border-slate-700">
                            <h3 className="text-2xl font-bold text-teal-400 mb-2">Quick Chat</h3>
                            <p className="text-4xl font-bold mb-4">20 <span className="text-lg font-normal">min</span></p>
                            <p className="text-slate-300 mb-6 h-20">Perfect for 1-2 specific questions or getting a second opinion.</p>
                            <p className="text-2xl font-semibold mb-6">LKR 2,500</p>
                            <button className="w-full text-center py-2 px-4 rounded-full font-semibold bg-slate-700 text-white transition hover:bg-slate-600">Book a Quick Chat</button>
                        </div>
                        <div className="p-8 rounded-lg bg-slate-900 border-2 border-teal-400 relative shadow-xl shadow-teal-500/10">
                             <span className="absolute top-0 -translate-y-1/2 left-1/2 -translate-x-1/2 bg-teal-400 text-slate-900 text-xs font-bold uppercase px-3 py-1 rounded-full">Most Popular</span>
                            <h3 className="text-2xl font-bold text-teal-400 mb-2">Deep Dive</h3>
                            <p className="text-4xl font-bold mb-4">50 <span className="text-lg font-normal">min</span></p>
                            <p className="text-slate-300 mb-6 h-20">A full portfolio review or creating a long-term financial plan.</p>
                             <p className="text-2xl font-semibold mb-6">LKR 6,000</p>
                            <button className="w-full text-center py-2 px-4 rounded-full font-semibold bg-teal-500 text-slate-900 transition hover:bg-teal-400">Book a Deep Dive</button>
                        </div>
                        <div className="p-8 rounded-lg bg-slate-800 border-2 border-slate-700">
                             <h3 className="text-2xl font-bold text-teal-400 mb-2">Text Advisor</h3>
                            <p className="text-4xl font-bold mb-4">7 <span className="text-lg font-normal">Days</span></p>
                            <p className="text-slate-300 mb-6 h-20">Prefer messaging? Get your questions answered via secure chat.</p>
                            <p className="text-2xl font-semibold mb-6">LKR 4,000</p>
                            <button className="w-full text-center py-2 px-4 rounded-full font-semibold bg-slate-700 text-white transition hover:bg-slate-600">Start Texting</button>
                        </div>
                     </div>
                </div>
            </section>
            
            {/* Section 5: FAQ */}
            <section className="py-20 bg-slate-900/40">
                <div className="container mx-auto px-4 max-w-3xl">
                    <h2 className="text-3xl md:text-4xl font-bold text-center mb-10">Frequently Asked Questions</h2>
                    <FAQItem 
                        question="Is this a sales pitch to buy products?" 
                        answer="Absolutely not. Skyran is an education-first platform. Our advisors provide objective, no-commitment advice focused on your best interests. Their goal is to empower you with knowledge, not to sell you specific financial products." 
                    />
                     <FAQItem 
                        question="Are the advisors certified and vetted?" 
                        answer="Yes. Every advisor on our platform is a certified professional (such as CFP® or CFA®) and undergoes a rigorous vetting process. We verify their credentials, experience, and commitment to ethical, client-first advice." 
                    />
                    <FAQItem 
                        question="Is my information private and secure?" 
                        answer="Your privacy is our top priority. All communications, both video and text, are encrypted. We never share your personal data without your explicit consent. Please review our full Privacy Policy for details." 
                    />
                    <FAQItem 
                        question="What should I prepare for my first session?" 
                        answer="To get the most value, we recommend thinking about your main financial question or goal beforehand. You can also prepare a simple list of your income, major expenses, and any existing investments if you'd like to discuss your portfolio." 
                    />
                </div>
            </section>
            
        </div>
    );
}