import { useState } from 'react';
import ProductCard from '../components/ProductCard';
import { products } from '../data/products';

const Products = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = ['all', 'apricots', 'nuts', 'berries', 'cheese', 'raisins'];
  const categoryNames = {
    all: 'All Products',
    apricots: 'Apricots',
    nuts: 'Nuts',
    berries: 'Berries',
    cheese: 'Cheese',
    raisins: 'Raisins',
  };
  
  const filteredProducts =
    selectedCategory === 'all'
      ? products
      : products.filter((p) => p.category === selectedCategory);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-heading font-bold text-center mb-8 text-gray-800">
        Our Products
      </h1>

      {/* Category Filter */}
      <div className="flex flex-wrap justify-center gap-2 mb-8">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category)}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              selectedCategory === category
                ? 'bg-ladakh-orange text-white'
                : 'bg-white text-gray-700 hover:bg-gray-100'
            }`}
          >
            {categoryNames[category]}
          </button>
        ))}
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      {filteredProducts.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-600 text-lg">No products found in this category.</p>
        </div>
      )}
    </div>
  );
};

export default Products;

