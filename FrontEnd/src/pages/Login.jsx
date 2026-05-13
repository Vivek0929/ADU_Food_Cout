import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCanteen } from '../context/CanteenContext';
import { Mail, Lock, User, Eye, EyeOff, LogIn, ArrowLeft } from 'lucide-react';

const Login = () => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: '',
    confirmPassword: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const { login, signup, isAuthenticated } = useCanteen();

  // Redirect if already authenticated
  useEffect(() => {
    if (isAuthenticated) {
      navigate('/', { replace: true });
    }
  }, [isAuthenticated, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    setError('');
  };

  const validateForm = () => {
    if (!formData.email || !formData.password) {
      setError('Email and password are required');
      return false;
    }
    if (!formData.email.includes('@')) {
      setError('Please enter a valid email');
      return false;
    }
    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters');
      return false;
    }
    if (isSignUp) {
      if (!formData.name) {
        setError('Name is required');
        return false;
      }
      if (formData.password !== formData.confirmPassword) {
        setError('Passwords do not match');
        return false;
      }
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));

      if (isSignUp) {
        signup(formData.email, formData.password, formData.name);
        setFormData({ email: '', password: '', name: '', confirmPassword: '' });
      } else {
        login(formData.email, formData.password);
      }

      navigate('/');
    } catch (err) {
      setError('Authentication failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const toggleMode = () => {
    setIsSignUp(!isSignUp);
    setFormData({ email: '', password: '', name: '', confirmPassword: '' });
    setError('');
  };

  const handleGoogleLogin = async () => {
    setLoading(true);
    try {
      // Simulate Google login
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      const googleUser = {
        email: 'user@gmail.com',
        name: 'Google User',
        password: 'google_oauth_token'
      };
      
      // Create account with Google user info
      signup(googleUser.email, googleUser.password, googleUser.name);
      navigate('/');
    } catch (err) {
      setError('Google Sign-in failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleBack = () => {
    navigate('/', { replace: true });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-orange-50 flex items-center justify-center p-4 relative">
      {/* Back Button */}
      <button
        onClick={handleBack}
        className="absolute top-6 left-6 flex items-center gap-2 text-slate-600 hover:text-slate-900 transition-colors font-semibold"
      >
        <ArrowLeft size={20} />
        <span className="hidden sm:inline">Back</span>
      </button>

      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <div className="w-16 h-16 bg-gradient-to-br from-orange-400 to-orange-600 rounded-3xl flex items-center justify-center text-white text-2xl font-bold shadow-lg">
              🍲
            </div>
          </div>
          <h1 className="text-3xl font-black text-slate-900 mb-2">ADU Canteen</h1>
          <p className="text-slate-500">Fresh food, served fresh</p>
        </div>

        {/* Form Container */}
        <div className="bg-white rounded-3xl shadow-xl border border-slate-100 p-8">
          <h2 className="text-2xl font-bold text-slate-900 mb-2">
            {isSignUp ? 'Create Account' : 'Sign In'}
          </h2>
          <p className="text-slate-500 text-sm mb-6">
            {isSignUp
              ? 'Join us to order delicious meals'
              : 'Welcome back! Order your favorite meals'}
          </p>

          {error && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-xl text-red-600 text-sm font-medium flex items-center gap-2">
              <span>⚠️</span> {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Google Sign-in */}
            <button
              type="button"
              onClick={handleGoogleLogin}
              disabled={loading}
              className="w-full flex items-center justify-center gap-2 px-4 py-3 border border-slate-200 rounded-2xl font-semibold text-slate-700 hover:bg-slate-50 transition-colors disabled:opacity-70"
            >
              <span className="text-xl">🔍</span>
              {loading ? 'Signing in...' : 'Continue with Google'}
            </button>

            {/* Divider */}
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-slate-200"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-slate-500">OR</span>
              </div>
            </div>

            {/* Name Field (Sign Up Only) */}
            {isSignUp && (
              <div className="relative">
                <label className="block text-sm font-semibold text-slate-700 mb-2">Name</label>
                <div className="relative">
                  <User className="absolute left-4 top-3.5 text-slate-400" size={20} />
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Enter your name"
                    className="w-full pl-12 pr-4 py-3 border border-slate-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent font-medium"
                  />
                </div>
              </div>
            )}

            {/* Email Field */}
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">Email</label>
              <div className="relative">
                <Mail className="absolute left-4 top-3.5 text-slate-400" size={20} />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="you@example.com"
                  className="w-full pl-12 pr-4 py-3 border border-slate-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent font-medium"
                />
              </div>
            </div>

            {/* Password Field */}
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">Password</label>
              <div className="relative">
                <Lock className="absolute left-4 top-3.5 text-slate-400" size={20} />
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="••••••••"
                  className="w-full pl-12 pr-12 py-3 border border-slate-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent font-medium"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-3.5 text-slate-400 hover:text-slate-600"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            {/* Confirm Password Field (Sign Up Only) */}
            {isSignUp && (
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Confirm Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-4 top-3.5 text-slate-400" size={20} />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    placeholder="••••••••"
                    className="w-full pl-12 pr-4 py-3 border border-slate-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent font-medium"
                  />
                </div>
              </div>
            )}

            {/* Forgot Password (Login Only) */}
            {!isSignUp && (
              <div className="flex justify-end">
                <button type="button" className="text-orange-600 text-sm font-semibold hover:text-orange-700">
                  Forgot password?
                </button>
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-orange-500 to-orange-600 text-white py-3 rounded-2xl font-bold hover:shadow-lg hover:shadow-orange-200 transition-all active:scale-95 disabled:opacity-70 flex items-center justify-center gap-2 mt-6"
            >
              <LogIn size={20} />
              {loading ? 'Loading...' : isSignUp ? 'Create Account' : 'Sign In'}
            </button>
          </form>

          {/* Toggle Sign Up / Sign In */}
          <p className="text-center text-slate-600 mt-6 text-sm">
            {isSignUp ? 'Already have an account? ' : "Don't have an account? "}
            <button
              type="button"
              onClick={toggleMode}
              className="text-orange-600 font-bold hover:text-orange-700 transition-colors"
            >
              {isSignUp ? 'Sign In' : 'Sign Up'}
            </button>
          </p>
        </div>

        {/* Footer */}
        <p className="text-center text-slate-500 text-xs mt-6">
          By signing in, you agree to our Terms of Service and Privacy Policy
        </p>
      </div>
    </div>
  );
};

export default Login;
