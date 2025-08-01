import React from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from './contexts/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import Navbar from './components/Navbar';
import Home from './components/Home';
import Login from './components/Login';
import Signup from './components/Signup';
import Dashboard from './components/Dashboard';
import AdvisorHub from './components/AdvisorHub';
import UnitTrustRates from './components/UnitTrustRates';
import Bonds from './components/Bonds';
import Fixeddeposit from './components/Fixeddeposit';
import Goldmarket from './components/Goldmarket';
import Portfoliobuilder from './components/Portfoliobuilder';
import Savingaccount from './components/Savingaccount';
import Sharemarket from './components/Sharemarket';
import WealthWise from './components/learn';
import EducationJourney from './education/EducationJourney';
import './App.css';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />

          {/* Protected Routes */}
          <Route path="/dashboard" element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          } />
          <Route path="/talk-to-an-advisor" element={
            <ProtectedRoute>
              <AdvisorHub />
            </ProtectedRoute>
          } />
          <Route path="/portfolio-builder" element={
            <ProtectedRoute>
              <Portfoliobuilder />
            </ProtectedRoute>
          } />

          {/* Public Routes */}
          <Route path="/unit-trust-rates" element={<UnitTrustRates />} />
          <Route path="/bonds" element={<Bonds />} />
          <Route path="/fixed-deposit" element={<Fixeddeposit />} />
          <Route path="/gold-market" element={<Goldmarket />} />
          <Route path="/saving-account" element={<Savingaccount />} />
          <Route path="/share-market" element={<Sharemarket />} />
          <Route path="/learn" element={<WealthWise />} />
          <Route path="/learn/capital-markets-beginner" element={<EducationJourney />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
