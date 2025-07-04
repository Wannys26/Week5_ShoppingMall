import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import profileIcon from '../assets/profile-icon.svg';
import cartIcon from '../assets/cart-icon.svg';
import menuBarIcon from '../assets/menubar-icon.svg';
import searchIcon from '../assets/search.svg'

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const  [search, setSearch] = useState('');

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
  };


  return (
    <nav className="w-full flex items-center justify-between px-6 py-4 shadow-sm bg-white relative">
{/* 좌측 로고 */}
      <div className="flex items-center gap-2">
        <Link to="/">
          <h1 className="text-xl md:text-2xl font-bold text-violet-600">ShopMall</h1>
        </Link>
      </div>

{/* 중앙 검색창 (데스크탑 사이즈) */}
      <div className="hidden md:flex flex-1 justify-center px-6">
        <div className="flex items-center w-full max-w-[593px] h-[41px] px-3 border border-gray-300 rounded-md bg-white">
          <input
            type="text"
            className="flex-1 h-full text-sm placeholder-gray-400 focus:outline-none"
            placeholder="상품 검색"
          />
          <img src={searchIcon} alt="검색" className="w-5 h-5 ml-2" />
        </div>
      </div>

{/* 우측 Sign In, Cart (데스크탑 사이즈) */}
      <div className="hidden md:flex items-center gap-6 ml-4">
        <Link to="/signin" className="flex items-center gap-1 text-sm text-gray-800 hover:underline">
          <img src={profileIcon} alt="Sign In" className="w-5 h-5" />
          Sign In
        </Link>
        <Link to="/cart">
          <img src={cartIcon} alt="Cart" className="w-6 h-6" />
        </Link>
      </div>
      


{/* 모바일 사이즈 일때 햄버거 메뉴 */}
      <button className="md:hidden" onClick={() => setIsOpen(!isOpen)}>
        <img src={menuBarIcon} alt="Menu" className="w-6 h-6" />
      </button>

{/* 모바일 메뉴 드롭다운 */}
      {isOpen && (
        <div className="absolute top-16 left-0 w-full bg-white shadow-md flex flex-col items-center py-4 gap-4 md:hidden z-50">
          <Link to="/signin" className="flex items-center gap-2 text-sm text-gray-800 hover:underline">
            <img src={profileIcon} alt="Sign In" className="w-5 h-5" />
            Sign In
          </Link>
          <Link to="/cart">
            <img src={cartIcon} alt="Cart" className="w-6 h-6" />
          </Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;