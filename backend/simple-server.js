// Simple backend server for Skyran authentication
const express = require('express');
const session = require('express-session');
const bcrypt = require('bcrypt');
const cors = require('cors');

const app = express();

// In-memory storage for demo
let users = [];
let userProfiles = [];

// Initialize demo user
async function initDemoUser() {
    const demoPassword = await bcrypt.hash('demo123', 10);
    users.push({
        id: 1,
        first_name: 'Demo',
        last_name: 'User',
        email: 'demo@skyran.com',
        password: demoPassword,
        birthday: '1990-01-01'
    });
    
    userProfiles.push({
        id: 1,
        user_id: 1,
        is_profile_complete: true,
        investment_experience: 'intermediate',
        risk_tolerance: 'medium'
    });
    
    console.log('✅ Demo user created: demo@skyran.com / demo123');
}

// Middleware
app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true
}));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(session({
    secret: 'skyran-demo-secret',
    resave: false,
    saveUninitialized: false,
    cookie: {
        secure: false,
        httpOnly: true,
        maxAge: 3600000
    }
}));

// Routes
app.get('/', (req, res) => {
    res.json({ message: 'Skyran Backend API is running!' });
});

app.get('/api/auth/check', (req, res) => {
    if (req.session.user) {
        res.json({ loggedIn: true, user: req.session.user });
    } else {
        res.json({ loggedIn: false });
    }
});

app.post('/api/auth/register', async (req, res) => {
    try {
        const { first_name, last_name, email, password, birthday } = req.body;
        
        // Validation
        if (!first_name || !last_name || !email || !password || !birthday) {
            return res.status(400).json({ error: 'All fields are required' });
        }
        
        // Check if email exists
        const existingUser = users.find(u => u.email === email);
        if (existingUser) {
            return res.status(409).json({ error: 'Email already registered' });
        }
        
        // Create user
        const hash = await bcrypt.hash(password, 10);
        const newUser = {
            id: users.length + 1,
            first_name,
            last_name,
            email,
            password: hash,
            birthday
        };
        users.push(newUser);
        
        // Create profile
        const newProfile = {
            id: userProfiles.length + 1,
            user_id: newUser.id,
            is_profile_complete: false
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

app.post('/api/auth/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        
        if (!email || !password) {
            return res.status(400).json({ error: 'Email and password are required' });
        }
        
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

// Start server
const PORT = 5001;

async function startServer() {
    await initDemoUser();
    app.listen(PORT, () => {
        console.log(`🚀 Skyran Backend Server running on http://localhost:${PORT}`);
        console.log(`📋 API Endpoints:`);
        console.log(`   GET  /api/auth/check      - Check auth status`);
        console.log(`   POST /api/auth/register   - Register new user`);
        console.log(`   POST /api/auth/login      - Login user`);
        console.log(`   POST /api/auth/logout     - Logout user`);
        console.log(`\n🧪 Demo credentials: demo@skyran.com / demo123`);
        console.log(`🌐 Frontend should be running on: http://localhost:3000`);
    });
}

startServer().catch(console.error);
