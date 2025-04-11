async function connectToDatabase() {
  try {
    console.log("🔄 Iniziando la connessione a MongoDB...");
    if (cachedDb) {
      console.log("⚡️ MongoDB già connesso (cachedDb)");
      return cachedDb;
    }

    const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}/${process.env.DB_NAME}?retryWrites=true&w=majority`;
    console.log(uri)
    if (!cachedClient) {
      cachedClient = new MongoClient(uri, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
      console.log("🌐 Connettendo a MongoDB...");
      await cachedClient.connect();
      console.log("✅ Connesso a MongoDB Atlas (nuova connessione)");
    }

    cachedDb = cachedClient.db(process.env.DB_NAME);
    return cachedDb;
  } catch (err) {
    console.error("❌ Errore durante la connessione a MongoDB:", err.message);
    throw err;
  }
}
module.exports = router;
