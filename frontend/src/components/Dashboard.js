import React, { useState, useEffect } from 'react';
import { FaUniversity, FaCalendarAlt, FaPercentage, FaRupeeSign, FaPiggyBank, FaChartLine, FaCoins, FaUser } from 'react-icons/fa';
import { useAuth } from '../contexts/AuthContext';
import FixedDepositsTab from './FixedDepositsTab';
import EmergencyFundTab from './EmergencyFundTab';
import {
  DEEP_SPACE_BLUE,
  CORPORATE_NAVY,
  CYBER_TEAL,
  LUMINOUS_ACCENT,
  LIGHT_SLATE,
  MID_SLATE,
  CHART_SKY_BLUE,
  WARNING_AMBER
} from '../constants';

const Dashboard = () => {
  const { user } = useAuth();

  // Tab management
  const [activeTab, setActiveTab] = useState('fixedDeposits');

  // Sample data for fixed deposits
  const [fixedDeposits, setFixedDeposits] = useState([
    {
      id: 1,
      bank: 'HDFC Bank',
      principal: 100000,
      interestRate: 7.1,
      depositDate: '2024-10-23',
      maturityDate: '2025-10-23',
      maturityAmount: 107100
    },
    {
      id: 2,
      bank: 'State Bank of India',
      principal: 50000,
      interestRate: 6.8,
      depositDate: '2025-01-15',
      maturityDate: '2026-01-15',
      maturityAmount: 53400
    },
    {
      id: 3,
      bank: 'Commercial Bank of Ceylon',
      principal: 75000,
      interestRate: 8.2,
      depositDate: '2024-06-10',
      maturityDate: '2026-06-10',
      maturityAmount: 87630
    }
  ]);

  // Emergency fund data
  const [emergencyFund, setEmergencyFund] = useState({
    bank: 'Sampath Bank',
    balance: 500000
  });

  // Tab configuration
  const tabs = [
    { id: 'fixedDeposits', label: 'Fixed Deposits', icon: FaUniversity, enabled: true },
    { id: 'emergencyFund', label: 'Emergency Fund', icon: FaPiggyBank, enabled: true },
    { id: 'stocks', label: 'Stocks', icon: FaChartLine, enabled: false },
    { id: 'unitTrusts', label: 'Unit Trusts', icon: FaCoins, enabled: false }
  ];

  // Calculate unified summary statistics
  const totalInvestment = fixedDeposits.reduce((sum, fd) => sum + fd.principal, 0) + emergencyFund.balance;
  // Note: Total Maturity and Average Rate are currently FD-specific but will be updated as more asset types are added
  const totalMaturityValue = fixedDeposits.reduce((sum, fd) => sum + fd.maturityAmount, 0);
  const averageInterestRate = fixedDeposits.length > 0
    ? (fixedDeposits.reduce((sum, fd) => sum + (fd.interestRate * fd.principal), 0) / fixedDeposits.reduce((sum, fd) => sum + fd.principal, 0)).toFixed(2)
    : 0;

  // Email notification simulation
  useEffect(() => {
    const checkMaturitiesAndNotify = () => {
      const today = new Date();

      fixedDeposits.forEach(fd => {
        const maturityDate = new Date(fd.maturityDate);
        const timeDiff = maturityDate.getTime() - today.getTime();
        const daysDiff = Math.ceil(timeDiff / (1000 * 3600 * 24));

        if (daysDiff === 30) {
          console.log(`API_CALL_SIMULATION: Sending 30-day maturity email reminder for FD #${fd.id} at ${fd.bank}.`);
        } else if (daysDiff === 7) {
          console.log(`API_CALL_SIMULATION: Sending 7-day maturity email reminder for FD #${fd.id} at ${fd.bank}.`);
        }
      });
    };

    checkMaturitiesAndNotify();
  }, [fixedDeposits]);

  // Format currency
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'LKR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };

  // Format date
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-GB', {
      day: '2-digit',
      month: 'short',
      year: 'numeric'
    });
  };



  // Render active tab content
  const renderTabContent = () => {
    switch (activeTab) {
      case 'fixedDeposits':
        return (
          <FixedDepositsTab
            fixedDeposits={fixedDeposits}
            setFixedDeposits={setFixedDeposits}
            formatCurrency={formatCurrency}
          />
        );
      case 'emergencyFund':
        return (
          <EmergencyFundTab
            emergencyFund={emergencyFund}
            setEmergencyFund={setEmergencyFund}
            formatCurrency={formatCurrency}
          />
        );
      case 'stocks':
      case 'unitTrusts':
        return (
          <div className="text-center py-16">
            <div className="mb-4">
              <div
                className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4"
                style={{ backgroundColor: `${MID_SLATE}20` }}
              >
                <FaChartLine className="text-3xl" style={{ color: MID_SLATE }} />
              </div>
              <h3 className="text-xl font-semibold mb-2" style={{ color: MID_SLATE }}>
                Coming Soon
              </h3>
              <p style={{ color: MID_SLATE }}>
                This feature will be available in a future update.
              </p>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen" style={{ backgroundColor: DEEP_SPACE_BLUE }}>
      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Dashboard Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold mb-2" style={{ color: LIGHT_SLATE }}>
                Welcome back, {user?.first_name || 'User'}!
              </h1>
              <p className="text-lg" style={{ color: MID_SLATE }}>
                Track and manage your investment portfolio
              </p>
            </div>
            <div className="hidden md:flex items-center space-x-4">
              <div className="text-right">
                <p className="text-sm" style={{ color: MID_SLATE }}>
                  Last login
                </p>
                <p className="font-medium" style={{ color: LIGHT_SLATE }}>
                  {new Date().toLocaleDateString()}
                </p>
              </div>
              <div className="w-12 h-12 rounded-full flex items-center justify-center"
                   style={{ backgroundColor: CYBER_TEAL, color: DEEP_SPACE_BLUE }}>
                <span className="text-lg font-bold">
                  {user?.first_name?.charAt(0)?.toUpperCase() || 'U'}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {/* Total Investment Card */}
          <div
            className="p-6 rounded-xl border transition-all duration-200 hover:border-opacity-80"
            style={{
              backgroundColor: CORPORATE_NAVY,
              borderColor: CYBER_TEAL + '40'
            }}
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold" style={{ color: LIGHT_SLATE }}>
                Total Investment
              </h3>
              <FaRupeeSign className="text-2xl" style={{ color: CYBER_TEAL }} />
            </div>
            <p className="text-3xl font-bold" style={{ color: CYBER_TEAL }}>
              {formatCurrency(totalInvestment)}
            </p>
            <p className="text-sm mt-2" style={{ color: MID_SLATE }}>
              Across all assets
            </p>
          </div>

          {/* Total Maturity Value Card */}
          <div
            className="p-6 rounded-xl border transition-all duration-200 hover:border-opacity-80"
            style={{
              backgroundColor: CORPORATE_NAVY,
              borderColor: CHART_SKY_BLUE + '40'
            }}
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold" style={{ color: LIGHT_SLATE }}>
                Total Maturity Value
              </h3>
              <FaCalendarAlt className="text-2xl" style={{ color: CHART_SKY_BLUE }} />
            </div>
            <p className="text-3xl font-bold" style={{ color: CHART_SKY_BLUE }}>
              {formatCurrency(totalMaturityValue)}
            </p>
            <p className="text-sm mt-2" style={{ color: MID_SLATE }}>
              Expected returns: {formatCurrency(totalMaturityValue - totalInvestment)}
            </p>
          </div>

          {/* Average Interest Rate Card */}
          <div
            className="p-6 rounded-xl border transition-all duration-200 hover:border-opacity-80"
            style={{
              backgroundColor: CORPORATE_NAVY,
              borderColor: LUMINOUS_ACCENT + '40'
            }}
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold" style={{ color: LIGHT_SLATE }}>
                Average Interest Rate
              </h3>
              <FaPercentage className="text-2xl" style={{ color: LUMINOUS_ACCENT }} />
            </div>
            <p className="text-3xl font-bold" style={{ color: LUMINOUS_ACCENT }}>
              {averageInterestRate}%
            </p>
            <p className="text-sm mt-2" style={{ color: MID_SLATE }}>
              Weighted average p.a.
            </p>
          </div>
        </div>

        {/* Tabs Navigation */}
        <div className="mb-8">
          <div className="flex space-x-1 p-1 rounded-lg" style={{ backgroundColor: CORPORATE_NAVY }}>
            {tabs.map((tab) => {
              const IconComponent = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => tab.enabled && setActiveTab(tab.id)}
                  disabled={!tab.enabled}
                  className={`flex items-center space-x-2 px-4 py-3 rounded-lg font-medium transition-all duration-200 ${
                    tab.enabled ? 'hover:scale-105' : 'cursor-not-allowed opacity-50'
                  }`}
                  style={{
                    backgroundColor: activeTab === tab.id ? CYBER_TEAL : 'transparent',
                    color: activeTab === tab.id ? DEEP_SPACE_BLUE : tab.enabled ? LIGHT_SLATE : MID_SLATE
                  }}
                >
                  <IconComponent className="text-lg" />
                  <span>{tab.label}</span>
                  {!tab.enabled && (
                    <span className="text-xs px-2 py-1 rounded-full" style={{ backgroundColor: WARNING_AMBER, color: DEEP_SPACE_BLUE }}>
                      Soon
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Tab Content */}
        <div>
          {renderTabContent()}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
