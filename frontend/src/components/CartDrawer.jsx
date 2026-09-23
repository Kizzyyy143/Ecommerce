import React from 'react';
import { X, Trash2, ShoppingCart, Inbox, Plus, Minus } from 'lucide-react';
import { useCart } from '../context/CartContext';

export default function CartDrawer() {
  const {
    cart,
    isCartOpen,
    setIsCartOpen,
    updateQuantity,
    removeFromCart,
    totalPrice,
    openPaymentModal,
  } = useCart();

  if (!isCartOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        onClick={() => setIsCartOpen(false)}
        className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm transition-opacity"
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col transform transition-transform duration-300 ease-in-out">
          
          {/* Drawer Header */}
          <div className="p-4 bg-slate-900 text-white flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <ShoppingCart className="w-5 h-5 text-brand-400" />
              <h3 className="font-bold text-lg">កន្ត្រកទំនិញរបស់អ្នក</h3>
            </div>
            <button
              onClick={() => setIsCartOpen(false)}
              className="p-2 text-slate-400 hover:text-white rounded-lg transition"
              title="បិទកន្ត្រក"
              aria-label="Close Cart"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Cart Items Container */}
          <div className="flex-grow overflow-y-auto p-4 space-y-4">
            {cart.length === 0 ? (
              <div className="text-center py-16 text-slate-400">
                <Inbox className="w-12 h-12 mx-auto mb-3 text-slate-300" />
                <p className="text-sm font-medium">មិនទាន់មានទំនិញក្នុងកន្ត្រកនៅឡើយទេ</p>
              </div>
            ) : (
              cart.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center space-x-3 p-3 bg-slate-50 rounded-xl border border-slate-200"
                >
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-16 h-16 object-cover rounded-lg flex-shrink-0"
                  />
                  <div className="flex-grow min-w-0">
                    <h4 className="font-bold text-sm text-slate-800 truncate" title={item.title}>
                      {item.title}
                    </h4>
                    <p className="text-brand-600 font-bold text-xs">
                      ${Number(item.price).toFixed(2)}
                    </p>
                    <div className="flex items-center space-x-2 mt-1">
                      <button
                        onClick={() => updateQuantity(item.id, -1)}
                        className="w-6 h-6 bg-white border border-slate-300 rounded text-xs flex items-center justify-center font-bold text-slate-700 hover:bg-slate-100 transition"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="text-xs font-bold px-1">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.id, 1)}
                        className="w-6 h-6 bg-white border border-slate-300 rounded text-xs flex items-center justify-center font-bold text-slate-700 hover:bg-slate-100 transition"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="text-slate-400 hover:text-red-500 p-2 transition flex-shrink-0"
                    title="លុបទំនិញ"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))
            )}
          </div>

          {/* Drawer Footer & Checkout */}
          {cart.length > 0 && (
            <div className="p-4 bg-slate-50 border-t border-slate-200 space-y-3">
              <div className="flex justify-between items-center font-bold text-lg text-slate-800">
                <span>សរុបចុងក្រោយ:</span>
                <span className="text-brand-600">${totalPrice.toFixed(2)}</span>
              </div>
              <p className="text-xs text-slate-500">
                តម្លៃនេះរួមបញ្ចូលទាំងពន្ធ និងការវេចខ្ចប់រួចរាល់។
              </p>
              <button
                type="button"
                onClick={openPaymentModal}
                className="w-full py-3 bg-brand-600 hover:bg-brand-700 text-white rounded-xl font-bold text-center shadow-lg transition transform active:scale-98"
              >
                ទូទាត់ប្រាក់តាម KHQR
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
