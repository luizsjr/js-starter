import express from 'express';

function addHomeRoute(router, title, navItems) {
  router.route('/')
    .get((req, res) => {
      res.render(
        'index',
        {
          title,
          nav: navItems
        }
      );
    });
}

function homeRouter(title, navItems) {
  const router = express.Router();

  addHomeRoute(router, title, navItems);

  return router;
}

export default homeRouter;
