import React, { useState } from 'react';
import { MapPin, Phone, Mail, Clock, Send, CheckCircle2, AlertCircle, Loader2 } from 'lucide-react';
import { submitContactMessage } from '../api/client';

export default function ContactPage() {
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [submitting, setSubmitting] = useState(false);
  const [status, setStatus] = useState({ type: null, text: '' });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      setStatus({ type: 'error', text: 'សូមបំពេញព័ត៌មានដែលចាំបាច់ទាំងអស់។' });
      return;
    }

    setSubmitting(true);
    setStatus({ type: null, text: '' });

    try {
      await submitContactMessage(formData);
      setStatus({
        type: 'success',
        text: 'សាររបស់អ្នកត្រូវបានផ្ញើជោគជ័យ! យើងនឹងឆ្លើយតបឆាប់ៗនេះ។',
      });
      setFormData({ name: '', email: '', subject: '', message: '' });
    } catch (err) {
      setStatus({ type: 'error', text: err.message || 'បរាជ័យក្នុងការផ្ញើសារ។' });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div>
      {/* Header Banner */}
      <section className="bg-gradient-to-r from-slate-900 via-brand-900 to-slate-800 text-white py-14 px-4 text-center">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl md:text-5xl font-bold mb-3">ទំនាក់ទំនងយើង</h1>
          <p className="text-slate-300 max-w-2xl mx-auto text-sm md:text-base leading-relaxed">
            មានសំណួរ ឬចម្ងល់ផ្សេងៗ? សូមទាក់ទងមកកាន់យើងខ្ញុំគ្រប់ពេលវេលា
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            {/* Contact Info Cards */}
            <div className="space-y-4">
              <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200 shadow-sm flex items-start space-x-4">
                <div className="w-10 h-10 rounded-xl bg-brand-100 text-brand-600 flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-800 text-sm mb-1">អាសយដ្ឋាន</h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    រាជធានីភ្នំពេញ, ព្រះរាជាណាចក្រកម្ពុជា
                  </p>
                </div>
              </div>

              <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200 shadow-sm flex items-start space-x-4">
                <div className="w-10 h-10 rounded-xl bg-brand-100 text-brand-600 flex items-center justify-center flex-shrink-0">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-800 text-sm mb-1">លេខទូរស័ព្ទ</h3>
                  <p className="text-xs text-slate-600">+855 12 345 678</p>
                  <p className="text-xs text-slate-600">+855 96 412 4754</p>
                </div>
              </div>

              <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200 shadow-sm flex items-start space-x-4">
                <div className="w-10 h-10 rounded-xl bg-brand-100 text-brand-600 flex items-center justify-center flex-shrink-0">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-800 text-sm mb-1">អ៊ីមែល</h3>
                  <p className="text-xs text-slate-600">info@khmerstore.local</p>
                  <p className="text-xs text-slate-600">support@khmerstore.local</p>
                </div>
              </div>

              <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200 shadow-sm flex items-start space-x-4">
                <div className="w-10 h-10 rounded-xl bg-brand-100 text-brand-600 flex items-center justify-center flex-shrink-0">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-800 text-sm mb-1">ម៉ោងធ្វើការ</h3>
                  <p className="text-xs text-slate-600">ចន្ទ - អាទិត្យ: 8:00 ព្រឹក - 9:00 យប់</p>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-2 bg-slate-50 p-8 rounded-2xl border border-slate-200 shadow-sm">
              <h2 className="text-xl font-bold text-slate-900 mb-2">ផ្ញើសារមកកាន់យើង</h2>
              <p className="text-xs text-slate-500 mb-6">
                បំពេញទម្រង់ខាងក្រោម យើងនឹងឆ្លើយតបទៅកាន់អ្នកវិញឱ្យបានលឿនបំផុត។
              </p>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      ឈ្មោះរបស់អ្នក *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="ឧ. សុខ ចាន់ថា"
                      className="w-full px-3.5 py-2.5 bg-white text-sm border border-slate-200 rounded-xl focus:ring-2 focus:ring-brand-500 outline-none transition"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      អ៊ីមែល *
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="ឧ. sok@example.com"
                      className="w-full px-3.5 py-2.5 bg-white text-sm border border-slate-200 rounded-xl focus:ring-2 focus:ring-brand-500 outline-none transition"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    ប្រធានបទ
                  </label>
                  <input
                    type="text"
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    placeholder="ឧ. ការសាកសួរអំពីការដឹកជញ្ជូន"
                    className="w-full px-3.5 py-2.5 bg-white text-sm border border-slate-200 rounded-xl focus:ring-2 focus:ring-brand-500 outline-none transition"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    សាររបស់អ្នក *
                  </label>
                  <textarea
                    required
                    rows={4}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="សរសេរសារ ឬចម្ងល់របស់អ្នកនៅទីនេះ..."
                    className="w-full px-3.5 py-2.5 bg-white text-sm border border-slate-200 rounded-xl focus:ring-2 focus:ring-brand-500 outline-none transition"
                  />
                </div>

                {status.text && (
                  <div
                    className={`flex items-center space-x-2 p-3 rounded-xl text-xs font-medium ${
                      status.type === 'success'
                        ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                        : 'bg-red-50 text-red-700 border border-red-200'
                    }`}
                  >
                    {status.type === 'success' ? (
                      <CheckCircle2 className="w-4 h-4 flex-shrink-0 text-emerald-600" />
                    ) : (
                      <AlertCircle className="w-4 h-4 flex-shrink-0 text-red-600" />
                    )}
                    <span>{status.text}</span>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full sm:w-auto px-6 py-3 bg-brand-600 hover:bg-brand-700 disabled:opacity-50 text-white font-bold rounded-xl text-sm transition flex items-center justify-center space-x-2 shadow-md hover:shadow-lg"
                >
                  {submitting ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>កំពុងផ្ញើ...</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      <span>ផ្ញើសារ</span>
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
