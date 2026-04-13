import React, { useState, useEffect, useContext } from 'react';
import ProductCard from '../components/ProductCard';
import { WishlistContext } from '../context/WishlistContext';

const LikedProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const { likedProducts } = useContext(WishlistContext);

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
    return <div className="max-w-7xl mx-auto px-4 py-16 text-center font-bold text-xl text-primary animate-pulse">Loading Liked Collection...</div>;
  }

  const likedProductsData = products.filter(p => likedProducts.includes(p._id));

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-8 py-12">
      <h1 className="text-3xl font-extrabold mb-8 text-primary border-b-4 border-secondary inline-block pb-1">Liked Products</h1>
      
      {likedProductsData.length === 0 ? (
        <div className="text-center py-16">
          <h2 className="text-xl text-gray-500">You haven't liked any products yet.</h2>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
          {likedProductsData.map(product => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
};

export default LikedProducts;
