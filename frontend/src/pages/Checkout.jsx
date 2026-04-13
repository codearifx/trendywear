import React, { useState, useContext } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { MapPin, CreditCard, ShieldCheck } from 'lucide-react';
import { AuthContext } from '../context/AuthContext';
import { getImageUrl } from '../utils/getImageUrl';

const Checkout = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const product = location.state?.product || null;
  const { user } = useContext(AuthContext);

  const [address, setAddress] = useState({
    name: user?.name || '',
    phone: '',
    pincode: '',
    state: '',
    city: '',
    houseNo: '',
    roadName: '',
  });

  const [paymentMethod, setPaymentMethod] = useState('COD');

  const handleChange = (e) => {
    setAddress({ ...address, [e.target.name]: e.target.value });
  };

  const handlePlaceOrder = (e) => {
    e.preventDefault();
    if (!product) return;

    const newOrder = {
      id: `ORD${Math.floor(Math.random() * 1000000)}`,
      date: new Date().toISOString(),
      product: product,
      address: address,
      paymentMethod: paymentMethod,
      totalAmount: product.price - (product.discount || 0),
      status: 'Processing'
    };

    const existingOrders = JSON.parse(localStorage.getItem('my_orders') || '[]');
    localStorage.setItem('my_orders', JSON.stringify([newOrder, ...existingOrders]));

    alert('Order successfully placed!');
    navigate('/orders');
  };

  if (!product) {
    return (
      <div className="max-w-md mx-auto text-center py-24">
        <h2 className="text-2xl font-bold text-gray-800">No product selected for checkout</h2>
        <button onClick={() => navigate('/products')} className="mt-4 bg-primary text-white px-6 py-2 rounded-md hover:bg-opacity-90">Browse Products</button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-5xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8">
        
        {/* Left Col: Address Form */}
        <div className="md:col-span-2 space-y-6">
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <div className="flex items-center gap-3 mb-6">
              <MapPin className="text-secondary" />
              <h2 className="text-xl font-bold text-primary">Delivery Address</h2>
            </div>
            
            <form onSubmit={handlePlaceOrder} className="space-y-4" id="checkout-form">
              <div className="grid grid-cols-2 gap-4">
                <div className="col-span-2 md:col-span-1">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                  <input required name="name" value={address.name} onChange={handleChange} className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary" />
                </div>
                <div className="col-span-2 md:col-span-1">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                  <input required type="tel" name="phone" value={address.phone} onChange={handleChange} className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary" />
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="col-span-1">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Pincode</label>
                  <input required name="pincode" value={address.pincode} onChange={handleChange} className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary" />
                </div>
                <div className="col-span-1">
                  <label className="block text-sm font-medium text-gray-700 mb-1">State</label>
                  <input required name="state" value={address.state} onChange={handleChange} className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary" />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">City</label>
                <input required name="city" value={address.city} onChange={handleChange} className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary" />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">House No / Building Name</label>
                <input required name="houseNo" value={address.houseNo} onChange={handleChange} className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary" />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Road Name / Area / Colony</label>
                <input required name="roadName" value={address.roadName} onChange={handleChange} className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary" />
              </div>
            </form>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
             <div className="flex items-center gap-3 mb-6">
              <CreditCard className="text-secondary" />
              <h2 className="text-xl font-bold text-primary">Payment Options</h2>
            </div>
            
            <div className="space-y-3">
              {['Cash on Delivery (COD)', 'GPay', 'PhonePe', 'Bank Card / Account'].map((method) => (
                <div 
                  key={method}
                  onClick={() => setPaymentMethod(method)}
                  className={`border p-4 rounded-lg flex items-center justify-between cursor-pointer transition-colors ${paymentMethod === method ? 'border-secondary bg-orange-50' : 'border-gray-200 bg-gray-50 hover:bg-gray-100'}`}
                >
                  <span className={`font-bold ${paymentMethod === method ? 'text-primary' : 'text-gray-600'}`}>{method}</span>
                  <div className={`h-5 w-5 rounded-full border-4 flex-shrink-0 ${paymentMethod === method ? 'border-secondary bg-white' : 'border-gray-300'}`}></div>
                </div>
              ))}
            </div>

          </div>
        </div>

        {/* Right Col: Order Summary */}
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <h2 className="text-xl font-bold text-primary border-b border-gray-100 pb-4 mb-4">Price Details</h2>
            
            <div className="flex gap-4 mb-6">
              <img src={getImageUrl(product.images)} alt={product.name} className="w-16 h-16 object-cover rounded-md border" />
              <div>
                <h3 className="font-semibold text-sm line-clamp-2">{product.name}</h3>
                <p className="text-xs text-gray-500 mt-1">Qty: 1</p>
              </div>
            </div>

            <div className="space-y-3 text-sm text-gray-600 mb-4 pb-4 border-b border-gray-100">
              <div className="flex justify-between">
                <span>Total Product Price</span>
                <span>₹{product.price}</span>
              </div>
              <div className="flex justify-between text-green-600">
                <span>Discount</span>
                <span>- ₹{product.discount || 0}</span>
              </div>
              <div className="flex justify-between">
                <span>Delivery Charges</span>
                <span className="text-green-600 font-semibold">FREE Delivery</span>
              </div>
            </div>

            <div className="flex justify-between font-extrabold text-lg text-primary mb-6">
              <span>Order Total</span>
              <span>₹{product.price - (product.discount || 0)}</span>
            </div>

            <button type="submit" form="checkout-form" className="w-full bg-secondary text-white font-bold py-3 rounded-md hover:bg-opacity-90 transition">
              Place Order
            </button>
          </div>

          <div className="flex items-center gap-3 justify-center text-gray-500 text-sm">
            <ShieldCheck size={20} className="text-green-500" />
            Safe and secure payments
          </div>
        </div>

      </div>
    </div>
  );
};

export default Checkout;
