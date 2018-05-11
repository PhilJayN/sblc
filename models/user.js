var mongoose = require("mongoose");
var passportLocalMongoose = require("passport-local-mongoose");

// var bearStr = 'hi ffom bear!!';


// <% var newColor = color(); %>


//returns a string: "fa-chess-knight", to be used inside avatar property in UserSchema
//then inside EJS use this string to help render out a class name for font awesome
var pickAvatar = (function () {
  var avatarArr = ['fa-quidditch', 'fa-chess-king', 'fa-chess-knight', 'fa-chess-pawn'];
  var randomNum = Math.floor(Math.random() * ( (avatarArr.length - 1) - 0 + 1)) + 0;
  return avatarArr[randomNum];
})();


var UserSchema = new mongoose.Schema({
  username: String,
  password: String,
  firstName: {type: String, default: "First Name"},
  lastName: {type: String, default: "Last Name"},
  email: String,
  // avatar: {type: String, default: "https://upload.wikimedia.org/wikipedia/en/b/b1/Portrait_placeholder.png"},
  avatar: {type: String, default: pickAvatar},
  // bear: {type: String, default: bearStr},
  createdAt: {type: String, default: Date.now},
  isAdmin: {type: Boolean, default: false}
});

UserSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("User", UserSchema);
