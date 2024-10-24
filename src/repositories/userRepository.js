const { toObjectId } = require("../utils/objectId");

const COLLECTION_NAME = "users";

/**
 * @param {import('mongodb').Db} db
 * @param {Object} user
 *
 * @returns {Promise<string>}
 */
const createUser = async (db, user) => {
  const result = await db.collection(COLLECTION_NAME).insertOne(user);

  return result.insertedId.toString();
};

/**
 * @param {import('mongodb').Db} db
 * @param {string} email
 *
 * @returns {Promise<import('mongodb').WithId<Object>>}
 */
const getUserByEmail = async (db, email) => {
  const user = await db.collection(COLLECTION_NAME).findOne({ email });

  return user;
};

/**
 * @param {import('mongodb').Db} db
 * @param {string} id
 *
 * @returns {Promise<import('mongodb').WithId<Object>>}
 */
const getUserById = async (db, id) => {
  const objectId = toObjectId(id);
  const user = await db.collection(COLLECTION_NAME).findOne({
    _id: objectId,
  });

  return user;
};

module.exports = { createUser, getUserByEmail, getUserById };
