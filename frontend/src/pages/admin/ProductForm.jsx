import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const ProductForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditMode = Boolean(id);

  const [name, setName] = useState('');
  const [price, setPrice] = useState(0);
  const [discount, setDiscount] = useState(0);
  const [image, setImage] = useState('');
  const [category, setCategory] = useState('');
  const [stock, setStock] = useState(0);
  const [isTrending, setIsTrending] = useState(false);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    if (isEditMode) {
      const fetchProduct = async () => {
        try {
          const response = await fetch(`http://localhost:5000/api/products`);
          const data = await response.json();
          const product = data.find(p => p._id === id);
          if (product) {
            setName(product.name);
            setPrice(product.price);
            setDiscount(product.discount);
            setImage(product.images[0] || '');
            setCategory(product.category);
            setStock(product.stock);
            setIsTrending(product.isTrending);
          }
        } catch (error) {
          console.error(error);
        }
      };
      fetchProduct();
    }
  }, [id, isEditMode]);

  const uploadFileHandler = async (e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append('image', file);
    setUploading(true);

    try {
      const response = await fetch('http://localhost:5000/api/upload', {
        method: 'POST',
        body: formData,
      });
      const data = await response.json();
      setImage(data.image);
    } catch (error) {
      console.error(error);
    } finally {
      setUploading(false);
    }
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    const userInfo = JSON.parse(localStorage.getItem('userInfo'));
    
    const productData = { 
      name, price, discount, images: [image], category, stock, isTrending 
    };

    try {
      const method = isEditMode ? 'PUT' : 'POST';
      const url = isEditMode 
        ? `http://localhost:5000/api/products/${id}` 
        : 'http://localhost:5000/api/products';

      await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${userInfo.token}`,
        },
        body: JSON.stringify(productData),
      });

      navigate('/admin/products');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow p-8 max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">{isEditMode ? 'Edit Product' : 'Create Product'}</h2>
      
      <form onSubmit={submitHandler} className="flex flex-col gap-5">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} required className="w-full border border-gray-300 rounded-md px-3 py-2" />
        </div>
        
        <div className="flex gap-4">
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700 mb-1">Price (₹)</label>
            <input type="number" value={price} onChange={(e) => setPrice(Number(e.target.value))} required className="w-full border border-gray-300 rounded-md px-3 py-2" />
          </div>
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700 mb-1">Discount (%)</label>
            <input type="number" value={discount} onChange={(e) => setDiscount(Number(e.target.value))} className="w-full border border-gray-300 rounded-md px-3 py-2" />
          </div>
        </div>

        <div className="flex gap-4">
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
            <input type="text" value={category} onChange={(e) => setCategory(e.target.value)} required className="w-full border border-gray-300 rounded-md px-3 py-2" />
          </div>
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700 mb-1">Stock</label>
            <input type="number" value={stock} onChange={(e) => setStock(Number(e.target.value))} required className="w-full border border-gray-300 rounded-md px-3 py-2" />
          </div>
        </div>

        <div>
           <label className="block text-sm font-medium text-gray-700 mb-1">Image URL or Upload</label>
           <input type="text" value={image} onChange={(e) => setImage(e.target.value)} className="w-full border border-gray-300 rounded-md px-3 py-2 mb-2" placeholder="/uploads/image.jpg or http://..." />
           <input type="file" onChange={uploadFileHandler} className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-gray-50 file:text-gray-700 hover:file:bg-gray-100" />
           {uploading && <span className="text-sm text-blue-500 mt-1 inline-block">Uploading...</span>}
        </div>

        <div className="flex items-center gap-2 mt-2">
          <input type="checkbox" id="trending" checked={isTrending} onChange={(e) => setIsTrending(e.target.checked)} className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded" />
          <label htmlFor="trending" className="text-sm font-medium text-gray-700">Set as Trending (Shows on HOT page)</label>
        </div>

        <button type="submit" className="mt-4 bg-primary text-white font-bold py-3 rounded-md hover:bg-secondary transition-colors">
          {isEditMode ? 'Update Product' : 'Save Product'}
        </button>
      </form>
    </div>
  );
};

export default ProductForm;
