import express from 'express';
import wrap from '../common/asyncWrapper.mjs';
import bookService from '../services/bookService.mjs';
import referenceDataService from '../services/referenceDataService.mjs';

function addAdminRoutes(router) {
  router.route('/reloadRD')
    .get(wrap(async (req, res) => {
      const response = await referenceDataService.reload();
      res.json(response);
    }));

  router.route('/showRD')
    .get(wrap(async (req, res) => {
      const response = await referenceDataService.get();
      res.json(response);
    }));

  router.route('/loadBooks')
    .get(wrap(async (req, res) => {
      const response = await bookService.addAll();
      res.json(response);
    }));

  router.route('/listBooks')
    .get(wrap(async (req, res) => {
      const response = await bookService.listAll();
      res.json(response);
    }));

  router.route('/deleteBooks')
    .get(wrap(async (req, res) => {
      const response = await bookService.deleteAll();
      res.json(response);
    }));
}

function adminRouter() {
  const router = express.Router();
  addAdminRoutes(router);
  return router;
}

export default adminRouter;
