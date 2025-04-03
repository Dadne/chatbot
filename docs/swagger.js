const swaggerJsdoc = require("swagger-jsdoc");
const uuid = require('uuid')

const swaggerDefinition = {
  openapi: "3.0.0",
  info: {
    title: "API Chatbot",
    description: "This api documentation for Chatbot project",
    version: "1.0.0",
    contact: {
      name: "Dadne Fernanda Cruz Huerta",
      email: "dadnehuerta@gmail.com",
    },
  },
  servers: [
    {
      description: "Development chatbot",
    },
  ],
  components: {
    schemas: {
      chatbot: {
        type: "object",
        required: ["message"],
        properties: {
          conversation_id: {
            type: "string",
            example:uuid.v4()
          },
          message: {
            type: "string",
            description: "user menssage",
            example: "Start a debate on my favorite topic...",
          },
        },
      },
    }
  },
};

const options = {
  swaggerDefinition,
  apis: ["./routes/*.js"],
};


const openapiSpecification = swaggerJsdoc(options);
module.exports = openapiSpecification;
