import express from 'express';
import bookService from '../services/bookService.mjs';
import rdService from '../services/referenceDataService.mjs';
import wrap from '../common/asyncWrapper.mjs';

function addBookRoutes(router) {
  router.route('/')
    .get(wrap(async (req, res) => {
      const data = await Promise.all([rdService.get(), bookService.listAll()]);
      const result = {
        rd: data[0],
        books: data[1]
      };
      res.render('books', result);
    }));

  router.route('/:id')
    .get(wrap(async (req, res) => {
      const { id } = req.params;
      const data = await Promise.all([rdService.get(), bookService.getById(id)]);
      const result = {
        rd: data[0],
        book: data[1]
      };
      res.render('book', result);
    }));
}

function bookRouter() {
  const router = express.Router();
  addBookRoutes(router);
  return router;
}

export default bookRouter;
