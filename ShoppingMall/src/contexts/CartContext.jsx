import { createContext, useContext, useState } from 'react';

const CartContext = createContext();

export function useCart() {
  return useContext(CartContext);
}

export function CartProvider({ children }) {
  const [cart, setCart] = useState([]);

  const addToCart = (product, quantity) => {

      if (!product || typeof product !== 'object' || !product.id) {
    console.error('잘못된 product 데이터입니다:', product);
    return;
  }
    setCart(prevCart => {
      const safeCart = Array.isArray(prevCart) ? prevCart : [];
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

  const removeItems = (ids) => {
    setCart(prevCart => prevCart.filter(item => !ids.includes(item.id)));
  };

  const removeCheckedItems = (checkedIds) => {
    setCart(prevCart => prevCart.filter(item => !checkedIds.includes(item.id)));
  };

  return (
    <CartContext.Provider value={{ 
      cart, 
      setCart,
      addToCart, 
      removeItems,
      removeCheckedItems
    }}>
      {children}
    </CartContext.Provider>
  );
}
