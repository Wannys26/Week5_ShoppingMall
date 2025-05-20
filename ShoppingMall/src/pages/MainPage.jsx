import React, { useEffect, useState } from 'react';
import Card from '../components/Card';
import productsData from '../data/products.json';

const MainPage = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    setProducts(productsData);
  }, []);

  const handleAddToCart = (product) => {
    console.log('Added to cart:', product);
  };

  return (
    <div className="p-6 max-w-screen-xl mx-auto">
      <div className="text-center mb-6">
        <h2 className="text-xl font-semibold">Welcome to ShopMall</h2>
        <p className="text-sm text-gray-500">Discover our latest products and deals</p>
      </div>

      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-medium">Featured Products</h3>
        <a href="#" className="text-sm text-violet-600 hover:underline">View All</a>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {products.map((product) => (
          <Card
            key={product.id}
            {...product}
            onAddToCart={() => handleAddToCart(product)}
          />
        ))}
      </div>
    </div>
  );
};

export default MainPage;
