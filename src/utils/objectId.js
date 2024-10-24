const { ObjectId } = require("mongodb");

const toObjectId = (id) => {
  if (id instanceof ObjectId) {
    return id;
  } else if (typeof id === "string") {
    return new ObjectId(id);
  }

  throw new Error("ID_NOT_VALID");
};

module.exports = { toObjectId };
