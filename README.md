# CMS Typescript

This project is a CMS (Content Management System) API built with TypeScript, designed to dynamically connect to multiple MongoDB databases based on environment variables. It simplifies handling multiple environments and databases by automatically generating API routes for each database connection.

## Key Features

- **TypeScript API**: Built using TypeScript, ensuring strong typing and enhanced code quality.
- **Environment-Based Database Connections**: Dynamically connects to multiple MongoDB databases, with one database per environment key.
- **Automatic Route Generation**: For each connected database, the API automatically serves three routes:
  - **GET**: Retrieve content from the database.
  - **POST**: Insert new content into the database.
  - **PATCH**: Edit existing content in the database.

## How It Works

1. **Environment Variables for MongoDB Connections**:
   The project uses environment variables to manage database connections. Each environment variable corresponds to a MongoDB connection string for a specific database. For example:
   ```env
   MONGO_DB_TODO=mongodb://username:password@host:port/todo
   MONGO_DB_BLOG=mongodb://username:password@host:port/blog```

2. **Dynamic Database Connections:** The API connects to each database based on the environment variable keys. For instance, MONGO_URI_TODO will connect to a database named todo, and MONGO_URI_BLOG connects to a database named blog.

3. **Automatic Route Creation**: For each connected database, three routes are automatically created:
- **GET**: /todo or /blog: Fetch content from the respective database.
- **POST**: /todo or /blog: Insert new content into the respective database.
- **PUT**: /todo or /blog: Update existing content in the respective database.

The main goal of this project is to eliminate the need for writing mocked text or objects for frontend projects. By providing a streamlined CMS API, I aim to simplify the process of editing and managing the texts or objects used in my frontend applications. This allows for quicker updates and adjustments without the hassle of manually altering code, enabling a more efficient development workflow.

