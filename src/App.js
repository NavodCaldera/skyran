import React from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from './components/Navbar';
import Home from './components/Home';
import UnitTrustRates from './components/UnitTrustRates';
import Bonds from './components/Bonds';
import Fixeddeposit from './components/Fixeddeposit';
import Goldmarket from './components/Goldmarket';
import Portfoliobuilder from './components/Portfoliobuilder';
import Savingaccount from './components/Savingaccount';
import Sharemarket from './components/Sharemarket';
import './App.css';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/unit-trust-rates" element={<UnitTrustRates />} />
        <Route path="/bonds" element={<Bonds />} />
        <Route path="/fixed-deposit" element={<Fixeddeposit />} />
        <Route path="/gold-market" element={<Goldmarket />} />
        <Route path="/portfolio-builder" element={<Portfoliobuilder />} />
        <Route path="/saving-account" element={<Savingaccount />} />
        <Route path="/share-market" element={<Sharemarket />} />
        <Route path="/government-bonds" element={<Bonds />} />
      </Routes>
    </Router>
  );
}

export default App;
