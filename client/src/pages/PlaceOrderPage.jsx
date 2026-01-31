import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import CheckoutSteps from '../components/CheckoutSteps';
import { useCart } from '../context/CartContext';
import API from '../api';
import { optimizeImage } from '../utils';

const PlaceOrderPage = () => {
    const navigate = useNavigate();
    const { cartItems, shippingPrice, taxPrice, totalPrice, itemsPrice, clearCart } = useCart();
    const shippingAddress = JSON.parse(localStorage.getItem('shippingAddress'));
    const paymentMethod = JSON.parse(localStorage.getItem('paymentMethod'));

    useEffect(() => {
        if (!shippingAddress) {
            navigate('/shipping');
        } else if (!paymentMethod) {
            navigate('/payment');
        }
    }, [navigate, shippingAddress, paymentMethod]);

    const placeOrderHandler = async () => {
        try {
            const { data } = await API.post('/orders', {
                orderItems: cartItems.map(item => ({
                    ...item,
                    product: item._id
                })),
                shippingAddress,
                paymentMethod,
                itemsPrice,
                shippingPrice,
                taxPrice,
                totalPrice
            });
            clearCart();
            navigate(`/order/${data._id}`);
        } catch (err) {
            console.error(err);
            alert(err.response?.data?.message || 'Order placement failed');
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 py-12 px-4 text-gray-900">
            <div className="max-w-7xl mx-auto">
                <CheckoutSteps step1 step2 step3 step4 />
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <div className="lg:col-span-2 space-y-8">
                        <div className="bg-white p-10 rounded-[2.5rem] border border-gray-100 shadow-sm">
                            <h2 className="text-xs font-black text-gray-400 uppercase tracking-[0.2em] mb-4">Shipping Information</h2>
                            <p className="text-gray-600 font-medium text-lg leading-relaxed">
                                {shippingAddress.address}, {shippingAddress.city}, <br />
                                {shippingAddress.postalCode}, {shippingAddress.country}
                            </p>
                        </div>

                        <div className="bg-white p-10 rounded-[2.5rem] border border-gray-100 shadow-sm">
                            <h2 className="text-xs font-black text-gray-400 uppercase tracking-[0.2em] mb-4">Payment Selection</h2>
                            <p className="text-gray-900 font-black text-xl tracking-tight">
                                {paymentMethod}
                            </p>
                        </div>

                        <div className="bg-white p-10 rounded-[2.5rem] border border-gray-100 shadow-sm">
                            <h2 className="text-xs font-black text-gray-400 uppercase tracking-[0.2em] mb-8">Items in Cart</h2>
                            {cartItems.length === 0 ? (
                                <p>Your cart is empty</p>
                            ) : (
                                <div className="space-y-6">
                                    {cartItems.map((item, index) => (
                                        <div key={index} className="flex items-center space-x-6 border-b border-gray-50 pb-6 last:border-0 last:pb-0">
                                            <img
                                                src={optimizeImage(item.image, 200)}
                                                alt={item.name}
                                                className="w-20 h-20 object-cover rounded-2xl border border-gray-50 shadow-sm"
                                                loading="lazy"
                                            />
                                            <div className="flex-grow">
                                                <Link to={`/product/${item._id}`} className="text-lg font-black text-gray-900 hover:text-blue-600 transition-all tracking-tight">
                                                    {item.name}
                                                </Link>
                                                <div className="text-gray-400 text-sm font-bold mt-1">
                                                    {item.qty} x ₹{item.price} = <span className="text-blue-600 font-black">₹{(item.qty * item.price).toFixed(2)}</span>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="h-fit space-y-6">
                        <div className="bg-white p-10 rounded-[3rem] border border-gray-100 shadow-xl shadow-gray-200/50">
                            <h2 className="text-2xl font-black text-gray-900 uppercase tracking-tighter mb-8">Final Total</h2>
                            <div className="space-y-6">
                                <div className="flex justify-between text-gray-500 font-medium">
                                    <span>Items Subtotal:</span>
                                    <span className="text-gray-900 font-black">₹{itemsPrice}</span>
                                </div>
                                <div className="flex justify-between text-gray-500 font-medium">
                                    <span>Shipping Fee:</span>
                                    <span className="text-gray-900 font-black">₹{shippingPrice}</span>
                                </div>
                                <div className="flex justify-between text-gray-500 font-medium">
                                    <span>Taxes (Estimated):</span>
                                    <span className="text-gray-900 font-black">₹{taxPrice}</span>
                                </div>
                                <div className="h-px bg-gray-50 w-full" />
                                <div className="flex justify-between items-end">
                                    <span className="text-xs font-black text-gray-400 uppercase tracking-widest">Grand Total</span>
                                    <span className="text-4xl font-black text-blue-600 tracking-tighter">₹{totalPrice}</span>
                                </div>
                            </div>
                            <button
                                type="button"
                                disabled={cartItems.length === 0}
                                onClick={placeOrderHandler}
                                className="w-full mt-10 py-5 bg-gray-900 hover:bg-blue-600 disabled:bg-gray-100 disabled:text-gray-400 disabled:cursor-not-allowed text-white font-black rounded-2xl transition-all shadow-xl shadow-gray-900/10 uppercase tracking-widest text-sm active:scale-95"
                            >
                                Confirm & Order
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PlaceOrderPage;
