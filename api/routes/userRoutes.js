import express from "express";
import { createUser, getUsers, findUserByEmail } from "../models/userModel.js";
import { authenticateJWT } from "../auth.js";

const router = express.Router();

router.post("/api/users", async (req, res) => {
  try {
    const user = await createUser(req.body);
    res.status(201).json(user);
  } catch (err) {
    console.error(err);
    res.status(400).json({ error: err.message });
  }
});

router.get("/api/users", authenticateJWT, async (req, res) => {
  try {
    const users = await getUsers();
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get("/api/users/me", authenticateJWT, async (req, res) => {
  try {
    const user = await findUserByEmail(req.user.email);
    if (!user) {
      return res.status(404).json({ error: "Utilisateur non trouvé" });
    }
    // Retourner l'utilisateur sans le mot de passe
    const { password, ...userWithoutPassword } = user;
    res.json(userWithoutPassword);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
