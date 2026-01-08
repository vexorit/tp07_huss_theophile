import pool from "../db.js";
import bcrypt from "bcryptjs";

export const createUser = async (user) => {
  const hashedPassword = await bcrypt.hash(user.password, 10);
  const [result] = await pool.query(
    "INSERT INTO users (nom, prenom, email, password, pseudo) VALUES (?, ?, ?, ?, ?)",
    [user.nom, user.prenom, user.email, hashedPassword, user.pseudo]
  );
  return { id: result.insertId, ...user, password: undefined };
};

export const getUsers = async () => {
  const [rows] = await pool.query(
    "SELECT id, nom, prenom, email, pseudo FROM users"
  );
  return rows;
};

export const findUserByEmail = async (email) => {
  const [rows] = await pool.query(
    "SELECT id, nom, prenom, email, password, pseudo FROM users WHERE email = ?",
    [email]
  );
  return rows[0];
};

export const verifyPassword = async (plainPassword, hashedPassword) => {
  return await bcrypt.compare(plainPassword, hashedPassword);
};