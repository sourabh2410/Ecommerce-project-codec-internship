import React from 'react';

const AboutPage = () => {
    return (
        <div className="min-h-screen bg-gray-50 py-20 px-6">
            <div className="max-w-[1000px] mx-auto">
                <div className="text-center mb-24">
                    <h1 className="text-6xl md:text-8xl font-black text-gray-900 tracking-tighter uppercase leading-[0.85] mb-8">
                        The Future of <br /> <span className="text-blue-600">Shopping</span>
                    </h1>
                    <p className="text-xl text-gray-500 font-medium max-w-2xl mx-auto leading-relaxed">
                        Leading the evolution of e-commerce with a commitment to premium quality, seamless technology, and user-centric design.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-32">
                    <div className="bg-white p-12 rounded-[3.5rem] border border-gray-100 shadow-xl shadow-gray-200/50">
                        <h2 className="text-3xl font-black text-gray-900 mb-6 tracking-tight uppercase">Seamless Browsing</h2>
                        <p className="text-gray-500 font-medium text-lg leading-relaxed">
                            Mobile-friendly responsive design adapts to all devices for seamless browsing. Whether you're on a flagship smartphone, a tablet, or a desktop, our platform ensures a pixel-perfect experience every time.
                        </p>
                    </div>
                    <div className="aspect-[4/5] rounded-[3.5rem] overflow-hidden bg-blue-600 relative group">
                        <img
                            src="https://images.unsplash.com/photo-1512428559087-560fa5ceab42?q=80&w=2070&auto=format&fit=crop"
                            alt="Mobile design showcase"
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-blue-900/50 to-transparent" />
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-32">
                    <div className="order-2 md:order-1 aspect-[4/5] rounded-[3.5rem] overflow-hidden bg-indigo-600 relative group">
                        <img
                            src="https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=2070&auto=format&fit=crop"
                            alt="Quality content showcase"
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-indigo-900/50 to-transparent" />
                    </div>
                    <div className="order-1 md:order-2 bg-white p-12 rounded-[3.5rem] border border-gray-100 shadow-xl shadow-gray-200/50">
                        <h2 className="text-3xl font-black text-gray-900 mb-6 tracking-tight uppercase">Informed Choices</h2>
                        <p className="text-gray-500 font-medium text-lg leading-relaxed">
                            High-quality product images, videos, and detailed descriptions help customers make informed choices. We believe that transparency and immersive media are the keys to a confident shopping journey.
                        </p>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-32">
                    <div className="bg-white p-12 rounded-[3.5rem] border border-gray-100 shadow-xl shadow-gray-200/50">
                        <h2 className="text-3xl font-black text-gray-900 mb-6 tracking-tight uppercase">Effortless Discovery</h2>
                        <p className="text-gray-500 font-medium text-lg leading-relaxed">
                            Intuitive navigation with search bars, filters, and categories speeds up product discovery. Our interface is designed to get you to your desired products in as few clicks as possible.
                        </p>
                    </div>
                    <div className="aspect-[4/5] rounded-[3.5rem] overflow-hidden bg-orange-600 relative group">
                        <img
                            src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2015&auto=format&fit=crop"
                            alt="Discovery showcase"
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-orange-900/50 to-transparent" />
                    </div>
                </div>

                <div className="text-center pt-20 border-t border-gray-200">
                    <h3 className="text-4xl font-black text-gray-900 mb-8 tracking-tighter uppercase">Our Commitment</h3>
                    <p className="text-gray-500 font-medium text-xl leading-relaxed max-w-3xl mx-auto mb-12">
                        At E-SHOP, we don't just sell gadgets. We provide the tools for you to build your future, wrapped in an experience that is as innovative as the products we offer.
                    </p>
                    <div className="inline-block px-12 py-5 bg-gray-900 text-white rounded-2xl font-black uppercase tracking-widest hover:bg-blue-600 transition-all shadow-xl shadow-gray-900/10 active:scale-95 cursor-pointer">
                        Explore Collection
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AboutPage;
