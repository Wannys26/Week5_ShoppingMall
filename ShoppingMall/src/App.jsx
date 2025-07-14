import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MainPage from './pages/MainPage';
import SignIn from './pages/SignIn';
import Navbar from './components/Navbar';
import CartPage from './pages/CartPage'; 
import ProductDetail from './pages/ProductDetail';
import { CartProvider } from './contexts/CartContext';
import './index.css';

export default function App() {
  return (
    <CartProvider>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/product/:id" element={<ProductDetail />} />
        </Routes>
      </Router>
    </CartProvider>
  );
}
