const path = require('path');
const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');
const app = express();

// Middleware to log incoming requests
app.use((req, res, next) => {
  console.log(`Incoming request: ${req.method} ${req.url}`);
  console.log('Headers:', req.headers);
  next();
});

app.options('*', (req, res) => {
  console.log('Handling preflight request:', req.url);
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Authorization, Content-Type');
  res.sendStatus(200);
});

// Serve individual OpenAPI specifications
const specs = {
  inFlight: '/openapi/services/in-flight.json',
  notam: '/openapi/services/notam.json',
  adr: '/openapi/services/adr.json',
  weather: '/openapi/services/weather.json',
  aup: '/openapi/services/aup.json',
  airport: '/openapi/services/airport.json'
};

Object.entries(specs).forEach(([key, specPath]) => {
  app.get(`/openapi/${key}`, (req, res) => {
    console.log(`Serving OpenAPI spec for ${key}`);
    res.sendFile(path.join(__dirname, specPath), (err) => {
      if (err) {
        console.error(`Error serving ${specPath}:`, err);
        res.status(500).send('Error serving OpenAPI spec');
      }
    });
  });

  app.get(`/docs/${key}`, (req, res) => {
    console.log(`Serving Swagger UI for ${key}`);
    res.send(`
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>${key} API Documentation</title>
        <link rel="stylesheet" href="/swagger-ui/swagger-ui.css">
      </head>
      <body>
        <div id="swagger-ui"></div>
        <script src="/swagger-ui/swagger-ui-bundle.js"></script>
        <script src="/swagger-ui/swagger-ui-standalone-preset.js"></script>
        <script>
          const ui = SwaggerUIBundle({
            url: '/openapi/${key}', // OpenAPI spec URL
            dom_id: '#swagger-ui',
            presets: [
              SwaggerUIBundle.presets.apis,
              SwaggerUIStandalonePreset
            ],
            layout: "StandaloneLayout",
            deepLinking: true
          });
        </script>
      </body>
      </html>
    `);
  });
});

app.use((req, res, next) => {
  console.log(`Request: ${req.method} ${req.url}`);
  next();
});

// Reverse proxy to API server
app.use('/api', createProxyMiddleware({
  target: 'https://cloud4.aero', // Replace with your API server URL
  changeOrigin: true,
  logLevel: 'debug',
  pathRewrite: {
    '^/api': '' // Removes `/api` prefix when forwarding to the target
  },
onProxyReq: (proxyReq, req) => {
  console.log('Original headers:', req.headers);

  // Forward the Authorization header
  if (req.headers.authorization) {
    proxyReq.setHeader('Authorization', req.headers.authorization);
  }
  proxyReq.removeHeader('Sec-CH-UA');
  proxyReq.removeHeader('Sec-CH-UA-Mobile');
  proxyReq.removeHeader('Sec-Fetch-Site');
  proxyReq.removeHeader('Sec-Fetch-Mode');
  proxyReq.removeHeader('Sec-Fetch-Dest');
  proxyReq.removeHeader('Referer'); // Remove referer
  proxyReq.removeHeader('Origin');  // Remove origin header
  proxyReq.removeHeader('Cookie');
  proxyReq.removeHeader('user-agent');
  proxyReq.removeHeader('accept-language');
  proxyReq.removeHeader('accept-encoding');
  proxyReq.removeHeader('sec-ch-ua-platform');
  proxyReq.removeHeader('Connection');
  proxyReq.setHeader('Accept', '*/*');

  console.log('Modified headers:', proxyReq.getHeaders());
},
  onProxyRes: (proxyRes, req, res) => {
    console.log(`Response from target received`);
    console.log('Response headers from target:', proxyRes.headers);
  },
  onError: (err, req, res) => {
    console.error('Proxy error:', err);
    res.status(500).send('Proxy error occurred');
  }
}));

// Serve Swagger UI assets
app.use('/swagger-ui', express.static(path.join(__dirname, 'node_modules/swagger-ui/dist')));

// Start the server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Swagger UI is running at:
    - In-Flight: http://localhost:${PORT}/docs/inFlight
    - NOTAM: http://localhost:${PORT}/docs/notam
    - ADR: http://localhost:${PORT}/docs/adr
    - Weather: http://localhost:${PORT}/docs/weather
    - AUP: http://localhost:${PORT}/docs/aup
    - Airport: http://localhost:${PORT}/docs/airport
    API Proxy is running at http://localhost:${PORT}/api/
  `);
});
