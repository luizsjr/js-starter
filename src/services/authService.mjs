import mongoDb from '../db/mongoDb.mjs';

const collectionName = 'books';

const authService = {

  collection() {
    return mongoDb.db().collection(collectionName);
  },

  addAll() {
    return authService.collection().insertMany(books);
  },

  listAll() {
    return authService.collection().find().toArray();
  },

  getById(id) {
    return authService.collection().findOne({ _id: mongoDb.objectID(id) });
  },

  deleteAll() {
    return authService.collection().deleteMany();
  }
};

export default authService;
