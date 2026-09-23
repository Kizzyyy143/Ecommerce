import React, { useState, useEffect } from 'react';
import { fetchProducts } from '../api/client';
import ProductCard from '../components/ProductCard';
import { PackageOpen, Loader2, Filter } from 'lucide-react';

export default function ProductsPage({ search }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [category, setCategory] = useState('all');
  const [sort, setSort] = useState('featured');

  useEffect(() => {
    let isMounted = true;
    const loadData = async () => {
      setLoading(true);
      try {
        const data = await fetchProducts({ search, category, sort });
        if (isMounted) {
          setProducts(data);
          setLoading(false);
        }
      } catch (err) {
        console.error('Failed to load products:', err);
        if (isMounted) setLoading(false);
      }
    };

    loadData();

    return () => {
      isMounted = false;
    };
  }, [search, category, sort]);

  const categories = [
    { id: 'all', label: 'ទាំងអស់' },
    { id: 'electronics', label: 'គ្រឿងអេឡិចត្រូនិច' },
    { id: 'fashion', label: 'សម្លៀកបំពាក់ & ម៉ូដ' },
    { id: 'accessories', label: 'គ្រឿងបន្លាស់' },
  ];

  return (
    <div>
      {/* Header Banner */}
      <section className="bg-gradient-to-r from-slate-900 via-brand-900 to-slate-800 text-white py-12 px-4 text-center">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl md:text-5xl font-bold mb-3">ផលិតផលទាំងអស់</h1>
          <p className="text-slate-300 max-w-2xl mx-auto text-sm md:text-base">
            ស្វែងរក និងជ្រើសរើសទំនិញជាច្រើនមុខតាមតម្រូវការរបស់អ្នក
          </p>
        </div>
      </section>

      {/* Catalog */}
      <section className="py-10 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-6">
            <div className="flex items-center space-x-2">
              <Filter className="w-5 h-5 text-brand-600" />
              <h2 className="text-2xl font-bold text-slate-900">តម្រងផលិតផល</h2>
            </div>

            <div className="flex items-center gap-2 overflow-x-auto pb-2 lg:pb-0">
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setCategory(cat.id)}
                  className={`px-4 py-2 text-sm font-medium rounded-xl whitespace-nowrap transition ${
                    category === cat.id
                      ? 'bg-brand-600 text-white shadow-sm'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>
          </div>

          <div className="flex items-center justify-between mb-6 pb-4 border-b border-slate-100">
            <span className="text-sm text-slate-500 font-medium">
              {loading ? 'កំពុងផ្ទុក...' : `បង្ហាញ ${products.length} ផលិតផល`}
            </span>
            <div className="flex items-center space-x-2">
              <label htmlFor="sortSelect" className="text-sm text-slate-500 hidden sm:inline">
                តម្រៀបតាម:
              </label>
              <select
                id="sortSelect"
                value={sort}
                onChange={(e) => setSort(e.target.value)}
                className="text-sm bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 focus:ring-2 focus:ring-brand-500 outline-none cursor-pointer"
              >
                <option value="featured">ការណែនាំ (Featured)</option>
                <option value="low-high">តម្លៃ: ទាប ទៅ ខ្ពស់</option>
                <option value="high-low">តម្លៃ: ខ្ពស់ ទៅ ទាប</option>
                <option value="rating">ការវាយតម្លៃខ្ពស់</option>
              </select>
            </div>
          </div>

          {loading ? (
            <div className="py-24 text-center text-brand-600">
              <Loader2 className="w-10 h-10 animate-spin mx-auto mb-3" />
              <p className="font-medium text-slate-600">កំពុងទាញយកទិន្នន័យ...</p>
            </div>
          ) : products.length === 0 ? (
            <div className="text-center py-16 bg-white rounded-2xl border border-dashed border-slate-300">
              <div className="w-20 h-20 bg-slate-100 text-slate-400 rounded-full flex items-center justify-center mx-auto mb-4">
                <PackageOpen className="w-10 h-10" />
              </div>
              <h3 className="text-lg font-bold text-slate-700 mb-1">មិនរកឃើញផលិតផលទេ!</h3>
              <p className="text-slate-500 text-sm mb-4">
                សូមព្យាយាមផ្លាស់ប្តូរពាក្យស្វែងរក ឬប្រភេទតម្រៀបឡើងវិញ។
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
