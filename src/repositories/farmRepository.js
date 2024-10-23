const COLLECTION_NAME = "farms";

/**
 * @param {import('mongodb').Db} db
 * @param {Object} farm
 *
 * @returns {Promise<string>}
 */
const createFarm = async (db, farm) => {
  const result = await db.collection(COLLECTION_NAME).insertOne(farm);

  return result.insertedId.toString();
};

module.exports = { createFarm };
