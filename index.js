/* eslint-disable no-unused-vars */
/* eslint-env commonjs */

const express = require('express'),
bodyParser = require('body-parser'),
 morgan = require('morgan'),
 app = express();


 let Movies = [
  {
    title: 'Lord of Rings',
    director: 'J.R.R.Tolkien',
    description: 'Gandalf and Aragorn lead the World of Men against Saurons army to draw his gaze from Frodo and Sam as they approach Mount Doom with the One Ring.',
    genre: 'Drama, Adventure',
    imageURL:'https://www.imdb.com/title/tt0167260/mediaviewer/rm584928512'
  },

  {
    title: 'Harry Potter and Soccerous Stone',
    director: 'J.K. Rowling'
  },

  {
    title: 'Harry Potter and Chamber of Secrets',
    director: 'J.K.Rowling'
  },

  {
    title: 'Avengers',
    director: 'Joss Whedon'
  },

  {
    title: 'IronMan',
    director: ' Jon Favreau'
  },

  {
    title: 'Notebook',
    director: ' Alex Odam'
  },
  {
    title: 'Star Wars',
    director: 'J.J. Abrams'
  },

  {
    title: 'Dead Pool',
    director: 'Tim Miller'
  },

  {
    title: 'Batman VS Superman',
    director: ' Zack Snyder'
  },

  {
    title: 'Joker',
    director: 'J.R.R.Tolkien'
  }

]
// app.use initializations
app.use(bodyParser.json());
app.use(morgan('common'));
app.use(express.static('public'));
app.use(function(err, req, res, next) {
  console.error(err.stack);
  res.status(500).send('There has been an error.');
});


// Gets list of all movies
app.get('/movies', function(req, res) {
  res.send('Successful GET request returning data about all movies.');
});

// Gets the data about a single movie by title
app.get('/movies/:title', (req, res) => {
  res.send('Successful GET request returning data about a single movie.');
});

// Gets the data about a movie genre by name
app.get('/genre/:name', (req, res) => {
  res.send('Successful GET request returning data about a movie genre.');
});

// Gets the data about a director by name
app.get('/director/:name', (req, res) => {
  res.send('Successful GET request returning data about a director.');
});

// Adds data for a new user
app.post('/users', (req, res) => {
  let newUser = req.body;

  if (!newUser.username) {
    const message = 'Missing username in request body';
    res.status(400).send(message);
  } else {
    res.send('User successfully added.');
  }
});
// Update the a user's information
app.put('/users/:username/:password/:email/:dateofbirth', (req, res) => {
  res.send('User information updated.');
});

// Adds movie to favorites for a user
app.post('/favorites/:username/:title', (req, res) => {
  res.send('add favorite movie by user.');
});

// Deletes a movie from a user's favorites list by username
app.delete('/favorites/:username/:title', (req, res) => {
  res.send('Movie successfully deleted from favorites.');
});

// Deletes a user from the user registry
app.delete('/users/:username', (req, res) => {
  res.send('User successfully deleted from registry.');
});

// listen for requests
app.listen(8080, () => console.log('My movie app is listening on port 8080.'));
