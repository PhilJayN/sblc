var express = require("express");
var router = express.Router({mergeParams: true});
var passport = require("passport");
var User = require("../models/user");
var Photo = require("../models/photo");
var Comment = require("../models/comment");
var Thread = require("../models/thread");

// ================
// MAIN ROUTES
// ================
router.get('/', function (req, res) {
  var noMatch = null;

  console.log('expect req.query.search be:', req.query.search );
  if (req.query.search) {
    const regex = new RegExp(escapeRegex(req.query.search), 'gi');
    Comment.find({text: regex}, function(err, allComments){
      if (err) {
        console.log(err);
      }
      Thread.find({}, function(err, allThreads){
        if (err) {
          console.log(err);
        }
        else {
          if (allComments.length < 1) {
            noMatch = "No results found!";
          }
          // var noMatch;
          // console.log ('lenght allComments', allComments.length);
          // if (allComments.length < 1) {
          //   req.flash('error', 'Empty field!!');
          // }
          res.render('photos/index.ejs', {comments: allComments, threads: allThreads, noMatch: noMatch});
        }
      });
    });
  }

//run if req.query.search doesn't exist. i.e render the page as normal
else {

  Comment.find({}, function(err, allComments){
    // console.log ('allComments', allComments);
    // console.log ('req.body stuff:', req.body);
    // console.log ('req stuff:', req.query);
    // console.log ('req stuff:', req.query.search);

    if (err) {
      console.log(err);
    }

    Thread.find({}, function(err, allThreads){

      if (err) {
        console.log(err);
      }

      else {

        res.render('photos/index.ejs', {comments: allComments, threads: allThreads, noMatch: noMatch});
      }
    });
  });

}

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

function escapeRegex(text) {
    return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
};

module.exports = router;
