import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import { MOCK_PRODUCTS } from '../data/products';

const CategoryPage = () => {
  const { id } = useParams();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Format category ID to Title Case
  const categoryName = id ? id.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ') : 'Category';

  useEffect(() => {
    // Simulate loading for smooth animation
    setLoading(true);
    setTimeout(() => {
      // Filter mock products by category slug
      const filtered = MOCK_PRODUCTS.filter(p => p.category === id);
      setProducts(filtered);
      setLoading(false);
    }, 500);
  }, [id]);

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-8 py-12 bg-dark min-h-screen">
      <div className="mb-12 text-center">
        <h1 className="text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent inline-block relative tracking-wider uppercase drop-shadow-[0_0_15px_rgba(0,242,254,0.4)]">
          {categoryName} Collection
          <div className="absolute -bottom-3 w-1/2 left-1/4 h-1 bg-primary blur-sm rounded-full"></div>
        </h1>
        <p className="text-gray-400 mt-6 text-lg">Explore the best {categoryName.toLowerCase()} crafted for perfect futuristic style and comfort.</p>
      </div>

      {loading ? (
        <div className="flex justify-center items-center py-20">
          <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
        </div>
      ) : products.length === 0 ? (
        <div className="text-center text-gray-500 py-16">
           <p className="text-2xl font-bold bg-card border border-gray-800 rounded-xl p-8 inline-block shadow-inner text-gray-400">No products found in this category.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-8">
          {products.map(product => (
            <ProductCard key={product.id || product._id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
};

export default CategoryPage;
