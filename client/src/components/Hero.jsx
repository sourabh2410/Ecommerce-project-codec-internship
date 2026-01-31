import React, { useState, useEffect } from 'react';

const Hero = () => {
    const [currentSlide, setCurrentSlide] = useState(0);

    const deals = [
        {
            title: 'iPhone 15 Pro',
            subtitle: 'Titanium Design',
            discount: 'Up to 15% Off',
            price: '₹74,999',
            originalPrice: '₹89,999',
            image: 'https://images.unsplash.com/photo-1695048133142-1a20484d2569?q=80&w=600&auto=format&fit=crop',
            bgColor: 'from-blue-600 to-indigo-600'
        },
        {
            title: 'Samsung Galaxy S24',
            subtitle: 'AI-Powered Camera',
            discount: 'Flat ₹10,000 Off',
            price: '₹64,999',
            originalPrice: '₹74,999',
            image: 'https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?q=80&w=600&auto=format&fit=crop',
            bgColor: 'from-purple-600 to-pink-600'
        },
        {
            title: 'Sony WH-1000XM5',
            subtitle: 'Premium Noise Cancelling',
            discount: '20% Off',
            price: '₹24,990',
            originalPrice: '₹29,990',
            image: 'https://images.unsplash.com/photo-1546435770-a3e426bf472b?q=80&w=600&auto=format&fit=crop',
            bgColor: 'from-orange-600 to-red-600'
        },
        {
            title: 'MacBook Pro M3',
            subtitle: 'Supercharged Performance',
            discount: 'Save ₹20,000',
            price: '₹1,49,900',
            originalPrice: '₹1,69,900',
            image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?q=80&w=600&auto=format&fit=crop',
            bgColor: 'from-gray-700 to-gray-900'
        }
    ];

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % deals.length);
        }, 4000);
        return () => clearInterval(timer);
    }, [deals.length]);

    return (
        <div className="relative bg-white overflow-hidden">
            <div className="max-w-[1500px] mx-auto px-6 py-6">
                <div className="relative h-[350px] md:h-[450px] rounded-3xl overflow-hidden shadow-xl">
                    {deals.map((deal, index) => (
                        <div
                            key={index}
                            className={`absolute inset-0 transition-opacity duration-1000 ${index === currentSlide ? 'opacity-100' : 'opacity-0'
                                }`}
                        >
                            <div className={`h-full bg-gradient-to-r ${deal.bgColor} flex items-center px-6 md:px-16`}>
                                <div className="flex-1 text-white">
                                    <div className="inline-block px-4 py-1.5 bg-white/20 backdrop-blur-md rounded-full text-xs font-black uppercase tracking-wider mb-4">
                                        {deal.discount}
                                    </div>
                                    <h2 className="text-3xl md:text-5xl font-black mb-3 tracking-tight">{deal.title}</h2>
                                    <p className="text-lg md:text-xl font-medium mb-6 text-white/90">{deal.subtitle}</p>
                                    <div className="flex items-baseline gap-4 mb-6">
                                        <span className="text-3xl md:text-4xl font-black">{deal.price}</span>
                                        <span className="text-lg md:text-xl line-through opacity-60">{deal.originalPrice}</span>
                                    </div>
                                    <button
                                        onClick={() => {
                                            const el = document.getElementById('latest-products');
                                            if (el) el.scrollIntoView({ behavior: 'smooth' });
                                        }}
                                        className="px-6 py-3 bg-white text-gray-900 font-black rounded-xl hover:bg-gray-100 transition-all shadow-2xl text-sm"
                                    >
                                        SHOP NOW
                                    </button>
                                </div>
                                <div className="hidden md:block flex-1">
                                    <img
                                        src={deal.image}
                                        alt={deal.title}
                                        loading="lazy"
                                        className="w-full h-[350px] object-contain drop-shadow-2xl"
                                    />
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Carousel Indicators */}
                <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2 z-10">
                    {deals.map((_, index) => (
                        <button
                            key={index}
                            onClick={() => setCurrentSlide(index)}
                            className={`w-2 h-2 rounded-full transition-all ${index === currentSlide ? 'bg-white w-8' : 'bg-white/50'
                                }`}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Hero;
