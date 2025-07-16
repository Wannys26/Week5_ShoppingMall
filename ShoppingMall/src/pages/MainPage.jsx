import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import Card from '../components/Card';
import { fetchAllProducts, searchProducts } from '../apis/products';

const MainPage = () => {
  const [products, setProducts] = useState([]);
  const location = useLocation();
  const searchQuery = new URLSearchParams(location.search).get('q');

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const result = searchQuery
          ? await searchProducts(searchQuery)
          : await fetchAllProducts();
        console.log('API 응답 데이터: ', result);
        setProducts(Array.isArray(result) ? result : []);
      } catch (err) {
        console.error('상품 불러오기 실패:', err);
        setProducts([]);
      }
    };

    loadProducts();
  }, [searchQuery]);

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
        {Array.isArray(products) && products.map((product) => { 
          console.log('카드에 전달될 product:', product);
          return (
          <Card
            key={product.id}
            {...product}
            onAddToCart={() => handleAddToCart(product)}
          />
          );
          })}
      </div>
    </div>
  );
};

export default MainPage;
