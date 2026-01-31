import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import ProductDetailsPage from './pages/ProductDetailsPage';
import CartPage from './pages/CartPage';
import ShippingPage from './pages/ShippingPage';
import PaymentPage from './pages/PaymentPage';
import PlaceOrderPage from './pages/PlaceOrderPage';
import OrderPage from './pages/OrderPage';
import AdminProductListPage from './pages/AdminProductListPage';
import AdminOrderListPage from './pages/AdminOrderListPage';
import ProductEditPage from './pages/ProductEditPage';
import Login from './pages/Login';
import Register from './pages/Register';
import ProfilePage from './pages/ProfilePage';
import WishlistPage from './pages/WishlistPage';
import AboutPage from './pages/AboutPage';
import { CartProvider } from './context/CartContext';
import { ToastProvider } from './context/ToastContext';
import Footer from './components/Footer';

function App() {
  return (
    <CartProvider>
      <ToastProvider>
        <Router>
          <div className="min-h-screen bg-gray-50 text-gray-900">
            <div className="bg-gray-900 text-white py-2 px-6 flex justify-center items-center overflow-hidden whitespace-nowrap">
              <div className="flex items-center space-x-12 animate-marquee">
                <span className="text-[10px] font-black uppercase tracking-[0.3em] flex items-center">
                  <span className="w-2 h-2 bg-red-500 rounded-full mr-2 animate-ping"></span>
                  Flash Sale: iPhone 15 Pro at ₹74,999 - Limited Stock
                </span>
                <span className="text-[10px] font-black uppercase tracking-[0.3em] opacity-50">|</span>
                <span className="text-[10px] font-black uppercase tracking-[0.3em]">
                  Free Shipping on all orders above ₹5000
                </span>
                <span className="text-[10px] font-black uppercase tracking-[0.3em] opacity-50">|</span>
                <span className="text-[10px] font-black uppercase tracking-[0.3em]">
                  Sign up and get ₹500 discount on your first order
                </span>
              </div>
            </div>
            <Navbar />
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/profile" element={<ProfilePage />} />
              <Route path="/wishlist" element={<WishlistPage />} />
              <Route path="/product/:id" element={<ProductDetailsPage />} />
              <Route path="/cart" element={<CartPage />} />
              <Route path="/shipping" element={<ShippingPage />} />
              <Route path="/payment" element={<PaymentPage />} />
              <Route path="/placeorder" element={<PlaceOrderPage />} />
              <Route path="/order/:id" element={<OrderPage />} />
              <Route path="/admin/productlist" element={<AdminProductListPage />} />
              <Route path="/admin/orderlist" element={<AdminOrderListPage />} />
              <Route path="/admin/product/:id/edit" element={<ProductEditPage />} />
            </Routes>
            <Footer />
          </div>
        </Router>
      </ToastProvider>
    </CartProvider>
  );
}

export default App;
