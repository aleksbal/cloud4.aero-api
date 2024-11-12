# Cloud4.aero API Specification

This repository contains the OpenAPI 3.1 specification for the **Cloud4.aero API**, which provides endpoints for retrieving in-flight data, flight plans, airport data, and environmental information.

## Table of Contents
- [Overview](#overview)
- [Getting Started](#getting-started)
- [Project Structure](#project-structure)
- [Usage](#usage)
- [Testing and Validation](#testing-and-validation)
- [Generating Documentation](#generating-documentation)
- [Contributing](#contributing)
- [Resources](#resources)

## Overview

The Cloud4.aero In-Flight API enables clients to retrieve various data sets about flights, including match services, flight details, environment services, and airport data. The API specification follows the OpenAPI 3.1 format, which is compatible with tools like Swagger and Redoc for generating interactive documentation.

### Key Endpoints
- **Match Services**: Retrieve flight data based on matching criteria.
- **Flight Details**: Access detailed flight information by flight ID.
- **Environment Services**: Obtain information about the environment surrounding a flight.
- **Airport Services**: Fetch airport data as a GeoJSON FeatureCollection.

## Getting Started

### Prerequisites
- **OpenAPI Generator** (optional): For generating client SDKs.
- **Spectral**: For OpenAPI linting and validation.
- **Redoc** or **Swagger UI**: For generating HTML documentation.

### Installation
Clone the repository and navigate to the project directory:
```bash
git clone https://github.com/yourusername/cloud4-aero-api-spec.git
cd cloud4-aero-api-spec
```
### Project Structure
```bash
├── openapi/                 # Directory containing the OpenAPI specification files
│   ├── openapi.yaml         # Main OpenAPI 3.1 file
│   ├── schemas/             # Reusable schema components
│   ├── examples/            # Example requests and responses
│   └── paths/               # Endpoint definitions (optional)
├── docs/                    # Auto-generated documentation
├── scripts/                 # Utility scripts for generating docs, linting, etc.
└── .github/workflows/       # GitHub Actions for CI/CD
```
## Usage
Browse the OpenAPI Spec
The main OpenAPI specification is located in openapi/openapi.yaml. You can view it locally with Swagger UI, Redoc, or other compatible tools.

Generate Client SDKs
Use the OpenAPI Generator to generate client SDKs in various programming languages:

```bash
openapi-generator-cli generate -i openapi/openapi.yaml -g <language> -o ./generated/<language>
```
View the API Documentation
To view the API documentation locally:

```bash
npx redoc-cli bundle openapi/openapi.yaml -o docs/index.html
```
Alternatively, host it on GitHub Pages.

## Testing and Validation
Linting the OpenAPI Specification
Use Spectral to lint the OpenAPI specification:

```bash
npx spectral lint openapi/openapi.yaml
```
### Validate the OpenAPI Spec
Use the OpenAPI CLI or Swagger CLI to validate the specification:

```bash
npx @openapitools/openapi-cli validate openapi/openapi.yaml
```
## Generating Documentation
To generate HTML documentation with Redoc:

```bash
npx redoc-cli bundle openapi/openapi.yaml -o docs/index.html
```
Or, with Swagger UI:

```bash
swagger-cli bundle -o docs/index.html openapi/openapi.yaml
```

## Contributing
### How to Contribute
Fork the repository and create a new branch.
Make your changes, following the project structure and guidelines.
Run tests and validation before submitting.
Submit a pull request with a summary of changes.
Guidelines
Follow OpenAPI 3.1 standards.
Maintain consistency in naming and descriptions.
Update relevant examples if adding new schemas or endpoints.

## Resources
- OpenAPI Specification: https://spec.openapis.org/oas/v3.1.0
- OpenAPI Generator: https://openapi-generator.tech/
- Redoc: https://github.com/Redocly/redoc
- Swagger UI: https://swagger.io/tools/swagger-ui/
- Spectral Linter: https://stoplight.io/open-source/spectral/
