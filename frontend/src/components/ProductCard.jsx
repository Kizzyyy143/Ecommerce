import React from 'react';
import { Star, Eye, ShoppingCart } from 'lucide-react';
import { useCart } from '../context/CartContext';

export default function ProductCard({ product }) {
  const { addToCart, setQuickViewProduct } = useCart();

  if (!product) return null;

  const hasDiscount = product.oldPrice && product.oldPrice > product.price;

  return (
    <div className="bg-white rounded-2xl border border-slate-200/80 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col group">
      
      {/* Product Image Area */}
      <div className="relative overflow-hidden aspect-square bg-slate-100">
        <img
          src={product.image}
          alt={product.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />

        {/* Discount Badge */}
        {hasDiscount && (
          <span className="absolute top-3 left-3 bg-red-500 text-white text-xs font-bold px-2.5 py-1 rounded-lg shadow-sm">
            ចុះថ្លៃ
          </span>
        )}

        {/* Quick View Floating Action */}
        <div className="absolute right-3 top-3 flex flex-col space-y-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <button
            onClick={() => setQuickViewProduct(product)}
            className="w-9 h-9 bg-white/90 hover:bg-white text-slate-700 rounded-full shadow-md flex items-center justify-center transition"
            title="មើលលម្អិត"
            aria-label="Quick View"
          >
            <Eye className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Details & Cart Action */}
      <div className="p-4 flex flex-col flex-grow justify-between">
        <div>
          {/* Rating */}
          <div className="flex items-center space-x-1 text-amber-400 text-xs mb-1">
            <Star className="w-3.5 h-3.5 fill-amber-400" />
            <span className="font-bold text-slate-700 ml-1">{product.rating}</span>
            <span className="text-slate-400">({product.reviewsCount || 0})</span>
          </div>

          {/* Title */}
          <h3
            onClick={() => setQuickViewProduct(product)}
            className="font-bold text-slate-800 text-base mb-2 line-clamp-1 hover:text-brand-600 transition cursor-pointer"
            title={product.title}
          >
            {product.title}
          </h3>
        </div>

        {/* Price & Add Button */}
        <div className="pt-2 border-t border-slate-100 flex items-center justify-between mt-3">
          <div>
            <span className="text-lg font-bold text-brand-600">
              ${Number(product.price).toFixed(2)}
            </span>
            {hasDiscount && (
              <span className="text-xs text-slate-400 line-through ml-1.5">
                ${Number(product.oldPrice).toFixed(2)}
              </span>
            )}
          </div>
          <button
            onClick={() => addToCart(product)}
            className="px-3.5 py-2 bg-slate-900 hover:bg-brand-600 text-white rounded-xl text-xs font-semibold flex items-center space-x-1.5 transition active:scale-95 shadow-sm"
          >
            <ShoppingCart className="w-3.5 h-3.5" />
            <span>បន្ថែម</span>
          </button>
        </div>
      </div>
    </div>
  );
}
