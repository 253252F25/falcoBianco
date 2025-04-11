const { MongoClient } = require('mongodb');

let cachedClient = null;
let cachedDb = null;

async function connectToDatabase() {
  if (cachedDb) return cachedDb;

  const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}/${process.env.DB_NAME}?retryWrites=true&w=majority`;

  if (!cachedClient) {
    cachedClient = new MongoClient(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    await cachedClient.connect();
  }

  cachedDb = cachedClient.db(process.env.DB_NAME);
  console.log('✅ Connesso a MongoDB Atlas (cached)');
  return cachedDb;
}

module.exports = connectToDatabase;
