import React, { useState } from 'react';
import { FaPlus, FaEllipsisV, FaEdit, FaTrash, FaTimes, FaUniversity, FaCalendarAlt, FaExclamationTriangle } from 'react-icons/fa';
import {
  DEEP_SPACE_BLUE,
  CORPORATE_NAVY,
  CYBER_TEAL,
  LUMINOUS_ACCENT,
  LIGHT_SLATE,
  MID_SLATE,
  CHART_SKY_BLUE,
  WARNING_AMBER,
  ERROR_RED
} from '../constants';

const FixedDepositsTab = ({ fixedDeposits, setFixedDeposits, formatCurrency }) => {
  const [showModal, setShowModal] = useState(false);
  const [editingFD, setEditingFD] = useState(null);
  const [showOptionsMenu, setShowOptionsMenu] = useState(null);
  const [formData, setFormData] = useState({
    bank: '',
    principal: '',
    interestRate: '',
    depositDate: '',
    maturityDate: ''
  });

  // Format date
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-GB', {
      day: '2-digit',
      month: 'short',
      year: 'numeric'
    });
  };

  // Calculate days until maturity
  const getDaysUntilMaturity = (maturityDate) => {
    const today = new Date();
    const maturity = new Date(maturityDate);
    const timeDiff = maturity.getTime() - today.getTime();
    return Math.ceil(timeDiff / (1000 * 3600 * 24));
  };

  // Get maturity status styling
  const getMaturityStatus = (maturityDate) => {
    const days = getDaysUntilMaturity(maturityDate);
    
    if (days <= 7 && days > 0) {
      return {
        borderColor: ERROR_RED,
        badgeColor: ERROR_RED,
        badgeText: `Matures in ${days} day${days === 1 ? '' : 's'}`,
        icon: FaExclamationTriangle,
        glow: true
      };
    } else if (days <= 30 && days > 7) {
      return {
        borderColor: WARNING_AMBER,
        badgeColor: WARNING_AMBER,
        badgeText: `Matures in ${days} days`,
        icon: FaCalendarAlt,
        glow: true
      };
    } else if (days <= 0) {
      return {
        borderColor: ERROR_RED,
        badgeColor: ERROR_RED,
        badgeText: 'Matured',
        icon: FaExclamationTriangle,
        glow: true
      };
    }
    
    return {
      borderColor: MID_SLATE,
      badgeColor: null,
      badgeText: null,
      icon: null,
      glow: false
    };
  };

  // Handle form submission with improved maturity calculation
  const handleSubmit = (e) => {
    e.preventDefault();
    
    const principal = parseFloat(formData.principal);
    const rate = parseFloat(formData.interestRate);
    const depositDate = new Date(formData.depositDate);
    const maturityDate = new Date(formData.maturityDate);
    
    // Calculate years between deposit and maturity dates
    const years = (maturityDate.getTime() - depositDate.getTime()) / (1000 * 3600 * 24 * 365.25);
    
    // Simple interest calculation: Maturity = Principal * (1 + (Rate/100) * Years)
    const maturityAmount = principal * (1 + (rate / 100) * years);

    const newFD = {
      id: editingFD ? editingFD.id : Date.now(),
      bank: formData.bank,
      principal: principal,
      interestRate: rate,
      depositDate: formData.depositDate,
      maturityDate: formData.maturityDate,
      maturityAmount: Math.round(maturityAmount)
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
    <div>
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
          fixedDeposits.map((fd) => {
            const maturityStatus = getMaturityStatus(fd.maturityDate);
            const StatusIcon = maturityStatus.icon;
            
            return (
              <div
                key={fd.id}
                className={`p-6 rounded-xl border-2 transition-all duration-200 hover:border-opacity-80 relative ${
                  maturityStatus.glow ? 'shadow-lg' : ''
                }`}
                style={{
                  backgroundColor: CORPORATE_NAVY,
                  borderColor: maturityStatus.borderColor,
                  boxShadow: maturityStatus.glow ? `0 0 20px ${maturityStatus.borderColor}40` : 'none'
                }}
              >
                {/* Maturity Badge */}
                {maturityStatus.badgeText && (
                  <div
                    className="absolute top-4 left-4 px-3 py-1 rounded-full text-xs font-bold flex items-center space-x-1"
                    style={{
                      backgroundColor: `${maturityStatus.badgeColor}20`,
                      color: maturityStatus.badgeColor,
                      border: `1px solid ${maturityStatus.badgeColor}`
                    }}
                  >
                    {StatusIcon && <StatusIcon />}
                    <span>{maturityStatus.badgeText}</span>
                  </div>
                )}

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
                        FD #{fd.id}
                      </p>
                    </div>
                  </div>

                  {/* Principal Amount */}
                  <div className="text-center">
                    <p className="text-sm font-medium" style={{ color: MID_SLATE }}>
                      Principal
                    </p>
                    <p className="text-lg font-bold" style={{ color: CHART_SKY_BLUE }}>
                      {formatCurrency(fd.principal)}
                    </p>
                  </div>

                  {/* Interest Rate */}
                  <div className="text-center">
                    <p className="text-sm font-medium" style={{ color: MID_SLATE }}>
                      Interest Rate
                    </p>
                    <p className="text-lg font-bold" style={{ color: LUMINOUS_ACCENT }}>
                      {fd.interestRate}% p.a.
                    </p>
                  </div>

                  {/* Maturity Date */}
                  <div className="text-center">
                    <p className="text-sm font-medium" style={{ color: MID_SLATE }}>
                      Maturity Date
                    </p>
                    <p className="text-lg font-bold" style={{ color: LIGHT_SLATE }}>
                      {formatDate(fd.maturityDate)}
                    </p>
                  </div>

                  {/* Maturity Amount & Actions */}
                  <div className="flex items-center justify-between">
                    <div className="text-center">
                      <p className="text-sm font-medium" style={{ color: MID_SLATE }}>
                        Maturity Value
                      </p>
                      <p className="text-lg font-bold" style={{ color: CYBER_TEAL }}>
                        {formatCurrency(fd.maturityAmount)}
                      </p>
                    </div>

                    {/* Options Menu */}
                    <div className="relative">
                      <button
                        onClick={() => setShowOptionsMenu(showOptionsMenu === fd.id ? null : fd.id)}
                        className="p-2 rounded-lg transition-all duration-200 hover:bg-opacity-80"
                        style={{ backgroundColor: MID_SLATE + '20' }}
                      >
                        <FaEllipsisV style={{ color: MID_SLATE }} />
                      </button>

                      {showOptionsMenu === fd.id && (
                        <div
                          className="absolute right-0 top-full mt-2 w-48 rounded-lg shadow-lg border z-10"
                          style={{
                            backgroundColor: CORPORATE_NAVY,
                            borderColor: MID_SLATE
                          }}
                        >
                          <button
                            onClick={() => handleEdit(fd)}
                            className="w-full flex items-center space-x-3 px-4 py-3 text-left hover:bg-opacity-80 transition-all duration-200"
                            style={{ backgroundColor: 'transparent' }}
                          >
                            <FaEdit style={{ color: CYBER_TEAL }} />
                            <span style={{ color: LIGHT_SLATE }}>Edit Details</span>
                          </button>
                          <button
                            onClick={() => handleDelete(fd.id)}
                            className="w-full flex items-center space-x-3 px-4 py-3 text-left hover:bg-opacity-80 transition-all duration-200 border-t"
                            style={{
                              backgroundColor: 'transparent',
                              borderColor: MID_SLATE
                            }}
                          >
                            <FaTrash style={{ color: '#ef4444' }} />
                            <span style={{ color: '#ef4444' }}>Delete FD</span>
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Add/Edit Fixed Deposit Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div
            className="w-full max-w-md rounded-xl shadow-2xl"
            style={{ backgroundColor: CORPORATE_NAVY }}
          >
            <div className="p-6 border-b" style={{ borderColor: MID_SLATE }}>
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold" style={{ color: LIGHT_SLATE }}>
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
                  className="p-2 rounded-lg transition-all duration-200 hover:bg-opacity-80"
                  style={{ backgroundColor: MID_SLATE + '20' }}
                >
                  <FaTimes style={{ color: MID_SLATE }} />
                </button>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              {/* Bank Name */}
              <div>
                <label className="block text-sm font-medium mb-2" style={{ color: LIGHT_SLATE }}>
                  Bank Name
                </label>
                <input
                  type="text"
                  value={formData.bank}
                  onChange={(e) => setFormData({ ...formData, bank: e.target.value })}
                  required
                  className="w-full p-3 rounded-lg border focus:outline-none focus:ring-2 transition-all duration-200"
                  style={{
                    backgroundColor: DEEP_SPACE_BLUE,
                    borderColor: MID_SLATE,
                    color: LIGHT_SLATE
                  }}
                  placeholder="e.g., HDFC Bank"
                />
              </div>

              {/* Principal Amount */}
              <div>
                <label className="block text-sm font-medium mb-2" style={{ color: LIGHT_SLATE }}>
                  Principal Amount (LKR)
                </label>
                <input
                  type="number"
                  value={formData.principal}
                  onChange={(e) => setFormData({ ...formData, principal: e.target.value })}
                  required
                  min="1000"
                  className="w-full p-3 rounded-lg border focus:outline-none focus:ring-2 transition-all duration-200"
                  style={{
                    backgroundColor: DEEP_SPACE_BLUE,
                    borderColor: MID_SLATE,
                    color: LIGHT_SLATE
                  }}
                  placeholder="100000"
                />
              </div>

              {/* Interest Rate */}
              <div>
                <label className="block text-sm font-medium mb-2" style={{ color: LIGHT_SLATE }}>
                  Interest Rate (% per annum)
                </label>
                <input
                  type="number"
                  value={formData.interestRate}
                  onChange={(e) => setFormData({ ...formData, interestRate: e.target.value })}
                  required
                  min="0.1"
                  max="20"
                  step="0.1"
                  className="w-full p-3 rounded-lg border focus:outline-none focus:ring-2 transition-all duration-200"
                  style={{
                    backgroundColor: DEEP_SPACE_BLUE,
                    borderColor: MID_SLATE,
                    color: LIGHT_SLATE
                  }}
                  placeholder="7.5"
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
                  required
                  className="w-full p-3 rounded-lg border focus:outline-none focus:ring-2 transition-all duration-200"
                  style={{
                    backgroundColor: DEEP_SPACE_BLUE,
                    borderColor: MID_SLATE,
                    color: LIGHT_SLATE
                  }}
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
                  required
                  className="w-full p-3 rounded-lg border focus:outline-none focus:ring-2 transition-all duration-200"
                  style={{
                    backgroundColor: DEEP_SPACE_BLUE,
                    borderColor: MID_SLATE,
                    color: LIGHT_SLATE
                  }}
                />
              </div>

              {/* Submit Button */}
              <div className="flex space-x-3 pt-4">
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
                  className="flex-1 py-3 rounded-lg font-semibold transition-all duration-200 hover:bg-opacity-80"
                  style={{
                    backgroundColor: MID_SLATE + '40',
                    color: LIGHT_SLATE
                  }}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-3 rounded-lg font-semibold transition-all duration-200 hover:scale-105"
                  style={{
                    backgroundColor: CYBER_TEAL,
                    color: DEEP_SPACE_BLUE
                  }}
                >
                  {editingFD ? 'Update FD' : 'Add FD'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default FixedDepositsTab;
