import { MongoClient } from 'mongodb';

const DB_NAME = process.env.MONGO_DB_NAME;

const clientDb = async () => {
  const client = new MongoClient(process.env.MONGO_URI);
  await client.connect();
  return client;
};

export { clientDb, DB_NAME };
