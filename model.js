const mongoose = require('mongoose');

//defining schema with mongoose
var movieSchema = mongoose.Schema({
  Title : {type: String, required: true },
Description: {type: String, required:true},
Genre: {
Name: String,
Description: String},
Director:{
  Name: String,
  Bio: String
},
Actors: [String],
ImagePath: String,
Featured: Boolean
});

var userSchema = mongoose.Schema({
 Username : {type: String, required: true},
 Password : {type: String, required: true},
 Email : {type: String, required: true},
 Birthday : Date,
 FavoriteMovies : [{ type : mongoose.Schema.Types.ObjectId, ref: 'Movie' }]
});

//creating Models
var Movies = mongoose.model('Movies', movieSchema);
var User = mongoose.model('User',userSchema);

//Exporting Models
module.exports.Movies = Movies;
module.exports.User = User;
