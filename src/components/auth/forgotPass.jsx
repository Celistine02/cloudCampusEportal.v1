import React, { useState } from 'react';
import { Modal, Button, Input } from 'antd';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [isModalVisible, setIsModalVisible] = useState(false);

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleResetPassword = () => {
    // Add your reset password logic here
  };

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  return (
    <div>

      {isModalVisible ? (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-transparent backdrop-filter backdrop-blur-sm">
          <div className="bg-white max-w-sm overflow-hidden shadow-lg rounded-xl transform transition-all sm:max-w-lg sm:w-full">
            <div className="px-4 py-6 text-center">
              <svg
                className="w-16 h-16 mx-auto text-green-500"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M7 10.0288C7.47142 10 8.05259 10 8.8 10H15.2C15.9474 10 16.5286 10 17 10.0288M7 10.0288C6.41168 10.0647 5.99429 10.1455 5.63803 10.327C5.07354 10.6146 4.6146 11.0735 4.32698 11.638C4 12.2798 4 13.1198 4 14.8V16.2C4 17.8802 4 18.7202 4.32698 19.362C4.6146 19.9265 5.07354 20.3854 5.63803 20.673C6.27976 21 7.11984 21 8.8 21H15.2C16.8802 21 17.7202 21 18.362 20.673C18.9265 20.3854 19.3854 19.9265 19.673 19.362C20 18.7202 20 17.8802 20 16.2V14.8C20 13.1198 20 12.2798 19.673 11.638C19.3854 11.0735 18.9265 10.6146 18.362 10.327C18.0057 10.1455 17.5883 10.0647 17 10.0288M7 10.0288V8C7 5.23858 9.23858 3 12 3C14.7614 3 17 5.23858 17 8V10.0288" />
              </svg>
              <p className="mt-5 text-xl font-bold text-gray-900">
                Forgot Password
              </p>
              <p className="mt-3 text-sm font-medium text-gray-500">
                Enter your email to reset your password.
              </p>
              <div className="mt-4">
                <Input type="email" value={email} onChange={handleEmailChange} placeholder="Enter your email" />
                <button
                  onClick={() => {
                    handleResetPassword();
                    setIsModalVisible(false);
                  }}
                  className="inline-flex items-center justify-center w-full px-6 py-3 text-sm font-semibold leading-5 text-white transition-all duration-200 bg-black border border-gray-500 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-600 hover:bg-gray-700"
                >
                  Reset Password
                </button>
                <button
                  onClick={() => setIsModalVisible(false)}
                  className="mt-2 inline-flex items-center justify-center w-full px-6 py-3 text-sm font-semibold leading-5 text-black transition-all duration-200 bg-red-500 border border-gray-500 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-600 hover:bg-red-200"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default ForgotPassword;
