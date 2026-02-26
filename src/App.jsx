import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import { AuthProvider } from './context/AuthContext';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Products from './pages/Products';
import Cart from './pages/Cart';
import OrderDetails from './pages/OrderDetails';
import Checkout from './pages/Checkout';
import OrderSuccess from './pages/OrderSuccess';
import AdminOrders from './pages/AdminOrders';
import Profile from './pages/Profile';
import Auth from './pages/Auth';
import Footer from './components/Footer';
import Addresses from './pages/Addresses';
function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <Router>
          <div className="min-h-screen flex flex-col">
            <Navbar />
            <main className="flex-grow">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/products" element={<Products />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/order/:id" element={<OrderDetails />} />
                <Route path="/checkout" element={<Checkout />} />
                <Route path="/order-success" element={<OrderSuccess />} />
                <Route path="/auth" element={<Auth />} />
                <Route path="/admin" element={<AdminOrders />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/addresses" element={<Addresses />} />
              </Routes>
            </main>
            <Footer />
          </div>
        </Router>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;

