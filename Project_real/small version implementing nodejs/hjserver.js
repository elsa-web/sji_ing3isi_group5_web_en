const express = require('express');
const path = require('path');
const app = express();
const port = 3000;

// Log all requests for debugging
app.use((req, res, next) => {
    console.log(`${new Date().toISOString()} - ${req.method} ${req.url}`);
    next();
});

// Serve static files from the public directory
app.use(express.static(path.join(__dirname, 'public')));

// Serve your main HTML file
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'html', 'hj.html'));
});

// Start server with detailed logging
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
    console.log('Directory paths:');
    console.log('Public dir:', path.join(__dirname, 'public'));
    console.log('HTML dir:', path.join(__dirname, 'public', 'html'));
    
    // Check if the file exists
    const filePath = path.join(__dirname, 'public', 'html', 'hj.html');
    require('fs').access(filePath, (err) => {
        if (err) {
            console.error('Warning: HTML file not found at', filePath);
        } else {
            console.log('Found HTML file at', filePath);
        }
    });
});

////////TO CONNECT 2 Different COMPUTERS
// Store active hosts in server memory
let activeHosts = new Map();

// Enable JSON parsing
app.use(express.json());

// Endpoint to register a host
app.post('/api/hosts/register', (req, res) => {
    const { hostId } = req.body;
    activeHosts.set(hostId, {
        id: hostId,
        timestamp: Date.now()
    });
    res.json({ success: true });
});

// Endpoint to get all active hosts
app.get('/api/hosts', (req, res) => {
    const currentTime = Date.now();
    const activeHostsList = Array.from(activeHosts.entries())
        .filter(([_, host]) => currentTime - host.timestamp < 600000) // 10 minutes
        .map(([_, host]) => host);
    res.json(activeHostsList);
});