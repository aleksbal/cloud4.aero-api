const path = require('path');
const express = require('express');
const app = express();

// Serve Swagger UI assets
app.use('/swagger-ui', express.static(path.join(__dirname, 'node_modules/swagger-ui/dist')));

// Serve OpenAPI spec
app.get('/openapi.json', (req, res) => {
  res.sendFile(path.join(__dirname, 'openapi/services/in-flight.json'));
});

// Serve Swagger UI interface
app.get('/', (req, res) => {
  res.send(`
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Swagger UI</title>
      <link rel="stylesheet" href="/swagger-ui/swagger-ui.css">
    </head>
    <body>
      <div id="swagger-ui"></div>
      <script src="/swagger-ui/swagger-ui-bundle.js"></script>
      <script src="/swagger-ui/swagger-ui-standalone-preset.js"></script>
      <script>
        const ui = SwaggerUIBundle({
          url: '/openapi.json', // The OpenAPI spec file served from the server
          dom_id: '#swagger-ui',
          presets: [
            SwaggerUIBundle.presets.apis,
            SwaggerUIStandalonePreset
          ],
          layout: "StandaloneLayout"
        });
      </script>
    </body>
    </html>
  `);
});

// Start the server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Swagger UI is running at http://localhost:${PORT}`);
});
