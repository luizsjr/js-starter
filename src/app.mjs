import d from 'debug';
import express from 'express';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import path from 'path';
import chalk from 'chalk';
import mongoDb from './db/mongoDb.mjs';
import bookRouter from './routers/bookRouter.mjs';
import homeRouter from './routers/homeRouter.mjs';
import adminRouter from './routers/adminRouter.mjs';
import authRouter from './routers/authRouter.mjs';
import errorHandler from './common/errorHandler.mjs';

const debug = d('app');

const port = process.env.PORT || 3000;

const app = express();

(async function init() {
  // Logging Util
  app.use(morgan('tiny')); // 'combined' shows more info

  // Body Parser
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: false }));

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
  await mongoDb.connect();

  // Start Routes
  app.use('/', homeRouter());
  app.use('/books', bookRouter());
  app.use('/admin', adminRouter());
  app.use('/auth', authRouter());
  app.use(errorHandler);

  app.listen(port, () => {
    debug(`Listening at Port ${chalk.green(port)}`);
  });
}());
