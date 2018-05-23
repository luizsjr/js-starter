import passport from 'passport';
import local from 'passport-local';

function locaStrategy() {
  passport.use(new local.Strategy({
    usernameField: 'username',
    passwordField: 'password'
  }, (username, password, done) => {
    const user = {
      username, password
    };
    done(null, user);
  }));
}

export default locaStrategy;
