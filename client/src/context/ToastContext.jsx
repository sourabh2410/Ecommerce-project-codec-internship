import React, { createContext, useContext, useState, useCallback } from 'react';
import { AiOutlineCheckCircle, AiOutlineInfoCircle, AiOutlineCloseCircle, AiOutlineWarning } from 'react-icons/ai';

const ToastContext = createContext();

export const useToast = () => {
    return useContext(ToastContext);
};

export const ToastProvider = ({ children }) => {
    const [toasts, setToasts] = useState([]);

    const addToast = useCallback((message, type = 'success') => {
        const id = Date.now();
        setToasts((prev) => [...prev, { id, message, type }]);

        // Auto remove after 3 seconds
        setTimeout(() => {
            removeToast(id);
        }, 3000);
    }, []);

    const removeToast = (id) => {
        setToasts((prev) => prev.filter((toast) => toast.id !== id));
    };

    return (
        <ToastContext.Provider value={{ addToast }}>
            {children}
            <div className="fixed bottom-10 left-1/2 transform -translate-x-1/2 z-[200] flex flex-col items-center space-y-3 pointer-events-none">
                {toasts.map((toast) => (
                    <div
                        key={toast.id}
                        className={`flex items-center space-x-3 px-6 py-3 rounded-full shadow-2xl transition-all duration-300 animate-in slide-in-from-bottom-5 fade-in pointer-events-auto ${toast.type === 'success' ? 'bg-gray-900 border border-gray-800' :
                                toast.type === 'error' ? 'bg-red-500 text-white' :
                                    'bg-blue-600 text-white'
                            }`}
                        style={{ minWidth: '300px' }}
                    >
                        <div className="flex-shrink-0">
                            {toast.type === 'success' && <AiOutlineCheckCircle className="text-blue-500 w-5 h-5" />}
                            {toast.type === 'error' && <AiOutlineCloseCircle className="text-white w-5 h-5" />}
                            {toast.type === 'info' && <AiOutlineInfoCircle className="text-white w-5 h-5" />}
                        </div>
                        <p className={`text-sm font-bold tracking-wide ${toast.type === 'success' ? 'text-white' : 'text-white'}`}>
                            {toast.message}
                        </p>
                    </div>
                ))}
            </div>
        </ToastContext.Provider>
    );
};
