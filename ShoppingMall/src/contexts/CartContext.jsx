import { createContext, useContext, useState } from 'react';

const CartContext = createContext();

export function useCart() {
  return useContext(CartContext);
}

export function CartProvider({ children }) {
  const [cart, setCart] = useState([]);

  const addToCart = (product, quantity) => {
    if (!product || !product.id) return;
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prev, { ...product, quantity }];
    });
  };

  const removeItems = ids => {
    setCart(prev => prev.filter(item => !ids.includes(item.id)));
  };

  const removeCheckedItems = ids => {
    setCart(prev => prev.filter(item => !ids.includes(item.id)));
  };

  return (
    <CartContext.Provider
      value={{ cart, setCart, addToCart, removeItems, removeCheckedItems }}
    >
      {children}
    </CartContext.Provider>
  );
}
