import { Link } from "react-router-dom";
import ErrorModal from './errorModal';
import OtpModal from './otp';
import React, { useState, useEffect } from "react";
import ClipLoader from 'react-spinners/ClipLoader';
import { useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash, FaEnvelope, FaLock } from "react-icons/fa";
import useAuthStore from './../../../production/zustand/auth/authStore';
import ForgotPassword from './forgotPass'; // Import the ForgotPassword component
function ParentLogin() {
  const [showPassword, setShowPassword] = useState(false);
  const [showOtpModal, setShowOtpModal] = useState(false);
  const [showForgotPassModal, setShowForgotPassModal] = useState(false); // Added state for forgot password modal
  const [otp, setOtp] = useState("");
  const [otpLoading, setOtpLoading] = useState(false);
  const [loginLoading, setLoginLoading] = useState(false);
  const [usernameError, setUsernameError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [showErrorModal, setShowErrorModal] = useState(false);
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false); // Added state for loading
  const authStore = useAuthStore();

  useEffect(() => {
    // Simulate Google auto-popup
    const timer = setTimeout(() => {
      // setShowGoogleModal(true); // Removed as per instructions
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const validateUsername = (username) => {
    return username.length > 0;
  };

  const handleCloseErrorModal = () => {
    setShowErrorModal(false);
    authStore.signout(); // Using the signout action from authStore
    setUsernameError(""); // Clearing username error state
    setPasswordError(""); // Clearing password error state
  };

  const handleCloseOtpModal = () => {
    setShowOtpModal(false);
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    // Validate fields before login
    if (!validateUsername(username) && password.length === 0) {
      setLoading(false);
      setUsernameError("Username is required");
      setPasswordError("Password is required");
      setShowErrorModal(true);
      return;
    } else if (!validateUsername(username)) {
      setLoading(false);
      setUsernameError("Username is required");
      setShowErrorModal(true);
      return;
    } else if (password.length === 0) {
      setLoading(false);
      setPasswordError("Password is required");
      setShowErrorModal(true);
      return;
    } else if (!validateUsername(username) && password.length === 0) {
      setLoading(false);
      setUsernameError("Username is required");
      setPasswordError("Password is required");
      setShowErrorModal(true);
      return;
    }
    // Using the login action from authStore
    try {
      await authStore.login(username, password);
      if (authStore.errorMessage) {
        setLoading(false); // Ensure loading state is reset after error
        setShowErrorModal(true);
        setUsernameError(""); // Clearing username error state
        setPasswordError(""); // Clearing password error state
      } else if (!authStore.errorMessage) {
        navigate('/my-portal');
        setUsernameError(""); // Clearing username error state
        setPasswordError(""); // Clearing password error state
      }
    } catch (error) {
      setLoading(false); // Ensure loading state is reset after error
      setShowErrorModal(true);
      setUsernameError(""); // Clearing username error state
      setPasswordError(""); // Clearing password error state
    }
  };

  const handleForgotPassword = () => {
    setShowForgotPassModal(true); // Show the forgot password modal
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
              <h2 className="text-3xl font-bold text-gray-900">Parent Portal</h2>
              <p className="mt-2 text-base text-gray-600">
                Don&apos;t have an account?{" "}
                <a
                  href="register"
                  title=""
                  className="text-blue-600 transition-all duration-200 hover:underline hover:text-blue-700"
                >
                  Create one!
                </a>
              </p>
            </div>
            <form action="#" method="POST" className="mt-8" onSubmit={handleLogin}>
              <div className="space-y-5">
                <div>
                  <label
                    htmlFor="username"
                    className="text-base font-medium text-gray-900"
                  >
                    {" "}
                    Username{" "}
                  </label>
                  <div className="mt-2.5">
                    <input
                      type="text"
                      name="username"
                      id="username"
                      placeholder="Enter your username"
                      className="block w-full p-4 text-black placeholder-gray-500 transition-all duration-200 bg-white border border-gray-200 rounded-md focus:outline-none focus:border-blue-600 caret-blue-600"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                    />
                  </div>
                </div>
                <div>
                  <div className="flex items-center justify-between">
                    <label
                      htmlFor="password"
                      className="text-base font-medium text-gray-900"
                    >
                      {" "}
                      Password{" "}
                    </label>
                    <a
                      href="#"
                      title=""
                      className="text-sm font-medium transition-all duration-200 text-rose-500 hover:text-rose-600 focus:text-rose-600 hover:underline"
                      onClick={handleForgotPassword} // Added onClick event for forgot password
                    >
                      {" "}
                      Forgot password?{" "}
                    </a>
                  </div>
                  <div className="mt-2.5">
                    <input
                      type={showPassword ? "text" : "password"}
                      name="password"
                      id="password"
                      placeholder="Enter your password"
                      className="block w-full p-4 text-black placeholder-gray-500 transition-all duration-200 bg-white border border-gray-200 rounded-md focus:outline-none focus:border-blue-600 caret-blue-600"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                    <FaEyeSlash className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" onClick={togglePasswordVisibility} />
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
                onClick={() => navigate('/teacher-login')}
              >
                Continue as Teacher
              </button>
            </div>
            <div className="mt-4">
              <button
                className="inline-flex items-center justify-center w-full px-4 py-4 text-base font-semibold text-gray-700 transition-all duration-200 bg-gray-200 border border-transparent rounded-md focus:outline-none hover:bg-gray-300"
                onClick={() => navigate('/')}
              >
                Continue as Student
              </button>
            </div>
          </div>
        </div>
      </div>
      {showErrorModal && <ErrorModal errorMessage={usernameError || passwordError || authStore.errorMessage} onClose={handleCloseErrorModal} />}
      {showOtpModal && <OtpModal onClose={handleCloseOtpModal} />}
      {showForgotPassModal && <ForgotPassword onClose={() => setShowForgotPassModal(false)} />} // Added ForgotPassword modal
    </section>
  );
}

export default ParentLogin;
