// src/config/database.ts
import { Options } from "sequelize";
import dotenv from "dotenv";

dotenv.config(); // Optional: if you use a .env file for credentials

interface DbConfig {
  development: Options;
  test: Options;
  production: Options;
}

const commonConfig: Partial<Options> = {
  dialect: "postgres", // or 'mysql', 'sqlite', 'mssql'
  // logging: console.log, // Uncomment to see SQL queries
  define: {
    timestamps: true, // Automatically adds createdAt and updatedAt fields
    underscored: true, // Uses snake_case for automatically added attributes
    // freezeTableName: true, // Prevents Sequelize from pluralizing table names
  },
};

const config: DbConfig = {
  development: {
    ...commonConfig,
    username: process.env.DB_USERNAME || "your_db_user",
    password: process.env.DB_PASSWORD || "your_db_password",
    database: process.env.DB_NAME || "your_db_name_dev",
    host: process.env.DB_HOST || "localhost",
  },
  test: {
    ...commonConfig,
    username: process.env.DB_TEST_USERNAME || "your_db_user_test",
    password: process.env.DB_TEST_PASSWORD || "your_db_password_test",
    database: process.env.DB_TEST_NAME || "your_db_name_test",
    host: process.env.DB_TEST_HOST || "localhost",
    logging: false, // Usually disable logging for tests
  },
  production: {
    ...commonConfig,
    username: process.env.DB_PROD_USERNAME!,
    password: process.env.DB_PROD_PASSWORD!,
    database: process.env.DB_PROD_NAME!,
    host: process.env.DB_PROD_HOST!,
    logging: false, // Usually disable logging for production
    // dialectOptions: { // Example for PostgreSQL SSL
    //   ssl: {
    //     require: true,
    //     rejectUnauthorized: false
    //   }
    // }
  },
};

export default config; // Use export default for ES module compatibility
