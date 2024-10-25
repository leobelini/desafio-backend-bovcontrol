import { hash as _hash, compare as _compare } from 'bcrypt';

/**
 * @param {string} password
 *
 * @returns {Promise<string>}
 *
 */
const hash = async (password) => _hash(password, 10);

/**
 * @param {string} password
 * @param {string} hashString
 *
 * @returns {Promise<boolean>}
 */
const compare = async (password, hashString) => _compare(password, hashString);

export {
  hash,
  compare,
};
