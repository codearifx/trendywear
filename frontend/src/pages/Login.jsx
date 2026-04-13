import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { User, Lock } from 'lucide-react';
import { motion } from 'framer-motion';

const Login = () => {
  const [formData, setFormData] = useState({ username: '', password: '' });
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if(formData.username && formData.password) {
      login({ name: formData.username, email: `${formData.username}@demo.com` });
      navigate('/products');
    } else {
      alert('Please fill in all fields');
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center bg-dark px-4 relative overflow-hidden">
      {/* Background ambient glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-primary/10 blur-[100px] rounded-full"></div>

      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-panel p-8 md:p-12 rounded-[2rem] border border-primary/30 shadow-[0_0_30px_rgba(0,242,254,0.15)] w-full max-w-md relative z-10"
      >
        <h2 className="text-4xl font-extrabold text-center text-white mb-8 neon-text">
          Welcome Back
        </h2>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2 ms-1">Username</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <User className="h-5 w-5 text-gray-500" />
              </div>
              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
                required
                className="pl-12 w-full px-4 py-3 bg-card/60 border border-gray-700 rounded-xl focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary text-white transition-all shadow-inner"
                placeholder="Enter your username"
              />
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2 ms-1">Password</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Lock className="h-5 w-5 text-gray-500" />
              </div>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                className="pl-12 w-full px-4 py-3 bg-card/60 border border-gray-700 rounded-xl focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary text-white transition-all shadow-inner"
                placeholder="••••••••"
              />
            </div>
          </div>

          <div className="flex items-center justify-between mt-4 pb-2">
            <div className="text-sm">
              <a href="#" className="font-medium text-primary hover:text-white transition-colors">
                Forgot your password?
              </a>
            </div>
          </div>
          
          <motion.button
            whileHover={{ scale: 1.05, boxShadow: "0 0 20px rgba(0, 242, 254, 0.8)" }}
            whileTap={{ scale: 0.95 }}
            type="submit"
            className="w-full bg-blue-600 border border-blue-400 text-white font-extrabold py-3.5 rounded-xl transition-all shadow-[0_0_10px_rgba(37,99,235,0.6)]"
          >
            LOGIN
          </motion.button>
        </form>
        
        <p className="mt-8 text-center text-sm text-gray-400">
          New here?{' '}
          <Link to="/register" className="font-bold text-primary hover:text-white transition-colors">
            Create an account
          </Link>
        </p>
      </motion.div>
    </div>
  );
};

export default Login;
