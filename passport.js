const passport = require('passport'),
  LocalStrategy = require('passport-local').Strategy,
  Models = require('./model.js'),
  passportJWT = require('passport-jwt');

var Users = Models.User;
var JWTStrategy = passportJWT.Strategy;
var ExtractJWT = passportJWT.ExtractJwt;

passport.use(new LocalStrategy({
  usernameField: 'Username',
  passwordField: 'Password'
}, (username, password, callback) => {
  console.log(username + '  ' + password);
  Users.findOne({ username })
        .then(user => {
          if (!user) {
            console.log('Incorrect username');
            return callback(null, false, { message: 'Incorrect username.' });
          }
          if (!user.validatePassword(password)) {
            console.log('Incorrect password');
            return callback(null, false, { message: 'Incorrect password.' });
          }
          console.log('Finished!');
          return callback(null, user);
        })
        .catch(err => callback(err));
    }
  )
);

passport.use(new JWTStrategy({
 jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
 secretOrKey: 'your_jwt_secret'
}, (jwtPayload, callback) => {
 return Users.findById(jwtPayload._id)
 .then((user) => {
   return callback(null, user);
 })
 .catch((error) => {
   return callback(error)
 });
}));
