import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Package, Eye, EyeOff, MapPin, Lock, Headphones, ChevronLeft } from 'lucide-react';
import OrderDetails from './OrderDetails'; // Assuming your OrderDetails component is in the same folder

const Profile = () => {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('ladakhUser')) || {});
  const [orders, setOrders] = useState([]);
  const [showEditPassword, setShowEditPassword] = useState(false);
  const [isEditingSecurity, setIsEditingSecurity] = useState(false);
  const [activeTab, setActiveTab] = useState('profile'); // 'profile' (Dashboard) or 'orders' (Detail View)

  const [securityData, setSecurityData] = useState({
    name: user.name || '',
    phone: user.phone || '',
    password: user.password || ''
  });

  useEffect(() => {
    if (user.email) {
      fetch(`https://dry-fruit-store.onrender.com/api/orders/user/${user.email}`)
        .then((res) => res.json())
        .then((data) => {
          if (data.success && Array.isArray(data.orders)) {
            setOrders(data.orders);
          } else if (Array.isArray(data)) {
            setOrders(data);
          } else {
            setOrders([]);
          }
        })
        .catch((err) => console.error("Error loading orders:", err));
    }
  }, [user.email]);

  const handleUpdateSecurity = () => {
    const updatedUser = { ...user, ...securityData };
    localStorage.setItem('ladakhUser', JSON.stringify(updatedUser));
    setUser(updatedUser);
    setIsEditingSecurity(false);
    alert("Security details updated! Your new password is now active.");
  };

  return (
    <div className="max-w-6xl mx-auto p-4 lg:p-8 bg-gray-50 min-h-screen">

      {/* HEADER & BREADCRUMBS */}
      <div className="mb-8">
        {activeTab === 'orders' && (
          <button
            onClick={() => setActiveTab('profile')}
            className="flex items-center text-sm text-blue-600 hover:underline mb-2"
          >
            <ChevronLeft size={16} /> Back to Your Account
          </button>
        )}
        <h1 className="text-3xl font-bold text-gray-800">
          {activeTab === 'profile' ? 'Your Account' : 'Your Orders'}
        </h1>
      </div>

      {activeTab === 'profile' ? (
        /* ================= DASHBOARD VIEW ================= */
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

          {/* CARD 1: YOUR ORDERS */}
          <div
            onClick={() => setActiveTab('orders')}
            className="flex items-start gap-4 p-6 bg-white border border-gray-200 rounded-lg shadow-sm hover:bg-gray-50 cursor-pointer transition-all group"
          >
            <div className="p-3 bg-gray-100 rounded-lg group-hover:bg-white transition-colors">
              <Package size={40} className="text-gray-600" />
            </div>
            <div>
              <h3 className="text-xl font-medium text-gray-900">Your Orders</h3>
              <p className="text-sm text-gray-500">Track, return, or buy things again</p>
              {orders.length > 0 && (
                <span className="mt-2 inline-block bg-indigo-50 text-indigo-700 text-[10px] px-2 py-0.5 rounded-full font-bold">
                  {orders.length} ORDERS PLACED
                </span>
              )}
            </div>
          </div>

          {/* CARD 2: LOGIN & SECURITY */}
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <Lock className="text-gray-600" size={24} />
                <h2 className="text-xl font-bold">Login & Security</h2>
              </div>
              {!isEditingSecurity && (
                <button
                  onClick={() => setIsEditingSecurity(true)}
                  className="text-blue-600 text-xs font-medium hover:underline border px-4 py-1 rounded shadow-sm hover:bg-gray-50"
                >
                  Edit All
                </button>
              )}
            </div>

            {isEditingSecurity ? (
              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1 font-sans">Name</label>
                  <input
                    type="text"
                    className="w-full border p-2 rounded text-sm focus:ring-1 focus:ring-orange-500 outline-none"
                    value={securityData.name}
                    onChange={(e) => setSecurityData({ ...securityData, name: e.target.value })}
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">Phone</label>
                  <input
                    type="text"
                    className="w-full border p-2 rounded text-sm focus:ring-1 focus:ring-orange-500 outline-none"
                    value={securityData.phone}
                    onChange={(e) => setSecurityData({ ...securityData, phone: e.target.value })}
                  />
                </div>
                <div className="relative">
                  <label className="block text-xs font-bold text-gray-700 mb-1">New Password</label>
                  <input
                    type={showEditPassword ? "text" : "password"}
                    className="w-full border p-2 rounded text-sm focus:ring-1 focus:ring-orange-500 outline-none pr-10"
                    value={securityData.password}
                    onChange={(e) => setSecurityData({ ...securityData, password: e.target.value })}
                  />
                  <button
                    type="button"
                    onClick={() => setShowEditPassword(!showEditPassword)}
                    className="absolute right-3 top-7 text-gray-500"
                  >
                    {showEditPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
                <div className="flex gap-2 pt-2">
                  <button onClick={handleUpdateSecurity} className="bg-orange-400 hover:bg-orange-500 text-black px-6 py-1.5 rounded-lg text-sm font-medium shadow-sm">
                    Save Changes
                  </button>
                  <button onClick={() => setIsEditingSecurity(false)} className="bg-white border border-gray-300 hover:bg-gray-50 px-6 py-1.5 rounded-lg text-sm shadow-sm">
                    Cancel
                  </button>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="border-b pb-2">
                  <p className="font-bold text-sm text-gray-900">Name:</p>
                  <p className="text-sm text-gray-600">{user.name}</p>
                </div>
                <div className="border-b pb-2">
                  <p className="font-bold text-sm text-gray-900">Phone:</p>
                  <p className="text-sm text-gray-600">+91 {user.phone}</p>
                </div>
                <div>
                  <p className="font-bold text-sm text-gray-900">Password:</p>
                  <p className="text-sm text-gray-600">********</p>
                </div>
              </div>
            )}
          </div>

          {/* CARD 3: ADDRESSES */}
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
            <div className="flex items-center gap-3 mb-4">
              <MapPin className="text-gray-600" size={24} />
              <h2 className="text-xl font-bold">Addresses</h2>
            </div>
            <div className="text-gray-600 mb-4 space-y-1">
              <p className="font-medium text-gray-800">{user.name}</p>
              <p className="text-sm line-clamp-2">{user.address || "No address set."}</p>
              <p className="text-sm">+91 {user.phone}</p>
            </div>
            <Link to="/addresses" className="text-blue-600 hover:underline font-medium text-sm">
              Edit or Add Address
            </Link>
          </div>

          {/* CARD 4: CONTACT US */}
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
            <div className="flex items-center gap-3 mb-4">
              <Headphones className="text-gray-600" size={24} />
              <h2 className="text-xl font-bold">Contact Us</h2>
            </div>
            <p className="text-sm text-gray-600 mb-4">Need help with an order?</p>
            <div className="space-y-2">
              <a href="mailto:support@ladakhdryfruits.com" className="block p-3 bg-gray-50 rounded-lg border border-gray-100 hover:bg-gray-100 transition text-xs truncate">
                📧 Email: support@ladakhdryfruits.com
              </a>
              <div className="p-3 bg-gray-50 rounded-lg border border-gray-100 text-xs">
                📞 Phone: +91 9682622587
              </div>
            </div>
          </div>

        </div>
      ) : (
        /* ================= YOUR ORDERS DETAIL VIEW ================= */
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-2 md:p-6">
          {/* Passing only this specific user's orders to the detail component */}
          <OrderDetails orders={orders} />
        </div>
      )}
    </div>
  );
};


export default Profile;
