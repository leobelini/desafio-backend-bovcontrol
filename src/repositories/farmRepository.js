const COLLECTION_NAME = "farms";

/**
 * @param {import('mongodb').Db} db
 * @param {Object} farm
 * @param {import('mongodb').ClientSession} session
 *
 * @returns {Promise<string>}
 */
const createFarm = async (db, farm, session) => {
  const result = await db
    .collection(COLLECTION_NAME)
    .insertOne(farm, { session });

  return result.insertedId.toString();
};

module.exports = { createFarm };
