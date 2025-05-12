const express = require('express');
const session = require('express-session');
const MySQLStore = require('express-mysql-session')(session);
const dotenv = require('dotenv');
const db = require('./db');

dotenv.config({ path: './.env' });

const app = express();

// Session store
const sessionStore = new MySQLStore({
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_ROOT ,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE
});

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use(session({
    key: 'session_cookie_name',
    secret: process.env.SESSION_SECRET,
    store: sessionStore,
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false, httpOnly: true, maxAge: 3600000 } // Change secure to true if using HTTPS
}));

// Routes
app.use('/api', require('./routes/auth'));
app.use('/api', require('./routes/dashboard'));
app.use('/api', require('./routes/portfolio'))

// Start server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});