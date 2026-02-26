import { Link } from 'react-router-dom';
import DeliveryMap from '../components/DeliveryMap';

const Home = () => {
  return (
    <div>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-ladakh-orange via-ladakh-brown to-ladakh-deep text-white py-20 px-4">
        <div className="container mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-heading font-bold mb-4">
            Ladakh Dry Fruits Store
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-ladakh-beige">
            Pure Organic Dry Fruits from Ladakh – Farm to Home
          </p>
          <Link to="/products" className="btn-primary bg-white text-ladakh-orange hover:bg-ladakh-beige text-lg px-8 py-3">
            Shop Now
          </Link>
        </div>
      </section>

      {/* Why Ladakh Dry Fruits Section */}
      <section className="py-16 px-4 bg-white">
        <div className="container mx-auto">
          <h2 className="text-3xl font-heading font-bold text-center mb-12 text-gray-800">
            Why Ladakh Dry Fruits?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-6">
              <div className="text-4xl mb-4">🌞</div>
              <h3 className="text-xl font-semibold mb-2">Sun-Dried Naturally</h3>
              <p className="text-gray-600">
                Our dry fruits are naturally sun-dried in the high-altitude climate of Ladakh, preserving their natural flavors and nutrients.
              </p>
            </div>
            <div className="text-center p-6">
              <div className="text-4xl mb-4">🌱</div>
              <h3 className="text-xl font-semibold mb-2">100% Organic</h3>
              <p className="text-gray-600">
                Grown without pesticides or chemicals, our dry fruits are pure, organic, and sourced directly from Ladakhi farmers.
              </p>
            </div>
            <div className="text-center p-6">
              <div className="text-4xl mb-4">🏔️</div>
              <h3 className="text-xl font-semibold mb-2">High-Altitude Quality</h3>
              <p className="text-gray-600">
                The unique climate and soil of Ladakh produce dry fruits with exceptional taste and nutritional value.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Organic & Sun-dried Section */}
      <section className="py-16 px-4 bg-ladakh-cream">
        <div className="container mx-auto">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-heading font-bold mb-6 text-gray-800">
              Organic & Sun-Dried
            </h2>
            <p className="text-lg text-gray-700 mb-8">
              Every product in our store is carefully selected from local Ladakhi farmers. 
              We ensure that our dry fruits are organic, sun-dried naturally, and packed with 
              the authentic flavors of the Himalayas. From apricots to walnuts, each item 
              represents the rich agricultural heritage of Ladakh.
            </p>
            <Link to="/products" className="btn-primary">
              Explore Our Products
            </Link>
          </div>
        </div>
      </section>

      {/* Delivery Areas Map Section */}
      <section className="py-16 px-4 bg-white">
        <div className="container mx-auto">
          <h2 className="text-3xl font-heading font-bold text-center mb-8 text-gray-800">
            Delivery Areas in Ladakh
          </h2>
          <p className="text-center text-gray-600 mb-8">
            We deliver fresh dry fruits across Ladakh. Click on the markers to see delivery details.
          </p>
          <DeliveryMap />
        </div>
      </section>

      {/* Featured Products Preview */}
      <section className="py-16 px-4 bg-ladakh-cream">
        <div className="container mx-auto">
          <h2 className="text-3xl font-heading font-bold text-center mb-12 text-gray-800">
            Featured Products
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {[
              { name: 'Ladakhi Apricots', emoji: '🍑' },
              { name: 'Walnuts', emoji: '🥜' },
              { name: 'Seabuckthorn', emoji: '🫐' },
              { name: 'Churpe', emoji: '🧀' },
            ].map((item, idx) => (
              <div key={idx} className="bg-white rounded-lg p-6 text-center shadow-md">
                <div className="text-4xl mb-2">{item.emoji}</div>
                <h3 className="font-semibold text-gray-800">{item.name}</h3>
              </div>
            ))}
          </div>
          <div className="text-center mt-8">
            <Link to="/products" className="btn-primary">
              View All Products
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;

