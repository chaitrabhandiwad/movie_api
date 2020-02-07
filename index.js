/* eslint-disable no-unused-vars */
/* eslint-env commonjs */

const express = require('express'),
 morgan = require('morgan'),
 app = express();


 let topMovies = [
  {
    title: 'Lord of Rings',
    director: 'J.R.R.Tolkien'
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
    director: 'J.R.R.Tolkien'
  },

  {
    title: 'IronMan',
    director: 'J.R.R.Tolkien'
  },

  {
    title: 'Notebook',
    director: 'J.R.R.Tolkien'
  },
  {
    title: 'Star Wars',
    director: 'J.R.R.Tolkien'
  },

  {
    title: 'Dead Pool',
    director: 'J.R.R.Tolkien'
  },

  {
    title: 'Batman VS Superman',
    director: 'J.R.R.Tolkien'
  },

  {
    title: 'Joker',
    director: 'J.R.R.Tolkien'
  }

]

//get request for root and movies
app.get('/', function(req,res){
res.send('Welcome to my Movies club')
});

app.get('/movies', function(req,res){
  res.json(topMovies)
});

app.use(express.static('public'));
//data loggging in common format from morgan
app.use(morgan('common'));

//error handling
app.use(function (err, req, res, next) {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

// listen for requests
app.listen(8080, () =>
  console.log('Your app is listening on port 8080.')
);
