const express = require('express');
const bcrypt = require('bcrypt');
const { executeQuery } = require('../db');
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
        const hash = await bcrypt.hash(password, 10);

        const query = `
            INSERT INTO users (first_name, last_name, email, password, birthday)
            VALUES (?, ?, ?, ?, ?)
        `;

        await executeQuery(query, [first_name, last_name, email, hash, birthday]);

        console.log("✅ User registered successfully");
        res.status(201).json({ message: 'User registered successfully' });

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
        const users = await executeQuery('SELECT * FROM users WHERE email = ?', [email]);

        if (users.length === 0) {
            return res.status(401).json({ error: 'Incorrect Email Address or Password' });
        }

        const user = users[0];
        const match = await bcrypt.compare(password, user.password);

        if (!match) {
            return res.status(401).json({ error: 'Incorrect Email Address or Password' });
        }

        req.session.user = {
            id: user.id,
            username: `${user.first_name} ${user.last_name}`,
            email: user.email
        };

        res.json({ message: 'Logged in' });

    } catch (err) {
        console.error("❌ Login failed:", err);
        res.status(500).json({ error: 'Server error', details: err.message });
    }
});

// Logout
router.get('/logout', (req, res) => {
    req.session.destroy(() => {
        res.redirect('/');
    });
});

module.exports = router;
