import d from 'debug';
import express from 'express';
import morgan from 'morgan';
import path from 'path';
import chalk from 'chalk';
import navItems from './data/navItems.mjs';
import bookRouter from './routers/bookRouter.mjs';
import homeRouter from './routers/homeRouter.mjs';

const debug = d('app');

const app = express();
const port = process.env.PORT || 3000;
const title = 'My Library';

// Logging Util
app.use(morgan('tiny')); // combined shows more info

// Static Content
app.use(express.static(path.join(process.cwd(), '/public')));
app.use('/css', express.static(path.join(process.cwd(), '/node_modules/bootstrap/dist/css')));
app.use('/js', express.static(path.join(process.cwd(), '/node_modules/bootstrap/dist/js')));
app.use('/js', express.static(path.join(process.cwd(), '/node_modules/jquery/dist')));
app.use('/js', express.static(path.join(process.cwd(), '/node_modules/popper.js/dist')));

app.set('views', './src/views');
// app.set('view engine', 'pug');
app.set('view engine', 'ejs');

// Routes
app.use('/', homeRouter(title, navItems));
app.use('/books', bookRouter(title, navItems));

app.listen(port, () => {
  debug(`Listening at Port ${chalk.green(port)}`);
});
