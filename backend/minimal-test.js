console.log('Starting minimal test server...');

const http = require('http');

const server = http.createServer((req, res) => {
    res.writeHead(200, {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': 'http://localhost:3000',
        'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Allow-Credentials': 'true'
    });
    
    if (req.method === 'OPTIONS') {
        res.end();
        return;
    }
    
    res.end(JSON.stringify({ 
        message: 'Minimal test server is running!',
        timestamp: new Date().toISOString()
    }));
});

const PORT = 5002;

server.listen(PORT, () => {
    console.log(`✅ Minimal test server running on http://localhost:${PORT}`);
});

server.on('error', (err) => {
    console.error('❌ Server error:', err);
});
