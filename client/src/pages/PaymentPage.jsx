import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import CheckoutSteps from '../components/CheckoutSteps';

const PaymentPage = () => {
    const [paymentMethod, setPaymentMethod] = useState('Stripe');
    const navigate = useNavigate();

    const submitHandler = (e) => {
        e.preventDefault();
        localStorage.setItem('paymentMethod', JSON.stringify(paymentMethod));
        navigate('/placeorder');
    };

    return (
        <div className="min-h-screen bg-gray-50 py-12 px-4 text-gray-900">
            <div className="max-w-3xl mx-auto bg-white p-12 rounded-[3rem] border border-gray-100 shadow-xl shadow-gray-200/50">
                <CheckoutSteps step1 step2 step3 />
                <h1 className="text-4xl font-black mb-10 text-center uppercase tracking-tighter">Choose Payment</h1>
                <form onSubmit={submitHandler} className="space-y-6">
                    <div className="space-y-4">
                        <div
                            className={`flex items-center p-6 rounded-2xl border transition-all cursor-pointer ${paymentMethod === 'Stripe' ? 'bg-blue-50 border-blue-200' : 'bg-gray-50 border-gray-100 hover:border-gray-200'}`}
                            onClick={() => setPaymentMethod('Stripe')}
                        >
                            <input
                                type="radio"
                                name="paymentMethod"
                                value="Stripe"
                                checked={paymentMethod === 'Stripe'}
                                onChange={(e) => setPaymentMethod(e.target.value)}
                                className="w-5 h-5 text-blue-600 focus:ring-blue-500"
                            />
                            <label className="ml-6 text-lg font-black text-gray-900 cursor-pointer tracking-tight">Credit or Debit Card (Stripe)</label>
                        </div>
                        <div
                            className={`flex items-center p-6 rounded-2xl border transition-all cursor-pointer ${paymentMethod === 'PayPal' ? 'bg-blue-50 border-blue-200' : 'bg-gray-50 border-gray-100 hover:border-gray-200'}`}
                            onClick={() => setPaymentMethod('PayPal')}
                        >
                            <input
                                type="radio"
                                name="paymentMethod"
                                value="PayPal"
                                checked={paymentMethod === 'PayPal'}
                                onChange={(e) => setPaymentMethod(e.target.value)}
                                className="w-5 h-5 text-blue-600 focus:ring-blue-500"
                            />
                            <label className="ml-6 text-lg font-black text-gray-900 cursor-pointer tracking-tight">PayPal Express</label>
                        </div>
                    </div>
                    <button
                        type="submit"
                        className="w-full py-5 bg-gray-900 hover:bg-blue-600 text-white font-black rounded-2xl transition-all shadow-xl shadow-gray-900/10 active:scale-95 uppercase tracking-widest text-sm mt-8"
                    >
                        Review Order
                    </button>
                </form>
            </div>
        </div>
    );
};

export default PaymentPage;
