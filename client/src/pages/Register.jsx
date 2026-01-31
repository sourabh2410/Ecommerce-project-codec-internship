import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import API from '../api';

const Register = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const { data } = await API.post('/auth/register', { name, email, password });
            localStorage.setItem('userInfo', JSON.stringify(data));
            navigate('/');
        } catch (err) {
            setError(err.response?.data?.message || 'Registration failed');
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
            <div className="bg-white p-10 rounded-[2.5rem] shadow-xl shadow-gray-200/50 w-full max-w-md border border-gray-100">
                <div className="text-center mb-10">
                    <h2 className="text-4xl font-black text-gray-900 uppercase tracking-tighter">Create Account</h2>
                    <p className="text-gray-500 text-sm font-medium mt-2">Join our premium shopping community</p>
                </div>
                {error && <p className="bg-red-500/10 border border-red-500 text-red-500 p-3 rounded-lg mb-4 text-center">{error}</p>}
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2 ml-1">Full Name</label>
                        <input
                            type="text"
                            className="w-full p-4 bg-gray-50 rounded-2xl text-gray-900 border border-gray-200 focus:border-blue-500 focus:bg-white outline-none transition-all font-bold text-sm"
                            placeholder="John Doe"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2 ml-1">Email Address</label>
                        <input
                            type="email"
                            className="w-full p-4 bg-gray-50 rounded-2xl text-gray-900 border border-gray-200 focus:border-blue-500 focus:bg-white outline-none transition-all font-bold text-sm"
                            placeholder="name@example.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2 ml-1">Password</label>
                        <input
                            type="password"
                            className="w-full p-4 bg-gray-50 rounded-2xl text-gray-900 border border-gray-200 focus:border-blue-500 focus:bg-white outline-none transition-all font-bold text-sm"
                            placeholder="••••••••"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full py-5 bg-gray-900 hover:bg-blue-600 text-white font-black rounded-2xl transition-all shadow-xl shadow-gray-900/10 active:scale-95 uppercase tracking-widest text-sm"
                    >
                        Create Account
                    </button>
                </form>
                <p className="mt-8 text-center text-gray-500 font-medium text-sm">
                    Already have an account? <Link to="/login" className="text-blue-600 font-black hover:underline ml-1">Login</Link>
                </p>
            </div>
        </div>
    );
};

export default Register;
