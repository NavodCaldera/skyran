// Mock database for demonstration purposes
const bcrypt = require('bcrypt');

// In-memory storage
let users = [];
let userProfiles = [];
let sessions = {};

// Mock database functions
async function executeQuery(query, params = []) {
    console.log(`🔍 Mock Query: ${query}`);
    console.log(`📝 Params:`, params);

    // Handle different query types
    if (query.includes('INSERT INTO users')) {
        const [first_name, last_name, email, password, birthday] = params;
        const newUser = {
            id: users.length + 1,
            first_name,
            last_name,
            email,
            password,
            birthday,
            created_at: new Date()
        };
        users.push(newUser);
        return { insertId: newUser.id };
    }

    if (query.includes('INSERT INTO user_profiles')) {
        const [user_id] = params;
        const newProfile = {
            id: userProfiles.length + 1,
            user_id,
            is_profile_complete: false,
            created_at: new Date()
        };
        userProfiles.push(newProfile);
        return { insertId: newProfile.id };
    }

    if (query.includes('SELECT') && query.includes('users') && query.includes('email')) {
        const [email] = params;
        const user = users.find(u => u.email === email);
        if (user) {
            const profile = userProfiles.find(p => p.user_id === user.id);
            return [{
                ...user,
                is_profile_complete: profile?.is_profile_complete || false,
                investment_experience: profile?.investment_experience || null,
                risk_tolerance: profile?.risk_tolerance || null
            }];
        }
        return [];
    }

    if (query.includes('SELECT id FROM users WHERE email')) {
        const [email] = params;
        const user = users.find(u => u.email === email);
        return user ? [{ id: user.id }] : [];
    }

    return [];
}

async function initializeDatabase() {
    console.log("✅ Mock database initialized successfully.");
    
    // Add a demo user for testing
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

    console.log("✅ Demo user created: demo@skyran.com / demo123");
}

// Mock pool object
const pool = {
    getConnection: async () => ({
        execute: executeQuery,
        release: () => {}
    })
};

module.exports = { pool, initializeDatabase, executeQuery };
