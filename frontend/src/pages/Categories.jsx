import React from 'react';
import { Link } from 'react-router-dom';

const CATEGORIES = [
  { name: 'Top Wear', slug: 'top-wear', image: 'https://images.asos-media.com/products/native-youth-boxy-linen-shirt-with-cornelli-embroidery-in-cream-part-of-a-set/207780744-2/?$n_480w$&wid=476&fit=constrain', color: 'from-[#00f2fe] to-[#4facfe]' },
  { name: 'Bottom Wear', slug: 'bottom-wear', image: 'https://veirdo.in/cdn/shop/articles/01_0002_10_1.jpg?v=1751006241', color: 'from-[#0fff50] to-[#00f2fe]' },
  { name: 'Inner Wear', slug: 'inner-wear', image: 'https://m.media-amazon.com/images/I/61wvgxIREzL._AC_UY1100_.jpg', color: 'from-[#ff00a0] to-[#ff5a00]' },
  { name: 'Ethnic Wear', slug: 'ethnic-wear', image: 'https://www.fabfunda.com/product-img/black-stylish-embroidery-work--1725023746.jpeg', color: 'from-[#f12711] to-[#f5af19]' },
  { name: 'Sports Wear', slug: 'sports-wear', image: 'https://www.rockit.co.in/cdn/shop/collections/Men_Tracksuits_400x.jpg?v=1705560037', color: 'from-[#11998e] to-[#38ef7d]' },
  { name: 'Night Wear', slug: 'night-wear', image: 'https://www.bushirt.in/cdn/shop/products/7_935eb3d0-0799-43d5-9be2-62c6ba1b3dc3.jpg?v=1654086220&width=1080', color: 'from-[#8E2DE2] to-[#4A00E0]' },
  { name: 'Winter Wear', slug: 'winter-wear', image: 'https://westwoodhart.com/cdn/shop/articles/winter-fashion-layering-mens-style.png?v=1733785044&width=1200', color: 'from-[#00c6ff] to-[#0072ff]' },
  { name: 'Accessories', slug: 'accessories', image: 'https://luxurywatchprotection.com.au/wp-content/uploads/2023/06/luxury-watch-protection-Must-have-protective-accessories-for-your-luxury-watch-banner-1080x675.webp ', color: 'from-[#FF416C] to-[#FF4B2B]' }
];

const Categories = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 md:px-8 py-16 bg-dark">
      <div className="text-center mb-16">
        <h2 className="text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent mb-4 uppercase tracking-wider relative inline-block">
          Explore Categories
          <div className="absolute -bottom-2 w-full h-1 bg-primary blur-sm rounded-full"></div>
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {CATEGORIES.map((cat, index) => (
          <Link 
            to={`/category/${cat.slug}`}
            key={index} 
            className="group block relative rounded-[2rem] overflow-hidden glass-panel border border-primary/20 hover:border-primary transition-all duration-500 hover:-translate-y-3 cursor-pointer shadow-lg hover:shadow-[0_10px_30px_rgba(0,242,254,0.3)]"
          >
            <div className={`h-64 relative bg-gradient-to-br ${cat.color} opacity-80 mix-blend-overlay group-hover:opacity-100 transition-opacity duration-500`}></div>
            
            <img src={cat.image} alt={cat.name} className="absolute inset-0 w-full h-full object-cover mix-blend-multiply opacity-60 group-hover:scale-110 transition-transform duration-700" />
            
            <div className="absolute inset-0 flex items-center justify-center bg-black/40 group-hover:bg-black/20 transition-all duration-500">
               <h3 className="text-white text-3xl font-black tracking-widest uppercase drop-shadow-[0_0_10px_rgba(0,242,254,0.8)] px-4 text-center">
                 {cat.name}
               </h3>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Categories;
