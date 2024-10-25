/**
 * Error handling middleware.
 *
 * @param {Error} err - The error object generated during the application's execution.
 * @param {import('express').Request} req - request.
 * @param {import('express').Response} res - response
 *
 * @returns {void} Sends a JSON response with the error message.
 */
// eslint-disable-next-line no-unused-vars
function errorHandler(err, req, res, _) {
  let response = {};
  if (process.env.NODE_ENV !== 'production') {
    response = {
      stack: err.stack,
    };
  }
  // Check if the error is a Joi validation error
  if (err.isJoi) {
    response.message = err.message;
    response.messages = err.details.map((detail) => detail.message);

    return res.status(400).json(response);
  }
  response.message = err.message;
  return res.status(500).json(response);
}

module.exports = errorHandler;
