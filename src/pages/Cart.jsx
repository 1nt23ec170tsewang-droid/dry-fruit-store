import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { useEffect } from 'react';

const Cart = () => {
  const { cartItems, updateQuantity, removeFromCart, getTotalPrice, loading } = useCart();
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/auth');
    }
  }, [isAuthenticated, navigate]);

  if (!isAuthenticated || loading) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <div className="text-6xl mb-4">🛒</div>
        <h2 className="text-3xl font-heading font-bold mb-4 text-gray-800">
          {loading ? 'Loading your cart...' : 'Please login to view your cart'}
        </h2>
      </div>
    );
  }

  if (cartItems.length === 0) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <div className="text-6xl mb-4">🛒</div>
        <h2 className="text-3xl font-heading font-bold mb-4 text-gray-800">
          Your cart is empty
        </h2>
        <p className="text-gray-600 mb-8">Add some delicious Ladakh dry fruits to get started!</p>
        <Link to="/products" className="btn-primary">
          Browse Products
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-heading font-bold mb-8 text-gray-800">Shopping Cart</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Cart Items */}
        <div className="lg:col-span-2 space-y-4">
          {cartItems.map((item) => (
            <div key={item.id} className="bg-white rounded-lg shadow-md p-4 flex items-center gap-4">
              <img
                src={item.image}
                alt={item.name}
                className="w-20 h-20 object-cover rounded"
              />
              <div className="flex-grow">
                <h3 className="font-semibold text-gray-800">{item.name}</h3>
                <p className="text-sm text-gray-600">₹{item.price} each</p>
              </div>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => updateQuantity(item.id, item.quantity - 1)}
                  className="w-8 h-8 rounded-full bg-gray-200 hover:bg-gray-300 flex items-center justify-center"
                >
                  −
                </button>
                <span className="w-8 text-center font-semibold">{item.quantity}</span>
                <button
                  onClick={() => updateQuantity(item.id, item.quantity + 1)}
                  className="w-8 h-8 rounded-full bg-gray-200 hover:bg-gray-300 flex items-center justify-center"
                >
                  +
                </button>
              </div>
              <div className="text-right">
                <p className="font-bold text-ladakh-orange">₹{item.price * item.quantity}</p>
                <button
                  onClick={() => removeFromCart(item.id)}
                  className="text-red-500 text-sm hover:text-red-700 mt-1"
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Cart Summary */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow-md p-6 sticky top-24">
            <h2 className="text-xl font-heading font-bold mb-4 text-gray-800">Order Summary</h2>
            <div className="space-y-2 mb-4">
              {cartItems.map((item) => (
                <div key={item.id} className="flex justify-between text-sm">
                  <span className="text-gray-600">
                    {item.name} × {item.quantity}
                  </span>
                  <span className="text-gray-800">₹{item.price * item.quantity}</span>
                </div>
              ))}
            </div>
            <div className="border-t pt-4 mb-4">
              <div className="flex justify-between text-lg font-bold">
                <span>Total</span>
                <span className="text-ladakh-orange">₹{getTotalPrice()}</span>
              </div>
            </div>
            <Link
              to="/checkout"
              className="btn-primary w-full text-center block"
            >
              Proceed to Checkout
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;

