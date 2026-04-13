import React, { createContext, useState, useEffect } from 'react';

export const WishlistContext = createContext();

export const WishlistProvider = ({ children }) => {
  const [likedProducts, setLikedProducts] = useState([]);

  useEffect(() => {
    const storedLikes = localStorage.getItem('likedProducts');
    if (storedLikes) {
      setLikedProducts(JSON.parse(storedLikes));
    }
  }, []);

  const toggleWishlist = (productId) => {
    setLikedProducts((prevLiked) => {
      let updatedLikes;
      
      if (prevLiked.includes(productId)) {
        updatedLikes = prevLiked.filter((id) => id !== productId);
      } else {
        updatedLikes = [...prevLiked, productId];
      }
      
      localStorage.setItem('likedProducts', JSON.stringify(updatedLikes));
      return updatedLikes;
    });
  };

  const isLiked = (productId) => {
    return likedProducts.includes(productId);
  };

  return (
    <WishlistContext.Provider value={{ likedProducts, toggleWishlist, isLiked }}>
      {children}
    </WishlistContext.Provider>
  );
};
