import {DB_NAME, clientDb} from './clientDb.js';

const connectDB = async () => {
  const client = await clientDb();
  const db = client.db(DB_NAME);
  return db;
};

export default connectDB;
