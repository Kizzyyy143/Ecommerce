import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingBag, MapPin, Phone, Mail } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-300 pt-12 pb-6 border-t border-slate-800 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pb-8 border-b border-slate-800">
          
          {/* Brand Info */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="w-10 h-10 rounded-xl bg-brand-600 text-white flex items-center justify-center text-xl font-bold shadow-md">
                <ShoppingBag className="w-5 h-5" />
              </div>
              <span className="text-xl font-bold text-white tracking-wide">KHMER STORE</span>
            </div>
            <p className="text-sm text-slate-400 leading-relaxed">
              ហាងទំនិញអនឡាញឈានមុខគេ ដែលផ្តល់ជូនផលិតផលមានគុណភាពខ្ពស់ និងសេវាកម្មរហ័សទាន់ចិត្ត។
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-bold mb-4">តំណភ្ជាប់រហ័ស</h4>
            <ul className="space-y-2 text-sm text-slate-400">
              <li><Link to="/" className="hover:text-white transition">ទំព័រដើម</Link></li>
              <li><Link to="/products" className="hover:text-white transition">ផលិតផល</Link></li>
              <li><Link to="/discounts" className="hover:text-white transition">ការបញ្ចុះតម្លៃ</Link></li>
              <li><Link to="/about" className="hover:text-white transition">អំពីយើង</Link></li>
              <li><Link to="/contact" className="hover:text-white transition">ទំនាក់ទំនង</Link></li>
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h4 className="text-white font-bold mb-4">សេវាកម្មអតិថិជន</h4>
            <ul className="space-y-2 text-sm text-slate-400">
              <li><span className="cursor-pointer hover:text-white transition">ការដឹកជញ្ជូន</span></li>
              <li><span className="cursor-pointer hover:text-white transition">ការទូទាត់ប្រាក់ KHQR</span></li>
              <li><span className="cursor-pointer hover:text-white transition">គោលការណ៍ប្តូរទំនិញ</span></li>
            </ul>
          </div>

          {/* Contact Details */}
          <div>
            <h4 className="text-white font-bold mb-4">ទំនាក់ទំនង</h4>
            <ul className="space-y-3 text-sm text-slate-400">
              <li className="flex items-center space-x-2">
                <MapPin className="w-4 h-4 text-brand-500 flex-shrink-0" />
                <span>រាជធានីភ្នំពេញ, កម្ពុជា</span>
              </li>
              <li className="flex items-center space-x-2">
                <Phone className="w-4 h-4 text-brand-500 flex-shrink-0" />
                <span>+855 12 345 678</span>
              </li>
              <li className="flex items-center space-x-2">
                <Mail className="w-4 h-4 text-brand-500 flex-shrink-0" />
                <span>info@khmerstore.local</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-6 text-center text-xs text-slate-500">
          &copy; {new Date().getFullYear()} KHMER STORE. រក្សាសិទ្ធិគ្រប់យ៉ាង។
        </div>
      </div>
    </footer>
  );
}
