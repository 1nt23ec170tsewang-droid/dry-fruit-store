import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { createOrder } from '../services/orderService';
import UPIQRCode from '../components/UPIQRCode';

const deliveryAreas = [
  'Leh',
  'Kargil',
  'Nubra',
  'Zanskar',
  'Nyoma',
  'Changthang',
  'Other',
];

const Checkout = () => {
  const { cartItems, getTotalPrice, clearCart } = useCart();
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/auth');
    }
    if (cartItems.length === 0 && isAuthenticated) {
      navigate('/cart');
    }
  }, [isAuthenticated, cartItems.length, navigate]);
  const [loading, setLoading] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState('cod'); // 'cod' or 'upi'
  const [upiTransactionId, setUpiTransactionId] = useState('');
  const [showUPIQR, setShowUPIQR] = useState(false);
  const savedUser = JSON.parse(localStorage.getItem('ladakhUser')) || {};
  const [formData, setFormData] = useState({
    name: savedUser.name || '',
    phone: savedUser.phone || '',
    email: savedUser.email || '',
    address: savedUser.address || '',
    pincode: savedUser.pincode || '',
    deliveryArea: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const validateForm = () => {
    if (!formData.name || !formData.phone || !formData.address || !formData.pincode || !formData.deliveryArea) {
      alert('Please fill in all required fields');
      return false;
    }
    if (formData.phone.length < 10) {
      alert('Please enter a valid phone number');
      return false;
    }
    return true;
  };

  const handlePayment = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    if (cartItems.length === 0) {
      alert('Your cart is empty');
      return;
    }

    // For UPI, show QR code first
    if (paymentMethod === 'upi' && !showUPIQR) {
      setShowUPIQR(true);
      return;
    }

    // For UPI, validate transaction ID
    if (paymentMethod === 'upi' && !upiTransactionId.trim()) {
      alert('Please enter your UPI transaction ID after completing the payment');
      return;
    }

    // For UPI, confirm payment was completed
    if (paymentMethod === 'upi') {
      const confirmed = window.confirm(
        '⚠️ IMPORTANT: Have you completed the UPI payment?\n\n' +
        'Please confirm:\n' +
        '1. You scanned the QR code\n' +
        '2. Payment was successful in your UPI app\n' +
        '3. You received a payment confirmation\n\n' +
        'Click OK only if payment is successful. Otherwise, click Cancel.'
      );

      if (!confirmed) {
        alert('Please complete the UPI payment first, then enter the transaction ID and try again.');
        return;
      }
    }

    setLoading(true);

    try {
      const totalAmount = getTotalPrice();

      // Create order on backend
      const orderData = {
        cartItems,
        total: totalAmount,
        customer: formData,
        userEmail: savedUser.email, // Bound directly to logged-in user profile
        paymentMethod,
        upiTransactionId: paymentMethod === 'upi' ? upiTransactionId : null,
      };

      const result = await createOrder(orderData);

      if (result.success) {
        // Notify customer for UPI that verification is pending
        if (paymentMethod === 'upi') {
          alert(
            'Payment submitted!\n\nWe will verify your UPI transaction ID and confirm your order shortly.'
          );
        }

        // Clear cart and navigate to success page
        clearCart();
        navigate('/order-success', {
          state: {
            orderId: result.orderId,
            orderData: {
              ...orderData,
              paymentMethod,
            },
          },
        });
      }
    } catch (error) {
      console.error('Order error:', error);

      let errorMessage = error.message || 'Order failed. Please try again.';

      if (error.message.includes('Cannot connect to server') ||
        error.message.includes('Network Error')) {
        errorMessage = 'Backend server is not running. Please start the server:\n\n1. Open terminal\n2. cd server\n3. npm run dev\n\nThen try again.';
      }

      alert(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-heading font-bold mb-8 text-gray-800">Checkout</h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Checkout Form */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-heading font-bold mb-6 text-gray-800">Delivery Details</h2>
          <form onSubmit={handlePayment} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Full Name *
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-ladakh-orange focus:border-transparent"
                placeholder="Enter your full name"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Phone Number *
              </label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-ladakh-orange focus:border-transparent"
                placeholder="10-digit phone number"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email (Optional)
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-ladakh-orange focus:border-transparent"
                placeholder="your@email.com"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Delivery Address *
              </label>
              <textarea
                name="address"
                value={formData.address}
                onChange={handleChange}
                required
                rows="3"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-ladakh-orange focus:border-transparent"
                placeholder="Enter your complete address"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Pincode *
              </label>
              <input
                type="text"
                name="pincode"
                value={formData.pincode}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-ladakh-orange focus:border-transparent"
                placeholder="Enter pincode"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Delivery Area in Ladakh *
              </label>
              <select
                name="deliveryArea"
                value={formData.deliveryArea}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-ladakh-orange focus:border-transparent"
              >
                <option value="">Select delivery area</option>
                {deliveryAreas.map((area) => (
                  <option key={area} value={area}>
                    {area}
                  </option>
                ))}
              </select>
            </div>

            {/* Payment Method Selection */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Payment Method *
              </label>
              <div className="space-y-3">
                <label className="flex items-center p-4 border-2 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors">
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="cod"
                    checked={paymentMethod === 'cod'}
                    onChange={(e) => {
                      setPaymentMethod(e.target.value);
                      setShowUPIQR(false);
                      setUpiTransactionId('');
                    }}
                    className="mr-3 w-5 h-5 text-ladakh-orange focus:ring-ladakh-orange"
                  />
                  <div className="flex-1">
                    <div className="font-semibold text-gray-800">Cash on Delivery (COD)</div>
                    <div className="text-sm text-gray-600">Pay when you receive your order</div>
                  </div>
                </label>

                <label className="flex items-center p-4 border-2 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors">
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="upi"
                    checked={paymentMethod === 'upi'}
                    onChange={(e) => {
                      setPaymentMethod(e.target.value);
                      setShowUPIQR(false);
                      setUpiTransactionId('');
                    }}
                    className="mr-3 w-5 h-5 text-ladakh-orange focus:ring-ladakh-orange"
                  />
                  <div className="flex-1">
                    <div className="font-semibold text-gray-800">UPI Payment</div>
                    <div className="text-sm text-gray-600">Pay via UPI (QR Code or UPI ID)</div>
                  </div>
                </label>
              </div>
            </div>

            {/* UPI QR Code Section */}
            {paymentMethod === 'upi' && showUPIQR && (
              <div className="border-2 border-ladakh-orange rounded-lg p-6 bg-white">
                <h3 className="text-lg font-semibold mb-4 text-center text-gray-800">
                  Scan QR Code to Pay
                </h3>
                <UPIQRCode amount={getTotalPrice()} upiId="tsewang8@ptyes" />

                <div className="mt-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Enter UPI Transaction ID *
                  </label>
                  <input
                    type="text"
                    value={upiTransactionId}
                    onChange={(e) => setUpiTransactionId(e.target.value)}
                    placeholder="Enter transaction ID from your UPI app"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-ladakh-orange focus:border-transparent"
                    required
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    You'll find this in your UPI app after payment (e.g., UPI1234567890)
                  </p>
                </div>
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="btn-primary w-full text-lg py-3 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading
                ? 'Processing...'
                : paymentMethod === 'cod'
                  ? `Place Order (COD) - ₹${getTotalPrice()}`
                  : showUPIQR
                    ? 'Confirm Payment & Place Order'
                    : `Proceed to UPI Payment - ₹${getTotalPrice()}`
              }
            </button>
          </form>
        </div>

        {/* Order Summary */}
        <div className="bg-white rounded-lg shadow-md p-6 h-fit sticky top-24">
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
          <div className="border-t pt-4">
            <div className="flex justify-between text-lg font-bold">
              <span>Total</span>
              <span className="text-ladakh-orange">₹{getTotalPrice()}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;

