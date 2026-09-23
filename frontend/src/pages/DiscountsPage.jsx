import React, { useState, useEffect } from 'react';
import { fetchDiscounts } from '../api/client';
import ProductCard from '../components/ProductCard';
import { Tag, Loader2, Sparkles } from 'lucide-react';

export default function DiscountsPage() {
  const [discounts, setDiscounts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    const loadDiscounts = async () => {
      setLoading(true);
      try {
        const data = await fetchDiscounts();
        if (isMounted) {
          setDiscounts(data);
          setLoading(false);
        }
      } catch (err) {
        console.error('Failed to load discounts:', err);
        if (isMounted) setLoading(false);
      }
    };

    loadDiscounts();

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <div>
      {/* Hero Banner */}
      <section className="bg-gradient-to-r from-red-600 via-brand-700 to-indigo-900 text-white py-12 px-4 text-center relative overflow-hidden">
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="inline-flex items-center space-x-2 bg-white/20 backdrop-blur-md px-4 py-1.5 rounded-full text-xs font-bold mb-4 shadow-sm">
            <Sparkles className="w-4 h-4 text-amber-300" />
            <span>ការផ្តល់ជូនពិសេសប្រចាំខែ</span>
          </div>
          <h1 className="text-3xl md:text-5xl font-bold mb-3">ការបញ្ចុះតម្លៃពិសេស</h1>
          <p className="text-red-100 max-w-2xl mx-auto text-sm md:text-base">
            ឱកាសទិញទំនិញគុណភាពខ្ពស់ ក្នុងតម្លៃបញ្ចុះរហូតដល់ 30% និងមានចំនួនកំណត់!
          </p>
        </div>
      </section>

      {/* Discounts Grid */}
      <section className="py-10 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center space-x-2 mb-6 pb-4 border-b border-slate-100">
            <Tag className="w-5 h-5 text-red-500" />
            <h2 className="text-2xl font-bold text-slate-900">ទំនិញកំពុងបញ្ចុះតម្លៃ</h2>
            <span className="text-sm text-slate-500 ml-auto font-medium">
              {loading ? 'កំពុងផ្ទុក...' : `មាន ${discounts.length} មុខទំនិញ`}
            </span>
          </div>

          {loading ? (
            <div className="py-24 text-center text-brand-600">
              <Loader2 className="w-10 h-10 animate-spin mx-auto mb-3" />
              <p className="font-medium text-slate-600">កំពុងទាញយកទិន្នន័យបញ្ចុះតម្លៃ...</p>
            </div>
          ) : discounts.length === 0 ? (
            <div className="text-center py-16 bg-slate-50 rounded-2xl border border-dashed border-slate-300">
              <Tag className="w-12 h-12 mx-auto text-slate-400 mb-3" />
              <h3 className="text-lg font-bold text-slate-700 mb-1">
                មិនមានទំនិញបញ្ចុះតម្លៃនៅពេលនេះទេ
              </h3>
              <p className="text-slate-500 text-sm">
                សូមត្រលប់មកពិនិត្យមើលម្តងទៀតនៅពេលក្រោយ!
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {discounts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
