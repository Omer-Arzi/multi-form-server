import mysql from "mysql2/promise";
import fs from "fs";
import dotenv from "dotenv";

dotenv.config();

const runMigrations = async () => {
  try {
    console.log("🔍 Connecting to MySQL with:");
    console.log(
      `Host: ${process.env.DB_HOST}, User: ${process.env.DB_USER}, Port: ${process.env.DB_PORT}`
    );

    const connection = await mysql.createConnection({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      port: Number(process.env.DB_PORT) || 3306,
      multipleStatements: true,
    });

    console.log("✅ Connected to MySQL. Creating database if not exists...");

    // ✅ Ensure the database exists before using it
    await connection.query(
      `CREATE DATABASE IF NOT EXISTS ${process.env.DB_NAME}`
    );
    await connection.query(`USE ${process.env.DB_NAME}`);

    console.log("✅ Database selected. Running migrations...");

    // ✅ Read and execute schema.sql
    const schemaSQL = fs.readFileSync("database/schema.sql", "utf8");
    await connection.query(schemaSQL);
    console.log("✅ Database schema created.");

    // ✅ Read and execute seed.sql
    const seedSQL = fs.readFileSync("database/seed.sql", "utf8");
    await connection.query(seedSQL);
    console.log("✅ Initial data inserted.");

    await connection.end();
    console.log("✅ Database setup complete.");
  } catch (error) {
    console.error("❌ Error setting up database:", error);
  }
};

// Run the function
runMigrations();
