import mongoDb from '../db/mongoDb.mjs';
import books from '../data/books.mjs';

const collectionName = 'books';

const bookService = {

  collection() {
    return mongoDb.db().collection(collectionName);
  },

  addAll() {
    return bookService.collection().insertMany(books);
  },

  listAll() {
    return bookService.collection().find().toArray();
  },

  getById(id) {
    return bookService.collection().findOne({ _id: mongoDb.objectID(id) });
  },

  deleteAll() {
    return bookService.collection().deleteMany();
  }
};

export default bookService;
