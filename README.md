# Movie Management System (Backend)

## Overview
This project is a robust Movie Management System backend built with Spring Boot. While the frontend is still under development, the system provides a comprehensive API that can be tested and explored using the provided Postman collections.

## Features

### Admin Dashboard
- User Authentication (JWT-based)
- Movie Management (CRUD operations)
- Paginated movie listings

### User Dashboard
- Secure user authentication
- Browse complete movie catalog
- Detailed movie information view
- Paginated movie listings

### Technical Features
- Role-based Access Control (Admin/User)
- Database versioning with Liquibase
- RESTful API architecture

## Tech Stack
- Java 17 or higher
- Spring Boot
- Angular 16+ (Frontend - Under Development)
- PostgreSQL Database
- Liquibase for database migrations
- Maven
- Docker
- Postman (for testing APIs)

## Database Setup
1. Start the PostgreSQL database using Docker:
```bash
docker run --name movie-db -e POSTGRES_DB=moviedb -e POSTGRES_USER=postgres -e POSTGRES_PASSWORD=postgres -p 5432:5432 -d postgres:latest
```

## Project Setup
1. Clone the repository:
```bash
git clone https://github.com/yourusername/fawry-movie-database.git
cd fawry-movie-database
```

2. Navigate to the backend directory:
```bash
cd movie-management-backend
```

3. Build the project:
```bash
mvn clean install
```

4. Run the application:
```bash
mvn spring-boot:run
```

The server will start on `http://localhost:8080`

## API Testing with Postman
1. Import the Postman collection from:
```
movie-management-backend/postman/Movie_Management_API.postman_collection.json
```

2. The collection includes:
   - Authentication workflows
   - Movie management operations
   - Pagination support

## API Endpoints

### Authentication
- POST `/api/auth/register` - Register new user
  - Required fields: email, password, firstName, lastName
- POST `/api/auth/login` - Login user
  - Required fields: email, password
  - Returns: JWT token and user details

### Movie Operations
- GET `/api/movies` - List all movies (with pagination)
  - Query params: page, size, sort
  - Returns: Paginated movie list
- GET `/api/movies/{id}` - Get movie details
  - Returns: Complete movie information
- POST `/api/movies` - Add new movie
  - Required fields: title, description, releaseYear, genre, director, rating
- PUT `/api/movies/{id}` - Update movie
  - Required fields: same as POST
- DELETE `/api/movies/{id}` - Delete movie

## Database Management
- Liquibase manages database schema versioning
- Automatic schema updates during deployment
- Version-controlled database changes
- Rollback capability for database migrations

## Frontend Status
The frontend is currently under development using Angular 16+. In the meantime, you can:
1. Use the Postman collection to test all API endpoints
2. Watch the demo video for a walkthrough of the API functionality
3. Use the API documentation to integrate with your own frontend

## Security
- JWT-based authentication
- Role-based access control (USER, ADMIN roles)
- Secure password hashing
- Input validation

## Database Schema
The system uses PostgreSQL with the following main tables:
- users (id, email, password, firstName, lastName, roles)
- movies (id, title, description, releaseYear, genre, director, rating)

## Error Handling
- Standardized error responses
- Detailed validation messages
- Global exception handling

## License
This project is licensed under the MIT License - see the LICENSE file for details.