export const options = {
  swaggerDefinition: {
    openapi: '3.0.0',
    info: {
      title: 'Kiosk API',
      version: '1.0.0',
      description: 'Kiosk API receipt',
    },
    servers: [
      {
        url: 'http://localhost:3000',
      },
    ],
  },
  apis: ['src/**/*.js'],
};
