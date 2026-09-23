import React, { useState, useEffect } from 'react';
import { X, CheckCircle2, Loader2, AlertCircle } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { createKhqrPayment, submitOrder } from '../api/client';

export default function PaymentModal() {
  const { isPaymentOpen, closePaymentModal, cart, clearCart } = useCart();

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [qrData, setQrData] = useState(null);

  const [customer, setCustomer] = useState({ name: '', phone: '', address: '' });
  const [submitting, setSubmitting] = useState(false);
  const [orderSuccess, setOrderSuccess] = useState(false);
  const [orderError, setOrderError] = useState(null);

  useEffect(() => {
    if (!isPaymentOpen) {
      setLoading(true);
      setError(null);
      setQrData(null);
      setOrderSuccess(false);
      setOrderError(null);
      return;
    }

    if (!cart.length) {
      setError('សូមបញ្ចូលទំនិញក្នុងកន្ត្រកជាមុនសិន');
      setLoading(false);
      return;
    }

    let isMounted = true;
    const fetchQr = async () => {
      setLoading(true);
      setError(null);
      try {
        const items = cart.map((item) => ({
          productId: Number(item.id),
          quantity: Number(item.quantity || 1),
        }));
        const data = await createKhqrPayment(items);
        if (isMounted) {
          setQrData(data);
          setLoading(false);
        }
      } catch (err) {
        if (isMounted) {
          setError(err.message || 'មិនអាចបង្កើត KHQR បានទេ');
          setLoading(false);
        }
      }
    };

    fetchQr();

    return () => {
      isMounted = false;
    };
  }, [isPaymentOpen, cart]);

  if (!isPaymentOpen) return null;

  const handleOrderSubmit = async (e) => {
    e.preventDefault();
    if (!customer.name.trim() || !customer.phone.trim() || !customer.address.trim()) {
      setOrderError('សូមបំពេញ ឈ្មោះ លេខទូរស័ព្ទ និងអាសយដ្ឋាន។');
      return;
    }

    setSubmitting(true);
    setOrderError(null);

    try {
      const items = cart.map((item) => ({
        productId: Number(item.id),
        quantity: Number(item.quantity || 1),
      }));

      await submitOrder({
        customer,
        items,
      });

      setOrderSuccess(true);
      clearCart();
      setTimeout(() => {
        closePaymentModal();
      }, 3000);
    } catch (err) {
      setOrderError(err.message || 'បរាជ័យក្នុងការកុម្ម៉ង់');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div
      onClick={closePaymentModal}
      className="fixed inset-0 z-[60] flex items-center justify-center p-4 overflow-y-auto bg-slate-900/60 backdrop-blur-sm animate-fade-in"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative bg-white rounded-2xl shadow-2xl max-w-lg w-full p-6 my-8 max-h-[90vh] overflow-y-auto"
      >
        {/* Close Button */}
        <button
          onClick={closePaymentModal}
          className="absolute top-4 right-4 text-slate-400 hover:text-slate-900 transition"
          title="បិទ"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Title & Price */}
        <h3 className="text-xl font-bold text-slate-900 mb-1 text-center">
          ទូទាត់ប្រាក់តាម KHQR
        </h3>

        {loading ? (
          <div className="py-12 text-center text-brand-600">
            <Loader2 className="w-8 h-8 animate-spin mx-auto mb-2" />
            <p className="font-medium">កំពុងបង្កើត KHQR Code...</p>
          </div>
        ) : error ? (
          <div className="py-8 text-center text-red-500 bg-red-50 rounded-xl p-4 my-3">
            <AlertCircle className="w-8 h-8 mx-auto mb-2" />
            <p className="font-bold">{error}</p>
            <p className="text-xs text-slate-500 mt-2">
              សូមប្រាកដថា Backend Server កំពុងដំណើរការលើ port 3000។
            </p>
          </div>
        ) : (
          <>
            <p className="text-brand-600 font-bold text-2xl text-center mb-3">
              ${Number(qrData?.amount || 0).toFixed(2)} {qrData?.currency || 'USD'}
            </p>

            {/* QR Code Container */}
            <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 text-center mb-4">
              {qrData?.qrDataUrl ? (
                <img
                  src={qrData.qrDataUrl}
                  alt="Bakong KHQR Code"
                  className="mx-auto w-56 h-56 object-contain rounded-lg shadow-sm bg-white p-2"
                />
              ) : null}
              <p className="text-xs text-slate-600 mt-2 font-mono font-medium">
                លេខយោង: {qrData?.reference}
              </p>
              <p className="text-xs text-slate-500 mt-1">
                ស្កេនដោយកម្មវិធីធនាគារក្នុងស្រុក (ABA, Bakong, etc.)
              </p>
            </div>
          </>
        )}

        {/* Order Details Form */}
        <form onSubmit={handleOrderSubmit} className="space-y-3 text-left border-t border-slate-200 pt-4">
          <h4 className="font-bold text-sm text-slate-800">ព័ត៌មានដឹកជញ្ជូន និងបញ្ជាទិញ</h4>
          
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              ឈ្មោះអតិថិជន
            </label>
            <input
              type="text"
              required
              value={customer.name}
              onChange={(e) => setCustomer({ ...customer, name: e.target.value })}
              placeholder="ឧ. កែវ វិចិត្រ"
              className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg focus:ring-2 focus:ring-brand-500 outline-none transition"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              លេខទូរស័ព្ទ
            </label>
            <input
              type="tel"
              required
              value={customer.phone}
              onChange={(e) => setCustomer({ ...customer, phone: e.target.value })}
              placeholder="ឧ. 012 345 678"
              className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg focus:ring-2 focus:ring-brand-500 outline-none transition"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              អាសយដ្ឋានដឹកជញ្ជូន
            </label>
            <textarea
              required
              rows={2}
              value={customer.address}
              onChange={(e) => setCustomer({ ...customer, address: e.target.value })}
              placeholder="ឧ. ផ្ទះលេខ 12, ផ្លូវ 200, ភ្នំពេញ"
              className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg focus:ring-2 focus:ring-brand-500 outline-none transition"
            />
          </div>

          {orderError && (
            <p className="text-xs text-red-500 font-medium">{orderError}</p>
          )}

          {orderSuccess && (
            <div className="flex items-center space-x-2 text-emerald-600 bg-emerald-50 p-2.5 rounded-lg text-xs font-bold">
              <CheckCircle2 className="w-4 h-4 flex-shrink-0" />
              <span>ការកុម្ម៉ង់ត្រូវបានទទួលជោគជ័យ! អរគុណសម្រាប់ការគាំទ្រ។</span>
            </div>
          )}

          <button
            type="submit"
            disabled={submitting || orderSuccess}
            className="w-full py-2.5 bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 text-white font-bold rounded-xl text-sm transition flex items-center justify-center space-x-2 shadow-md"
          >
            {submitting ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>កំពុងផ្ញើ...</span>
              </>
            ) : (
              <>
                <CheckCircle2 className="w-4 h-4" />
                <span>បញ្ជាក់ការកុម្ម៉ង់ទិញ</span>
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
