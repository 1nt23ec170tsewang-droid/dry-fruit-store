import { useState, useEffect } from 'react';

const UPIQRCode = ({ amount, upiId = 'tsewang8@ptyes' }) => {
  const [qrCodeUrl, setQrCodeUrl] = useState('');

  useEffect(() => {
    // Generate UPI QR code using a QR code API
    // Format: upi://pay?pa=UPI_ID&pn=MerchantName&am=AMOUNT&cu=INR&tn=TransactionNote
    const upiString = `upi://pay?pa=${upiId}&pn=Ladakh%20Dry%20Fruits&am=${amount}&cu=INR&tn=Order%20Payment`;
    
    // Using QR Server API to generate QR code
    const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=${encodeURIComponent(upiString)}`;
    setQrCodeUrl(qrUrl);
  }, [amount, upiId]);

  return (
    <div className="text-center">
      {/* Profile Section */}
      <div className="mb-4">
        <div className="w-20 h-20 mx-auto mb-2 rounded-full overflow-hidden bg-gray-200 flex items-center justify-center">
          <svg className="w-16 h-16 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
          </svg>
        </div>
        <div className="flex items-center justify-center gap-2">
          <h3 className="text-lg font-semibold text-gray-800">Tsewang Norboo</h3>
          <div className="w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center">
            <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
          </div>
        </div>
      </div>

      {/* QR Code Box */}
      <div className="bg-white border-2 border-blue-300 rounded-2xl p-6 mb-4 shadow-lg">
        {/* Paytm UPI Logo */}
        <div className="flex items-center justify-center gap-2 mb-4">
          <span className="text-2xl font-bold">
            <span className="text-blue-600">Pay</span>
            <span className="text-red-500">tm</span>
          </span>
          <span className="text-gray-800 font-semibold">UPI</span>
          <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
          </svg>
        </div>

        {/* QR Code */}
        <div className="bg-white p-4 rounded-lg mb-4">
          <img 
            src={qrCodeUrl} 
            alt="UPI QR Code" 
            className="w-64 h-64 mx-auto"
            onError={(e) => {
              e.target.src = `https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=${encodeURIComponent(`upi://pay?pa=${upiId}&am=${amount}`)}`;
            }}
          />
        </div>

        {/* UPI ID */}
        <div className="flex items-center justify-center gap-2 text-green-600">
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
          </svg>
          <p className="font-mono font-semibold text-lg">{upiId}</p>
        </div>
      </div>

      {/* UPI Apps */}
      <div className="flex items-center justify-center gap-4 mb-4">
        <p className="text-sm text-gray-700 mr-2">Scan with any UPI app:</p>
        <div className="flex items-center gap-3">
          <span className="text-xs font-semibold text-blue-600">Paytm</span>
          <div className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center">
            <span className="text-white text-xs font-bold">पे</span>
          </div>
          <div className="w-8 h-8 bg-gradient-to-br from-red-400 via-yellow-400 to-green-500 rounded-full flex items-center justify-center">
            <span className="text-white text-xs font-bold">G</span>
          </div>
          <span className="text-xs font-semibold text-gray-800">BHIM</span>
        </div>
      </div>

      {/* Amount Display */}
      <div className="bg-ladakh-cream p-3 rounded-lg mb-4">
        <p className="text-sm text-gray-600">Amount to Pay</p>
        <p className="text-2xl font-bold text-ladakh-orange">₹{amount}</p>
      </div>

      {/* Instructions */}
      <div className="mt-4 p-4 bg-blue-50 rounded-lg text-left">
        <p className="text-sm font-semibold text-gray-800 mb-2">Instructions:</p>
        <ol className="text-sm text-gray-600 space-y-1 list-decimal list-inside">
          <li>Open any UPI app (PhonePe, Google Pay, Paytm, BHIM, etc.)</li>
          <li>Scan the QR code above</li>
          <li>Verify the amount: ₹{amount}</li>
          <li>Complete the payment</li>
          <li>Enter the transaction ID below and confirm</li>
        </ol>
      </div>
    </div>
  );
};

export default UPIQRCode;

