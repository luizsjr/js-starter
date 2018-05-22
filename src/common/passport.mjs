import passport from 'passport';
import strategy from './strategies/local.strategy.mjs';

function passportConfig(app) {
  app.use(passport.initialize());
  app.use(passport.session());

  // Stores user in the session
  passport.serializeUser((user, done) => {
    done(null, user);
  });

  // Retrieves user from the session
  passport.deserializeUser((user, done) => {
    done(null, user);
  });
}
export default passportConfig;
