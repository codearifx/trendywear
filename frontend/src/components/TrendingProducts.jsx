import React, { useState } from 'react';
import { Heart, ShoppingBag } from 'lucide-react';
import './TrendingProducts.css';

const PRODUCTS = [
  {
    id: 1,
    name: 'Classic White Shirt',
    price: 999,
    discount: 20,
    image: 'https://cottonfolk.in/cdn/shop/files/44.jpg?v=1732362150&width=2048',
    isWishlisted: false,
  },
  {
    id: 2,
    name: 'Slim Fit Dark Jeans',
    price: 1499,
    discount: 15,
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTcZJr2bGCFmSMm01K7TznAkchVvC376U8WZQ&s',
    isWishlisted: true,
  },
  {
    id: 3,
    name: 'Casual Grey T-Shirt',
    price: 499,
    discount: 10,
    image: 'https://img.tatacliq.com/images/i25//437Wx649H/MP000000027123199_437Wx649H_202506271733281.jpeg',
    isWishlisted: false,
  },
  {
    id: 4,
    name: 'Formal Navy Blazer',
    price: 3499,
    discount: 30,
    image: 'https://imagescdn.louisphilippe.com/img/app/product/3/39830662-16554407.jpg?auto=format&w=390',
    isWishlisted: false,
  }
];

const TrendingProducts = () => {
  const [products, setProducts] = useState(PRODUCTS);

  const toggleWishlist = (id) => {
    setProducts(products.map(p => 
      p.id === id ? { ...p, isWishlisted: !p.isWishlisted } : p
    ));
  };

  return (
    <section className="trending-products-section container">
      <h2 className="section-title">Trending Products</h2>
      <div className="products-grid">
        {products.map(product => {
          const discountedPrice = Math.floor(product.price - (product.price * product.discount / 100));
          return (
            <div key={product.id} className="product-card">
              <div className="product-image-container">
                <img src={product.image} alt={product.name} className="product-image" />
                <button 
                  className={`wishlist-btn ${product.isWishlisted ? 'active' : ''}`}
                  onClick={() => toggleWishlist(product.id)}
                >
                  <Heart fill={product.isWishlisted ? '#ff3f6c' : 'none'} color={product.isWishlisted ? '#ff3f6c' : '#333'} size={20} />
                </button>
                {product.discount > 0 && (
                  <span className="discount-badge">-{product.discount}%</span>
                )}
              </div>
              <div className="product-details">
                <h3 className="product-name">{product.name}</h3>
                <div className="product-pricing">
                  <span className="current-price">₹{discountedPrice}</span>
                  <span className="original-price">₹{product.price}</span>
                </div>
                <button className="add-to-cart-btn">
                  <ShoppingBag size={18} /> Add to Cart
                </button>
              </div>
            </div>
          )
        })}
      </div>
    </section>
  );
};

export default TrendingProducts;
