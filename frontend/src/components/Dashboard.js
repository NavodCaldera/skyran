import React, { useState } from 'react';
import { FaPlus, FaEllipsisV, FaEdit, FaTrash, FaTimes, FaUniversity, FaCalendarAlt, FaPercentage, FaRupeeSign } from 'react-icons/fa';
import {
  DEEP_SPACE_BLUE,
  CORPORATE_NAVY,
  CYBER_TEAL,
  LUMINOUS_ACCENT,
  LIGHT_SLATE,
  MID_SLATE,
  CHART_SKY_BLUE
} from '../constants';

const Dashboard = () => {
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

  const [showModal, setShowModal] = useState(false);
  const [editingFD, setEditingFD] = useState(null);
  const [showOptionsMenu, setShowOptionsMenu] = useState(null);

  // Form state
  const [formData, setFormData] = useState({
    bank: '',
    principal: '',
    interestRate: '',
    depositDate: '',
    maturityDate: ''
  });

  // Calculate summary metrics
  const totalInvestment = fixedDeposits.reduce((sum, fd) => sum + fd.principal, 0);
  const totalMaturityValue = fixedDeposits.reduce((sum, fd) => sum + fd.maturityAmount, 0);
  const averageInterestRate = fixedDeposits.length > 0 
    ? (fixedDeposits.reduce((sum, fd) => sum + (fd.interestRate * fd.principal), 0) / totalInvestment).toFixed(2)
    : 0;

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

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Calculate maturity amount (simple interest for 1 year)
    const principal = parseFloat(formData.principal);
    const rate = parseFloat(formData.interestRate);
    const maturityAmount = principal + (principal * rate / 100);

    const newFD = {
      id: editingFD ? editingFD.id : Date.now(),
      bank: formData.bank,
      principal: principal,
      interestRate: rate,
      depositDate: formData.depositDate,
      maturityDate: formData.maturityDate,
      maturityAmount: maturityAmount
    };

    if (editingFD) {
      setFixedDeposits(fixedDeposits.map(fd => fd.id === editingFD.id ? newFD : fd));
    } else {
      setFixedDeposits([...fixedDeposits, newFD]);
    }

    // Reset form and close modal
    setFormData({
      bank: '',
      principal: '',
      interestRate: '',
      depositDate: '',
      maturityDate: ''
    });
    setShowModal(false);
    setEditingFD(null);
  };

  // Handle edit
  const handleEdit = (fd) => {
    setEditingFD(fd);
    setFormData({
      bank: fd.bank,
      principal: fd.principal.toString(),
      interestRate: fd.interestRate.toString(),
      depositDate: fd.depositDate,
      maturityDate: fd.maturityDate
    });
    setShowModal(true);
    setShowOptionsMenu(null);
  };

  // Handle delete
  const handleDelete = (id) => {
    setFixedDeposits(fixedDeposits.filter(fd => fd.id !== id));
    setShowOptionsMenu(null);
  };

  return (
    <div className="min-h-screen" style={{ backgroundColor: DEEP_SPACE_BLUE }}>
      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Dashboard Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2" style={{ color: LIGHT_SLATE }}>
            Fixed Deposits Overview
          </h1>
          <p className="text-lg" style={{ color: MID_SLATE }}>
            Track and manage your fixed deposit investments
          </p>
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
              Across {fixedDeposits.length} deposits
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

        {/* Add New FD Button */}
        <div className="mb-6">
          <button
            onClick={() => setShowModal(true)}
            className="flex items-center space-x-2 px-6 py-3 rounded-lg font-semibold transition-all duration-200 hover:scale-105 hover:shadow-lg"
            style={{
              backgroundColor: CYBER_TEAL,
              color: DEEP_SPACE_BLUE,
              boxShadow: `0 4px 15px ${CYBER_TEAL}40`
            }}
          >
            <FaPlus />
            <span>Add New Fixed Deposit</span>
          </button>
        </div>

        {/* Fixed Deposits List */}
        <div className="space-y-4">
          <h2 className="text-2xl font-bold mb-4" style={{ color: LIGHT_SLATE }}>
            Your Fixed Deposits
          </h2>
          
          {fixedDeposits.length === 0 ? (
            <div
              className="text-center py-12 rounded-xl border-2 border-dashed"
              style={{ borderColor: MID_SLATE }}
            >
              <FaUniversity className="text-6xl mx-auto mb-4" style={{ color: MID_SLATE }} />
              <h3 className="text-xl font-semibold mb-2" style={{ color: LIGHT_SLATE }}>
                No Fixed Deposits Yet
              </h3>
              <p className="text-lg mb-6" style={{ color: MID_SLATE }}>
                Start building your portfolio by adding your first fixed deposit
              </p>
              <button
                onClick={() => setShowModal(true)}
                className="px-6 py-3 rounded-lg font-semibold transition-all duration-200 hover:scale-105"
                style={{
                  backgroundColor: CYBER_TEAL,
                  color: DEEP_SPACE_BLUE
                }}
              >
                Add Your First FD
              </button>
            </div>
          ) : (
            fixedDeposits.map((fd) => (
              <div
                key={fd.id}
                className="p-6 rounded-xl border transition-all duration-200 hover:border-opacity-80 relative"
                style={{
                  backgroundColor: CORPORATE_NAVY,
                  borderColor: MID_SLATE
                }}
              >
                <div className="grid grid-cols-1 md:grid-cols-5 gap-4 items-center">
                  {/* Bank Name */}
                  <div className="flex items-center space-x-3">
                    <div
                      className="w-12 h-12 rounded-full flex items-center justify-center"
                      style={{ backgroundColor: CYBER_TEAL + '20' }}
                    >
                      <FaUniversity className="text-xl" style={{ color: CYBER_TEAL }} />
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg" style={{ color: LIGHT_SLATE }}>
                        {fd.bank}
                      </h3>
                      <p className="text-sm" style={{ color: MID_SLATE }}>
                        Deposit #{fd.id}
                      </p>
                    </div>
                  </div>

                  {/* Principal Amount */}
                  <div className="text-center md:text-left">
                    <p className="text-sm font-medium" style={{ color: MID_SLATE }}>
                      Principal Amount
                    </p>
                    <p className="text-xl font-bold" style={{ color: LIGHT_SLATE }}>
                      {formatCurrency(fd.principal)}
                    </p>
                  </div>

                  {/* Interest Rate */}
                  <div className="text-center md:text-left">
                    <p className="text-sm font-medium" style={{ color: MID_SLATE }}>
                      Interest Rate
                    </p>
                    <p className="text-xl font-bold" style={{ color: CHART_SKY_BLUE }}>
                      {fd.interestRate}% p.a.
                    </p>
                  </div>

                  {/* Maturity Date */}
                  <div className="text-center md:text-left">
                    <p className="text-sm font-medium" style={{ color: MID_SLATE }}>
                      Maturity Date
                    </p>
                    <p className="text-lg font-semibold" style={{ color: LIGHT_SLATE }}>
                      {formatDate(fd.maturityDate)}
                    </p>
                  </div>

                  {/* Maturity Amount */}
                  <div className="text-center md:text-right">
                    <p className="text-sm font-medium" style={{ color: MID_SLATE }}>
                      Maturity Amount
                    </p>
                    <p className="text-xl font-bold" style={{ color: LUMINOUS_ACCENT }}>
                      {formatCurrency(fd.maturityAmount)}
                    </p>
                  </div>
                </div>

                {/* Options Menu */}
                <div className="absolute top-4 right-4">
                  <button
                    onClick={() => setShowOptionsMenu(showOptionsMenu === fd.id ? null : fd.id)}
                    className="p-2 rounded-lg transition-all duration-200 hover:bg-opacity-20"
                    style={{ color: MID_SLATE, backgroundColor: 'transparent' }}
                  >
                    <FaEllipsisV />
                  </button>
                  
                  {showOptionsMenu === fd.id && (
                    <div
                      className="absolute right-0 top-10 w-32 rounded-lg border shadow-lg z-10"
                      style={{
                        backgroundColor: CORPORATE_NAVY,
                        borderColor: MID_SLATE
                      }}
                    >
                      <button
                        onClick={() => handleEdit(fd)}
                        className="w-full flex items-center space-x-2 px-4 py-2 text-left hover:bg-opacity-20 transition-all duration-200"
                        style={{ color: LIGHT_SLATE }}
                      >
                        <FaEdit />
                        <span>Edit</span>
                      </button>
                      <button
                        onClick={() => handleDelete(fd.id)}
                        className="w-full flex items-center space-x-2 px-4 py-2 text-left hover:bg-opacity-20 transition-all duration-200"
                        style={{ color: '#ef4444' }}
                      >
                        <FaTrash />
                        <span>Delete</span>
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Add/Edit Fixed Deposit Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div
            className="w-full max-w-md rounded-xl shadow-2xl"
            style={{ backgroundColor: CORPORATE_NAVY }}
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between p-6 border-b" style={{ borderColor: MID_SLATE }}>
              <h2 className="text-2xl font-bold" style={{ color: LIGHT_SLATE }}>
                {editingFD ? 'Edit Fixed Deposit' : 'Add New Fixed Deposit'}
              </h2>
              <button
                onClick={() => {
                  setShowModal(false);
                  setEditingFD(null);
                  setFormData({
                    bank: '',
                    principal: '',
                    interestRate: '',
                    depositDate: '',
                    maturityDate: ''
                  });
                }}
                className="p-2 rounded-lg transition-all duration-200 hover:bg-opacity-20"
                style={{ color: MID_SLATE }}
              >
                <FaTimes className="text-xl" />
              </button>
            </div>

            {/* Modal Form */}
            <form onSubmit={handleSubmit} className="p-6 space-y-6">
              {/* Bank/Finance Company */}
              <div>
                <label className="block text-sm font-medium mb-2" style={{ color: LIGHT_SLATE }}>
                  Bank / Finance Company
                </label>
                <input
                  type="text"
                  value={formData.bank}
                  onChange={(e) => setFormData({ ...formData, bank: e.target.value })}
                  className="w-full p-3 rounded-lg border-2 focus:outline-none focus:ring-2 transition-all duration-200"
                  style={{
                    backgroundColor: DEEP_SPACE_BLUE,
                    borderColor: MID_SLATE,
                    color: LIGHT_SLATE
                  }}
                  placeholder="e.g., HDFC Bank"
                  required
                />
              </div>

              {/* Principal Amount */}
              <div>
                <label className="block text-sm font-medium mb-2" style={{ color: LIGHT_SLATE }}>
                  Principal Deposit Amount (LKR)
                </label>
                <input
                  type="number"
                  value={formData.principal}
                  onChange={(e) => setFormData({ ...formData, principal: e.target.value })}
                  className="w-full p-3 rounded-lg border-2 focus:outline-none focus:ring-2 transition-all duration-200"
                  style={{
                    backgroundColor: DEEP_SPACE_BLUE,
                    borderColor: MID_SLATE,
                    color: LIGHT_SLATE
                  }}
                  placeholder="100000"
                  min="1000"
                  required
                />
              </div>

              {/* Interest Rate */}
              <div>
                <label className="block text-sm font-medium mb-2" style={{ color: LIGHT_SLATE }}>
                  Interest Rate (% per annum)
                </label>
                <input
                  type="number"
                  step="0.1"
                  value={formData.interestRate}
                  onChange={(e) => setFormData({ ...formData, interestRate: e.target.value })}
                  className="w-full p-3 rounded-lg border-2 focus:outline-none focus:ring-2 transition-all duration-200"
                  style={{
                    backgroundColor: DEEP_SPACE_BLUE,
                    borderColor: MID_SLATE,
                    color: LIGHT_SLATE
                  }}
                  placeholder="7.5"
                  min="0.1"
                  max="20"
                  required
                />
              </div>

              {/* Deposit Date */}
              <div>
                <label className="block text-sm font-medium mb-2" style={{ color: LIGHT_SLATE }}>
                  Deposit Date
                </label>
                <input
                  type="date"
                  value={formData.depositDate}
                  onChange={(e) => setFormData({ ...formData, depositDate: e.target.value })}
                  className="w-full p-3 rounded-lg border-2 focus:outline-none focus:ring-2 transition-all duration-200"
                  style={{
                    backgroundColor: DEEP_SPACE_BLUE,
                    borderColor: MID_SLATE,
                    color: LIGHT_SLATE
                  }}
                  required
                />
              </div>

              {/* Maturity Date */}
              <div>
                <label className="block text-sm font-medium mb-2" style={{ color: LIGHT_SLATE }}>
                  Maturity Date
                </label>
                <input
                  type="date"
                  value={formData.maturityDate}
                  onChange={(e) => setFormData({ ...formData, maturityDate: e.target.value })}
                  className="w-full p-3 rounded-lg border-2 focus:outline-none focus:ring-2 transition-all duration-200"
                  style={{
                    backgroundColor: DEEP_SPACE_BLUE,
                    borderColor: MID_SLATE,
                    color: LIGHT_SLATE
                  }}
                  required
                />
              </div>

              {/* Form Buttons */}
              <div className="flex space-x-4 pt-4">
                <button
                  type="button"
                  onClick={() => {
                    setShowModal(false);
                    setEditingFD(null);
                    setFormData({
                      bank: '',
                      principal: '',
                      interestRate: '',
                      depositDate: '',
                      maturityDate: ''
                    });
                  }}
                  className="flex-1 py-3 px-4 rounded-lg font-semibold transition-all duration-200 hover:opacity-80"
                  style={{
                    backgroundColor: MID_SLATE,
                    color: LIGHT_SLATE
                  }}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-3 px-4 rounded-lg font-semibold transition-all duration-200 hover:scale-105"
                  style={{
                    backgroundColor: CYBER_TEAL,
                    color: DEEP_SPACE_BLUE,
                    boxShadow: `0 4px 15px ${CYBER_TEAL}40`
                  }}
                >
                  {editingFD ? 'Update Deposit' : 'Save Deposit'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
