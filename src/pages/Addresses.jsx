import React, { useState } from 'react';

const AddressPage = () => {
  const [addresses, setAddresses] = useState(JSON.parse(localStorage.getItem('userAddresses')) || []);
  const [showAddForm, setShowAddForm] = useState(false);
  
  // Updated state with all Amazon-style fields
  const [newAddress, setNewAddress] = useState({
    fullName: '',
    mobileNumber: '',
    pincode: '',
    flatHouse: '',
    areaStreet: '',
    landmark: '',
    townCity: '',
    state: 'LADAKH',
  });

  const handleAdd = () => {
    // Generate a unique ID and save the full address object
    const updated = [...addresses, { ...newAddress, id: Date.now() }];
    setAddresses(updated);
    localStorage.setItem('userAddresses', JSON.stringify(updated));
    setShowAddForm(false);
    // Reset form for next use
    setNewAddress({ fullName: '', mobileNumber: '', pincode: '', flatHouse: '', areaStreet: '', landmark: '', townCity: '', state: 'LADAKH' });
  };

  const removeAddress = (id) => {
    const updated = addresses.filter(addr => addr.id !== id);
    setAddresses(updated);
    localStorage.setItem('userAddresses', JSON.stringify(updated));
  };
  const handleEdit = (addressToEdit) => {
    setNewAddress(addressToEdit); // Fills the form with existing data
    setShowAddForm(true); // Opens the form overlay
  };

  return (
    <div className="max-w-6xl mx-auto p-4 md:p-10 bg-gray-50 min-h-screen">
      <nav className="text-sm mb-4 text-gray-600">
        Your Account &gt; <span className="text-orange-700">Your Addresses</span>
      </nav>
      <h1 className="text-3xl font-bold mb-6">Your Addresses</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Amazon-style Add Address Card */}
        <div 
          onClick={() => setShowAddForm(true)}
          className="border-2 border-dashed border-gray-300 rounded-xl p-8 flex flex-col items-center justify-center cursor-pointer hover:bg-gray-100 bg-white h-64 transition-colors"
        >
          <span className="text-5xl text-gray-300 font-light">+</span>
          <p className="text-gray-600 font-bold text-xl mt-2">Add address</p>
        </div>


        {/* Existing Address Cards */}
        {addresses.map((addr) => (
          <div key={addr.id} className="border border-gray-200 rounded-xl p-5 h-64 flex flex-col justify-between shadow-sm bg-white">
            <div className="text-sm text-gray-800 space-y-1 overflow-hidden">
              <p className="font-bold text-base mb-1">{addr.fullName}</p>
              <p>{addr.flatHouse}</p>
              <p>{addr.areaStreet}</p>
              <p>{addr.landmark && `Near ${addr.landmark}`}</p>
              <p>{addr.townCity}, {addr.state} {addr.pincode}</p>
              <p>India</p>
              <p className="mt-2">Phone number: {addr.mobileNumber}</p>
            </div>
            <button 
                onClick={() => handleEdit(addr)} 
                className="text-blue-600 hover:underline"
                 >
                    Edit
                </button>
            <div className="flex gap-4 border-t pt-3 text-blue-600 text-sm font-medium">
              <button onClick={() => removeAddress(addr.id)} className="hover:underline">Remove</button>
            </div>
          </div>
        ))}
      </div>

      {/* Full Amazon-style Form Overlay */}
      {showAddForm && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center p-4 z-50 backdrop-blur-sm">
          <div className="bg-white rounded-xl w-full max-w-lg shadow-2xl overflow-hidden">
            <div className="bg-gray-100 px-6 py-4 border-b flex justify-between items-center">
              <h2 className="text-lg font-bold">Add a new address</h2>
              <button onClick={() => setShowAddForm(false)} className="text-2xl text-gray-500">&times;</button>
            </div>
            
            <div className="p-6 space-y-4 max-h-[75vh] overflow-y-auto">
              <div>
                <label className="block text-sm font-bold mb-1">Full name (First and Last name)</label>
                <input className="w-full border border-gray-400 p-2 rounded focus:ring-1 focus:ring-orange-500 outline-none" 
                       value={newAddress.fullName} onChange={e => setNewAddress({...newAddress, fullName: e.target.value})} />
              </div>
              <div>
                <label className="block text-sm font-bold mb-1">Mobile number</label>
                <input className="w-full border border-gray-400 p-2 rounded focus:ring-1 focus:ring-orange-500 outline-none" 
                       value={newAddress.mobileNumber} onChange={e => setNewAddress({...newAddress, mobileNumber: e.target.value})} />
              </div>
              <div>
                <label className="block text-sm font-bold mb-1">Pincode</label>
                <input className="w-full border border-gray-400 p-2 rounded focus:ring-1 focus:ring-orange-500 outline-none" 
                       value={newAddress.pincode} onChange={e => setNewAddress({...newAddress, pincode: e.target.value})} />
              </div>
              <div>
                <label className="block text-sm font-bold mb-1">Flat, House no., Building, Company, Apartment</label>
                <input className="w-full border border-gray-400 p-2 rounded focus:ring-1 focus:ring-orange-500 outline-none" 
                       value={newAddress.flatHouse} onChange={e => setNewAddress({...newAddress, flatHouse: e.target.value})} />
              </div>
              <div>
                <label className="block text-sm font-bold mb-1">Area, Street, Sector, Village</label>
                <input className="w-full border border-gray-400 p-2 rounded focus:ring-1 focus:ring-orange-500 outline-none" 
                       value={newAddress.areaStreet} onChange={e => setNewAddress({...newAddress, areaStreet: e.target.value})} />
              </div>
              <div>
                <label className="block text-sm font-bold mb-1">Landmark</label>
                <input className="w-full border border-gray-400 p-2 rounded focus:ring-1 focus:ring-orange-500 outline-none" 
                       placeholder="E.g. near apollo hospital" value={newAddress.landmark} onChange={e => setNewAddress({...newAddress, landmark: e.target.value})} />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-bold mb-1">Town/City</label>
                  <input className="w-full border border-gray-400 p-2 rounded focus:ring-1 focus:ring-orange-500 outline-none" 
                         value={newAddress.townCity} onChange={e => setNewAddress({...newAddress, townCity: e.target.value})} />
                </div>
                <div>
                  <label className="block text-sm font-bold mb-1">State</label>
                  <select className="w-full border border-gray-400 p-2 rounded bg-gray-50" 
                          value={newAddress.state} onChange={e => setNewAddress({...newAddress, state: e.target.value})}>
                    <option>LADAKH</option>
                    <option>JAMMU & KASHMIR</option>
                    <option>KARNATAKA</option>
                    <option>DELHI</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="bg-gray-100 p-4 border-t flex gap-3">
               <button onClick={handleAdd} className="bg-orange-400 hover:bg-orange-500 text-black font-medium py-2 px-6 rounded-lg shadow-sm">Add address</button>
               <button onClick={() => setShowAddForm(false)} className="bg-white border border-gray-300 hover:bg-gray-50 py-2 px-6 rounded-lg shadow-sm">Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AddressPage;