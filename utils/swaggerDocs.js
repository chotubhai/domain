const swaggerJsDoc = require("swagger-jsdoc");

// Extended: https://swagger.io/specification/#infoObject
const swaggerOptions = {
    swaggerDefinition: {
      info: {
        version: "1.0.0",
        title: "Customer API",
        description: "Customer API Information",
        contact: {
          name: "Amazing Developer"
        },
        // servers: ["http://localhost:5000"]
      }
    },
    // ['.routes/*.js']
    apis: ["../Routes/domain.js"]
  };
  
  const swaggerDocs = swaggerJsDoc(swaggerOptions);

  module.exports = swaggerDocs;

//   app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));