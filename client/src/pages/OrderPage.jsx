import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import API from '../api';
import { optimizeImage } from '../utils';

const stripePromise = loadStripe('pk_test_TYooMQauvdEDq54NiTphI7jx'); // Sample public key

const CheckoutForm = ({ orderId, totalPrice, onPaymentSuccess }) => {
    const stripe = useStripe();
    const elements = useElements();
    const [error, setError] = useState(null);
    const [processing, setProcessing] = useState(false);

    const handleSubmit = async (event) => {
        event.preventDefault();
        setProcessing(true);

        if (!stripe || !elements) return;

        try {
            const { data: { clientSecret } } = await API.post('/orders/create-payment-intent', { totalPrice });

            const payload = await stripe.confirmCardPayment(clientSecret, {
                payment_method: {
                    card: elements.getElement(CardElement),
                },
            });

            if (payload.error) {
                setError(`Payment failed: ${payload.error.message}`);
                setProcessing(false);
            } else {
                setError(null);
                setProcessing(false);
                onPaymentSuccess(payload.paymentIntent);
            }
        } catch (err) {
            setError(err.message);
            setProcessing(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            <div className="p-5 bg-gray-50 rounded-2xl border border-gray-100 focus-within:border-blue-500 focus-within:bg-white transition-all">
                <CardElement options={{
                    style: {
                        base: {
                            fontSize: '16px',
                            color: '#0f172a',
                            fontFamily: 'Inter, sans-serif',
                            fontWeight: '600',
                            '::placeholder': { color: '#94a3b8' },
                        },
                    }
                }} />
            </div>
            {error && <div className="text-red-600 text-xs font-black uppercase tracking-widest bg-red-50 p-4 rounded-xl border border-red-100">{error}</div>}
            <button
                disabled={!stripe || processing}
                className="w-full py-5 bg-gray-900 hover:bg-blue-600 disabled:bg-gray-100 disabled:text-gray-400 text-white font-black rounded-2xl transition-all shadow-xl shadow-gray-900/10 uppercase tracking-widest text-sm active:scale-95"
            >
                {processing ? 'Processing Payment...' : `Complete Payment • ₹${totalPrice}`}
            </button>
        </form>
    );
};

const OrderPage = () => {
    const { id } = useParams();
    const [order, setOrder] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchOrder = async () => {
            try {
                const { data } = await API.get(`/orders/${id}`);
                setOrder(data);
                setLoading(false);
            } catch (err) {
                setError(err.response?.data?.message || err.message);
                setLoading(false);
            }
        };
        fetchOrder();
    }, [id]);

    const successPaymentHandler = async (paymentResult) => {
        try {
            const { data } = await API.put(`/orders/${id}/pay`, {
                id: paymentResult.id,
                status: paymentResult.status,
                update_time: paymentResult.created,
                email_address: paymentResult.receipt_email,
            });
            setOrder(data);
        } catch (err) {
            console.error(err);
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
                <div className="mb-12">
                    <span className="text-[10px] font-black text-gray-400 uppercase tracking-[0.4em] block mb-3">Order Confirmation</span>
                    <h1 className="text-4xl md:text-5xl font-black text-gray-900 tracking-tighter uppercase leading-none">Order ID: {order._id.substring(0, 12)}...</h1>
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <div className="lg:col-span-2 space-y-8">
                        <div className="bg-white p-10 rounded-[2.5rem] border border-gray-100 shadow-sm">
                            <h2 className="text-xs font-black text-gray-400 uppercase tracking-widest mb-6">Delivery Details</h2>
                            <div className="space-y-4">
                                <p className="text-gray-900"><strong className="text-[10px] uppercase tracking-widest text-gray-400 block mb-1">Recipient</strong> {order.user.name}</p>
                                <p className="text-gray-900"><strong className="text-[10px] uppercase tracking-widest text-gray-400 block mb-1">Email</strong> {order.user.email}</p>
                                <p className="text-gray-900">
                                    <strong className="text-[10px] uppercase tracking-widest text-gray-400 block mb-1">Address</strong>
                                    {order.shippingAddress.address}, {order.shippingAddress.city}, <br />
                                    {order.shippingAddress.postalCode}, {order.shippingAddress.country}
                                </p>
                            </div>
                            {order.isDelivered ? (
                                <div className="mt-8 p-4 bg-green-50 text-green-600 font-bold rounded-2xl border border-green-100 text-sm text-center uppercase tracking-widest">Delivered on {order.deliveredAt.substring(0, 10)}</div>
                            ) : (
                                <div className="mt-8 p-4 bg-blue-50 text-blue-600 font-bold rounded-2xl border border-blue-100 text-sm text-center uppercase tracking-widest animate-pulse">In Transit / Processing</div>
                            )}
                        </div>

                        <div className="bg-white p-10 rounded-[2.5rem] border border-gray-100 shadow-sm">
                            <h2 className="text-xs font-black text-gray-400 uppercase tracking-widest mb-6">Payment Status</h2>
                            <p className="text-gray-900 font-black text-xl mb-6">Method: {order.paymentMethod}</p>
                            {order.isPaid ? (
                                <div className="p-4 bg-green-50 text-green-600 font-bold rounded-2xl border border-green-100 text-sm text-center uppercase tracking-widest">Paid on {order.paidAt.substring(0, 10)}</div>
                            ) : (
                                <div className="p-4 bg-red-50 text-red-600 font-bold rounded-2xl border border-red-100 text-sm text-center uppercase tracking-widest">Awaiting Payment</div>
                            )}
                        </div>

                        <div className="bg-white p-10 rounded-[2.5rem] border border-gray-100 shadow-sm">
                            <h2 className="text-xs font-black text-gray-400 uppercase tracking-widest mb-8">Purchase Summary</h2>
                            <div className="space-y-6">
                                {order.orderItems.map((item, index) => (
                                    <div key={index} className="flex items-center space-x-6 border-b border-gray-50 pb-6 last:border-0 last:pb-0">
                                        <img
                                            src={optimizeImage(item.image, 200)}
                                            alt={item.name}
                                            className="w-16 h-16 object-cover rounded-2xl border border-gray-50"
                                            loading="lazy"
                                        />
                                        <div className="flex-grow font-black text-gray-900 tracking-tight">{item.name}</div>
                                        <div className="text-gray-400 text-sm font-bold">
                                            {item.qty} x ₹{item.price} = <span className="text-blue-600 font-black tracking-tight">₹{(item.qty * item.price).toFixed(2)}</span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    <div className="h-fit space-y-6">
                        <div className="bg-white p-10 rounded-[3rem] border border-gray-100 shadow-xl shadow-gray-200/50">
                            <h2 className="text-2xl font-black text-gray-900 uppercase tracking-tighter mb-8">Final Totals</h2>
                            <div className="space-y-6">
                                <div className="flex justify-between text-gray-500 font-medium"><span>Items Subtotal:</span><span className="text-gray-900 font-black">₹{(order.totalPrice - order.shippingPrice - order.taxPrice).toFixed(2)}</span></div>
                                <div className="flex justify-between text-gray-500 font-medium"><span>Shipping:</span><span className="text-gray-900 font-black">₹{order.shippingPrice}</span></div>
                                <div className="flex justify-between text-gray-500 font-medium"><span>Taxes:</span><span className="text-gray-900 font-black">₹{order.taxPrice}</span></div>
                                <div className="h-px bg-gray-50 w-full" />
                                <div className="flex justify-between items-end">
                                    <span className="text-xs font-black text-gray-400 uppercase tracking-widest">Amount Paid</span>
                                    <span className="text-4xl font-black text-blue-600 tracking-tighter">₹{order.totalPrice}</span>
                                </div>
                            </div>

                            {!order.isPaid && (
                                <div className="mt-8">
                                    <Elements stripe={stripePromise}>
                                        <CheckoutForm orderId={order._id} totalPrice={order.totalPrice} onPaymentSuccess={successPaymentHandler} />
                                    </Elements>
                                </div>
                            )}

                            {order.isPaid && !order.isDelivered && JSON.parse(localStorage.getItem('userInfo'))?.isAdmin && (
                                <button
                                    onClick={async () => {
                                        try {
                                            const { data } = await API.put(`/orders/${order._id}/deliver`);
                                            setOrder(data);
                                        } catch (err) {
                                            alert(err.response?.data?.message || err.message);
                                        }
                                    }}
                                    className="w-full mt-10 py-5 bg-gray-900 hover:bg-blue-600 text-white font-black rounded-2xl transition-all shadow-xl shadow-gray-900/10 uppercase tracking-widest text-sm active:scale-95"
                                >
                                    Mark As Delivered
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default OrderPage;
