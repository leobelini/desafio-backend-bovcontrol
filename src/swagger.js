import swaggerJsDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'BovControl API',
      version: '1.0.0',
      description: 'Desafio BovControl',
    },
    servers: [
      {
        url: 'http://localhost:4000/api',
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT', // Opcional, mas pode especificar JWT como o formato do token
        },
      },
    },
    security: [
      {
        bearerAuth: [], // Aplica o Bearer Token globalmente
      },
    ],
  },
  apis: ['./src/swagger/*.js'],
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);

export { swaggerDocs, swaggerUi };
