import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MainPage from './pages/MainPage';
import SignIn from './pages/SignIn';
import Navbar from './components/Navbar';
import CartPage from './pages/CartPage'; 
import './index.css';

export default function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/signin" element={<SignIn />} />
         <Route path="/cart" element={<CartPage />} />
      </Routes>
    </Router>
  );
}
