const { spawn } = require('child_process');
const path = require('path');

console.log('🚀 Starting Skyran Backend and Frontend Servers...');

// Start backend server
const backendPath = path.join(__dirname, 'backend');
const backend = spawn('node', ['test-auth.js'], {
    cwd: backendPath,
    stdio: 'inherit'
});

backend.on('error', (err) => {
    console.error('❌ Backend server error:', err);
});

backend.on('close', (code) => {
    console.log(`Backend server exited with code ${code}`);
});

console.log('✅ Backend server starting on port 5000...');
console.log('✅ Frontend server already running on port 3000...');
console.log('\n📋 Available URLs:');
console.log('   Frontend: http://localhost:3000');
console.log('   Backend API: http://localhost:5000');
console.log('   Backend Demo: http://localhost:5000');
