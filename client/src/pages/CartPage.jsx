import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { AiOutlineDelete, AiOutlineArrowLeft, AiFillSafetyCertificate } from 'react-icons/ai';
import { optimizeImage } from '../utils';

const CartPage = () => {
    const { cartItems, addToCart, removeFromCart } = useCart();
    const navigate = useNavigate();

    // Calculate Price Details
    const totalMRP = cartItems.reduce((acc, item) => acc + (item.price * item.qty * 1.2), 0); // Assuming 20% markup for MRP calculation
    const totalDiscount = totalMRP - cartItems.reduce((acc, item) => acc + (item.price * item.qty), 0);
    const totalPrice = cartItems.reduce((acc, item) => acc + (item.price * item.qty), 0);
    const totalItems = cartItems.reduce((acc, item) => acc + item.qty, 0);

    const checkoutHandler = () => {
        const userInfo = localStorage.getItem('userInfo');
        if (userInfo) {
            navigate('/shipping');
        } else {
            navigate('/login?redirect=/shipping');
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 py-8 px-4 font-sans">
            <div className="max-w-[1200px] mx-auto">
                <div className="flex flex-col lg:flex-row gap-6">
                    {/* Left Side: Cart Items */}
                    <div className="lg:w-[66%] space-y-4">
                        {/* Header */}
                        <div className="bg-white p-4 rounded-sm shadow-sm flex justify-between items-center">
                            <h2 className="text-lg font-medium text-gray-800">From Saved Addresses (Enter Delivery Pincode)</h2>
                            <button className="text-blue-600 font-medium text-sm hover:underline">Enter Delivery Pincode</button>
                        </div>

                        {cartItems.length === 0 ? (
                            <div className="bg-white p-12 text-center rounded-sm shadow-sm">
                                <img src="https://rukminim2.flixcart.com/www/800/800/promos/16/05/2019/d438a32e-765a-4d8b-b4a6-520b560971e8.png?q=90" alt="Empty Cart" className="w-48 mx-auto mb-6" />
                                <h3 className="text-lg font-medium text-gray-800 mb-2">Your cart is empty!</h3>
                                <p className="text-sm text-gray-500 mb-6">Explore our wide selection and find something you like</p>
                                <Link to="/" className="inline-block bg-blue-600 text-white px-10 py-3 font-medium text-sm rounded-sm shadow-md hover:bg-blue-700 transition-colors">
                                    Shop Now
                                </Link>
                            </div>
                        ) : (
                            cartItems.map((item) => (
                                <div key={item._id} className="bg-white p-6 rounded-sm shadow-sm border-b border-gray-100 relative">
                                    <div className="flex gap-6">
                                        <div className="flex flex-col items-center gap-4">
                                            <img
                                                src={optimizeImage(item.image, 200)}
                                                alt={item.name}
                                                className="w-28 h-28 object-contain"
                                                loading="lazy"
                                            />
                                            <div className="flex items-center gap-2">
                                                <button
                                                    onClick={() => addToCart(item, Math.max(1, item.qty - 1))}
                                                    className="w-7 h-7 rounded-full border border-gray-300 flex items-center justify-center text-gray-600 disabled:opacity-50"
                                                    disabled={item.qty <= 1}
                                                >
                                                    -
                                                </button>
                                                <div className="w-10 h-7 border border-gray-300 flex items-center justify-center text-sm font-medium">
                                                    {item.qty}
                                                </div>
                                                <button
                                                    onClick={() => addToCart(item, Math.min(item.countInStock, item.qty + 1))}
                                                    className="w-7 h-7 rounded-full border border-gray-300 flex items-center justify-center text-gray-600"
                                                >
                                                    +
                                                </button>
                                            </div>
                                        </div>
                                        <div className="flex-1">
                                            <Link to={`/product/${item._id}`} className="text-base font-medium text-gray-800 hover:text-blue-600 block mb-1">
                                                {item.name}
                                            </Link>
                                            <p className="text-xs text-gray-500 mb-3">Seller: RetailNet</p>
                                            <div className="flex items-baseline gap-3 mb-4">
                                                <span className="text-sm text-gray-500 line-through">₹{Math.round(item.price * 1.2).toLocaleString()}</span>
                                                <span className="text-lg font-bold text-gray-900">₹{item.price.toLocaleString()}</span>
                                                <span className="text-xs font-bold text-green-600">20% Off</span>
                                            </div>
                                            <div className="flex gap-6">
                                                <button className="text-base font-bold text-gray-800 hover:text-blue-600 uppercase">SAVE FOR LATER</button>
                                                <button
                                                    onClick={() => removeFromCart(item._id)}
                                                    className="text-base font-bold text-gray-800 hover:text-blue-600 uppercase"
                                                >
                                                    REMOVE
                                                </button>
                                            </div>
                                        </div>
                                        <div className="text-sm font-medium text-gray-800">
                                            Delivery by {new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toDateString().slice(0, 10)} | <span className="text-green-600">Free</span>
                                        </div>
                                    </div>
                                </div>
                            ))
                        )}

                        {cartItems.length > 0 && (
                            <div className="bg-white p-4 sticky bottom-0 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)] flex justify-end">
                                <button
                                    onClick={checkoutHandler}
                                    className="bg-blue-600 text-white px-16 py-4 font-bold text-base rounded-sm shadow-md uppercase tracking-wider hover:bg-blue-700 transition-colors"
                                >
                                    Place Order
                                </button>
                            </div>
                        )}
                    </div>

                    {/* Right Side: Price Details */}
                    {cartItems.length > 0 && (
                        <div className="lg:w-[34%] h-fit sticky top-24">
                            <div className="bg-white rounded-sm shadow-sm overflow-hidden">
                                <h2 className="text-gray-500 font-bold uppercase text-base p-4 border-b border-gray-200">Price Details</h2>
                                <div className="p-4 space-y-5">
                                    <div className="flex justify-between text-base">
                                        <span className="text-gray-800">Price ({totalItems} items)</span>
                                        <span className="text-gray-800">₹{Math.round(totalMRP).toLocaleString()}</span>
                                    </div>
                                    <div className="flex justify-between text-base">
                                        <span className="text-gray-800">Discount</span>
                                        <span className="text-green-600">− ₹{Math.round(totalDiscount).toLocaleString()}</span>
                                    </div>
                                    <div className="flex justify-between text-base">
                                        <span className="text-gray-800">Delivery Charges</span>
                                        <span className="text-green-600">Free</span>
                                    </div>
                                    <div className="border-t border-dashed border-gray-300 my-4"></div>
                                    <div className="flex justify-between text-lg font-bold">
                                        <span className="text-gray-900">Total Amount</span>
                                        <span className="text-gray-900">₹{totalPrice.toLocaleString()}</span>
                                    </div>
                                    <div className="border-t border-gray-100 my-2"></div>
                                    <p className="text-green-600 font-bold text-sm">You will save ₹{Math.round(totalDiscount).toLocaleString()} on this order</p>
                                </div>
                            </div>
                            <div className="mt-4 flex items-center gap-2 text-gray-500 text-xs font-bold p-4">
                                <AiFillSafetyCertificate className="text-gray-400 text-xl" />
                                Safe and Secure Payments. Easy returns. 100% Authentic products.
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default CartPage;
