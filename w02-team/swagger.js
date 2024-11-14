const swaggerAutogen = require('swagger-autogen')();

const doc = {
    info: {
        title: 'My Temple API',
        description: 'Temple API',
    },
    host: 'localhost:8080',
    schemes: ['http'],
}

const outputFile = './swagger.json';
const endpointsFile = ['./routes/index.js'];

swaggerAutogen(outputFile, endpointsFile, doc);