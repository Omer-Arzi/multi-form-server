import mysql from "mysql2/promise";
import fs from "fs";
import dotenv from "dotenv";

dotenv.config();

const MAX_RETRIES = 5; // number of times to retry MySQL connection
const RETRY_DELAY = 5000; // delay between retries

const runMigrations = async () => {
  let retries = 0;
  while (retries < MAX_RETRIES) {
    try {
      console.log(`Attempting to connect to MySQL (Try: ${retries + 1})`);
      const connection = await mysql.createConnection({
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
        multipleStatements: true,
      });

      console.log("Connected to MySQL. Running migrations...");

      // Run schema.sql
      const schemaSQL = fs.readFileSync("database/schema.sql", "utf8");
      await connection.query(schemaSQL);
      console.log("Database schema created.");

      // Run seed.sql
      const seedSQL = fs.readFileSync("database/seed.sql", "utf8");
      await connection.query(seedSQL);
      console.log("Initial data inserted.");

      await connection.end();
      console.log("Database setup complete.");
      return;
    } catch (error) {
      console.error("MySQL not ready yet, retrying...", error);
      retries++;
      await new Promise((res) => setTimeout(res, RETRY_DELAY));
    }
  }
  console.error("Failed to connect to MySQL after multiple attempts.");
};

// Run the migration script
runMigrations();
