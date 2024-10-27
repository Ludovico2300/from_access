require("dotenv").config(); // Carica le variabili d'ambiente dal file .env

const express = require("express");
const bodyParser = require("body-parser");
const userRoutes = require("./routes/userRoutes");
const db = require("./database/db");

const app = express();
const port = process.env.PORT || 3000;

// Middleware per il parsing del corpo della richiesta
app.use(bodyParser.json());

// Rotte
app.use("/users", userRoutes);

// Chiudi la connessione quando il server viene fermato
process.on("SIGINT", async () => {
  await db.close();
  console.log("Connessione al database chiusa.");
  process.exit(0);
});

// Avvia il server Node.js
app.listen(port, () => {
  console.log(`Server in esecuzione su http://localhost:${port}`);
});
