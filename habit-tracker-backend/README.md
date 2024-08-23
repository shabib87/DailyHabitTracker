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
    
### TODO

- `npm run migration:create` This will create an empty migration file where you can write your SQL in both UP and Down functions to either schema drop or create the schema.
- `npm run migration:generate` This will generate SQL from your entities and you can find them inside migrations folder as per data-source.ts configuration.
- `npm run migration:run` This will populate your database with the new database schema as per the migration file generated in 2, Now you have updated your database schema.
