const express = require('express');
const bcrypt = require('bcrypt');
const db = require('../db');
const { registerSchema, loginSchema } = require('../validators/user');

const router = express.Router();

// Register
router.post('/register', async (req, res) => {
    const { error, value } = registerSchema.validate(req.body);
    if (error) return res.status(400).json({ error: error.details[0].message });

    const { username, email, password } = value;
    try {
        const hash = await bcrypt.hash(password, 10);
        db.query('INSERT INTO users (username, email, password) VALUES (?, ?, ?)', [username, email, hash], (err, result) => {
            if (err) {
                if (err.code === 'ER_DUP_ENTRY') {
                    return res.status(409).json({ error: 'Email already registered' });
                }
                return res.status(500).json({ error: 'Database error' });
            }
            res.status(201).json({ message: 'User registered successfully' });
        });
    } catch (err) {
        res.status(500).json({ error: 'Server error' });
    }
});

// Login
router.post('/login', async (req, res) => {
    const { error, value } = loginSchema.validate(req.body);
    if (error) return res.status(400).json({ error: error.details[0].message });

    const { email, password } = value;
    db.query('SELECT * FROM users WHERE email = ?', [email], async (err, data) => {
        if (err) return res.status(500).json({ error: 'Database error' });
        if (!data.length) return res.status(401).json({ error: 'Incorrect Email Address' });

        const user = data[0];
        const match = await bcrypt.compare(password, user.password);
        if (!match) return res.status(401).json({ error: 'Incorrect Password' });

        req.session.user = { id: user.id, username: user.username, email: user.email };
        res.json({ message: 'Logged in' });
    });
});

// Logout
router.get('/logout', (req, res) => {
    req.session.destroy(() => {
        res.redirect('/');
    });
});

module.exports = router;
