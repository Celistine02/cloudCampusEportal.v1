import React, { useState } from 'react';
import { FaTimes } from 'react-icons/fa';
import ClipLoader from 'react-spinners/ClipLoader';
import useAuthStore from './../../../production/zustand/auth/authStore';
import { useNavigate } from 'react-router-dom';

const OtpModal = ({ onClose, contactEmail, password }) => {
  const [otp, setOtp] = useState(Array(6).fill(""));
  const [loading, setLoading] = useState(false);
  const { login } = useAuthStore();
  const navigate = useNavigate();

  const handleChange = (e, index) => {
    const { value } = e.target;
    if (/^[0-9]$/.test(value) || value === "") {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);

      // Move to the next input field if a digit is entered
      if (value !== "" && index < 5) {
        document.getElementById(`otp-input-${index + 1}`).focus();
      }

      // Auto-submit if all fields are filled
      if (newOtp.every((digit) => digit !== "")) {
        handleSubmit();
      }
    }
  };

  const handleSubmit = async () => {
    setLoading(true);
    await login(contactEmail, password, otp.join(""));
    setLoading(false);
    navigate('/my-portal');
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-lg p-8 max-w-sm w-full shadow-2xl transform transition-all duration-300 relative"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
          onClick={onClose}
        >
          <FaTimes size={20} />
        </button>
        <h2 className="text-2xl font-semibold mb-4">Enter OTP</h2>
        <form onSubmit={(e) => e.preventDefault()}>
          <div className="flex justify-center mb-4">
            {otp.map((digit, index) => (
              <input
                key={index}
                id={`otp-input-${index}`}
                type="text"
                maxLength="1"
                className="w-12 h-12 text-center text-xl border border-gray-300 rounded-lg mx-1 focus:outline-none focus:border-indigo-900"
                value={digit}
                onChange={(e) => handleChange(e, index)}
              />
            ))}
          </div>
          <div className="flex justify-end">
            <button
              type="button"
              className="px-4 py-2 text-white bg-indigo-900 rounded-lg"
              onClick={handleSubmit}
              disabled={loading}
            >
              {loading ? <ClipLoader color="#ffffff" size={24} /> : "Verify"}
            </button>
          </div>
        </form>
      </div>
      {loading && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <ClipLoader color="#ffffff" size={48} />
        </div>
      )}
    </div>
  );
};

export default OtpModal;
