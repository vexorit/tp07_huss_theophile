import { configDotenv } from "dotenv";
import mysql from "mysql2/promise";
configDotenv();

const connectionString =
  process.env.DATABASE_URL ||
  "mysql://root:password@localhost:3306/pollution_db";

const pool = mysql.createPool(connectionString);

(async () => {
  const conn = await pool.getConnection();
  await conn.query(`
    CREATE TABLE IF NOT EXISTS users (
      id INT AUTO_INCREMENT PRIMARY KEY,
      nom VARCHAR(100),
      prenom VARCHAR(100),
      email VARCHAR(150) UNIQUE,
      password VARCHAR(255),
      pseudo VARCHAR(100)
    );
  `);

  await conn.query(`
    CREATE TABLE IF NOT EXISTS pollutions (
      id INT AUTO_INCREMENT PRIMARY KEY,
      city VARCHAR(100),
      level INT,
      date DATE,
      description TEXT
    );
  `);

  conn.release();
})();

export default pool;
