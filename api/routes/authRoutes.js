import express from "express";
import { login } from "../auth.js";

const router = express.Router();

// Route de login publique
router.post("/api/auth/login", login);

export default router;