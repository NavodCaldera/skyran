const express = require('express');
const { ensureAuthenticated } = require('../middleware/auth');

const router = express.Router();

router.get('/dashboard', ensureAuthenticated, (req, res) => {
    res.send(`Hello ${req.session.user.username}`);
});

module.exports = router;
