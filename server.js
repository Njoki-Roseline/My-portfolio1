const express = require('express');
const path = require('path');
const app = express();
const port = 3001; // Changed to 3001 to avoid conflicts

// Serve static files from the current directory
const publicPath = path.join(__dirname);
console.log('Serving files from:', publicPath);
app.use(express.static(publicPath));

// Route for the root URL
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Start the server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
    console.log(`Serving files from: ${__dirname}`);
});
