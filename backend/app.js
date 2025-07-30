const express = require('express');
const session = require('express-session');
const dotenv = require('dotenv');
// Use mock database for demonstration
const { pool, initializeDatabase, executeQuery } = require('./db-mock');
const cors = require('cors');

dotenv.config({ path: './.env' });

const app = express();


// Enable CORS for frontend
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true
}));

// Ensure SESSION_SECRET is secure
if (!process.env.SESSION_SECRET || process.env.SESSION_SECRET.length < 32) {
    console.error('❌ SESSION_SECRET is not set or too short. Please set a strong secret in your .env file.');
    process.exit(1);
}

// Use memory session store for demo
console.log('✅ Using memory session store for demonstration');

// Middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Request logger
app.use((req, res, next) => {
    console.log(`➡️  ${req.method} ${req.url}`);
    next();
});

// Session middleware
app.use(session({
    key: 'session_cookie_name',
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
        secure: false, // Set to false for demo
        httpOnly: true,
        maxAge: 3600000 // 1 hour
    }
}));

// Health check route
app.get('/', (req, res) => {
    res.status(200).send('API is running.');
});

// Mount routes
try {
    const authRoutes = require('./routes/auth');
    app.use('/api/auth', authRoutes);
    console.log('✅ Auth routes mounted');
} catch (err) {
    console.error('❌ Failed to load auth routes:', err);
}

try {
    const dashboardRoutes = require('./routes/dashboard');
    app.use('/api', dashboardRoutes);
    console.log('✅ Dashboard routes mounted');
} catch (err) {
    console.error('❌ Failed to load dashboard routes:', err);
}

try {
    const portfolioRoutes = require('./routes/portfolio');
    app.use('/api', portfolioRoutes);
    console.log('✅ Portfolio routes mounted');
} catch (err) {
    console.error('❌ Failed to load portfolio routes:', err);
}

// ✅ TEST route — must be before error handler
app.post('/test', (req, res) => {
    res.send('Test route works!');
});

// Global error handler (should be last)
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(err.statusCode || 500).json({
        status: 'error',
        message: err.message || 'An unexpected error occurred.'
    });
});

// Start server
const port = process.env.PORT || 3000;

async function startApp() {
    try {
        await initializeDatabase();
        app.listen(port, '0.0.0.0', () => {
            console.log(`🚀 Server running on http://0.0.0.0:${port}`);
            console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
        });
    } catch (error) {
        console.error('Fatal error during application startup:', error);
        process.exit(1);
    }
}

startApp();
