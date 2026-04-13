import React from 'react';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const HeroBanner = () => {
  return (
    <div className="relative w-full h-[80vh] md:h-[600px] overflow-hidden bg-primary flex items-center">
      {/* Dynamic Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-900 via-primary to-purple-900"></div>
      
      {/* Decorative Blur Blobs */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-pink-600 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
      <div className="absolute top-0 right-0 w-96 h-96 bg-secondary rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>
      <div className="absolute -bottom-32 left-32 w-96 h-96 bg-purple-600 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-4000"></div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-8 w-full flex flex-col md:flex-row items-center justify-between gap-12">
        <div className="flex-1 text-center md:text-left space-y-8">
          <div className="inline-block px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white text-sm font-bold tracking-widest mb-2 shadow-xl">
            NEW COLLECTION 2026
          </div>
          <h1 className="text-5xl md:text-7xl font-black text-white leading-tight drop-shadow-lg">
            Discover Your <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-secondary">True Style.</span>
          </h1>
          <p className="text-gray-300 text-lg md:text-xl font-medium max-w-lg mx-auto md:mx-0 leading-relaxed drop-shadow-md">
            Experience our latest arrivals.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
             <Link to="/categories" className="px-8 py-4 bg-secondary text-white font-black rounded-lg hover:bg-opacity-90 transition-all shadow-[0_0_20px_rgba(255,62,108,0.4)] flex items-center justify-center gap-2">
               Shop Categorys <ArrowRight size={20} />
             </Link>
             <Link to="/reels" className="px-8 py-4 bg-white/10 backdrop-blur-md text-white border border-white/20 font-bold rounded-lg hover:bg-white/20 transition-all flex items-center justify-center">
               WATCH REELS
             </Link>
          </div>
        </div>
        
        <div className="hidden md:block flex-1 relative">
            <div className="relative w-[400px] h-[500px] mx-auto z-20 overflow-hidden rounded-2xl transform rotate-3 hover:rotate-0 transition-transform duration-500 shadow-2xl border-4 border-white/10">
                <img src="https://filmfare.wwmindia.com/photogallery/2025/apr/goodbadugly51744295346.jpg" alt="Fashion Model" className="w-full h-full object-cover" />
            </div>
            {/* Background floating image */}
            <div className="absolute top-10 -left-10 w-[250px] h-[350px] z-10 overflow-hidden rounded-2xl transform -rotate-6 opacity-60 shadow-xl blur-[1px]">
                <img src="https://static.toiimg.com/thumb/msid-80303622,width-400,resizemode-4/80303622.jpg" alt="Fashion Backdrop" className="w-full h-full object-cover" />
            </div>
        </div>
      </div>
    </div>
  );
};

export default HeroBanner;
