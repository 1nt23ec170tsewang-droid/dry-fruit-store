import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000';

const Auth = () => {
  const { login, register } = useAuth();
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [forgotPasswordStep, setForgotPasswordStep] = useState('request'); // 'request' or 'reset'
  const [successMessage, setSuccessMessage] = useState('');
  
  // Login form state
  const [loginData, setLoginData] = useState({
    email: '',
    password: '',
  });

  // Register form state
  const [registerData, setRegisterData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
  });

  // Forgot password form state
  const [forgotPasswordData, setForgotPasswordData] = useState({
    email: '',
    newPassword: '',
    confirmPassword: '',
  });

  const handleLoginChange = (e) => {
    setLoginData({
      ...loginData,
      [e.target.name]: e.target.value,
    });
    setError('');
  };

  const handleRegisterChange = (e) => {
    setRegisterData({
      ...registerData,
      [e.target.name]: e.target.value,
    });
    setError('');
  };

  const handleForgotPasswordChange = (e) => {
    setForgotPasswordData({
      ...forgotPasswordData,
      [e.target.name]: e.target.value,
    });
    setError('');
    setSuccessMessage('');
  };

  const validateRegister = () => {
    if (!registerData.name || !registerData.email || !registerData.phone || !registerData.password) {
      setError('Please fill in all required fields');
      return false;
    }

    if (registerData.password.length < 6) {
      setError('Password must be at least 6 characters long');
      return false;
    }

    if (registerData.password !== registerData.confirmPassword) {
      setError('Passwords do not match');
      return false;
    }

    if (registerData.phone.length < 10) {
      setError('Please enter a valid phone number');
      return false;
    }

    return true;
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');

    if (!loginData.email || !loginData.password) {
      setError('Please fill in all fields');
      return;
    }

    setLoading(true);

    try {
      await login(loginData.email, loginData.password);
      navigate('/');
    } catch (err) {
      setError(err.message || 'Login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setError('');

    if (!validateRegister()) {
      return;
    }

    setLoading(true);

    try {
      await register({
        name: registerData.name,
        email: registerData.email,
        phone: registerData.phone,
        password: registerData.password,
      });
      navigate('/');
    } catch (err) {
      setError(err.message || 'Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleForgotPasswordRequest = async (e) => {
    e.preventDefault();
    setError('');
    setSuccessMessage('');

    if (!forgotPasswordData.email) {
      setError('Please enter your email address');
      return;
    }

    setLoading(true);

    try {
      // Trim email before sending
      const trimmedEmail = forgotPasswordData.email.trim();
      
      const response = await axios.post(`${API_BASE_URL}/api/auth/forgot-password`, {
        email: trimmedEmail,
      });

      // Update email in state with trimmed version
      setForgotPasswordData({ ...forgotPasswordData, email: trimmedEmail });

      setSuccessMessage(response.data.message || 'Password reset instructions sent to your email.');
      setForgotPasswordStep('reset');
    } catch (err) {
      setError(err.response?.data?.error || err.message || 'Failed to process request. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();
    setError('');
    setSuccessMessage('');

    if (!forgotPasswordData.newPassword || !forgotPasswordData.confirmPassword) {
      setError('Please fill in all fields');
      return;
    }

    if (forgotPasswordData.newPassword.length < 6) {
      setError('Password must be at least 6 characters long');
      return;
    }

    if (forgotPasswordData.newPassword !== forgotPasswordData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    setLoading(true);

    try {
      // Trim email before sending
      const trimmedEmail = forgotPasswordData.email.trim();
      
      const response = await axios.post(`${API_BASE_URL}/api/auth/reset-password`, {
        email: trimmedEmail,
        newPassword: forgotPasswordData.newPassword,
        confirmPassword: forgotPasswordData.confirmPassword,
      });

      setSuccessMessage(response.data.message || 'Password reset successfully!');
      setTimeout(() => {
        setShowForgotPassword(false);
        setForgotPasswordStep('request');
        setForgotPasswordData({ email: '', newPassword: '', confirmPassword: '' });
        setIsLogin(true);
      }, 2000);
    } catch (err) {
      setError(err.response?.data?.error || err.message || 'Failed to reset password. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-16">
      <div className="max-w-md mx-auto bg-white rounded-lg shadow-lg p-8">
        {/* Tabs */}
        <div className="flex border-b border-gray-200 mb-6">
          <button
            type="button"
            onClick={() => {
              setIsLogin(true);
              setError('');
            }}
            className={`flex-1 py-3 text-center font-semibold transition-colors ${
              isLogin
                ? 'text-ladakh-orange border-b-2 border-ladakh-orange'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            Login
          </button>
          <button
            type="button"
            onClick={() => {
              setIsLogin(false);
              setError('');
            }}
            className={`flex-1 py-3 text-center font-semibold transition-colors ${
              !isLogin
                ? 'text-ladakh-orange border-b-2 border-ladakh-orange'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            Register
          </button>
        </div>

        <h2 className="text-2xl font-heading font-bold mb-4 text-center text-gray-800">
          {isLogin ? 'Welcome Back!' : 'Create Account'}
        </h2>
        <p className="text-center text-gray-600 mb-6">
          {isLogin 
            ? 'Login to your account to continue' 
            : 'Join us to order fresh dry fruits from Ladakh!'}
        </p>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}

        {/* Login Form */}
        {isLogin && (
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email Address *
              </label>
              <input
                type="email"
                name="email"
                value={loginData.email}
                onChange={handleLoginChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-ladakh-orange focus:border-transparent"
                placeholder="your@email.com"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Password *
              </label>
              <input
                type="password"
                name="password"
                value={loginData.password}
                onChange={handleLoginChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-ladakh-orange focus:border-transparent"
                placeholder="Enter your password"
              />
              <div className="mt-2 text-right">
                <button
                  type="button"
                  onClick={() => {
                    setShowForgotPassword(true);
                    setForgotPasswordData({ ...forgotPasswordData, email: loginData.email });
                    setError('');
                    setSuccessMessage('');
                  }}
                  className="text-sm text-ladakh-orange hover:underline"
                >
                  Forgot Password?
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="btn-primary w-full text-lg py-3 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Logging in...' : 'Login'}
            </button>
          </form>
        )}

        {/* Register Form */}
        {!isLogin && (
          <form onSubmit={handleRegister} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Full Name *
              </label>
              <input
                type="text"
                name="name"
                value={registerData.name}
                onChange={handleRegisterChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-ladakh-orange focus:border-transparent"
                placeholder="Enter your full name"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email Address *
              </label>
              <input
                type="email"
                name="email"
                value={registerData.email}
                onChange={handleRegisterChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-ladakh-orange focus:border-transparent"
                placeholder="your@email.com"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Phone Number *
              </label>
              <input
                type="tel"
                name="phone"
                value={registerData.phone}
                onChange={handleRegisterChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-ladakh-orange focus:border-transparent"
                placeholder="10-digit phone number"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Password *
              </label>
              <input
                type="password"
                name="password"
                value={registerData.password}
                onChange={handleRegisterChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-ladakh-orange focus:border-transparent"
                placeholder="At least 6 characters"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Confirm Password *
              </label>
              <input
                type="password"
                name="confirmPassword"
                value={registerData.confirmPassword}
                onChange={handleRegisterChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-ladakh-orange focus:border-transparent"
                placeholder="Re-enter your password"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="btn-primary w-full text-lg py-3 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Creating Account...' : 'Register'}
            </button>
          </form>
        )}

        <div className="mt-6 text-center">
          <Link to="/" className="text-gray-500 hover:text-ladakh-orange text-sm">
            ← Back to Home
          </Link>
        </div>

        {/* Forgot Password Modal */}
        {showForgotPassword && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg shadow-xl p-8 max-w-md w-full mx-4 relative">
              <button
                onClick={() => {
                  setShowForgotPassword(false);
                  setForgotPasswordStep('request');
                  setForgotPasswordData({ email: forgotPasswordData.email, newPassword: '', confirmPassword: '' });
                  setError('');
                  setSuccessMessage('');
                }}
                className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 text-2xl"
              >
                ×
              </button>

              <h3 className="text-2xl font-heading font-bold mb-4 text-gray-800">
                {forgotPasswordStep === 'request' ? 'Reset Password' : 'Set New Password'}
              </h3>

              {successMessage && (
                <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">
                  {successMessage}
                </div>
              )}

              {error && (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
                  {error}
                </div>
              )}

              {forgotPasswordStep === 'request' ? (
                <form onSubmit={handleForgotPasswordRequest} className="space-y-4">
                  <p className="text-gray-600 mb-4">
                    Enter your email address and we'll help you reset your password.
                  </p>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={forgotPasswordData.email}
                      onChange={handleForgotPasswordChange}
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-ladakh-orange focus:border-transparent"
                      placeholder="your@email.com"
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={loading}
                    className="btn-primary w-full text-lg py-3 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {loading ? 'Processing...' : 'Continue'}
                  </button>
                </form>
              ) : (
                <form onSubmit={handleResetPassword} className="space-y-4">
                  <p className="text-gray-600 mb-4">
                    Enter your new password for <strong>{forgotPasswordData.email}</strong>.
                  </p>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Email Address
                    </label>
                    <input
                      type="email"
                      value={forgotPasswordData.email}
                      disabled
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-100 text-gray-600 cursor-not-allowed"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      New Password *
                    </label>
                    <input
                      type="password"
                      name="newPassword"
                      value={forgotPasswordData.newPassword}
                      onChange={handleForgotPasswordChange}
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-ladakh-orange focus:border-transparent"
                      placeholder="At least 6 characters"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Confirm New Password *
                    </label>
                    <input
                      type="password"
                      name="confirmPassword"
                      value={forgotPasswordData.confirmPassword}
                      onChange={handleForgotPasswordChange}
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-ladakh-orange focus:border-transparent"
                      placeholder="Re-enter your new password"
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={loading}
                    className="btn-primary w-full text-lg py-3 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {loading ? 'Resetting...' : 'Reset Password'}
                  </button>
                </form>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Auth;

