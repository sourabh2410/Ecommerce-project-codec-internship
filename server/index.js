const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');

const fs = require('fs');

dotenv.config({ path: path.join(__dirname, '.env') });

const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/user');
const productRoutes = require('./routes/product');
const orderRoutes = require('./routes/order');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/products', productRoutes);
app.use('/api/orders', orderRoutes);

const distPath = path.join(__dirname, '..', 'client', 'dist');

if (process.env.NODE_ENV === 'production' || fs.existsSync(distPath)) {
    console.log('Serving production build from:', distPath);
    app.use(express.static(distPath));

    // Use app.use for the catch-all to avoid path-to-regexp syntax issues
    app.use((req, res) => {
        res.sendFile(path.join(distPath, 'index.html'));
    });
} else {
    console.log('Running in DEVELOPMENT mode');
    app.get('/', (req, res) => res.send('API Running in Development'));
}

mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/ecommerce')
    .then(() => console.log('MongoDB Connected'))
    .catch(err => console.log(err));

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
