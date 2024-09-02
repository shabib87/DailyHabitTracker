# Daily Habit Tracker Backend

## Node.js Version

This project uses Node.js version specified in the `.nvmrc` file. To ensure consistency, please use [nvm](https://github.com/nvm-sh/nvm) to manage your Node.js versions.

### Using nvm

1. **Install nvm**: Follow the installation instructions from the [nvm repository](https://github.com/nvm-sh/nvm#installing-and-updating).

2. **Use the correct Node.js version**: Run the following command in the project directory to switch to the specified Node.js version:

   ```bash
   nvm use
   ```

3. **Check Node.js version**: Ensure you are using the correct Node.js version:

   ```bash
   npm run check-node-version
   ```

4. **Install dependencies**: After switching to the correct Node.js version, install the project dependencies:

   ```bash
   npm install
   ```

## Project Setup Guide

1. **Clone the Repository**:

   ```bash
   git clone https://github.com/yourusername/daily-habit-tracker.git
   cd daily-habit-tracker/habit-tracker-backend
   ```

2. **Set Up Environment Variables**:
   Copy the `.env.sample` file to `.env` and update the values as needed:

   ```bash
   cp .env.sample .env
   ```

3. **Run Database Migrations**:
   Run the following command to set up the database schema:
   ```bash
   npm run migration:run
   ```

## How to Run the Application

1. **Start the Application**:
   Run the following command to start the application:

   ```bash
   npm start
   ```

   This will execute the `startApplication` function in `src/index.ts`, which initializes the database and starts the server.

2. **Verify the Application**:
   Open your browser and navigate to `http://localhost:3000` (or the port specified in your `.env` file) to verify that the server is running correctly.

## How to Run the Application in Development Mode

1. **Start the Application in Development Mode**:
   Run the following command to start the application in development mode:

   ```bash
   npm run start:dev
   ```

   This will run the backend server and watch for file changes to automatically restart the server when changes are detected.

## Available Scripts

- `npm run build`: Compiles the TypeScript code to JavaScript.
- `npm run start`: Starts the compiled JavaScript application.
- `npm run start:dev`: Runs the application in development mode with file watching.
- `npm run lint`: Runs ESLint to check for code quality issues.
- `npm run format`: Formats the code using Prettier.
- `npm run migration:create`: Creates an empty migration file where you can write your SQL in both UP and Down functions to either schema drop or create the schema.
- `npm run migration:generate`: Generates SQL from your entities and you can find them inside the migrations folder as per `src/config/typeorm.config.ts`.
- `npm run migration:run`: Populates your database with the new database schema as per the migration file generated.
- `npm run migration:revert`: Reverts the last executed migration.
- `npm run schema:sync`: Synchronizes the database schema with the entities.
- `npm run schema:drop`: Drops the database schema.
- `npm run typeorm:cache`: Clears the TypeORM query cache.
- `npm run check-node-version`: Checks if the correct Node.js version is being used.
