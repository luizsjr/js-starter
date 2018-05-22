import d from 'debug';
import express from 'express';
import authService from '../services/authService.mjs';
import wrap from '../common/asyncWrapper.mjs';

const debug = d('app:authRouter');

function addAuthRoutes(router) {
  router.route('/signUp')
    .post(wrap(async (req, res) => {
      debug(req.body);
      res.json(req.body);
    }));
}

function authRouter() {
  const router = express.Router();
  addAuthRoutes(router);
  return router;
}

export default authRouter;
