# Marketplace API

Welcome to the Marketplace API documentation. This API provides functionalities to create and manage a marketplace similar to Ebay or Amazon.

## Features

- List products.
- Search products.
- View product detail.
- Add products to the shopping cart.
- View shopping cart detail.
- Remove products from the shopping cart.
- Display products by category.

## Technologies Used

- Node.js
- TypeScript
- NestJS
- Prisma (ORM)
- MySQL

## Installation

1. Clone this repository.
2. Install dependencies using `npm install`.
3. Set up environment variables in a `.env` file.
4. Run the server locally using `npm start`.

## API Endpoints

- **GET /marketplace/all-products**
  - Lists all available products.
- **GET /marketplace/search-product-with-code?productCode=CODE**
  - Searches for a product by its code.
- **GET /marketplace/search-product-detail-with-code?productCode=CODE**
  - Searches for the detail of a product by its code.
- **GET /marketplace/search-products-by-category-code?categoryCode=CODE**
  - Lists all products in a category.
- **GET /marketplace/detail-shopping-cart**
  - Gets the detail of the shopping cart.
- **POST /marketplace/add-product-shopping-cart**
  - Adds a product to the shopping cart.
- **DELETE /marketplace/delete-product-shopping-cart?productCode=CODE**
  - Deletes a product from the shopping cart.

## Usage

1. Make a request to any of the specified endpoints above.
2. You will receive a response with the requested information or an error message if applicable.
3. Import the provided Insomnia file located at [insomnia_requests.json](docs/Insomnia_2024-02-28.json) to consume the API endpoints easily.

## Running the Service

- The service is running on port 8080.
- Access the Swagger documentation at [http://localhost:8080/docs](http://localhost:8080/docs).

## Contribution

If you wish to contribute to this project, please follow these steps:

1. Fork the repository.
2. Create a new branch (`git checkout -b feature/feature-name`).
3. Make your changes and commit them (`git commit -am 'Add new feature'`).
4. Push your changes to the remote repository (`git push origin feature/feature-name`).
5. Create a new pull request.

## Author

- Name: Claiderman Alexander Lozano Cardona
- Email: lozanocardona200938@gmail.com

## Guides

- YouTube
  - @FaztCode
  - @codrrdev
  - @marluanespiritusanto8458
- ChatGPT3.5

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
