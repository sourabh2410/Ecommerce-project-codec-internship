import React, { useState, useEffect } from 'react';
import API from '../api';
import ProductCard from './ProductCard';

const ProductRecommendations = ({ productId }) => {
    const [recommendations, setRecommendations] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchRecommendations = async () => {
            try {
                const { data } = await API.get(`/products/${productId}/recommendations`);
                setRecommendations(data);
                setLoading(false);
            } catch (err) {
                console.error('Failed to fetch recommendations', err);
                setLoading(false);
            }
        };

        if (productId) {
            fetchRecommendations();
        }
    }, [productId]);

    if (loading) return null;
    if (recommendations.length === 0) return null;

    return (
        <div className="mt-20">
            <h2 className="text-3xl font-bold text-white mb-8">You Might Also Like</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {recommendations.map((product) => (
                    <ProductCard key={product._id} product={product} />
                ))}
            </div>
        </div>
    );
};

export default ProductRecommendations;
