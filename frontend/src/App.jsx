import React, { useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import AnnouncementBar from './components/AnnouncementBar';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import CartDrawer from './components/CartDrawer';
import PaymentModal from './components/PaymentModal';
import QuickViewModal from './components/QuickViewModal';
import Toast from './components/Toast';

import HomePage from './pages/HomePage';
import ProductsPage from './pages/ProductsPage';
import DiscountsPage from './pages/DiscountsPage';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';

export default function App() {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <div className="flex flex-col min-h-screen bg-slate-50 text-slate-800 font-sans">
      <AnnouncementBar />
      <Navbar onSearch={setSearchQuery} />

      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<HomePage search={searchQuery} />} />
          <Route path="/products" element={<ProductsPage search={searchQuery} />} />
          <Route path="/discounts" element={<DiscountsPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>

      <Footer />

      {/* Global Modals & Notifications */}
      <CartDrawer />
      <PaymentModal />
      <QuickViewModal />
      <Toast />
    </div>
  );
}
