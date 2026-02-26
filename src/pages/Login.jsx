import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
 
  
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!formData.email || !formData.password) {
      setError('Please fill in all fields');
      return;
    }

    setLoading(true);

    try {
      await login(formData.email, formData.password);
      navigate('/');
    } catch (err) {
      setError(err.message || 'Login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-16">
      <div className="max-w-md mx-auto bg-white rounded-lg shadow-lg p-8">
        <h2 className="text-3xl font-heading font-bold mb-6 text-center text-gray-800">
          Customer Login
        </h2>
        <p className="text-center text-gray-600 mb-6">
          Welcome back! Please login to your account.
        </p>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email Address *
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-ladakh-orange focus:border-transparent"
              placeholder="your@email.com"
            />
          </div>

          <div className="relative">
          <label className="block text-sm font-medium text-gray-700 mb-1">
          Password *
          </label>
           <input 
    type={showPassword ? "text" : "password"} 
    name="password" // Added name attribute
    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-ladakh-orange focus:border-transparent pr-10" 
    value={formData.password} // Changed from securityData to formData
    onChange={handleChange} // Used your existing handleChange function
    required
    placeholder="Enter your password"
  />
  {/* Password Visibility Toggle Button */}
  <button 
    type="button"
    onClick={() => setShowPassword(!showPassword)}
    className="absolute right-3 top-9 text-gray-500 hover:text-gray-700 focus:outline-none" // Adjusted top-7 to top-9 for better alignment
  >
    {showEditPassword ? (
      <span title="Hide Password" style={{ fontSize: '18px' }}>👁️‍🗨️</span>
    ) : (
      <span title="Show Password" style={{ fontSize: '18px' }}>👁️</span>
    )}
    </button>
  </div>

          <button
            type="submit"
            disabled={loading}
            className="btn-primary w-full text-lg py-3 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-gray-600">
            Don't have an account?{' '}
            <Link to="/register" className="text-ladakh-orange hover:underline font-semibold">
              Register here
            </Link>
          </p>
        </div>

        <div className="mt-4 text-center">
          <Link to="/" className="text-gray-500 hover:text-ladakh-orange text-sm">
            ← Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;

