import React, { useContext } from 'react';
import { Heart, Star } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { WishlistContext } from '../context/WishlistContext';
import { getImageUrl } from '../utils/getImageUrl';
import { motion } from 'framer-motion';

const ProductCard = ({ product }) => {
  const navigate = useNavigate();
  const { toggleWishlist, isLiked } = useContext(WishlistContext);
  
  const originalPrice = product.price || 0;
  const discountRate = product.discount || 0;
  const discountedPrice = product.finalPrice || Math.floor(originalPrice - (originalPrice * discountRate / 100));
  
  const liked = isLiked(product._id);

  const renderStars = () => {
    const stars = [];
    const rating = product.rating || 4.5;
    for (let i = 1; i <= 5; i++) {
        stars.push(
          <Star 
            key={i} 
            size={14} 
            className={`${i <= rating ? 'text-[#0fff50] fill-[#0fff50]' : 'text-gray-600'} transition-colors`} 
          />
        );
    }
    return stars;
  };

  const handleCardClick = (e) => {
    // Navigate to details page
    navigate(`/product/${product._id || product.id}`, { state: { product } });
  };

  const handleWishlist = (e) => {
    e.stopPropagation();
    toggleWishlist(product._id);
  };

  return (
    <motion.div 
      whileHover={{ y: -10, scale: 1.02 }}
      onClick={handleCardClick}
      className="glass-panel rounded-2xl p-4 border border-gray-800 hover:border-primary relative group overflow-hidden transition-all duration-300 flex flex-col h-full cursor-pointer hover:neon-border"
    >
      {/* Glow Effect Background overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl pointer-events-none"></div>

      {/* Discount Badge */}
      {discountRate > 0 && (
        <div className="absolute top-4 left-4 bg-primary text-dark text-xs font-bold px-2 py-1 rounded bg-opacity-90 z-20 shadow-[0_0_8px_rgba(0,242,254,0.8)]">
          -{discountRate}% OFF
        </div>
      )}

      {/* Wishlist Button */}
      <button 
        className="absolute top-4 right-4 bg-card/60 backdrop-blur-md p-2 rounded-full shadow-[0_0_10px_rgba(0,0,0,0.5)] hover:scale-110 transition-transform z-20 border border-gray-700"
        onClick={handleWishlist}
      >
        <Heart fill={liked ? '#0fff50' : 'none'} color={liked ? '#0fff50' : '#888'} size={18} className={liked ? 'drop-shadow-[0_0_5px_rgba(15,255,80,0.8)]' : ''} />
      </button>

      {/* Image Container */}
      <div className="relative h-64 overflow-hidden rounded-xl bg-gray-900 mb-4 transition-all duration-500">
        <img 
          src={getImageUrl(product.image || product.images)} 
          alt={product.name} 
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 opacity-90 group-hover:opacity-100" 
        />
      </div>

      {/* Product Details */}
      <div className="flex-1 flex flex-col justify-between relative z-10">
        <div>
          <h3 className="font-semibold text-gray-100 text-lg leading-tight mb-2 truncate" title={product.name}>
            {product.name}
          </h3>
          
          {/* Reviews & Ratings */}
          <div className="flex items-center gap-2 mb-3">
            <div className="flex items-center gap-0.5">
              {renderStars()}
            </div>
            <span className="text-xs text-gray-400 font-medium tracking-wide">
              ({product.numReviews || Math.floor(Math.random() * 100 + 20)} Reviews)
            </span>
          </div>
        </div>

        <div className="flex items-end gap-3 mt-4">
          <span className="text-xl font-bold text-primary neon-text">₹{discountedPrice}</span>
          {discountRate > 0 && (
            <span className="text-sm font-medium text-gray-500 line-through mb-0.5">₹{originalPrice}</span>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default ProductCard;

