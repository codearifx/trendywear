import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import TrendingProducts from './pages/TrendingProducts';
import ReelsSection from './pages/ReelsSection';
import Categories from './pages/Categories';
import CategoryPage from './pages/CategoryPage';
import Offers from './pages/Offers';
import ContactUs from './pages/ContactUs';
import LikedProducts from './pages/LikedProducts';
import MyOrders from './pages/MyOrders';
import Checkout from './pages/Checkout';

// New Customer Pages
import ProductsPage from './pages/ProductsPage';
import Login from './pages/Login';
import Register from './pages/Register';
import Cart from './pages/Cart';
import ProductDetailsPage from './pages/ProductDetailsPage';
import AddressPage from './pages/AddressPage';
import PaymentPage from './pages/PaymentPage';

// Context Providers
import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';
import { WishlistProvider } from './context/WishlistContext';

// Admin Imports
import AdminLogin from './pages/admin/AdminLogin';
import AdminLayout from './components/admin/AdminLayout';
import ProtectedRoute from './components/admin/ProtectedRoute';
import AdminProducts from './pages/admin/AdminProducts';
import ProductForm from './pages/admin/ProductForm';

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <WishlistProvider>
          <div className="min-h-screen flex flex-col bg-dark text-gray-200">
            <Routes>
              {/* Admin Login Route without Navbar */}
              <Route path="/admin/login" element={<AdminLogin />} />

              {/* Protected Admin Routes */}
              <Route path="/admin" element={<ProtectedRoute />}>
                <Route element={<AdminLayout />}>
                  <Route path="dashboard" element={<div className="text-2xl font-bold">Welcome to Admin Dashboard</div>} />
                  <Route path="products" element={<AdminProducts />} />
                  <Route path="product/new" element={<ProductForm />} />
                  <Route path="product/:id/edit" element={<ProductForm />} />
                </Route>
              </Route>

              {/* Consumer Routes */}
              <Route path="/*" element={
                <>
                  <Navbar />
                  <main className="flex-1 bg-dark">
                    <Routes>
                      <Route path="/" element={<Home />} />
                      <Route path="/products" element={<ProductsPage />} />
                      <Route path="/product/:id" element={<ProductDetailsPage />} />
                      <Route path="/login" element={<Login />} />
                      <Route path="/register" element={<Register />} />
                      <Route path="/cart" element={<Cart />} />
                      <Route path="/trending" element={<TrendingProducts />} />
                      <Route path="/reels" element={<ReelsSection />} />
                      <Route path="/categories" element={<Categories />} />
                      <Route path="/category/:id" element={<CategoryPage />} />
                      <Route path="/offers" element={<Offers />} />
                      <Route path="/contact" element={<ContactUs />} />
                      <Route path="/liked-products" element={<LikedProducts />} />
                      <Route path="/orders" element={<MyOrders />} />
                      <Route path="/checkout" element={<Checkout />} />
                      <Route path="/checkout/address" element={<AddressPage />} />
                      <Route path="/checkout/payment" element={<PaymentPage />} />
                    </Routes>
                  </main>
                </>
              } />
            </Routes>
          </div>
        </WishlistProvider>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;
