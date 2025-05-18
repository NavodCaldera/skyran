const mysql = require("mysql2");
const dotenv = require('dotenv');
const fs = require('fs');


dotenv.config({ path: '.env' });

const db = mysql.createConnection({
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_ROOT,
    port: process.env.DATABASE_PORT,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE,
    ssl: {
    ca: fs.readFileSync('ca.pem')
  }
});

db.connect((error) => {
    if (error) {
        console.log(error);
    } else {
        console.log("MySQL connected!");


        const createUsersTableQuery = `
        CREATE TABLE IF NOT EXISTS users (
            id INT AUTO_INCREMENT PRIMARY KEY,
            first_name VARCHAR(30) NOT NULL,
            last_name VARCHAR(30) NOT NULL,
            email VARCHAR(255) NOT NULL UNIQUE,
            password VARCHAR(255) NOT NULL,
            birthday DATE
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8;
        `;


        db.query(createUsersTableQuery, (err) => {
            if (err) {
                console.error('Error creating users table:', err);
            } else {
                console.log('Users table checked/created successfully');
            }
        });

    }
});

module.exports = db;
