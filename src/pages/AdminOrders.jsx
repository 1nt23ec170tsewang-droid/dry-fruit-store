import { useState, useEffect } from 'react';
import axios from 'axios';
import { 
  Package, Truck, CheckCircle, Clock, XCircle, 
  Phone, Mail, MessageSquare, Printer, Save, 
  Tag, Info, User, Search, Filter, AlertCircle, TrendingUp
} from 'lucide-react';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || (import.meta.env.DEV ? '' : 'https://dry-fruit-store.onrender.com');

const AdminOrders = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState('All');

  const ADMIN_PASSWORD = 'Nurboo@2001';
  const STATUS_STEPS = ["Pending", "Confirmed", "Packed", "Shipped", "Delivered", "Cancelled"];

  const handleLogin = (e) => {
    e.preventDefault();
    if (password === ADMIN_PASSWORD) {
      setIsAuthenticated(true);
    } else {
      setError('Incorrect password');
    }
  };

  const fetchOrders = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${API_BASE_URL}/api/orders`);
      setOrders(response.data);
    } catch (err) {
      setError('Failed to fetch orders. Check backend connection.');
    } finally {
      setLoading(false);
    }
  };

  // --- REPLACE YOUR updateOrderStatus FUNCTION WITH THIS ---
const updateOrderStatus = async (orderId, status) => {
  try {
    const formattedStatus = status.toLowerCase();
    await axios.patch(`${API_BASE_URL}/api/orders/${orderId}/status`, { status: formattedStatus });
    
    // This updates the UI immediately so the order "moves" to the correct tab
    setOrders(prevOrders => 
      prevOrders.map(order => 
        order.id === orderId ? { ...order, status: formattedStatus } : order
      )
    );
  } catch (err) {
    alert('Error updating status');
  }
};

  const deleteOrder = async (orderId) => {
    if (window.confirm("Are you sure you want to delete this order?")) {
      try {
        await axios.delete(`${API_BASE_URL}/api/orders/${orderId}`);
        // Update the UI locally so it disappears immediately
        setOrders(prevOrders => prevOrders.filter(order => order.id !== orderId));
        alert("Order deleted successfully");
      } catch (err) {
        console.error("Error deleting order:", err);
        alert("Error: Ensure backend has a DELETE route for /api/orders/:id");
      }
    }
  };

  useEffect(() => {
    if (isAuthenticated) fetchOrders();
  }, [isAuthenticated]);

  // --- REPLACE YOUR FILTER LOGIC WITH THIS ---
const filteredOrders = orders.filter(order => {
  const matchesSearch = order.id.toString().includes(searchQuery) || 
                        order.customer?.name?.toLowerCase().includes(searchQuery.toLowerCase());
  
  // Strict matching ensures 'confirmed' orders do not show when 'Pending' is selected
  const matchesStatus = filterStatus === 'All' || 
                        order.status.toLowerCase() === filterStatus.toLowerCase();
  
  return matchesSearch && matchesStatus;
});

  if (!isAuthenticated) {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
          <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-indigo-100 text-indigo-600 rounded-full mb-4">
                <User size={32} />
              </div>
              <h2 className="text-2xl font-bold text-gray-800">Admin Portal</h2>
              <p className="text-gray-500 text-sm">Ladakh Dry Fruits Management</p>
            </div>
            <form onSubmit={handleLogin} className="space-y-4">
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none transition"
                placeholder="Enter Admin Password"
                required
              />
              {error && <p className="text-red-500 text-xs text-center">{error}</p>}
              <button type="submit" className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 rounded-xl transition shadow-lg shadow-indigo-200">
                Unlock Dashboard
              </button>
            </form>
          </div>
        </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <header className="bg-white border-b sticky top-0 z-10 p-4 shadow-sm">
        <div className="container mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
          <h1 className="text-xl font-bold text-gray-800 flex items-center gap-2">
            <Package className="text-indigo-600" /> Order Management
          </h1>
          
          <div className="flex flex-1 max-w-2xl w-full gap-2">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-2.5 text-gray-400" size={18} />
              <input 
                type="text" 
                placeholder="Search Order ID or Customer..." 
                className="w-full pl-10 pr-4 py-2 border rounded-lg text-sm focus:ring-2 focus:ring-indigo-500 outline-none"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <select 
              className="border rounded-lg px-3 py-2 text-sm bg-white outline-none"
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
            >
              <option>All</option>
              {STATUS_STEPS.map(s => <option key={s}>{s}</option>)}
            </select>
            <button onClick={fetchOrders} className="p-2 hover:bg-gray-100 rounded-lg border transition">
              <Clock size={18} className="text-gray-600" />
            </button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-6 space-y-8">
        {loading ? (
          <div className="flex justify-center items-center h-64"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div></div>
        ) : filteredOrders.map((order) => (
          <div key={order.id} className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow">
            
            <div className="p-6 border-b bg-gray-50/50 flex flex-wrap justify-between items-start gap-4">
              <div className="space-y-1">
                <div className="flex items-center gap-3">
                  <h2 className="text-lg font-bold text-gray-900">Order #{order.id}</h2>
                  <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${order.paymentMethod === 'cod' ? 'bg-orange-100 text-orange-700' : 'bg-green-100 text-green-700'}`}>
                    {order.paymentMethod?.toUpperCase()}
                  </span>
                  <span className="flex items-center gap-1 text-xs text-gray-500 bg-white px-2 py-0.5 border rounded">
                    <TrendingUp size={12} /> {order.source || 'Website'}
                  </span>
                  {/* LINKED DELETE FUNCTION CORRECTLY HERE */}
                  <button
                    onClick={() => deleteOrder(order.id)}
                    className="ml-2 px-3 py-1 rounded-lg text-xs font-semibold text-red-600 border border-red-200 hover:bg-red-50 transition-colors"
                  >
                    Delete Order
                  </button>
                </div>
                <p className="text-xs text-gray-500">Placed on: {new Date(order.createdAt).toLocaleString()}</p>
              </div>

              <div className="flex flex-wrap gap-2">
                {STATUS_STEPS.map(step => (
                  <button
                    key={step}
                    onClick={() => updateOrderStatus(order.id, step)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
                      order.status.toLowerCase() === step.toLowerCase()
                        ? 'bg-indigo-600 text-white ring-2 ring-indigo-200'
                        : 'bg-white border border-gray-200 text-gray-600 hover:bg-gray-50'
                    }`}
                  >
                    {step}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 divide-y lg:divide-y-0 lg:divide-x border-b">
              <div className="p-6 lg:col-span-2">
                <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-4">Line Items</h3>
                <div className="space-y-3">
                  {order.cartItems?.map((item, idx) => (
                    <div key={idx} className="flex justify-between items-center text-sm border-b border-dashed pb-2">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-gray-100 rounded flex items-center justify-center font-bold text-indigo-600">{item.quantity}x</div>
                        <span className="font-medium text-gray-800">{item.name}</span>
                      </div>
                      <span className="font-semibold">₹{item.price * item.quantity}</span>
                    </div>
                  ))}
                </div>
                
                <div className="mt-6 flex justify-end">
                  <div className="w-full max-w-[240px] space-y-2 bg-gray-50 p-4 rounded-xl">
                    <div className="flex justify-between text-base font-bold text-gray-900 pt-2">
                      <span>Final Total</span><span>₹{order.total}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-6 bg-white space-y-6">
                <div>
                  <div className="flex justify-between items-center mb-3">
                    <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider">Customer</h3>
                    <span className="bg-blue-50 text-blue-600 px-2 py-0.5 rounded-full text-[10px] font-bold">CUSTOMER</span>
                  </div>
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 bg-indigo-50 text-indigo-600 rounded-full flex items-center justify-center font-bold">
                      {order.customer?.name?.charAt(0)}
                    </div>
                    <div>
                      <p className="text-sm font-bold text-gray-900">{order.customer?.name}</p>
                      <div className="flex gap-2 mt-1">
                        <a href={`tel:${order.customer?.phone}`} className="p-1.5 bg-gray-50 border rounded-md hover:text-indigo-600"><Phone size={14}/></a>
                        <a href={`https://wa.me/${order.customer?.phone}`} className="p-1.5 bg-gray-50 border rounded-md hover:text-green-600"><MessageSquare size={14}/></a>
                      </div>
                    </div>
                  </div>
                  <p className="text-xs text-gray-600 bg-gray-50 p-3 rounded-lg leading-relaxed">
                    <span className="font-bold text-gray-400">Address:</span><br/>
                    {order.customer?.address}, {order.customer?.pincode}
                  </p>
                </div>

                <div className="pt-4 border-t space-y-3">
                  <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider">Logistics Info</h3>
                  <div className="mt-2 p-3 bg-green-50 rounded-lg border border-green-100">
                    {order.status.toLowerCase() === 'confirmed' ? (
                      <div className="flex items-center gap-3">
                        <span className="text-xl">🚚</span>
                        <div>
                          <p className="text-sm font-bold text-green-700">Order Successful & Confirmed</p>
                        </div>
                      </div>
                    ) : (
                      <p className="text-xs text-yellow-600 flex items-center gap-2">
                        <span>🕒</span> Status: {order.status}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </main>
    </div>
  );
};


export default AdminOrders;
