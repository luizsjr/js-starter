import express from 'express';
import books from '../data/books.mjs';

function addBookListRoute(router, title, navItems) {
  router.route('/')
    .get((req, res) => {
      res.render(
        'books',
        {
          title,
          nav: navItems,
          books
        }
      );
    });
}

function addSingleBookRoute(router, title, navItems) {
  router.route('/:id')
    .get((req, res) => {
      const { id } = req.params;
      const book = books[id];
      book.id = id;

      res.render(
        'book',
        {
          title,
          nav: navItems,
          book
        }
      );
    });
}

function bookRouter(title, navItems) {
  const router = express.Router();

  addBookListRoute(router, title, navItems);
  addSingleBookRoute(router, title, navItems);

  return router;
}

export default bookRouter;
