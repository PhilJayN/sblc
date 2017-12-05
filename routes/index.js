var express = require("express");
var router = express.Router({mergeParams: true});
var passport = require("passport");
var User = require("../models/user");
var Photo = require("../models/photo");
var Comment = require("../models/comment");

// ================
// MAIN ROUTES
// ================
router.get('/', function (req, res) {
  Comment.find({}, function(err, allComments){
    // console.log ('allComments', allComments);
    if (err) {
      console.log(err);
    } else {
      //correct render:
      // res.render('landing.ejs');
      //render for testing:
      // console.log ('allComments', allComments);
      res.render('photos/index.ejs', {comments: allComments});
    }
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
  // res.render('login.ejs', {message: req.flash("error")});
  // res.render('login.ejs', {message: 'you messed up!'});
  res.render('login.ejs' );
});

//handles login logic
router.post('/login', passport.authenticate("local", {
  failureRedirect: '/login', //make sure this is /login ( it's a route), and NOT login.ejs.
  failureFlash: "Invalid username or password. Please try again."
}), function(req, res) {
  req.flash('success', "You are logged in.");
  res.redirect("/");
});




//
// //handles login logic
// router.post('/login', passport.authenticate("local", {
//   successRedirect: '/',
//   failureRedirect: '/login' //make sure this is /login ( it's a route), and NOT login.ejs.
// }), function(req, res) {
// });
//
//


//ROUTES: LOGOUT
router.get('/logout', function(req, res) {
  req.logout();
  req.flash('success', 'You are logged out.');
  res.redirect('/');
});

router.get('/demo', function (req, res) {
  res.render('demo.ejs');
});

router.get('*', function (req, res) {
  // res.redirect('/404');
  res.render('pagenotfound.ejs');
});

module.exports = router;
