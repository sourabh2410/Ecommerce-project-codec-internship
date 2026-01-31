import React from 'react';
import { Link } from 'react-router-dom';
import { AiOutlineTwitter, AiOutlineGithub, AiOutlineInstagram } from 'react-icons/ai';

const Footer = () => {
    return (
        <footer className="bg-white border-t border-gray-100 pt-20 pb-12 overflow-hidden relative">
            <div className="max-w-[1500px] mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-16 text-gray-500 relative z-10">
                <div className="space-y-6">
                    <h3 className="text-3xl font-black bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent tracking-tighter">E-SHOP</h3>
                    <p className="text-sm leading-relaxed">
                        Leading the future of technology shopping with high-end premium gadgets and AI-powered recommendations.
                    </p>
                    <div className="flex space-x-5">
                        <div className="p-3 bg-gray-50 rounded-xl hover:bg-blue-50 hover:text-blue-600 cursor-pointer transition-all border border-gray-100"><AiOutlineTwitter size={20} /></div>
                        <div className="p-3 bg-gray-50 rounded-xl hover:bg-gray-100 hover:text-gray-900 cursor-pointer transition-all border border-gray-100"><AiOutlineGithub size={20} /></div>
                        <div className="p-3 bg-gray-50 rounded-xl hover:bg-pink-50 hover:text-pink-600 cursor-pointer transition-all border border-gray-100"><AiOutlineInstagram size={20} /></div>
                    </div>
                </div>

                <div>
                    <h4 className="text-gray-900 font-extrabold mb-8 uppercase tracking-widest text-xs">Quick Links</h4>
                    <ul className="space-y-4 text-sm font-bold">
                        <li><Link to="/" className="hover:text-blue-600 transition-colors">Home</Link></li>
                        <li><Link to="/about" className="hover:text-blue-600 transition-colors">About Us</Link></li>
                        <li><Link to="/cart" className="hover:text-blue-600 transition-colors">Shopping Cart</Link></li>
                        <li><Link to="/login" className="hover:text-blue-600 transition-colors">Account Login</Link></li>
                        <li><Link to="/register" className="hover:text-blue-600 transition-colors">Create Account</Link></li>
                    </ul>
                </div>

                <div>
                    <h4 className="text-gray-900 font-extrabold mb-8 uppercase tracking-widest text-xs">Customer Care</h4>
                    <ul className="space-y-4 text-sm font-bold">
                        <li className="hover:text-blue-600 cursor-pointer transition-colors">Shipping Policy</li>
                        <li className="hover:text-blue-600 cursor-pointer transition-colors">Return & Refunds</li>
                        <li className="hover:text-blue-600 cursor-pointer transition-colors">Terms of Service</li>
                        <li className="hover:text-blue-600 cursor-pointer transition-colors">Privacy Policy</li>
                    </ul>
                </div>

                <div>
                    <h4 className="text-gray-900 font-extrabold mb-8 uppercase tracking-widest text-xs">Stay Updated</h4>
                    <p className="text-sm mb-6 font-medium">Subscribe to our newsletter for the latest tech drops.</p>
                    <div className="flex relative">
                        <input
                            type="email"
                            placeholder="Email address"
                            className="w-full p-4 bg-gray-50 rounded-2xl border border-gray-100 outline-none focus:border-blue-500 text-gray-900 text-sm font-bold placeholder:text-gray-400"
                        />
                        <button
                            onClick={() => alert('Thanks for Joining! You will receive our latest tech updates soon.')}
                            className="absolute right-2 top-2 bottom-2 px-6 bg-gray-900 hover:bg-blue-600 text-white rounded-xl transition-all font-black text-xs uppercase tracking-widest"
                        >
                            Join
                        </button>
                    </div>
                </div>
            </div>

            <div className="max-w-[1500px] mx-auto px-6 mt-20 pt-10 border-t border-gray-50 text-center text-[10px] text-gray-400 font-black uppercase tracking-[0.4em]">
                &copy; 2026 E-SHOP PLATFORM. ALL RIGHTS RESERVED.
            </div>
        </footer>
    );
};

export default Footer;
