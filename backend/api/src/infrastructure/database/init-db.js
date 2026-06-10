"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const db_1 = require("./db");
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
async function initDB() {
    try {
        const sqlPath = path_1.default.join(__dirname, "init.sql");
        const sql = fs_1.default.readFileSync(sqlPath, "utf8");
        console.log("Conectando a la base de datos...");
        await db_1.pool.query(sql);
        console.log("✅ Tablas inicializadas correctamente.");
    }
    catch (err) {
        console.error("❌ Error inicializando la base de datos:", err);
    }
    finally {
        db_1.pool.end();
    }
}
initDB();
