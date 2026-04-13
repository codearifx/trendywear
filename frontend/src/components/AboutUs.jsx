import React from 'react';
import { Target, Heart, Award } from 'lucide-react';

const AboutUs = () => {
  return (
    <div className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-extrabold text-primary mb-4 inline-block relative">
            About Trendy Wear
            <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-1/2 h-1.5 bg-secondary rounded-full"></div>
          </h2>
          <p className="text-gray-500 max-w-2xl mx-auto mt-6 text-lg">
            We are more than just a brand. We are a fashion movement aiming to bring premium quality, highly trendy apparel to everyone without breaking the bank.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
          {/* Mission */}
          <div className="bg-gray-50 p-8 rounded-2xl shadow-sm border border-gray-100 hover:-translate-y-2 transition-transform duration-300 text-center flex flex-col items-center">
            <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center text-white mb-6 shadow-lg shadow-blue-500/30">
              <Target size={32} />
            </div>
            <h3 className="text-xl font-bold text-primary mb-3">Our Mission</h3>
            <p className="text-gray-600 leading-relaxed">
              To democratize fashion by creating high-quality, sustainable, and strictly trendy styles accessible to fashion-forward individuals worldwide.
            </p>
          </div>

          {/* Vision */}
          <div className="bg-gray-50 p-8 rounded-2xl shadow-sm border border-gray-100 hover:-translate-y-2 transition-transform duration-300 text-center flex flex-col items-center">
            <div className="w-16 h-16 bg-gradient-to-br from-pink-500 to-secondary rounded-full flex items-center justify-center text-white mb-6 shadow-lg shadow-secondary/30">
              <Heart size={32} />
            </div>
            <h3 className="text-xl font-bold text-primary mb-3">Our Vision</h3>
            <p className="text-gray-600 leading-relaxed">
              To become the most loved apparel destination, recognized globally for putting the customer at the center of all fashion innovation.
            </p>
          </div>

          {/* Quality */}
          <div className="bg-gray-50 p-8 rounded-2xl shadow-sm border border-gray-100 hover:-translate-y-2 transition-transform duration-300 text-center flex flex-col items-center">
            <div className="w-16 h-16 bg-gradient-to-br from-orange-400 to-amber-500 rounded-full flex items-center justify-center text-white mb-6 shadow-lg shadow-orange-500/30">
              <Award size={32} />
            </div>
            <h3 className="text-xl font-bold text-primary mb-3">Premium Quality</h3>
            <p className="text-gray-600 leading-relaxed">
              We never compromise. Every thread, every stitch, and every fabric is carefully curated to ensure maximum comfort and durability.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
