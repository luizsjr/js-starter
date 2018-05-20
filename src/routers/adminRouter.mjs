import d from 'debug';
import express from 'express';
import bookService from '../services/bookService.mjs';

const debug = d('app:adminRouter');

function handleError(res, errorMessage) {
  debug(errorMessage);
  res.status(500).send(errorMessage);
}

function addAdminRoutes(router) {
  router.route('/addBooks')
    .get((req, res) => {
      (async function addBooks() {
        try {
          const response = await bookService.addAll();
          res.json(response);
        } catch (err) {
          handleError(res, `Error inserting books in the DB Server: ${err.stack}`);
        }
      }());
    });

  router.route('/listBooks')
    .get((req, res) => {
      (async function listBooks() {
        try {
          const response = await bookService.listAll();
          res.json(response);
        } catch (err) {
          handleError(res, `Error retrieving books from the DB Server: ${err.stack}`);
        }
      }());
    });

  router.route('/deleteBooks')
    .get((req, res) => {
      (async function deleteBooks() {
        try {
          const response = await bookService.deleteAll();
          res.json(response);
        } catch (err) {
          handleError(res, `Error deleting books from the DB Server: ${err.stack}`);
        }
      }());
    });
}

function adminRouter() {
  const router = express.Router();
  addAdminRoutes(router);
  return router;
}

export default adminRouter;
