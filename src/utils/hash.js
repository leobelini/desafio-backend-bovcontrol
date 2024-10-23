const bcrypt = require("bcrypt");

/**
 * @param {string} password
 *
 * @returns {Promise<string>}
 *
 */
const hash = async (password) => {
  return await bcrypt.hash(password, 10);
};

/**
 * @param {string} password
 * @param {string} hash
 *
 * @returns {Promise<boolean>}
 */
const compare = async (password, hash) => {
  return await bcrypt.compare(password, hash);
};

module.exports = {
  hash,
  compare,
};
