import d from 'debug';
import express from 'express';
import morgan from 'morgan';
import path from 'path';
import chalk from 'chalk';
import navItems from './data/navItems.mjs';
import mongoDb from './db/mongoDb.mjs';
import bookRouter from './routers/bookRouter.mjs';
import homeRouter from './routers/homeRouter.mjs';
import adminRouter from './routers/adminRouter.mjs';

const debug = d('app');

const port = process.env.PORT || 3000;
const title = 'My Library';
const dbUrl = 'mongodb+srv://libadmin:Library0!@cluster-hk7dn.mongodb.net';

const app = express();

function errorHandler(err, req, res, next) { // eslint-disable-line no-unused-vars
  debug(err);
  res.status(500);
  res.location('/');
  res.render('index', { title, nav: navItems, error: err.stack });
  // res.send({ error: err.stack });
}

(async function init() {
  // Logging Util
  app.use(morgan('tiny')); // 'combined' shows more info

  // Static Content
  app.use(express.static(path.join(process.cwd(), '/public')));
  app.use('/css', express.static(path.join(process.cwd(), '/node_modules/bootstrap/dist/css')));
  app.use('/js', express.static(path.join(process.cwd(), '/node_modules/bootstrap/dist/js')));
  app.use('/js', express.static(path.join(process.cwd(), '/node_modules/jquery/dist')));
  app.use('/js', express.static(path.join(process.cwd(), '/node_modules/popper.js/dist')));

  app.set('views', './src/views');
  app.set('view engine', 'ejs');
  // app.set('view engine', 'pug');

  // Open DB Connection
  await mongoDb.connect(dbUrl);

  // Start Routes
  app.use('/', homeRouter(title, navItems));
  // app.use('/books', wrapAsync(bookRouter(title, navItems)));
  app.use('/books', bookRouter(title, navItems));
  app.use('/admin', adminRouter());
  app.use(errorHandler);

  app.listen(port, () => {
    debug(`Listening at Port ${chalk.green(port)}`);
  });
}());
