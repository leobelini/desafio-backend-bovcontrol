const COLLECTION_NAME = "milk-productions";

/**
 * @param {import('mongodb').Db} db
 * @param {Object} milkProduction
 *
 * @returns {Promise<string>}
 */
const createMilkProduction = async (db, milkProduction) => {
  const result = await db.collection(COLLECTION_NAME).insertOne(milkProduction);
  return result.insertedId.toString();
};

module.exports = {
  createMilkProduction,
};
