var mongoose = require("mongoose");
var passportLocalMongoose = require("passport-local-mongoose");

var UserSchema = new mongoose.Schema({
  username: String,
  password: String,
  firstName: {type: String, default: "First Name"},
  lastName: {type: String, default: "Last Name"},
  email: String,
  avatar: {type: String, default: "https://upload.wikimedia.org/wikipedia/en/b/b1/Portrait_placeholder.png"},
  createdAt: {type: String, default: Date.now},
  isAdmin: {type: Boolean, default: false}
});

UserSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("User", UserSchema);
