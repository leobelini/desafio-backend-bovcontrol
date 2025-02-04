import toObjectId from '../utils/objectId.js';

const COLLECTION_NAME = 'milk-productions';

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
  const objectId = toObjectId(farmId);

  const milkProductions = await db.collection(COLLECTION_NAME).findOne({
    farmId: objectId,
    month,
    year,
  });

  return milkProductions;
};

/**
 * @param {import('mongodb').Db} db
 * @param {string} farmId
 * @param {number} month
 *
 * @returns {Promise<import('mongodb').WithId<Object>[]>}
 */
const getMilkProductionByFarmIdAndMonth = async (db, farmId, month) => {
  const objectId = toObjectId(farmId);

  const milkProductions = await db
    .collection(COLLECTION_NAME)
    .find({
      farmId: objectId,
      month,
    })
    .toArray();

  return milkProductions;
};

/**
 * @param {import('mongodb').Db} db
 * @param {string[]} farmsId
 * @param {number} month
 *
 * @returns {Promise<import('mongodb').WithId<Object>[]>}
 */
const getMilkProductionByFarmsIdAndMonth = async (db, farmsId, month) => {
  const listOfObjectId = farmsId.map((farmId) => toObjectId(farmId));

  const milkProductions = await db
    .collection(COLLECTION_NAME)
    .find({
      farmId: { $in: listOfObjectId },
      month,
    })
    .toArray();

  return milkProductions;
};

const getMilkProductionByFarmIdAndYear = async (db, farmId, year) => {
  const objectId = toObjectId(farmId);

  const milkProductions = await db
    .collection(COLLECTION_NAME)
    .find({
      farmId: objectId,
      year,
    })
    .toArray();

  return milkProductions;
};

/**
 * @param {import('mongodb').Db} db
 * @param {string} milkProductionId
 * @param {Object} data
 *
 * @returns {Promise<import('mongodb').UpdateResult>}
 */
const registerMilkProduction = async (db, milkProductionId, data) => {
  const result = await db
    .collection(COLLECTION_NAME)
    .updateOne(
      { _id: toObjectId(milkProductionId) },
      { $set: data },
      { upsert: true },
    );
  return result;
};

export default {
  createMilkProduction,
  getMilkProductionByFarmIdAndDate,
  registerMilkProduction,
  getMilkProductionByFarmIdAndMonth,
  getMilkProductionByFarmsIdAndMonth,
  getMilkProductionByFarmIdAndYear,
};
