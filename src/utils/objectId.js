import { ObjectId } from 'mongodb';

const toObjectId = (id) => {
  if (id instanceof ObjectId) {
    return id;
  } if (typeof id === 'string') {
    return new ObjectId(id);
  }

  throw new Error('ID_NOT_VALID');
};

export { toObjectId };
