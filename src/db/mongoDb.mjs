import d from 'debug';
import MongoClient from 'mongodb';

const debug = d('app:mongoDb');

const mongoDb = {

  async connect() {
    try {
      const url = process.env.DB_URL;
      if (!url) { throw new Error('URL Connection not set'); }
      mongoDb.client = await MongoClient.connect(url, { useNewUrlParser: true });
      debug('Connected to the DB server');
    } catch (err) {
      debug(`Error connecting to the DB Server: ${err.stack}`);
      process.exit(1); // Stop the server as connect is called before starting the routes
    }
  },

  db() {
    const dbName = process.env.DB_NAME;
    if (!dbName) {
      throw new Error('DB name not set');
    } else if (!mongoDb.client) {
      throw new Error('Not Connected to any database');
    }
    return mongoDb.client.db(dbName);
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
