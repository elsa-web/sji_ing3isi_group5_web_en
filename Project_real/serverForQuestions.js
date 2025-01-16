/**
require('express'): Loads the Express framework, which simplifies creating a web server.
require('path'): Loads the Path module, which is used to work with file and directory paths.
require('fs').promises: Loads the File System (fs) module, enabling file handling in an asynchronous way using promises (e.g., fs.readFile, fs.access).
 */
const express = require('express');
const path = require('path');
const fs = require('fs').promises;

/**
const app = express();: Initializes an Express application. This is the main object used to define routes, middleware, and server functionality.
const PORT = 3000;: Sets the port number where your server will listen for requests (in this case, port 3000).
 */
const app = express();
const PORT = 4000;

/**
app.use: Adds middleware to the server. Middleware is a function that runs during the request/response cycle.
req.method: The HTTP method (e.g., GET, POST).
req.path: The URL path of the request.
next(): Tells Express to move on to the next middleware or route handler. Without this, the server would "hang.
 */

// Middleware to log requests - helpful for debugging
app.use((req, res, next) => {
    console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
    next();
});

/**
express.static: Serves static files (e.g., HTML, CSS, JavaScript) from the specified directory.
path.join(__dirname, 'public'): Combines the current directory (__dirname) with the public folder to form the path where static files are stored.
 */

// Serve static files from the public directory
// This will now look for files in the correct structure
app.use(express.static(path.join(__dirname, 'public')));

/**
1. app.get('/api/questions'):
Creates an API endpoint at /api/questions.
Responds to HTTP GET requests.

2. await fs.access(questionsPath);:
Checks if the file exists.
If the file does not exist, an error is thrown, and a 404 Not Found response is sent

3. await fs.readFile(questionsPath, 'utf8');:
Reads the file content.
JSON.parse(questionsData): Converts the file content (string) into a JavaScript object.
 */

// API endpoint for questions
app.get('/api/questions', async (req, res) => {
    try {
        const category = req.query.category;
        console.log('Requested category:', category);

        if (!category) {
            return res.status(400).json({
                error: 'Category is required',
                message: 'Please provide a category parameter'
            });
        }

        // Validate category against allowed list
        const allowedCategories = ['history', 'geography', 'music', 'economics', 'computer', 'football'];
        if (!allowedCategories.includes(category)) {
            return res.status(400).json({
                error: 'Invalid category',
                message: `Category must be one of: ${allowedCategories.join(', ')}`
            });
        }

        const questionsPath = path.join(__dirname, 'json', `${category}.json`);
        
        try {
            await fs.access(questionsPath);
        } catch (error) {
            console.error(`File not found: ${questionsPath}`);
            return res.status(404).json({
                error: 'Questions not found',
                message: `No questions file found for category: ${category}`
            });
        }

        const questionsData = await fs.readFile(questionsPath, 'utf8');
        const questions = JSON.parse(questionsData);
        res.json(questions);

    } catch (error) {
        console.error('Server error:', error);
        res.status(500).json({
            error: 'Server error',
            message: 'An error occurred while processing your request'
        });
    }
});

/**
app.get('/'): Handles requests to the root URL (/).
res.sendFile: Sends the q1.html file from the public/html directory as a response.
 */

// Serve your q1.html as the main page
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'html', 'q1.html'));
});


/**
This handles any request not explicitly defined (e.g., /random).
If the path does not include a file extension (e.g., .js, .css), it serves the q1.html page.
If it includes a file extension, it responds with a 404 Not Found
 */
// Catch-all route for handling other routes
app.get('*', (req, res) => {
    if (!req.path.includes('.')) {
        res.sendFile(path.join(__dirname, 'public', 'html', 'q1.html'));
    } else {
        res.status(404).send('File not found');
    }
});

// Start server with informative logging
app.listen(PORT, () => {
    console.log(`Server started at ${new Date().toISOString()}`);
    console.log(`Server is running on http://localhost:${PORT}`);
    console.log('\nServer directories:');
    console.log('- Public directory:', path.join(__dirname, 'public'));
    console.log('- HTML directory:', path.join(__dirname, 'public', 'html'));
    console.log('- Data directory:', path.join(__dirname, 'data'));
    
    // Verify file existence
    const htmlPath = path.join(__dirname, 'public', 'html', 'q1.html');
    fs.access(htmlPath)
        .then(() => console.log('\nConfirmed: q1.html exists at', htmlPath))
        .catch(() => console.error('\nWarning: q1.html not found at', htmlPath));
});