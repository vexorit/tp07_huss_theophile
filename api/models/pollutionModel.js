import pool from "../db.js";

export const getPollutions = async () => {
  const [rows] = await pool.query("SELECT * FROM pollutions");

  return rows.map((p) => ({
    ...p,
    date: p.date ? formatDate(p.date) : "1900-01-01",
  }));
};

export const getPollutionById = async (id) => {
  const [rows] = await pool.query("SELECT * FROM pollutions WHERE id = ?", [
    id,
  ]);

  if (!rows.length) return null;

  const pollution = rows[0];
  return {
    ...pollution,
    date: pollution.date ? formatDate(pollution.date) : "1900-01-01",
  };
};

export const createPollution = async (pollution) => {
  const [result] = await pool.query(
    "INSERT INTO pollutions (city, level, date, description) VALUES (?, ?, ?, ?)",
    [pollution.city, pollution.level, pollution.date, pollution.description]
  );
  return { id: result.insertId, ...pollution };
};

export const updatePollution = async (id, pollution) => {
  await pool.query(
    "UPDATE pollutions SET city=?, level=?, date=?, description=? WHERE id=?",
    [pollution.city, pollution.level, pollution.date, pollution.description, id]
  );
  return getPollutionById(id);
};

export const deletePollution = async (id) => {
  await pool.query("DELETE FROM pollutions WHERE id=?", [id]);
  return { success: true };
};

function formatDate(sqlDate) {
  try {
    const d = new Date(sqlDate);
    // Renvoie au format YYYY-MM-DD
    return d.toISOString().split("T")[0];
  } catch {
    return "1900-01-01";
  }
}
