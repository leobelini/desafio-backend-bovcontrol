const clientDb = require('./clientDb');

const connectDB = async () => {
  const client = await clientDb.clientDb();
  const db = client.db(clientDb.DB_NAME);
  return db;
};

module.exports = connectDB;
