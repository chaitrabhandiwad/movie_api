/* eslint-disable no-unused-vars */
/* eslint-env commonjs */
/*eslint no-undefined: "error"*/


const express = require('express'),
bodyParser = require('body-parser'),
mongoose = require('mongoose'),
Models = require('./model.js'),
 morgan = require('morgan'),
 cors = require('cors'),
{ check, validationResult } = require('express-validator'),
 app = express();



 const passport = require('passport');
 require('./passport');

const Movies = Models.Movies;
const User = Models.User;

//connect to database
mongoose.connect('mongodb://localhost:27017/myFlixDB', {useNewUrlParser: true});

// app.use initializations
app.use(cors());
app.use(bodyParser.json());
app.use(morgan('common'));
app.use(express.static('public'));

var auth = require('./auth')(app);
// GET requests
app.get('/', function(req, res){
  res.send('Welcome to myFlix!')
});

// Get a list of ALL movies
app.get('/movies', passport.authenticate('jwt', { session: false }), function(req, res) {
  Movies.find()
  .then(function(movie){
    res.status(201).json(movie);
  })
  .catch(function(err){
    console.error(err);
    res.status(500).send('Error: ' + err);
  });
});

// Get data about a single movie by title
app.get('/movies/:Title', passport.authenticate('jwt', { session: false }), function(req, res) {
  Movies.findOne({Title: req.params.Title})
  .then(function(movie){
    if(movie){
      res.json(movie);
    }else{
      res.status(400).send(req.params.Title + 'does not exist');
    }
  })
  .catch(function(err){
    console.error(err);
    res.status(500).send('Error: ' + err);
  });
});

// Get data about a genre by name/title
app.get('/movies/genres/:Name', passport.authenticate('jwt', { session: false }), function(req, res) {
    Movies.findOne({
        'Genre.Name' : req.params.Name
    })
    .then(function(movies) {
      res.json(movies.Genre)
    })
    .catch(function(err) {
      console.error(err);
      res.status(500).send('Error: ' + err);
    });
  });

// Get data about a director by name
app.get('/movies/directors/:Name', passport.authenticate('jwt', { session: false }), function(req, res) {
  Movies.findOne({'Director.Name': req.params.Name})
  .then(function(movie){
    res.status(201).json(movie.Director);
  })
  .catch(function(err){
    console.error(err);
    res.status(500).send('Error: ' + err);
  })
});

app.get('/users',function(req, res) {
  User.find()
  .then(function(user){
    res.status(201).json(user);
  })
  .catch(function(err){
    console.error(err);
    res.status(500).send('Error: ' + err);
  });
});

// Add new users
/* We will expectJSON in this format
{
ID: Integer,
Username: String,
Password: String,
Email: String,
Birthday: Date
} */
app.post('/users',
  // Validation logic here for request
  //you can either use a chain of methods like .not().isEmpty()
  //which means "opposite of isEmpty" in plain english "is not empty"
  //or use .isLength({min: 5}) which means
  //minimum value of 5 characters are only allowed
  [check('Username', 'Username is required').isLength({min: 5}),
  check('Username', 'Username contains non alphanumeric characters - not allowed.').isAlphanumeric(),
  check('Password', 'Password is required').not().isEmpty(),
  check('Email', 'Email does not appear to be valid').isEmail()],(req, res) => {

  // check the validation object for errors
  var errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }

  var hashedPassword = User.hashPassword(req.body.Password);
  User.findOne({ Username : req.body.Username }) // Search to see if a user with the requested username already exists
  .then(function(user) {
    if (user) {
      //If the user is found, send a response that it already exists
        return res.status(400).send(req.body.Username + ' already exists');
    } else {
      User
      .create({
        Username : req.body.Username,
        Password: hashedPassword,
        Email : req.body.Email,
        Birthday : req.body.Birthday
      })
      .then(function(user) { res.status(201).json(user) })
      .catch(function(error) {
          console.error(error);
          res.status(500).send('Error: ' + error);
      });
    }
  }).catch(function(error) {
    console.error(error);
    res.status(500).send('Error: ' + error);
  });
});

// Update username
/* We will expect JSON in this format
{
  Username: String, (required)
  Password: String, (required)
  Email: String, (required)
  Birthday: Date
} */

app.put('/users/:Username', passport.authenticate('jwt', { session: false }), function(req, res) {
  User.findOneAndUpdate({Username: req.params.Username}, {$set:
  {
    Username: req.body.Username,
    Password: req.body.Password,
    Email: req.body.Email,
    Birthday: req.body.Birthday
  }},
  {new: true}, // This line will specify to return the new updated data.
  function(err, updatedUser){
    if(err){
      console.error(err);
      res.status(500).send('Error ' + err);
    }else{
      res.json(updatedUser);
    }
  });
});

// Add a movie to their list of favorites
app.post('/users/:Username/Movies/:MovieID', passport.authenticate('jwt', { session: false }), function(req, res) {
    User.findOneAndUpdate({ Username : req.params.Username }, {
      $push : { FavoriteMovies : req.params.MovieID }
    },
    { new : true }, // This line makes sure that the updated document is returned
    function(err, updatedUser) {
      if (err) {
        console.error(err);
        res.status(500).send('Error: ' + err);
      } else {
        res.json(updatedUser)
      }
    })
  });

// Remove a movie from their list of favorites
app.delete('/users/:Username/Movies/:MovieID', passport.authenticate('jwt', { session: false }), function(req, res) {
    User.findOneAndUpdate({ Username : req.params.Username }, {
        $pull : { FavoriteMovies : req.params.MovieID }
      },
      { new : true }, // This line makes sure that the updated document is returned
      function(err, updatedUser) {
        if (err) {
          console.error(err);
          res.status(500).send('Error: ' + err);
        } else {
          res.json(updatedUser)
        }
      })
    });

// Remove existing users by username
app.delete('/users/:Username', passport.authenticate('jwt', { session: false }), function(req, res) {
  User.findOneAndRemove({Username: req.params.Username})
  .then(function(user){
    if(!user){
      res.status(400).send(req.params.Username + ' was not found');
    }else{
      res.status(200).send(req.params.Username + ' was deleted');
    }
  })
  .catch(function(err){
    console.error(err);
    res.status(500).send('Error: ' + err);
  });
});

// error handling
app.use(function (err, req, res, next){
  console.error(err.stack);
  res.status(500).send('Something broke!');
})

// listen for requests

var port = process.env.PORT || 3000;
app.listen(port, '0.0.0.0', function() {
console.log('Listening on Port ${port}');
});
