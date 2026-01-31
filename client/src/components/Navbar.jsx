import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { AiOutlineShoppingCart, AiOutlineUser, AiOutlineHeart, AiOutlineMenu, AiOutlineClose } from 'react-icons/ai';

const Navbar = () => {
    const [user, setUser] = useState(null);
    const [keyword, setKeyword] = useState('');
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const { cartItems } = useCart();
    const navigate = useNavigate();

    useEffect(() => {
        const userInfo = localStorage.getItem('userInfo');
        if (userInfo) {
            setUser(JSON.parse(userInfo));
        }
    }, []);

    const logout = () => {
        localStorage.removeItem('userInfo');
        setUser(null);
        navigate('/login');
        window.location.reload();
    };

    const submitHandler = (e) => {
        e.preventDefault();
        if (keyword.trim()) {
            navigate(`/?search=${keyword}`);
        } else {
            navigate('/');
        }
    };

    return (
        <nav className="bg-white/90 backdrop-blur-xl border-b border-gray-100 sticky top-0 z-[100] transition-all">
            <div className="max-w-[1500px] mx-auto px-6 flex flex-col items-center py-4 space-y-4 md:space-y-0 lg:flex-row lg:justify-between">
                <div className="flex items-center justify-between w-full lg:w-auto">
                    <Link to="/" className="text-3xl font-black bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent tracking-tighter mr-8 shrink-0">
                        E-SHOP
                    </Link>

                    <div className="flex items-center space-x-5 lg:hidden">
                        <Link to="/wishlist" className="relative text-gray-600">
                            <AiOutlineHeart size={24} />
                            {user?.wishlist?.length > 0 && (
                                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-[10px] px-1.5 py-0.5 rounded-full shadow-lg">{user.wishlist.length}</span>
                            )}
                        </Link>
                        <Link to="/cart" className="relative text-gray-600">
                            <AiOutlineShoppingCart size={24} />
                            {cartItems.length > 0 && (
                                <span className="absolute -top-2 -right-2 bg-blue-600 text-white text-[10px] px-1.5 py-0.5 rounded-full shadow-lg">{cartItems.length}</span>
                            )}
                        </Link>
                        <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-gray-900 focus:outline-none">
                            {isMenuOpen ? <AiOutlineClose size={28} /> : <AiOutlineMenu size={28} />}
                        </button>
                    </div>
                </div>

                <form onSubmit={submitHandler} className="flex-1 max-w-2xl w-full flex relative group lg:mx-10 items-center">
                    <div className="absolute left-5 text-gray-400 group-focus-within:text-blue-500 transition-colors pointer-events-none">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
                    </div>
                    <input
                        type="search"
                        placeholder="Search for premium tech..."
                        className="w-full bg-gray-50 border border-gray-100 rounded-2xl py-4 pl-14 pr-5 text-sm font-bold text-gray-700 outline-none focus:bg-white focus:border-blue-500/20 focus:ring-4 focus:ring-blue-600/5 transition-all shadow-sm"
                        value={keyword}
                        onChange={(e) => setKeyword(e.target.value)}
                    />
                </form>

                <div className="hidden lg:flex items-center space-x-10">
                    <Link to="/wishlist" className="relative text-gray-600 hover:text-red-500 transition-all group flex flex-col items-center">
                        <AiOutlineHeart size={26} className="group-hover:scale-110 transition-transform" />
                        <span className="text-[10px] font-black uppercase tracking-widest mt-1 opacity-0 group-hover:opacity-100 transition-opacity">Favorites</span>
                        {user?.wishlist?.length > 0 && (
                            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] font-black px-1.5 py-0.5 rounded-full ring-2 ring-white shadow-lg">
                                {user.wishlist.length}
                            </span>
                        )}
                    </Link>

                    <Link to="/cart" className="relative text-gray-600 hover:text-blue-600 transition-all group flex flex-col items-center">
                        <AiOutlineShoppingCart size={26} className="group-hover:scale-110 transition-transform" />
                        <span className="text-[10px] font-black uppercase tracking-widest mt-1 opacity-0 group-hover:opacity-100 transition-opacity">Bag</span>
                        {cartItems.length > 0 && (
                            <span className="absolute -top-1 -right-1 bg-blue-600 text-white text-[10px] font-black px-1.5 py-0.5 rounded-full ring-2 ring-white shadow-lg">
                                {cartItems.reduce((a, c) => a + c.qty, 0)}
                            </span>
                        )}
                    </Link>

                    {user ? (
                        <div className="flex items-center space-x-6 pl-6 border-l border-gray-100">
                            <Link to="/profile" className="flex items-center gap-3 group">
                                <div className="w-10 h-10 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center border border-blue-100 group-hover:bg-blue-600 group-hover:text-white transition-all shadow-sm">
                                    <AiOutlineUser size={20} />
                                </div>
                                <div className="flex flex-col items-end">
                                    <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest group-hover:text-blue-600 transition-colors">Explorer</span>
                                    <span className="text-sm font-black text-gray-900 group-hover:text-blue-600 transition-colors tracking-tight">{user.name}</span>
                                </div>
                            </Link>
                            {user.isAdmin && (
                                <Link to="/admin/productlist" className="px-3 py-1 bg-blue-600 text-white rounded-lg text-[10px] font-black uppercase tracking-widest shadow-lg shadow-blue-600/20">Admin</Link>
                            )}
                            <button
                                onClick={logout}
                                className="w-10 h-10 flex items-center justify-center bg-gray-50 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-2xl transition-all border border-transparent hover:border-red-100"
                                title="Logout"
                            >
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"></path></svg>
                            </button>
                        </div>
                    ) : (
                        <div className="flex items-center space-x-4 pl-6 border-l border-gray-100">
                            <Link to="/login" className="text-sm font-black text-gray-900 hover:text-blue-600 transition-colors uppercase tracking-widest">Sign In</Link>
                            <Link to="/register" className="px-8 py-3.5 bg-gray-900 hover:bg-blue-600 text-white rounded-2xl transition-all font-black text-sm uppercase tracking-widest shadow-xl shadow-gray-900/10">
                                Join
                            </Link>
                        </div>
                    )}
                </div>

                {/* Mobile Menu Dropdown */}
                {isMenuOpen && (
                    <div className="lg:hidden w-full pt-8 pb-4 animate-in slide-in-from-top duration-300">
                        <div className="flex flex-col space-y-4">
                            <Link to="/about" className="text-lg font-black text-gray-900 hover:text-blue-600 px-4 py-3 bg-gray-50 rounded-2xl">ABOUT US</Link>
                            <Link to="/wishlist" className="text-lg font-black text-gray-900 hover:text-blue-600 px-4 py-3 bg-gray-50 rounded-2xl">WISHLIST</Link>
                            {user ? (
                                <>
                                    <Link to="/profile" className="text-lg font-black text-gray-900 hover:text-blue-600 px-4 py-3 bg-gray-50 rounded-2xl uppercase">{user.name}'s PROFILE</Link>
                                    {user.isAdmin && <Link to="/admin/productlist" className="text-lg font-black text-blue-600 px-4 py-3 bg-blue-50 rounded-2xl">ADMIN PANEL</Link>}
                                    <button onClick={logout} className="text-lg font-black text-red-600 px-4 py-3 bg-red-50 rounded-2xl text-left">LOGOUT</button>
                                </>
                            ) : (
                                <>
                                    <Link to="/login" className="text-lg font-black text-gray-900 hover:text-blue-600 px-4 py-3 bg-gray-50 rounded-2xl">SIGN IN</Link>
                                    <Link to="/register" className="text-lg font-black text-white bg-blue-600 hover:bg-blue-700 px-4 py-3 rounded-2xl text-center">JOIN NOW</Link>
                                </>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </nav>

    );
};

export default Navbar;
