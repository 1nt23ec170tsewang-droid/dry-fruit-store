import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { Package, ChevronRight, RotateCcw, MapPin, CreditCard } from 'lucide-react';
import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';

const OrderDetails = ({ orders: propsOrders }) => {
  const { id } = useParams();
  const [order, setOrder] = useState(null);
  const { addToCart } = useCart();

  useEffect(() => {
    // If id exists in URL, fetch specific order. Otherwise, find it in props.
    if (id) {
      fetch(https://dry-fruit-store.onrender.com/api/orders/${id}`)
        .then(res => res.json())
        .then(data => setOrder(data.order || data))
        .catch(err => console.error("Error fetching order:", err));
    } else if (propsOrders) {
      // If used inside Profile.jsx, propsOrders is passed
      setOrder(null);
    }
  }, [id, propsOrders]);

  // If this component is used as a LIST inside Profile.jsx
  if (propsOrders) {
    return (
      <div className="space-y-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Your Orders</h2>
        {propsOrders.length === 0 ? (
          <div className="bg-white p-10 border rounded-lg text-center">
            <Package className="mx-auto text-gray-300 mb-4" size={48} />
            <p className="text-gray-500">No orders found.</p>
          </div>
        ) : (
          propsOrders.map((ord) => <OrderCard key={ord.id} order={ord} addToCart={addToCart} />)
        )}
      </div>
    );
  }

  // If this component is used as a STANDALONE page
  if (!order) return <div className="p-10 text-center animate-pulse">Loading order details...</div>;

  return (
    <div className="max-w-5xl mx-auto p-4 md:p-8 bg-gray-50 min-h-screen">
      <nav className="text-sm mb-4 text-gray-600">
        <Link to="/profile" className="hover:text-orange-600 hover:underline">Your Account</Link>
        <span className="mx-2">&gt;</span>
        <span className="text-orange-700 font-medium">Order Details</span>
      </nav>

      <h1 className="text-3xl font-normal mb-6">Order Details</h1>
      <OrderCard order={order} addToCart={addToCart} isDetailView={true} />
    </div>
  );
};

// Internal Component to maintain the Amazon Layout
const OrderCard = ({ order, addToCart, isDetailView }) => {
  const formattedDate = new Date(order.createdAt).toLocaleDateString('en-IN', {
    day: 'numeric', month: 'long', year: 'numeric'
  });

  const generateInvoice = (order) => {
    const doc = new jsPDF();

    // Store Info Header
    doc.setFontSize(20);
    doc.setTextColor(217, 119, 6); // ladakh-orange
    doc.text('Aryan Dry Fruits Store', 14, 22);

    doc.setFontSize(10);
    doc.setTextColor(100);
    doc.text('Garkhon, Kargil, Ladakh', 14, 30);
    doc.text('Email: support@aryandryfruits.com', 14, 35);
    doc.text('Phone: +91 9682622587', 14, 40);

    // Invoice Meta
    doc.setFontSize(16);
    doc.setTextColor(0);
    doc.text('INVOICE / RECEIPT', 14, 55);

    doc.setFontSize(10);
    doc.text(`Order ID: ${order.id}`, 14, 65);
    doc.text(`Date: ${formattedDate}`, 14, 70);
    doc.text(`Payment Method: ${order.paymentMethod.toUpperCase()}`, 14, 75);
    doc.text(`Status: ${order.status.toUpperCase()}`, 14, 80);

    // Customer Detail
    doc.text('Bill To:', 120, 65);
    doc.setFont(undefined, 'bold');
    doc.text(order.customer.name || 'Customer Name', 120, 70);
    doc.setFont(undefined, 'normal');
    doc.text(order.customer.address || '', 120, 75);
    doc.text(`Pincode: ${order.customer.pincode || ''}`, 120, 80);
    doc.text(`Phone: ${order.customer.phone || ''}`, 120, 85);

    // Items Array Mapping
    const tableColumn = ["Item Description", "Category", "Qty", "Unit Price", "Total"];
    const tableRows = [];

    let calculatedTotal = 0;

    order.cartItems.forEach(item => {
      const itemData = [
        item.name,
        item.category || '-',
        item.quantity,
        `Rs. ${item.price}`,
        `Rs. ${item.price * item.quantity}`
      ];
      calculatedTotal += item.price * item.quantity;
      tableRows.push(itemData);
    });

    autoTable(doc, {
      startY: 95,
      head: [tableColumn],
      body: tableRows,
      theme: 'grid',
      headStyles: { fillColor: [217, 119, 6] },
      styles: { fontSize: 9 }
    });

    const finalY = doc.lastAutoTable.finalY || 95;

    // Totals
    doc.setFontSize(12);
    doc.setFont(undefined, 'bold');
    doc.text(`Total Amount: Rs. ${order.total || calculatedTotal}`, 135, finalY + 15);

    doc.setFontSize(10);
    doc.setFont(undefined, 'normal');
    const footerText = 'Thank you for shopping with Aryan Dry Fruits Store!';
    doc.text(footerText, 105, 280, null, null, 'center');

    // Make Download
    doc.save(`Invoice_${order.id}.pdf`);
  };

  return (
    <div className="bg-white border rounded-lg shadow-sm overflow-hidden mb-6" >
      {/* Amazon Gray Header */}
      < div className="bg-gray-100 p-4 border-b grid grid-cols-2 md:grid-cols-4 gap-4 text-xs text-gray-600" >
        <div>
          <p className="uppercase font-bold text-gray-500">Order Placed</p>
          <p>{formattedDate}</p>
        </div>
        <div>
          <p className="uppercase font-bold text-gray-500">Total</p>
          <p className="font-medium text-gray-900">₹{order.total}</p>
        </div>
        <div>
          <p className="uppercase font-bold text-gray-500">Ship To</p>
          <p className="text-blue-600 hover:underline cursor-pointer flex items-center">
            {order.customer?.name} <ChevronRight size={12} />
          </p>
        </div>
        <div className="text-right flex flex-col items-end">
          <p className="uppercase font-bold text-gray-500">Order # {order.id}</p>
          <div className="flex gap-2 text-blue-600 mt-1">
            {!isDetailView && <Link to={`/order/${order.id}`} className="hover:underline">View details</Link>}
            <span className="text-gray-300">|</span>
            <button onClick={() => generateInvoice(order)} className="hover:underline cursor-pointer text-blue-600 focus:outline-none">Invoice</button>
          </div>
        </div>
      </div >

      {/* Detail Content */}
      < div className="p-6" >
        <div className="mb-4">
          <h3 className="text-lg font-bold text-gray-900">
            {order.status === 'delivered' ? 'Delivered' : `Status: ${order.status}`}
          </h3>
          <p className="text-sm text-gray-600">
            Payment Method: <span className="capitalize">{order.paymentMethod}</span>
          </p>
        </div>

        {
          order.cartItems?.map((item, index) => (
            <div key={index} className="flex flex-col md:flex-row gap-6 py-4 border-t first:border-t-0">
              <img
                src={item.image || 'https://via.placeholder.com/150'}
                className="w-24 h-24 object-cover rounded-md border"
                alt={item.name}
              />

              <div className="flex-grow">
                <h4 className="text-blue-600 font-medium hover:underline hover:text-orange-700 cursor-pointer">
                  {item.name}
                </h4>
                <p className="text-sm text-gray-500 mt-1">Quantity: {item.quantity}</p>
                <p className="text-sm font-bold mt-2 text-gray-900">₹{item.price}</p>

                <button
                  onClick={() => {
                    addToCart(item);
                    alert(`${item.name} added to cart!`);
                  }}
                  className="mt-4 flex items-center gap-2 bg-[#FFD814] hover:bg-[#F7CA00] border border-[#FCD200] text-sm px-5 py-1.5 rounded-full shadow-sm"
                >
                  <RotateCcw size={16} /> Buy it again
                </button>
              </div>

              <div className="flex flex-col gap-2 w-full md:w-48">
                <button className="w-full text-center py-1.5 border border-gray-300 rounded-lg text-sm hover:bg-gray-50 shadow-sm transition font-medium">
                  Track package
                </button>
                <button onClick={() => {
                  const review = window.prompt(`Writing a review for ${item.name}. What did you think?`);
                  if (review) {
                    alert('Thank you! Your product review has been submitted successfully.');
                  }
                }}
                  className="w-full text-center py-1.5 border border-gray-300 rounded-lg text-sm hover:bg-gray-50 shadow-sm transition font-medium">
                  Write a product review
                </button>
              </div>
            </div>
          ))
        }
      </div >
    </div >
  );
};


export default OrderDetails;
