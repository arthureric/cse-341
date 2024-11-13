const express = require('express');
const createError = require('http-errors'); // Import http-errors for custom error handling
const mongodb = require('./data/database'); // Import MongoDB connection module
const app = express();

const swaggerUIPath = require("swagger-ui-express"); // Swagger UI for API documentation
const swaggerjsonFilePath = require("./swagger-output.json"); // Path to Swagger JSON file

// Swagger API documentation setup
app.use("/api-docs", swaggerUIPath.serve, swaggerUIPath.setup(swaggerjsonFilePath));

// Routes
app.use('/', require('./routes')); // Main route file where all routes are defined

// Catch 404 and forward to error handler using http-errors
app.use((req, res, next) => {
    next(createError(404, 'Not Found')); // Generate 404 error if route is not found
});

// Global error handler
app.use((err, req, res, next) => {
    // Set error status and message; defaults to 500 for server errors
    const statusCode = err.status || 500;
    const message = err.message || 'Internal Server Error';

    // Send JSON response with error details
    res.status(statusCode).json({
        status: statusCode,
        message: message,
    });
});

// Set port from environment variable or default to 3000
const port = process.env.PORT || 5500;

// Initialize MongoDB connection and start the server
mongodb.initDb((err) => {
    if (err) {
        console.log('Database connection error:', err); // Log error if unable to connect
        process.exit(1); // Exit the process if database connection fails
    } else {
        app.listen(port, () => {
            console.log(`Server is listening on port ${port}`); // Start the server if DB connection is successful
        });
    }
});