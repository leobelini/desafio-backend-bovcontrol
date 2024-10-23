/**
 * Error handling middleware.
 *
 * @param {Error} err - The error object generated during the application's execution.
 * @param {import('express').Request} req - The request object representing the client's request.
 * @param {import('express').Response} res - The response object used to send a response to the client.
 * @param {import('express').NextFunction} next - The next function used to pass control to the next middleware (not used in this case).
 *
 * @returns {void} Sends a JSON response with the error message.
 */
function errorHandler(err, req, res, next) {
  console.error(err);

  var response = {};
  if (process.env.NODE_ENV !== "production") {
    response = {
      stack: err.stack,
    };
  }
  // Check if the error is a Joi validation error
  if (err.isJoi) {
    response.message = err.message;
    response.messages = err.details.map((detail) => detail.message);

    return res.status(400).json(response);
  } else {
    response.message = err.message;
    return res.status(500).json(response);
  }
}

module.exports = errorHandler;
