import d from 'debug';

const debug = d('app:error');

function errorHandler(err, req, res, next) { // eslint-disable-line no-unused-vars
  debug(err);
  res.status(500);
  res.location('/');
  res.render('index', {
    rd: {
      title: 'Something went wrong...',
      subTitle: '',
      navItems: [],
      error: err.stack
    }
  });
}
export default errorHandler;
