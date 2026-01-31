import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import CheckoutSteps from '../components/CheckoutSteps';

const ShippingPage = () => {
    const [address, setAddress] = useState('');
    const [city, setCity] = useState('');
    const [postalCode, setPostalCode] = useState('');
    const [country, setCountry] = useState('');

    const navigate = useNavigate();

    const submitHandler = (e) => {
        e.preventDefault();
        localStorage.setItem('shippingAddress', JSON.stringify({ address, city, postalCode, country }));
        navigate('/payment');
    };

    return (
        <div className="min-h-screen bg-gray-50 py-12 px-4 text-gray-900">
            <div className="max-w-3xl mx-auto bg-white p-12 rounded-[3rem] border border-gray-100 shadow-xl shadow-gray-200/50">
                <CheckoutSteps step1 step2 />
                <h1 className="text-4xl font-black mb-10 text-center uppercase tracking-tighter">Shipping Destination</h1>
                <form onSubmit={submitHandler} className="space-y-6">
                    <div>
                        <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2 ml-1">Street Address</label>
                        <input
                            type="text"
                            className="w-full p-4 bg-gray-50 rounded-2xl text-gray-900 border border-gray-200 focus:border-blue-500 focus:bg-white outline-none transition-all font-bold text-sm"
                            placeholder="e.g. 123 Luxury Lane"
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                            required
                        />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2 ml-1">City</label>
                            <input
                                type="text"
                                className="w-full p-4 bg-gray-50 rounded-2xl text-gray-900 border border-gray-200 focus:border-blue-500 focus:bg-white outline-none transition-all font-bold text-sm"
                                placeholder="Chandigarh"
                                value={city}
                                onChange={(e) => setCity(e.target.value)}
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2 ml-1">Postal Code</label>
                            <input
                                type="text"
                                className="w-full p-4 bg-gray-50 rounded-2xl text-gray-900 border border-gray-200 focus:border-blue-500 focus:bg-white outline-none transition-all font-bold text-sm"
                                placeholder="160017"
                                value={postalCode}
                                onChange={(e) => setPostalCode(e.target.value)}
                                required
                            />
                        </div>
                    </div>
                    <div>
                        <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2 ml-1">Country</label>
                        <input
                            type="text"
                            className="w-full p-4 bg-gray-50 rounded-2xl text-gray-900 border border-gray-200 focus:border-blue-500 focus:bg-white outline-none transition-all font-bold text-sm"
                            placeholder="India"
                            value={country}
                            onChange={(e) => setCountry(e.target.value)}
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full py-5 bg-gray-900 hover:bg-blue-600 text-white font-black rounded-2xl transition-all shadow-xl shadow-gray-900/10 active:scale-95 uppercase tracking-widest text-sm"
                    >
                        Proceed to Payment
                    </button>
                </form>
            </div>
        </div>
    );
};

export default ShippingPage;
