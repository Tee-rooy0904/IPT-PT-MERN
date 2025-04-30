require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const crypto = require('crypto');
const app = express();
const port = 8888;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
const connectionString = 'mongodb+srv://eltruco1203:troylord1203@cluster0.h3sevdh.mongodb.net/UserRegistration?retryWrites=true&w=majority&appName=Cluster0';

console.log('Using direct connection string');

// MongoDB Connection
mongoose.connect(connectionString)
  .then(() => console.log('MongoDB connected successfully to UserRegistration database'))
  .catch(err => {
    console.error('MongoDB connection error:', err);
  });

// Password hashing function
function hashPassword(password) {
  const salt = crypto.randomBytes(16).toString('hex');
  const hash = crypto.pbkdf2Sync(password, salt, 1000, 64, 'sha512').toString('hex');
  return `${salt}:${hash}`;
}

// Password verification function
function verifyPassword(storedPassword, suppliedPassword) {
  const [salt, hash] = storedPassword.split(':');
  const suppliedHash = crypto.pbkdf2Sync(suppliedPassword, salt, 1000, 64, 'sha512').toString('hex');
  return hash === suppliedHash;
}

// Define User Schema
const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

// Create model with explicit collection name 'Registration'
const User = mongoose.model('User', userSchema, 'Registration');

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

// Registration endpoint
app.post('/api/users/register', async (req, res) => {
  const { username, email, password, firstName, lastName } = req.body;

  // Basic validation
  if (!username || !email || !password || !firstName || !lastName) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  if (password.length < 6) {
    return res.status(400).json({ error: 'Password must be at least 6 characters' });
  }

  try {
    // Check if user already exists
    let user = await User.findOne({ $or: [{ email }, { username }] });
    
    if (user) {
      if (user.email === email) {
        return res.status(400).json({ error: 'Email already registered' });
      } else {
        return res.status(400).json({ error: 'Username already taken' });
      }
    }

    // Hash password
    const hashedPassword = hashPassword(password);

    // Create new user
    user = new User({
      username,
      email,
      password: hashedPassword,
      firstName,
      lastName
    });

    await user.save();
    
    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Start server
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});