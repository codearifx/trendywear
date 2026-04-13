import React, { useState, useEffect } from 'react';
import { Package, Truck, CheckCircle, Navigation } from 'lucide-react';
import { Link } from 'react-router-dom';
import { getImageUrl } from '../utils/getImageUrl';

const MyOrders = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const storedOrders = localStorage.getItem('my_orders');
    if (storedOrders) {
      setOrders(JSON.parse(storedOrders));
    }
  }, []);

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-extrabold mb-8 text-primary border-b-4 border-secondary inline-block pb-1">My Orders</h1>
      
      <div className="space-y-6">
        {orders.length === 0 ? (
          <div className="text-center py-16 bg-accent rounded-xl">
            <Package size={64} className="mx-auto text-gray-400 mb-4" />
            <h2 className="text-xl font-bold text-primary mb-2">No Orders Yet</h2>
            <p className="text-gray-500 mb-6">Looks like you haven't made your first purchase.</p>
            <Link to="/products" className="bg-secondary text-white px-6 py-3 rounded-full font-bold hover:bg-opacity-90 transition">Start Shopping</Link>
          </div>
        ) : (
          orders.map((order) => (
            <div key={order.id} className="bg-white border text-primary border-gray-100 shadow-md rounded-xl p-6 flex flex-col md:flex-row gap-6 hover:shadow-lg transition">
              <div className="flex-1 space-y-4">
                <div className="flex justify-between items-center border-b border-gray-100 pb-4">
                  <div>
                    <p className="text-sm text-gray-500">Order ID</p>
                    <p className="font-bold">{order.id}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-gray-500">Order Date</p>
                    <p className="font-bold">{new Date(order.date).toLocaleDateString()}</p>
                  </div>
                </div>
                
                <div className="flex gap-4 items-center">
                  <img src={getImageUrl(order.product.images)} alt={order.product.name} className="w-20 h-20 object-cover rounded-md bg-accent" />
                  <div>
                    <h3 className="font-bold line-clamp-1">{order.product.name}</h3>
                    <p className="text-sm text-gray-500">Payment: {order.paymentMethod}</p>
                    <p className="font-bold text-secondary">₹{order.totalAmount}</p>
                  </div>
                </div>
              </div>
              
              <div className="md:w-64 bg-accent p-4 rounded-lg flex flex-col justify-center space-y-4 border border-gray-100">
                <div className="flex items-center gap-3">
                  {order.status === 'Delivered' ? (
                    <CheckCircle className="text-green-500" size={24} />
                  ) : order.status === 'Processing' ? (
                    <Truck className="text-blue-500" size={24} />
                  ) : (
                    <Package className="text-orange-500" size={24} />
                  )}
                  <div>
                    <p className="text-sm text-gray-500">Status</p>
                    <p className={`font-bold ${order.status === 'Delivered' ? 'text-green-600' : 'text-blue-600'}`}>
                      {order.status}
                    </p>
                  </div>
                </div>
                
                <button className="w-full py-2 flex items-center justify-center gap-2 border-2 border-primary text-primary rounded-md font-bold hover:bg-primary hover:text-white transition">
                  <Navigation size={18} /> Track Order
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default MyOrders;
