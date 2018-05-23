import d from 'debug';
import passport from 'passport';
import localStrategy from './strategies/local.strategy.mjs';

const debug = d('app:passwordConfig');

function passportConfig(app) {
  debug('Initializing Password...');
  app.use(passport.initialize());
  app.use(passport.session());

  // Set the Strategy
  debug('Password Strategy set to local');
  localStrategy();

  // Stores user in the session
  passport.serializeUser((user, done) => {
    done(null, user);
  });

  // Retrieves user from the session
  passport.deserializeUser((user, done) => {
    done(null, user);
  });
  debug('Password initialization finished.');
}
export default passportConfig;
