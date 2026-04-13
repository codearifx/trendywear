import React, { useEffect, useState } from 'react';
import ProductCard from '../components/ProductCard';
import { Package } from 'lucide-react';

const ProductsPage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/products');
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error('Failed to fetch products:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  if (loading) {
    return <div className="max-w-7xl mx-auto px-4 py-16 text-center font-bold text-xl text-primary animate-pulse">Loading Products...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-extrabold text-primary flex items-center gap-3">
              <Package className="text-secondary" size={32} />
              Our Featured Models
            </h1>
            <p className="text-gray-500 mt-2 font-semibold">Category: visit shop</p>
          </div>
          
          <div className="bg-white px-4 py-2 rounded-full shadow-sm border border-gray-100 font-semibold text-primary inline-flex items-center">
            Total Products Available: <span className="ml-2 text-secondary text-lg">{products.length}</span>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 xl:gap-8">
          {products.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>

      </div>
    </div>
  );
};

export default ProductsPage;
