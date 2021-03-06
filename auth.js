/* eslint-disable no-unused-vars */
/* eslint-env commonjs */
var jwtSecret = 'your_jwt_secret'; // This has to be the same key used in the JWTStrategy
var jwt = require('jsonwebtoken');
const passport = require('passport');
require('./passport'); // Your local passport file

function generateJWTToken(user){
  return jwt.sign(user, jwtSecret, {
    subject: user.Username, // This is the username you are encoding in the JWT
    expiresIn: '7d', // This specifies that the token will be expired in 7days
    algorithm: 'HS256' // This is the algorithm used to "sign" or encode the value of the JWT
  });
}

/* POST login */

module.exports = (router) => {
  router.post('/login', (req, res) => {
    console.log(req.body);
    passport.authenticate('local', {session: false}, (error, user, info) => {
      console.log(user);
      if(error || !user){
        return res.status(400).json({
          message: 'Something is not right',
          user: user
        });
      }
      req.login(user, {session: false}, (error) => {
        if(error){
          res.send(error);
        }
        var token = generateJWTToken(user.toJSON());
        return res.json({user, token});
      });
    })(req, res);
  })
}
