import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'My Drive API',
            version: '1.0.0',
            description: 'API for My Drive - File storage and management system',
        },
        servers: [
            {
                url: 'http://localhost:3001',
                description: 'Development server',
            },
        ],
        components: {
            securitySchemes: {
                bearerAuth: {
                    type: 'http',
                    scheme: 'bearer',
                    bearerFormat: 'JWT',
                },
            },
        },
        security: [
            {
                bearerAuth: [],
            },
        ],
    },
    apis: ['./routes/*.js'],
};

const specs = swaggerJSDoc(options);

export const swaggerDocs = (app) => {
    app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));
    console.log(`Docs available at http://localhost:3001/api-docs`);
}