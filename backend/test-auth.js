// Simple test to demonstrate authentication functionality
const express = require('express');
const session = require('express-session');
const bcrypt = require('bcrypt');
const cors = require('cors');

// Mock database
let users = [];
let userProfiles = [];

// Initialize demo user
async function initDemoUser() {
    const demoPassword = await bcrypt.hash('demo123', 10);
    const demoUser = {
        id: 1,
        first_name: 'Demo',
        last_name: 'User',
        email: 'demo@skyran.com',
        password: demoPassword,
        birthday: '1990-01-01',
        created_at: new Date()
    };
    users.push(demoUser);

    const demoProfile = {
        id: 1,
        user_id: 1,
        is_profile_complete: true,
        investment_experience: 'intermediate',
        risk_tolerance: 'medium',
        created_at: new Date()
    };
    userProfiles.push(demoProfile);
    console.log('✅ Demo user created: demo@skyran.com / demo123');
}

const app = express();

// Middleware
app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true
}));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Session middleware
app.use(session({
    secret: 'demo-secret-key',
    resave: false,
    saveUninitialized: false,
    cookie: {
        secure: false,
        httpOnly: true,
        maxAge: 3600000 // 1 hour
    }
}));

// Routes
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/demo.html');
});

app.get('/api', (req, res) => {
    res.json({ message: 'Skyran Auth Demo API is running!' });
});

// Check authentication status
app.get('/api/auth/check', (req, res) => {
    if (req.session.user) {
        res.json({ loggedIn: true, user: req.session.user });
    } else {
        res.json({ loggedIn: false });
    }
});

// Register new user
app.post('/api/auth/register', async (req, res) => {
    const { first_name, last_name, email, password, birthday } = req.body;

    // Check if email already exists
    const existingUser = users.find(u => u.email === email);
    if (existingUser) {
        return res.status(409).json({ error: 'Email already registered' });
    }

    try {
        const hash = await bcrypt.hash(password, 10);
        const newUser = {
            id: users.length + 1,
            first_name,
            last_name,
            email,
            password: hash,
            birthday,
            created_at: new Date()
        };
        users.push(newUser);

        // Create user profile
        const newProfile = {
            id: userProfiles.length + 1,
            user_id: newUser.id,
            is_profile_complete: false,
            created_at: new Date()
        };
        userProfiles.push(newProfile);

        console.log(`✅ User registered: ${email}`);
        res.status(201).json({ 
            message: 'User registered successfully',
            user: {
                id: newUser.id,
                first_name,
                last_name,
                email
            }
        });
    } catch (error) {
        console.error('❌ Registration error:', error);
        res.status(500).json({ error: 'Server error' });
    }
});

// Login user
app.post('/api/auth/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = users.find(u => u.email === email);
        if (!user) {
            return res.status(401).json({ error: 'Incorrect Email Address or Password' });
        }

        const match = await bcrypt.compare(password, user.password);
        if (!match) {
            return res.status(401).json({ error: 'Incorrect Email Address or Password' });
        }

        const profile = userProfiles.find(p => p.user_id === user.id);
        
        req.session.user = {
            id: user.id,
            first_name: user.first_name,
            last_name: user.last_name,
            username: `${user.first_name} ${user.last_name}`,
            email: user.email,
            birthday: user.birthday,
            is_profile_complete: profile?.is_profile_complete || false,
            investment_experience: profile?.investment_experience,
            risk_tolerance: profile?.risk_tolerance
        };

        console.log(`✅ User logged in: ${email}`);
        res.json({ 
            message: 'Logged in successfully',
            user: req.session.user
        });
    } catch (error) {
        console.error('❌ Login error:', error);
        res.status(500).json({ error: 'Server error' });
    }
});

// Logout user
app.post('/api/auth/logout', (req, res) => {
    if (req.session.user) {
        const userEmail = req.session.user.email;
        req.session.destroy((err) => {
            if (err) {
                console.error('❌ Logout error:', err);
                return res.status(500).json({ error: 'Failed to logout' });
            }
            console.log(`✅ User logged out: ${userEmail}`);
            res.json({ message: 'Logged out successfully' });
        });
    } else {
        res.status(400).json({ error: 'No active session' });
    }
});

// Protected route example
app.get('/api/dashboard', (req, res) => {
    if (!req.session.user) {
        return res.status(401).json({ error: 'Unauthorized' });
    }
    res.json({ 
        message: `Welcome to your dashboard, ${req.session.user.first_name}!`,
        user: req.session.user
    });
});

// Start server
const PORT = 5000;

async function startServer() {
    await initDemoUser();
    app.listen(PORT, () => {
        console.log(`🚀 Skyran Auth Demo Server running on http://localhost:${PORT}`);
        console.log(`📋 Available endpoints:`);
        console.log(`   GET  /                    - Health check`);
        console.log(`   GET  /api/auth/check      - Check auth status`);
        console.log(`   POST /api/auth/register   - Register new user`);
        console.log(`   POST /api/auth/login      - Login user`);
        console.log(`   POST /api/auth/logout     - Logout user`);
        console.log(`   GET  /api/dashboard       - Protected route`);
        console.log(`\n🧪 Demo credentials: demo@skyran.com / demo123`);
    });
}

startServer();
