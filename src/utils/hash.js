const bcrypt = require('bcrypt');

/**
 * @param {string} password
 *
 * @returns {Promise<string>}
 *
 */
const hash = async (password) => bcrypt.hash(password, 10);

/**
 * @param {string} password
 * @param {string} hashString
 *
 * @returns {Promise<boolean>}
 */
const compare = async (password, hashString) => bcrypt.compare(password, hashString);

module.exports = {
  hash,
  compare,
};
