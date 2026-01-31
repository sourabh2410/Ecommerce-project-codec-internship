import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import API from '../api';
import { AiOutlineEdit, AiOutlineDelete, AiOutlinePlus } from 'react-icons/ai';

const AdminProductListPage = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const fetchProducts = async () => {
        try {
            const { data } = await API.get('/products');
            setProducts(data.products);
            setLoading(false);
        } catch (err) {
            setError(err.response?.data?.message || err.message);
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    const deleteHandler = async (id) => {
        if (window.confirm('Are you sure you want to delete this product?')) {
            try {
                await API.delete(`/products/${id}`);
                fetchProducts();
            } catch (err) {
                alert(err.response?.data?.message || err.message);
            }
        }
    };

    const createProductHandler = async () => {
        try {
            const { data } = await API.post('/products');
            navigate(`/admin/product/${data._id}/edit`);
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
            <div className="max-w-7xl mx-auto">
                <div className="flex justify-between items-end mb-12">
                    <div>
                        <span className="text-[10px] font-black text-gray-400 uppercase tracking-[0.4em] block mb-3">Management</span>
                        <h1 className="text-4xl md:text-5xl font-black text-gray-900 tracking-tighter uppercase leading-none">Inventory</h1>
                    </div>
                    <button
                        onClick={createProductHandler}
                        className="flex items-center px-8 py-4 bg-gray-900 hover:bg-blue-600 text-white rounded-2xl font-black transition-all shadow-xl shadow-gray-900/10 uppercase tracking-widest text-xs active:scale-95"
                    >
                        <AiOutlinePlus className="mr-2" size={18} /> New Product
                    </button>
                </div>

                {error && <div className="bg-red-50 text-red-600 p-4 rounded-2xl border border-red-100 mb-8 font-bold text-sm uppercase tracking-widest">{error}</div>}

                <div className="bg-white rounded-[2.5rem] border border-gray-100 overflow-hidden shadow-xl shadow-gray-200/40">
                    <table className="w-full text-left">
                        <thead className="bg-gray-50 text-gray-400 text-[10px] font-black uppercase tracking-[0.2em] border-b border-gray-100">
                            <tr>
                                <th className="px-6 py-4">ID</th>
                                <th className="px-6 py-4">NAME</th>
                                <th className="px-6 py-4">PRICE</th>
                                <th className="px-6 py-4">CATEGORY</th>
                                <th className="px-6 py-4">BRAND</th>
                                <th className="px-6 py-4 text-right">ACTIONS</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-50">
                            {products.map((product) => (
                                <tr key={product._id} className="hover:bg-gray-50/50 transition-colors group">
                                    <td className="px-6 py-6 text-gray-300 font-mono text-[10px] uppercase tracking-tighter">{product._id.substring(12)}...</td>
                                    <td className="px-6 py-6 font-black text-gray-900 tracking-tight">{product.name}</td>
                                    <td className="px-6 py-6 text-blue-600 font-black tracking-tighter">₹{product.price}</td>
                                    <td className="px-6 py-6"><span className="px-3 py-1 bg-gray-50 rounded-full text-[10px] font-black text-gray-500 uppercase tracking-widest border border-gray-100">{product.category}</span></td>
                                    <td className="px-6 py-6 text-gray-400 font-bold text-sm uppercase tracking-tight">{product.brand}</td>
                                    <td className="px-6 py-6 text-right space-x-3 opacity-0 group-hover:opacity-100 transition-opacity">
                                        <Link
                                            to={`/admin/product/${product._id}/edit`}
                                            className="inline-flex p-3 bg-gray-50 hover:bg-blue-50 text-gray-400 hover:text-blue-600 rounded-xl transition-all border border-gray-100 hover:border-blue-100"
                                        >
                                            <AiOutlineEdit size={20} />
                                        </Link>
                                        <button
                                            onClick={() => deleteHandler(product._id)}
                                            className="p-3 bg-gray-50 hover:bg-red-50 text-gray-400 hover:text-red-500 rounded-xl transition-all border border-gray-100 hover:border-red-100"
                                        >
                                            <AiOutlineDelete size={20} />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default AdminProductListPage;
