import React, { useState, useContext, useEffect } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { CartContext } from '../context/CartContext';
import { getImageUrl } from '../utils/getImageUrl';
import { MOCK_PRODUCTS } from '../data/products';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingCart, CreditCard, ChevronRight, ChevronLeft, Tag } from 'lucide-react';

const ProductDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useContext(AuthContext);
  const { addToCart } = useContext(CartContext);

  const [product, setProduct] = useState(location.state?.product || null);
  const [selectedSize, setSelectedSize] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [currentImageIdx, setCurrentImageIdx] = useState(0);
  
  const [coupon, setCoupon] = useState('');
  const [couponApplied, setCouponApplied] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  useEffect(() => {
    window.scrollTo(0, 0);
    if (!product) {
      // Mock fetch
      const found = MOCK_PRODUCTS.find(p => p.id == id || p._id === id);
      if (found) setProduct(found);
    }
  }, [id, product]);

  if (!product) {
    return <div className="min-h-screen flex items-center justify-center text-primary text-2xl font-bold animate-pulse">Loading Details...</div>;
  }

  const originalPrice = product.price || 999;
  const discountRate = product.discount || 0;
  const discountedPrice = product.finalPrice || Math.floor(originalPrice - (originalPrice * discountRate / 100));
  
  const sizes = product.sizes || ['S', 'M', 'L', 'XL'];
  const stock = product.stock || Math.floor(Math.random() * 20) + 5;
  const images = product.images || [product.image];

  const handleApplyCoupon = () => {
    if (coupon.trim().toUpperCase() === 'US120') {
      setCouponApplied(true);
      setErrorMsg('');
    } else {
      setErrorMsg('Invalid Coupon Code');
      setCouponApplied(false);
    }
  };

  const handleAddToCart = () => {
    if (!selectedSize) {
      setErrorMsg('Please select a size before adding to cart');
      setTimeout(() => setErrorMsg(''), 3000);
      return;
    }
    const cartProduct = { ...product, selectedSize, quantity, couponApplied };
    if(addToCart) addToCart(cartProduct);
    alert('Added to cart!');
  };

  const handleBuyNow = () => {
    if (!selectedSize) {
      setErrorMsg('Please select a size before proceeding');
      setTimeout(() => setErrorMsg(''), 3000);
      return;
    }
    if (!user) {
      navigate('/login');
    } else {
      // Navigate to specialized AddressPage
      navigate('/checkout/address', { 
        state: { 
          product, 
          selectedSize, 
          quantity, 
          finalTotal: couponApplied ? discountedPrice - 120 : discountedPrice 
        } 
      });
    }
  };

  const nextImage = () => {
    setCurrentImageIdx((prev) => (prev + 1) % images.length);
  };
  const prevImage = () => {
    setCurrentImageIdx((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  return (
    <div className="min-h-screen bg-dark py-12 px-4 md:px-8 text-gray-200">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12">
        
        {/* Left Column - Image Carousel */}
        <div className="relative group rounded-3xl overflow-hidden glass-panel border border-gray-800 p-4">
          <AnimatePresence mode="wait">
            <motion.img
              key={currentImageIdx}
              initial={{ opacity: 0, scale: 1.1 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              src={getImageUrl(images[currentImageIdx])}
              alt={product.name}
              className="w-full h-[500px] object-cover rounded-2xl"
            />
          </AnimatePresence>
          
          {images.length > 1 && (
            <>
              <button onClick={prevImage} className="absolute left-6 top-1/2 -translate-y-1/2 bg-black/50 p-2 rounded-full hover:bg-black/80 hover:text-primary transition-all">
                <ChevronLeft size={24} />
              </button>
              <button onClick={nextImage} className="absolute right-6 top-1/2 -translate-y-1/2 bg-black/50 p-2 rounded-full hover:bg-black/80 hover:text-primary transition-all">
                <ChevronRight size={24} />
              </button>
            </>
          )}

          {/* Glowing underlying element */}
          <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 w-3/4 h-8 bg-primary/30 blur-2xl rounded-full"></div>
        </div>

        {/* Right Column - Details */}
        <div className="flex flex-col space-y-6 relative">
          
          {/* Toast Warning */}
          <AnimatePresence>
            {errorMsg && (
              <motion.div 
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="absolute -top-12 left-0 right-0 bg-red-500/20 border border-red-500 text-red-100 px-4 py-2 rounded-xl text-center glass-panel z-50 backdrop-blur-md"
              >
                {errorMsg}
              </motion.div>
            )}
          </AnimatePresence>

          <h1 className="text-4xl font-extrabold text-white tracking-wide">{product.name}</h1>
          
          {/* Price */}
          <div className="flex items-center gap-4 border-b border-gray-800 pb-6">
            <span className="text-4xl font-black text-primary neon-text opacity-90">₹{discountedPrice}</span>
            {discountRate > 0 && (
              <>
                <span className="text-xl text-gray-500 line-through">₹{originalPrice}</span>
                <span className="bg-primary/20 text-primary px-3 py-1 rounded-lg font-bold text-sm border border-primary/50 shadow-[0_0_10px_rgba(0,242,254,0.3)]">
                  {discountRate}% OFF
                </span>
              </>
            )}
          </div>

          {/* Stock */}
          <div>
            <p className="text-sm font-semibold text-accent mb-2 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-accent neon-border-green animate-pulse"></span>
              Only {stock} items left in stock!
            </p>
          </div>

          {/* Size Selector */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-3">Select Size</h3>
            <div className="flex flex-wrap gap-3">
              {sizes.map((size) => (
                <button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  className={`w-14 h-14 rounded-xl font-bold flex items-center justify-center transition-all duration-300 ${
                    selectedSize === size 
                      ? 'bg-primary text-black neon-border shadow-lg scale-110' 
                      : 'bg-card text-gray-400 border border-gray-700 hover:border-primary hover:text-primary'
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          {/* Quantity Selector */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-3">Quantity</h3>
            <div className="flex items-center gap-4 bg-card border border-gray-700 rounded-xl w-max p-1">
              <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="px-4 py-2 hover:text-primary transition-colors font-bold text-xl">-</button>
              <span className="w-8 text-center font-bold text-lg">{quantity}</span>
              <button onClick={() => setQuantity(Math.min(10, quantity + 1))} className="px-4 py-2 hover:text-primary transition-colors font-bold text-xl">+</button>
            </div>
          </div>

          {/* Coupon Code section */}
          <div className="pt-4 border-t border-gray-800">
             <h3 className="text-lg font-semibold text-white mb-3 flex items-center gap-2"><Tag size={18}/> Apply Coupon</h3>
             <div className="flex gap-2">
               <input 
                 type="text" 
                 value={coupon} 
                 onChange={(e) => setCoupon(e.target.value)} 
                 placeholder="Enter 'US120' for ₹120 OFF"
                 className="flex-1 bg-card border border-gray-700 rounded-xl px-4 py-3 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary text-white uppercase placeholder-gray-600"
               />
               <button 
                 onClick={handleApplyCoupon}
                 className="bg-card border border-gray-700 hover:border-primary px-6 py-3 rounded-xl font-bold transition-all"
               >
                 APPLY
               </button>
             </div>
             <AnimatePresence>
              {couponApplied && (
                <motion.div 
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  className="mt-3 text-accent font-bold bg-accent/10 border border-accent/30 p-3 rounded-xl flex items-center gap-2 neon-border-green overflow-hidden"
                >
                   Coupon 'US120' Applied! Flat ₹120 discount on checkout.
                </motion.div>
              )}
             </AnimatePresence>
          </div>

          {/* Action Buttons */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8 pt-4">
            <button 
              onClick={handleAddToCart}
              className="flex items-center justify-center gap-2 py-4 rounded-xl border-2 border-primary text-primary font-extrabold text-lg transition-all hover:bg-primary/10 hover:neon-border"
            >
              <ShoppingCart size={22} />
              ADD TO CART
            </button>
            <button 
              onClick={handleBuyNow}
              className="flex items-center justify-center gap-2 py-4 rounded-xl bg-primary text-black font-extrabold text-lg transition-all hover:scale-[1.02] hover:shadow-[0_0_20px_rgba(0,242,254,0.6)]"
            >
              <CreditCard size={22} />
              BUY NOW
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};

export default ProductDetailsPage;
