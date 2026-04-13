import React, { useState, useContext } from 'react';
import { Search, User, ShoppingBag, LogOut, FileText, Trash2, Heart } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { CartContext } from '../context/CartContext';
import { WishlistContext } from '../context/WishlistContext';

const Navbar = () => {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const navigate = useNavigate();

  const { user, logout, deleteAccount } = useContext(AuthContext);
  const { cartItems } = useContext(CartContext);
  const { likedProducts } = useContext(WishlistContext);

  const totalCartItems = cartItems.reduce((acc, item) => acc + item.qty, 0);

  const handleDeleteAccount = () => {
    if (window.confirm("Are you sure you want to delete your account? This action cannot be undone.")) {
      deleteAccount();
      navigate('/');
    }
  };

  return (
    <div className="w-full sticky top-0 z-50 shadow-md bg-white">
      {/* Top Navbar */}
      <div className="flex items-center justify-between h-20 px-4 md:px-8 max-w-7xl mx-auto">
        
        {/* Logo */}
        <Link to="/" className="text-2xl font-extrabold tracking-wider text-black">
          TRENDY WEAR
        </Link>
        
        {/* Search Bar */}
        <div className="hidden md:flex flex-1 max-w-xl mx-8 relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 " size={20} />
          <input 
            type="text" 
            placeholder="Search for products, brands and more" 
            className="w-full py-3 pl-12 pr-4 rounded-md bg-accent focus:bg-white focus:outline-none focus:ring-1 focus:ring-secondary transition-all text-black"
          />
        </div>

        {/* Actions */}
        <div className="flex items-center gap-6">
          {/* Profile Dropdown */}
          <div 
            className="relative flex flex-col items-center gap-1 cursor-pointer text-primary hover:text-secondary group "
            onMouseEnter={() => setIsProfileOpen(true)}
            onMouseLeave={() => setIsProfileOpen(false)}
          >
            <div className="flex flex-col items-center py-2" onClick={() => !user ? navigate('/login') : null}>
              <User size={24} />
              <span className="text-xs font-semibold">{user ? `Hello, ${user.name}` : 'Login'}</span>
            </div>
            
            {/* Dropdown Menu */}
            {isProfileOpen && user && (
              <div className="absolute top-full right-0 w-56 bg-white shadow-xl rounded-md py-2 border border-gray-100 flex flex-col animate-fade-in-down">
                <div className="px-4 py-3 border-b border-gray-100">
                  <strong className="block text-sm text-primary ">My Profile</strong>
                  <span className="text-xs text-gray-500">{user.email}</span>
                </div>
                <Link to="/orders" className="flex items-center gap-3 px-4 py-3 text-sm text-gray-700 hover:bg-accent transition-colors">
                  <FileText size={16} /> My Orders
                </Link>
                <button onClick={handleDeleteAccount} className="flex items-center gap-3 px-4 py-3 text-sm text-gray-700 hover:bg-accent transition-colors w-full text-left">
                  <Trash2 size={16} /> Delete Account
                </button>
                <div className="border-t border-gray-100 my-1"></div>
                <button onClick={logout} className="flex items-center gap-3 px-4 py-3 text-sm text-red-600 hover:bg-accent transition-colors w-full text-left">
                  <LogOut size={16} /> Logout
                </button>
              </div>
            )}
          </div>
          
          <Link to="/liked-products" className="relative flex flex-col items-center gap-1 text-primary hover:text-secondary cursor-pointer">
            <Heart size={24} />
            <span className="text-xs font-semibold text-black">Likes</span>
            {likedProducts.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-secondary text-white text-[10px] font-bold h-5 w-5 flex items-center justify-center rounded-full">
                {likedProducts.length}
              </span>
            )}
          </Link>
          
          {/* Cart */}
          <Link to="/cart" className="relative flex flex-col items-center gap-1 text-primary hover:text-secondary cursor-pointer">
            <ShoppingBag size={24} />
            <span className="text-xs font-semibold text-black">Cart</span>
            {totalCartItems > 0 && (
              <span className="absolute -top-2 -right-2 bg-secondary text-white text-[10px] font-bold h-5 w-5 flex items-center justify-center rounded-full">
                {totalCartItems}
              </span>
            )}
          </Link>
        </div>
      </div>

      {/* Secondary Navigation Menu */}
      <div className="border-t border-gray-200">
        <ul className="flex items-center justify-center gap-8 py-3 max-w-7xl mx-auto px-4 overflow-x-auto whitespace-nowrap text-sm font-semibold text-gray-700">
          <li><Link to="/" className="hover:text-secondary transition-colors">Home</Link></li>
          <li><Link to="/products" className="hover:text-secondary transition-colors ">All Products</Link></li>
          <li><Link to="/trending" className="hover:text-secondary transition-colors">Trending Products</Link></li>
          <li><Link to="/reels" className="hover:text-secondary transition-colors">Product Reels</Link></li>
          <li><Link to="/categories" className="hover:text-secondary transition-colors">Shop by Category</Link></li>
          <li><Link to="/offers" className="hover:text-secondary transition-colors">Exclusive Offers</Link></li>
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
