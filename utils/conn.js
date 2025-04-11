const { MongoClient } = require('mongodb');

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}/${process.env.DB_NAME}?retryWrites=true&w=majority`;

const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

let cachedDb = null;  // Variabile definita per memorizzare la connessione al DB

async function connectToDatabase() {
  if (cachedDb) {
    console.log("Using cached database connection");
    return cachedDb;  // Se la connessione è già stata stabilita, la riutilizza
  }

  try {
    const clientConnection = await client.connect();  // Connessione al database
    cachedDb = clientConnection.db(process.env.DB_NAME);  // Memorizza il database connesso
    console.log("Database connected");
    return cachedDb;
  } catch (err) {
    console.error("Error connecting to the database:", err);
    throw err;  // Rilancia l'errore se non riesce a connettersi
  }
}

module.exports = connectToDatabase;
