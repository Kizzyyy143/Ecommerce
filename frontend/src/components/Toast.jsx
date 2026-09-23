import React from 'react';
import { CheckCircle, AlertCircle } from 'lucide-react';
import { useToast } from '../context/ToastContext';

export default function Toast() {
  const { toast } = useToast();

  if (!toast.show) return null;

  return (
    <div className="fixed bottom-5 right-5 z-50 bg-slate-900 text-white px-5 py-3 rounded-xl shadow-2xl flex items-center space-x-3 transform transition-all duration-300 animate-bounce">
      {toast.type === 'error' ? (
        <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0" />
      ) : (
        <CheckCircle className="w-5 h-5 text-emerald-400 flex-shrink-0" />
      )}
      <span className="text-sm font-medium">{toast.message}</span>
    </div>
  );
}
