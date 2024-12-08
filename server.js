// Initialize an empty JavaScript object to serve as a data storage endpoint
let weatherData = {};

// Import Express to set up the server and handle routes
const express = require('express');

// Required Dependencies
const bodyParser = require('body-parser');

// Create an instance of the Express application
const app = express();

// Middleware Configuration
// Configure Express to use the body-parser middleware for parsing URL-encoded and JSON data
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Enable Cross-Origin Resource Sharing (CORS) for handling requests from other domains
const cors = require('cors');
app.use(cors());

// Serve static files from the "website" directory
app.use(express.static('website'));

// POST route to handle incoming weather data
app.post('/addData', (req, res) => {
    // Save data in the weatherData object
    weatherData['temperature'] = req.body.temp;
    weatherData['dateRecorded'] = req.body.date;
    weatherData['userFeeling'] = req.body.content;
    console.log("Data saved:", weatherData);
    res.send(weatherData); // Send back the saved data as a response
});

// GET route to retrieve stored weather data
app.get('/fetchAll', (req, res) => {
    res.send(weatherData); // Return the stored data
});

// Set up the server to listen on a specified port
const serverPort = 8080;
const server = app.listen(serverPort, () => {
    console.log(`Server is running on port: ${serverPort}`);
});
