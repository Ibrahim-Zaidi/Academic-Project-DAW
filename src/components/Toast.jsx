import React, { useEffect } from 'react';
import { useToast } from '../context/ToastContext';
import { X } from 'lucide-react';

const Toast = () => {
  const { toast, hideToast } = useToast();

  useEffect(() => {
    if (toast.visible) {
      const timer = setTimeout(() => {
        hideToast();
      }, 3000);
      
      return () => clearTimeout(timer);
    }
  }, [toast.visible, hideToast]);

  if (!toast.visible) return null;

  const bgColor = toast.type === 'error' ? 'bg-red-500' : 'bg-green-500';

  return (
    <div 
      className={`fixed bottom-4 right-4 ${bgColor} text-white px-4 py-3 rounded-md shadow-lg flex items-center z-50`}
      style={{ animationName: 'fadeIn', animationDuration: '0.3s' }}
    >
      <span>{toast.message}</span>
      <button 
        onClick={hideToast} 
        className="ml-4 hover:bg-white hover:bg-opacity-20 rounded-full p-1 transition-colors"
      >
        <X size={18} />
      </button>
    </div>
  );
};

export default Toast;