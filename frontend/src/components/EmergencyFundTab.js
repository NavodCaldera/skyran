import React, { useState } from 'react';
import { FaPiggyBank, FaEdit, FaTimes, FaSave } from 'react-icons/fa';
import {
  DEEP_SPACE_BLUE,
  CORPORATE_NAVY,
  CYBER_TEAL,
  LUMINOUS_ACCENT,
  LIGHT_SLATE,
  MID_SLATE,
  VIBRANT_GREEN
} from '../constants';

const EmergencyFundTab = ({ emergencyFund, setEmergencyFund, formatCurrency }) => {
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    bank: emergencyFund.bank,
    balance: emergencyFund.balance.toString()
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const updatedFund = {
      bank: formData.bank,
      balance: parseFloat(formData.balance)
    };

    setEmergencyFund(updatedFund);
    setShowModal(false);
  };

  const handleEdit = () => {
    setFormData({
      bank: emergencyFund.bank,
      balance: emergencyFund.balance.toString()
    });
    setShowModal(true);
  };

  return (
    <div>
      {/* Emergency Fund Card */}
      <div className="max-w-2xl mx-auto">
        <h2 className="text-2xl font-bold mb-6 text-center" style={{ color: LIGHT_SLATE }}>
          Emergency Fund
        </h2>
        
        <div
          className="p-8 rounded-2xl border-2 transition-all duration-200 hover:border-opacity-80 relative"
          style={{
            backgroundColor: CORPORATE_NAVY,
            borderColor: VIBRANT_GREEN + '40',
            boxShadow: `0 8px 32px ${VIBRANT_GREEN}20`
          }}
        >
          {/* Edit Button */}
          <button
            onClick={handleEdit}
            className="absolute top-6 right-6 p-3 rounded-lg transition-all duration-200 hover:scale-105"
            style={{
              backgroundColor: CYBER_TEAL + '20',
              color: CYBER_TEAL
            }}
          >
            <FaEdit className="text-lg" />
          </button>

          {/* Fund Icon */}
          <div className="text-center mb-6">
            <div
              className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4"
              style={{ backgroundColor: VIBRANT_GREEN + '20' }}
            >
              <FaPiggyBank className="text-4xl" style={{ color: VIBRANT_GREEN }} />
            </div>
            <h3 className="text-xl font-semibold" style={{ color: VIBRANT_GREEN }}>
              Emergency Savings
            </h3>
          </div>

          {/* Bank Information */}
          <div className="text-center mb-6">
            <p className="text-sm font-medium mb-2" style={{ color: MID_SLATE }}>
              Bank / Institution
            </p>
            <p className="text-2xl font-bold" style={{ color: LIGHT_SLATE }}>
              {emergencyFund.bank}
            </p>
          </div>

          {/* Balance */}
          <div className="text-center">
            <p className="text-sm font-medium mb-2" style={{ color: MID_SLATE }}>
              Current Balance
            </p>
            <p className="text-4xl font-bold" style={{ color: VIBRANT_GREEN }}>
              {formatCurrency(emergencyFund.balance)}
            </p>
          </div>

          {/* Emergency Fund Tips */}
          <div
            className="mt-8 p-4 rounded-lg"
            style={{ backgroundColor: DEEP_SPACE_BLUE }}
          >
            <h4 className="text-lg font-semibold mb-3" style={{ color: LUMINOUS_ACCENT }}>
              💡 Emergency Fund Tips
            </h4>
            <ul className="space-y-2 text-sm" style={{ color: LIGHT_SLATE }}>
              <li>• Aim for 3-6 months of living expenses</li>
              <li>• Keep funds in easily accessible accounts</li>
              <li>• Consider high-yield savings accounts</li>
              <li>• Review and update regularly</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Edit Emergency Fund Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div
            className="w-full max-w-md rounded-xl shadow-2xl"
            style={{ backgroundColor: CORPORATE_NAVY }}
          >
            <div className="p-6 border-b" style={{ borderColor: MID_SLATE }}>
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold" style={{ color: LIGHT_SLATE }}>
                  Edit Emergency Fund
                </h2>
                <button
                  onClick={() => setShowModal(false)}
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
                  Bank / Institution
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
                  placeholder="e.g., Sampath Bank"
                />
              </div>

              {/* Balance */}
              <div>
                <label className="block text-sm font-medium mb-2" style={{ color: LIGHT_SLATE }}>
                  Current Balance (LKR)
                </label>
                <input
                  type="number"
                  value={formData.balance}
                  onChange={(e) => setFormData({ ...formData, balance: e.target.value })}
                  required
                  min="0"
                  className="w-full p-3 rounded-lg border focus:outline-none focus:ring-2 transition-all duration-200"
                  style={{
                    backgroundColor: DEEP_SPACE_BLUE,
                    borderColor: MID_SLATE,
                    color: LIGHT_SLATE
                  }}
                  placeholder="500000"
                />
              </div>

              {/* Submit Button */}
              <div className="flex space-x-3 pt-4">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
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
                  className="flex-1 py-3 rounded-lg font-semibold transition-all duration-200 hover:scale-105 flex items-center justify-center space-x-2"
                  style={{
                    backgroundColor: VIBRANT_GREEN,
                    color: DEEP_SPACE_BLUE
                  }}
                >
                  <FaSave />
                  <span>Save Changes</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default EmergencyFundTab;
