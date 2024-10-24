const errorHandler = require("../middlewares/global/errorHandler");

const createResponse = (data, responseCode = 200) => {
  return {
    data,
    responseCode,
  };
};

/**
 * Checks if an object matches the expected HttpResponse structure.
 *
 * @param {any} obj - The object to check.
 * @returns {boolean} - True if the object is a valid HttpResponse.
 */
const isHttpResponse = (obj) => {
  return (
    obj &&
    typeof obj === "object" &&
    "data" in obj &&
    "responseCode" in obj &&
    typeof obj.responseCode === "number"
  );
};

/**
 * @param {Function} fn
 * @returns {Function}
 */
const create = (fn) => async (req, res, next) => {
  try {
    const result = await fn(req, res);

    if (isHttpResponse(result)) {
      // If result is a valid HttpResponse, send response with custom code
      if (result.data) {
        res.status(result.responseCode).json(result.data);
      } else {
        res.status(result.responseCode).json();
      }
    } else {
      // If not, send a generic 200 response
      res.status(200).json(result);
    }
  } catch (error) {
    errorHandler(error, req, res, next);
  }
};

module.exports = { create, createResponse };
