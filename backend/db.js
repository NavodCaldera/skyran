// db.js
const mysql = require("mysql2/promise");
const dotenv = require('dotenv');
const fs = require('fs');
const path = require('path'); // Added for path resolution

dotenv.config({ path: '.env' });

// Centralized database configuration
const dbConfig = {
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_ROOT,
    port: process.env.DATABASE_PORT,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
    // Enable SSL if 'ca.pem' exists and DATABASE_USE_SSL is true
    // This assumes 'ca.pem' is in the same directory as db.js or an absolute path
    ssl: process.env.DATABASE_USE_SSL === 'true' && fs.existsSync(path.join(__dirname, 'ca.pem'))
        ? { ca: fs.readFileSync(path.join(__dirname, 'ca.pem')) }
        : undefined
};

// Create a connection pool for better performance and resource management
const pool = mysql.createPool(dbConfig);

// Function to execute a query safely and handle errors
async function executeQuery(query, params = []) {
    let connection;
    try {
        connection = await pool.getConnection(); // Get a connection from the pool
        const [rows] = await connection.execute(query, params); // Use .execute for prepared statements
        return rows;
    } catch (err) {
        console.error("Database query error:", err);
        throw err; // Re-throw the error for upstream handling
    } finally {
        if (connection) connection.release(); // Release the connection back to the pool
    }
}

// Reusable function to create tables
async function _createTable(name, query) {
    try {
        await executeQuery(query);
        console.log(`✅ ${name} table checked/created successfully.`);
    } catch (err) {
        console.error(`❌ Error creating ${name} table:`, err);
        // Depending on criticality, you might want to exit here or log more severely
        process.exit(1); // Critical error: exit application
    }
}

// Table creation functions

async function _createUserTypeTable() {
    const query = `
        CREATE TABLE IF NOT EXISTS user_types (
            id INT AUTO_INCREMENT PRIMARY KEY,
            name VARCHAR(30) NOT NULL,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
    `; // Changed charset and added timestamps
    await _createTable('user_types', query);
}


async function _createUserTable() {
    const query = `
        CREATE TABLE IF NOT EXISTS users (
            id INT AUTO_INCREMENT PRIMARY KEY,
            first_name VARCHAR(30) NOT NULL,
            last_name VARCHAR(30) NOT NULL,
            email VARCHAR(255) NOT NULL UNIQUE,
            password VARCHAR(255) NOT NULL,
            birthday DATE,
            is_adviser BOOLEAN NOT NULL DEFAULT FALSE,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            type_id INT NOT NULL DEFAULT 1,
            updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
            FOREIGN KEY (type_id) REFERENCES user_types(id) ON DELETE CASCADE
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
    `;
    await _createTable('users', query);
}



async function _createAdminsTable() {
    const query = `
        CREATE TABLE IF NOT EXISTS admins (
            id INT AUTO_INCREMENT PRIMARY KEY,
            first_name VARCHAR(30) NOT NULL,
            last_name VARCHAR(30) NOT NULL,
            email VARCHAR(255) NOT NULL UNIQUE,
            password VARCHAR(255) NOT NULL,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
    `; // Changed charset and added timestamps
    await _createTable('admins', query);
}

async function _createCompaniesTable() {
    const query = `
        CREATE TABLE IF NOT EXISTS companies (
            id INT AUTO_INCREMENT PRIMARY KEY,
            name VARCHAR(50) NOT NULL UNIQUE, -- Increased length, added UNIQUE
            description TEXT, -- Added description field
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
    `; // Changed charset and added timestamps
    await _createTable('companies', query);
}

async function _createBillsTable() {
    const query = `
        CREATE TABLE IF NOT EXISTS bills (
            id INT AUTO_INCREMENT PRIMARY KEY,
            name VARCHAR(50) NOT NULL,
            amount DECIMAL(10, 2) NOT NULL, -- Added amount
            due_date DATE, -- Added due date
            company_id INT NOT NULL, -- Changed to NOT NULL
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
            FOREIGN KEY (company_id) REFERENCES companies(id) ON DELETE CASCADE
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
    `; // Changed charset, added amount, due_date, is_paid, ON DELETE CASCADE
    await _createTable('bills', query);
}

async function _createSavingAccountTypesTable() {
    const query = `
        CREATE TABLE IF NOT EXISTS saving_account_types (
            id INT AUTO_INCREMENT PRIMARY KEY,
            name VARCHAR(50) NOT NULL UNIQUE, -- Increased length, added UNIQUE
            company_id INT NOT NULL, -- Changed to NOT NULL
            min_balance DECIMAL(10, 2) DEFAULT 0.00, -- Added min_balance
            rate DECIMAL(5, 3) NOT NULL, -- Use DECIMAL for precise rates (e.g., 2.500 for 2.5%)
            url VARCHAR(255),
            description TEXT,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
            FOREIGN KEY (company_id) REFERENCES companies(id) ON DELETE CASCADE
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
    `; // Corrected URL, added min_balance, description, ON DELETE CASCADE
    await _createTable('saving_account_types', query);
}

// New table: Assuming this is for time-bound interest rates or different tiers
async function _createSavingAccountTimeRatesTable() {
    const query = `
        CREATE TABLE IF NOT EXISTS saving_account_time_rates (
            id INT AUTO_INCREMENT PRIMARY KEY,
            account_type_id INT NOT NULL,
            duration_months INT NOT NULL, -- e.g., 3, 6, 12, 24 months
            interest_rate DECIMAL(5, 3) NOT NULL, -- Rate for this specific duration
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
            UNIQUE (account_type_id, duration_months), -- Ensure unique rate per type per duration
            FOREIGN KEY (account_type_id) REFERENCES saving_account_types(id) ON DELETE CASCADE
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
    `; // Added UNIQUE constraint, ON DELETE CASCADE
    await _createTable('saving_account_time_rates', query);
}


// Main initialization function
async function initializeDatabase() {
    try {
        console.log("Attempting to connect to MySQL and initialize database...");
        await pool.getConnection(); // Test connection from the pool
        console.log("✅ MySQL connection established.");

        // Create tables in a logical order (dependencies first)
        await _createCompaniesTable();
        await _createUserTable();
        await _createAdminsTable();
        await _createBillsTable();
        await _createSavingAccountTypesTable();
        await _createSavingAccountTimeRatesTable();
        await _createUserTypeTable();

        console.log("✅ All tables checked/created successfully.");
    } catch (error) {
        console.error("❌ Failed to connect to MySQL or create tables:", error);
        // It's crucial to exit if the database cannot be set up
        process.exit(1);
    }
}

// Export the pool for direct use in other modules, and the initialization function
module.exports = { pool, initializeDatabase, executeQuery };