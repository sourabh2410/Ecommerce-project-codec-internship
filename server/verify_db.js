const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Product = require('./models/Product');

dotenv.config();

const verifyData = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/ecommerce');
        console.log('MongoDB Connected');

        const products = await Product.find({
            name: { $in: ['PlayStation 5 [NEW]', 'Roomba i7+ [NEW]', 'Air Purifier Pro'] }
        });

        products.forEach(p => {
            console.log(`Product: ${p.name}`);
            console.log(`Image: ${p.image}`);
            console.log('---');
        });

        process.exit();
    } catch (error) {
        console.error(error);
        process.exit(1);
    }
};

verifyData();
