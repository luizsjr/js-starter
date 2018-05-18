import express from 'express';
import books from '../data/books.mjs';

const bookRouter = express.Router();

bookRouter.route('/')
  .get((req, res) => {
    res.render(
      'books',
      {
        title: 'My Library',
        nav: [
          { link: '/books', title: 'Books' },
          { link: '/authors', title: 'Authors' }
        ],
        books
      }
    );
  });

bookRouter.route('/:id')
  .get((req, res) => {
    const { id } = req.params;
    const book = books[id];
    book.id = id;

    res.render(
      'book',
      {
        title: 'My Library',
        nav: [
          { link: '/books', title: 'Books' },
          { link: '/authors', title: 'Authors' }
        ],
        book
      }
    );
  });

export default bookRouter;
