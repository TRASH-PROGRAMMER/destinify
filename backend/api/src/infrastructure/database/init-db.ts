import { pool } from "./db";
import fs from "fs";
import path from "path";

async function initDB() {
  try {
    const sqlPath = path.join(__dirname, "init.sql");
    const sql = fs.readFileSync(sqlPath, "utf8");
    
    console.log("Conectando a la base de datos...");
    await pool.query(sql);
    console.log("✅ Tablas inicializadas correctamente.");
  } catch (err) {
    console.error("❌ Error inicializando la base de datos:", err);
  } finally {
    pool.end();
  }
}

initDB();
