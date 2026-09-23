import React from 'react';
import { X, Star, ShoppingCart } from 'lucide-react';
import { useCart } from '../context/CartContext';

export default function QuickViewModal() {
  const { quickViewProduct, setQuickViewProduct, addToCart } = useCart();

  if (!quickViewProduct) return null;

  const handleClose = () => setQuickViewProduct(null);

  const handleAddToCartAndClose = () => {
    addToCart(quickViewProduct);
    handleClose();
  };

  return (
    <div
      onClick={handleClose}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fade-in"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full overflow-hidden relative"
      >
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 z-10 w-9 h-9 bg-slate-100 hover:bg-slate-200 text-slate-600 rounded-full flex items-center justify-center transition"
          title="បិទ"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2 p-6 gap-6">
          {/* Image */}
          <div className="aspect-square rounded-xl overflow-hidden bg-slate-100">
            <img
              src={quickViewProduct.image}
              alt={quickViewProduct.title}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Details */}
          <div className="flex flex-col justify-between">
            <div>
              <span className="text-xs font-semibold text-brand-600 uppercase tracking-wider">
                {quickViewProduct.category}
              </span>
              <h2 className="text-xl font-bold text-slate-800 mt-1 mb-2">
                {quickViewProduct.title}
              </h2>
              <div className="flex items-center space-x-2 text-xs mb-3">
                <span className="flex items-center text-amber-500 font-bold">
                  <Star className="w-3.5 h-3.5 fill-amber-400 mr-1" />
                  {quickViewProduct.rating}
                </span>
                <span className="text-slate-400">| {quickViewProduct.reviewsCount || 0} ការវាយតម្លៃ</span>
              </div>
              <p className="text-sm text-slate-600 leading-relaxed mb-4">
                {quickViewProduct.description}
              </p>
            </div>

            <div>
              <div className="text-2xl font-bold text-brand-600 mb-4">
                ${Number(quickViewProduct.price).toFixed(2)}
              </div>
              <button
                onClick={handleAddToCartAndClose}
                className="w-full py-3 bg-brand-600 hover:bg-brand-700 text-white font-bold rounded-xl transition flex items-center justify-center space-x-2 shadow-md hover:shadow-lg"
              >
                <ShoppingCart className="w-4 h-4" />
                <span>បន្ថែមទៅកន្ត្រក</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
