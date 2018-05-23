import express from 'express';
import rdService from '../services/referenceDataService.mjs';
import authService from '../services/authService.mjs';
import wrap from '../common/asyncWrapper.mjs';

function addAuthRoutes(router) {
  router.route('/signUp')
    .post(wrap(async (req, res) => {
      // Get user info from body
      const user = (({ username, password }) => ({ username, password }))(req.body);

      // Get RD and try to create the user
      const data = await Promise.all([rdService.get(), authService.create(user)]);

      // Check if user was created and build response
      const [rd, newUser] = data;
      if (!newUser.error) {
        req.login(newUser, () => {
          res.render('index', { rd });
        });
      } else {
        res.render(
          'index',
          {
            rd: data[0],
            error: newUser.error
          }
        );
      }
    }));

  router.route('/profile')
    .get(wrap(async (req, res) => {
      res.json(req.user);
    }));
}

function authRouter() {
  const router = express.Router();
  addAuthRoutes(router);
  return router;
}

export default authRouter;
