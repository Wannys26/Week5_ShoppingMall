import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import Card from '../components/Card';
import { fetchAllProducts, searchProducts } from '../apis/products';
import { addToCart as addToCartAPI } from '../apis/cart';
import { useCart } from '../contexts/CartContext';

const MainPage = () => {
  const [products, setProducts] = useState([]);
  const location = useLocation();
  const searchQuery = new URLSearchParams(location.search).get('q');

  const { addToCart: addToCartContext } = useCart(); // 로컬 상태 업데이트

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const result = searchQuery
          ? await searchProducts(searchQuery)
          : await fetchAllProducts();
        setProducts(Array.isArray(result) ? result : []);
      } catch (err) {
        console.error('상품 불러오기 실패:', err);
        setProducts([]);
      }
    };

    loadProducts();
  }, [searchQuery]);

  const handleAddToCart = async (product) => {
    try {
      const userId = 1; // 로그인 미구현 상태에서는 테스트용 ID 사용
      await addToCartAPI(userId, product.id, 1);     // 서버에 추가
      addToCartContext(product, 1);                  // context에 반영
      alert('장바구니에 추가되었습니다!');
    } catch (err) {
      console.error('장바구니 추가 실패:', err);
      alert('장바구니 추가에 실패했습니다.');
    }
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
        {Array.isArray(products) && products.map((product) => (
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
