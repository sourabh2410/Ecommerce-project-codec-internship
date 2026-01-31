import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../api';

const ProfilePage = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const navigate = useNavigate();
    const userInfo = JSON.parse(localStorage.getItem('userInfo'));

    useEffect(() => {
        if (!userInfo) {
            navigate('/login');
        } else {
            setName(userInfo.name);
            setEmail(userInfo.email);
        }
    }, [navigate, userInfo]);

    const submitHandler = async (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            setMessage('Passwords do not match');
        } else {
            try {
                setLoading(true);
                const { data } = await API.put('/users/profile', { name, email, password });
                localStorage.setItem('userInfo', JSON.stringify(data));
                setMessage('Profile Updated Successfully');
                setLoading(false);
            } catch (err) {
                setError(err.response?.data?.message || err.message);
                setLoading(false);
            }
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 py-12">
            <div className="max-w-4xl mx-auto px-6">
                <div className="bg-white rounded-[2.5rem] shadow-sm border border-gray-100 overflow-hidden">
                    <div className="md:flex">
                        <div className="md:w-1/3 bg-gray-900 p-12 text-white flex flex-col justify-between">
                            <div>
                                <h1 className="text-4xl font-black uppercase tracking-tighter mb-4">Account</h1>
                                <p className="text-gray-400 text-sm font-medium">Manage your personal information and security settings here.</p>
                            </div>
                            <div className="mt-20">
                                <div className="flex items-center space-x-4 mb-8">
                                    <div className="w-12 h-12 bg-blue-600 rounded-2xl flex items-center justify-center font-black text-xl">
                                        {name?.charAt(0)}
                                    </div>
                                    <div>
                                        <p className="text-xs font-black text-gray-500 uppercase tracking-widest">Logged in as</p>
                                        <p className="font-bold">{name}</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="md:w-2/3 p-12">
                            <h2 className="text-2xl font-black text-gray-900 mb-8 uppercase tracking-tighter">Personal Details</h2>
                            {message && <div className="mb-6 p-4 bg-green-50 text-green-600 rounded-2xl font-bold text-sm border border-green-100">{message}</div>}
                            {error && <div className="mb-6 p-4 bg-red-50 text-red-600 rounded-2xl font-bold text-sm border border-red-100">{error}</div>}

                            <form onSubmit={submitHandler} className="space-y-6">
                                <div>
                                    <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">Full Name</label>
                                    <input
                                        type="text"
                                        className="w-full bg-gray-50 border border-gray-200 rounded-2xl py-4 px-6 text-sm font-bold text-gray-900 focus:outline-none focus:border-blue-500 transition-all"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">Email Address</label>
                                    <input
                                        type="email"
                                        className="w-full bg-gray-50 border border-gray-200 rounded-2xl py-4 px-6 text-sm font-bold text-gray-900 focus:outline-none focus:border-blue-500 transition-all"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        required
                                    />
                                </div>
                                <div className="grid md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">New Password</label>
                                        <input
                                            type="password"
                                            className="w-full bg-gray-50 border border-gray-200 rounded-2xl py-4 px-6 text-sm font-bold text-gray-900 focus:outline-none focus:border-blue-500 transition-all"
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">Confirm Password</label>
                                        <input
                                            type="password"
                                            className="w-full bg-gray-50 border border-gray-200 rounded-2xl py-4 px-6 text-sm font-bold text-gray-900 focus:outline-none focus:border-blue-500 transition-all"
                                            value={confirmPassword}
                                            onChange={(e) => setConfirmPassword(e.target.value)}
                                        />
                                    </div>
                                </div>

                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="w-full py-5 bg-blue-600 hover:bg-blue-700 text-white font-black text-lg rounded-[1.5rem] transition-all shadow-xl shadow-blue-600/20 active:scale-95 disabled:bg-gray-400 mt-8 mb-4 uppercase tracking-tighter"
                                >
                                    {loading ? 'Updating...' : 'Update Profile'}
                                </button>
                                <p className="text-center text-[10px] font-black text-gray-400 uppercase tracking-widest">Your data is secured with industry-standard encryption.</p>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProfilePage;
