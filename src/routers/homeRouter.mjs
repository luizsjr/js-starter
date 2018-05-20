import express from 'express';
import rdService from '../services/referenceDataService.mjs';
import wrap from '../common/asyncWrapper.mjs';

function addHomeRoute(router) {
  router.route('/')
    .get(wrap(async (req, res) => {
      res.render(
        'index',
        {
          rd: await rdService.get()
        }
      );
    }));
}

function homeRouter() {
  const router = express.Router();
  addHomeRoute(router);
  return router;
}

export default homeRouter;
