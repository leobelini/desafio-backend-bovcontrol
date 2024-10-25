import { toObjectId } from '../utils/objectId.js';

const COLLECTION_NAME = 'farmers';

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

/**
 * @param {import('mongodb').Db} db
 * @param {string} id
 *
 * @returns {Promise<import('mongodb').WithId<Object>>}
 */
const getFarmerById = async (db, id) => {
  const objectId = toObjectId(id);
  const farmer = await db
    .collection(COLLECTION_NAME)
    .findOne({ _id: objectId });

  return farmer;
};

/**
 * @param {import('mongodb').Db} db
 *
 * @returns {Promise<import('mongodb').WithId<Object>[]>}
 */
const getFarmers = async (db) => {
  const farmers = await db.collection(COLLECTION_NAME).find().toArray();

  return farmers;
};

/**
 * @param {import('mongodb').Db} db
 * @param {string} farmerId
 * @param {string} farmId
 * @param {import('mongodb').ClientSession}
 *
 * @returns {Promise<void>}
 */
const addFarmInFarmer = async (db, farmerId, farmId, session) => {
  const farmerIdObject = toObjectId(farmerId);
  const farmIdObject = toObjectId(farmId);

  const farmer = await getFarmerById(db, farmerIdObject);
  farmer.farms = [...(farmer.farms || []), farmIdObject];
  await db.collection(COLLECTION_NAME).updateOne(
    { _id: farmerIdObject },
    { $set: farmer },
    {
      session,
    },
  );
};

export default {
  createFarmer, getFarmerById, getFarmers, addFarmInFarmer,
};
