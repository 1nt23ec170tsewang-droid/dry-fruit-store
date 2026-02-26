const Footer = () => {
  return (
    <footer className="bg-ladakh-brown text-white mt-auto">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-xl font-heading font-bold mb-4">Ladakh Dry Fruits Store</h3>
            <p className="text-gray-300">
              Pure Organic Dry Fruits from Ladakh – Farm to Home. Bringing you the finest quality dry fruits from the high-altitude region of Ladakh.
            </p>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-gray-300">
              <li><a href="/" className="hover:text-white">Home</a></li>
              <li><a href="/products" className="hover:text-white">Products</a></li>
              <li><a href="/cart" className="hover:text-white">Cart</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">Contact</h4>
            <p className="text-gray-300">
              Serving all of Ladakh<br />
              Leh, Kargil, Nubra, Zanskar & more
            </p>
          </div>
        </div>
        
        <div className="border-t border-gray-600 mt-8 pt-4 text-center text-gray-300">
          <p>&copy; {new Date().getFullYear()} Ladakh Dry Fruits Store. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

