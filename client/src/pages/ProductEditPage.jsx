import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import API from '../api';
import { AiOutlineArrowLeft } from 'react-icons/ai';

const ProductEditPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [name, setName] = useState('');
    const [price, setPrice] = useState(0);
    const [image, setImage] = useState('');
    const [brand, setBrand] = useState('');
    const [category, setCategory] = useState('');
    const [countInStock, setCountInStock] = useState(0);
    const [description, setDescription] = useState('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const { data } = await API.get(`/products/${id}`);
                setName(data.name);
                setPrice(data.price);
                setImage(data.image);
                setBrand(data.brand);
                setCategory(data.category);
                setCountInStock(data.countInStock);
                setDescription(data.description);
                setLoading(false);
            } catch (err) {
                setError(err.response?.data?.message || err.message);
                setLoading(false);
            }
        };
        fetchProduct();
    }, [id]);

    const submitHandler = async (e) => {
        e.preventDefault();
        try {
            await API.put(`/products/${id}`, {
                name, price, image, brand, category, countInStock, description
            });
            navigate('/admin/productlist');
        } catch (err) {
            alert(err.response?.data?.message || err.message);
        }
    };

    if (loading) return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
        </div>
    );

    return (
        <div className="min-h-screen bg-gray-50 py-12 px-4 text-gray-900">
            <div className="max-w-4xl mx-auto">
                <Link to="/admin/productlist" className="inline-flex items-center text-gray-500 hover:text-blue-600 mb-8 transition-colors font-bold group">
                    <AiOutlineArrowLeft className="mr-2 group-hover:-translate-x-1 transition-transform" /> Back to Dashboard
                </Link>

                <div className="bg-white p-12 rounded-[3rem] border border-gray-100 shadow-xl shadow-gray-200/50">
                    <div className="text-center mb-12">
                        <span className="text-[10px] font-black text-gray-400 uppercase tracking-[0.4em] block mb-3">Product Editor</span>
                        <h1 className="text-4xl font-black text-gray-900 uppercase tracking-tighter">Modify Item</h1>
                    </div>
                    {error && <div className="bg-red-50 text-red-600 p-4 rounded-xl border border-red-100 mb-8 font-black uppercase text-xs tracking-widest text-center">{error}</div>}

                    <form onSubmit={submitHandler} className="space-y-6">
                        <div>
                            <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2 ml-1">Product Name</label>
                            <input
                                type="text"
                                className="w-full p-4 bg-gray-50 rounded-2xl text-gray-900 border border-gray-200 focus:border-blue-500 focus:bg-white outline-none transition-all font-bold text-sm"
                                placeholder="Sneakers v2.0"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2 ml-1">Price (INR)</label>
                                <input
                                    type="number"
                                    className="w-full p-4 bg-gray-50 rounded-2xl text-gray-900 border border-gray-200 focus:border-blue-500 focus:bg-white outline-none transition-all font-bold text-sm"
                                    value={price}
                                    onChange={(e) => setPrice(e.target.value)}
                                />
                            </div>
                            <div>
                                <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2 ml-1">Stock Quantity</label>
                                <input
                                    type="number"
                                    className="w-full p-4 bg-gray-50 rounded-2xl text-gray-900 border border-gray-200 focus:border-blue-500 focus:bg-white outline-none transition-all font-bold text-sm"
                                    value={countInStock}
                                    onChange={(e) => setCountInStock(e.target.value)}
                                />
                            </div>
                        </div>
                        <div>
                            <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2 ml-1">Image Resource Path</label>
                            <input
                                type="text"
                                className="w-full p-4 bg-gray-50 rounded-2xl text-gray-900 border border-gray-200 focus:border-blue-500 focus:bg-white outline-none transition-all font-bold text-sm"
                                value={image}
                                onChange={(e) => setImage(e.target.value)}
                            />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2 ml-1">Brand Name</label>
                                <input
                                    type="text"
                                    className="w-full p-4 bg-gray-50 rounded-2xl text-gray-900 border border-gray-200 focus:border-blue-500 focus:bg-white outline-none transition-all font-bold text-sm"
                                    value={brand}
                                    onChange={(e) => setBrand(e.target.value)}
                                />
                            </div>
                            <div>
                                <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2 ml-1">Catalogue Category</label>
                                <input
                                    type="text"
                                    className="w-full p-4 bg-gray-50 rounded-2xl text-gray-900 border border-gray-200 focus:border-blue-500 focus:bg-white outline-none transition-all font-bold text-sm"
                                    value={category}
                                    onChange={(e) => setCategory(e.target.value)}
                                />
                            </div>
                        </div>
                        <div>
                            <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2 ml-1">Detailed Description</label>
                            <textarea
                                rows="5"
                                className="w-full p-4 bg-gray-50 rounded-2xl text-gray-900 border border-gray-200 focus:border-blue-500 focus:bg-white outline-none transition-all font-bold text-sm"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                            />
                        </div>
                        <button
                            type="submit"
                            className="w-full py-5 bg-gray-900 hover:bg-blue-600 text-white font-black rounded-2xl transition-all shadow-xl shadow-gray-900/10 uppercase tracking-widest text-sm active:scale-95 mt-4"
                        >
                            Publish Changes
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default ProductEditPage;
