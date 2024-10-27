require("dotenv").config(); // Carica le variabili d'ambiente dal file .env

const odbc = require("odbc");

const connectionString = process.env.DB_CONNECTION_STRING;

let connection;

async function connect() {
  if (!connection) {
    connection = await odbc.connect(connectionString);
  }
  return connection;
}

async function close() {
  if (connection) {
    await connection.close();
    connection = null;
  }
}

module.exports = { connect, close };
