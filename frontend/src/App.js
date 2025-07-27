import React from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from './components/Navbar';
import Home from './components/Home';
import Login from './components/Login';
import Signup from './components/Signup';
import AdvisorHub from './components/AdvisorHub';
import UnitTrustRates from './components/UnitTrustRates';
import Bonds from './components/Bonds';
import Fixeddeposit from './components/Fixeddeposit';
import Goldmarket from './components/Goldmarket';
import Portfoliobuilder from './components/Portfoliobuilder';
import Savingaccount from './components/Savingaccount';
import Sharemarket from './components/Sharemarket';
import WealthWise from './components/learn';
import './App.css';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/talk-to-an-advisor" element={<AdvisorHub />} />
        <Route path="/unit-trust-rates" element={<UnitTrustRates />} />
        <Route path="/bonds" element={<Bonds />} />
        <Route path="/fixed-deposit" element={<Fixeddeposit />} />
        <Route path="/gold-market" element={<Goldmarket />} />
        <Route path="/portfolio-builder" element={<Portfoliobuilder />} />
        <Route path="/saving-account" element={<Savingaccount />} />
        <Route path="/share-market" element={<Sharemarket />} />
        <Route path="/learn" element={<WealthWise />} />
      </Routes>
    </Router>
  );
}

export default App;
