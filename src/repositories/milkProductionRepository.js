const { ObjectId } = require("mongodb");

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

/**
 * @param {import('mongodb').Db} db
 * @param {string} farmId
 * @param {number} month
 * @param {number} year
 *
 * @returns {Promise<import('mongodb').WithId<Object>>}
 */
const getMilkProductionByFarmIdAndDate = async (db, farmId, month, year) => {
  const objectId = new ObjectId(farmId);

  const milkProductions = await db.collection(COLLECTION_NAME).findOne({
    farm_id: objectId,
    month,
    year,
  });

  return milkProductions;
};

const registerMilkProduction = async (db, milkProductionId, data) => {
  const result = await db
    .collection(COLLECTION_NAME)
    .updateOne(
      { _id: new ObjectId(milkProductionId) },
      { $set: data },
      { upsert: true }
    );
  return result;
};

module.exports = {
  createMilkProduction,
  getMilkProductionByFarmIdAndDate,
  registerMilkProduction,
};
