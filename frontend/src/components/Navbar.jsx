import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { ShoppingBag, ShoppingCart, Menu, X, Search } from 'lucide-react';
import { useCart } from '../context/CartContext';

export default function Navbar({ onSearch }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const { totalCount, toggleCartDrawer } = useCart();
  const navigate = useNavigate();

  const handleSearchChange = (e) => {
    const val = e.target.value;
    setSearchTerm(val);
    if (onSearch) {
      onSearch(val);
    }
  };

  const navLinks = [
    { name: 'ទំព័រដើម', path: '/' },
    { name: 'ផលិតផល', path: '/products' },
    { name: 'ការបញ្ចុះតម្លៃ', path: '/discounts' },
    { name: 'អំពីយើង', path: '/about' },
    { name: 'ទំនាក់ទំនង', path: '/contact' },
  ];

  return (
    <header className="bg-white sticky top-0 z-40 shadow-sm border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center space-x-2">
            <NavLink to="/" className="flex items-center space-x-2">
              <div className="w-10 h-10 rounded-xl bg-brand-600 text-white flex items-center justify-center text-xl font-bold shadow-md">
                <ShoppingBag className="w-5 h-5" />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-brand-600 to-indigo-600 bg-clip-text text-transparent">
                KHMER STORE
              </span>
            </NavLink>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex space-x-8 font-medium text-slate-600">
            {navLinks.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                className={({ isActive }) =>
                  isActive
                    ? 'text-brand-600 font-semibold border-b-2 border-brand-600 pb-1'
                    : 'hover:text-brand-600 transition'
                }
              >
                {link.name}
              </NavLink>
            ))}
          </nav>

          {/* Search & Action Icons */}
          <div className="flex items-center space-x-4">
            {/* Desktop Search Input */}
            <div className="relative hidden sm:block w-48 md:w-64">
              <input
                type="text"
                value={searchTerm}
                onChange={handleSearchChange}
                placeholder="ស្វែងរកផលិតផល..."
                className="w-full pl-9 pr-4 py-2 text-sm bg-slate-100 border-none rounded-full focus:ring-2 focus:ring-brand-500 focus:bg-white transition outline-none"
              />
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
            </div>

            {/* Cart Icon with Reactive Badge */}
            <button
              onClick={toggleCartDrawer}
              className="relative p-2 text-slate-600 hover:text-brand-600 transition rounded-full hover:bg-slate-100"
              title="កន្ត្រកទំនិញ"
              aria-label="Shopping Cart"
            >
              <ShoppingCart className="w-6 h-6" />
              {totalCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center font-bold animate-pulse">
                  {totalCount}
                </span>
              )}
            </button>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-slate-600 hover:text-slate-900 rounded-lg hover:bg-slate-100"
              aria-label="Toggle mobile menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Search Bar */}
      <div className="p-3 bg-slate-50 border-t border-slate-100 sm:hidden">
        <div className="relative">
          <input
            type="text"
            value={searchTerm}
            onChange={handleSearchChange}
            placeholder="ស្វែងរកផលិតផល..."
            className="w-full pl-9 pr-4 py-2 text-sm bg-white border border-slate-200 rounded-lg focus:ring-2 focus:ring-brand-500 outline-none"
          />
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-b border-slate-200 shadow-md">
          <nav className="px-4 py-3 space-y-1">
            {navLinks.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                onClick={() => setMobileMenuOpen(false)}
                className={({ isActive }) =>
                  isActive
                    ? 'block px-3 py-2 rounded-lg bg-brand-50 text-brand-600 font-bold'
                    : 'block px-3 py-2 rounded-lg text-slate-700 hover:bg-slate-100'
                }
              >
                {link.name}
              </NavLink>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}
