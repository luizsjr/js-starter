import d from 'debug';
import express from 'express';
import MongoClient from 'mongodb';
import books from '../data/books.mjs';

const debug = d('app:AdminRouter');

function addAdminRoute(router, title, navItems) {
  router.route('/')
    .get((req, res) => {
      const url = 'mongodb+srv://libadmin:<PASSWORD>@cluster-hk7dn.mongodb.net/test?retryWrites=true';
      const dbName = 'libraryDb';

      (async function mongo() {
        let client;
        try {
          client = await MongoClient.connect(url);
          debug('Connected to the DB server');

          const db = client.db(dbName);
          const response = await db.collection('books').insertMany(books);
          res.json(response);
        } catch (err) {
          debug(`Error connecting to the DB Server: ${err.stack}`);
        }
        client.close();
      }());
    });
}

function adminRouter(title, navItems) {
  const router = express.Router();

  addAdminRoute(router, title, navItems);

  return router;
}

export default adminRouter;
