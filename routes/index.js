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
  var findValue;
  var userMsg = null;
  var resultsCount = 0;
  var searchReq = false;
//check first to see if req.query.search exists (user actually writes something in search field)
//the purpose is to help assign a value to findValue. search query exist means findValue is the entered val.
//otherwise findValue set to {}, the default, which searches db for all
  if (req.query.search) {
    searchReq = true;
    console.log ('req query search:', req.query.search );
    console.log ('req.query.search LEN:', req.query.search.length);
    const regex = new RegExp(escapeRegex(req.query.search), 'gi');
    console.log ('regex final result:', regex);
    console.log ('findValue type', typeof findValue);
    // findValue = {text: regex};
    findValue = {$or : [{subject: regex}, {text: regex}]};
    console.log ('findValue final:', findValue);
    //run if req.query.search doesn't exist. i.e render the page as normal
  } else {
    findValue = {};
    console.log('NO SEARCH QUERY, OR IT IS EMPTY, defaulting to {} findValue');
    // console.log ('findValue of:', findValue,  'was used');
  }
  async.parallel([
      function(callback) {
        //.find will return [] if no match
        Comment.find(findValue, function(err, allComments){
          if (err) {
            console.log(err);
          }
          // console.log('allComments results Len:', allComments.length);
          resultsCount += allComments.length;
          // console.log('allComments results:', allComments);
          callback(null, allComments);
        });
      },
      function(callback) {
        //in DB, replies is an array with ids. make sure to populate the the replies at this point,
        // or else final results will contain object ids in the replies array.
        Thread.find(findValue).populate('replies').exec(function(err, allThreads){
          if (err) {
            console.log(err);
          }
          // console.log('allThreads results Len:', allThreads.length);
          console.log('allThreads RESULTS:', allThreads);
          resultsCount += allThreads.length;
          callback(null, allThreads);
        });
      }
  ], function(err, results) { //results is an array, so possible to access using index #
    var resultsLen;
    if (err) {
      console.log (err);
    } else {
      // console.log ('results Len:', results.length, 'results type:', typeof results);
      // console.log ('results obj:', results);
      // console.log ('results arr:', results[1]);
      // console.log ('TOTAL RESULTS LEN:', resultsCount);
      res.render( 'photos/index.ejs', { dbResults: results, userMsg: userMsg, resultsCount: resultsCount, searchReq: searchReq} );
    }
      });
  });



  router.get('/demo', function (req, res) {
    console.log('demo route!!!');
    // res.send('hello world asdf');
    // res.render('photos/index.ejs');

    Thread.findById("5a7d1e09ccd40e48184ef264").populate("replies").exec(function(err, foundThread) { //foundPhoto is a object, so you can use dot notation on it.
      if (err) {
        console.log(err);
      } else {
        console.log('foundThread', foundThread);
  // res.send('hiiiiiii');
      res.render('demo.ejs', {thread: foundThread});
      }
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






// router.get('/demo', function (req, res) {
// });


//for fuzzy searching, where 'text' parameter will accept a req.query.search string
function escapeRegex(text) {
    return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
};

module.exports = router;
