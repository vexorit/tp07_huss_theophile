import express from "express";
import {
  getPollutions,
  getPollutionById,
  createPollution,
  updatePollution,
  deletePollution,
} from "../models/pollutionModel.js";
import { authenticateJWT } from "../auth.js";

const router = express.Router();

router.get("/api/pollutions", async (req, res) => {
  try {
    const data = await getPollutions();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get("/api/pollutions/:id", async (req, res) => {
  try {
    const pollution = await getPollutionById(req.params.id);
    pollution
      ? res.json(pollution)
      : res.status(404).json({ error: "Pollution non trouvée" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post("/api/pollutions", authenticateJWT, async (req, res) => {
  try {
    const pollution = await createPollution(req.body);
    res.status(201).json(pollution);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.put("/api/pollutions/:id", authenticateJWT, async (req, res) => {
  try {
    const pollution = await updatePollution(req.params.id, req.body);
    res.json(pollution);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.delete("/api/pollutions/:id", authenticateJWT, async (req, res) => {
  try {
    await deletePollution(req.params.id);
    res.json({ success: true });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

export default router;
