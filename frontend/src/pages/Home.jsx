import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import HeroBanner from '../components/HeroBanner';
import AboutUs from '../components/AboutUs';
import ContactSection from '../components/ContactSection';
import Categories from './Categories'; 
import ReelsSection from './ReelsSection'; 
import { MOCK_PRODUCTS } from '../data/products';
import { motion } from 'framer-motion';

const Home = () => {
  const [products, setProducts] = useState(MOCK_PRODUCTS);
  const navigate = useNavigate();

  return (
    <div className="flex flex-col bg-dark text-gray-200">
      
      {/* 1. Hero Banner */}
      <HeroBanner />

      <div className="w-full py-8 px-4 flex justify-center">
        <motion.div 
           initial={{ scale: 0.9, opacity: 0 }}
           animate={{ scale: 1, opacity: 1 }}
           transition={{ duration: 0.8 }}
           className="relative max-w-4xl w-full group cursor-pointer"
           onClick={() => navigate('/products')}
        >
           <div className="absolute -inset-1 bg-gradient-to-r from-primary to-accent opacity-60 group-hover:opacity-100 blur-lg transition duration-1000 group-hover:duration-200 rounded-2xl"></div>
           <div className="relative glass-panel rounded-2xl px-8 py-6 flex flex-col md:flex-row items-center justify-between neon-border-green">
              <div>
                <h3 className="text-3xl font-black text-white tracking-widest uppercase mb-1">
                  Massive Steal Deal
                </h3>
                <p className="text-xl font-bold text-accent neon-text">
                  Buy above ₹5000 this month & get 60% OFF
                </p>
              </div>
              <button 
                className="mt-4 md:mt-0 bg-accent text-dark font-extrabold px-8 py-3 rounded-full shadow-[0_0_15px_rgba(15,255,80,0.6)] hover:scale-105 transition-transform"
              >
                SHOP NOW
              </button>
           </div>
        </motion.div>
      </div>

      {/* 2. Featured Products */}
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-12 w-full">
        <h2 className="text-4xl md:text-5xl font-extrabold mb-16 text-center text-white relative flex justify-center uppercase tracking-wider">
          Featured Collection
          <div className="absolute -bottom-4 w-32 h-2 bg-primary rounded-full shadow-[0_0_15px_rgba(0,242,254,0.8)]"></div>
        </h2>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
          {products.slice(0, 8).map(product => (
            <ProductCard key={product._id || product.id} product={product} />
          ))}
        </div>
      </div>

      {/* 3. Shop by Categories */}
      <Categories />

      {/* 4. Product Reels Section */}
      <div className="w-full mt-12">
        <div className="text-center border-t border-gray-800 pt-16 bg-black">
          <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-4 neon-text">Trending Reels</h2>
          <p className="text-gray-400 mb-8 max-w-lg mx-auto">Watch our products in action. Full screen vertical scrolling experience like never before.</p>
        </div>
        <ReelsSection />
      </div>

      {/* 5. About Us */}
      <AboutUs />

      {/* 6. Contact Us */}
      <ContactSection />
    </div>
  );
};

export default Home;
