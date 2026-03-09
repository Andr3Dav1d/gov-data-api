import swaggerJSDoc from "swagger-jsdoc";

export const swaggerSpec = swaggerJSDoc({

  definition: {

    openapi: "3.0.0",

    info: {
      title: "Gov Data API (BrasilAPI Proxy)",
      version: "1.0.0",
      description: "API pública consumindo dados da BrasilAPI"
    }

  },

  apis: ["./src/routes/*.js"]

});
