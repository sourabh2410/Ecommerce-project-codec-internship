import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import API from '../api';
import ProductCard from '../components/ProductCard';
import Hero from '../components/Hero';

const HomePage = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [category, setCategory] = useState('');
    const [brand, setBrand] = useState('');
    const [ram, setRam] = useState('');
    const [minPrice, setMinPrice] = useState('');
    const [maxPrice, setMaxPrice] = useState('');
    const [showBackToTop, setShowBackToTop] = useState(false);

    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const searchQuery = searchParams.get('search') || '';

    const categories = [
        { name: 'Store Home', slug: '', icon: 'https://cdn-icons-png.flaticon.com/512/619/619153.png' },
        { name: 'Electronics', slug: 'Electronics', icon: 'https://cdn-icons-png.flaticon.com/512/3659/3659899.png' },
        { name: 'Mobiles', slug: 'Mobiles', icon: 'https://cdn-icons-png.flaticon.com/512/644/644458.png' }, // Mobile icon unchanged
        { name: 'Fashion', slug: 'Fashion', icon: 'https://cdn-icons-png.flaticon.com/512/3050/3050239.png' },
        { name: 'Home & Furniture', slug: 'Home & Furniture', icon: 'https://cdn-icons-png.flaticon.com/512/2544/2544087.png' },
        { name: 'Appliances', slug: 'Appliances', icon: 'https://cdn-icons-png.flaticon.com/512/3659/3659929.png' },
        { name: 'Accessories', slug: 'Accessories', icon: 'https://cdn-icons-png.flaticon.com/512/3050/3050222.png' },
        { name: 'Books & Sports', slug: 'Books & Sports', icon: 'https://cdn-icons-png.flaticon.com/512/2232/2232688.png' },
        { name: 'Beauty & Personal Care', slug: 'Beauty & Personal Care', icon: 'https://cdn-icons-png.flaticon.com/512/2727/2727218.png' },
    ];

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 500) {
                setShowBackToTop(true);
            } else {
                setShowBackToTop(false);
            }
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                setLoading(true);
                const query = searchQuery || category;
                let url = query ? `/products?keyword=${query}` : '/products?';

                if (brand) url += `&brand=${brand}`;
                if (ram) url += `&ram=${ram}`;
                if (minPrice) url += `&minPrice=${minPrice}`;
                if (maxPrice) url += `&maxPrice=${maxPrice}`;

                const { data } = await API.get(url);
                setProducts(data.products || []);
                setLoading(false);
            } catch (err) {
                setError(err.response?.data?.message || err.message);
                setLoading(false);
            }
        };
        fetchProducts();
    }, [category, searchQuery, brand, ram, minPrice, maxPrice]);

    const handleClearFilters = () => {
        setCategory('');
        setBrand('');
        setRam('');
        setMinPrice('');
        setMaxPrice('');
    };

    if (loading) return (
        <div className="min-h-screen flex items-center justify-center bg-white">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
        </div>
    );

    if (error) return (
        <div className="min-h-screen flex items-center justify-center bg-white text-red-500">
            {error}
        </div>
    );

    return (
        <div className="min-h-screen bg-gray-50 pb-20">
            {/* Visual Category Menu */}
            <div className="bg-white border-b border-gray-100 shadow-sm z-40 overflow-x-auto no-scrollbar">
                <div className="max-w-[1400px] mx-auto px-6 py-4 flex justify-between items-center min-w-max space-x-8">
                    {categories.map((cat) => (
                        <button
                            key={cat.name}
                            onClick={() => setCategory(cat.slug)}
                            className="flex flex-col items-center group transition-all"
                        >
                            <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-2 transition-all group-hover:scale-110 ${category === cat.slug ? 'bg-blue-50' : 'bg-gray-50 group-hover:bg-blue-50/50'}`}>
                                <img src={cat.icon} alt={cat.name} className="w-10 h-10 object-contain" />
                            </div>
                            <span className={`text-xs font-black tracking-tight transition-colors ${category === cat.slug ? 'text-blue-600' : 'text-gray-600 group-hover:text-blue-600'}`}>
                                {cat.name}
                            </span>
                        </button>
                    ))}
                </div>
            </div>

            {!searchQuery && (
                <div className="mt-4">
                    <Hero />

                    {/* Trending Now Section */}
                    <div className="max-w-[1500px] mx-auto px-6 mt-20">
                        <div className="flex justify-between items-end mb-10">
                            <div>
                                <span className="text-[10px] font-black text-blue-600 uppercase tracking-[0.4em] block mb-3">Don't Miss Out</span>
                                <h2 className="text-4xl font-black text-gray-900 tracking-tighter uppercase leading-none">Trending Now</h2>
                            </div>
                            <button className="text-sm font-black text-gray-400 hover:text-blue-600 uppercase tracking-widest transition-colors flex items-center">
                                View All <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 5l7 7-7 7"></path></svg>
                            </button>
                        </div>
                        <div className="flex gap-8 overflow-x-auto no-scrollbar pb-8 -mx-6 px-6">
                            {[
                                { name: 'Apple Ecosystem', img: 'https://images.unsplash.com/photo-1510557880182-3d4d3cba35a5?q=80&w=2070&auto=format&fit=crop', tag: 'Limited' },
                                { name: 'Gaming Rig Setup', img: 'https://images.unsplash.com/photo-1624705002806-5d72df19c3ad?q=80&w=2070&auto=format&fit=crop', tag: 'New' },
                                { name: 'High-Fidelity Audio', img: 'https://images.unsplash.com/photo-1546435770-a3e426bf472b?q=80&w=2065&auto=format&fit=crop', tag: 'Sale' },
                                { name: 'Smart Home Hub', img: 'https://images.unsplash.com/photo-1558002038-1055907df827?q=80&w=2070&auto=format&fit=crop', tag: 'Featured' }
                            ].map((trend) => (
                                <div key={trend.name} className="min-w-[350px] md:min-w-[450px] aspect-[16/9] rounded-[3rem] overflow-hidden relative group cursor-pointer shadow-xl shadow-gray-200/50 border border-gray-100">
                                    <img src={trend.img} alt={trend.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-[1500ms]" />
                                    <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 via-transparent to-transparent"></div>
                                    <div className="absolute top-6 left-6 px-4 py-1.5 bg-white/20 backdrop-blur-md rounded-full text-[10px] font-black text-white uppercase tracking-widest border border-white/20">
                                        {trend.tag}
                                    </div>
                                    <div className="absolute bottom-8 left-8">
                                        <h3 className="text-2xl font-black text-white uppercase tracking-tight mb-2">{trend.name}</h3>
                                        <p className="text-white/70 text-sm font-medium">Explore the curated collection &rarr;</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Shop By Brand */}
                    <div className="max-w-[1500px] mx-auto px-6 mt-32">
                        <div className="bg-gray-900 rounded-[4rem] p-12 lg:p-20 overflow-hidden relative">
                            <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-12">
                                <div className="text-center lg:text-left">
                                    <h2 className="text-4xl lg:text-5xl font-black text-white tracking-tighter uppercase leading-none mb-6">Built by the Best.</h2>
                                    <p className="text-gray-400 text-lg font-medium max-w-md mx-auto lg:mx-0">Direct partnership with global tech giants to bring you official warranty and support.</p>
                                </div>
                                <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-3 xl:grid-cols-4 gap-6 lg:gap-8">
                                    {['Apple', 'Samsung', 'Sony', 'Razer', 'Logitech', 'Bose', 'Nikon', 'DJI'].map((brand) => (
                                        <div key={brand} className="w-24 h-24 lg:w-32 lg:h-32 bg-white/5 backdrop-blur-xl rounded-3xl border border-white/10 flex items-center justify-center group hover:bg-white hover:border-white transition-all cursor-pointer shadow-2xl">
                                            <span className="text-white group-hover:text-gray-900 font-black text-sm uppercase tracking-widest transition-colors">{brand}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-blue-600/20 rounded-full blur-[150px] translate-x-1/2 -translate-y-1/2"></div>
                            <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-indigo-600/20 rounded-full blur-[120px] -translate-x-1/2 translate-y-1/2"></div>
                        </div>
                    </div>
                </div>
            )}

            <div className="max-w-[1500px] mx-auto px-6 mt-12">
                <div id="latest-products" className="scroll-mt-24">
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 space-y-4 md:space-y-0">
                        <div>
                            <h1 className="text-3xl font-black text-gray-900 inline-block border-b-4 border-blue-600 pb-2 tracking-tighter uppercase">
                                {searchQuery ? `Results for "${searchQuery}"` :
                                    category === 'SALE' ? 'Mega Sale Deals' :
                                        category === 'NEW' ? 'Fresh New Arrivals' :
                                            category === 'SHIPPING' ? 'Free Shipping Collection' :
                                                category ? `${category} Collection` : 'Featured Products'}
                            </h1>
                            {searchQuery && <p className="text-gray-500 mt-2 text-sm font-medium">{products.length} products found matching your search.</p>}
                        </div>
                        <div className="flex flex-wrap gap-2">
                            {categories.filter(c => c.slug).map((cat) => (
                                <button
                                    key={cat.slug}
                                    onClick={() => setCategory(cat.slug)}
                                    className={`px-4 py-2 rounded-xl text-xs font-black transition-all border ${category === cat.slug
                                        ? 'bg-blue-600 border-blue-600 text-white shadow-lg shadow-blue-600/20'
                                        : 'bg-white border-gray-200 text-gray-600 hover:border-blue-300'
                                        }`}
                                >
                                    {cat.name.toUpperCase()}
                                </button>
                            ))}
                        </div>
                    </div>
                    <div className="flex flex-col lg:flex-row gap-8">
                        {/* Filter Sidebar (Only for Mobiles) */}
                        {category === 'Mobiles' && (
                            <div className="w-full lg:w-72 flex-shrink-0 bg-white p-8 rounded-3xl border border-gray-100 shadow-sm h-fit sticky top-24">
                                <div className="flex justify-between items-center mb-8">
                                    <h2 className="text-xl font-black text-gray-900 tracking-tight uppercase">Filters</h2>
                                    <button onClick={handleClearFilters} className="text-blue-600 text-xs font-black uppercase hover:underline">Reset</button>
                                </div>

                                {/* Brand Filter */}
                                <div className="mb-8">
                                    <h3 className="text-sm font-black text-gray-900 uppercase tracking-wider mb-4">Brand</h3>
                                    <div className="space-y-3">
                                        {['Apple', 'Samsung', 'Motorola', 'Vivo', 'Poco', 'OnePlus', 'Google', 'Xiaomi', 'Nothing'].map((b) => (
                                            <label key={b} className="flex items-center group cursor-pointer">
                                                <input
                                                    type="radio"
                                                    name="brand"
                                                    checked={brand === b}
                                                    onChange={() => setBrand(b)}
                                                    className="hidden"
                                                />
                                                <div className={`w-5 h-5 rounded-md border-2 mr-3 flex items-center justify-center transition-all ${brand === b ? 'bg-blue-600 border-blue-600' : 'border-gray-200 group-hover:border-blue-400'}`}>
                                                    {brand === b && <div className="w-2 h-2 bg-white rounded-full"></div>}
                                                </div>
                                                <span className={`text-sm font-bold transition-colors ${brand === b ? 'text-blue-600' : 'text-gray-500 group-hover:text-gray-900'}`}>{b}</span>
                                            </label>
                                        ))}
                                    </div>
                                </div>

                                {/* RAM Filter */}
                                <div className="mb-8">
                                    <h3 className="text-sm font-black text-gray-900 uppercase tracking-wider mb-4">RAM</h3>
                                    <div className="grid grid-cols-2 gap-2">
                                        {[4, 6, 8, 12, 16].map((r) => (
                                            <button
                                                key={r}
                                                onClick={() => setRam(ram === r.toString() ? '' : r.toString())}
                                                className={`py-2 px-3 rounded-xl text-xs font-black border transition-all ${ram === r.toString()
                                                    ? 'bg-blue-600 border-blue-600 text-white shadow-md'
                                                    : 'bg-white border-gray-100 text-gray-600 hover:border-blue-300'
                                                    }`}
                                            >
                                                {r}GB
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                {/* Price Filter */}
                                <div>
                                    <h3 className="text-sm font-black text-gray-900 uppercase tracking-wider mb-4">Price Range</h3>
                                    <div className="space-y-4">
                                        <div className="flex items-center space-x-2">
                                            <input
                                                type="number"
                                                placeholder="Min"
                                                value={minPrice}
                                                onChange={(e) => setMinPrice(e.target.value)}
                                                className="w-full bg-gray-50 border-none rounded-xl px-4 py-3 text-sm font-bold text-gray-900 focus:ring-2 focus:ring-blue-500/20"
                                            />
                                            <span className="text-gray-400 font-bold">-</span>
                                            <input
                                                type="number"
                                                placeholder="Max"
                                                value={maxPrice}
                                                onChange={(e) => setMaxPrice(e.target.value)}
                                                className="w-full bg-gray-50 border-none rounded-xl px-4 py-3 text-sm font-bold text-gray-900 focus:ring-2 focus:ring-blue-500/20"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                        {products.length === 0 ? (
                            <div className="flex-grow text-center py-20 bg-white rounded-[3rem] border border-gray-100 shadow-sm flex flex-col items-center justify-center">
                                <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mb-6">
                                    <svg className="w-10 h-10 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
                                </div>
                                <p className="text-gray-400 font-black text-xl mb-2 tracking-tight uppercase">No products found</p>
                                <p className="text-gray-400 font-medium text-sm mb-6">Try adjusting your filters to find what you're looking for.</p>
                                <button onClick={handleClearFilters} className="px-8 py-3 bg-blue-600 text-white rounded-2xl font-black text-sm uppercase tracking-tighter hover:bg-blue-700 transition-all shadow-lg shadow-blue-600/20">Clear All Filters</button>
                            </div>
                        ) : (
                            <div className="flex-grow">
                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                                    {products.map((product) => (
                                        <ProductCard key={product._id} product={product} />
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                {/* Platform Features Section */}
                <div id="platform-features" className="mt-32 pt-20 border-t border-gray-200">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl font-black text-gray-900 mb-4 tracking-tighter uppercase">Professional Shopping Experience</h2>
                        <p className="text-gray-500 max-w-2xl mx-auto font-medium">Built with the latest technology to provide you a seamless and secure shopping journey.</p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 text-center mt-12">
                        {/* Mobile Friendly */}
                        <div className="p-10 bg-white rounded-[2.5rem] border border-gray-100 group hover:border-blue-500/30 transition-all shadow-sm hover:shadow-xl active:scale-[0.98]">
                            <div className="w-20 h-20 bg-blue-50 rounded-3xl flex items-center justify-center text-blue-600 mx-auto mb-8 group-hover:rotate-6 transition-transform">
                                <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z"></path></svg>
                            </div>
                            <h3 className="text-xl font-black text-gray-900 mb-4 uppercase tracking-tight">Mobile-First Design</h3>
                            <p className="text-sm text-gray-500 font-medium tracking-tight">Mobile-friendly responsive design adapts to all devices for seamless browsing on the go.</p>
                        </div>

                        {/* High Quality Media */}
                        <div className="p-10 bg-white rounded-[2.5rem] border border-gray-100 group hover:border-indigo-500/30 transition-all shadow-sm hover:shadow-xl active:scale-[0.98]">
                            <div className="w-20 h-20 bg-indigo-50 rounded-3xl flex items-center justify-center text-indigo-600 mx-auto mb-8 group-hover:rotate-6 transition-transform">
                                <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"></path></svg>
                            </div>
                            <h3 className="text-xl font-black text-gray-900 mb-4 uppercase tracking-tight">Premium Media</h3>
                            <p className="text-sm text-gray-500 font-medium tracking-tight">High-quality product images, videos, and detailed descriptions help you make informed choices.</p>
                        </div>

                        {/* Intuitive Discovery */}
                        <div className="p-10 bg-white rounded-[2.5rem] border border-gray-100 group hover:border-orange-500/30 transition-all shadow-sm hover:shadow-xl active:scale-[0.98]">
                            <div className="w-20 h-20 bg-orange-50 rounded-3xl flex items-center justify-center text-orange-600 mx-auto mb-8 group-hover:rotate-6 transition-transform">
                                <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7V3m0 0L8 5m2-2l2 2"></path></svg>
                            </div>
                            <h3 className="text-xl font-black text-gray-900 mb-4 uppercase tracking-tight">Smart Discovery</h3>
                            <p className="text-sm text-gray-500 font-medium tracking-tight">Intuitive navigation with search bars, filters, and categories speeds up your product discovery.</p>
                        </div>

                        {/* AI Recommendations */}
                        <div className="p-10 bg-white rounded-[2.5rem] border border-gray-100 group hover:border-pink-500/30 transition-all shadow-sm hover:shadow-xl active:scale-[0.98]">
                            <div className="w-20 h-20 bg-pink-50 rounded-3xl flex items-center justify-center text-pink-600 mx-auto mb-8 group-hover:rotate-6 transition-transform">
                                <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
                            </div>
                            <h3 className="text-xl font-black text-gray-900 mb-4 uppercase tracking-tight">AI Curated</h3>
                            <p className="text-sm text-gray-500 font-medium tracking-tight">Smart algorithms designed to understand your preferences and show you exactly what you love.</p>
                        </div>

                        {/* Secure Checkout */}
                        <div className="p-10 bg-white rounded-[2.5rem] border border-gray-100 group hover:border-emerald-500/30 transition-all shadow-sm hover:shadow-xl active:scale-[0.98]">
                            <div className="w-20 h-20 bg-emerald-50 rounded-3xl flex items-center justify-center text-emerald-600 mx-auto mb-8 group-hover:rotate-6 transition-transform">
                                <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path></svg>
                            </div>
                            <h3 className="text-xl font-black text-gray-900 mb-4 uppercase tracking-tight">Fortified Tech</h3>
                            <p className="text-sm text-gray-500 font-medium tracking-tight">Industry-standard encryption and secure payment processing for total peace of mind.</p>
                        </div>

                        {/* Real-time Tracking */}
                        <div className="p-10 bg-white rounded-[2.5rem] border border-gray-100 group hover:border-violet-500/30 transition-all shadow-sm hover:shadow-xl active:scale-[0.98]">
                            <div className="w-20 h-20 bg-violet-50 rounded-3xl flex items-center justify-center text-violet-600 mx-auto mb-8 group-hover:rotate-6 transition-transform">
                                <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
                            </div>
                            <h3 className="text-xl font-black text-gray-900 mb-4 uppercase tracking-tight">Live Precision</h3>
                            <p className="text-sm text-gray-500 font-medium tracking-tight">Know exactly where your order is with our precise, live shipment tracking system.</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Back to Top Button */}
            {showBackToTop && (
                <button
                    onClick={scrollToTop}
                    className="fixed bottom-10 right-10 p-5 bg-gray-900 text-white rounded-2xl shadow-2xl hover:bg-blue-600 transition-all z-[100] animate-slide-up group"
                >
                    <svg className="w-6 h-6 group-hover:-translate-y-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 15l7-7 7 7"></path></svg>
                </button>
            )}
        </div>
    );
};


export default HomePage;
