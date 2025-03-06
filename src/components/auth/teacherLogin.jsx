import { Link } from "react-router-dom";
import ErrorModal from './errorModal';
import OtpModal from './otp';
import React, { useState, useEffect } from "react";
import ClipLoader from 'react-spinners/ClipLoader';
import { useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import useTeacherStore from './../../../production/zustand/auth/teacherstore';

function TeacherLogin() {
  const [showPassword, setShowPassword] = useState(false);
  const [showOtpModal, setShowOtpModal] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [showForgotPassModal, setShowForgotPassModal] = useState(false);
  const navigate = useNavigate();
  const teacherStore = useTeacherStore();

  useEffect(() => {
    // Removed Google auto-popup logic
  }, []);

  const togglePasswordVisibility = () => {
    setShowPassword(prev => !prev);
  };

  const validateEmail = (email) => {
    return email.length > 0;
  };

  const handleCloseErrorModal = () => {
    setShowErrorModal(false);
    teacherStore.signout();
    setEmailError("");
    setPasswordError("");
  };

  const handleCloseOtpModal = () => {
    setShowOtpModal(false);
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    if (!validateEmail(email)) {
      setLoading(false);
      setEmailError("Email is required");
      setShowErrorModal(true);
      return;
    } 
    if (password.length === 0) {
      setLoading(false);
      setPasswordError("Password is required");
      setShowErrorModal(true);
      return;
    }

    try {
      await teacherStore.signin(email, password);
      if (teacherStore.error) {
        setLoading(false);
        setShowErrorModal(true);
        setEmailError("");
        setPasswordError("");
      } else {
        navigate('/teacher-portal');
        setEmailError("");
        setPasswordError("");
      }
    } catch (error) {
      setLoading(false);
      setShowErrorModal(true);
      setEmailError("");
      setPasswordError("");
      console.error('Error signing in:', error.message);
    }
  };

  const handleForgotPassword = () => {
    setShowForgotPassModal(true);
    setShowErrorModal(false);
  };

  return (
    <section className="relative py-10 h-screen bg-gray-900 sm:py-16 lg:py-24 font-mainFont text-white">
      <div className="absolute inset-0">
        <img
          className="object-cover w-full h-full"
          src="https://img.freepik.com/free-vector/flat-graduate-students-mantle-cap-holding-university-diploma-paper-scroll-happy-young-people-academic-gown-with-bachelor-degree-celebrating-graduation-from-college-university-high-school_88138-929.jpg?t=st=1718276414~exp=1718280014~hmac=c4efa23d179e9996f7357a3e80836b8f6f165a68bec61ad57609606ddb2f3242&w=1380"
          alt=""
        />
      </div>
      <div className="absolute inset-0 bg-gray-900/20" />
      <div className="relative max-w-lg px-4 mx-auto sm:px-0">
        <div className="overflow-hidden bg-white bg-opacity-80 rounded-md shadow-md">
          <div className="px-4 py-6 sm:px-8 sm:py-7">
            <div className="text-center">
              <h2 className="text-3xl font-bold text-gray-900">Teacher Portal</h2>
              <p className="mt-2 text-base text-gray-600">
                Don&apos;t have an account?{" "}
                <Link
                  to="/register"
                  className="text-blue-600 transition-all duration-200 hover:underline hover:text-blue-700"
                >
                  Create one!
                </Link>
              </p>
            </div>
            <form className="mt-8" onSubmit={handleLogin}>
              <div className="space-y-5">
                <div>
                  <label htmlFor="email" className="text-base font-medium text-gray-900"> Email </label>
                  <div className="mt-2.5">
                    <input
                      type="email"
                      name="email"
                      id="email"
                      placeholder="Enter your email"
                      className="block w-full p-4 text-black placeholder-gray-500 transition-all duration-200 bg-white border border-gray-200 rounded-md focus:outline-none focus:border-blue-600 caret-blue-600"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                </div>
                <div>
                  <div className="flex items-center justify-between">
                    <label htmlFor="password" className="text-base font-medium text-gray-900"> Password </label>
                    <button
                      onClick={handleForgotPassword}
                      type="button"
                      className="text-sm font-medium transition-all duration-200 text-rose-500 hover:text-rose-600 focus:text-rose-600 hover:underline"
                    >
                      Forgot password?
                    </button>
                  </div>
                  <div className="mt-2.5 relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      name="password"
                      id="password"
                      placeholder="Enter your password"
                      className="block w-full p-4 text-black placeholder-gray-500 transition-all duration-200 bg-white border border-gray-200 rounded-md focus:outline-none focus:border-blue-600 caret-blue-600"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                    <FaEyeSlash className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 cursor-pointer" onClick={togglePasswordVisibility} />
                  </div>
                </div>
                <div>
                  <button
                    type="submit"
                    className="inline-flex items-center justify-center w-full px-4 py-4 text-base font-semibold text-white transition-all duration-200 bg-blue-950 border border-transparent rounded-md focus:outline-none hover:bg-blue-900"
                  >
                    {loading ? <ClipLoader color="#ffffff" size={24} /> : "Log in"}
                  </button>
                </div>
              </div>
            </form>
            <div className="mt-4">
              <button
                className="inline-flex items-center justify-center w-full px-4 py-4 text-base font-semibold text-gray-700 transition-all duration-200 bg-gray-200 border border-transparent rounded-md focus:outline-none hover:bg-gray-300"
                onClick={() => navigate('/')}
              >
                Continue as Student
              </button>
            </div>
            <div className="mt-4">
              <button
                className="inline-flex items-center justify-center w-full px-4 py-4 text-base font-semibold text-gray-700 transition-all duration-200 bg-gray-200 border border-transparent rounded-md focus:outline-none hover:bg-gray-300"
                onClick={() => navigate('/parent-login')}
              >
                Continue as Parent
              </button>
            </div>
          </div>
        </div>
      </div>
      {showErrorModal && <ErrorModal errorMessage={emailError || passwordError || teacherStore.error} onClose={handleCloseErrorModal} />}
      {showForgotPassModal && (
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
              <p className="mt-5 text-xl font-bold text-gray-900">Forgot Password</p>
              <p className="mt-3 text-sm font-medium text-gray-500">Enter your email to reset your password.</p>
              <div className="mt-4">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="block w-full p-4 text-black placeholder-gray-500 transition-all duration-200 bg-white border border-gray-200 rounded-md focus:outline-none focus:border-blue-600 caret-blue-600"
                />
                <button
                  onClick={() => {
                    // Add your reset password logic here
                    setShowForgotPassModal(false);
                  }}
                  className="inline-flex items-center justify-center w-full px-6 py-3 text-sm font-semibold leading-5 text-white transition-all duration-200 bg-black border border-gray-500 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-600 hover:bg-gray-700"
                >
                  Reset Password
                </button>
                <button
                  onClick={() => setShowForgotPassModal(false)}
                  className="mt-2 inline-flex items-center justify-center w-full px-6 py-3 text-sm font-semibold leading-5 text-black transition-all duration-200 bg-red-500 border border-gray-500 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-600 hover:bg-red-200"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      {showOtpModal && <OtpModal onClose={handleCloseOtpModal} />}
    </section>
  );
}

export default TeacherLogin;
