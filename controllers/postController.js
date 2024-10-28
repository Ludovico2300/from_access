const db = require("../database/db");
const { getLocalDateTime } = require("../utils/dateUtils");

async function getPosts(req, res) {
  try {
    const connection = await db.connect();
    const result = await connection.query("SELECT * FROM posts");
    res.json(result);
  } catch (err) {
    console.error("Errore nella query:", err);
    res.status(500).send("Errore nella query al database.");
  }
}

async function getPostById(req, res) {
  const postId = req.params.id;
  try {
    const connection = await db.connect();
    const result = await connection.query(
      `SELECT * FROM posts WHERE ID_post = ${postId}`
    ); // Inserisci direttamente postId
    if (result.length === 0) {
      return res.status(404).send("Post non trovato.");
    }
    res.json(result[0]);
  } catch (err) {
    console.error("Errore nella query:", err);
    res.status(500).send("Errore nella query al database.");
  }
}

async function createPost(req, res) {
  let { titolo, descrizione, data_creazione, ID_user } = req.body; // Assicurati di avere un middleware per il parsing del corpo della richiesta
  if (!titolo || titolo === "") {
    return res.status(400).send(`Titolo è obbligatorio. ${titolo} non valido.`);
  }
  if (!descrizione || descrizione === "") {
    return res.status(400).send("Descrizione è obbligatoria.");
  }
  if (!ID_user) {
    return res.status(400).send("ID_user è obbligatorio.");
  }
  if (!data_creazione) {
    // la data deve avere questo formato "2021-09-01 12:00:00"
    data_creazione = getLocalDateTime();
  }
  try {
    const connection = await db.connect();
    await connection.query(
      `INSERT INTO posts (titolo, descrizione, data_creazione, ID_user) VALUES ('${titolo}', '${descrizione}', '${data_creazione}', ${ID_user})`
    ); // Inserisci direttamente i valori
    res.send("Post creato con successo.");
  } catch (err) {
    console.error("Errore nella query:", err);
    res.status(500).send("Errore nella query al database.");
  }
}

async function updatePost(req, res) {
  const postId = req.params.id;
  let { titolo, descrizione, data_modifica, ID_user } = req.body; // Assicurati di avere un middleware per il parsing del corpo della richiesta
  if (!titolo || titolo === "") {
    return res.status(400).send(`Titolo è obbligatorio. ${titolo} non valido.`);
  }
  if (!descrizione || descrizione === "") {
    return res.status(400).send("Descrizione è obbligatoria.");
  }
  if (!ID_user) {
    return res.status(400).send("ID_user è obbligatorio.");
  }
  if (!data_modifica) {
    // la data deve avere questo formato "2021-09-01 12:00:00"
    data_modifica = getLocalDateTime();
  }
  try {
    const connection = await db.connect();
    await connection.query(
      `UPDATE posts SET titolo = '${titolo}', descrizione = '${descrizione}', data_modifica = '${data_modifica}', ID_user = ${ID_user} WHERE ID_post = ${postId}`
    ); // Inserisci direttamente i valori
    res.send("Post aggiornato con successo.");
  } catch (err) {
    console.error("Errore nella query:", err);
    res.status(500).send("Errore nella query al database.");
  }
}

async function deletePost(req, res) {
  const postId = req.params.id;
  try {
    const connection = await db.connect();
    await connection.query(`DELETE FROM posts WHERE ID_post = ${postId}`); // Inserisci direttamente postId
    res.send("Post eliminato con successo.");
  } catch (err) {
    console.error("Errore nella query:", err);
    res.status(500).send("Errore nella query al database.");
  }
}

module.exports = {
  getPosts,
  getPostById,
  createPost,
  updatePost,
  deletePost,
};
