const { MongoClient } = require("mongodb");

const connectDB = async () => {
  const client = new MongoClient(process.env.MONGO_URI);
  await client.connect();
  return client.db(process.env.MONGO_DB_NAME);
};

module.exports = connectDB;
