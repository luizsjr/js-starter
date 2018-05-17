import d from 'debug';
import express from 'express';
import morgan from 'morgan';
import path from 'path';
import chalk from 'chalk';

const debug = d('app');

const app = express();

// Logging Util
app.use(morgan('tiny')); // combined shows more info

// Static Content
app.use(express.static(path.join(process.cwd(), '/public')));
app.use('/css', express.static(path.join(process.cwd(), '/node_modules/bootstrap/dist/css')));
app.use('/js', express.static(path.join(process.cwd(), '/node_modules/bootstrap/dist/js')));
app.use('/js', express.static(path.join(process.cwd(), '/node_modules/jquery/dist')));
app.use('/js', express.static(path.join(process.cwd(), '/node_modules/popper.js/dist')));

// Routes
app.get('/', (req, res) => {
  res.sendFile(path.join(process.cwd(), 'views/index.html'));
});

app.listen(3000, () => {
  debug(`Listening on Port ${chalk.green('3000')}`);
});
