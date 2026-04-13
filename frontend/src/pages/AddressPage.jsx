import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { MapPin, Navigation, AlertCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const tamilNaduCities = [
  "Chennai", "Coimbatore", "Madurai", "Tiruchirappalli", "Salem", 
  "Tiruppur", "Erode", "Vellore", "Thoothukudi", "Tirunelveli", 
  "Dindigul", "Karur", "Kanchipuram", "Cuddalore", "Nagapattinam"
];

const AddressPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { product, selectedSize, quantity, finalTotal } = location.state || {};

  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    pincode: '',
    city: '',
    houseNo: '',
    area: '',
    landmark: ''
  });

  const [errorMsg, setErrorMsg] = useState('');

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleUseLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          alert(`Location tracked! Lat: ${position.coords.latitude}, Lng: ${position.coords.longitude}`);
          // Mock filling some data
          setFormData({ ...formData, pincode: '600001', city: 'Chennai' });
        },
        () => {
          alert('Unable to retrieve your location');
        }
      );
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { fullName, phone, pincode, city, houseNo, area } = formData;
    
    if (!fullName || !phone || !pincode || !city || !houseNo || !area) {
      setErrorMsg('Please fill out all required fields.');
      return;
    }

    if (!tamilNaduCities.includes(city)) {
       setErrorMsg('Delivery is restricted to Tamil Nadu cities only.');
       return;
    }

    // Pass data forward to payment
    navigate('/checkout/payment', { 
      state: { 
        product, 
        selectedSize, 
        quantity, 
        finalTotal,
        address: formData 
      } 
    });
  };

  return (
    <div className="min-h-screen bg-dark py-12 px-4 flex items-center justify-center">
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-2xl relative"
      >
        {/* Glow backdrop */}
        <div className="absolute -inset-1 bg-gradient-to-r from-primary to-secondary opacity-30 blur-2xl rounded-[3rem] pointer-events-none"></div>

        <div className="relative glass-panel border border-primary/40 rounded-[2rem] p-8 md:p-12 neon-border">
          
          <div className="flex items-center justify-center gap-3 mb-8 border-b border-gray-800 pb-6">
            <MapPin className="text-primary w-8 h-8 drop-shadow-[0_0_8px_rgba(0,242,254,0.8)]" />
            <h1 className="text-3xl font-extrabold text-white tracking-wide">Delivery Details</h1>
          </div>

          <AnimatePresence>
            {errorMsg && (
              <motion.div 
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="mb-6 bg-red-900/30 border border-red-500/50 text-red-200 px-4 py-3 rounded-xl flex items-center gap-3 overflow-hidden text-sm font-medium"
              >
                <AlertCircle size={18} className="text-red-400 shrink-0" />
                {errorMsg}
              </motion.div>
            )}
          </AnimatePresence>

          <form onSubmit={handleSubmit} className="space-y-6">
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-1.5">
                <label className="text-sm font-medium text-gray-400 ms-1">Full Name *</label>
                <input 
                  type="text" name="fullName" value={formData.fullName} onChange={handleInputChange} required
                  className="w-full bg-card border border-gray-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all shadow-inner"
                  placeholder="John Doe"
                />
              </div>
              
              <div className="space-y-1.5">
                <label className="text-sm font-medium text-gray-400 ms-1">Phone Number *</label>
                <input 
                  type="tel" name="phone" value={formData.phone} onChange={handleInputChange} required
                  className="w-full bg-card border border-gray-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all shadow-inner"
                  placeholder="+91 9876543210"
                />
              </div>
            </div>

            <div className="w-full flex items-center justify-between bg-card/50 border border-primary/20 p-4 rounded-xl">
               <div className="text-sm text-gray-300">
                  <p className="font-bold text-white">Use Current Location <span className="text-xs font-normal text-gray-400">(Optional)</span></p>
                  <p className="text-xs mt-0.5">Let us automatically fill in your area</p>
               </div>
               <button 
                 type="button" 
                 onClick={handleUseLocation}
                 className="flex items-center gap-2 bg-primary/20 text-primary px-4 py-2 rounded-lg font-bold text-sm border border-primary hover:bg-primary hover:text-black transition-colors"
               >
                 <Navigation size={16} /> Locate Me
               </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-1.5">
                <label className="text-sm font-medium text-gray-400 ms-1">Pincode *</label>
                <input 
                  type="text" name="pincode" value={formData.pincode} onChange={handleInputChange} required
                  className="w-full bg-card border border-gray-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
                  placeholder="600001"
                />
              </div>
              
              <div className="space-y-1.5">
                <label className="text-sm font-medium text-gray-400 ms-1">City (Tamil Nadu Only) *</label>
                <select 
                  name="city" value={formData.city} onChange={handleInputChange} required
                  className="w-full bg-card border border-gray-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-primary transition-all appearance-none"
                >
                  <option value="" disabled>Select a city</option>
                  {tamilNaduCities.map(city => (
                    <option key={city} value={city} className="bg-card text-white py-2">{city}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-sm font-medium text-gray-400 ms-1">House No / Building Name *</label>
              <input 
                type="text" name="houseNo" value={formData.houseNo} onChange={handleInputChange} required
                className="w-full bg-card border border-gray-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
                placeholder="No 12, Example Apartments"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-sm font-medium text-gray-400 ms-1">Area / Street *</label>
              <input 
                type="text" name="area" value={formData.area} onChange={handleInputChange} required
                className="w-full bg-card border border-gray-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
                placeholder="MG Road"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-sm font-medium text-gray-400 ms-1">Landmark (Optional)</label>
              <input 
                type="text" name="landmark" value={formData.landmark} onChange={handleInputChange}
                className="w-full bg-card border border-gray-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-primary transition-all"
                placeholder="Near central station"
              />
            </div>

            <div className="pt-6">
              <button 
                type="submit"
                className="w-full py-4 rounded-xl bg-primary text-black font-extrabold text-lg tracking-wide hover:scale-[1.02] transition-transform shadow-[0_0_20px_rgba(0,242,254,0.4)]"
              >
                PROCEED TO PAYMENT
              </button>
            </div>

          </form>
        </div>
      </motion.div>
    </div>
  );
};

export default AddressPage;
