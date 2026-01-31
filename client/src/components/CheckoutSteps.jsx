import React from 'react';
import { Link } from 'react-router-dom';

const CheckoutSteps = ({ step1, step2, step3, step4 }) => {
    return (
        <div className="flex justify-center items-center space-x-6 mb-12">
            <div className={`text-[10px] font-black uppercase tracking-widest transition-colors ${step1 ? 'text-blue-600' : 'text-gray-300'}`}>
                {step1 ? <Link to="/login" className="hover:text-blue-700">Sign In</Link> : <span>Sign In</span>}
            </div>
            <div className={`h-1 w-8 rounded-full transition-colors ${step2 ? 'bg-blue-600' : 'bg-gray-100'}`} />
            <div className={`text-[10px] font-black uppercase tracking-widest transition-colors ${step2 ? 'text-blue-600' : 'text-gray-300'}`}>
                {step2 ? <Link to="/shipping" className="hover:text-blue-700">Shipping</Link> : <span>Shipping</span>}
            </div>
            <div className={`h-1 w-8 rounded-full transition-colors ${step3 ? 'bg-blue-600' : 'bg-gray-100'}`} />
            <div className={`text-[10px] font-black uppercase tracking-widest transition-colors ${step3 ? 'text-blue-600' : 'text-gray-300'}`}>
                {step3 ? <Link to="/payment" className="hover:text-blue-700">Payment</Link> : <span>Payment</span>}
            </div>
            <div className={`h-1 w-8 rounded-full transition-colors ${step4 ? 'bg-blue-600' : 'bg-gray-100'}`} />
            <div className={`text-[10px] font-black uppercase tracking-widest transition-colors ${step4 ? 'text-blue-600' : 'text-gray-300'}`}>
                {step4 ? <Link to="/placeorder" className="hover:text-blue-700">Place Order</Link> : <span>Place Order</span>}
            </div>
        </div>
    );
};

export default CheckoutSteps;
