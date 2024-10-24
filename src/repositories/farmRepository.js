const { toObjectId } = require('../utils/objectId');

const COLLECTION_NAME = 'farms';

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

/**
 * @param {import('mongodb').Db} db
 * @param {string} id
 *
 * @returns {Promise<import('mongodb').WithId<Object>>}
 */
const getFarmById = async (db, id) => {
  const objectId = toObjectId(id);
  const farm = await db.collection(COLLECTION_NAME).findOne({ _id: objectId });

  return farm;
};

const listFarms = async (db) => {
  const farms = await db.collection(COLLECTION_NAME).find().toArray();

  return farms;
};

module.exports = { createFarm, getFarmById, listFarms };
