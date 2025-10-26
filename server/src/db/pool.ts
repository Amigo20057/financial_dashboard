import { Pool } from "pg";
import "dotenv/config";

export const pool = new Pool({
  host: process.env.DATABASE_HOST,
  user: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,
  port: Number(process.env.DATABASE_PORT),
});

export async function initDB() {
  try {
    await pool.connect();
    console.log("CONNECTED TO DATABASE");
  } catch (error) {
    console.log("FAILED CONNECT TO DATABASE: ", error);
    process.exit(1);
  }
}
