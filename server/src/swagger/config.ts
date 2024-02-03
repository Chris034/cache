import swaggerJsdoc from 'swagger-jsdoc'
import swaggerUi from 'swagger-ui-express'
import swaggerSchema from '../db-schema';
const options = {
    definition: {
      openapi: '3.0.0',
      info: {
        title: 'Cache API',
        version: '1.0.0',
      },
      externalDocs: {                
        description: "docs.json", 
        url: "/docs.json"         
      },
      // components: {
      //   schemas: swaggerSchema,
      // },
    },
    apis: ['./src/routes/*.ts', './src/swagger/schema/*.ts'],
  }
  const swaggerSpec = swaggerJsdoc(options)
  

function swaggerDocs(app, port) {
    // Swagger Page
    app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec))
    // Documentation in JSON format
    app.get('/docs.json', (req, res) => {
      res.setHeader('Content-Type', 'application/json')
      res.send(swaggerSpec)
    })
  }
  
  export default swaggerDocs