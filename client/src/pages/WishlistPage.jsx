import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { AiFillStar, AiOutlineDelete } from 'react-icons/ai';
import API from '../api';
import { useCart } from '../context/CartContext';
import { useToast } from '../context/ToastContext';
import { optimizeImage } from '../utils';

const WishlistPage = () => {
    const [wishlist, setWishlist] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const { addToCart } = useCart();
    const { addToast } = useToast();

    const fetchWishlist = async () => {
        try {
            setLoading(true);
            const { data } = await API.get('/users/wishlist');
            setWishlist(data);
            setLoading(false);
        } catch (err) {
            setError(err.response?.data?.message || err.message);
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchWishlist();
    }, []);

    const removeFromWishlist = async (productId) => {
        try {
            const userInfo = JSON.parse(localStorage.getItem('userInfo'));
            const { data } = await API.post(`/users/wishlist/${productId}`);

            // Update local storage
            const updatedUserInfo = { ...userInfo, wishlist: data.wishlist };
            localStorage.setItem('userInfo', JSON.stringify(updatedUserInfo));

            // Update UI
            setWishlist(prev => prev.filter(item => item._id !== productId));
            addToast("Removed from Favorites", "info");
        } catch (err) {
            console.error(err);
            addToast("Failed to remove", "error");
        }
    };

    const handleAddToCart = (product) => {
        addToCart(product, 1);
        addToast("Added to Cart", "success");
    };

    if (loading) return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
        </div>
    );

    return (
        <div className="min-h-screen bg-gray-50 py-8">
            <div className="max-w-[1200px] mx-auto px-4">
                <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                    <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center">
                        <h1 className="text-xl font-bold text-gray-900">My Favorites ({wishlist.length})</h1>
                    </div>

                    {wishlist.length === 0 ? (
                        <div className="p-12 text-center">
                            <img src="https://static-assets-web.flixcart.com/fk-p-linchpin-web/fk-cp-zion/img/mywishlist-empty_39f7a5.png" alt="Empty" className="w-48 mx-auto mb-6 opacity-80" />
                            <h2 className="text-xl font-bold text-gray-900 mb-2">Empty Wishlist</h2>
                            <p className="text-gray-500 mb-6">You have no items in your wishlist. Start adding!</p>
                            <Link to="/" className="inline-block px-8 py-3 bg-blue-600 text-white font-bold rounded-sm shadow-md hover:bg-blue-700 transition-colors uppercase text-sm tracking-wide">
                                Shop Now
                            </Link>
                        </div>
                    ) : (
                        <div className="divide-y divide-gray-100">
                            {wishlist.map((product) => (
                                <div key={product._id} className="p-6 hover:bg-gray-50 transition-colors group flex flex-col sm:flex-row gap-6 relative">
                                    {/* Image Section */}
                                    <div className="w-32 h-32 flex-shrink-0 mx-auto sm:mx-0">
                                        <div className="relative w-full h-full">
                                            <img
                                                src={optimizeImage(product.image, 300)}
                                                alt={product.name}
                                                className="w-full h-full object-contain"
                                            />
                                        </div>
                                    </div>

                                    {/* Content Section */}
                                    <div className="flex-grow flex flex-col">
                                        <Link to={`/product/${product._id}`} className="hover:text-blue-600 transition-colors mb-2">
                                            <h3 className="text-lg font-medium text-gray-900 line-clamp-2">{product.name}</h3>
                                        </Link>

                                        <div className="flex items-center gap-3 mb-3">
                                            <div className="flex items-center bg-green-600 text-white px-1.5 py-0.5 rounded textxs font-bold gap-1 text-[12px]">
                                                {product.rating} <AiFillStar size={10} />
                                            </div>
                                            <span className="text-sm text-gray-500 font-medium">({product.numReviews || 0})</span>
                                        </div>

                                        <div className="flex items-baseline gap-3 mb-4">
                                            <span className="text-2xl font-bold text-gray-900">₹{product.price}</span>
                                            {/* Simulated MRP for visual if not in DB */}
                                            <span className="text-sm text-gray-400 line-through">₹{Math.round(product.price * 1.2)}</span>
                                            <span className="text-sm text-green-600 font-bold">20% off</span>
                                        </div>

                                        <div className="mt-auto pt-4 flex items-center gap-4">
                                            <button
                                                onClick={() => handleAddToCart(product)}
                                                className="flex-1 sm:flex-none px-6 py-2 bg-blue-600 text-white font-bold text-sm rounded-sm hover:bg-blue-700 transition-colors uppercase tracking-wide shadow-sm"
                                            >
                                                Add to Cart
                                            </button>
                                        </div>
                                    </div>

                                    {/* Delete Action */}
                                    <button
                                        onClick={() => removeFromWishlist(product._id)}
                                        className="absolute top-6 right-6 text-gray-400 hover:text-red-500 transition-colors p-2"
                                        title="Remove from Wishlist"
                                    >
                                        <AiOutlineDelete size={20} />
                                    </button>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default WishlistPage;
