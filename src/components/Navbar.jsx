import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const { getTotalItems } = useCart();
  const { user, logout, isAuthenticated } = useAuth();

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-2">
            <span className="text-2xl font-heading font-bold text-ladakh-orange">
              🏔️ Ladakh Dry Fruits
            </span>
          </Link>
          
          <div className="flex items-center space-x-6">
            <Link
              to="/"
              className="text-gray-700 hover:text-ladakh-orange transition-colors"
            >
              Home
            </Link>
            <Link
              to="/products"
              className="text-gray-700 hover:text-ladakh-orange transition-colors"
            >
              Products
            </Link>
            {isAuthenticated && (
              <Link
                to="/cart"
                className="relative text-gray-700 hover:text-ladakh-orange transition-colors"
              >
                Cart
                {getTotalItems() > 0 && (
                  <span className="absolute -top-2 -right-2 bg-ladakh-orange text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {getTotalItems()}
                  </span>
                )}
              </Link>
            )}
            
            {/* Login/Register or User Info - Top Right */}
            {isAuthenticated ? (
              <div className="flex items-center space-x-4">
              <Link to="/profile" className="text-gray-700 hover:text-ladakh-orange transition-colors text-sm font-medium">
            Hi, {user.name}
            </Link>
                <button
                  onClick={logout}
                  className="text-gray-700 hover:text-ladakh-orange transition-colors text-sm"
                >
                  Logout
                </button>
              </div>
            ) : (
              <Link
                to="/auth"
                className="text-gray-700 hover:text-ladakh-orange transition-colors text-sm font-medium"
              >
                Login / Register
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
