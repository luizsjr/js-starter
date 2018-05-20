import express from 'express';
import bookService from '../services/bookService.mjs';
import wrap from '../utils/asyncWrapper.mjs';

function addBookRoutes(router, title, navItems) {
  router.route('/')
    .get(wrap(async (req, res) => {
      res.render(
        'books',
        {
          title,
          nav: navItems,
          books: await bookService.listAll()
        }
      );
    }));

  router.route('/:id')
    .get(wrap(async (req, res) => {
      const { id } = req.params;
      res.render(
        'book',
        {
          title,
          nav: navItems,
          book: await bookService.getById(id)
        }
      );
    }));
}

function bookRouter(title, navItems) {
  const router = express.Router();
  addBookRoutes(router, title, navItems);
  return router;
}

export default bookRouter;
