var express = require("express");
var app = express();

app.use((req, res, next) => {
	// res.locals.myNameIs = "My name is...";
  res.locals.sayHi = function() {
    return 'hi there!';
  };

  res.locals.color = function(){
      var r = (Math.round(Math.random()* 127) + 127);
      var g = (Math.round(Math.random()* 127) + 127);
      var b = (Math.round(Math.random()* 127) + 127);
      console.log ('r', r, 'g', g, 'b', b);
      var background = 'rgb('
                        + r.toString()
                        + ', '
                        + g.toString()
                        + ', '
                        + b.toString();
      var icon = 'rgb('
                        + (r - 40).toString()
                        + ', '
                        + (g - 40).toString()
                        + ', '
                        + (b - 40).toString()
                        + ')';
      return {
        background: background,
        icon: icon,
      }
  };

	next()
});


const session = require('express-session');
const MongoStore = require('connect-mongo')(session);

var bodyParser = require("body-parser");
var User = require("./models/user");
var Comment = require('./models/comment');
var Thread = require('./models/thread');
var Reply = require('./models/reply');
var passport = require("passport");
var LocalStrategy = require("passport-local");
var passportLocalMongoose = require("passport-local-mongoose");
var flash = require("connect-flash");

var methodOveride = require("method-override");
app.use(methodOveride("_method"));
app.use(flash());
//middleware for logged in
function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect('/login');
}

//require routes:
var commentRoutes = require("./routes/comments");
var indexRoutes = require("./routes/index");
var resourcesRoutes = require("./routes/resources");
var threadRoutes = require("./routes/threads");
var replyRoutes = require("./routes/replies");


app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + "/public"));

var mongoose = require("mongoose");
// mongoose.connect("mongodb://localhost/photos_app");
app.set('port', (process.env.PORT || 6000));

var url = process.env.DATABASEURL || "mongodb://localhost/sblc_test";
mongoose.connect(url);
// mongoose.connect(process.env.DATABASEURL);
// console.log ('first PROCESS env', process.env);
console.log ('second PROCESS env', process.env.DATABASEURL);

// console.log ('process env', process.env.DATABASEURL);
// mongoose.connect("mongodb://localhost/sblc_app");

// var url = process.env.DATABASEURL || "mongodb://localhost/sblc_app";
// mongoose.connect(process.env.DATABASEURL);
// console.log('process env DATABASEURL', process.env.DATABASEURL);

//PASSPORT CONFIGURATION
app.use(session({
  secret: "This is the super duper secrete hashing powder",
  resave: false,
  saveUninitialized: false,
  store: new MongoStore({mongooseConnection: mongoose.connection})
}));

//setup PASSPORT
passport.use(new LocalStrategy(User.authenticate()));
app.use(passport.initialize());
app.use(passport.session());

//setup session, encoding, and decoding for passport:
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

//middleware: fxn will be called on every route:
//this way every page will have currentUser data
app.use(function(req, res, next) {
  res.locals.currentUser = req.user;
  res.locals.error = req.flash("error");
  res.locals.success = req.flash("success");

  next();
});

app.use(commentRoutes);
app.use(indexRoutes);
app.use(resourcesRoutes);
app.use(threadRoutes);
app.use(replyRoutes);

// app.listen(process.env.PORT, process.env.IP, function () {
//   console.log('listening on port:', process.env.PORT, process.env.IP);
// });
app.listen(app.get('port'), function () {
  console.log('Your Node app is running on port', app.get('port'));
});
