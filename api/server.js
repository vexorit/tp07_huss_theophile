import express from "express";
import https from "https";
import http from "http";
import fs from "fs";
import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";
import userRoutes from "./routes/userRoutes.js";
import pollutionRoutes from "./routes/pollutionRoutes.js";
import authRoutes from "./routes/authRoutes.js";

// Charger les variables d'environnement
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

const credentials = null;
if(PORT!= 3000){
  const privateKey = fs.readFileSync(process.env.SSL_PRIVKEY, "utf8");
  const certificate = fs.readFileSync(process.env.SSL_FULLCHAIN, "utf8");
  credentials = { key: privateKey, cert: certificate };
}

app.use(cors());
app.use(bodyParser.json());

app.use(authRoutes);
app.use(userRoutes);
app.use(pollutionRoutes);

app.get("/", (req, res) => {
  res.send("🌍 API Pollution & Users (MariaDB) est en ligne !");
});

if(PORT== 3000){
  const httpServer = http.createServer(app);
  httpServer.listen(PORT, () => {
    console.log(
      `✅ Serveur HTTP en écoute sur http://localhost:${PORT}`
    );
  });
}
else {
  const httpsServer = https.createServer(credentials, app);

  httpsServer.listen(PORT, () => {
    console.log(
      `✅ Serveur HTTPS en écoute sur https://klebert-host.com:${PORT}`
    );
  });
}
