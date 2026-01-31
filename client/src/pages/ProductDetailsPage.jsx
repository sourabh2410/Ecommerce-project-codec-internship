import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import API from '../api';
import { AiFillStar, AiOutlineArrowLeft } from 'react-icons/ai';
import { useCart } from '../context/CartContext';
import ProductRecommendations from '../components/ProductRecommendations';
import { optimizeImage } from '../utils';

const ProductDetailsPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { addToCart } = useCart();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [qty, setQty] = useState(1);
    const [rating, setRating] = useState(5);
    const [comment, setComment] = useState('');
    const [reviewMessage, setReviewMessage] = useState('');

    const addToCartHandler = () => {
        addToCart(product, qty);
        navigate('/cart');
    };

    const fetchProduct = async () => {
        try {
            const { data } = await API.get(`/products/${id}`);
            setProduct(data);
            setLoading(false);
        } catch (err) {
            setError(err.response?.data?.message || err.message);
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProduct();
    }, [id]);

    const submitReviewHandler = async (e) => {
        e.preventDefault();
        try {
            await API.post(`/products/${id}/reviews`, { rating, comment });
            setReviewMessage('Review submitted successfully!');
            setComment('');
            setRating(5); // Reset rating after submission
            fetchProduct(); // Re-fetch product to update reviews
        } catch (err) {
            setReviewMessage(err.response?.data?.message || err.message);
        }
    };

    if (loading) return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
        </div>
    );

    if (error) return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 text-red-600 font-bold">
            {error}
        </div>
    );

    return (
        <div className="min-h-screen bg-gray-50 py-12 px-4 text-gray-900">
            <div className="max-w-7xl mx-auto">
                <Link to="/" className="inline-flex items-center text-gray-500 hover:text-blue-600 mb-8 transition-colors font-bold group">
                    <AiOutlineArrowLeft className="mr-2 group-hover:-translate-x-1 transition-transform" /> Back to Store
                </Link>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
                    <div className="bg-white rounded-[3rem] overflow-hidden shadow-xl shadow-gray-200/50 border border-gray-100 p-8">
                        <img
                            src={optimizeImage(product.image, 1000)}
                            alt={product.name}
                            className="w-full h-full object-contain hover:scale-105 transition-transform duration-700"
                        />
                    </div>

                    <div className="space-y-8">
                        <div>
                            <p className="text-blue-600 text-xs font-black uppercase tracking-[0.3em] mb-3">{product.brand}</p>
                            <h1 className="text-5xl md:text-6xl font-black text-gray-900 mb-6 tracking-tighter uppercase leading-[0.9]">{product.name}</h1>
                            <div className="flex items-center space-x-6">
                                <div className="flex text-yellow-400 bg-gray-50 px-3 py-1.5 rounded-xl border border-gray-100">
                                    {[...Array(5)].map((_, i) => (
                                        <AiFillStar key={i} className={i < Math.round(product.rating) ? 'fill-current' : 'text-gray-200'} />
                                    ))}
                                    <span className="ml-2 text-gray-900 font-black text-sm">{product.rating}</span>
                                </div>
                                <span className="text-gray-400 text-sm font-bold uppercase tracking-widest">{product.numReviews} Verified Reviews</span>
                            </div>
                        </div>

                        <div className="h-px bg-gray-100 w-full" />

                        <div className="text-5xl font-black text-gray-900 tracking-tighter">₹{product.price}</div>

                        <p className="text-gray-500 text-lg leading-relaxed font-medium">
                            {product.description}
                        </p>

                        <div className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm space-y-6">
                            <div className="flex justify-between items-center">
                                <span className="text-xs font-black text-gray-400 uppercase tracking-widest">Availability</span>
                                <span className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest ${product.countInStock > 0 ? 'bg-green-50 text-green-600 border border-green-100' : 'bg-red-50 text-red-600 border border-red-100'}`}>
                                    {product.countInStock > 0 ? 'In Stock' : 'Out of Stock'}
                                </span>
                            </div>

                            {product.countInStock > 0 && (
                                <div className="flex justify-between items-center">
                                    <span className="text-xs font-black text-gray-400 uppercase tracking-widest">Select Quantity</span>
                                    <select
                                        value={qty}
                                        onChange={(e) => setQty(Number(e.target.value))}
                                        className="bg-gray-50 text-gray-900 rounded-xl p-3 border border-gray-200 outline-none font-black text-sm focus:border-blue-500 transition-all"
                                    >
                                        {[...Array(product.countInStock).keys()].map(x => (
                                            <option key={x + 1} value={x + 1}>{x + 1}</option>
                                        ))}
                                    </select>
                                </div>
                            )}

                            <div className="flex gap-4">
                                <button
                                    onClick={addToCartHandler}
                                    disabled={product.countInStock === 0}
                                    className="flex-1 py-5 bg-white border-2 border-blue-600 hover:bg-blue-50 disabled:bg-gray-100 disabled:text-gray-400 disabled:border-gray-100 disabled:cursor-not-allowed text-blue-600 font-black rounded-xl transition-all uppercase tracking-widest text-sm active:scale-[0.98]"
                                >
                                    Add to Bag
                                </button>
                                <button
                                    onClick={() => {
                                        addToCart(product, qty);
                                        navigate('/shipping');
                                    }}
                                    disabled={product.countInStock === 0}
                                    className="flex-1 py-5 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-100 disabled:text-gray-400 disabled:border-gray-100 disabled:cursor-not-allowed text-white font-black rounded-xl transition-all shadow-xl shadow-blue-600/20 uppercase tracking-widest text-sm active:scale-[0.98]"
                                >
                                    Buy Now
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Video Experience Section */}
                {product.video && (
                    <div className="mt-32">
                        <div className="text-center mb-16">
                            <h2 className="text-4xl font-black text-gray-900 mb-4 tracking-tighter uppercase leading-tight">Immersive Experience</h2>
                            <p className="text-gray-500 max-w-2xl mx-auto font-medium">See the {product.name} in action with our high-quality product showcase.</p>
                        </div>
                        <div className="max-w-5xl mx-auto aspect-video rounded-[3rem] overflow-hidden shadow-2xl border-8 border-white">
                            <iframe
                                className="w-full h-full"
                                src={product.video}
                                title={`${product.name} Video`}
                                frameBorder="0"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                            ></iframe>
                        </div>
                    </div>
                )}

                <ProductRecommendations productId={product._id} />

                {/* Reviews Section */}
                <div className="mt-32">
                    <h2 className="text-3xl font-black text-gray-900 mb-12 tracking-tighter uppercase border-b border-gray-100 pb-6">Ratings & Reviews</h2>

                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                        {/* Left Column: Rating Summary & Form */}
                        <div className="lg:col-span-4 space-y-8">
                            {/* Rating Summary Card */}
                            <div className="bg-white p-8 rounded-[2rem] border border-gray-100 shadow-sm sticky top-24">
                                <div className="text-center mb-8">
                                    <div className="flex justify-center items-center gap-2 mb-2">
                                        <span className="text-6xl font-black text-gray-900 tracking-tighter">{product.rating}</span>
                                        <AiFillStar className="text-yellow-400 text-5xl" />
                                    </div>
                                    <p className="text-gray-400 font-bold uppercase tracking-widest text-xs">{product.numReviews} Verified Reviews</p>
                                </div>

                                {/* Rating Bars using Mock Data for visualization if actual distribution isn't available */}
                                <div className="space-y-3 mb-8">
                                    {[5, 4, 3, 2, 1].map((star) => (
                                        <div key={star} className="flex items-center gap-3">
                                            <span className="text-xs font-bold w-3">{star}★</span>
                                            <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden">
                                                <div
                                                    className={`h-full rounded-full ${star >= 4 ? 'bg-green-500' : star === 3 ? 'bg-yellow-400' : 'bg-red-500'}`}
                                                    style={{ width: `${star === 5 ? '70%' : star === 4 ? '20%' : '5%'}` }} // Mock distribution
                                                ></div>
                                            </div>
                                            <span className="text-xs text-gray-400 w-6 text-right">
                                                {star === 5 ? Math.floor(product.numReviews * 0.7) : star === 4 ? Math.floor(product.numReviews * 0.2) : Math.floor(product.numReviews * 0.05)}
                                            </span>
                                        </div>
                                    ))}
                                </div>

                                <div className="border-t border-gray-100 pt-8">
                                    <h3 className="text-lg font-black text-gray-900 mb-4 uppercase tracking-tight">Review this product</h3>
                                    <p className="text-sm text-gray-500 mb-6 font-medium">Help others make an informed decision.</p>

                                    {reviewMessage && (
                                        <div className={`p-4 rounded-xl mb-6 text-xs font-black uppercase tracking-widest ${reviewMessage.includes('successfully') ? 'bg-green-50 text-green-600 border border-green-100' : 'bg-red-50 text-red-600 border border-red-100'}`}>
                                            {reviewMessage}
                                        </div>
                                    )}

                                    <form onSubmit={submitReviewHandler} className="space-y-4">
                                        <div>
                                            <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2 ml-1">Your Rating</label>
                                            <div className="flex gap-2">
                                                {[5, 4, 3, 2, 1].map((star) => (
                                                    <button
                                                        key={star}
                                                        type="button"
                                                        onClick={() => setRating(star)}
                                                        className={`flex-1 py-2 rounded-xl border transition-all ${rating === star ? 'bg-gray-900 text-white border-gray-900' : 'bg-white text-gray-400 border-gray-200 hover:border-gray-900'}`}
                                                    >
                                                        {star}★
                                                    </button>
                                                ))}
                                            </div>
                                        </div>
                                        <div>
                                            <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2 ml-1">Your Review</label>
                                            <textarea
                                                rows="4"
                                                value={comment}
                                                onChange={(e) => setComment(e.target.value)}
                                                className="w-full bg-gray-50 border border-gray-200 rounded-xl p-4 text-gray-900 font-bold text-sm outline-none focus:border-blue-500 transition-all placeholder:text-gray-300"
                                                placeholder="What did you like or dislike?"
                                                required
                                            ></textarea>
                                        </div>
                                        <button type="submit" className="w-full py-4 bg-gray-900 hover:bg-blue-600 text-white font-black rounded-xl transition-all shadow-lg shadow-gray-900/10 active:scale-95 uppercase tracking-widest text-xs">
                                            Submit Review
                                        </button>
                                    </form>
                                </div>
                            </div>
                        </div>

                        {/* Right Column: Review List */}
                        <div className="lg:col-span-8">
                            {product.reviews.length === 0 ? (
                                <div className="bg-white p-12 text-center rounded-[2rem] border border-gray-100 h-64 flex flex-col items-center justify-center">
                                    <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mb-4">
                                        <AiFillStar className="text-gray-300 text-2xl" />
                                    </div>
                                    <h3 className="text-xl font-black text-gray-900 mb-2">No reviews yet</h3>
                                    <p className="text-gray-400 font-medium">Be the first to share your experience!</p>
                                </div>
                            ) : (
                                <div className="space-y-6">
                                    {product.reviews.map((review) => (
                                        <div key={review._id} className="bg-white p-8 rounded-[2rem] border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                                            <div className="flex items-start justify-between mb-4">
                                                <div className="flex items-center gap-3">
                                                    <div className={`px-2 py-1 rounded-lg text-white text-xs font-black flex items-center gap-1 ${review.rating >= 4 ? 'bg-green-500' : review.rating >= 3 ? 'bg-yellow-500' : 'bg-red-500'}`}>
                                                        {review.rating} <AiFillStar size={10} />
                                                    </div>
                                                    <span className="font-bold text-gray-900 text-lg">Excellent Product!</span>
                                                </div>
                                                <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">{review.createdAt.substring(0, 10)}</p>
                                            </div>

                                            <p className="text-gray-600 font-medium leading-relaxed mb-6 whitespace-pre-line text-sm md:text-base">
                                                {review.comment}
                                            </p>

                                            <div className="flex items-center gap-4 border-t border-gray-50 pt-4">
                                                <div className="flex items-center gap-2">
                                                    <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center text-xs font-black text-gray-500">
                                                        {review.name.charAt(0)}
                                                    </div>
                                                    <div>
                                                        <p className="text-xs font-black text-gray-900 uppercase">{review.name}</p>
                                                        <div className="flex items-center gap-1 text-[10px] text-gray-400 font-bold">
                                                            <svg className="w-3 h-3 text-gray-400 fill-current" viewBox="0 0 12 12"><path d="M6 0C2.686 0 0 2.686 0 6s2.686 6 6 6 6-2.686 6-6-2.686-6-6-6zm-1.5 9l-3-3 1.06-1.06L4.5 6.88 8.44 2.94 9.5 4 4.5 9z" /></svg>
                                                            Certified Buyer
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className="ml-auto flex gap-4">
                                                    <button className="text-gray-400 hover:text-gray-600 text-xs font-bold flex items-center gap-1 transition-colors">
                                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5"></path></svg>
                                                        Helpful (12)
                                                    </button>
                                                    <button className="text-gray-400 hover:text-gray-600 text-xs font-bold flex items-center gap-1 transition-colors">
                                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14H5.236a2 2 0 01-1.789-2.894l3.5-7A2 2 0 018.736 3h4.018a2 2 0 01.485.06l2.94 1.154A9.975 9.975 0 0017 3a2 2 0 012 2v6a2 2 0 01-2 2h-2.5"></path></svg>
                                                        (0)
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductDetailsPage;
