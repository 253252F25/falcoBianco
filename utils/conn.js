const { MongoClient } = require('mongodb');

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}/${process.env.DB_NAME}?retryWrites=true&w=majority`;

const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

let db;

async function connectToDatabase() {
  if (!db) {
    await client.connect();
    db = client.db(process.env.DB_NAME);
    console.log('Connesso a MongoDB Atlas');
  }
  return db;
}

module.exports = connectToDatabase;
