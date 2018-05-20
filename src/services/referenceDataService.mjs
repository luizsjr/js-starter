import mongoDb from '../db/mongoDb.mjs';
import rd from '../data/referenceData.mjs';

const collectionName = 'referencedata';

const bookService = {

  collection() {
    return mongoDb.db().collection(collectionName);
  },

  async reload() {
    await bookService.collection().deleteMany();
    return bookService.collection().insertOne(rd);
  },

  get() {
    return bookService.collection().findOne();
  },
};

export default bookService;
