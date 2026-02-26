import { useLocation, Link } from 'react-router-dom';

const OrderSuccess = () => {
  const location = useLocation();
  const orderData = location.state?.orderData;
  const orderId = location.state?.orderId;

  if (!orderData) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h2 className="text-3xl font-heading font-bold mb-4 text-gray-800">
          Order not found
        </h2>
        <Link to="/" className="btn-primary">
          Go to Home
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-16">
      <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-lg p-8 text-center">
        <div className="text-6xl mb-4">✅</div>
        <h1 className="text-4xl font-heading font-bold mb-4 text-gray-800">
          {orderData.paymentMethod === 'upi' ? 'Order Received!' : 'Order Placed Successfully!'}
        </h1>
        <p className="text-xl text-gray-600 mb-8">
          {orderData.paymentMethod === 'upi' 
            ? 'Your order is being processed. Payment verification in progress. 🏔️'
            : 'Your order from Ladakh is on the way! 🏔️'}
        </p>
        
        {orderData.paymentMethod === 'upi' && (
          <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-6 rounded">
            <div className="flex">
              <div className="flex-shrink-0">
                <span className="text-2xl">⚠️</span>
              </div>
              <div className="ml-3">
                <p className="text-sm text-yellow-700">
                  <strong>Payment Verification Pending:</strong> Your order will be confirmed after we verify your UPI payment. 
                  Please keep your transaction ID ready for reference.
                </p>
              </div>
            </div>
          </div>
        )}

        {orderId && (
          <div className="bg-ladakh-cream rounded-lg p-4 mb-6">
            <p className="text-sm text-gray-600">Order ID</p>
            <p className="font-mono font-semibold text-ladakh-orange">{orderId}</p>
          </div>
        )}

        {/* Order Summary */}
        <div className="text-left bg-gray-50 rounded-lg p-6 mb-6">
          <h2 className="text-xl font-heading font-bold mb-4 text-gray-800">Order Summary</h2>
          
          <div className="space-y-2 mb-4">
            {orderData.cartItems.map((item) => (
              <div key={item.id} className="flex justify-between">
                <span className="text-gray-700">
                  {item.name} × {item.quantity}
                </span>
                <span className="font-semibold">₹{item.price * item.quantity}</span>
              </div>
            ))}
          </div>

          <div className="border-t pt-4 mb-4">
            <div className="flex justify-between text-lg font-bold">
              <span>Total</span>
              <span className="text-ladakh-orange">₹{orderData.total}</span>
            </div>
          </div>

          <div className="border-t pt-4 mt-4">
            <h3 className="font-semibold mb-2 text-gray-800">Delivery Details</h3>
            <p className="text-sm text-gray-600">
              <strong>Name:</strong> {orderData.customer.name}<br />
              <strong>Phone:</strong> {orderData.customer.phone}<br />
              <strong>Address:</strong> {orderData.customer.address}<br />
              <strong>Pincode:</strong> {orderData.customer.pincode}<br />
              <strong>Delivery Area:</strong> {orderData.customer.deliveryArea}
            </p>
          </div>

          <div className="border-t pt-4 mt-4">
            <h3 className="font-semibold mb-2 text-gray-800">Payment Information</h3>
            <div className="text-sm text-gray-600 space-y-1">
              <p>
                <strong>Payment Method:</strong>{' '}
                <span className="font-semibold text-ladakh-orange">
                  {orderData.paymentMethod === 'cod' ? 'Cash on Delivery' : 'UPI Payment'}
                </span>
              </p>
              {orderData.paymentMethod === 'upi' && orderData.upiTransactionId && (
                <p><strong>Transaction ID:</strong> {orderData.upiTransactionId}</p>
              )}
              {orderData.paymentMethod === 'cod' && (
                <p className="text-ladakh-orange font-medium mt-2">
                  💰 Please keep exact change ready for delivery
                </p>
              )}
              {orderData.paymentMethod === 'upi' && (
                <div className="mt-2 p-3 bg-blue-50 rounded">
                  <p className="text-sm text-gray-700">
                    <strong>Note:</strong> Your order status is "Pending Verification". 
                    We will verify your UPI payment and confirm your order shortly. 
                    You will receive a confirmation once payment is verified.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      

        <div className="space-y-4">
          <Link to="/products" className="btn-primary inline-block">
            Continue Shopping
          </Link>
          <br />
          <Link to={`/order/${orderId}`} className="bg-orange-600 text-white px-6 py-2 rounded-lg">
  View Order Details
</Link>
          <Link to="/" className="text-ladakh-orange hover:underline">
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default OrderSuccess;

