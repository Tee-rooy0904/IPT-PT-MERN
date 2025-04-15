require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();
const port = 8888;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
const connectionString = 'mongodb+srv://eltruco1203:troylord1203@cluster0.h3sevdh.mongodb.net/ProductManagement?retryWrites=true&w=majority&appName=Cluster0';

console.log('Using direct connection string');

// MongoDB Connection
mongoose.connect(connectionString)
  .then(() => console.log('MongoDB connected successfully to ProductManagement database'))
  .catch(err => {
    console.error('MongoDB connection error:', err);
  });

// Define Product Schema
const productSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    category: { type: String, required: true },
    imageUrl: { type: String },
    stockQuantity: { type: Number, required: true, default: 0 }
});

// Create model with explicit collection name 'Products'
const Product = mongoose.model('Product', productSchema, 'Products');

// Root route
app.get('/', (req, res) => {
    res.send('Server is running');
});

// Test endpoint to verify API functionality
app.get('/test', (req, res) => {
    console.log('Test endpoint hit');
    res.json({ 
      message: 'API is working!', 
      mongoStatus: mongoose.connection.readyState === 1 ? 'connected' : 'disconnected',
      mongoDbName: mongoose.connection.name || 'No database connected'
    });
});

// Get all products
app.get('/api/products', async (req, res) => {
    try {
        if (mongoose.connection.readyState !== 1) {
            return res.status(500).json({ message: 'Database connection error. Please check server logs.' });
        }
        
        const products = await Product.find();
        res.json(products);
    } catch (err) {
        console.error('Error fetching products:', err);
        res.status(500).json({ message: 'Server error', error: err.message });
    }
});

// Get a single product
app.get('/api/products/:id', async (req, res) => {
    try {
        if (mongoose.connection.readyState !== 1) {
            return res.status(500).json({ message: 'Database connection error. Please check server logs.' });
        }
        
        const product = await Product.findById(req.params.id);
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }
        res.json(product);
    } catch (err) {
        console.error('Error fetching product:', err);
        res.status(500).json({ message: 'Server error', error: err.message });
    }
});

// Add a new product
app.post('/api/products', async (req, res) => {
    try {
        if (mongoose.connection.readyState !== 1) {
            return res.status(500).json({ message: 'Database connection error. Please check server logs.' });
        }
        
        const newProduct = new Product(req.body);
        const savedProduct = await newProduct.save();
        res.status(201).json(savedProduct);
    } catch (err) {
        console.error('Error adding product:', err);
        res.status(400).json({ message: 'Error adding product', error: err.message });
    }
});

// Update a product
app.put('/api/products/:id', async (req, res) => {
    try {
        if (mongoose.connection.readyState !== 1) {
            return res.status(500).json({ message: 'Database connection error. Please check server logs.' });
        }
        
        const updatedProduct = await Product.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );
        if (!updatedProduct) {
            return res.status(404).json({ message: 'Product not found' });
        }
        res.json(updatedProduct);
    } catch (err) {
        console.error('Error updating product:', err);
        res.status(400).json({ message: 'Error updating product', error: err.message });
    }
});

// Delete a product
app.delete('/api/products/:id', async (req, res) => {
    try {
        if (mongoose.connection.readyState !== 1) {
            return res.status(500).json({ message: 'Database connection error. Please check server logs.' });
        }
        
        const deletedProduct = await Product.findByIdAndDelete(req.params.id);
        if (!deletedProduct) {
            return res.status(404).json({ message: 'Product not found' });
        }
        res.json({ message: 'Product deleted successfully' });
    } catch (err) {
        console.error('Error deleting product:', err);
        res.status(400).json({ message: 'Error deleting product', error: err.message });
    }
});

// Start server
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});