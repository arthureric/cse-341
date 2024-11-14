// Import swagger-autogen and initialize it 
const swaggerAutogen = require('swagger-autogen')();

const doc = {
  info: {
    title: 'Contacts API',            // Title for the API documentation
    description: 'API for managing contacts', // Description of the API
  },
  host: 'localhost:3000',             // API host
  schemes: ['http'],                  // Scheme (http/https) to use
};

const outputFile = './swagger-output.json';         // Path to save generated Swagger file
const routes = ['./routes/index.js', './routes/users.js']; // Include paths to all route files

// Generate swagger-output.json file based on the routes and doc configuration
swaggerAutogen(outputFile, routes, doc).then(() => {
  // This callback is optional, and can be used to confirm Swagger generation
  console.log('Swagger documentation generated successfully');
});