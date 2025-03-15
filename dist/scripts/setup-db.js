"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const promise_1 = __importDefault(require("mysql2/promise"));
const fs_1 = __importDefault(require("fs"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const runMigrations = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log("🔍 Connecting to MySQL with:");
        console.log(`Host: ${process.env.DB_HOST}, User: ${process.env.DB_USER}, Port: ${process.env.DB_PORT}`);
        const connection = yield promise_1.default.createConnection({
            host: process.env.DB_HOST,
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            port: Number(process.env.DB_PORT) || 3307,
            multipleStatements: true,
        });
        console.log("✅ Connected to MySQL. Creating database if not exists...");
        // ✅ Ensure the database exists before using it
        yield connection.query(`CREATE DATABASE IF NOT EXISTS ${process.env.DB_NAME}`);
        yield connection.query(`USE ${process.env.DB_NAME}`);
        console.log("✅ Database selected. Running migrations...");
        // ✅ Read and execute schema.sql
        const schemaSQL = fs_1.default.readFileSync("database/schema.sql", "utf8");
        yield connection.query(schemaSQL);
        console.log("✅ Database schema created.");
        // ✅ Read and execute seed.sql
        const seedSQL = fs_1.default.readFileSync("database/seed.sql", "utf8");
        yield connection.query(seedSQL);
        console.log("✅ Initial data inserted.");
        yield connection.end();
        console.log("✅ Database setup complete.");
    }
    catch (error) {
        console.error("❌ Error setting up database:", error);
    }
});
// Run the function
runMigrations();
