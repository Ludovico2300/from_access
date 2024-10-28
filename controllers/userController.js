// controllers/userController.js
const db = require("../database/db");

async function getUsers(req, res) {
  try {
    const connection = await db.connect();
    const result = await connection.query("SELECT * FROM users");
    res.json(result);
  } catch (err) {
    console.error("Errore nella query:", err);
    res.status(500).send("Errore nella query al database.");
  }
}

async function getUserById(req, res) {
  const userId = req.params.id;
  try {
    const connection = await db.connect();
    const result = await connection.query(
      `SELECT * FROM users WHERE ID_user = ${userId}`
    ); // Inserisci direttamente userId
    if (result.length === 0) {
      return res.status(404).send("Utente non trovato.");
    }
    res.json(result[0]);
  } catch (err) {
    console.error("Errore nella query:", err);
    res.status(500).send("Errore nella query al database.");
  }
}

async function createUser(req, res) {
  const { nome, cognome } = req.body; // Assicurati di avere un middleware per il parsing del corpo della richiesta
  if (!nome || !cognome) {
    return res.status(400).send("Nome e cognome sono obbligatori.");
  }
  try {
    const connection = await db.connect();
    await connection.query(
      `INSERT INTO users (nome, cognome) VALUES ('${nome}', '${cognome}')`
    ); // Inserisci direttamente i valori
    res.status(201).send("Utente creato con successo.");
  } catch (err) {
    console.error("Errore nella query:", err);
    res.status(500).send("Errore nella query al database.");
  }
}

async function updateUser(req, res) {
  const userId = req.params.id;
  const { nome, cognome } = req.body;
  try {
    const connection = await db.connect();
    await connection.query(
      `UPDATE users SET nome = '${nome}', cognome = '${cognome}' WHERE ID_user = ${userId}`
    ); // Inserisci direttamente i valori
    res.send("Utente aggiornato con successo.");
  } catch (err) {
    console.error("Errore nella query:", err);
    res.status(500).send("Errore nella query al database.");
  }
}

async function deleteUser(req, res) {
  const userId = req.params.id;
  try {
    const connection = await db.connect();
    // Prima elimina i post dell'utente
    await connection.query(`DELETE FROM posts WHERE ID_user = ${userId}`); // Inserisci direttamente userId
    // Poi elimina l'utente
    await connection.query(`DELETE FROM users WHERE ID_user = ${userId}`); // Inserisci direttamente userId
    res.send("Utente eliminato con successo.");
  } catch (err) {
    console.error("Errore nella query:", err);
    res.status(500).send("Errore nella query al database.");
  }
}

module.exports = {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
};
