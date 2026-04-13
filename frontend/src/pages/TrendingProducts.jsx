import React, { useState, useEffect } from 'react';
import ProductCard from '../components/ProductCard';

const TrendingProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/products/trending');
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error('Failed to fetch trending products:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchProducts();
  }, []);

  if (loading) {
    return <div className="max-w-7xl mx-auto px-4 py-16 text-center font-bold text-xl text-primary">Loading Trending Products...</div>;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-8 py-8">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-2xl font-bold text-primary">Trending Now</h2>
        <span className="bg-secondary text-white px-3 py-1 rounded-full text-xs font-bold animate-pulse">HOT</span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
        {products.map(product => (
          <ProductCard key={product._id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default TrendingProducts;
