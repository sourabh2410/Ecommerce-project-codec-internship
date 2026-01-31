import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../api';
import { AiOutlineEye } from 'react-icons/ai';

const AdminOrderListPage = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const { data } = await API.get('/orders');
                setOrders(data);
                setLoading(false);
            } catch (err) {
                setError(err.response?.data?.message || err.message);
                setLoading(false);
            }
        };
        fetchOrders();
    }, []);

    if (loading) return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
        </div>
    );

    return (
        <div className="min-h-screen bg-gray-50 py-12 px-4 text-gray-900">
            <div className="max-w-7xl mx-auto">
                <div className="mb-12">
                    <span className="text-[10px] font-black text-gray-400 uppercase tracking-[0.4em] block mb-3">Fulfillment</span>
                    <h1 className="text-4xl md:text-5xl font-black text-gray-900 tracking-tighter uppercase leading-none">Order Registry</h1>
                </div>

                {error && <div className="bg-red-50 text-red-600 p-4 rounded-2xl border border-red-100 mb-8 font-bold text-sm uppercase tracking-widest">{error}</div>}

                <div className="bg-white rounded-[2.5rem] border border-gray-100 overflow-hidden shadow-xl shadow-gray-200/40">
                    <table className="w-full text-left">
                        <thead className="bg-gray-50 text-gray-400 text-[10px] font-black uppercase tracking-[0.2em] border-b border-gray-100">
                            <tr>
                                <th className="px-6 py-4">ID</th>
                                <th className="px-6 py-4">USER</th>
                                <th className="px-6 py-4">DATE</th>
                                <th className="px-6 py-4">TOTAL</th>
                                <th className="px-6 py-4">PAID</th>
                                <th className="px-6 py-4">DELIVERED</th>
                                <th className="px-6 py-4 text-right">ACTIONS</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-50">
                            {orders.map((order) => (
                                <tr key={order._id} className="hover:bg-gray-50/50 transition-colors group">
                                    <td className="px-6 py-6 text-gray-300 font-mono text-[10px] uppercase tracking-tighter">{order._id.substring(12)}...</td>
                                    <td className="px-6 py-6 font-black text-gray-900 tracking-tight">{order.user && order.user.name}</td>
                                    <td className="px-6 py-6 text-gray-400 font-bold text-xs uppercase tracking-widest">{order.createdAt.substring(0, 10)}</td>
                                    <td className="px-6 py-6 text-blue-600 font-black tracking-tighter">₹{order.totalPrice}</td>
                                    <td className="px-6 py-6">
                                        {order.isPaid ? (
                                            <span className="px-4 py-1.5 bg-green-50 text-green-600 border border-green-100 rounded-full text-[10px] font-black uppercase tracking-widest">
                                                Paid {order.paidAt.substring(0, 10)}
                                            </span>
                                        ) : (
                                            <span className="px-4 py-1.5 bg-red-50 text-red-600 border border-red-100 rounded-full text-[10px] font-black uppercase tracking-widest">
                                                Unpaid
                                            </span>
                                        )}
                                    </td>
                                    <td className="px-6 py-6">
                                        {order.isDelivered ? (
                                            <span className="px-4 py-1.5 bg-green-50 text-green-600 border border-green-100 rounded-full text-[10px] font-black uppercase tracking-widest">
                                                Arrived {order.deliveredAt.substring(0, 10)}
                                            </span>
                                        ) : (
                                            <span className="px-4 py-1.5 bg-blue-50 text-blue-600 border border-blue-100 rounded-full text-[10px] font-black uppercase tracking-widest">
                                                Pending
                                            </span>
                                        )}
                                    </td>
                                    <td className="px-6 py-6 text-right opacity-0 group-hover:opacity-100 transition-opacity">
                                        <button
                                            onClick={() => navigate(`/order/${order._id}`)}
                                            className="p-3 bg-gray-50 hover:bg-blue-50 text-gray-400 hover:text-blue-600 rounded-xl transition-all border border-gray-100 hover:border-blue-100"
                                        >
                                            <AiOutlineEye size={20} />
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

export default AdminOrderListPage;
