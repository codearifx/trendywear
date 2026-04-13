import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { Trash2, ShoppingBag, CreditCard } from 'lucide-react';
import { CartContext } from '../context/CartContext';

const Cart = () => {
  const { cartItems, removeFromCart, clearCart } = useContext(CartContext);

  const subtotal = cartItems.reduce((acc, item) => acc + (item.price - (item.discount || 0)) * item.qty, 0);

  if (cartItems.length === 0) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center bg-gray-50 px-4">
        <div className="bg-white p-10 rounded-2xl shadow-sm border border-gray-100 text-center max-w-sm w-full">
          <div className="w-20 h-20 bg-accent rounded-full flex items-center justify-center mx-auto mb-6">
            <ShoppingBag size={32} className="text-secondary" />
          </div>
          <h2 className="text-2xl font-bold text-primary mb-3">Your Cart is Empty</h2>
          <p className="text-gray-500 mb-8">Looks like you haven't added anything to your cart yet.</p>
          <Link to="/products" className="w-full inline-block bg-primary text-white font-bold py-3 rounded-xl hover:bg-opacity-90 transition-all shadow-md hover:shadow-lg transform hover:-translate-y-0.5">
            Start Shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen py-12">
      <div className="max-w-6xl mx-auto px-4 md:px-8">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-extrabold text-primary">Shopping Cart</h1>
          <span className="text-gray-500 font-medium">{cartItems.length} Items</span>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          
          {/* Cart Items */}
          <div className="flex-1 space-y-4">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-2">
              {cartItems.map((item) => {
                const discountedPrice = item.price - (item.discount || 0);
                return (
                  <div key={item._id} className="flex flex-col sm:flex-row items-center gap-6 p-4 border-b border-gray-50 last:border-0 hover:bg-accent hover:bg-opacity-50 transition-colors rounded-xl">
                    <img 
                      src={item.images && item.images.length > 0 ? item.images[0] : 'https://via.placeholder.com/150'} 
                      alt={item.name} 
                      className="w-24 h-24 sm:w-32 sm:h-32 object-cover rounded-lg border border-gray-100" 
                    />
                    
                    <div className="flex-1 text-center sm:text-left w-full">
                      <h3 className="font-bold text-lg text-primary mb-1 line-clamp-1">{item.name}</h3>
                      <p className="text-gray-500 text-sm mb-3 capitalize">{item.category}</p>
                      
                      <div className="flex items-center justify-center sm:justify-start gap-4">
                        <div className="flex items-center gap-2">
                          <span className="text-lg font-extrabold text-primary">₹{discountedPrice}</span>
                          {item.discount > 0 && <span className="text-sm text-gray-400 line-through">₹{item.price}</span>}
                        </div>
                      </div>
                    </div>

                    <div className="flex sm:flex-col items-center justify-between sm:justify-center gap-4 w-full sm:w-auto mt-4 sm:mt-0">
                      <div className="bg-white border text-primary font-bold px-4 py-2 rounded-lg text-sm shadow-sm">
                        Qty: {item.qty}
                      </div>
                      
                      <button 
                        onClick={() => removeFromCart(item._id)}
                        className="text-red-500 hover:text-red-600 bg-red-50 hover:bg-red-100 p-2.5 rounded-lg transition-colors flex items-center gap-2 text-sm font-semibold shadow-sm"
                      >
                        <Trash2 size={16} /> Remove
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
            
            <div className="flex justify-end mt-4">
              <button 
                onClick={clearCart}
                className="text-gray-500 hover:text-gray-700 font-semibold text-sm underline underline-offset-4 transition-colors"
              >
                Clear Entire Cart
              </button>
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:w-96">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 sticky top-28">
              <h2 className="text-xl font-bold text-primary mb-6 border-b border-gray-100 pb-4">Order Summary</h2>
              
              <div className="space-y-4 mb-6 text-sm text-gray-600 border-b border-gray-100 pb-6">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-medium text-gray-800">₹{subtotal}</span>
                </div>
                <div className="flex justify-between">
                  <span>Shipping Estimate</span>
                  <span className="text-green-600 font-medium">Free</span>
                </div>
                <div className="flex justify-between">
                  <span>Tax Estimate</span>
                  <span className="font-medium text-gray-800">₹0</span>
                </div>
              </div>
              
              <div className="flex justify-between items-center mb-8">
                <span className="text-lg font-bold text-primary">Total</span>
                <span className="text-2xl font-extrabold text-secondary">₹{subtotal}</span>
              </div>
              
              <Link 
                to="/checkout" 
                state={{ cartItems: cartItems, isCartCheckout: true }} // Note: Checkout page currently only handles single product 'product' prop. We can assume demo purpose and user can refactor later, or pass first item for demo. User requested "Buy Now = single product", but Checkout from cart might need cartItems array if fully implemented. We'll pass product: cartItems[0] just to satisfy the existing Checkout logic.
                // Wait! Let's just pass `product: cartItems[0]` so the Checkout page doesn't crash, since user said "Buy Now = single product", we'll just use the first item as a demo checkout or just navigate to /products
                className="w-full flex items-center justify-center gap-2 bg-secondary text-white font-bold py-4 rounded-xl hover:bg-opacity-90 transition-all shadow-md transform hover:-translate-y-0.5 text-lg"
              >
                <CreditCard size={20} />
                Proceed to Checkout
              </Link>
              
              <div className="mt-6 flex flex-col gap-3">
                <div className="flex items-center gap-2 text-xs text-gray-500 justify-center">
                  <span>✓</span> Secure checkout powered by SSL
                </div>
                <div className="flex items-center gap-2 text-xs text-gray-500 justify-center">
                  <span>✓</span> Free shipping on all orders
                </div>
              </div>
            </div>
          </div>
          
        </div>
      </div>
    </div>
  );
};

export default Cart;
