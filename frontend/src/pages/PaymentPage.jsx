import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { CreditCard, CheckCircle2 } from 'lucide-react';

const paymentOptions = [
  { id: 'gpay', label: 'Google Pay', icon: 'GPay' },
  { id: 'phonepe', label: 'PhonePe', icon: 'PhonePe' },
  { id: 'upi', label: 'Other UPI', icon: 'UPI' },
  { id: 'cod', label: 'Cash on Delivery', icon: 'COD' }
];

const PaymentPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { product, selectedSize, quantity, finalTotal, address } = location.state || {};
  
  const [selectedMethod, setSelectedMethod] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);

  const handlePayment = () => {
    if (!selectedMethod) {
      alert("Please select a payment method.");
      return;
    }

    // Trigger success animation
    setIsSuccess(true);
    
    // Auto redirect after 3 seconds
    setTimeout(() => {
      navigate('/');
    }, 3000);
  };

  return (
    <div className="min-h-screen bg-dark py-12 px-4 flex items-center justify-center relative overflow-hidden">
      
      {/* Background ambient glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-primary/20 blur-[100px] rounded-full"></div>

      <AnimatePresence>
        {isSuccess ? (
          <motion.div 
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="glass-panel border-2 border-accent p-12 rounded-[2rem] flex flex-col items-center justify-center text-center shadow-[0_0_50px_rgba(15,255,80,0.4)] z-50 relative"
          >
            <motion.div 
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", bounce: 0.5, delay: 0.2 }}
            >
              <CheckCircle2 size={100} className="text-accent drop-shadow-[0_0_15px_rgba(15,255,80,0.8)] mb-6" />
            </motion.div>
            <h2 className="text-4xl font-extrabold text-white mb-2 neon-text">Payment Successful 🎉</h2>
            <p className="text-gray-400">Redirecting to Homepage...</p>
          </motion.div>
        ) : (
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            className="w-full max-w-xl z-10"
          >
            <div className="glass-panel border border-primary/40 rounded-[2rem] p-8 md:p-10 relative">
              <div className="flex items-center gap-3 mb-8 border-b border-gray-800 pb-6">
                <CreditCard className="text-primary w-8 h-8 drop-shadow-[0_0_8px_rgba(0,242,254,0.8)]" />
                <h1 className="text-3xl font-extrabold text-white">Payment Method</h1>
              </div>

              {/* Order Amount Summary */}
              {finalTotal && (
                <div className="mb-8 p-4 bg-primary/10 rounded-xl border border-primary/20 flex justify-between items-center shadow-inner">
                  <span className="text-gray-300 font-medium">To Pay</span>
                  <span className="text-2xl font-black text-primary neon-text">₹{finalTotal}</span>
                </div>
              )}

              <div className="space-y-4 mb-8">
                {paymentOptions.map((opt) => (
                  <div 
                    key={opt.id}
                    onClick={() => setSelectedMethod(opt.id)}
                    className={`cursor-pointer border p-5 rounded-xl transition-all duration-300 flex items-center justify-between ${
                      selectedMethod === opt.id 
                        ? 'border-primary bg-primary/10 shadow-[0_0_15px_rgba(0,242,254,0.3)]' 
                        : 'border-gray-700 bg-card/40 hover:border-gray-500 hover:bg-card'
                    }`}
                  >
                    <div className="flex items-center gap-4">
                      <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                         selectedMethod === opt.id ? 'border-primary bg-primary' : 'border-gray-600'
                      }`}>
                         {selectedMethod === opt.id && <div className="w-2 h-2 rounded-full bg-dark"></div>}
                      </div>
                      <span className={`font-bold ${selectedMethod === opt.id ? 'text-primary' : 'text-gray-300'}`}>
                        {opt.label}
                      </span>
                    </div>
                    <span className="text-xs font-black px-2 py-1 bg-gray-800 rounded text-gray-400">
                      {opt.icon}
                    </span>
                  </div>
                ))}
              </div>

              <button 
                onClick={handlePayment}
                className="w-full py-4 rounded-xl bg-primary text-black font-extrabold text-lg tracking-wide hover:scale-[1.02] transition-transform shadow-[0_0_20px_rgba(0,242,254,0.4)]"
              >
                CONTINUE PAYMENT
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default PaymentPage;
