const express = require('express');
const bcrypt = require('bcrypt');
const { executeQuery } = require('../db-mock');
const { registerSchema, loginSchema } = require('../validators/user');

const router = express.Router();

// Check Login
router.get('/check', (req, res) => {
    if (req.session.user) {
        res.json({ loggedIn: true, user: req.session.user });
    } else {
        res.json({ loggedIn: false });
    }
});
 
// Register
router.post('/register', async (req, res) => {
    const { error, value } = registerSchema.validate(req.body);
    if (error) return res.status(400).json({ error: error.details[0].message });

    const { first_name, last_name, email, password, birthday } = value;

    try {
        // Check if email already exists
        const existingUsers = await executeQuery('SELECT id FROM users WHERE email = ?', [email]);
        if (existingUsers.length > 0) {
            return res.status(409).json({ error: 'Email already registered' });
        }

        const hash = await bcrypt.hash(password, 10);

        // Insert user
        const userQuery = `
            INSERT INTO users (first_name, last_name, email, password, birthday)
            VALUES (?, ?, ?, ?, ?)
        `;
        const userResult = await executeQuery(userQuery, [first_name, last_name, email, hash, birthday]);

        // Create user profile
        const userId = userResult.insertId;
        const profileQuery = `
            INSERT INTO user_profiles (user_id)
            VALUES (?)
        `;
        await executeQuery(profileQuery, [userId]);

        console.log("✅ User registered successfully with profile");
        res.status(201).json({
            message: 'User registered successfully',
            user: {
                id: userId,
                first_name,
                last_name,
                email
            }
        });

    } catch (err) {
        if (err.code === 'ER_DUP_ENTRY') {
            return res.status(409).json({ error: 'Email already registered' });
        }

        console.error("❌ Registration failed:", err);
        res.status(500).json({ error: 'Server error', details: err.message });
    }
});




// Login
router.post('/login', async (req, res) => {
    const { error, value } = loginSchema.validate(req.body);
    if (error) return res.status(400).json({ error: error.details[0].message });

    const { email, password } = value;

    try {
        // Get user with profile data
        const userQuery = `
            SELECT u.*, up.is_profile_complete, up.investment_experience, up.risk_tolerance
            FROM users u
            LEFT JOIN user_profiles up ON u.id = up.user_id
            WHERE u.email = ?
        `;
        const users = await executeQuery(userQuery, [email]);

        if (users.length === 0) {
            return res.status(401).json({ error: 'Incorrect Email Address or Password' });
        }

        const user = users[0];
        const match = await bcrypt.compare(password, user.password);

        if (!match) {
            return res.status(401).json({ error: 'Incorrect Email Address or Password' });
        }

        // Store comprehensive user data in session
        req.session.user = {
            id: user.id,
            first_name: user.first_name,
            last_name: user.last_name,
            username: `${user.first_name} ${user.last_name}`,
            email: user.email,
            birthday: user.birthday,
            is_profile_complete: user.is_profile_complete || false,
            investment_experience: user.investment_experience,
            risk_tolerance: user.risk_tolerance
        };

        console.log("✅ User logged in successfully:", user.email);
        res.json({
            message: 'Logged in successfully',
            user: req.session.user
        });

    } catch (err) {
        console.error("❌ Login failed:", err);
        res.status(500).json({ error: 'Server error', details: err.message });
    }
});

// Logout
router.post('/logout', (req, res) => {
    if (req.session.user) {
        const userEmail = req.session.user.email;
        req.session.destroy((err) => {
            if (err) {
                console.error("❌ Logout error:", err);
                return res.status(500).json({ error: 'Failed to logout' });
            }
            console.log("✅ User logged out successfully:", userEmail);
            res.json({ message: 'Logged out successfully' });
        });
    } else {
        res.status(400).json({ error: 'No active session' });
    }
});

module.exports = router;
