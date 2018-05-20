import d from 'debug';
import MongoClient from 'mongodb';

const debug = d('app:mongoDb');

const mongoDb = {

  async connect(url) {
    try {
      mongoDb.client = await MongoClient.connect(url);
      debug('Connected to the DB server');
    } catch (err) {
      debug(`Error connecting to the DB Server: ${err.stack}`);
      throw err;
    }
  },

  db(dbName) {
    if (mongoDb.client) {
      return mongoDb.client.db(dbName);
    }
    throw new Error('Not Connected to any database');
  },

  objectID(id) {
    return new MongoClient.ObjectID(id);
  }

  // closing the client is not needed as the application use connection pooling.
  // close() {
  //   if (mongoDb.client) {
  //     mongoDb.client.close();
  //   }
  // }

};

export default mongoDb;
