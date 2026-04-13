import React, { useState, useEffect } from 'react';
import ProductCard from '../components/ProductCard';

const OFFERS = [
  {
    id: 1,
    title: '3 Shirts for ₹1000',
    subtitle: 'Limited Time Offer',
    code: 'SHIRT10',
    color: 'bg-secondary',
  },
  {
    id: 2,
    title: '2 Jeans for ₹1000',
    subtitle: 'Trendy Bottoms Collection',
    code: 'JEANS20',
    color: 'bg-primary',
  },
  {
    id: 3,
    title: 'Buy 1 Get 1 Free',
    subtitle: 'On Select Accessories',
    code: 'BOGOFree',
    color: 'bg-gray-800',
  }
];

const Offers = () => {
  const [offerProducts, setOfferProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOffers = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/products/offers');
        const data = await response.json();
        // ProductCard expects discount to be handled, or uses finalPrice
        setOfferProducts(data);
      } catch (error) {
        console.error('Failed to fetch offer products:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchOffers();
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-8 py-8">
      {/* Visual Banners */}
      <h2 className="text-2xl font-bold mb-8 text-primary">Exclusive Offers</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
        {OFFERS.map(offer => (
          <div 
            key={offer.id} 
            className={`${offer.color} rounded-xl p-8 text-white relative overflow-hidden shadow-lg hover:-translate-y-1 hover:shadow-2xl transition-all duration-300 cursor-pointer`}
          >
            <div className="relative z-10">
              <h3 className="text-2xl font-extrabold mb-2">{offer.title}</h3>
              <p className="opacity-90 mb-6">{offer.subtitle}</p>
              <div className="inline-block bg-white/20 backdrop-blur-md px-4 py-2 rounded font-mono text-sm border border-white/20">
                Code: <strong className="ml-2 font-bold">{offer.code}</strong>
              </div>
            </div>
            {/* Decorative Element */}
            <div className="absolute -right-12 -bottom-12 w-40 h-40 bg-white/10 rounded-full z-0"></div>
          </div>
        ))}
      </div>

      {/* Offer Products DB Grid */}
      <h2 className="text-2xl font-bold mb-8 text-primary">Products on Sale</h2>
      {loading ? (
        <div className="flex justify-center items-center py-16">
           <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
        </div>
      ) : offerProducts.length === 0 ? (
        <div className="text-center text-gray-500 py-16">No products currently on sale.</div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-8">
          {offerProducts.map(product => (
             <ProductCard key={product._id || product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Offers;
