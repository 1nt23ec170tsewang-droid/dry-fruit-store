import { createContext, useContext, useState, useEffect, useRef } from 'react';
import { useAuth } from './AuthContext';
import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'https://dry-fruit-store.onrender.com';

const CartContext = createContext();

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

export const CartProvider = ({ children }) => {
  const { user, isAuthenticated } = useAuth();
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const isSavingRef = useRef(false);

  // Load cart from backend when user logs in
  useEffect(() => {
    const loadUserCart = async () => {
      if (isAuthenticated && user?.id) {
        setLoading(true);
        try {
          const response = await axios.get(`${API_BASE_URL}/api/cart`, {
            params: { userId: user.id },
          });
          setCartItems(response.data.cart || []);
        } catch (error) {
          console.error('Error loading cart:', error);
          setCartItems([]);
        } finally {
          setLoading(false);
        }
      } else {
        // Clear cart when user logs out
        setCartItems([]);
      }
    };

    loadUserCart();
  }, [isAuthenticated, user?.id]);

  // Save cart to backend whenever it changes (debounced)
  useEffect(() => {
    if (!isAuthenticated || !user?.id || isSavingRef.current) {
      return;
    }

    const saveCartToBackend = async () => {
      isSavingRef.current = true;
      try {
        await axios.post(`${API_BASE_URL}/api/cart`, {
          userId: user.id,
          cartItems: cartItems,
        });
      } catch (error) {
        console.error('Error saving cart:', error);
      } finally {
        isSavingRef.current = false;
      }
    };

    // Debounce save to avoid too many API calls
    const timeoutId = setTimeout(saveCartToBackend, 500);
    return () => clearTimeout(timeoutId);
  }, [cartItems, isAuthenticated, user?.id]);

  const addToCart = (product) => {
    if (!isAuthenticated) {
      throw new Error('Please login to add items to cart');
    }

    setCartItems((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (productId) => {
    if (!isAuthenticated) {
      return;
    }
    setCartItems((prev) => prev.filter((item) => item.id !== productId));
  };

  const updateQuantity = (productId, quantity) => {
    if (!isAuthenticated) {
      return;
    }
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === productId ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = async () => {
    if (!isAuthenticated || !user?.id) {
      setCartItems([]);
      return;
    }

    try {
      await axios.delete(`${API_BASE_URL}/api/cart`, {
        params: { userId: user.id },
      });
      setCartItems([]);
    } catch (error) {
      console.error('Error clearing cart:', error);
      setCartItems([]);
    }
  };

  const getTotalPrice = () => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  const getTotalItems = () => {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        getTotalPrice,
        getTotalItems,
        loading,
        isAuthenticated,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};


