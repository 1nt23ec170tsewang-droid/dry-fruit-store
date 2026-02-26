import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';

const ProductCard = ({ product }) => {
  const { addToCart } = useCart();
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const handleAddToCart = () => {
    if (!isAuthenticated) {
      alert('Please login to add items to your cart');
      navigate('/auth');
      return;
    }

    try {
      addToCart(product);
    } catch (error) {
      alert(error.message || 'Failed to add item to cart');
    }
  };

  return (
    <div className="card">
      <div className="relative h-48 overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover"
        />
      </div>
      <div className="p-4">
        <h3 className="text-lg font-heading font-semibold text-gray-800 mb-2">
          {product.name}
        </h3>
        <p className="text-sm text-gray-600 mb-4 line-clamp-2">
          {product.description}
        </p>
        <div className="flex items-center justify-between">
          <span className="text-xl font-bold text-ladakh-orange">
            ₹{product.price}
          </span>
          <button
            onClick={handleAddToCart}
            className="btn-primary text-sm py-1.5 px-4"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;

