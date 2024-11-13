const dotenv = require('dotenv'); // Load environment variables from .env file
dotenv.config(); // Initialize dotenv to read .env file

const MongoClient = require(`mongodb`).MongoClient; // Import MongoDB client


// Log MongoDB URI to verify environment variable is correctly loaded (useful for debugging)
console.log('MONGODB_URI:', process.env.MONGODB_URI); 

let database; // Variable to store the database instance

// Initialize the database connection
const initDb = (callback) => {
    if (database) {
        // If already initialized, log and return the database instance via callback
        console.log('DB is already initialized!');
        return callback(null, database);
    }
    // Connect to MongoDB using the URI from environment variables
    MongoClient.connect(process.env.MONGODB_URI)
    .then((client) => {
        database = client; // Store the database client instance
        callback(null, database); // Return the database instance via callback
    })
    .catch((err) => {
        callback(err); // Pass any connection errors to the callback
    });
};

// Retrieve the initialized database instance
const getDatabase = () => {
    if (!database) {
        throw Error('Database not initialized'); // Throw an error if DB is not initialized
    }
    return database; // Return the database instance
};

// Export functions to initialize and retrieve the database
module.exports = { initDb, getDatabase };