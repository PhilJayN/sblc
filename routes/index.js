var express = require("express");
var router = express.Router({mergeParams: true});
var passport = require("passport");
var User = require("../models/user");
var Photo = require("../models/photo");
var Comment = require("../models/comment");
var Thread = require("../models/thread");
var async = require('async');

// ================
// MAIN ROUTES
// ================
router.get('/', function (req, res) {
  // console.log ('async!!');
  // var brackett = {};
  var findValue;
  var regex;
  // var testFind = {"author.username" : "Mike"};
  // var brackText = {text: regex};
//mongo shell:
// db.comments.find({"author.username" : "Rachel"})

//check first to see if req.query.search exists
if (req.query.search) {
  // console.log ('req query search activated!!');
  // findValue = 'default value';
  // console.log ('findValue TEST:', findValue);
  console.log('expect req.query.search:', req.query.search );
  regex = new RegExp(escapeRegex(req.query.search), 'gi');
  console.log ('regex final result:', regex);
  console.log ('findValue type', typeof findValue);
  findValue = {text: regex};
  console.log ('findValue final:', findValue);
} else {
  findValue = {};
  console.log ('findValue of:', findValue,  'was used');
}

//run if req.query.search doesn't exist. i.e render the page as normal
async.parallel([
    function(callback) {
      Comment.find(findValue, function(err, allComments){
        if (err) {
          console.log(err);
        }
        callback(null, allComments);

      });
       // console.log ('first!');
    },
    function(callback) {
      Thread.find(findValue, function(err, allThreads){
        if (err) {
          console.log(err);
        }
        callback(null, allThreads);
      });
      // console.log ('twoo!!');
    }
], function(err, results) {
  if (err) {
    console.log (err);
  } else {
    console.log ('results', results);
    // res.render('demo.ejs', {dbResults: results});
    res.render( 'photos/index.ejs', { dbResults: results} );
  }
      // res.render( 'photos/index.ejs', { comments: allComments, threads: allThreads } );
    });
});


router.get('/pup', function (req, res) {
  async.parallel([
      function(callback){
          setTimeout(function(){
              callback(null, 'one');
          }, 200);
      },
      function(callback){
          setTimeout(function(){
              callback(null, 'two');
          }, 100);
      },
  ],
  // optional callback
  function(err, results){
      // the results array will equal ['one','two'] even though
      console.log ('results', results);
      // the second function had a shorter timeout.
  });

});

//ROUTES: AUTHENTICATION
//show the sign up form
router.get('/register', function (req, res) {
  res.render('register.ejs');
});

//handlers user sign up:
router.post('/register', function (req, res) {
  var newUser = new User({username: req.body.username});
  User.register(newUser, req.body.password, function(err, user){
    if(err) {
      req.flash("error", err.message);
      return res.redirect("/register");
    }
    passport.authenticate("local")(req, res, function(){
      req.flash("success", "Successfully created new account. Welcome " + user.username + "!");
      res.redirect("/");
    });
  });
});

//ROUTES: LOGIN
router.get('/login', function(req, res) {
  res.render('login.ejs' );
});

//handles login logic
router.post('/login', passport.authenticate("local", {
  failureRedirect: '/login', //make sure this is /login ( it's a route), and NOT login.ejs.
  failureFlash: "Invalid username or password. Please try again."
}), function(req, res) {
  console.log ('req', req.user);
  req.flash('success', "Login successful. Hi " + req.user.username + "!");
  res.redirect("/");
});

//ROUTES: LOGOUT
router.get('/logout', function(req, res) {
  req.logout();
  req.flash('success', 'You are logged out.');
  res.redirect('/');
});

router.get('/demo', function (req, res) {
  res.send('hello world asdf');
});

//for fuzzy searching, where 'text' parameter will accept a req.query.search string
function escapeRegex(text) {
    return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
};

module.exports = router;
