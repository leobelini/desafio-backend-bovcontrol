const COLLECTION_NAME = "farmers";

/**
 * @param {import('mongodb').Db} db
 * @param {Object} farmer
 *
 * @returns {Promise<string>}
 */
const createFarmer = async (db, farmer) => {
  const result = await db.collection(COLLECTION_NAME).insertOne(farmer);

  return result.insertedId.toString();
};

module.exports = { createFarmer };
