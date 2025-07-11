import { createContext, useContext, useState } from 'react';

const CartContext = createContext();

export function useCart() {
  return useContext(CartContext);
}

export function CartProvider({ children }) {
  const [cart, setCart] = useState([]);

  const addToCart = (product, quantity) => {
    setCart(prevCart => {
      const existing = prevCart.find(item => item.id === product.id);
      if (existing) {
        return prevCart.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prevCart, { ...product, quantity }];
    });
  };

  {/*전체 선택 버튼 함수*/}
  const removeItems = (ids) => {
    setCart(prevCart => prevCart.filter(item => !ids.includes(item.id)));
  };
  
  {/*선택 삭제 버튼 함수*/}
    const removeCheckedItems = (checkedIds) => {
    setCart(prevCart => prevCart.filter(item => !checkedIds.includes(item.id)));
  };

  return (
    <CartContext.Provider value={{ 
      cart, 
      addToCart, 
      removeItems,
      removeCheckedItems, }}>
      {children}
    </CartContext.Provider>
  );
}
