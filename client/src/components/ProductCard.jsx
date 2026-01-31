import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AiFillStar, AiOutlineHeart, AiFillHeart } from 'react-icons/ai';
import { useCart } from '../context/CartContext';
import { optimizeImage } from '../utils';
import API from '../api';

import { useToast } from '../context/ToastContext';

const ProductCard = ({ product }) => {
    const { addToCart } = useCart();
    const { addToast } = useToast();
    const navigate = useNavigate();
    const [isWishlisted, setIsWishlisted] = useState(false);
    const userInfo = JSON.parse(localStorage.getItem('userInfo'));

    useEffect(() => {
        if (userInfo?.wishlist?.includes(product._id)) {
            setIsWishlisted(true);
        }
    }, [userInfo, product._id]);

    const addToCartHandler = (e) => {
        e.preventDefault();
        addToCart(product, 1);
        addToast("Added to Cart", "success");
        navigate('/cart');
    };

    const toggleWishlist = async (e) => {
        e.preventDefault();
        if (!userInfo) {
            navigate('/login');
            return;
        }

        try {
            const { data } = await API.post(`/users/wishlist/${product._id}`);
            const updatedUserInfo = { ...userInfo, wishlist: data.wishlist };
            localStorage.setItem('userInfo', JSON.stringify(updatedUserInfo));
            setIsWishlisted(!isWishlisted);

            if (!isWishlisted) {
                addToast("Added to your Favorites", "success");
            } else {
                addToast("Removed from Favorites", "info");
            }
        } catch (err) {
            console.error(err);
            if (err.response?.status === 401) {
                localStorage.removeItem('userInfo');
                navigate('/login');
                addToast("Session expired. Please login.", "error");
            }
        }
    };

    return (
        <div className="bg-white rounded-3xl overflow-hidden shadow-sm border border-gray-100 group hover:border-blue-500/50 hover:shadow-xl transition-all flex flex-col h-full active:scale-[0.98] relative">
            <div className="relative aspect-square overflow-hidden bg-gray-50">
                <Link to={`/product/${product._id}`} className="block w-full h-full">
                    <img
                        src={optimizeImage(product.image, 300)}
                        alt={product.name}
                        loading="lazy"
                        className="w-full h-full object-contain p-4 group-hover:scale-105 transition-transform duration-500 ease-out"
                    />
                </Link>

                <button
                    onClick={(e) => {
                        e.stopPropagation();
                        toggleWishlist(e);
                    }}
                    className="absolute top-4 right-4 z-20 p-2 bg-white/80 backdrop-blur-md rounded-xl shadow-sm border border-gray-200 hover:bg-white transition-all duration-300 group/heart hover:scale-110 active:scale-90"
                >
                    {isWishlisted ? (
                        <AiFillHeart size={20} className="text-red-500 drop-shadow-sm transition-all duration-300 scale-110 ease-out" />
                    ) : (
                        <AiOutlineHeart size={20} className="text-gray-400 group-hover/heart:text-red-500 transition-colors duration-300" />
                    )}
                </button>

                <div className="absolute top-4 left-4 flex flex-col gap-2 pointer-events-none">
                    <span className="bg-blue-600 text-white text-[10px] font-black px-3 py-1.5 rounded-lg shadow-lg shadow-blue-600/20 uppercase tracking-widest">
                        E-Shop Choice
                    </span>
                    {product.countInStock > 0 && product.countInStock < 5 && (
                        <span className="bg-orange-500 text-white text-[10px] font-black px-3 py-1.5 rounded-lg shadow-lg shadow-orange-500/20 uppercase tracking-widest">
                            Limited Stock
                        </span>
                    )}
                </div>
            </div>

            <div className="p-6 flex flex-col flex-grow">
                <div className="flex justify-between items-start mb-3">
                    <p className="text-blue-600 text-[10px] font-black uppercase tracking-[0.2em]">{product.brand}</p>
                    <div className="flex items-center bg-gray-50 px-2 py-1 rounded-lg border border-gray-100">
                        <AiFillStar size={14} className="text-yellow-400 mr-1" />
                        <span className="text-xs font-black text-gray-700">{product.rating}</span>
                    </div>
                </div>

                <Link to={`/product/${product._id}`} className="block mb-4">
                    <h2 className="text-lg font-bold text-gray-900 leading-tight group-hover:text-blue-600 transition-colors line-clamp-2 tracking-tight">
                        {product.name}
                    </h2>
                </Link>

                {/* Specs for Mobiles */}
                {(product.ram || product.processor) && (
                    <div className="flex gap-2 mb-4">
                        {product.ram > 0 && (
                            <span className="bg-gray-100 text-gray-600 text-[10px] font-black px-2 py-1 rounded-md uppercase tracking-wide">
                                {product.ram}GB RAM
                            </span>
                        )}
                        {product.processor && (
                            <span className="bg-blue-50 text-blue-600 text-[10px] font-black px-2 py-1 rounded-md uppercase tracking-wide truncate max-w-[100px]">
                                {product.processor}
                            </span>
                        )}
                    </div>
                )}

                <div className="mt-auto">
                    <div className="flex items-end justify-between">
                        <div className="flex flex-col">
                            <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Price</span>
                            <span className="text-2xl font-black text-gray-900 tracking-tighter">₹{product.price}</span>
                        </div>
                        <div className="text-right">
                            <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest block mb-1">Delivery</span>
                            <span className="text-[10px] font-black text-green-600 uppercase">Free & Fast</span>
                        </div>
                    </div>
                </div>
            </div>
        </div >

    );
};


export default ProductCard;
